import './style.css'
import Vector2 from './Vector2';

const PI = Math.PI;
const Ratio = 2;

const canvasEl: HTMLCanvasElement = document.querySelector('#canvas');

// Implementing a two dimention Spirpinski n-gon (aka Polyflake)
class Pentagon {
  private dots = 3;
  private radius = 400;
  private _ctx: CanvasRenderingContext2D;
  private canvasHeight = 0;
  private canvasWidth = 0;
  private canvasMiddle: Vector2;
  private edges: Vector2[] = [];
  private latestPoint: Vector2 = new Vector2(0, 0);
  private colors = {
    edges: '#f00',
    center: '#ff0',
    dot: '#fff',
  }

  private iterations = 0;

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
  placeRandomDot(): void {
    const rand = Math.floor(Math.random() * (this.dots));
    const edge = this.edges[rand];
    this.iterations += 1;

    if (this.iterations > 65000) {
      this.iterations = 0;
    }

    // Rand number between 1 and Phi:
    const scalar = 1 / (Math.random() * (2 - Ratio) + Ratio);

    if (this.latestPoint.x === 0) {
      this.latestPoint = new Vector2(this.canvasMiddle.x, this.canvasMiddle.y);
      console.log('called');
      console.log('#' + this.iterations.toString(16));
    }

    const x0 = this.latestPoint.x;
    const y0 = this.latestPoint.y;
    const x1 = edge.x;
    const y1 = edge.y;
    const r = 1 / scalar;

    const p1 = this.latestPoint.copy();
    const p2 = edge.copy();

    p1.multiply(1 - scalar);
    p2.multiply(scalar);
    this.latestPoint = p1.sum(p2);

    this._ctx.fillStyle = 'white';
    this._ctx.fillRect(this.latestPoint.x, this.latestPoint.y, 1, 1);
  }
}

if (canvasEl) {
  const pentagon = new Pentagon(canvasEl);
  pentagon.initPentagonPoints();

  for (let i = 0; i < 100000; i++) {
    pentagon.placeRandomDot();
  }
}
