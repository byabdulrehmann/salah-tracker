# Siraj — Salah & Tahajjud Tracker

A calm, private web app for keeping a consistent rhythm of the five daily prayers and
Tahajjud across the month.

**Live:** https://salah-tracker-psi.vercel.app

## Features

- Daily check-in for Fajr, Dhuhr, Asr, Maghrib and Isha, marked on time or late
- Tahajjud tracking alongside the daily prayers
- Dashboard with streaks and a month-by-month view
- Consistency forecast API: a transparent, rule-based score that estimates the risk of missing
  Tahajjud from the weekday, the previous night, late-night activity and the 7-day streak,
  and suggests one small intervention
- Email sign-up and login with Supabase Auth

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| UI | Tailwind CSS, shadcn/ui, Base UI, Lucide icons |
| Backend | Supabase (Postgres, Auth) via `@supabase/ssr` |
| Hosting | Vercel, with a monthly cron job |

## Data and security

- Schema in [`supabase/schema.sql`](supabase/schema.sql): `profiles`, `daily_prayers`,
  `tahajjud_logs` and `archived_months`, with check constraints on every enumerated field
- Row Level Security on every table: each user can only read and write their own rows
- Server-side input validation on the API routes; the cron endpoint is protected by a bearer secret
- Security headers configured in `next.config.mjs`

## Project structure

```
app/                 pages, auth routes and API routes (forecast, monthly archive cron)
components/          UI components
lib/supabase/        browser, server and middleware Supabase clients
lib/ml/              consistency forecast
supabase/schema.sql  database schema and RLS policies
```

## Getting started

```bash
pnpm install
```

Create `.env.local` with your Supabase project settings:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
CRON_SECRET=...
```

Run `supabase/schema.sql` in the Supabase SQL editor, then:

```bash
pnpm dev
```
