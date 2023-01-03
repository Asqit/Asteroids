import { IEntity } from './IEntity';
import { isDown } from '../utils/Input';
import { delta } from '../utils/Perf';
import { GameObject, gameConfig } from '../config';
import { Bullet } from './Bullet';
import { Vec2, rand } from '../utils/Maths';
import { Particle } from './Particle';

interface IPlayer extends IEntity {}

interface IPlayerSave {
	highScore: number;
}

// Physics by https://codepen.io/OliverBalfour/pen/jqympW?editors=0010

class Player implements IPlayer {
	public x: number = 0;
	public y: number = 0;
	public w: number = 32;
	public h: number = 32;
	public speed: number = 350;
	public angle: number = 0;
	public active: boolean = true;
	private lastHit: number = Date.now();
	public id: GameObject = 'PLAYER';
	private lives: number = 3;
	private score: number = 0;
	private friction: number = 0.98;
	private velocity: Vec2 = new Vec2(0, 0);
	private acceleration: Vec2 = new Vec2(0, 0);
	private weaponCooldown: number = 0;
	private weaponCooldownDecrement: number = 3;

	// Private methods -----------------
	private saveToLocalStorage() {
		const SAVE_NAME = 'asteroids/player';

		if (!localStorage.getItem(SAVE_NAME)) {
			const payload: IPlayerSave = {
				highScore: this.score,
			};

			localStorage.setItem(SAVE_NAME, JSON.stringify(payload));
		}

		const payload: IPlayerSave = JSON.parse(
			localStorage.getItem(SAVE_NAME)!
		);

		payload.highScore =
			this.score > payload.highScore ? this.score : payload.highScore;

		localStorage.setItem(SAVE_NAME, JSON.stringify(payload));
	}

	private loadFromLocalStorage() {}

	private shoot() {
		if (this.weaponCooldown <= 0) {
			let x = this.x + this.w / 2;
			let y = this.y + this.h / 2;

			gameConfig.entities.push(new Bullet('PLAYER', x, y, this.angle));

			this.weaponCooldown = 100;
		}
	}

	private handleScreenBorders() {
		const { width, height } = gameConfig;

		if (this.x < 0) {
			this.x = width - this.w;
		} else if (this.x > width) {
			this.x = 0;
		}

		if (this.y < 0) {
			this.y = height - this.w;
		} else if (this.y > height) {
			this.y = 0;
		}
	}

	private keyHandler() {
		let friction;

		if (isDown('A')) {
			this.angle -= 2 * delta;
		} else if (isDown('D')) {
			this.angle += 2 * delta;
		}

		if (isDown('W')) {
			this.acceleration.x = this.speed * Math.cos(this.angle) * delta;
			this.acceleration.y = this.speed * Math.sin(this.angle) * delta;
		} else {
			this.acceleration.x = this.acceleration.y = 0;
		}

		if (isDown('SPACE')) {
			this.shoot();
		}
	}

	private updatePosition() {
		this.velocity.x += this.acceleration.x;
		this.velocity.y += this.acceleration.y;

		this.velocity.x *= this.friction;
		this.velocity.y *= this.friction;

		this.x += this.velocity.x * delta;
		this.y += this.velocity.y * delta;
	}

	// Public methods ------------------
	public hit() {
		// current time in ms > lastHit(ms) + 5s ?
		if (Date.now() > this.lastHit + 5000) {
			if (this.lives > 1) {
				this.lives -= 1;
			} else {
				this.saveToLocalStorage();
			}
		}
	}

	public update() {
		this.keyHandler();
		this.updatePosition();
		this.handleScreenBorders();

		if (this.weaponCooldown > 0) {
			this.weaponCooldown -= this.weaponCooldownDecrement;
		}
	}

	private renderUi() {
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;
		ctx.font = '20px monospace';
		ctx.fillStyle = '#fff';
		ctx.fillText(`score: ${this.score}`, 30, 30);
		ctx.fillText(`lives: ${this.lives}`, 30, 60);
	}

	private renderHitbox() {
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.save();

		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		ctx.rotate(this.angle);

		ctx.strokeStyle = 'white';

		let x = -this.w / 2;
		let y = -this.h / 2;

		ctx.strokeRect(x, y, this.w, this.h);

		ctx.restore();
	}

	private renderPlayer() {
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.save();

		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		ctx.rotate(this.angle);

		ctx.strokeStyle = 'white';

		let x = -this.w / 2;
		let y = -this.h / 2;

		ctx.beginPath();

		ctx.moveTo(x, y);

		ctx.lineTo(x + this.w, y + this.h / 2);

		ctx.lineTo(x, y + this.h);

		ctx.moveTo(x + this.w / 2, y + this.h / 2);

		ctx.lineTo(x, y);

		ctx.moveTo(x + this.w / 2, y + this.h / 2);

		ctx.lineTo(x, y + this.h);

		ctx.stroke();

		ctx.restore();
	}

	public render() {
		//this.renderHitbox();
		this.renderUi();
		this.renderPlayer();
	}
}

/** **singleton** of class `Player` */
export const hero = new Player();
