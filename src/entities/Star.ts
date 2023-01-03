import { gameConfig } from '../config';
import { degreeToRadian, rand, randEven } from '../utils/Maths';
import { delta } from '../utils/Perf';
import { IEntity } from './IEntity';

export class Star implements IEntity {
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
		this.w = 2;
		this.h = this.w;
		this.speed = 3;
		this.angle = degreeToRadian(rand(0, 360));
		this.active = true;
	}

	public render() {
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.save();

		// Translate coords to the center of square..
		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		// Rotate..
		ctx.rotate(this.angle);

		// Fill..
		ctx.fillStyle = '#ffffff';

		// Remember coords are translated
		ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
		ctx.restore();
	}

	public update() {}
}
