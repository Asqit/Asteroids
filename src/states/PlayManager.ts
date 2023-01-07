import { gameConfig } from '../config';
import { Asteroid } from '../entities/Asteroid';
import { Bullet } from '../entities/Bullet';
import { IEntity } from '../entities/IEntity';
import { Particle } from '../entities/Particle';
import { hero } from '../entities/Player';
import { rects } from '../utils/Collision';

class PlayManager {
	private splitAsteroid(asteroid: Asteroid) {
		const { entities } = gameConfig;
		if (asteroid.w === 128) {
			entities.push(
				new Asteroid(asteroid.x, asteroid.y, 64, 100),
				new Asteroid(asteroid.x, asteroid.y, 64, 100),
				new Asteroid(asteroid.x, asteroid.y, 64, 100),
				new Asteroid(asteroid.x, asteroid.y, 64, 100)
			);
		} else if (asteroid.w === 64) {
			entities.push(
				new Asteroid(asteroid.x, asteroid.y, 32, 150),
				new Asteroid(asteroid.x, asteroid.y, 32, 150)
			);
		}

		entities.push(
			new Particle({ x: asteroid.x, y: asteroid.y }),
			new Particle({ x: asteroid.x, y: asteroid.y }),
			new Particle({ x: asteroid.x, y: asteroid.y })
		);
	}

	private collision() {
		const { entities } = gameConfig;
		const asteroids = entities.filter((entity) => entity.id === 'ASTEROID');
		const bullets = entities.filter((entity) => entity.id === 'BULLET');
		const aliens = entities.filter((entity) => entity.id === 'ALIEN');

		asteroids.forEach((asteroid) => {
			if (rects(hero, asteroid)) {
				hero.hit();
				hero.addScore();
				asteroid.active = false;
				this.splitAsteroid(asteroid as Asteroid);
			}

			bullets.forEach((bullet) => {
				let b = bullet as Bullet;
				if (rects(asteroid, bullet) && b.owner === 'PLAYER') {
					bullet.active = false;
					asteroid.active = false;
					hero.addScore();
					this.splitAsteroid(asteroid as Asteroid);
				}

				aliens.forEach((alien) => {
					let b = bullet as Bullet;

					if (rects(alien, bullet) && b.owner === 'PLAYER') {
						alien.active = false;
						bullet.active = false;
						hero.addScore();
					} else if (rects(hero, bullet) && b.owner === 'ALIEN') {
						hero.hit();
						bullet.active = false;
					}
				});
			});
		});
	}

	public update() {
		gameConfig.entities = gameConfig.entities.filter(
			(e) => e.active === true
		);

		this.collision();

		let asteroids = gameConfig.entities.filter(
			(entity) => entity.id === 'ASTEROID'
		);

		if (asteroids.length === 0 && hero.isAlive()) {
			for (let i = 0; i < 4; i++) {
				gameConfig.entities.push(new Asteroid());
			}
		}

		if (gameConfig.entities.length > 0) {
			gameConfig.entities.forEach((e) => e.update());
		}
	}

	public init() {
		for (let i = 0; i < 4; i++) {
			gameConfig.entities.push(new Asteroid());
		}

		gameConfig.entities.push(hero);
	}
}

export const playManager = new PlayManager();
