<a align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" height="120" alt="Nest Logo" /></a>
  <a href="http://typeorm.io/"><img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" height="120"></a>
  <a title="Daniel Lundin / PostgreSQL License (https://www.postgresql.org/about/licence/)" href="https://commons.wikimedia.org/wiki/File:Postgresql_elephant.svg"><img height="120" alt="Postgresql elephant" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/512px-Postgresql_elephant.svg.png"></a>
  <img src="https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png" height="120">
</p>

## Description

[Nucleus](https://github.com/nemanja-mudrinic/nucleus-backend) boilerplate project.

Project include:

* DB Setup using Typeorm (You can easy change to other DB)
* Docker setup with Postgres
* Custom logger module with Morgan and Winston
* Swagger
* Class mapper
* Exception/Error handler
* Request middleware for tracking request id
* Ready enterprise file structure
* Tests for service layer using jest

## App Structure and guidelines

### 1. Api Dir

This dir holds app modules that include controller and services.
Each service has own interface. Only serices are covered with unit tests.

### 2. Config Dir

This dir includes all configuration modules for easier adding/removing configuration.

Application.config.ts reads .env file, and you can use those values to modify them before passing to other files.

### 3. Dto Dir

This dir holds 3 type of class
* **Request** - Request objects for API layer
* **Response** - Response objects for API layer
* **Internal** - Object used for communication between services and modules

### 4. Entities Dir

This dir includes DB entities

### 5. Exceptions Dir

This dir includes exception handlers, global exceptions and logic-entity exceptions.

Error has own structure including _ErrorCode_

### 6. Interceptors

This dir includes interceptors (They are executed before returning response to client).

Default interceptor is returning to client requestId for easier tracking client action

### 7. Middlewares

This dir includes middlewares (They are executed before entering controller).

For now, we are using moran as middleware and one request filter where:
* If its request path '/auth/*' generating SESSION_ID
* If itsn't request path '/auth/*' if there is no SESSION_ID client will get 401

IMPORTANT: SessionID is generated inside interceptor after login endpoint!

IMPORTANT: Each request need SessionId as header with UUID value!

### 8. Repositories

This project is using Repository Pattern.

### 9. Resources

This dir will hold migrations/seeds/emails...

### 10. Utils

This dir includes constants, enums, logger, mapper...All shared utilitis

### 11. Functions

Currently, we have sign up/in endpoints (including geenrated JWT), and two user endpoints (getAll/getById)

## Code style

* Each external module import statement is separated with empty line with local modules
* Code format - Prettier


## Installation

```bash
$ npm install
```

### TypeORM

```bash
# Run migrations
$ npm run typeorm:migrate

# Create new migration
$ npm run typeorm:create NewMigration
```

## Test

Coverage will include only service files

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

Docker only include setup for Postgres, in next iteration I will add app also inside.

How to start postgres via docker?

```bash
$ cd envivironment && docker-compose up
```

## How to run app

Setup env

```bash
$ cp .env.example .env
# Add your env values

$ cd environment && cp .env.docker.example .env.docker
# Add your env values
```

Install packages

```bash
$ npm install
# if you don't have postgres
$ cd envivironment && docker-compose up
$ npm run typeorm:migrate
```

Start app

```bash
npm run start:dev
```

### If you want to change to mysql
Go to src/config/database/typeorm.config.ts and change postgresl to mysql

### IMPORTANT

IMPORTANT: SessionID is generated inside interceptor after login endpoint!

IMPORTANT: Each request need SessionId as header with UUID value!


### Plans for future:

* Add security (ACL)
* Add app inside docker
* Add seeds


## Stay in touch

- Author - [Nemanja Mudrinic](https://www.linkedin.com/in/nemanja-mudrinic-666334145/)

## License
  [MIT licensed](LICENSE).
