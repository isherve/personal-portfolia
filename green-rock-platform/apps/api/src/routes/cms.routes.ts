import { Router } from 'express';
import prisma from '../lib/prisma';
import { asyncHandler, successResponse, AppError } from '../middleware/errorHandler';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import { slugify } from '../utils/helpers';

const router = Router();

router.get('/public/blog', asyncHandler(async (_req, res) => {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    include: { author: { select: { firstName: true, lastName: true } } },
    orderBy: { publishedAt: 'desc' },
  });
  successResponse(res, posts);
}));

router.get('/public/blog/:slug', asyncHandler(async (req, res) => {
  const post = await prisma.blogPost.findUnique({
    where: { slug: req.params.slug },
    include: { author: { select: { firstName: true, lastName: true } } },
  });
  if (!post) throw new AppError(404, 'Post not found');
  successResponse(res, post);
}));

router.get('/public/testimonials', asyncHandler(async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
  successResponse(res, testimonials);
}));

router.get('/public/gallery', asyncHandler(async (req, res) => {
  const category = req.query.category as string | undefined;
  const items = await prisma.galleryItem.findMany({
    where: { isActive: true, ...(category && { category }) },
    orderBy: { sortOrder: 'asc' },
  });
  successResponse(res, items);
}));

router.get('/public/careers', asyncHandler(async (_req, res) => {
  const careers = await prisma.career.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, careers);
}));

router.post('/public/careers/:id/apply', asyncHandler(async (req, res) => {
  const application = await prisma.jobApplication.create({
    data: { careerId: req.params.id, ...req.body },
  });
  successResponse(res, application, 'Application submitted', 201);
}));

router.get('/public/pages/:slug', asyncHandler(async (req, res) => {
  const page = await prisma.cmsPage.findUnique({ where: { slug: req.params.slug } });
  if (!page) throw new AppError(404, 'Page not found');
  successResponse(res, page);
}));

router.get('/blog', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  successResponse(res, posts);
}));

router.post('/blog', authenticate, requireAdmin, asyncHandler(async (req: AuthRequest, res) => {
  const { title, ...rest } = req.body;
  const post = await prisma.blogPost.create({
    data: { title, slug: slugify(title), authorId: req.user!.userId, ...rest },
  });
  successResponse(res, post, 'Blog post created', 201);
}));

router.get('/testimonials', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  successResponse(res, await prisma.testimonial.findMany({ orderBy: { sortOrder: 'asc' } }));
}));

router.post('/testimonials', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const testimonial = await prisma.testimonial.create({ data: req.body });
  successResponse(res, testimonial, 'Testimonial created', 201);
}));

router.get('/gallery', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  successResponse(res, await prisma.galleryItem.findMany({ orderBy: { sortOrder: 'asc' } }));
}));

router.post('/gallery', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const item = await prisma.galleryItem.create({ data: req.body });
  successResponse(res, item, 'Gallery item added', 201);
}));

router.get('/careers', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const careers = await prisma.career.findMany({
    include: { applications: true },
    orderBy: { createdAt: 'desc' },
  });
  successResponse(res, careers);
}));

router.post('/careers', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const { title, ...rest } = req.body;
  const career = await prisma.career.create({ data: { title, slug: slugify(title), ...rest } });
  successResponse(res, career, 'Career posted', 201);
}));

router.get('/campaigns', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  successResponse(res, await prisma.marketingCampaign.findMany({ orderBy: { createdAt: 'desc' } }));
}));

router.post('/campaigns', authenticate, requireAdmin, asyncHandler(async (req, res) => {
  const campaign = await prisma.marketingCampaign.create({ data: req.body });
  successResponse(res, campaign, 'Campaign created', 201);
}));

export default router;
