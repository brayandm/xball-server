class Player {
  private id: string;
  private x: number;
  private y: number;
  private accelerationX: number;
  private accelerationY: number;
  private currentKeySet: boolean[];
  private playerWidth = 70;
  private playerHeight = 70;

  constructor(id: string) {
    this.id = id;
    this.x = this.playerWidth / 2;
    this.y = this.playerHeight / 2;
    this.currentKeySet = [false, false, false, false];
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

  public getAccelerationX() {
    return this.accelerationX;
  }

  public getAccelerationY() {
    return this.accelerationY;
  }

  public setAcceleration(accelerationX: number, accelerationY: number) {
    this.accelerationX = accelerationX;
    this.accelerationY = accelerationY;
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

  public getKeySet() {
    return this.currentKeySet;
  }

  public applyKeySet(keySet: boolean[]) {
    this.currentKeySet = keySet;
  }
}

export default Player;
