# Taxi24

## Overview
Technical test API

## Technical Specifications
- **Framework:** NestJS (Node.js)
- **Programming Language:** TypeScript
- **Database Options:** PostgreSQL

## Requirements
Before running the project, ensure that you have the following installed:
- Node.js (LTS version)
- PostgreSQL
- Docker
- npm

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aag2807/taxi-24-challenge.git
   cd taxi-24-challenge
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create and configure the database:
   - Create the database by running the SQL script:
     ```bash
     psql -U your_username -d postgres -f ./src/utils/sql/create_database.sql
     ```
   - Seed the database with initial data by running:
     ```bash
     psql -U your_username -d your_database_name -f ./src/utils/sql/seed_database.sql
     ```

## Running the Project
To start the server, run:
```bash
npm start
```
After starting the server, the API documentation is available via Swagger at:

Swagger UI: http://localhost:3000
This Swagger UI interface provides a visual documentation of all the endpoints, their expected parameters, and responses. It also allows for easy testing of the API directly through the browser.


## Testing
This project includes automated tests including e2e and unit tests. Run the tests using:
```bash
npm test
```
