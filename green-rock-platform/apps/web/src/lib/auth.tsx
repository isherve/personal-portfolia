'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from './api';
import { UserRole } from '@green-rock/shared';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: object) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isCustomer: boolean;
  isEmployee: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_ROLES = [
  'SUPER_ADMIN', 'MANAGING_DIRECTOR', 'FINANCE_MANAGER', 'HR_MANAGER',
  'PROJECT_MANAGER', 'SALES_MANAGER', 'REAL_ESTATE_OFFICER', 'PROCUREMENT_OFFICER',
  'INVENTORY_MANAGER', 'WAREHOUSE_OFFICER', 'DELIVERY_OFFICER', 'CUSTOMER_SUPPORT', 'MARKETING_OFFICER',
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) { setLoading(false); return; }
    try {
      const res = await authApi.me();
      setUser(res.data as User);
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    setUser(res.data.user as User);
  };

  const register = async (data: object) => {
    await authApi.register(data);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const role = user?.role || '';
  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout,
      isAdmin: ADMIN_ROLES.includes(role),
      isCustomer: role === 'CUSTOMER',
      isEmployee: role === 'EMPLOYEE' || ADMIN_ROLES.includes(role),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function getPortalRedirect(role: string): string {
  if (ADMIN_ROLES.includes(role)) return '/admin';
  if (role === 'EMPLOYEE') return '/employee';
  if (role === 'CUSTOMER') return '/portal';
  return '/';
}
