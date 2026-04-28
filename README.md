# Modular REST API with Hono

A modular REST API built with Hono, SQLite, and Drizzle ORM demonstrating proper separation of concerns, modular routing, and relational database design.

## Requirements Fulfillment

### 1. Modular Routing

The application demonstrates modular routing through the following structure:

```
src/
├── routes/
│   ├── users.ts    # User-related endpoints
│   ├── posts.ts   # Post-related endpoints
│   └── comments.ts # Comment-related endpoints
└── index.ts       # Main entry point that integrates all routes
```

Each route module is defined in its own file and integrated into the main application using `app.route()`. This breaks down the application into smaller, maintainable routing units.

Reference: `src/index.ts:12-14`

### 2. Database Design and Relationships

The database schema is defined in `src/db/schema.ts` with proper relational modeling:

- **Users table**: id, name, email
- **Posts table**: id, title, content, userId (foreign key)
- **Comments table**: id, text, postId (foreign key)

Relationships enforced:
- A user can have multiple posts (one-to-many)
- A post belongs to one user (many-to-one)
- A post can have multiple comments (one-to-many)
- A comment belongs to one post (many-to-one)

Foreign keys are defined using Drizzle ORM's `references()` function with `ON DELETE CASCADE` for data integrity.

Reference: `src/db/schema.ts:9-11, 18-21, 28-31`

### 3. Service Layer Abstraction

The application includes a service layer that separates database queries and business logic from route handlers:

```
src/services/
├── user.service.ts
├── post.service.ts
└── comment.service.ts
```

Route handlers call service functions instead of directly interacting with the database. This ensures separation of concerns and code reusability.

Reference: `src/services/user.service.ts`, `src/services/post.service.ts`, `src/services/comment.service.ts`

### 4. API Functionality

All required endpoints are implemented:

**Users:**
- `POST /users` - Create a user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

**Posts:**
- `POST /posts` - Create a post
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get post by ID
- `GET /posts/user/:userId` - Get posts for a specific user

**Comments:**
- `POST /comments` - Create a comment
- `GET /comments` - Get all comments
- `GET /comments/:id` - Get comment by ID
- `GET /comments/post/:postId` - Get comments for a specific post

The relational relationships are actively used through the filtering endpoints.

## Tech Stack

- **Framework**: Hono (web framework)
- **Runtime**: Node.js
- **Database**: SQLite (via better-sqlite3)
- **ORM**: Drizzle ORM
- **Dev Tool**: tsx (TypeScript executor)

## Project Structure

```
drizzel/
├── src/
│   ├── db/
│   │   ├── index.ts      # Database connection
│   │   └── schema.ts   # Database schema definitions
│   ├── services/
│   │   ├── user.service.ts
│   │   ├── post.service.ts
│   │   └── comment.service.ts
│   ├── routes/
│   │   ├── users.ts
│   │   ├── posts.ts
│   │   └── comments.ts
│   └── index.ts        # Main application entry
├── drizzle.config.ts  # Drizzle configuration
├── package.json
└── database.sqlite   # SQLite database file
```

## Installation

```bash
npm install
```

## Running the Server

```bash
npm run dev
```

The server will start on http://localhost:3000

## Testing the API

### Using Browser (GET requests)

Open these URLs in your browser:

```
http://localhost:3000/
http://localhost:3000/users
http://localhost:3000/users/1
http://localhost:3000/posts
http://localhost:3000/posts/user/1
http://localhost:3000/comments
http://localhost:3000/comments/post/1
```

### Using PowerShell (POST requests)

Create a user:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST -Body (@{name="John"; email="john@example.com"} | ConvertTo-Json) -ContentType "application/json"
```

Create a post:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/posts" -Method POST -Body (@{title="My Post"; content="Post content"; userId=1} | ConvertTo-Json) -ContentType "application/json"
```

Create a comment:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/comments" -Method POST -Body (@{text="Great post!"; postId=1} | ConvertTo-Json) -ContentType "application/json"
```

### Using curl (Windows Command Prompt)

Create a user:

```cmd
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{"name":"John","email":"john@example.com"}"
```

Create a post:

```cmd
curl -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d "{"title":"My Post","content":"Content","userId":1}"
```

Create a comment:

```cmd
curl -X POST http://localhost:3000/comments -H "Content-Type: application/json" -d "{"text":"Great post!","postId":1}"
```

### Using Postman or Insomnia

Import these endpoints:

| Method | URL | Body |
|--------|-----|------|
| POST | http://localhost:3000/users | `{"name": "Name", "email": "email@example.com"}` |
| GET | http://localhost:3000/users | - |
| GET | http://localhost:3000/users/:id | - |
| POST | http://localhost:3000/posts | `{"title": "Title", "content": "Content", "userId": 1}` |
| GET | http://localhost:3000/posts | - |
| GET | http://localhost:3000/posts/user/:userId | - |
| POST | http://localhost:3000/comments | `{"text": "Comment", "postId": 1}` |
| GET | http://localhost:3000/comments | - |
| GET | http://localhost:3000/comments/post/:postId | - |

## Database Commands

Push schema to database:

```bash
npx drizzle-kit push --dialect sqlite --url "file:./database.sqlite" --schema ./src/db/schema.ts
```

Open Drizzle Studio:

```bash
npm run db:studio
```

## API Response Codes

- 200 OK - Request successful
- 201 Created - Resource created successfully
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server error