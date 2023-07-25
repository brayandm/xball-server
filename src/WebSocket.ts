import * as dotenv from "dotenv";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const port = Number(process.env.WEBSOCKET_PORT || "3001");

const server = new WebSocket.Server({ port: port });

const connections: { [key: string]: WebSocket } = {};

server.on("connection", (connection) => {
  const connectionId = uuidv4();

  console.log(`Received a new connection (ID: ` + connectionId + `)`);
  connections[connectionId] = connection;
  console.log(`Total connections open: ` + Object.keys(connections).length);

  connection.on("close", async () => {
    console.log(`Connection closed (ID: ` + connectionId + `)`);
    delete connections[connectionId];
    console.log(`Total connections open: ` + Object.keys(connections).length);
  });

  connection.on("message", (message) => {
    console.log(`Received message from (ID: ` + connectionId + `): ` + message);
  });
});

console.log(`Server running on port ${port}`);
