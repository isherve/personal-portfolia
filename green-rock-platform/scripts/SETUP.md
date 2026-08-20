# Green Rock — One-Command Setup (Windows)

Run from `green-rock-platform/`:

```powershell
.\scripts\setup.ps1
```

Or manually:

```powershell
npm install
npm run db:generate
cd apps/api
npx prisma migrate dev --name init   # first time only
npm run db:seed
cd ../..
npm run dev
```

## URLs (default ports)

| Service | URL |
|---------|-----|
| Website | http://localhost:3001 |
| API | http://localhost:5000 |
| Swagger | http://localhost:5000/api/docs |

## Login

Password: `Password123!`  
Admin: `admin@greenrock.com`  
Customer: `customer@greenrock.com`

## Database

Default `.env` uses:
```
postgresql://postgres:postgres@localhost:5432/greenrock
```

Update `apps/api/.env` if your PostgreSQL credentials differ.

Docker (optional):
```powershell
docker compose up -d postgres redis
```
