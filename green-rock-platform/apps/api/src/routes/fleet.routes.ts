import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse } from '../middleware/errorHandler';
import { authenticate, requireAdmin } from '../middleware/auth';
import { generateCode } from '../utils/helpers';

const router = Router();

router.get('/vehicles', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const vehicles = await prisma.vehicle.findMany({ include: { deliveries: { take: 5, orderBy: { createdAt: 'desc' } } } });
  successResponse(res, vehicles);
}));

router.post('/vehicles', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const vehicle = await prisma.vehicle.create({ data: req.body });
  successResponse(res, vehicle, 'Vehicle added', 201);
}));

router.get('/deliveries', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const deliveries = await prisma.delivery.findMany({
    include: { vehicle: true, order: true, items: { include: { product: true } } },
    orderBy: { scheduledAt: 'desc' },
  });
  successResponse(res, deliveries);
}));

router.post('/deliveries', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const deliveryNumber = generateCode('DEL');
  const delivery = await prisma.delivery.create({
    data: { deliveryNumber, ...req.body },
    include: { items: true },
  });
  successResponse(res, delivery, 'Delivery scheduled', 201);
}));

router.patch('/deliveries/:id/status', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const data: Record<string, unknown> = { status: req.body.status };
  if (req.body.status === 'DELIVERED') data.deliveredAt = new Date();
  const delivery = await prisma.delivery.update({ where: { id: req.params.id }, data });
  successResponse(res, delivery, 'Delivery updated');
}));

export default router;
