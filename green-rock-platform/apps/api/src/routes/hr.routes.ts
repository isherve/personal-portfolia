import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse } from '../middleware/errorHandler';
import { authenticate, requireAdmin, requireEmployee, AuthRequest } from '../middleware/auth';
import { getPagination, paginationMeta } from '../utils/helpers';

const router = Router();

router.get('/employees', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const [employees, total] = await Promise.all([
    prisma.employee.findMany({
      skip, take,
      include: { user: { select: { firstName: true, lastName: true, email: true, role: true, isActive: true } } },
    }),
    prisma.employee.count(),
  ]);
  successResponse(res, employees, undefined, 200, paginationMeta(total, page, limit));
}));

router.post('/employees', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const employee = await prisma.employee.create({ data: req.body });
  successResponse(res, employee, 'Employee created', 201);
}));

router.get('/attendance', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const records = await prisma.attendance.findMany({
    include: { employee: { include: { user: { select: { firstName: true, lastName: true } } } } },
    orderBy: { date: 'desc' },
    take: 100,
  });
  successResponse(res, records);
}));

router.post('/attendance', authenticate, requireEmployee, asyncHandler(async (req: AuthRequest, res) => {
  const employee = await prisma.employee.findUnique({ where: { userId: req.user!.userId } });
  if (!employee) return successResponse(res, null, 'Not an employee', 400);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const record = await prisma.attendance.upsert({
    where: { employeeId_date: { employeeId: employee.id, date: today } },
    create: { employeeId: employee.id, date: today, checkIn: new Date(), status: 'PRESENT' },
    update: { checkOut: new Date() },
  });
  successResponse(res, record, 'Attendance recorded');
}));

router.get('/leave', authenticate, requireEmployee, asyncHandler(async (req: AuthRequest, res) => {
  const requests = await prisma.leaveRequest.findMany({
    where: { userId: req.user!.userId },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, requests);
}));

router.post('/leave', authenticate, requireEmployee, asyncHandler(async (req: AuthRequest, res) => {
  const request = await prisma.leaveRequest.create({
    data: { userId: req.user!.userId, ...req.body },
  });
  successResponse(res, request, 'Leave request submitted', 201);
}));

router.patch('/leave/:id/approve', authenticate, requireAdmin, asyncHandler(async (req: AuthRequest, res) => {
  const request = await prisma.leaveRequest.update({
    where: { id: req.params.id },
    data: { status: req.body.status || 'APPROVED', approvedBy: req.user!.userId, approvedAt: new Date() },
  });
  successResponse(res, request, 'Leave request updated');
}));

router.get('/payslips/mine', authenticate, requireEmployee, asyncHandler(async (req: AuthRequest, res) => {
  const employee = await prisma.employee.findUnique({ where: { userId: req.user!.userId } });
  if (!employee) return successResponse(res, []);
  const payslips = await prisma.payslip.findMany({
    where: { employeeId: employee.id },
    orderBy: { periodEnd: 'desc' },
  });
  successResponse(res, payslips);
}));

router.get('/payslips', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const payslips = await prisma.payslip.findMany({
    include: { employee: { include: { user: { select: { firstName: true, lastName: true } } } } },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, payslips);
}));

export default router;
