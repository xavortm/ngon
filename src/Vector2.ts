class Vector2 {
  private _x = 0;
  private _y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public get x() {
    return this._x;
  }

  public set x(value) {
    this._x = value;
  }

  public get y() {
    return this._y;
  }

  public set y(value) {
    this._y = value;
  }

  public distance(v2: Vector2): number {
    return Math.sqrt(v2.x + v2.y);
  }
}

export default Vector2;
