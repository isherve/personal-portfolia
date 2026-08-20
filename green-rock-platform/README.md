# Green Rock General Supply Ltd — Enterprise Management Platform

Unified enterprise platform combining **Public Website**, **Customer Portal**, **Employee Portal**, and **Admin ERP** — all sharing one backend API and PostgreSQL database.

## Architecture

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Public Website │  │ Customer Portal │  │  Admin / Employee│
│   (Next.js)     │  │   (Next.js)     │  │    (Next.js)     │
└────────┬────────┘  └────────┬────────┘  └────────┬─────────┘
         │                    │                     │
         └────────────────────┼─────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Express API      │
                    │  Prisma ORM       │
                    │  Swagger Docs     │
                    └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
        ┌─────▼─────┐  ┌──────▼──────┐  ┌─────▼─────┐
        │ PostgreSQL│  │    Redis    │  │ Cloudinary│
        └───────────┘  └─────────────┘  └───────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, TailwindCSS, shadcn/ui |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL 16, Prisma ORM |
| Auth | JWT + Refresh Tokens, RBAC (15 roles) |
| Real-time | Socket.io |
| Media | Cloudinary |
| Maps | Google Maps API |
| Export | PDF (PDFKit), Excel (ExcelJS) |
| DevOps | Docker, Docker Compose, GitHub Actions |

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (recommended)
- PostgreSQL 16 (if not using Docker)

### 1. Clone & Install

```bash
cd green-rock-platform
npm install
```

### 2. Environment Setup

```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` with your database URL and secrets.

### 3. Start with Docker

```bash
docker-compose up -d postgres redis
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

- **Website:** http://localhost:3001
- **API:** http://localhost:5001
- **Swagger:** http://localhost:5001/api/docs

### 4. Manual Setup (without Docker)

```bash
# Start PostgreSQL locally, then:
cd apps/api
cp .env.example .env
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
cd ../..
npm run dev
```

## Default Login Credentials

Password for all accounts: `Password123!`

| Role | Email |
|------|-------|
| Super Admin | admin@greenrock.com |
| Managing Director | director@greenrock.com |
| Finance Manager | finance@greenrock.com |
| Sales Manager | sales@greenrock.com |
| HR Manager | hr@greenrock.com |
| Employee | employee@greenrock.com |
| Customer | customer@greenrock.com |

## Portal Access

| Portal | URL | Roles |
|--------|-----|-------|
| Public Website | `/` | Everyone |
| Customer Portal | `/portal` | CUSTOMER |
| Employee Portal | `/employee` | EMPLOYEE + internal |
| Admin ERP | `/admin` | All admin roles |

## Business Modules

- CRM & Lead Management
- Real Estate & Property Listings
- Construction Project Management
- Inventory & Warehouse Management
- Building Materials & Timber Sales
- Procurement & Supplier Management
- Fleet & Delivery Management
- HR, Attendance, Leave, Payroll
- Accounting, Invoices, Expenses, Quotations
- Contract Management
- Appointments & Support Tickets
- Marketing Campaigns
- CMS (Blog, Gallery, Testimonials, Careers)
- Analytics, Reports, Audit Logs
- Document Management & Notifications

## API Documentation

Swagger UI available at `/api/docs` when the API is running.

### Key Endpoints

```
POST   /api/v1/auth/login
POST   /api/v1/auth/register
GET    /api/v1/properties/public/listings
GET    /api/v1/inventory/public/products
GET    /api/v1/dashboard/executive
GET    /api/v1/crm/leads
GET    /api/v1/finance/invoices
GET    /api/v1/export/leads/excel
GET    /api/v1/export/invoices/:id/pdf
```

## Project Structure

```
green-rock-platform/
├── apps/
│   ├── api/                 # Express backend
│   │   ├── prisma/          # Schema, migrations, seed
│   │   └── src/
│   │       ├── routes/      # API route modules
│   │       ├── middleware/  # Auth, RBAC, audit
│   │       └── services/    # Email, Cloudinary, notifications
│   └── web/                 # Next.js frontend
│       └── src/
│           ├── app/         # Pages (public, portal, admin)
│           ├── components/  # UI components
│           └── lib/         # API client, auth
├── packages/
│   └── shared/              # Shared types, roles, constants
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Testing

```bash
npm run test --workspace=@green-rock/api
```

## Deployment

### Production Docker

```bash
docker-compose up -d
```

### Environment Variables (Production)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_REFRESH_SECRET` | Refresh token secret |
| `CLOUDINARY_*` | Cloudinary credentials |
| `SMTP_*` | Email configuration |
| `NEXT_PUBLIC_API_URL` | API URL for frontend |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps key |

## Features

- Enterprise UI/UX with dark mode
- Multi-language (EN/FR)
- Role-Based Access Control (15 roles)
- Audit logging
- Real-time notifications (Socket.io)
- Email notifications
- PDF & Excel export
- Interactive dashboards with charts
- SEO optimized public pages
- Responsive design

## License

Proprietary — Green Rock General Supply Ltd
