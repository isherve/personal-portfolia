import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse, AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { generateCode } from '../utils/helpers';

const router = Router();

router.get('/appointments/mine', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
  const appointments = await prisma.appointment.findMany({
    where: { customerId: customer?.id },
    orderBy: { scheduledAt: 'desc' },
  });
  successResponse(res, appointments);
}));

router.post('/appointments', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
  const appointment = await prisma.appointment.create({
    data: { customerId: customer?.id, ...req.body },
  });
  successResponse(res, appointment, 'Appointment booked', 201);
}));

router.get('/appointments', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const appointments = await prisma.appointment.findMany({
    include: { customer: true },
    orderBy: { scheduledAt: 'asc' },
  });
  successResponse(res, appointments);
}));

router.get('/tickets/mine', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const tickets = await prisma.supportTicket.findMany({
    where: { customerId: req.user!.userId },
    include: { replies: true },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, tickets);
}));

router.post('/tickets', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const ticketNumber = generateCode('TKT');
  const ticket = await prisma.supportTicket.create({
    data: {
      ticketNumber,
      customerId: req.user!.userId,
      subject: req.body.subject,
      description: req.body.description,
      priority: req.body.priority,
    },
  });
  successResponse(res, ticket, 'Support ticket created', 201);
}));

router.get('/tickets', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const tickets = await prisma.supportTicket.findMany({
    include: { assignee: { select: { firstName: true, lastName: true } }, replies: true },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, tickets);
}));

router.post('/tickets/:id/replies', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const isStaff = req.user!.role !== 'CUSTOMER';
  const reply = await prisma.ticketReply.create({
    data: {
      ticketId: req.params.id,
      message: req.body.message,
      isStaff,
      authorId: req.user!.userId,
    },
  });
  successResponse(res, reply, 'Reply added', 201);
}));

router.get('/messages', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const messages = await prisma.message.findMany({
    where: { OR: [{ senderId: req.user!.userId }, { receiverId: req.user!.userId }] },
    include: {
      sender: { select: { firstName: true, lastName: true } },
      receiver: { select: { firstName: true, lastName: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, messages);
}));

router.post('/messages', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const message = await prisma.message.create({
    data: { senderId: req.user!.userId, ...req.body },
  });
  successResponse(res, message, 'Message sent', 201);
}));

router.get('/notifications', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user!.userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  successResponse(res, notifications);
}));

router.patch('/notifications/:id/read', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const notification = await prisma.notification.update({
    where: { id: req.params.id, userId: req.user!.userId },
    data: { isRead: true, readAt: new Date() },
  });
  successResponse(res, notification);
}));

router.patch('/notifications/read-all', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user!.userId, isRead: false },
    data: { isRead: true, readAt: new Date() },
  });
  successResponse(res, null, 'All notifications marked as read');
}));

export default router;
