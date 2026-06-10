# AMDARIS

Aplicație full-stack Next.js 15 pentru website de companie software B2B, cu dashboard administrativ, API-uri protejate, PostgreSQL prin Prisma și autentificare NextAuth JWT.

## Stack

- Next.js 15, React, TypeScript, Tailwind CSS
- Next.js API Routes pe Node.js
- PostgreSQL cu Prisma ORM
- NextAuth.js cu email/parolă și sesiuni JWT
- Upload local în `public/uploads`, validare imagine și optimizare cu `sharp`

## Rulare locală

1. Instalează dependențele:

```bash
npm install
```

2. Pornește PostgreSQL local:

```bash
docker compose up -d
```

3. Creează `.env.local` pornind de la `.env.example`:

```bash
DATABASE_URL="postgresql://amdaris:amdaris@localhost:5432/amdaris"
NEXTAUTH_SECRET="un-secret-lung-pentru-dezvoltare"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@amdaris.ro"
ADMIN_PASSWORD_HASH=""
UPLOAD_DIR="public/uploads"
```

4. Rulează migrațiile și seed-ul:

```bash
npx prisma migrate dev --name init
npm run seed
```

Seed-ul creează utilizatorul `admin@amdaris.ro`. Dacă `ADMIN_PASSWORD_HASH` este gol, parola locală este `Admin1234!`.

5. Pornește serverul:

```bash
npm run dev
```

Site public: `http://localhost:3000`  
Dashboard: `http://localhost:3000/dashboard`

## Rute principale

- `/` homepage în română
- `/services` servicii, pachete și industrii
- `/projects` galerie proiecte cu filtre
- `/projects/[id]` studiu de caz
- `/about` prezentare companie
- `/contact` formular lead-uri cu validare
- `/login` autentificare administratori
- `/dashboard` statistici și activitate
- `/dashboard/projects`, `/dashboard/services`, `/dashboard/leads`, `/dashboard/settings`

## API

- `GET /api/projects`
- `GET /api/projects/[id]`
- `POST /api/projects` admin
- `PUT /api/projects/[id]` admin
- `DELETE /api/projects/[id]` admin
- `GET /api/services`
- `POST /api/services` admin
- `PUT /api/services/[id]` admin
- `DELETE /api/services/[id]` admin
- `GET /api/packages`
- `POST /api/packages` admin
- `PUT /api/packages/[id]` admin
- `DELETE /api/packages/[id]` admin
- `POST /api/leads`
- `GET /api/leads` admin
- `PUT /api/leads/[id]` admin
- `DELETE /api/leads/[id]` admin
- `POST /api/uploads` admin
- `DELETE /api/uploads` admin

## Deploy

Pentru Vercel, Railway sau Render:

1. Setează variabilele din `.env.example` în platformă.
2. Folosește PostgreSQL managed.
3. Rulează `npm run prisma:deploy` înainte de start sau în etapa de release.
4. Pentru upload local persistent, folosește un serviciu cu disc persistent. Pentru Vercel, migrarea ulterioară către S3 este recomandată.

## Securitate

- Parole hash-uite cu bcrypt
- Sesiuni JWT cu expirare la 30 de zile
- Rute admin protejate prin NextAuth middleware
- Validare Zod pe endpoint-uri
- Prisma pentru protecție la SQL injection
- Validare tip și dimensiune la upload
- Rate limit în memorie pentru formularul public de contact
