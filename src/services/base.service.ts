import { Pool } from "pg";
import Service from "../interfaces/service";
import DB from "../config/dbconfig";
import { PrismaClient } from "@prisma/client";

class BaseService implements Service {
  public db: Pool;
  public prismaClient: PrismaClient;

  constructor() {
    this.db = DB;
    this.prismaClient = new PrismaClient();
  }
}

export default BaseService;
