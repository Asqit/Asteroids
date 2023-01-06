import { gameConfig } from '../config';
import { Asteroid } from '../entities/Asteroid';
import { Bullet } from '../entities/Bullet';
import { Particle } from '../entities/Particle';
import { hero } from '../entities/Player';
import { rects } from '../utils/Collision';

class PlayManager {
	private collision() {
		const { entities } = gameConfig;
		const asteroids = entities.filter((entity) => entity.id === 'ASTEROID');
		const bullets = entities.filter((entity) => entity.id === 'BULLET');
		const aliens = entities.filter((entity) => entity.id === 'ALIEN');

		asteroids.forEach((asteroid) => {
			if (rects(asteroid, hero)) {
				hero.hit();
				hero.addScore();
				asteroid.active = false;
				entities.push(
					new Particle({ x: hero.x, y: hero.y }),
					new Particle({ x: hero.x, y: hero.y }),
					new Particle({ x: hero.x, y: hero.y })
				);

				if (asteroid.w === 64) {
					entities.push(
						new Asteroid(32, 300),
						new Asteroid(32, 300),
						new Asteroid(32, 300),
						new Asteroid(32, 300)
					);
				}
			}

			bullets.forEach((bullet) => {
				if (rects(asteroid, bullet)) {
					asteroid.active = false;
					bullet.active = false;
					hero.addScore();
					entities.push(
						new Particle({ x: asteroid.x, y: asteroid.y }),
						new Particle({ x: asteroid.x, y: asteroid.y }),
						new Particle({ x: asteroid.x, y: asteroid.y })
					);

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
				}

				aliens.forEach((alien) => {
					let b: Bullet = bullet as Bullet;

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
