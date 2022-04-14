import { Pool } from "pg";
export default interface Service {
  db: Pool;
}
