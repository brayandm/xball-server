import Player from "./Player";

class GameManager {
  private players: Player[] = [];

  public createPlayer(id: string) {
    const player = new Player(id);
    this.players.push(player);
  }

  public updatePlayer(
    id: string,
    x: number,
    y: number,
    accelerationX: number,
    accelerationY: number
  ) {
    const player = this.players.find((player) => player.getId() === id);
    if (player) {
      player.setPosition(x, y);
      player.setAcceleration(accelerationX, accelerationY);
    }
  }

  public removePlayer(id: string) {
    this.players = this.players.filter((player) => player.getId() !== id);
  }

  public getPlayers() {
    return this.players;
  }
}

export default GameManager;
