# API Documentation

This document provides detailed information about the APIs, middleware, database structure, and environment variables used in the system.

---

## Middleware

### Verify Token Middleware

This middleware ensures the authenticity of the JWT token provided in the request header.

## User APIs

### 1. Login User

- **Description**: Authenticates a user and generates a JWT token for authorization.
- **Route**: `POST /api/users/login`
- **Access**: Public

## Book APIs

### 1. Get All Books

- **Description**: Retrieves all books or books filtered by author or publication year.
- **Route**: `GET /api/books`
- **Access**: Private

### 2. Get Book by ID

- **Description**: Retrieves a book by its ID.
- **Route**: `GET /api/books/:id`
- **Access**: Private

### 3. Create New Book

- **Description**: Adds a new book entry to the database.
- **Route**: `POST /api/books`
- **Access**: Private

### 4. Update Book

- **Description**: Updates an existing book's information.
- **Route**: `PATCH /api/books/:id`
- **Access**: Private

### 5. Delete Book

- **Description**: Deletes a book from the database.
- **Route**: `DELETE /api/books/:id`
- **Access**: Private

---

## Database Structure

### User Modal JSON

- **File Name**: `userModel.json`

### Books Modal JSON

- **File Name**: `booksModel.json`

---

## Environment Variables

- **PORT**: Port number the server will listen on (e.g., 5050).
- **JWT_SECRET**: Secret key used for JWT token generation and validation.

---

This documentation provides a comprehensive overview of the APIs, middleware, database structure, and environment variables required for the system to function correctly.
