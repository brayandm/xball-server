import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

class WebSocketManager {
  private webSocket: WebSocket;
  connections: { [key: string]: WebSocket } = {};

  constructor(
    port: number,
    onMessage: (connectionId: string, message: string) => void = () => {
      return;
    }
  ) {
    this.webSocket = new WebSocket(`ws://localhost:${port}`);

    this.webSocket.on("connection", (connection) => {
      const connectionId = uuidv4();

      console.log(`Received a new connection (ID: ` + connectionId + `)`);

      this.connections[connectionId] = connection;

      console.log(
        `Total connections open: ` + Object.keys(this.connections).length
      );

      connection.on("close", async () => {
        console.log(`Connection closed (ID: ` + connectionId + `)`);
        delete this.connections[connectionId];
        console.log(
          `Total connections open: ` + Object.keys(this.connections).length
        );
      });

      connection.on("message", (message: string) => {
        console.log(
          `Received message from (ID: ` + connectionId + `): ` + message
        );
        onMessage(connectionId, message);
      });
    });

    console.log(`Server running on port ${port}`);
  }

  public send(connectionId: string, message: string) {
    if (this.connections[connectionId]) {
      this.connections[connectionId].send(message);
    }
  }
}

export default WebSocketManager;
