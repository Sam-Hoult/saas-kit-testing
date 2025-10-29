// packages/data-ops/config/auth.ts
import { createBetterAuth } from "../src/auth/setup";
import { initDatabase } from "../src/database/setup";

export const auth = createBetterAuth({
  database: initDatabase({
    password: process.env.DATABASE_PASSWORD!,
    host: process.env.DATABASE_HOST!,
    username: process.env.DATABASE_USERNAME!,
    database: process.env.DATABASE_NAME!,
  }),
});
