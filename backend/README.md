# VolunteerAI Backend

Production-ready backend for the AI-powered Volunteer Management Platform.

## Architecture
- Node.js & Express
- ES Modules
- MongoDB (Mongoose)
- JWT Authentication (Role-based)
- Repository Pattern
- Modular Routes & Controllers

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values (or just use the provided `.env`).

3. Seed the database with sample data:
   ```bash
   node seeder.js
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Features Implemented
- **Authentication:** JWT, bcrypt, role-based middleware (volunteer, ngo, admin).
- **Security:** Helmet, Mongo Sanitize, XSS prevention, CORS.
- **Error Handling:** Centralized custom error middleware.
- **Models:** User, VolunteerProfile, NGO, Event, Application.
- **AI Proxies:** Skeleton endpoints ready to integrate with the Python FastAPI Server.
- **Swagger Docs:** View API docs at `/api-docs` when the server is running.
