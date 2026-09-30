# BlogNest API

BlogNest is an AI-powered blog management REST API based on the supplied project specification.

## Stack
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Role-based access: Admin, Editor, Author, Reader
- Google Gemini integration
- Request validation, sanitization, rate limiting and logging

## Requirements
- Node.js 18+ recommended
- MongoDB local/server instance
- Postman or Thunder Client
- Gemini API key for AI endpoints

## Setup

1. Open this folder in VS Code.
2. Open a terminal.
3. Run:

```bash
npm install
```

4. Copy `.env.example` to `.env`.
5. Edit `.env` and set `MONGO_URI` and `JWT_SECRET`.
6. Add `GEMINI_API_KEY` if you want AI generation/summarization.
7. Start MongoDB.
8. Run:

```bash
npm start
```

For development:

```bash
npm run dev
```

Server:
`http://localhost:5000`

## Main API endpoints

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Blogs
- GET `/api/blogs`
- GET `/api/blogs/search?q=javascript`
- GET `/api/blogs/:id`
- GET `/api/blogs/mine`
- POST `/api/blogs`
- PUT `/api/blogs/:id`
- DELETE `/api/blogs/:id`

### Categories
- GET `/api/categories`
- POST `/api/categories`
- DELETE `/api/categories/:id`

### Comments
- GET `/api/comments/post/:postId`
- POST `/api/comments`
- PATCH `/api/comments/:id/moderate`

### AI
- POST `/api/ai/generate-blog`
- POST `/api/ai/summarize`

## Example registration

```json
{
  "name": "Priya",
  "email": "priya@example.com",
  "password": "password123",
  "role": "author"
}
```

## Example blog

Use a Bearer token returned by login/registration:

```json
{
  "name": "Introduction to AI",
  "message": "Artificial Intelligence is changing modern applications.",
  "tags": ["AI", "Technology"],
  "status": "published"
}
```

## Important
For a college demonstration, create a local MongoDB database and test every endpoint in Postman/Thunder Client. Do not commit `.env` or API keys to GitHub.
