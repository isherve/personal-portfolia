# Green Rock Platform — Setup Script (Windows)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "Green Rock EMS Setup" -ForegroundColor Green

Write-Host "`n[1/5] Installing dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`n[2/5] Generating Prisma client..." -ForegroundColor Cyan
npm run db:generate
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`n[3/5] Running database migrations..." -ForegroundColor Cyan
Push-Location apps\api
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
npx prisma migrate dev --name init
if ($LASTEXITCODE -ne 0) { Pop-Location; exit 1 }

Write-Host "`n[4/5] Seeding database..." -ForegroundColor Cyan
npm run db:seed
Pop-Location
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`n[5/5] Running tests..." -ForegroundColor Cyan
npm run test --workspace=@green-rock/api

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "  Website:  http://localhost:3001"
Write-Host "  API:      http://localhost:5000"
Write-Host "  Swagger:  http://localhost:5000/api/docs"
Write-Host "  Login:    admin@greenrock.com / Password123!"
Write-Host "`nStart dev servers: npm run dev" -ForegroundColor Yellow
