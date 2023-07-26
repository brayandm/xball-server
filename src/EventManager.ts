import GameManager from "./GameManager";
import WebSocketManager from "./WebSocketManager";

type updatePlayerEvent = {
  type: "updatePlayer";
  x: number;
  y: number;
};

class EventManager {
  private gameManager: GameManager;
  private webSocketManager: WebSocketManager;

  constructor(gameManager: GameManager, webSocketManager: WebSocketManager) {
    this.gameManager = gameManager;
    this.webSocketManager = webSocketManager;
  }

  private sendPlayerPositions(connectionId: string) {
    const players = this.gameManager.getPlayers();

    players.forEach((player) => {
      const message = JSON.stringify({
        type: "updatePlayer",
        id: player.getId(),
        x: player.getX(),
        y: player.getY(),
      });

      this.webSocketManager.sendMessage(connectionId, message);
    });
  }

  private sendNewPlayerEventToAllPlayers(connectionId: string) {
    const players = this.gameManager.getPlayers();

    const newPlayer = players.find((player) => player.getId() === connectionId);

    if (newPlayer) {
      const message = JSON.stringify({
        type: "createPlayer",
        isMe: newPlayer.getId() === connectionId,
        id: newPlayer.getId(),
        x: newPlayer.getX(),
        y: newPlayer.getY(),
      });

      players.forEach((player) => {
        this.webSocketManager.sendMessage(player.getId(), message);
      });
    }
  }

  private sendRemovePlayerEventToAllPlayers(connectionId: string) {
    const players = this.gameManager.getPlayers();

    const message = JSON.stringify({
      type: "removePlayer",
      id: connectionId,
    });

    players.forEach((player) => {
      this.webSocketManager.sendMessage(player.getId(), message);
    });
  }

  public async start() {
    const onMessage = (connectionId: string, message: string) => {
      const parsedMessage: updatePlayerEvent = JSON.parse(message);

      this.gameManager.updatePlayer(
        connectionId,
        parsedMessage.x,
        parsedMessage.y
      );

      this.sendPlayerPositions(connectionId);
    };

    const onNewConnection = (connectionId: string) => {
      this.gameManager.createPlayer(connectionId);

      this.sendNewPlayerEventToAllPlayers(connectionId);
    };

    const onCloseConnection = (connectionId: string) => {
      this.gameManager.removePlayer(connectionId);

      this.sendRemovePlayerEventToAllPlayers(connectionId);
    };

    this.webSocketManager.setOnMessageCallback(onMessage);
    this.webSocketManager.setOnNewConnectionCallback(onNewConnection);
    this.webSocketManager.setOnCloseConnectionCallback(onCloseConnection);
  }
}

export default EventManager;
