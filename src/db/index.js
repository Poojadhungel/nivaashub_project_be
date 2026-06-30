import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql2 from "mysql2/promise";
import * as schema from "./schema.js";

// Removed the "!" non-null assertion
const poolConnection = mysql2.createPool(process.env.DATABASE_URL);

export const db = drizzle(poolConnection, { schema, mode: "default" });