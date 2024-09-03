import { PrismaClient } from "@prisma/client";

// Create a singleton PrismaClient instance
const createPrismaClient = () => new PrismaClient();

// Declare the global type to include the PrismaClient singleton
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

// Ensure we only use a single instance of PrismaClient
const prisma = global.prismaGlobal ?? createPrismaClient();

// Assign the singleton to global in non-production environments
if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

export default prisma;