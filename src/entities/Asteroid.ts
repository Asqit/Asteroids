import { IEntity } from './IEntity';
import { degreeToRadian, rand, randEven } from '../utils/Maths';
import { gameConfig } from '../config';
import { delta } from '../utils/Perf';

export class Asteroid implements IEntity {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public speed: number;
	public angle: number;
	public active: boolean;

	constructor() {
		const { width, height } = gameConfig;
		this.x = rand(0, width);
		this.y = rand(0, height);
		this.w = randEven(8, 48);
		this.h = this.w;
		this.speed = rand(20, 300);
		this.angle = degreeToRadian(rand(0, 360));
		this.active = true;
	}

	private resetLocation() {
		this.angle = degreeToRadian(rand(0, 360));
	}

	private move() {
		const { width, height } = gameConfig;

		if (this.x < 0) {
			this.x = width - this.w;
			this.resetLocation();
		} else if (this.x > width) {
			this.x = 0;
			this.resetLocation();
		}

		if (this.y < 0) {
			this.y = height - this.w;
			this.resetLocation();
		} else if (this.y > height) {
			this.y = 0;
			this.resetLocation();
		}

		this.x += this.speed * Math.cos(this.angle) * delta;
		this.y += this.speed * Math.sin(this.angle) * delta;
	}

	// Public methods
	public update() {
		this.move();
	}

	public render() {
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.save();

		// Translate coords to the center of square..
		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		// Rotate..
		ctx.rotate(this.angle);

		// Fill..
		ctx.strokeStyle = '#ffffff';

		// Remember coords are translated
		ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
		ctx.restore();
	}
}
