import { Hono } from "hono";

export const websocketRoute = new Hono<{ Bindings: Env }>();

/**
 * WebSocket endpoint handler
 * Connects clients to a WebSocket durable object instance
 */
websocketRoute.get("/websocket", async (c) => {
  // Check if this is a WebSocket upgrade request
  const upgradeHeader = c.req.header("Upgrade");
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return c.text("Expected Upgrade: websocket", 426);
  }

  // Get the instance ID from query parameters or use a default
  const instanceId = c.req.query("id") || "default";

  // Get or create the durable object instance
  const id = c.env.WEBSOCKET_SERVER.idFromName(instanceId);
  const stub = c.env.WEBSOCKET_SERVER.get(id);

  // Construct a new request with the original URL and headers to forward to the durable object
  const url = new URL(c.req.url);
  const forwardedRequest = new Request(url.toString(), {
    headers: c.req.raw.headers,
  });

  // Forward the request to the durable object
  return stub.fetch(forwardedRequest);
});

/**
 * Get WebSocket server statistics
 * Returns connection count and other metrics
 * Note: This endpoint returns basic info. For real-time stats, connect via WebSocket
 */
websocketRoute.get("/websocket/stats", async (c) => {
  const instanceId = c.req.query("id") || "default";

  return c.json({
    instanceId,
    message: "WebSocket durable object active. Connect via WebSocket to get real-time stats.",
    endpoint: `/websocket?id=${instanceId}`,
  });
});
