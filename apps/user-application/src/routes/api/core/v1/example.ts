import { createFileRoute } from "@tanstack/react-router";
import { examplefunction } from "@/core/functions/example-functions";

export const Route = createFileRoute("/api/core/v1/example")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as { exampleKey: string };
          const result = await examplefunction({ data: body });
          return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          return new Response(
            JSON.stringify({ error: (error as Error).message }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
      GET: async () => {
        return new Response(
          JSON.stringify({ message: "Use POST to call this endpoint" }),
          {
            status: 405,
            headers: { "Content-Type": "application/json" },
          }
        );
      },
    },
  },
});
