# Personal Notes App

A full-stack personal note management application — built as a portfolio project to demonstrate frontend, backend, database, authentication, and DevOps skills for Software Engineer Intern applications.

## Overview

Personal Notes is a Google-Keep-style note-taking app with full user accounts. Every user registers, logs in, and manages their own private notes — organized with categories, tags, favorites, pins, archiving, and a recoverable trash bin.

## Features

- Register / Login / Logout with JWT authentication
- Full Notes CRUD (create, view, edit, delete)
- Soft delete (Trash) with restore and permanent delete
- Favorite and Pin notes
- Archive / unarchive notes
- Search notes by title, content, or tag
- Filter by category, tag, favorite, pinned, or archived status
- Sort by newest, oldest, last updated, or title (A-Z / Z-A)
- Category management (create, rename, delete — deleting a category never deletes its notes, they become "Uncategorized")
- Tag support with many-to-many relationship
- Profile management (update name, view account info)
- Change password
- Light / dark mode (persisted per device)
- Fully responsive: desktop sidebar, tablet 2-column grid, mobile drawer + 1-column grid

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, lucide-react

**Backend:** Java, Spring Boot, Spring Web, Spring Data JPA, Spring Security, JWT (jjwt), BCrypt, Bean Validation

**Database:** SQL Server

**DevOps:** Docker, Docker Compose

## Architecture

```
Browser (React SPA)
    │  HTTP + JWT Bearer token
    ▼
Spring Boot REST API
    │  Spring Data JPA
    ▼
SQL Server
```

- The frontend is a single-page app; all routing happens client-side via React Router.
- Every write action and every read of private data goes through the REST API — there is no direct database access from the browser.
- Authentication is stateless: the backend issues a signed JWT on login, the frontend stores it and attaches it to every subsequent request. The backend never keeps a server-side session.
- Passwords are hashed with BCrypt before being stored; the plaintext password is never persisted or returned by any endpoint.

## Database Schema

```
users            categories         tags              notes                  note_tags
---------        ----------         ----------        ----------             ----------
id (PK)          id (PK)            id (PK)           id (PK)                note_id (FK)
full_name        name               name              title                  tag_id (FK)
email (unique)   created_at         user_id (FK)       content
password                                               is_favorite
created_at                                             is_pinned
updated_at                                             is_archived
                                                        is_deleted
                                                        created_at
                                                        updated_at
                                                        user_id (FK)
                                                        category_id (FK, nullable)
```

Relationships: `User 1—N Notes`, `User 1—N Categories`, `User 1—N Tags`, `Category 1—N Notes`, `Notes N—N Tags` (via `note_tags`).

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Log in, receive a JWT |
| GET | `/api/auth/me` | Get the current user (requires token) |
| GET | `/api/users/me` | Get current user profile |
| PUT | `/api/users/me` | Update full name |
| PUT | `/api/users/me/password` | Change password |
| GET | `/api/notes` | List notes (supports `search`, `category`, `tag`, `favorite`, `pinned`, `archived`, `sort`) |
| GET | `/api/notes/trash` | List soft-deleted notes |
| GET | `/api/notes/{id}` | Get one note |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/{id}` | Update a note |
| DELETE | `/api/notes/{id}` | Soft delete (move to trash) |
| PATCH | `/api/notes/{id}/favorite` | Toggle favorite |
| PATCH | `/api/notes/{id}/pin` | Toggle pin |
| PATCH | `/api/notes/{id}/archive` | Toggle archive |
| PATCH | `/api/notes/{id}/restore` | Restore from trash |
| DELETE | `/api/notes/{id}/permanent` | Permanently delete |
| GET | `/api/categories` | List categories |
| POST | `/api/categories` | Create a category |
| PUT | `/api/categories/{id}` | Rename a category |
| DELETE | `/api/categories/{id}` | Delete a category (notes become Uncategorized) |
| GET | `/api/tags` | List the current user's tag names |

## Folder Structure

```
personal-notes-app/
├── frontend/               React + Vite app
│   └── src/
│       ├── components/     Reusable UI (layout, notes, common)
│       ├── pages/          One file per route
│       ├── services/       Axios calls, grouped by resource
│       ├── context/        Auth, Theme, Toast global state
│       ├── hooks/          useNotes, useTrash, useCategories
│       └── routes/         ProtectedRoute
├── backend/                Spring Boot app
│   └── src/main/java/com/notesapp/backend/
│       ├── entity/         JPA entities
│       ├── repository/     Spring Data repositories
│       ├── service/        Business logic
│       ├── controller/     REST endpoints
│       ├── dto/             Request/response shapes
│       ├── security/       JWT + Spring Security config
│       └── exception/      Centralized error handling
├── docker-compose.yml
└── README.md
```

## Installation & Local Development

### Prerequisites
- Node.js 18+
- Java 17+
- Maven (or use the included wrapper, if present)
- SQL Server running locally, OR use Docker Compose (see below) to run it in a container

### Backend
```bash
cd backend
cp .env.example .env   # edit with your real DB credentials and JWT secret
# Export the variables in .env into your shell, or configure them in your IDE's run config
mvn spring-boot:run
```
The API will be available at `http://localhost:8080/api`.

### Frontend
```bash
cd frontend
cp .env.example .env   # VITE_API_URL should point to your backend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## Docker Setup

The easiest way to run the entire stack (frontend + backend + SQL Server) is Docker Compose.

First, create your environment file in the project root:
```bash
cp .env.example .env   # edit values if you want, defaults work for local dev
```

Then:
```bash
docker compose up --build
```

This will:
1. Start SQL Server and wait until it's healthy
2. Create the `notesapp` database
3. Build and start the Spring Boot backend on port `8080`
4. Build and start the React frontend (served by Nginx) on port `5173`

Then open `http://localhost:5173`.

> Note: the SQL Server container needs at least ~2GB of RAM available to Docker. If it fails to start, check Docker Desktop's resource settings.

## Environment Variables

**Backend** (`backend/.env.example`):
```
DB_URL=jdbc:sqlserver://localhost:1433;databaseName=notesapp;encrypt=true;trustServerCertificate=true
DB_USERNAME=sa
DB_PASSWORD=YourStrong@Passw0rd
JWT_SECRET=change-this-to-a-long-random-secret-before-deploying
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env.example`):
```
VITE_API_URL=http://localhost:8080/api
```

Real `.env` files are gitignored and must never be committed.

## Future Improvements

- Refresh tokens (current JWT is a single long-lived access token)
- Pagination / infinite scroll for large note collections
- Rich text editor for note content
- Full-text search via a dedicated search index
- Shared/collaborative notes between users
- Automated tests (JUnit for backend, Vitest/React Testing Library for frontend)

## Author

Built by a 4th-year Information Technology student as a personal portfolio project to demonstrate full-stack development skills for Software Engineer Intern applications.
