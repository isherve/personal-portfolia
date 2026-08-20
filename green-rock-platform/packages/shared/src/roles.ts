export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  MANAGING_DIRECTOR = 'MANAGING_DIRECTOR',
  FINANCE_MANAGER = 'FINANCE_MANAGER',
  HR_MANAGER = 'HR_MANAGER',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  SALES_MANAGER = 'SALES_MANAGER',
  REAL_ESTATE_OFFICER = 'REAL_ESTATE_OFFICER',
  PROCUREMENT_OFFICER = 'PROCUREMENT_OFFICER',
  INVENTORY_MANAGER = 'INVENTORY_MANAGER',
  WAREHOUSE_OFFICER = 'WAREHOUSE_OFFICER',
  DELIVERY_OFFICER = 'DELIVERY_OFFICER',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  MARKETING_OFFICER = 'MARKETING_OFFICER',
  EMPLOYEE = 'EMPLOYEE',
  CUSTOMER = 'CUSTOMER',
}

export const INTERNAL_ROLES: UserRole[] = [
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
  UserRole.EMPLOYEE,
];

export const ADMIN_ROLES: UserRole[] = [
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

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
  [UserRole.MANAGING_DIRECTOR]: 'Managing Director',
  [UserRole.FINANCE_MANAGER]: 'Finance Manager',
  [UserRole.HR_MANAGER]: 'HR Manager',
  [UserRole.PROJECT_MANAGER]: 'Project Manager',
  [UserRole.SALES_MANAGER]: 'Sales Manager',
  [UserRole.REAL_ESTATE_OFFICER]: 'Real Estate Officer',
  [UserRole.PROCUREMENT_OFFICER]: 'Procurement Officer',
  [UserRole.INVENTORY_MANAGER]: 'Inventory Manager',
  [UserRole.WAREHOUSE_OFFICER]: 'Warehouse Officer',
  [UserRole.DELIVERY_OFFICER]: 'Delivery Officer',
  [UserRole.CUSTOMER_SUPPORT]: 'Customer Support',
  [UserRole.MARKETING_OFFICER]: 'Marketing Officer',
  [UserRole.EMPLOYEE]: 'Employee',
  [UserRole.CUSTOMER]: 'Customer',
};

export function isInternalRole(role: UserRole): boolean {
  return INTERNAL_ROLES.includes(role);
}

export function isAdminRole(role: UserRole): boolean {
  return ADMIN_ROLES.includes(role);
}
