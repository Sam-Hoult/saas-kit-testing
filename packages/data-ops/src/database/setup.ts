// packages/data-ops/src/database/setup.ts
import { drizzle } from "drizzle-orm/neon-http";

let db: ReturnType<typeof drizzle>;

export function initDatabase(connection: {
  host: string;
  username: string;
  password: string;
  database: string;
}) {
  if (db) {
    return db;
  }

  const connectionString = `postgres://${connection.username}:${connection.password}@${connection.host}/${connection.database}?sslmode=require`;
  db = drizzle(connectionString);
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}
