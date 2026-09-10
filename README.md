# CargoIQ

AI-powered international trade compliance platform.

CargoIQ helps users analyze products for international trade by providing insights related to trade compliance, regulations, taxes, and other relevant requirements.

## How It Works

1. User enters product and trade details.
2. CargoIQ processes the information.
3. AI analyzes the trade information.
4. The platform returns relevant compliance and trade insights.

## Tech Stack

- **Frontend:** React / TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL + Prisma
- **Authentication:** JWT + bcrypt
- **AI:** Google Gemini API

## Project Structure

CargoIQ/
│
├── front-end/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── types/
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── public/
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── back-end/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   ├── gemini.ts
│   │   │   └── prisma.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── tradeAnalysis.controller.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validate.ts
│   │   │   └── errorHandler.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── tradeAnalysis.routes.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── ai.service.ts
│   │   │   └── tradeAnalysis.service.ts
│   │   │
│   │   ├── types/
│   │   │   ├── auth.types.ts
│   │   │   ├── tradeAnalysis.types.ts
│   │   │   └── express.d.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   └── validators/
│   │   │
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── README.md
│
└── README.md
