# RockVille Movies Backend

This is a Nest.js application for the RockVille Movies backend. The application provides the following features:

1. User Login
2. Create User
3. Update User Profile
4. Give Movie Rating

## Overview

The validation of requests is handled by Data Transfer Objects (DTOs) located in the `dto` folder within the `src` directory.

The application is organized into three modules:
1. Auth Module
2. User Module
3. Movies Module

Each module contains its own services and controllers. Controllers handle incoming HTTP requests and services execute the corresponding business logic.

## Getting Started

To run the application, follow these steps:

1. Install Node.js and npm if you haven't already.
2. Install the necessary node modules by running the command:
    ```
    npm install --legacy-peer-deps
    ```
3. Install the Nest.js CLI globally by running the command:
    ```
    npm install -g @nestjs/cli
    ```
4. Start the server by running the command:
    ```
    npm run start
    ```

## Seeding Movie List and Categories

The movie list and categories (genres) are seeded from a third-party API when the Nest.js application starts successfully. This ensures that the database is populated with the latest movie data.

