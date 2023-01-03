import { IEntity } from './IEntity';
import { isDown } from '../utils/Input';
import { delta } from '../utils/Perf';
import { gameConfig } from '../config';
import { Bullet } from './Bullet';

interface IPlayer extends IEntity {}

interface IPlayerSave {
	highScore: number;
}

class Player implements IPlayer {
	public x: number = 0;
	public y: number = 0;
	public w: number = 32;
	public h: number = 32;
	public speed: number = 150;
	public angle: number = 0;
	public active: boolean = true;
	private lastHit: number = Date.now();
	private lives: number = 3;
	private score: number = 0;
	private weaponCooldown: number = 0;
	private weaponCooldownDecrement: number = 2.5;

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
			gameConfig.entities.push(
				new Bullet(
					'PLAYER',
					this.x + this.w / 2,
					this.y + this.h / 2,
					this.angle
				)
			);
			this.weaponCooldown = 100;
		}
	}

	private keyHandler() {
		if (isDown('A')) {
			this.angle -= 2.5 * delta;
		} else if (isDown('D')) {
			this.angle += 2.5 * delta;
		}

		if (isDown('W')) {
			this.x += this.speed * Math.cos(this.angle) * delta;
			this.y += this.speed * Math.sin(this.angle) * delta;
		}

		if (isDown('SPACE')) {
			this.shoot();
		}
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

		if (this.weaponCooldown > 0) {
			this.weaponCooldown -= this.weaponCooldownDecrement;
		}
	}

	public render() {
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.save();

		// Translate coords to the center of square..
		ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

		// Rotate..
		ctx.rotate(this.angle);

		// Fill / Stroke..
		ctx.fillStyle = '#ffffff';

		// Remember coords are translated
		// You should use relative positions
		let x = -this.w / 2;
		let y = -this.h / 2;

		ctx.fillRect(x, y, this.w, this.h);

		ctx.restore();
	}
}

/** **singleton** of class `Player` */
export const hero = new Player();
