import { Router } from 'express';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import prisma from '../lib/prisma';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/invoices/:id/pdf', authenticate, asyncHandler(async (req, res) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: req.params.id },
    include: { items: true, customer: true },
  });
  if (!invoice) return res.status(404).json({ success: false, error: 'Invoice not found' });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
  doc.pipe(res);

  doc.fontSize(20).text('Green Rock General Supply Ltd', { align: 'center' });
  doc.fontSize(14).text(`Invoice: ${invoice.invoiceNumber}`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(10).text(`Issue Date: ${invoice.issueDate.toLocaleDateString()}`);
  doc.text(`Status: ${invoice.status}`);
  doc.moveDown();
  invoice.items.forEach((item) => {
    doc.text(`${item.description} - Qty: ${item.quantity} - ${Number(item.total).toLocaleString()} RWF`);
  });
  doc.moveDown();
  doc.fontSize(12).text(`Total: ${Number(invoice.total).toLocaleString()} RWF`, { align: 'right' });
  doc.end();
}));

router.get('/leads/excel', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Leads');
  sheet.columns = [
    { header: 'Name', key: 'name', width: 25 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone', key: 'phone', width: 15 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Source', key: 'source', width: 15 },
    { header: 'Interest', key: 'interest', width: 20 },
    { header: 'Created', key: 'created', width: 15 },
  ];
  leads.forEach((l) => {
    sheet.addRow({
      name: `${l.firstName} ${l.lastName}`,
      email: l.email,
      phone: l.phone,
      status: l.status,
      source: l.source,
      interest: l.interest,
      created: l.createdAt.toLocaleDateString(),
    });
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=leads-export.xlsx');
  await workbook.xlsx.write(res);
  res.end();
}));

router.get('/inventory/excel', authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const products = await prisma.product.findMany({ include: { stockLevels: true } });
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Inventory');
  sheet.columns = [
    { header: 'SKU', key: 'sku', width: 15 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Category', key: 'category', width: 20 },
    { header: 'Price', key: 'price', width: 15 },
    { header: 'Stock', key: 'stock', width: 10 },
  ];
  products.forEach((p) => {
    const stock = p.stockLevels.reduce((sum, s) => sum + s.quantity, 0);
    sheet.addRow({ sku: p.sku, name: p.name, category: p.category, price: Number(p.price), stock });
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=inventory-export.xlsx');
  await workbook.xlsx.write(res);
  res.end();
}));

export default router;
