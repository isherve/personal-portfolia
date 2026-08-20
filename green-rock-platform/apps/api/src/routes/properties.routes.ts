import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse, AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { getPagination, paginationMeta, slugify } from '../utils/helpers';
import { notifyAdmins } from '../services/notification.service';

const router = Router();

// Public routes
router.get(
  '/public/listings',
  asyncHandler(async (req, res) => {
    const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
    const { type, city, minPrice, maxPrice, search } = req.query;

    const where = {
      deletedAt: null,
      listings: {
        some: {
          status: 'ACTIVE' as const,
          ...(type && { type: type as 'SALE' | 'RENT' }),
          ...(minPrice && { price: { gte: Number(minPrice) } }),
          ...(maxPrice && { price: { lte: Number(maxPrice) } }),
        },
      },
      ...(city && { city: { contains: String(city), mode: 'insensitive' as const } }),
      ...(search && {
        OR: [
          { title: { contains: String(search), mode: 'insensitive' as const } },
          { address: { contains: String(search), mode: 'insensitive' as const } },
        ],
      }),
    };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip,
        take,
        include: {
          listings: { where: { status: 'ACTIVE' } },
          media: { take: 1, orderBy: { sortOrder: 'asc' } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.property.count({ where }),
    ]);

    successResponse(res, properties, undefined, 200, paginationMeta(total, page, limit));
  })
);

router.get(
  '/public/listings/:slug',
  asyncHandler(async (req, res) => {
    const property = await prisma.property.findUnique({
      where: { slug: req.params.slug },
      include: { listings: true, media: { orderBy: { sortOrder: 'asc' } } },
    });
    if (!property) throw new AppError(404, 'Property not found');
    successResponse(res, property);
  })
);

router.post(
  '/public/inquiries',
  asyncHandler(async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    const inquiry = await prisma.contactInquiry.create({
      data: { name, email, phone, subject, message },
    });
    await notifyAdmins('New Contact Inquiry', `From ${name}: ${subject || 'General inquiry'}`);
    successResponse(res, inquiry, 'Inquiry submitted successfully', 201);
  })
);

// Admin routes
router.get(
  '/',
  authenticate,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { page, limit, skip, take } = getPagination(req.query.page, req.query.limit);
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where: { deletedAt: null },
        skip,
        take,
        include: { listings: true, media: { take: 1 } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.property.count({ where: { deletedAt: null } }),
    ]);
    successResponse(res, properties, undefined, 200, paginationMeta(total, page, limit));
  })
);

router.post(
  '/',
  authenticate,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { title, ...rest } = req.body;
    const slug = slugify(title);
    const property = await prisma.property.create({
      data: { title, slug, ...rest },
      include: { listings: true, media: true },
    });
    successResponse(res, property, 'Property created', 201);
  })
);

router.get(
  '/:id',
  authenticate,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: { listings: true, media: true },
    });
    if (!property) throw new AppError(404, 'Property not found');
    successResponse(res, property);
  })
);

router.patch(
  '/:id',
  authenticate,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const property = await prisma.property.update({
      where: { id: req.params.id },
      data: req.body,
      include: { listings: true, media: true },
    });
    successResponse(res, property, 'Property updated');
  })
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await prisma.property.update({
      where: { id: req.params.id },
      data: { deletedAt: new Date() },
    });
    successResponse(res, null, 'Property deleted');
  })
);

router.post(
  '/:id/listings',
  authenticate,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const listing = await prisma.listing.create({
      data: { propertyId: req.params.id, ...req.body },
    });
    successResponse(res, listing, 'Listing created', 201);
  })
);

router.post(
  '/saved',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { propertyId } = req.body;
    const saved = await prisma.savedProperty.upsert({
      where: { userId_propertyId: { userId: req.user!.userId, propertyId } },
      create: { userId: req.user!.userId, propertyId },
      update: {},
    });
    successResponse(res, saved, 'Property saved', 201);
  })
);

router.delete(
  '/saved/:propertyId',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    await prisma.savedProperty.delete({
      where: { userId_propertyId: { userId: req.user!.userId, propertyId: req.params.propertyId } },
    });
    successResponse(res, null, 'Property removed from saved');
  })
);

router.get(
  '/saved/mine',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const saved = await prisma.savedProperty.findMany({
      where: { userId: req.user!.userId },
      include: {
        property: { include: { listings: true, media: { take: 1 } } },
      },
    });
    successResponse(res, saved);
  })
);

export default router;
