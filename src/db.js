import pg from "pg";
import { PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER } from "./config.js";

export const pool = new pg.Pool({
  port: PGPORT,
  password: PGPASSWORD,
  database: PGDATABASE,
  user: PGUSER,
  host: PGHOST,
});
