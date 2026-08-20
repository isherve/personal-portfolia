import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { config } from '../config';
import { AppError } from './errorHandler';
import prisma from '../lib/prisma';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: UserRole;
  };
}

export async function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(401, 'Authentication required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret) as {
      userId: string;
      email: string;
      role: UserRole;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, isActive: true },
    });

    if (!user || !user.isActive) {
      throw new AppError(401, 'User account is inactive or not found');
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(new AppError(401, 'Invalid or expired token'));
  }
}

export function optionalAuth(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as {
      userId: string;
      email: string;
      role: UserRole;
    };
    req.user = decoded;
  } catch {
    // ignore invalid token for optional auth
  }
  next();
}

export function authorize(...roles: UserRole[]) {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, 'Authentication required'));
    }
    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return next(new AppError(403, 'Insufficient permissions'));
    }
    next();
  };
}

const ADMIN_ROLES: UserRole[] = [
  UserRole.SUPER_ADMIN,
  UserRole.MANAGING_DIRECTOR,
  UserRole.FINANCE_MANAGER,
  UserRole.HR_MANAGER,
  UserRole.PROJECT_MANAGER,
  UserRole.SALES_MANAGER,
  UserRole.REAL_ESTATE_OFFICER,
  UserRole.PROCUREMENT_OFFICER,
  UserRole.INVENTORY_MANAGER,
  UserRole.WAREHOUSE_OFFICER,
  UserRole.DELIVERY_OFFICER,
  UserRole.CUSTOMER_SUPPORT,
  UserRole.MARKETING_OFFICER,
];

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  return authorize(...ADMIN_ROLES)(req, res, next);
}

export function requireCustomer(req: AuthRequest, res: Response, next: NextFunction) {
  return authorize(UserRole.CUSTOMER)(req, res, next);
}

export function requireEmployee(req: AuthRequest, res: Response, next: NextFunction) {
  const employeeRoles: UserRole[] = [
    ...ADMIN_ROLES,
    UserRole.EMPLOYEE,
  ];
  return authorize(...employeeRoles)(req, res, next);
}
