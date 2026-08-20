# Green Rock API Documentation

Base URL: `http://localhost:5000/api/v1`

Interactive docs: `http://localhost:5000/api/docs`

## Authentication

All protected endpoints require `Authorization: Bearer <accessToken>` header.

### POST /auth/register
Register a customer account.

### POST /auth/login
Returns `{ user, accessToken, refreshToken }`.

### GET /auth/me
Get current user profile.

---

## Public Endpoints (no auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /properties/public/listings | Browse property listings |
| GET | /properties/public/listings/:slug | Property detail |
| POST | /properties/public/inquiries | Submit contact inquiry |
| GET | /inventory/public/products | Materials catalog |
| GET | /inventory/public/products/:slug | Product detail |
| GET | /cms/public/blog | Blog posts |
| GET | /cms/public/blog/:slug | Blog post |
| GET | /cms/public/testimonials | Testimonials |
| GET | /cms/public/gallery | Gallery items |
| GET | /cms/public/careers | Job listings |
| POST | /cms/public/careers/:id/apply | Apply for job |

---

## Admin Endpoints (require admin role)

| Module | Endpoints |
|--------|-----------|
| Dashboard | GET /dashboard/executive, /dashboard/sales-chart, /dashboard/recent-activity |
| CRM | GET/POST /crm/leads, PATCH /crm/leads/:id, GET /crm/customers/list |
| Properties | CRUD /properties, POST /properties/:id/listings |
| Inventory | CRUD /inventory/products, POST /inventory/movements, GET /inventory/warehouses |
| Projects | CRUD /projects, POST /projects/:id/tasks |
| Finance | GET/POST /finance/invoices, POST /finance/payments, GET /finance/quotations |
| HR | GET /hr/employees, POST /hr/attendance, GET/POST /hr/leave |
| Procurement | GET/POST /procurement/suppliers, /procurement/purchase-orders |
| Fleet | GET/POST /fleet/vehicles, /fleet/deliveries |
| CMS | CRUD /cms/blog, /cms/testimonials, /cms/gallery, /cms/careers |
| System | GET /system/users, /system/audit-logs, /system/settings |

---

## Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /dashboard/customer | Customer dashboard stats |
| GET | /properties/saved/mine | Saved properties |
| POST | /properties/saved | Save a property |
| GET | /finance/invoices/mine | My invoices |
| POST | /finance/quotations | Request quote |
| POST | /projects/construction-requests | Request construction |
| GET | /support/appointments/mine | My appointments |
| POST | /support/appointments | Book appointment |
| GET | /support/tickets/mine | My support tickets |
| POST | /support/tickets | Create ticket |

---

## Export

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /export/invoices/:id/pdf | Download invoice PDF |
| GET | /export/leads/excel | Export leads to Excel |
| GET | /export/inventory/excel | Export inventory to Excel |

---

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "meta": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 }
}
```

Error response:
```json
{
  "success": false,
  "error": "Error message"
}
```
