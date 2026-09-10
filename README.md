# CargoIQ

**AI-powered international trade compliance platform**

CargoIQ is a web application designed to help users understand the
potential trade, customs, tax, documentation, and regulatory
requirements associated with moving a product from one country to
another.

The user provides basic product and shipment information, and CargoIQ
uses AI to generate a structured trade-compliance analysis.

> **Project status:** In development --- AI-powered analysis is being
> integrated using the Gemini API.

------------------------------------------------------------------------

## 🚀 What CargoIQ Does

CargoIQ is built around a simple workflow:

1.  Create an account or log in.
2.  Enter product and trade information.
3.  Submit the product for analysis.
4.  CargoIQ sends the information to an AI service.
5.  The AI generates a structured analysis.
6.  The analysis is saved to the database.
7.  The user can view previous analyses or delete them.

### Example

A user could enter:

-   **Origin:** India
-   **Destination:** USA
-   **Product:** Mechanical Keyboard
-   **Category:** Electronics
-   **Value:** \$50
-   **Weight:** 1.2 kg
-   **Description:** Mechanical keyboard with gold-plated keycaps, RGB
    lighting, Bluetooth connectivity, and a rechargeable lithium
    battery.

CargoIQ can then provide information such as:

-   Product type
-   Main materials
-   Whether electronics are present
-   Whether a battery is present
-   Whether wireless functionality is present
-   Possible HS code
-   Import duty information
-   VAT/tax information
-   Required documents
-   Country-specific regulations
-   AI suggestions
-   Confidence notes

------------------------------------------------------------------------

## 🧠 AI Integration

CargoIQ uses the **Google Gemini API** for AI-powered trade analysis.

The backend uses Google's official `@google/genai` SDK and is configured
to use:

``` text
gemini-2.5-flash
```

The API key is stored in an environment variable and is **not included
in the repository**.

``` env
GEMINI_API_KEY="your_gemini_api_key_here"
```

The AI service is separated from the rest of the application so that the
AI implementation can be changed without rewriting the trade-analysis
logic.

------------------------------------------------------------------------

## 🏗️ Project Structure

``` text
CargoIQ/
│
├── front-end/
│   └── Frontend application
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
│   └── prisma/
│       └── schema.prisma
│
└── README.md
```

------------------------------------------------------------------------

## ⚙️ Tech Stack

### Frontend

The frontend is maintained separately inside the `front-end` directory.

### Backend

-   **Node.js**
-   **Express.js**
-   **TypeScript**
-   **Prisma ORM**
-   **PostgreSQL**
-   **JWT** for authentication
-   **bcrypt** for password hashing
-   **Zod** for request validation
-   **Google Gemini API** for AI analysis
-   **CORS** for frontend/backend communication
-   **Nodemon + ts-node** for development

------------------------------------------------------------------------

## 🔐 Authentication

CargoIQ uses JWT-based authentication.

### Registration

``` http
POST /register
```

Creates a new user account.

### Login

``` http
POST /login
```

Authenticates the user and returns a JWT token.

Protected endpoints require:

``` http
Authorization: Bearer <token>
```

Passwords are hashed using bcrypt before being stored.

------------------------------------------------------------------------

## 📊 Trade Analysis API

### Analyze a product

``` http
POST /analyze
```

Requires authentication.

Example request:

``` json
{
  "originCountry": "India",
  "destinationCountry": "USA",
  "productName": "Mechanical Keyboard",
  "category": "Electronics",
  "value": 50,
  "weight": 1.2,
  "description": "Mechanical keyboard with gold-plated keycaps, RGB lighting, Bluetooth connectivity, rechargeable lithium battery."
}
```

### Get user's analyses

``` http
GET /analysis
```

Returns analyses belonging to the authenticated user.

### Get one analysis

``` http
GET /analysis/:id
```

Returns a specific analysis if it belongs to the authenticated user.

### Delete an analysis

``` http
DELETE /analysis/:id
```

Deletes a specific analysis owned by the authenticated user.

------------------------------------------------------------------------

## 🗄️ Database

CargoIQ uses **PostgreSQL** with **Prisma ORM**.

The database stores:

-   User accounts
-   Authentication-related information
-   Trade analysis requests
-   AI-generated analysis responses
-   Ownership information
-   Creation timestamps

Prisma is used to communicate with PostgreSQL and manage the database
schema.

------------------------------------------------------------------------

## 🛡️ Validation & Security

CargoIQ includes several backend safeguards:

-   JWT authentication for protected routes
-   bcrypt password hashing
-   Zod request validation
-   Environment variables for secrets and API keys
-   User ownership checks for saved analyses
-   Centralized error handling
-   CORS configuration
-   API keys excluded from source control

------------------------------------------------------------------------

## 🔧 Local Setup

### Prerequisites

Make sure you have:

-   Node.js
-   npm
-   PostgreSQL
-   Git
-   A Gemini API key

### 1. Clone the repository

``` powershell
git clone <repository-url>
cd CargoIQ
```

### 2. Install backend dependencies

``` powershell
cd back-end
npm install
```

### 3. Create `.env`

Create a `.env` file inside `back-end/`.

Example:

``` env
PORT=5000
NODE_ENV=development

DATABASE_URL="postgresql://username:password@localhost:5432/trade_db?schema=public"

JWT_SECRET="replace_this_with_a_long_random_secret"
JWT_EXPIRES_IN="7d"

GEMINI_API_KEY="your_gemini_api_key_here"
```

Do **not** commit the real `.env` file.

### 4. Set up Prisma

``` powershell
npx prisma generate
npx prisma migrate dev
```

### 5. Start the backend

``` powershell
npm run dev
```

The backend should run on:

``` text
http://localhost:5000
```

Health check:

``` http
GET /health
```

------------------------------------------------------------------------

## 🧪 Development Testing

Authentication can be tested using PowerShell, Postman, or another API
client.

Example login:

``` powershell
$login = Invoke-RestMethod -Uri "http://localhost:5000/login" -Method Post -ContentType "application/json" -Body '{"email":"test@example.com","password":"password123"}'

$token = $login.data.token
```

Then use the token to call the protected analysis endpoint:

``` powershell
Invoke-RestMethod -Uri "http://localhost:5000/analyze" -Method Post -ContentType "application/json" -Headers @{ Authorization = "Bearer $token" } -Body '{"originCountry":"India","destinationCountry":"USA","productName":"Mechanical Keyboard","category":"Electronics","value":50,"weight":1.2,"description":"Mechanical keyboard with gold-plated keycaps, RGB lighting, Bluetooth connectivity, rechargeable lithium battery."}'
```

------------------------------------------------------------------------

## 🔄 Backend Architecture

The backend follows a layered structure:

``` text
Request
   ↓
Route
   ↓
Validation Middleware
   ↓
Authentication Middleware
   ↓
Controller
   ↓
Service
   ↓
Database / Gemini API
   ↓
Response
```

This separation keeps the application easier to maintain and allows
different parts of the system to be developed independently.

------------------------------------------------------------------------

## 📌 Current Development Steps

The backend has been developed incrementally:

-   **Step 1--5:** Initial backend setup, configuration, database and
    foundational architecture
-   **Step 6:** Authentication with registration, login, JWT and bcrypt
-   **Step 7:** Trade analysis endpoint, validation, database
    persistence and protected analysis routes
-   **Step 8:** Gemini AI integration for real trade analysis

The frontend and backend are maintained in separate directories so that
both parts can be developed independently and integrated through the
REST API.

------------------------------------------------------------------------

## ⚠️ Important Disclaimer

CargoIQ is an educational/hackathon project intended to provide
AI-assisted trade-compliance guidance.

AI-generated information, including HS codes, duties, taxes,
regulations, and documentation requirements, should **not be treated as
legal, customs, tax, or professional advice**. Actual requirements
should be verified with official government/customs sources or qualified
professionals before making real-world trade decisions.

------------------------------------------------------------------------

## 👥 Team

**CargoIQ** is being developed as a collaborative project with separate
frontend and backend development.

------------------------------------------------------------------------

## 📄 License

This project is currently intended for educational and hackathon
purposes.
