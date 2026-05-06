# All About Node.js

This repository is my personal learning and exercise workspace for the Node.js ecosystem.

I use this repo to practice backend, API, database, authentication, and full-stack concepts with different technologies around Node.js, including raw Node.js, Express.js, NestJS, React, and Next.js.

## Purpose

The main goal of this repository is learning by building.

Here I explore and exercise:

- Raw Node.js server fundamentals
- Express.js routing, middleware, and APIs
- NestJS core concepts and project structure
- Database integration with TypeORM and MySQL
- Authentication and authorization flows
- File upload and API feature practice
- React frontend experiments
- Full-stack Next.js learning and exercises

This is not a single production application. It is a collection of practice projects, notes, experiments, and exercises.

## Repository Structure

```text
.
├── raw-node/                 # Raw Node.js practice
├── expressjs/                # Express.js practice projects
├── nestjs/                   # NestJS learning projects
│   ├── core-concept/         # NestJS fundamentals
│   ├── messages/             # NestJS message/API practice
│   ├── nestjs-intro/         # Intro-level NestJS project
│   ├── nestjs-revamp/        # More NestJS practice and revisions
│   ├── nestjs-typeorm-mysql/ # NestJS with TypeORM and MySQL
│   ├── working-with-db/      # Database, entities, auth, migrations
│   └── google-authentication-react/ # React auth-related practice
└── nextcash-course/          # Full-stack Next.js learning project
```

## Projects

### Raw Node.js

The `raw-node/` folder contains practice around Node.js without a higher-level framework. This is useful for understanding how servers, routing, handlers, helpers, file storage, and low-level backend logic work.

### Express.js

The `expressjs/` folder contains Express.js examples and exercises, including routing, middleware, static files, and basic server setup.

### NestJS

The `nestjs/` folder contains multiple NestJS projects for learning different parts of the framework:

- modules, controllers, services, DTOs, pipes, guards, middleware, and interceptors
- TypeORM and MySQL integration
- entities, migrations, and database relations
- authentication flows
- file uploads and API structure

### Next.js

The `nextcash-course/` folder is for full-stack Next.js learning and exercises.

## Getting Started

Each folder is its own project. Open the project you want to practice, install dependencies if needed, and run the available scripts from that folder.

Example:

```bash
cd expressjs
yarn install
yarn start
```

For NestJS projects:

```bash
cd nestjs/core-concept
yarn install
yarn start:dev
```

For Next.js:

```bash
cd nextcash-course
npm install
npm run dev
```

## Common Scripts

Different projects use different scripts, but common commands include:

```bash
yarn start
yarn start:dev
yarn test
yarn build
npm run dev
npm run build
```

Check each project's `package.json` for the exact scripts.

## Notes

- This repo is mainly for learning, experimenting, and revision.
- Some projects may be incomplete or in-progress.
- Some folders may contain generated files or local dependencies from practice sessions.
- The code style may change over time as I learn better patterns.

## Learning Focus

This repository helps me build confidence with the Node.js ecosystem by practicing real project structures, real APIs, and real backend/full-stack concepts instead of only reading theory.
