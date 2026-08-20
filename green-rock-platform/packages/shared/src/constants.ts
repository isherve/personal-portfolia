export const APP_NAME = 'Green Rock General Supply Ltd';
export const APP_SHORT_NAME = 'Green Rock';

export const SUPPORTED_LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const PAGINATION_DEFAULT_LIMIT = 20;
export const PAGINATION_MAX_LIMIT = 100;

export const PROPERTY_TYPES = [
  'RESIDENTIAL',
  'COMMERCIAL',
  'INDUSTRIAL',
  'LAND',
  'MIXED_USE',
] as const;

export const LISTING_TYPES = ['SALE', 'RENT'] as const;

export const PROJECT_STATUSES = [
  'PLANNING',
  'IN_PROGRESS',
  'ON_HOLD',
  'COMPLETED',
  'CANCELLED',
] as const;

export const INVOICE_STATUSES = [
  'DRAFT',
  'SENT',
  'PARTIAL',
  'PAID',
  'OVERDUE',
  'CANCELLED',
] as const;

export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL',
  'NEGOTIATION',
  'WON',
  'LOST',
] as const;
