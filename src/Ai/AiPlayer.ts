import WebSocketManager from "./WebSocketManager";

class AiPlayer {
  private webSocketManager: WebSocketManager;
  private x: number;
  private y: number;
  private accelerationX: number;
  private accelerationY: number;

  public start() {
    this.webSocketManager = new WebSocketManager({
      webSocketUrl: `ws://localhost:${process.env.WEBSOCKET_PORT}`,
    });
  }
}

export default AiPlayer;
