import { createBetterAuth } from "@/auth/setup";
import { getDb } from "@/database/setup";

let betterAuth: ReturnType<typeof createBetterAuth>;

export function setAuth(
  config: Omit<Parameters<typeof createBetterAuth>[0], "database"> & {
    adapter: {
      kyselyDb: ReturnType<typeof getDb>;
    };
  },
) {
  // Better Auth accepts Kysely instance directly (as in previous working version)
  const { adapter, secret, socialProviders } = config;
  console.log("[auth/server]: adapter", adapter);

  betterAuth = createBetterAuth({
    database: adapter.kyselyDb,
    secret,
    socialProviders,
  });
  return betterAuth;
}

export function getAuth() {
  if (!betterAuth) {
    throw new Error("Auth not initialized. Call setAuth() first.");
  }
  return betterAuth;
}
