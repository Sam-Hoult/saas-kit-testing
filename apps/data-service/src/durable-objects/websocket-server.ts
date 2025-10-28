import { DurableObject } from "cloudflare:workers";

interface WebSocketSession {
  id?: string;
}

export class WebSocketServer extends DurableObject {
  private sessions: Map<WebSocket, WebSocketSession>;
  private storage: DurableObjectStorage;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sessions = new Map();
    this.storage = ctx.storage;

    // Recover existing websocket connections
    this.ctx.getWebSockets().forEach((ws) => {
      this.sessions.set(ws, { ...ws.deserializeAttachment() });
    });
  }

  async fetch(_request: Request) {
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    if (!server) throw new Error('Server WebSocket not found');

    this.ctx.acceptWebSocket(server);
    this.sessions.set(server, {});
    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketMessage(ws: WebSocket, msg: string | ArrayBuffer) {
    const session = this.sessions.get(ws);
    if (!session) return;

    // Assign ID on first message
    if (!session.id) {
      session.id = crypto.randomUUID();
      ws.serializeAttachment({ ...ws.deserializeAttachment(), id: session.id });
      ws.send(JSON.stringify({ ready: true, id: session.id }));
    }

    this.broadcast(ws, msg);
  }

  private broadcast(sender: WebSocket, msg: string | ArrayBuffer) {
    const session = this.sessions.get(sender);
    if (!session?.id) return;

    for (const [ws] of this.sessions) {
      if (sender === ws) continue;

      if (typeof msg === 'string') {
        try {
          const parsed = JSON.parse(msg);
          ws.send(JSON.stringify({ ...parsed, id: session.id }));
        } catch {
          ws.send(JSON.stringify({ message: msg, id: session.id }));
        }
      } else {
        ws.send(JSON.stringify({ message: msg, id: session.id }));
      }
    }
  }

  private close(ws: WebSocket) {
    const session = this.sessions.get(ws);
    if (!session?.id) return;
    this.broadcast(ws, JSON.stringify({ type: 'left' }));
    this.sessions.delete(ws);
  }

  webSocketClose(ws: WebSocket) {
    this.close(ws);
  }

  webSocketError(ws: WebSocket) {
    this.close(ws);
  }
}

export default {
	async fetch(request: Request, env: Env, _ctx: DurableObjectState) {
		const upgrade = request.headers.get('Upgrade');
		if (!upgrade || upgrade != 'websocket') {
			return new Response('Expected upgrade to websocket', { status: 426 });
		}
    console.log('Fetching WebSocket server');
		const id = env.WEBSOCKET_SERVER.idFromName(new URL(request.url).pathname);
		const websocketServer = env.WEBSOCKET_SERVER.get(id) as WebSocketServer;
		return websocketServer.fetch(request);
	},
};