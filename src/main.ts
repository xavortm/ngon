import './style.css'
import Vector2 from './Vector2';

const PI = Math.PI;
const Phi = (1 + Math.sqrt(5)) / 2;

const canvasEl: HTMLCanvasElement = document.querySelector('#canvas');

// Implementing a two dimention Spirpinski n-gon (aka Polyflake)
class Pentagon {
  private dots = 5;
  private radius = 300;
  private _ctx: CanvasRenderingContext2D;
  private canvasHeight = 0;
  private canvasWidth = 0;
  private canvasMiddle: Vector2;
  private edges: Vector2[] = [];
  private latestDot: Vector2 = new Vector2();
  private colors = {
    edges: '#fff',
    center: '#ff0',
  }

  constructor(canvasElement: HTMLCanvasElement) {

    this._ctx = canvasElement.getContext('2d')!;
    this.canvasWidth = canvasElement.width;
    this.canvasHeight = canvasElement.height;
    this.canvasMiddle = new Vector2(this.canvasWidth / 2, this.canvasHeight / 2);

    // Configure canvas styles:
    this._ctx.fillStyle = 'black';
    this._ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  initPentagonPoints() {
    let x = 0, y = 0;
    const angle = 2 * PI / this.dots;

    this._ctx.fillStyle = this.colors.center;
    this._ctx.fillRect(this.canvasMiddle.x, this.canvasMiddle.y, 4, 4);
    this._ctx.fillStyle = this.colors.edges;

    for (let i = 0; i < this.dots; i++) {
      x = this.canvasMiddle.x + this.radius * Math.cos(angle * i - PI / 2);
      y = this.canvasMiddle.y + this.radius * Math.sin(angle * i - PI / 2);
      this._ctx.fillRect(x, y, 4, 4);
      this.edges.push(new Vector2(x, y));
    }
  }

  // A random dot must be placed between v1 and v2 at golden ratio distance.
  placeRandomDot(v1: Vector2): void {
    const rand = Math.floor(Math.random() * (this.dots - 1));
    const v2 = this.edges[rand];
  }
}

if (canvasEl) {
  const pentagon = new Pentagon(canvasEl);
  pentagon.initPentagonPoints();
}
