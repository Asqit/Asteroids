import { IEntity } from './IEntity';
import { degreeToRadian, rand, randEven } from '../utils/Maths';
import { GameObject, gameConfig } from '../config';
import { delta } from '../utils/Perf';

export class Asteroid implements IEntity {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public speed: number;
	public angle: number;
	public active: boolean;
	public id: GameObject = 'ASTEROID';

	constructor() {
		const { width, height } = gameConfig;
		this.x = rand(0, width);
		this.y = rand(0, height);
		this.w = randEven(16, 64);
		this.h = this.w;
		this.speed = 3000 / this.w;
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

		let x = -this.w / 2;
		let y = -this.h / 2;

		ctx.beginPath();
		ctx.moveTo(x, y);

		ctx.lineTo(x + this.w / 2, y);
		ctx.lineTo(x + this.w / 1.2, y + this.h / 4);
		ctx.lineTo(x + this.w, y);
		ctx.lineTo(x + this.w, y + this.h / 1.2);
		ctx.lineTo(x + this.w / 1.2, y + this.h);
		ctx.lineTo(x + this.w / 5, y + this.h);
		ctx.lineTo(x, y + this.h / 2);
		ctx.lineTo(x, y);

		ctx.lineTo(x, y);

		ctx.stroke();

		ctx.restore();
	}
}
