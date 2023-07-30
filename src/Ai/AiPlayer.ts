import WebSocketManager from "./WebSocketManager";

class AiPlayer {
  private webSocketManager: WebSocketManager;
  private x: number;
  private y: number;
  private accelerationX: number;
  private accelerationY: number;

  constructor(webSocketManager: WebSocketManager) {
    this.webSocketManager = webSocketManager;
    this.x = 0;
    this.y = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
  }

  public async start() {
    this.webSocketManager.setOnOpenConnectionCallback(async () => {
      console.log("AiPlayer is started.");
      const running = true;
      while (running) {
        const keySet = [
          Math.random() >= 0.5,
          Math.random() >= 0.5,
          Math.random() >= 0.5,
          Math.random() >= 0.5,
        ];
        this.webSocketManager.sendMessage(
          JSON.stringify({
            type: "keySetPlayer",
            keySet: keySet,
          })
        );
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve(null);
          }, Math.random() * 5000)
        );
      }
    });
  }
}

export default AiPlayer;
