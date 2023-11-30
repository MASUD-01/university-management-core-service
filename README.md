ER Diagram
Module 35: ER Diagram

Module-36: ER Diagram

Module-37: ER Diagram

Module-38: ER Diagram

Module-39: ER Diagram

Module-41: ER Diagram

Module-42: ER Diagram

Module-43: ER Diagram

You can generate an ERD with Prisma schema using the website: https://prismaliser.app/

# API Documentation

https://i.ibb.co/Ln2FttV/university-management-core-service-module-1.png

search and filter bolte ki bujhay ?

search: specific field(author:'sailog') er value er kisu word include kore kina ,
filter : specific field er purapuri same hobe
ans: academicFaculty te
multiple data insert er khetre (1.for loop e create() or 2.createMany)

# University Management Core Service

This guide will walk you through the process of setting up the University Management Core Service Starter project. By following these steps, you will clone the project, install dependencies, and configure Prisma for database management. Let's get started!

## Installation Steps

### Follow these steps to clone and set up starter project:

1. `Clone the project:` Open your terminal or command prompt and run the following command to clone the project repository:

```bash
git clone https://github.com/Programming-Hero-Next-Level-Development/university-management-core-service-starter.git university-management-core-service
```

2. `Navigate into the project directory:` Use the cd command to navigate into the project directory:

```bash
cd university-management-core-service
```

3. `Install project dependencies:` Next, install the project dependencies by running the following command:

```bash
yarn install
```

4. Configure Prisma and the database connection:

- Add Prisma as a development dependency by running the following command:

```bash
yarn add prisma --save-dev
```

- Set up your Prisma project by creating the Prisma schema file using the following command:

```bash
npx prisma init
```

- Open the prisma/schema.prisma file and configure your database connection details.

```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- Create a .env file in the project root directory and set the DATABASE_URL environment variable. Replace the placeholders with your database connection details:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

5. Creating the database schema
6. Migrate the database schema: Use the following command to create and apply the initial database schema:

```bash
npx prisma migrate dev --name init
```

This command creates a new migration file based on your schema changes and applies it to your database.

6. `Install Prisma Client:` Install the Prisma Client library by running the following command:

```bash
yarn add @prisma/client
```

This command installs the Prisma Client, which provides an interface to interact with your database.

That's it! You have successfully set up the University Management Core Service Starter project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the core service.

Happy coding!

# npx prisma migrate dev

ans: ei command dile migrations file e sql command generate hobe. Tarpor sql query gula database e run hobe
(ei commnad a migration and generation duti akbare hoy, ar generation command e sudhu generate hoy)

# Error: We found changes that cannot be executed:

ans: table e je column cilo notun kore column add korle ei error day. migrations file delete korle eo hoy.

# api create korbo

ans: er jonno routing proyojon, e jonno express and cors install korbo,

"rootDir": "./src", //kore dibo tsconfig.json e

# packege.josn e script add korbo

"scripts": {
"start": "nodemon ./src/index.ts"
},

# database e dhuke dhuke data dekhar lagtese(prisma studio)?

ans: etar jonne prisma stduio(data dekhar jonne khub help ful)
command: npx prisma studio (eta nije open hoy)
mongoose e populate kore data dekhar lagto eikhane click korle relation ta dekha jay

# sudhu email dekhar jonne

const result = prisma.user.findMany({
select: {
email: true,
},
});

# include mongoose er populate er moto

ans: jodi user er vitor profile thake tobe profile soho dekte pari include diye

# orderby& sortBy

orderBy:
sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },

# searchTerm

1.  where: {
    title: {
    contains: searchTerm,
    },
    },

2.                 where: {
    AND|NOT| OR: [
    {
    title: {
    contains: searchTerm,
    mode: "insensitive",
    },
    },
    {
    author: {
    email: {
    contains: searchTerm,
    mode: "insensitive",
    },
    },
    },
    ],
    },

# pagination

const { sortBy, sortOrder, searchTerm, page, limit } = options;
const skip = parseInt(limit) \* parseInt(page) - parseInt(limit);
const take = parseInt(limit);
const result = await prisma.post.findMany({
skip,
take,
})

# Transaction

ans: duiti kaji poripurno hote hobe, like bank payment(bikash,nagod)
ekjoner account er taka kete niye ar akjoner account e taka dhukbe , duita sure hoyar jonne transaction kaj kore
example:
const getAllPost = async (options: any) => {
const { sortBy, sortOrder, searchTerm, page, limit } = options;
const skip = parseInt(limit) \* parseInt(page) - parseInt(limit);
const take = parseInt(limit);

return await prisma.$transaction(async (tx) => {
const result = await prisma.post.findMany({
skip,
take,
include: {
author: true,
category: true,
},
orderBy:
sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },

      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              email: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const total = await prisma.post.count();
    return { data: result, total };

});
};
