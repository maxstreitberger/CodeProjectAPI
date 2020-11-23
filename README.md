# CODE Project GraphQL API
- [Introduction](#introduction)
- [Installation](#installation)
- [Database](#database)
- [Backend architecture diagram](#backend-architecture-diagram)
- [Threat Model](#threat-model)
- [Used technologies](#used-technologies)

## Introduction
**Project Description** \
My idea is to build a website for managing events and parties. Users can create private or public events/parties and they can invite some guests to it. While they create the event/party they have to provide some necessary information like a title and when and where the event/party is taking place. The guests will also be able to take part in surveys and are allowed to participate in tasks.

**API Descrition** \
I built a GraphQL API on top of an Apollo Express Server. As an object-relational mapper (ORM), I use Prisma, which connects to a PostgreSQL database. Because a normal GraphQL resolver is a schema-first approach, which means you first create your schema and then you code the resolver. I decided to use NexusJS which lets you code the resolvers first and then, from code as a single source of truth, we have the schema generated. I also use Redis for tracking IPs to rate limiting some resolvers and to manage email confirmation tokens.

**Front-end:** [VueJS app](https://github.com/maxstreitberger/CodeProject)

**Note:** At the moment is nothing in the `master` branch. So after cloning the repository you have to switch to the `dev` branch.
## Installation
**What is needed**
- PostgreSQL or Docker container with PostgreSQL
- Redis or Docker container with Redis
- TextEditor

**Node Modules** \
`yarn install`

## Run
To run the API, you just use this command: \
`node run dev`

Before you can run the API, you should also replace the two `.env-sample` files with `.env` files. Also, you have to make sure that your postgres database and redis are running and that you have migrated the `schema.prisma` file with the database.

## Database
### Relational database model
![CODE project](https://user-images.githubusercontent.com/27073329/99972301-a4544180-2d9e-11eb-8736-ebd6eba503d2.jpg)

For my project, I'm using a local PostgreSQL database at the moment. To connect it with my API I'm using Prisma, which needs a database URL.
You can either paste your database URL directly into the database source:
```prisma
datasource db {
  provider = "postgresql"
  url      = "DATABASE_URL"
}
```

Or you add the url to the .env file: \
`DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"`

### Update Database
If you want to update the database you can either do it in a database IDE or with Prisma. \
\
**Database IDE** \
After you updated the database with a database IDE you have to introspect it with Prisma. \
`npx prisma introspect` \
This will update all the models in the `schema.prisma` file.\
\
**Prisma** \
After you updated your models in the `schema.prisma` file you have to migrate it with the database.
```
npx prisma migrate save --name init --experimental
npx prisma migrate up --experimental
```
\
In both cases, you have to regenerate the Prisma client. You do this by using this command: \
`npx prisma generate` \
This command reads your Prisma schema and generates your Prisma Client library into `node_modules/@prisma/client`.

## Backend architecture diagram
![Backend](https://user-images.githubusercontent.com/27073329/99408050-1389eb80-28f0-11eb-836e-dc4bc80efb53.jpg)

## Threat Model
### Diagram
![test](https://user-images.githubusercontent.com/27073329/99936850-6c300d00-2d64-11eb-871d-b8d6a45b6c53.jpg)

### Possible threats
- DDoS attack
- Cross-side-scripting (XSS)
- Injection (Especially SQL injection)
- Broken Authentication
- Sensitive Data Exposure
- Broken Access Control
- Insecure Deserialization
- Insecure Components
- Insufficient logging & monitoring
- Social Engineering (Is no real threat at the moment, but will become more dangerous if the project get bigger and bigger)

### What I have implemented so far
| Implementation                                                                        | What it prevents                  |
| :------------------------------------------------------------------------------------ | :---------------------------------|
| Prisma                                                                                | SQL Injection                     |
| VueJS                                                                                 | Script Injection                  |
| Email and pasword login, which returns a JWT token with a lifespan of 1 month         | Broken Authentication             |
| Rate limiting and email confirmation link to activate an account                      | Login/Registration spam           |
| Permissions with three types (isAuthenticated, isUser, isAdmin)                       | Broken Access Control             |
| Character limit in database fields and limitation of returned data from the database  | Memory overrun                    |
| Monitoring with Apollo Studio                                                         | Insufficient logging & monitoring |

## Used technologies
- NodeJS
- Prisma
- NexusJS
- Apollo Express Server
- PostgreSQL
- Redis
