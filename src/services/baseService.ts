import { Pool, QueryResult } from "pg";
import Service from "../interfaces/service";
import DB from "../config/dbconfig";

class BaseService implements Service {
  public db: Pool;

  constructor() {
    this.db = DB;
  }
}

export default BaseService;
