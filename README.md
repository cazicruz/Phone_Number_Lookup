# Node.js Application with Separation of Concerns

This is a boilerplate Node.js application that follows the separation of concerns principle and implements the MVC pattern.

## Project Structure

```
src/
├── controllers/     # Request handlers
├── models/         # Database models
├── routes/         # Route definitions
├── services/       # Business logic
├── middleware/     # Custom middleware
└── app.js         # Application entry point
```

## Features

- Express.js web framework
- MVC architecture
- Middleware for error handling
- Request validation
- Environment configuration
- Logging setup
- CORS enabled
- Security headers with Helmet

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (if using the example model)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update the variables:
   ```bash
   cp .env.example .env
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

The example routes demonstrate CRUD operations:

- GET /api/example - Get all items
- GET /api/example/:id - Get item by ID
- POST /api/example - Create new item
- PUT /api/example/:id - Update item
- DELETE /api/example/:id - Delete item

## Testing

Run tests with:
```bash
npm test
``` 