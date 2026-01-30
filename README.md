Project Name: User Management API (JSON-based)

Description:
A simple RESTful API built with Node.js and Express to manage user data stored in a MySQL database. The API supports creating, reading, updating, and deleting users (CRUD operations), with each user having an id, name, age, occupation, and username. The project follows a classic folder layout, organizing controllers, routes, models, and configuration files for maintainable and scalable server-side development. It demonstrates server-side logic, database integration with MySQL, and REST API conventions, including proper status codes, request validation, and structured query handling.

Key Features:

GET /users – Retrieve all users

GET /users/:id – Retrieve a specific user

POST /users – Add a new user with automatic ID assignment

PUT /users/:id – Fully update an existing user

PATCH /users/:id – Partially update user fields

DELETE /users/:id – Remove a user and optionally reuse freed IDs


