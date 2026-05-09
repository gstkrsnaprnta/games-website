# GAMES Web

MVP website Gebyar Matematika Sains (GAMES) berbasis React, Vite, TypeScript, Tailwind CSS, dan Supabase.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Supabase Database/Auth/RLS
- Target deploy: Cloudflare Pages atau Vercel

## Cara Menjalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

Isi `.env.local` dengan:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Jangan gunakan service role key di frontend.

## Supabase

Migration awal tersedia di `supabase/migrations/001_initial_schema.sql`.
Seed awal tersedia di `supabase/seed/seed.sql`.

## Script

```bash
npm run dev
npm run build
npm run lint
```
