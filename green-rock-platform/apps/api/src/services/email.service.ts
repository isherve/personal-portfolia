import nodemailer from 'nodemailer';
import { config } from '../config';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: config.email.user
    ? { user: config.email.user, pass: config.email.pass }
    : undefined,
});

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  if (!config.email.user) {
    console.log('[Email Mock]', options.to, options.subject);
    return;
  }

  await transporter.sendMail({
    from: config.email.from,
    ...options,
  });
}

export async function sendWelcomeEmail(to: string, name: string) {
  await sendEmail({
    to,
    subject: 'Welcome to Green Rock General Supply',
    html: `<h1>Welcome, ${name}!</h1><p>Your account has been created successfully.</p>`,
    text: `Welcome, ${name}! Your account has been created successfully.`,
  });
}

export async function sendNotificationEmail(to: string, title: string, message: string) {
  await sendEmail({
    to,
    subject: title,
    html: `<h2>${title}</h2><p>${message}</p>`,
    text: `${title}\n\n${message}`,
  });
}
