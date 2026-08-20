# Deployment Guide — Green Rock EMS

## Option 1: Docker Compose (Recommended)

```bash
# 1. Clone repository
git clone <repo-url>
cd green-rock-platform

# 2. Configure environment
cp apps/api/.env.example apps/api/.env
# Edit .env with production secrets

# 3. Set production secrets in docker-compose or .env
export JWT_SECRET=your-strong-secret
export JWT_REFRESH_SECRET=your-refresh-secret

# 4. Start all services
docker-compose up -d

# 5. Run migrations and seed (first time only)
docker exec greenrock-api npx prisma migrate deploy
docker exec greenrock-api npx tsx prisma/seed.ts
```

Services:
- Web: http://localhost:3001
- API: http://localhost:5000
- Swagger: http://localhost:5000/api/docs

## Option 2: Manual Deployment

### Database
1. Provision PostgreSQL 16 (AWS RDS, DigitalOcean, Supabase)
2. Set `DATABASE_URL` in `apps/api/.env`

### API Server
```bash
cd green-rock-platform
npm install
npm run db:generate
npm run db:migrate:deploy --workspace=@green-rock/api
npm run build --workspace=@green-rock/api
npm run start --workspace=@green-rock/api
```

Use PM2 for process management:
```bash
pm2 start apps/api/dist/index.js --name green-rock-api
```

### Web Frontend
```bash
npm run build --workspace=@green-rock/web
npm run start --workspace=@green-rock/web
```

Or deploy to Vercel:
- Root directory: `apps/web`
- Build command: `npm run build`
- Environment: `NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1`

## Production Checklist

- [ ] Change JWT secrets
- [ ] Configure Cloudinary credentials
- [ ] Configure SMTP for email
- [ ] Set up SSL/TLS (HTTPS)
- [ ] Configure CORS_ORIGIN to production domain
- [ ] Enable PostgreSQL backups
- [ ] Set up monitoring (Sentry, Datadog)
- [ ] Configure rate limiting for production load
- [ ] Review RBAC role assignments
- [ ] Remove or change seed passwords

## Environment Variables

See `apps/api/.env.example` for full list.

Critical production variables:
```
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
CORS_ORIGIN=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_USER=
SMTP_PASS=
```

## Scaling

- **API:** Run multiple instances behind a load balancer
- **Database:** Add read replica for reports
- **Redis:** Use managed Redis for caching and Socket.io adapter
- **CDN:** Cloudflare for static assets and public listings cache
