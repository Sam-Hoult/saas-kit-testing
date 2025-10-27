import { Hono } from "hono";

export const workflowsRoute = new Hono<{ Bindings: Env }>();

workflowsRoute.post("/example", async (c) => {
  console.log("Creating new workflow instance", c);
  const payload = await c.req.json<ExampleWorkflowParams>();
  
  // Create a new workflow instance
  const instance = await c.env.EXAMPLE_WORKFLOW.create({
    params: payload,
  });
  
  return c.json({ 
    id: instance.id,
    status: "started" 
  });
});

workflowsRoute.get("/example/:id", async (c) => {
  const id = c.req.param("id");
  
  try {
    // Get the workflow instance by ID
    const instance = await c.env.EXAMPLE_WORKFLOW.get(id);
    
    // Get the status of the workflow
    const status = await instance.status();
    
    return c.json({
      id: id,
      status: status.status,
      error: status.error,
      output: status.output,
    });
  } catch (error) {
    return c.json(
      { 
        error: "Workflow not found",
        message: error instanceof Error ? error.message : "Unknown error" 
      },
      404
    );
  }
});

