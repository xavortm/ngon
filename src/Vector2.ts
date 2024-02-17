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

  public multiply(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  public divide(scalar: number): Vector2 {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  public copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public sum(v2: Vector2): Vector2 {
    this.x += v2.x;
    this.y += v2.y;
    return this;
  }
}

export default Vector2;
