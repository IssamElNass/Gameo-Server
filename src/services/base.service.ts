import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import Service from "../interfaces/service";
import DB from "../config/dbconfig";

class BaseService implements Service {
  public db: Pool;
  public prismaClient: PrismaClient;

  constructor() {
    this.db = DB;
    this.prismaClient = new PrismaClient();
  }
}

export default BaseService;
