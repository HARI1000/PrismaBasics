# PrismaBasics
Just learnt about prisma bascis and schema structure and also how relationships and prisma client works.
# How to intialize
Initialize an empty Node.js project
npm init -y

Add dependencies
npm install prisma typescript ts-node @types/node --save-dev

Initialize typescript
npx tsc --init
Change `rootDit` to `src`
Change `outDir` to `dist`

Initialize a fresh prisma project
npx prisma init

# Perform Migrations
npx prisma migrate dev --name Initialize the schema
allows you to apply the changes to the main db and also creates a checkpoint to comeback to.

# Generate Client
npx prisma generate
