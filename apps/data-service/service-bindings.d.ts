export interface ExampleWorkflowParams {
  dataToPassIn;
}

declare global {
  interface Env extends Cloudflare.Env {
    EXAMPLE_WORKFLOW: Workflow<ExampleWorkflowParams>;
    WEBSOCKET_SERVER: DurableObjectNamespace<WebSocketServer>;
  }
}
