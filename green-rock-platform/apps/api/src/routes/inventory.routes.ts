import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse, AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { getPagination, paginationMeta, slugify, generateCode } from '../utils/helpers';

const router = Router();

router.get('/public/products', asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const category = req.query.category as string | undefined;
  const isTimber = req.query.timber === 'true';
  const where = {
    isActive: true,
    ...(category && { category: category as never }),
    ...(isTimber && { isTimber: true }),
  };
  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
    prisma.product.count({ where }),
  ]);
  successResponse(res, products, undefined, 200, paginationMeta(total, page, limit));
}));

router.get('/public/products/:slug', asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({ where: { slug: req.params.slug } });
  if (!product) throw new AppError(404, 'Product not found');
  successResponse(res, product);
}));

router.get('/products', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const [products, total] = await Promise.all([
    prisma.product.findMany({ skip, take, include: { stockLevels: { include: { warehouse: true } } }, orderBy: { name: 'asc' } }),
    prisma.product.count(),
  ]);
  successResponse(res, products, undefined, 200, paginationMeta(total, page, limit));
}));

router.post('/products', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { name, sku, ...rest } = req.body;
  const product = await prisma.product.create({
    data: { name, sku, slug: slugify(name), ...rest },
  });
  successResponse(res, product, 'Product created', 201);
}));

router.patch('/products/:id', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const product = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
  successResponse(res, product, 'Product updated');
}));

router.get('/warehouses', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const warehouses = await prisma.warehouse.findMany({ include: { stockLevels: { include: { product: true } } } });
  successResponse(res, warehouses);
}));

router.post('/warehouses', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const warehouse = await prisma.warehouse.create({ data: req.body });
  successResponse(res, warehouse, 'Warehouse created', 201);
}));

router.post('/movements', authenticate, requireAdmin, asyncHandler(async (req: AuthRequest, res) => {
  const { productId, warehouseId, type, quantity, notes } = req.body;
  const movement = await prisma.$transaction(async (tx) => {
    const m = await tx.stockMovement.create({
      data: { productId, warehouseId, type, quantity, notes, createdBy: req.user!.userId },
    });
    const stock = await tx.stockLevel.findUnique({
      where: { productId_warehouseId: { productId, warehouseId } },
    });
    const delta = type === 'IN' || type === 'RETURN' ? quantity : -quantity;
    if (stock) {
      await tx.stockLevel.update({
        where: { id: stock.id },
        data: { quantity: Math.max(0, stock.quantity + delta) },
      });
    } else if (delta > 0) {
      await tx.stockLevel.create({ data: { productId, warehouseId, quantity: delta } });
    }
    return m;
  });
  successResponse(res, movement, 'Stock movement recorded', 201);
}));

router.get('/orders', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const [orders, total] = await Promise.all([
    prisma.materialOrder.findMany({ skip, take, include: { customer: true, items: { include: { product: true } } }, orderBy: { createdAt: 'desc' } }),
    prisma.materialOrder.count(),
  ]);
  successResponse(res, orders, undefined, 200, paginationMeta(total, page, limit));
}));

router.post('/orders', authenticate, asyncHandler(async (req, res) => {
  const { items, customerId, ...rest } = req.body;
  const orderNumber = generateCode('ORD');
  let subtotal = 0;
  const orderItems = items.map((item: { productId: string; quantity: number; unitPrice: number }) => {
    const total = item.quantity * item.unitPrice;
    subtotal += total;
    return { productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice, total };
  });
  const order = await prisma.materialOrder.create({
    data: {
      orderNumber,
      customerId,
      subtotal,
      total: subtotal,
      ...rest,
      items: { create: orderItems },
    },
    include: { items: { include: { product: true } } },
  });
  successResponse(res, order, 'Order created', 201);
}));

export default router;
