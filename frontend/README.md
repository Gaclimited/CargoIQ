# CargoIQ Frontend

Production-quality React + TypeScript frontend for the CargoIQ AI trade
compliance backend. Built with Vite, Tailwind CSS v4, React Router, Axios,
and TanStack Query.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `src/index.css`, no `tailwind.config.js`)
- **React Router v6** for client-side routing
- **Axios** for HTTP, with an interceptor that attaches the JWT and normalizes backend errors
- **TanStack Query** for server-state caching, loading/error states, and mutations
- **React Context** for auth session state (JWT + user), persisted to `localStorage`

## Prerequisites

- Node.js 18+
- The backend running locally (default `http://localhost:5000`), with its own
  `.env` configured (`DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, etc.) and
  migrations applied.

## Setup (PowerShell)

```powershell
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

If your backend runs on a different port, update `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:5000
```

## Build

```powershell
npm run build
npm run preview
```

## Folder structure

```
src/
  api/          Axios instance + one file per backend resource (auth, tradeAnalysis)
  components/
    ui/         Reusable primitives: Button, Input, TextArea, Card, Spinner, Alert, Badge
    layout/     Navbar, Footer, AppLayout, ProtectedRoute
    trade/      Domain components: AnalysisForm, AnalysisResult, AnalysisCard, AnalysisList
  context/      AuthContext (JWT + user session)
  hooks/        useAuth, useTradeAnalyses (TanStack Query wrappers)
  pages/        One component per route
  routes/       AppRoutes.tsx - central route table
  types/        TypeScript types mirroring the backend's Zod schemas, Prisma model, and response envelopes
  utils/        tokenStorage (localStorage), formatters (currency/date/tri-state)
```

## How this maps to the backend

| Backend | Frontend |
|---|---|
| `POST /register`, `POST /login` | `src/api/auth.api.ts` |
| `POST /analyze`, `GET /analysis`, `GET /analysis/:id`, `DELETE /analysis/:id` | `src/api/tradeAnalysis.api.ts` |
| `Authorization: Bearer <token>` (auth.middleware.ts) | `src/api/client.ts` request interceptor |
| `{ success, message, data }` / `{ success:false, message, errors? }` (errorHandler.ts) | `src/types/api.types.ts` + response interceptor in `client.ts` |
| Zod `registerSchema` / `loginSchema` / `createTradeAnalysisSchema` | Client-side validation in `RegisterPage.tsx`, `LoginPage.tsx`, `AnalysisForm.tsx` mirrors the same rules |
| `TradeAnalysis` Prisma model + `aiResponse` JSON (Gemini output) | `src/types/tradeAnalysis.types.ts`, rendered in `AnalysisResult.tsx` |

No backend endpoints, request bodies, or response shapes were invented —
everything above was derived directly from the uploaded backend source.

## Known backend note (not modified)

`src/types/express.d.ts` in the backend imports an `AuthPayload` type from
`auth.types.ts` that isn't exported there, which will fail `tsc` build on the
backend. This wasn't touched per your instructions — flagging it here in case
you want it fixed.
