// packages/data-ops/src/database/setup.ts
import { Kysely } from 'kysely';
import { NeonDialect } from 'kysely-neon';
import { neon, neonConfig } from '@neondatabase/serverless';
import { DB } from '@/kysely/generated-types';

let db: Kysely<DB> | undefined;

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

  // Configure Neon for serverless environments
  neonConfig.fetchConnectionCache = true;

  db = new Kysely<DB>({
    dialect: new NeonDialect({
      neon: neon(connectionString),
    }),
  });

  return db;
}

export function getDb(): Kysely<DB> {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}
