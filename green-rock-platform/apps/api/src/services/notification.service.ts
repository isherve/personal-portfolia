import prisma from '../lib/prisma';
import { NotificationType } from '@prisma/client';
import { sendNotificationEmail } from './email.service';

export async function createNotification(data: {
  userId: string;
  type?: NotificationType;
  title: string;
  message: string;
  link?: string;
  sendEmail?: boolean;
  email?: string;
}) {
  const notification = await prisma.notification.create({
    data: {
      userId: data.userId,
      type: data.type || NotificationType.INFO,
      title: data.title,
      message: data.message,
      link: data.link,
    },
  });

  if (data.sendEmail && data.email) {
    await sendNotificationEmail(data.email, data.title, data.message);
  }

  return notification;
}

export async function notifyAdmins(title: string, message: string, link?: string) {
  const admins = await prisma.user.findMany({
    where: {
      role: {
        in: ['SUPER_ADMIN', 'MANAGING_DIRECTOR', 'CUSTOMER_SUPPORT', 'SALES_MANAGER'],
      },
      isActive: true,
    },
    select: { id: true, email: true },
  });

  await Promise.all(
    admins.map((admin) =>
      createNotification({
        userId: admin.id,
        title,
        message,
        link,
        sendEmail: true,
        email: admin.email,
      })
    )
  );
}
