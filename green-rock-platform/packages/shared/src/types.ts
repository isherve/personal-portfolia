export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalProperties: number;
  activeProjects: number;
  totalRevenue: number;
  pendingInvoices: number;
  openLeads: number;
  lowStockItems: number;
  pendingDeliveries: number;
}
