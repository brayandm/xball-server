import GameManager from "./GameManager";
import WebSocketManager from "./WebSocketManager";

type updatePlayerEvent = {
  type: "updatePlayer";
  x: number;
  y: number;
  accelerationX: number;
  accelerationY: number;
};

type keySetPlayerEvent = {
  type: "keySetPlayer";
  keySet: boolean[];
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
      if (player.getId() === connectionId) return;

      const message = JSON.stringify({
        type: "updatePlayer",
        id: player.getId(),
        x: player.getX(),
        y: player.getY(),
        accelerationX: player.getAccelerationX(),
        accelerationY: player.getAccelerationY(),
      });

      this.webSocketManager.sendMessage(connectionId, message);
    });
  }

  private sendNewPlayerEventToAllPlayers(connectionId: string) {
    const players = this.gameManager.getPlayers();

    const newPlayer = players.find((player) => player.getId() === connectionId);

    if (newPlayer) {
      const message = {
        type: "createPlayer",
        isMe: false,
        id: newPlayer.getId(),
        x: newPlayer.getX(),
        y: newPlayer.getY(),
      };

      players.forEach((player) => {
        this.webSocketManager.sendMessage(
          player.getId(),
          player.getId() === connectionId
            ? JSON.stringify({ ...message, isMe: true })
            : JSON.stringify(message)
        );
      });
    }
  }

  private sendCurrentPlayersToNewPlayer(connectionId: string) {
    const players = this.gameManager.getPlayers();

    players.forEach((player) => {
      if (player.getId() === connectionId) return;

      const message = JSON.stringify({
        type: "createPlayer",
        isMe: false,
        id: player.getId(),
        x: player.getX(),
        y: player.getY(),
      });

      this.webSocketManager.sendMessage(connectionId, message);
    });
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

  public start() {
    const onMessage = (connectionId: string, message: string) => {
      const event: updatePlayerEvent | keySetPlayerEvent = JSON.parse(message);

      if (event.type === "keySetPlayer") {
        this.gameManager.applyPlayerKeySet(connectionId, event.keySet);
      } else if (event.type === "updatePlayer") {
        this.gameManager.updatePlayer(
          connectionId,
          event.x,
          event.y,
          event.accelerationX,
          event.accelerationY
        );
      }

      this.sendPlayerPositions(connectionId);
    };

    const onNewConnection = (connectionId: string) => {
      this.gameManager.createPlayer(connectionId);

      this.sendNewPlayerEventToAllPlayers(connectionId);

      this.sendCurrentPlayersToNewPlayer(connectionId);
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
