import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@ln-foot/env";
import * as schema from "./schema";
import * as seeder from "./seeder";
/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });

seeder.seedAdmin(db).catch((error) => {
  console.error("Error seeding admin:", error);
});
