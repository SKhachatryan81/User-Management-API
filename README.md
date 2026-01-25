Project Name: User Management API (JSON-based)

Description:
A simple RESTful API built with Node.js and Express to manage user data stored in a JSON file. The API supports creating, reading, updating, and deleting users (CRUD operations). Each user has an id, name, age, occupation, and username. The project demonstrates basic server-side logic, file-based data storage, and REST API conventions, including proper status codes and request validation.

Key Features:

GET /users – Retrieve all users

GET /users/:id – Retrieve a specific user

POST /users – Add a new user with automatic ID assignment

PUT /users/:id – Fully update an existing user

PATCH /users/:id – Partially update user fields

DELETE /users/:id – Remove a user and optionally reuse freed IDs

Extras:

Uses .env for environment variables

Auto-generates sequential IDs for new users

Proper error handling with HTTP status codes