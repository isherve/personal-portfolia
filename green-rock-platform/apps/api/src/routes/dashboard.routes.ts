import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { getPagination, paginationMeta } from '../utils/helpers';

const router = Router();

router.get(
  '/executive',
  authenticate,
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const [
      totalCustomers,
      totalProperties,
      activeProjects,
      openLeads,
      pendingInvoices,
      lowStockItems,
      pendingDeliveries,
      revenueAgg,
    ] = await Promise.all([
      prisma.customer.count(),
      prisma.property.count({ where: { deletedAt: null } }),
      prisma.project.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.lead.count({ where: { status: { notIn: ['WON', 'LOST'] } } }),
      prisma.invoice.count({ where: { status: { in: ['SENT', 'PARTIAL', 'OVERDUE'] } } }),
      prisma.stockLevel.count({ where: { quantity: { lte: 10 } } }),
      prisma.delivery.count({ where: { status: { in: ['SCHEDULED', 'IN_TRANSIT'] } } }),
      prisma.payment.aggregate({ _sum: { amount: true } }),
    ]);

    const monthlyRevenue = await prisma.payment.groupBy({
      by: ['paidAt'],
      _sum: { amount: true },
      where: { paidAt: { gte: new Date(new Date().getFullYear(), 0, 1) } },
    });

    successResponse(res, {
      totalCustomers,
      totalProperties,
      activeProjects,
      openLeads,
      pendingInvoices,
      lowStockItems,
      pendingDeliveries,
      totalRevenue: Number(revenueAgg._sum.amount || 0),
      monthlyRevenue: monthlyRevenue.length,
    });
  })
);

router.get(
  '/customer',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user!.userId },
    });

    const [savedProperties, orders, invoices, appointments, tickets] = await Promise.all([
      prisma.savedProperty.count({ where: { userId: req.user!.userId } }),
      prisma.materialOrder.count({ where: { customerId: customer?.id } }),
      prisma.invoice.count({ where: { customerId: customer?.id, status: { not: 'PAID' } } }),
      prisma.appointment.count({
        where: { customerId: customer?.id, scheduledAt: { gte: new Date() } },
      }),
      prisma.supportTicket.count({
        where: { customerId: req.user!.userId, status: { not: 'CLOSED' } },
      }),
    ]);

    successResponse(res, {
      savedProperties,
      orders,
      pendingInvoices: invoices,
      upcomingAppointments: appointments,
      openTickets: tickets,
    });
  })
);

router.get(
  '/employee',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const [assignedTasks, assignedProjects, unreadMessages, leaveRequests] = await Promise.all([
      prisma.task.count({
        where: { assigneeId: req.user!.userId, status: { not: 'DONE' } },
      }),
      prisma.project.count({
        where: { createdById: req.user!.userId, status: 'IN_PROGRESS' },
      }),
      prisma.message.count({ where: { receiverId: req.user!.userId, isRead: false } }),
      prisma.leaveRequest.count({
        where: { userId: req.user!.userId, status: 'PENDING' },
      }),
    ]);

    successResponse(res, { assignedTasks, assignedProjects, unreadMessages, leaveRequests });
  })
);

router.get(
  '/sales-chart',
  authenticate,
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const payments = await prisma.payment.findMany({
      where: { paidAt: { gte: sixMonthsAgo } },
      select: { amount: true, paidAt: true },
    });

    const byMonth: Record<string, number> = {};
    payments.forEach((p) => {
      const key = `${p.paidAt.getFullYear()}-${String(p.paidAt.getMonth() + 1).padStart(2, '0')}`;
      byMonth[key] = (byMonth[key] || 0) + Number(p.amount);
    });

    successResponse(res, Object.entries(byMonth).map(([month, revenue]) => ({ month, revenue })));
  })
);

router.get(
  '/recent-activity',
  authenticate,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { firstName: true, lastName: true, email: true } } },
      }),
      prisma.auditLog.count(),
    ]);
    successResponse(res, logs, undefined, 200, paginationMeta(total, page, limit));
  })
);

export default router;
