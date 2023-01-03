import { GameObject, gameConfig } from '../config';
import { degreeToRadian, rand, randEven } from '../utils/Maths';
import { delta } from '../utils/Perf';
import { IEntity } from './IEntity';

interface IParticleProps {
	x: number;
	y: number;
	speed?: number;
	angle?: number;
}

export class Particle implements IEntity {
	public x: number;
	public y: number;
	public w: number;
	public h: number;
	public speed: number;
	public angle: number;
	public active: boolean;
	public id: GameObject = 'PARTICLE';

	constructor(props: IParticleProps) {
		const { width, height } = gameConfig;
		const { angle, x, y, speed } = props;
		this.x = x;
		this.y = y;
		this.w = 3;
		this.h = this.w;
		this.speed = speed ?? 50;
		this.angle = angle ?? degreeToRadian(rand(0, 360));
		this.active = true;

		setTimeout(() => {
			this.active = false;
		}, 5000);
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

	public update() {
		this.x += this.speed * Math.cos(this.angle) * delta;
		this.y += this.speed * Math.sin(this.angle) * delta;
	}
}
