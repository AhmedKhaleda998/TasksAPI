# Task Manager API

This is a REST API for managing tasks. It allows users to organize tasks into categories, and supports user authentication through basic HTTP authentication. Tasks can be shared publicly or kept private, and can be of two types: text tasks and list tasks.

## Features

- User registration and authentication
- CRUD operations for categories
- CRUD operations for tasks
- Task sharing (public/private)
- Pagination, filtering, and sorting for tasks

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- body-parser

## Getting Started

You can use this URL: https://tasks-api-chi-two.vercel.app/ instead of installation

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedKhaleda998/TasksAPI
   cd TasksAPI

2. Install dependencies:
    ```bash
    npm install

3. Start the MongoDB server:
    ```bash
    mongod

4. Add .env File: Use the variables from .env.example file

5. Run the application:
    ```bash
    node server.js

The server will start on http://localhost:3000.

### API Endpoints

- The endpoints needed can be found at https://academiq-team.postman.co/workspace/d199db0d-f383-4ce2-9560-987baf67e731


This `README.md` file provides a comprehensive overview of the project, installation instructions, API endpoints, and other relevant information. Make sure to update the repository URL and other placeholders as needed.
