# 🏦 Banking System Backend API

A secure, production-grade banking backend built using **Node.js,
Express, MongoDB, and Mongoose**.

This system follows real-world banking architecture using: -
Ledger-based accounting - Idempotent transactions - ACID-compliant
MongoDB transactions - JWT authentication - Joi validation - Email
notifications

------------------------------------------------------------------------

# 🚀 Features

## 👤 Authentication

-   Register user
-   Login user
-   JWT authentication
-   Secure logout (token blacklist)
-   Password hashing using bcrypt

------------------------------------------------------------------------

## 🏦 Account Management

-   Create account
-   Get all accounts of logged-in user
-   Get account balance
-   Account status:
    -   ACTIVE
    -   FROZEN
    -   CLOSED

Balance is calculated using ledger aggregation.

------------------------------------------------------------------------

## 💸 Transactions

Supports secure money transfer.

Features:

-   Transfer between accounts
-   Initial system funding
-   Idempotency support (prevents duplicate transactions)
-   MongoDB ACID transactions
-   Automatic ledger creation

Transaction status:

-   PENDING
-   COMPLETED
-   FAILED
-   REVERSED

------------------------------------------------------------------------

## 📊 Ledger System

Ledger stores all debit and credit records.

Balance formula:

balance = totalCredits − totalDebits

------------------------------------------------------------------------

## ✅ Validation

Uses Joi middleware.

Validates:

-   Body
-   Params
-   Query
-   ObjectId
-   UUID
-   Amount

------------------------------------------------------------------------

## 📧 Email Notifications

Sent on:

-   Registration
-   Successful transactions

------------------------------------------------------------------------

# 🛠 Tech Stack

Backend: - Node.js - Express.js

Database: - MongoDB - Mongoose

Authentication: - JWT - bcryptjs

Validation: - Joi

Email: - Nodemailer

------------------------------------------------------------------------

# 📁 Project Structure

src/

app.js

configs/ - db.config.js - env.config.js

controllers/ - auth.controller.js - account.controller.js -
transaction.controller.js

models/ - User.model.js - Account.model.js - Transaction.model.js -
Ledger.model.js - BlackListToken.model.js

middlewares/ - auth.middleware.js - validate.middleware.js

routes/ - auth.routes.js - account.routes.js - transaction.routes.js

validators/ - user.validator.js - account.validator.js -
transaction.validator.js

services/ - email.service.js

configs/ - env.config.js

server.js


------------------------------------------------------------------------

# 🔐 Security Features

-   JWT authentication
-   Password hashing
-   Idempotent transactions
-   MongoDB transactions
-   Input validation
-   Token blacklist logout
-   Ledger-based accounting

------------------------------------------------------------------------

# ⚙️ Installation

Clone repository:

git clone `<your-repo-url>`{=html}

Install dependencies:

npm install

Create .env file:

PORT=5000 MONGO_URI=your_mongo_uri JWT_SECRET=your_secret

Run server:

npm run dev

------------------------------------------------------------------------

# 📡 API Endpoints

## Auth

POST /auth/register

POST /auth/login

POST /auth/logout

------------------------------------------------------------------------

## Account

POST /account

GET /account

GET /account/:accountId

------------------------------------------------------------------------

## Transaction

POST /transaction

POST /transaction/system/init

------------------------------------------------------------------------

# 🧠 Architecture Principles

-   Ledger-based accounting
-   ACID transactions
-   Idempotency
-   Stateless authentication
-   Secure validation layer

------------------------------------------------------------------------

# 👨‍💻 Author

Abhishek

Back-end Developer
