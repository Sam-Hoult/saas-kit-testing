# WebSocket Durable Object

This document explains how to use the WebSocket durable object server in the data-service.

## Overview

The `WebSocketServer` durable object manages WebSocket connections in a scalable, stateful way. It provides features like:
- Multiple simultaneous connections
- Broadcasting messages to all connected clients
- Connection lifecycle management
- Statistics and monitoring
- Automatic cleanup

## Endpoints

### Connect to WebSocket
```
WS /ws?id=<instance-id>
```

**Query Parameters:**
- `id` (optional): The durable object instance ID. Defaults to "default"

**Note:** The WebSocket endpoint is `/ws` (not `/websocket`) to ensure direct connection to the durable object.

### Get Statistics
```
GET /websocket/stats?id=<instance-id>
```

## Usage from Browser

```javascript
// Connect to the WebSocket server
const ws = new WebSocket('ws://localhost:8787/ws?id=default');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

// Send a message
ws.send(JSON.stringify({
  type: 'ping',
  data: 'Hello from client'
}));

// Broadcast a message to all other clients
ws.send(JSON.stringify({
  type: 'broadcast',
  data: { message: 'Hello everyone!' }
}));

// Get server statistics
ws.send(JSON.stringify({
  type: 'get_stats'
}));
```

## Supported Message Types

### `ping`
Sends a ping message to the server. Server responds with `pong`.

```javascript
ws.send(JSON.stringify({ type: 'ping' }));
```

### `broadcast`
Broadcasts a message to all other connected clients (excluding sender).

```javascript
ws.send(JSON.stringify({
  type: 'broadcast',
  data: { message: 'Hello everyone!' }
}));
```

### `get_stats`
Requests server statistics including total connections and your connection info.

```javascript
ws.send(JSON.stringify({ type: 'get_stats' }));
```

## Server Response Types

### `connected`
Sent when a client successfully connects.

```json
{
  "type": "connected",
  "id": "unique-connection-id",
  "message": "Welcome to WebSocket server",
  "totalConnections": 1
}
```

### `echo`
Echo of the received message.

```json
{
  "type": "echo",
  "data": { "your": "message" },
  "receivedAt": 1234567890
}
```

### `pong`
Response to a ping message.

```json
{
  "type": "pong",
  "timestamp": 1234567890
}
```

### `stats`
Response containing server statistics.

```json
{
  "type": "stats",
  "data": {
    "totalConnections": 5,
    "yourId": "your-connection-id",
    "connectedAt": 1234567890
  }
}
```

### `user_connected`
Notification when a new user connects.

```json
{
  "type": "user_connected",
  "data": {
    "id": "new-user-id",
    "totalConnections": 3
  }
}
```

### `user_disconnected`
Notification when a user disconnects.

```json
{
  "type": "user_disconnected",
  "data": {
    "id": "user-id",
    "totalConnections": 2
  }
}
```

### `broadcast`
Broadcast message from another client.

```json
{
  "type": "broadcast",
  "data": { "message": "Hello everyone!" }
}
```

### `error`
Error message from the server.

```json
{
  "type": "error",
  "message": "Error description"
}
```

## Testing

You can test the WebSocket connection using curl or any WebSocket client:

```bash
# Using curl to upgrade to WebSocket
curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" \
  -H "Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==" \
  ws://localhost:8787/ws
```

Or use a browser console:

```javascript
const ws = new WebSocket('ws://localhost:8787/ws');
ws.onmessage = (e) => console.log(e.data);
ws.send(JSON.stringify({ type: 'ping' }));
```

## Architecture

- Each WebSocket durable object instance manages multiple connections
- Connections are tracked with unique IDs
- Messages are routed based on type
- Broadcast messages exclude the sender
- Connections are automatically cleaned up on disconnect
- All connections to the same instance ID share the same durable object

## Multi-Instance Support

You can create multiple WebSocket server instances by using different `id` values:

```javascript
// Instance 1
const ws1 = new WebSocket('ws://localhost:8787/ws?id=room-1');

// Instance 2  
const ws2 = new WebSocket('ws://localhost:8787/ws?id=room-2');
```

Connections with the same `id` will be on the same durable object instance and can communicate with each other. Different `id` values create separate isolated instances.
