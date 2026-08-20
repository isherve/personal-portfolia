import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

export function auditLog(action: string, entity: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);

    res.json = function (body: unknown) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const userId = (req as { user?: { userId: string } }).user?.userId;
        prisma.auditLog
          .create({
            data: {
              userId,
              action,
              entity,
              entityId: (req.params as { id?: string }).id,
              newData: body as object,
              ipAddress: req.ip,
              userAgent: req.get('user-agent'),
            },
          })
          .catch(console.error);
      }
      return originalJson(body);
    };

    next();
  };
}

export async function createAuditLog(data: {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  oldData?: object;
  newData?: object;
  ipAddress?: string;
  userAgent?: string;
}) {
  return prisma.auditLog.create({ data });
}
