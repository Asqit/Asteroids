import { IState } from './IState';
import { Asteroid } from '../entities/Asteroid';
import { gameConfig } from '../config';
import { hero } from '../entities/Player';
import { initInput } from '../utils/Input';
import { Bullet } from '../entities/Bullet';
import { rects } from '../utils/Collision';
import { Particle } from '../entities/Particle';
class Dev implements IState {
	public onEnter() {
		initInput();
		const { entities } = gameConfig;

		for (let i = 0; i < 10; i++) {
			entities.push(new Asteroid());
		}

		entities.push(hero);
	}
	public onExit() {}
	public onPause() {}
	public onResume() {}

	private handleCollision() {
		const { entities } = gameConfig;

		const bullets = entities.filter((e) => e.id === 'BULLET');
		const asteroids = entities.filter((e) => e.id === 'ASTEROID');

		asteroids.forEach((asteroid) => {
			bullets.forEach((bullet) => {
				if (rects(asteroid, bullet)) {
					bullet.active = false;
					asteroid.active = false;
					entities.push(
						new Particle(asteroid.x, asteroid.y),
						new Particle(asteroid.x, asteroid.y),
						new Particle(asteroid.x, asteroid.y)
					);
				}
			});
		});
	}

	public render() {
		let { width, height, entities } = gameConfig;
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.clearRect(0, 0, width, height);

		if (entities && entities.length !== 0) {
			gameConfig.entities = entities.filter((e) => e.active === true);
			entities.forEach((e) => e.render());
		}
	}
	public update() {
		const { entities } = gameConfig;

		if (entities && entities.length !== 0) {
			entities.forEach((e) => e.update());
			this.handleCollision();
		}
	}
}

export const dev = new Dev();
