# CODE Project GraphQL API
At the moment is nothing in the `master` branch. So after cloning the repository you have to switch to the `dev` branch.
## Installation
**What is needed**
- PostgreSQL or Docker container with PostgreSQL
- Redis or Docker container with Redis
- TextEditor

**Node Modules** \
`npm install`

## Run
To run the API, you just use this command: \
`node run dev`

Before you can run the API, you should also replace the two `.env-sample` files with `.env` files. Also, you have to make sure that your postgres database and redis are running and that you have migrated the `schema.prisma` file with the database.

## Database
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

## Used technologies
- NodeJS
- Prisma
- NexusJS
- Apollo Express Server
- PostgreSQL
- Redis
