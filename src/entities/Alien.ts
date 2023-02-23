import { gameConfig } from "../config";
import { degreeToRadian, rand, randBool } from "../utils/Maths";
import { delta } from "../utils/Perf";
import { Particle } from "./Particle";

export class Alien extends Particle {
  constructor() {
    const { width, height } = gameConfig;

    super({
      angle: degreeToRadian(rand(0, 360)),
      speed: 150,
      x: 0,
      y: 0,
    });

    this.w = 32;
  }

  private handleMovement() {
    const { width, height } = gameConfig;
    this.x += this.speed * Math.cos(this.angle) * delta;
    this.y += this.speed * Math.sin(this.angle) * delta;

    if (this.x > width) {
      this.active = false;
    } else if (this.x < 0) {
      this.active = false;
    }

    if (this.y > height) {
      this.active = false;
    } else if (this.y < 0) {
      this.active = false;
    }
  }

  public render() {
    const ctx = gameConfig.ctx as CanvasRenderingContext2D;

    ctx.save();

    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

    ctx.rotate(this.angle);

    ctx.fillStyle = "#999999";

    ctx.arc(-this.w / 2, -this.h / 2, this.w, 0, 360);

    ctx.fillStyle = "#F00";

    ctx.arc(-this.w / 4, -this.h / 4, this.w / 2, 0, 360);

    ctx.restore();
  }

  public update() {
    this.handleMovement();
  }
}
