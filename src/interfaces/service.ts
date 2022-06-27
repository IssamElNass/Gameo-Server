import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";

export default interface Service {
  db: Pool;
  prismaClient: PrismaClient;
}
