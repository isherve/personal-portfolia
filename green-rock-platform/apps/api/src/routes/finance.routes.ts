import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse, AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { getPagination, paginationMeta, generateCode } from '../utils/helpers';

const router = Router();

router.get('/invoices', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const [invoices, total] = await Promise.all([
    prisma.invoice.findMany({
      skip, take,
      include: { customer: true, items: true, payments: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.invoice.count(),
  ]);
  successResponse(res, invoices, undefined, 200, paginationMeta(total, page, limit));
}));

router.get('/invoices/mine', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
  const invoices = await prisma.invoice.findMany({
    where: { customerId: customer?.id },
    include: { items: true, payments: true },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, invoices);
}));

router.post('/invoices', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const invoiceNumber = generateCode('INV');
  const { items, ...rest } = req.body;
  let subtotal = 0;
  const invoiceItems = (items || []).map((item: { description: string; quantity: number; unitPrice: number }) => {
    const total = item.quantity * item.unitPrice;
    subtotal += total;
    return { ...item, total };
  });
  const invoice = await prisma.invoice.create({
    data: { invoiceNumber, subtotal, total: subtotal, ...rest, items: { create: invoiceItems } },
    include: { items: true },
  });
  successResponse(res, invoice, 'Invoice created', 201);
}));

router.post('/payments', authenticate, asyncHandler(async (req, res) => {
  const { invoiceId, amount, method, reference } = req.body;
  const payment = await prisma.$transaction(async (tx) => {
    const p = await tx.payment.create({ data: { invoiceId, amount, method, reference } });
    const invoice = await tx.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) throw new AppError(404, 'Invoice not found');
    const paidAmount = Number(invoice.paidAmount) + Number(amount);
    const status = paidAmount >= Number(invoice.total) ? 'PAID' : 'PARTIAL';
    await tx.invoice.update({ where: { id: invoiceId }, data: { paidAmount, status } });
    return p;
  });
  successResponse(res, payment, 'Payment recorded', 201);
}));

router.get('/quotations', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const quotations = await prisma.quotation.findMany({
    include: { customer: true, items: true },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, quotations);
}));

router.post('/quotations', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const quoteNumber = generateCode('QUO');
  const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
  const { items, ...rest } = req.body;
  let subtotal = 0;
  const quoteItems = (items || []).map((item: { description: string; quantity: number; unitPrice: number; productId?: string }) => {
    const total = item.quantity * item.unitPrice;
    subtotal += total;
    return { ...item, total };
  });
  const quotation = await prisma.quotation.create({
    data: {
      quoteNumber,
      customerId: customer?.id,
      subtotal,
      total: subtotal,
      ...rest,
      items: { create: quoteItems },
    },
    include: { items: true },
  });
  successResponse(res, quotation, 'Quotation request submitted', 201);
}));

router.get('/expenses', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const expenses = await prisma.expense.findMany({ orderBy: { createdAt: 'desc' } });
  successResponse(res, expenses);
}));

router.post('/expenses', authenticate, requireAdmin, asyncHandler(async (req: AuthRequest, res) => {
  const expense = await prisma.expense.create({
    data: { ...req.body, submittedBy: req.user!.userId },
  });
  successResponse(res, expense, 'Expense recorded', 201);
}));

router.get('/contracts', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const contracts = await prisma.contract.findMany({
    include: { customer: true, project: true },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, contracts);
}));

router.post('/contracts', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const contractNumber = generateCode('CNT');
  const contract = await prisma.contract.create({ data: { contractNumber, ...req.body } });
  successResponse(res, contract, 'Contract created', 201);
}));

export default router;
