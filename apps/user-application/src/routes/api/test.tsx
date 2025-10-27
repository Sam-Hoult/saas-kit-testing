import { getDb } from '@repo/data-ops/database/setup'
import { auth_user } from '@repo/data-ops/drizzle/auth-schema'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/test')({
  server: {
    handlers: {
      GET: async () => {
        const db = getDb()
        const result = await db.select().from(auth_user)
        return Response.json(result)
      },
    },
  },
})
