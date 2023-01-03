import { GameObject, gameConfig } from '../config';
import { delta } from '../utils/Perf';
import { IEntity } from './IEntity';

type BulletOwner = 'PLAYER' | 'ALIEN';

interface IBullet extends IEntity {
	owner: BulletOwner;
}

export class Bullet implements IBullet {
	public owner: BulletOwner = 'PLAYER';
	public x: number = 0;
	public y: number = 0;
	public w: number = 8;
	public h: number = 4;
	public id: GameObject = 'BULLET';
	public speed: number = 500;
	public angle: number = 0;
	public active: boolean = true;

	constructor(owner: BulletOwner, x: number, y: number, angle: number) {
		this.owner = owner;
		this.x = x;
		this.y = y;
		this.angle = angle;
	}

	private killAfterSecond() {
		setTimeout(() => {
			this.active = false;
		}, 1000);
	}

	private handleScreenBorders() {
		const { width, height } = gameConfig;

		if (this.x < 0) {
			this.x = width;
			this.killAfterSecond();
		} else if (this.x > width) {
			this.x = 0;
			this.killAfterSecond();
		}

		if (this.y < 0) {
			this.y = height;
			this.killAfterSecond();
		} else if (this.y > height) {
			this.y = 0;
			this.killAfterSecond();
		}
	}

	// Public methods
	public update() {
		this.handleScreenBorders();
		this.x += this.speed * Math.cos(this.angle) * delta;
		this.y += this.speed * Math.sin(this.angle) * delta;
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
}
