import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse, AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { getPagination, paginationMeta } from '../utils/helpers';
import { notifyAdmins } from '../services/notification.service';

const router = Router();

router.get('/', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const status = req.query.status as string | undefined;
  const where = status ? { status: status as never } : {};
  const [leads, total] = await Promise.all([
    prisma.lead.findMany({ where, skip, take, include: { assignee: { select: { firstName: true, lastName: true } } }, orderBy: { createdAt: 'desc' } }),
    prisma.lead.count({ where }),
  ]);
  successResponse(res, leads, undefined, 200, paginationMeta(total, page, limit));
}));

router.post('/', asyncHandler(async (req, res) => {
  const lead = await prisma.lead.create({ data: req.body });
  await notifyAdmins('New Lead', `${lead.firstName} ${lead.lastName} - ${lead.interest || 'General'}`);
  successResponse(res, lead, 'Lead created', 201);
}));

router.get('/:id', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const lead = await prisma.lead.findUnique({
    where: { id: req.params.id },
    include: { activities: true, assignee: true },
  });
  if (!lead) throw new AppError(404, 'Lead not found');
  successResponse(res, lead);
}));

router.patch('/:id', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const lead = await prisma.lead.update({ where: { id: req.params.id }, data: req.body });
  successResponse(res, lead, 'Lead updated');
}));

router.post('/:id/activities', authenticate, requireAdmin, asyncHandler(async (req: AuthRequest, res) => {
  const activity = await prisma.leadActivity.create({
    data: { leadId: req.params.id, ...req.body, createdBy: req.user!.userId },
  });
  successResponse(res, activity, 'Activity added', 201);
}));

router.get('/customers/list', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const [customers, total] = await Promise.all([
    prisma.customer.findMany({ skip, take, include: { user: { select: { firstName: true, lastName: true, email: true } } }, orderBy: { createdAt: 'desc' } }),
    prisma.customer.count(),
  ]);
  successResponse(res, customers, undefined, 200, paginationMeta(total, page, limit));
}));

export default router;
