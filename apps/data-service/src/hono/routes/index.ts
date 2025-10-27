import { Hono } from "hono";

export const indexRoute = new Hono<{ Bindings: Env }>();

indexRoute.get("/", (c) => {
  return c.text("Hello World");
});

