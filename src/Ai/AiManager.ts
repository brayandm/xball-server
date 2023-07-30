import AiPlayer from "./AiPlayer";
import * as dotenv from "dotenv";
import WebSocketManager from "./WebSocketManager";

dotenv.config();

const aiPlayers = [];

for (let i = 0; i < Number(process.env.NUMBER_OF_AI_PLAYERS); i++) {
  const webSocketManager = new WebSocketManager({
    webSocketUrl: `ws://nodejs:${process.env.WEBSOCKET_PORT}`,
  });

  aiPlayers.push(new AiPlayer(webSocketManager));
}

aiPlayers.forEach((aiPlayer) => {
  aiPlayer.start();
});
