# Library Management System

## Project Overview

This Library Management System is designed to manage a library's book inventory and track books borrowed by users. The system is implemented using Node.js and Express for the backend, with Sequelize as the ORM for data management. The project includes endpoints for managing users, books, and the borrowing transactions between them.

## Features

- **User Management**: Create, retrieve, and manage users.
- **Book Management**: Add, retrieve, and manage books.
- **Borrowing System**: Allow users to borrow and return books, track book status, and maintain borrowing history.

## Architecture

### Backend

The backend is built on `Node.js` with `Express`, providing a RESTful API. Data persistence is handled by `Sequelize ORM` to interact with a relational database.

#### Models

- **User**: Represents users in the system.
- **Book**: Represents books available in the library.
- **BorrowedBook**: Represents the many-to-many relationship between users and books, including timestamps and ratings.

#### Controllers

There are controllers for each entity:

- `UserController`: Handles creating users and retrieving user data.
- `BookController`: Manages book creation and retrieval.
- `BorrowController`: Manages the borrowing and returning processes.

### Database

The database schema includes three main tables: `Users`, `Books`, and `BorrowedBooks`. Relationships:

- Users and Books have a many-to-many relationship through BorrowedBooks.

## API Endpoints

### User Endpoints

- `POST /users`: Create a new user.
- `GET /users`: Retrieve all users.
- `GET /users/:userId`: Retrieve a user by ID.

### Book Endpoints

- `POST /books`: Add a new book.
- `GET /books`: Retrieve all books.
- `GET /books/:bookId`: Retrieve a book by ID.

### Borrow Endpoints

- `POST /users/:userId/borrow/:bookId`: Borrow a book.
- `POST /users/:userId/return/:bookId`: Return a borrowed book.

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://your-repository-url
   cd library-management-system
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build:**

   ```bash
   npm run build
   ```

4. **Run:**

   ```bash
   npm run start
   ```

5. **For development:**
   ```bash
   npm run dev
   ```
