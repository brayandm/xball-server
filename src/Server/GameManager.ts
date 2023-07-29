import Player from "./Player";

class GameManager {
  private players: Player[] = [];
  private width: number;
  private height: number;
  private playerWidth = 70;
  private playerHeight = 70;

  constructor({ width, height }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
  }

  public createPlayer(id: string) {
    const player = new Player({
      id: id,
      x: Math.floor(Math.random() * this.width) + this.playerWidth / 2,
      y: Math.floor(Math.random() * this.height) + this.playerHeight / 2,
      playerWidth: this.playerWidth,
      playerHeight: this.playerHeight,
    });
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

  public applyPlayerKeySet(id: string, keySet: boolean[]) {
    const player = this.players.find((player) => player.getId() === id);
    if (player) {
      player.applyKeySet(keySet);
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
