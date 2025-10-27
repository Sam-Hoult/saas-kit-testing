import { WorkerEntrypoint } from "cloudflare:workers";
import { app } from "@/hono/app";
import { ExampleWorkflow } from "@/workflows/example-workflow";

export default class DataService extends WorkerEntrypoint<Env> {
  fetch(request: Request) {
    return app.fetch(request, this.env, this.ctx);
  }
}

// Export the workflow so it can be accessed via env.workflows
export { ExampleWorkflow };
