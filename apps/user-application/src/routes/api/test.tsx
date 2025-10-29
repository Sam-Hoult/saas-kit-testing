import { getDb } from '@repo/data-ops/database/setup'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/test')({
  server: {
    handlers: {
      GET: async () => {
        const db = getDb()
        // Kysely query syntax
        const result = await db
          .selectFrom('auth_user')
          .selectAll()
          .execute()
        return Response.json(result)
      },
    },
  },
})
