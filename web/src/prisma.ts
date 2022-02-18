import { PrismaClient } from "@prisma/client";

// This piece of code just tells Typescript that the "prisma" object exist in the "global" object
// It won't actually get compiled to javascript
// Not sure if this is necessary but https://github.com/m-abdelwahab/nextjs-prisma-workshop/blob/main/lib/prisma.ts
declare global {
  var prisma: PrismaClient | undefined;
}

// the first time this file is run, new PrismaClient() will be called
// during development, subsequent runs will use global.prisma instead, which prevent multiple connections from being created
// In other words, just reuse the PrismaClient if we already have one
export const prisma = global.prisma || new PrismaClient();

// During development, whenever we save a file, Next.js will cause this file to run again
// this will prevent multiple connections to the database
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
