import { Router } from 'express';
import multer from 'multer';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { uploadToCloudinary } from '../services/cloudinary.service';
import { getPagination, paginationMeta } from '../utils/helpers';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const router = Router();

router.post('/upload', authenticate, upload.single('file'), asyncHandler(async (req: AuthRequest, res) => {
  if (!req.file) return successResponse(res, null, 'No file provided', 400);
  const folder = (req.body.folder as string) || 'documents';
  const result = await uploadToCloudinary(req.file, folder);
  const doc = await prisma.document.create({
    data: {
      title: req.body.title || req.file.originalname,
      fileUrl: result.url,
      publicId: result.publicId,
      mimeType: req.file.mimetype,
      size: req.file.size,
      category: req.body.category || 'GENERAL',
      entityType: req.body.entityType,
      entityId: req.body.entityId,
      uploadedBy: req.user!.userId,
    },
  });
  successResponse(res, doc, 'File uploaded', 201);
}));

router.get('/', authenticate, asyncHandler(async (req, res) => {
  const { entityType, entityId } = req.query;
  const where = {
    ...(entityType && { entityType: String(entityType) }),
    ...(entityId && { entityId: String(entityId) }),
  };
  const documents = await prisma.document.findMany({ where, orderBy: { createdAt: 'desc' } });
  successResponse(res, documents);
}));

router.get('/audit-logs', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      skip, take,
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.auditLog.count(),
  ]);
  successResponse(res, logs, undefined, 200, paginationMeta(total, page, limit));
}));

router.get('/settings', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const settings = await prisma.systemSetting.findMany();
  successResponse(res, settings);
}));

router.patch('/settings/:key', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const setting = await prisma.systemSetting.upsert({
    where: { key: req.params.key },
    create: { key: req.params.key, value: req.body.value, category: req.body.category || 'GENERAL' },
    update: { value: req.body.value },
  });
  successResponse(res, setting, 'Setting updated');
}));

router.get('/users', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip, take,
      where: { deletedAt: null },
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, isActive: true, createdAt: true, lastLoginAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where: { deletedAt: null } }),
  ]);
  successResponse(res, users, undefined, 200, paginationMeta(total, page, limit));
}));

export default router;
