import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse, AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin, requireEmployee, AuthRequest } from '../middleware/auth';
import { getPagination, paginationMeta, generateCode } from '../utils/helpers';

const router = Router();

router.get('/', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const status = req.query.status as string | undefined;
  const where = status ? { status: status as never } : {};
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where, skip, take,
      include: { tasks: true, milestones: true, creator: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.project.count({ where }),
  ]);
  successResponse(res, projects, undefined, 200, paginationMeta(total, page, limit));
}));

router.post('/', authenticate, requireAdmin, asyncHandler(async (req: AuthRequest, res) => {
  const code = generateCode('PRJ');
  const project = await prisma.project.create({
    data: { ...req.body, code, createdById: req.user!.userId },
    include: { tasks: true, milestones: true },
  });
  successResponse(res, project, 'Project created', 201);
}));

router.get('/:id', authenticate, requireEmployee, asyncHandler(async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: { tasks: { include: { assignee: { select: { firstName: true, lastName: true } } } }, milestones: true },
  });
  if (!project) throw new AppError(404, 'Project not found');
  successResponse(res, project);
}));

router.patch('/:id', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const project = await prisma.project.update({ where: { id: req.params.id }, data: req.body });
  successResponse(res, project, 'Project updated');
}));

router.post('/:id/tasks', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const task = await prisma.task.create({ data: { projectId: req.params.id, ...req.body } });
  successResponse(res, task, 'Task created', 201);
}));

router.patch('/tasks/:taskId', authenticate, requireEmployee, asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.status === 'DONE') data.completedAt = new Date();
  const task = await prisma.task.update({ where: { id: req.params.taskId }, data });
  successResponse(res, task, 'Task updated');
}));

router.get('/tasks/mine', authenticate, requireEmployee, asyncHandler(async (req: AuthRequest, res) => {
  const tasks = await prisma.task.findMany({
    where: { assigneeId: req.user!.userId },
    include: { project: { select: { name: true, code: true } } },
    orderBy: { dueDate: 'asc' },
  });
  successResponse(res, tasks);
}));

router.post('/construction-requests', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
  const request = await prisma.constructionRequest.create({
    data: { ...req.body, customerId: customer?.id },
  });
  successResponse(res, request, 'Construction request submitted', 201);
}));

router.get('/construction-requests/mine', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const customer = await prisma.customer.findUnique({ where: { userId: req.user!.userId } });
  const requests = await prisma.constructionRequest.findMany({
    where: { customerId: customer?.id },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, requests);
}));

export default router;
