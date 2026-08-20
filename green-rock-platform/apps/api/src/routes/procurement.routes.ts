import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse } from '../middleware/errorHandler';
import { authenticate, requireAdmin } from '../middleware/auth';
import { generateCode } from '../utils/helpers';

const router = Router();

router.get('/suppliers', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const suppliers = await prisma.supplier.findMany({ orderBy: { name: 'asc' } });
  successResponse(res, suppliers);
}));

router.post('/suppliers', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const supplier = await prisma.supplier.create({ data: req.body });
  successResponse(res, supplier, 'Supplier created', 201);
}));

router.get('/purchase-orders', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const orders = await prisma.purchaseOrder.findMany({
    include: { supplier: true, items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, orders);
}));

router.post('/purchase-orders', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const poNumber = generateCode('PO');
  const { items, supplierId, ...rest } = req.body;
  let subtotal = 0;
  const poItems = (items || []).map((item: { productId: string; quantity: number; unitPrice: number }) => {
    const total = item.quantity * item.unitPrice;
    subtotal += total;
    return { ...item, total };
  });
  const po = await prisma.purchaseOrder.create({
    data: { poNumber, supplierId, subtotal, total: subtotal, ...rest, items: { create: poItems } },
    include: { items: true, supplier: true },
  });
  successResponse(res, po, 'Purchase order created', 201);
}));

export default router;
