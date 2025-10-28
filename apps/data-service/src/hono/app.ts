import { Hono } from "hono";
import { indexRoute } from "./routes/index";
import { workflowsRoute } from "./routes/workflows";
import { websocketRoute } from "./routes/websocket";

export const app = new Hono<{ Bindings: Env }>();

// Mount routes
app.route("/", indexRoute);
app.route("/workflows", workflowsRoute);
app.route("/", websocketRoute);
