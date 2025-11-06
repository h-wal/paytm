# 💸 Paytm-like Wallet System

A **full-stack wallet platform** built using **Next.js**, **Express**, and **MongoDB**, designed to mimic Paytm-style wallet operations — user authentication, balance management, and secure wallet-to-wallet transfers.

---

## 🚀 Overview

This project demonstrates a **production-grade monorepo architecture** using **Turborepo** and **PNPM workspaces**, combining:

* A **Next.js frontend** for user interaction.
* An **Express.js API** for backend logic and data handling.
* **Shared Mongoose models** and configuration packages for scalability and reusability.

---

## 🏗️ Monorepo Architecture

```
apps/
  api/                  → Express + TypeScript REST API
  web/                  → Next.js frontend (App Router)
packages/
  db/                   → Shared Mongoose models & MongoDB connection
  ui/                   → Shared React UI components
  tailwind-config/      → Centralized TailwindCSS setup
  eslint-config/        → Common ESLint configuration
  typescript-config/    → Shared TS references
```

---

## ⚙️ Tech Stack

| Layer        | Technologies                                                                |
| ------------ | --------------------------------------------------------------------------- |
| **Frontend** | Next.js 15 (App Router), React 19, TailwindCSS 4                            |
| **Backend**  | Express.js, TypeScript, JWT, bcrypt                                         |
| **Database** | MongoDB, Mongoose, MongoDB Sessions (Transactions)                          |
| **Tooling**  | Turborepo, PNPM Workspaces, ESLint, Prettier, TypeScript Project References |

---

## ✨ Features

* 🔐 **User Authentication:**
  Secure signup/signin using hashed passwords (`bcrypt`) and JWT-based session management.

* 💳 **Wallet Management:**
  Automatic wallet creation on signup; protected balance retrieval endpoint.

* 🔄 **Atomic Transactions:**
  Peer-to-peer wallet transfers implemented with **MongoDB sessions** ensuring atomic debit/credit operations.

* 🧩 **Monorepo Modularity:**
  Shared Mongoose models and configuration across multiple apps via PNPM workspaces.

* 🛠️ **Developer Experience:**
  Unified build, lint, and type-check scripts across all packages using **Turborepo pipelines**.

---

## 🔑 API Endpoints

**Base URL:** `http://localhost:4173`

| Method | Endpoint        | Description                              |
| ------ | --------------- | ---------------------------------------- |
| `POST` | `/signup`       | Register new user and auto-create wallet |
| `POST` | `/signin`       | Authenticate user and return JWT         |
| `GET`  | `/wallet`       | Fetch wallet balance (JWT required)      |
| `POST` | `/transactions` | Perform atomic wallet-to-wallet transfer |

---

## 🧠 Data Models

**User Model**

```ts
{
  userName: string,
  email: string,
  password: string,  // hashed with bcrypt
  connections?: ObjectId[]
}
```

**Wallet Model**

```ts
{
  userId: ObjectId,
  balance: number
}
```

**Transaction Model**

```ts
{
  fromUser: ObjectId,
  toUser: ObjectId,
  debit?: number,
  credit?: number
}
```

---

## 🔒 Authentication Flow

1. User signs up with `username`, `email`, and `password`.
2. Password is **hashed with bcrypt** before storing in MongoDB.
3. On successful signin, a **JWT token** is issued.
4. Token is validated in middleware before accessing protected routes like `/wallet` or `/transactions`.

---

## 🔁 Transaction Workflow

1. `POST /transactions` is called with `{ from, to, amount }`.
2. MongoDB **session-based transaction** begins.
3. Balance is debited from sender’s wallet and credited to receiver’s wallet atomically.
4. Any failure triggers **rollback**, ensuring data integrity.

---

## ⚡ Local Development

### Prerequisites

* Node.js ≥ 18
* PNPM
* MongoDB (local or Atlas)

### Setup

```bash
# Install dependencies
pnpm install

# Start API
pnpm --filter api dev

# Start Web
pnpm --filter web dev
```

**Default Ports:**

* API → `4173`
* Web → `4005`

---

## 🧾 Environment Variables

Create a `.env` file inside `apps/api`:

```
MONGODB_URI=mongodb://localhost:27017/paytm-wallet
JWT_SECRET=your_jwt_secret
PORT=4173
```

You can also use a cloud MongoDB URI (Atlas).

---

## 📦 Scripts

**Root Scripts**

```bash
pnpm dev           # run all apps in parallel (turbo run dev)
pnpm build         # build all packages
pnpm lint          # lint all apps
pnpm check-types   # type-check all projects
```

**Individual Apps**

```bash
pnpm --filter api dev
pnpm --filter web dev
```

---

## 🧩 Example API Usage

**Signup**

```bash
curl -X POST http://localhost:4173/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"pass"}'
```

**Signin**

```bash
curl -X POST http://localhost:4173/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"pass"}'
# → { "token": "<JWT>" }
```

**Get Wallet Balance**

```bash
curl http://localhost:4173/wallet \
  -H "Authorization: <JWT>"
```

**Transfer Funds**

```bash
curl -X POST http://localhost:4173/transactions \
  -H "Content-Type: application/json" \
  -d '{"from":"alice","to":"bob","amount":200}'
```

---

## 🧩 Roadmap

* [ ] Add transaction history and audit logs
* [ ] Integrate input validation with Zod/Valibot
* [ ] Enhance frontend wallet dashboard and transfer UI
* [ ] Add Docker setup for containerized deployment
* [ ] Implement rate limiting and CORS

---

## 🧠 Key Learnings

* Hands-on with **Turborepo monorepo structure** and shared configurations.
* Implemented **atomic DB operations** with MongoDB transactions.
* Gained deep understanding of **secure authentication** and route protection using JWT.
* Achieved **code scalability** through modular shared packages.
