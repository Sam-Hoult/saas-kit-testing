// packages/data-ops/drizzle.config.ts
import type { Config } from "drizzle-kit";
const config: Config = {
  out: "./src/drizzle",
  schema: ["./src/drizzle/auth-schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    ssl: "require",
  },
  tablesFilter: ["!_cf_KV", "!auth_*"],
};

export default config satisfies Config;
