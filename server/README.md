# PWA API

> RESTful APIs for PWA

<!-- [![Build Status](https://travis-ci.org/yourusername/your-frontend-app.svg?branch=master)](https://travis-ci.org/yourusername/your-frontend-app) -->

## Prerequisites

- [Node >=18.x](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [DBeaver](https://dbeaver.io/download/)/[pgAdmin](https://www.pgadmin.org/download/)

## Installation

```shell
pnpm install
```

## Project Setup Guide

- Create `.env` file by duplicating `.env.example` file

## Running the app

> App will run at http://localhost:3001

> Swagger Documentation run at http://localhost:3001/swagger

**Note: If you've already set up the Postgres DB for the Panel API project, proceed to Step 3.**

```bash
# 1. Create Postgres DB container with Docker
$ pnpm run dev:db:create

# 2. Create DB connection with DBeaver/pgAdmin
# - Check .env.example file for the DB connection detail

# 3. Add required and fake data to DB
$ pnpm run dev:db:setupdata

# Start development
$ pnpm run start

# or

# Start development in watch mode
$ pnpm run start:dev
```

- To empty DB run `pnpm run dev:db:reset`, then run `$ pnpm run dev:db:setupdata` to populate data
- To remove DB run `pnpm run dev:db:remove`

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
