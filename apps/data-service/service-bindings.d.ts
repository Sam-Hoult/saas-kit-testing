interface ExampleWorkflowParams {
  dataToPassIn;
}

interface Env extends Cloudflare.Env {
  EXAMPLE_WORKFLOW: Workflow<ExampleWorkflowParams>;
}
