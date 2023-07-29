import * as dotenv from "dotenv";
import WebSocketManager from "./WebSocketManager";
import GameManager from "./GameManager";
import EventManager from "./EventManager";

dotenv.config();

const webSocketManager = new WebSocketManager({
  port: Number(process.env.WEBSOCKET_PORT || "3001"),
});

const gameManager = new GameManager();

const eventManager = new EventManager(gameManager, webSocketManager);

eventManager.start();
