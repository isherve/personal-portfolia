import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Green Rock database...');

  const passwordHash = await bcrypt.hash('Password123!', 12);

  const users = [
    { email: 'admin@greenrock.com', firstName: 'System', lastName: 'Admin', role: UserRole.SUPER_ADMIN },
    { email: 'director@greenrock.com', firstName: 'Jean', lastName: 'Mukamana', role: UserRole.MANAGING_DIRECTOR },
    { email: 'finance@greenrock.com', firstName: 'Marie', lastName: 'Uwase', role: UserRole.FINANCE_MANAGER },
    { email: 'sales@greenrock.com', firstName: 'Patrick', lastName: 'Nshuti', role: UserRole.SALES_MANAGER },
    { email: 'hr@greenrock.com', firstName: 'Grace', lastName: 'Ingabire', role: UserRole.HR_MANAGER },
    { email: 'employee@greenrock.com', firstName: 'Eric', lastName: 'Habimana', role: UserRole.EMPLOYEE },
    { email: 'customer@greenrock.com', firstName: 'Alice', lastName: 'Keza', role: UserRole.CUSTOMER },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, passwordHash },
    });
  }

  const customerUser = await prisma.user.findUnique({ where: { email: 'customer@greenrock.com' } });
  if (customerUser) {
    await prisma.customer.upsert({
      where: { userId: customerUser.id },
      update: {},
      create: { userId: customerUser.id, type: 'INDIVIDUAL', city: 'Kigali' },
    });
  }

  const employeeUser = await prisma.user.findUnique({ where: { email: 'employee@greenrock.com' } });
  if (employeeUser) {
    await prisma.employee.upsert({
      where: { userId: employeeUser.id },
      update: {},
      create: {
        userId: employeeUser.id,
        employeeCode: 'EMP-001',
        department: 'Construction',
        position: 'Site Supervisor',
        hireDate: new Date('2023-01-15'),
        salary: 850000,
      },
    });
  }

  const warehouse = await prisma.warehouse.upsert({
    where: { code: 'WH-MAIN' },
    update: {},
    create: { name: 'Main Warehouse', code: 'WH-MAIN', address: 'Kigali Industrial Zone', city: 'Kigali' },
  });

  const products = [
    { sku: 'CEM-001', name: 'Portland Cement 50kg', category: 'BUILDING_MATERIALS' as const, price: 12500, unit: 'bag' },
    { sku: 'STL-001', name: 'Steel Reinforcement Bar 12mm', category: 'BUILDING_MATERIALS' as const, price: 45000, unit: 'bar' },
    { sku: 'TMB-001', name: 'Pine Timber 4x2x12ft', category: 'TIMBER' as const, price: 8500, unit: 'piece', isTimber: true, timberGrade: 'A' },
    { sku: 'TMB-002', name: 'Hardwood Timber 6x2x12ft', category: 'TIMBER' as const, price: 15000, unit: 'piece', isTimber: true, timberGrade: 'Premium' },
    { sku: 'PNT-001', name: 'Exterior Wall Paint 20L', category: 'PAINT' as const, price: 65000, unit: 'bucket' },
    { sku: 'BRK-001', name: 'Clay Brick Standard', category: 'BUILDING_MATERIALS' as const, price: 350, unit: 'piece' },
  ];

  for (const p of products) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {},
      create: { ...p, slug },
    });
    await prisma.stockLevel.upsert({
      where: { productId_warehouseId: { productId: product.id, warehouseId: warehouse.id } },
      update: {},
      create: { productId: product.id, warehouseId: warehouse.id, quantity: Math.floor(Math.random() * 500) + 50 },
    });
  }

  const properties = [
    {
      title: 'Modern Villa in Kacyiru',
      slug: 'modern-villa-kacyiru',
      type: 'RESIDENTIAL' as const,
      address: 'KG 15 Ave, Kacyiru',
      city: 'Kigali',
      bedrooms: 4,
      bathrooms: 3,
      areaSqm: 350,
      price: 250000000,
      listingType: 'SALE' as const,
    },
    {
      title: 'Commercial Space Kimihurura',
      slug: 'commercial-space-kimihurura',
      type: 'COMMERCIAL' as const,
      address: 'KN 5 Rd, Kimihurura',
      city: 'Kigali',
      areaSqm: 200,
      price: 1500000,
      listingType: 'RENT' as const,
    },
    {
      title: 'Residential Plot Nyarutarama',
      slug: 'residential-plot-nyarutarama',
      type: 'LAND' as const,
      address: 'Nyarutarama Hill',
      city: 'Kigali',
      areaSqm: 1200,
      price: 180000000,
      listingType: 'SALE' as const,
    },
  ];

  for (const prop of properties) {
    const { price, listingType, ...propData } = prop;
    const property = await prisma.property.upsert({
      where: { slug: prop.slug },
      update: {},
      create: { ...propData, isFeatured: true },
    });
    const existingListing = await prisma.listing.findFirst({
      where: { propertyId: property.id, type: listingType },
    });
    if (!existingListing) {
      await prisma.listing.create({
        data: { propertyId: property.id, type: listingType, status: 'ACTIVE', price, publishedAt: new Date() },
      });
    }
  }

  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Emmanuel N.', role: 'Property Owner', content: 'Green Rock delivered our dream home on time and within budget. Exceptional construction quality!', rating: 5 },
      { name: 'Sarah M.', role: 'Business Owner', content: 'Their building materials are top quality and delivery is always prompt. Highly recommended!', rating: 5 },
      { name: 'David K.', role: 'Developer', content: 'Professional team from start to finish. The interior design service transformed our office space.', rating: 5 },
    ],
  });

  await prisma.blogPost.upsert({
    where: { slug: 'welcome-to-green-rock' },
    update: {},
    create: {
      title: 'Welcome to Green Rock General Supply',
      slug: 'welcome-to-green-rock',
      excerpt: 'Your trusted partner in real estate, construction, and building materials.',
      content: '<p>Green Rock General Supply Ltd is your one-stop solution for all property and construction needs in Rwanda and beyond.</p>',
      isPublished: true,
      publishedAt: new Date(),
      tags: ['company', 'announcement'],
    },
  });

  await prisma.career.upsert({
    where: { slug: 'construction-project-manager' },
    update: {},
    create: {
      title: 'Construction Project Manager',
      slug: 'construction-project-manager',
      department: 'Construction',
      location: 'Kigali',
      type: 'FULL_TIME',
      description: 'Lead construction projects from planning to completion.',
      requirements: '5+ years experience in construction project management.',
      isActive: true,
    },
  });

  await prisma.supplier.upsert({
    where: { code: 'SUP-001' },
    update: {},
    create: { name: 'Cimerwa Ltd', code: 'SUP-001', email: 'orders@cimerwa.rw', phone: '+250788000001', contactPerson: 'John Supplier' },
  });

  await prisma.systemSetting.createMany({
    skipDuplicates: true,
    data: [
      { key: 'company_name', value: 'Green Rock General Supply Ltd', category: 'GENERAL' },
      { key: 'company_email', value: 'info@greenrock.com', category: 'GENERAL' },
      { key: 'company_phone', value: '+250788123456', category: 'GENERAL' },
      { key: 'company_address', value: 'KG 7 Ave, Kigali, Rwanda', category: 'GENERAL' },
      { key: 'tax_rate', value: '18', category: 'FINANCE' },
      { key: 'currency', value: 'RWF', category: 'FINANCE' },
    ],
  });

  console.log('✅ Seed completed!');
  console.log('📧 Login credentials (password: Password123!):');
  users.forEach((u) => console.log(`   ${u.role}: ${u.email}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
