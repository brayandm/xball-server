import * as dotenv from "dotenv";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const port = Number(process.env.WEBSOCKET_PORT || "3001");

const server = new WebSocket.Server({ port: port });

const connections: { [key: string]: WebSocket } = {};

const playerPositions: { [key: string]: { x: number; y: number } } = {};

server.on("connection", (connection) => {
  const connectionId = uuidv4();

  console.log(`Received a new connection (ID: ` + connectionId + `)`);
  connections[connectionId] = connection;
  playerPositions[connectionId] = { x: 0, y: 0 };
  console.log(`Total connections open: ` + Object.keys(connections).length);

  connection.on("close", async () => {
    console.log(`Connection closed (ID: ` + connectionId + `)`);
    delete connections[connectionId];
    delete playerPositions[connectionId];
    console.log(`Total connections open: ` + Object.keys(connections).length);
  });

  connection.on("message", (message) => {
    console.log(`Received message from (ID: ` + connectionId + `): ` + message);
    const positions = JSON.parse(message.toString()) as {
      x: number;
      y: number;
    };
    playerPositions[connectionId] = positions;
  });
});

console.log(`Server running on port ${port}`);

async function serve() {
  const running = true;
  while (running) {
    const playerPositionsArray = Object.keys(playerPositions).map((key) => {
      return { id: key, ...playerPositions[key] };
    });
    Object.keys(connections).forEach((connectionId) => {
      connections[connectionId].send(JSON.stringify(playerPositionsArray));
    });
    await new Promise((resolve) => setTimeout(resolve, 1000 / 60));
  }
}

serve();
