## Description

This is a sample full stack Node application to view invoices of an ecommerce company. The frontend is React + TypeScript + Vite, and the backend is an API server with NestJS + PosgreSQL.

## Project setup

### Frontend

```bash
$ cd client/

# install dependencies
$ yarn install

# start the app
$ yarn dev
```

The app should be running at http://localhost:5173. Please make sure you have the backend running and seed the data first. Then use this credential to log in:

```
email: test@email.com
password: 1234
```

### Backend

```bash
$ cd server/
$ yarn install
```

### Run the PosgreSQL database. Make sure you have Docker installed.

```bash
$ docker-compose up
```

### Run Prisma migrations and seeds

```bash
# migrate the prisma schema to db
$ yarn prisma migrate dev

# seed db with some test data
$ yarn prisma db seed
```

### Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

Make sure the server is running at http://localhost:3000

You can view all the endpoints and Swagger documentation at http://localhost:3000/api
