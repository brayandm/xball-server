class Player {
  private id: string;
  private x: number;
  private y: number;

  constructor(id: string) {
    this.id = id;
    this.x = 0;
    this.y = 0;
  }

  public getId() {
    return this.id;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public getPosition() {
    return { x: this.x, y: this.y };
  }

  public setX(x: number) {
    this.x = x;
  }

  public setY(y: number) {
    this.y = y;
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Player;
