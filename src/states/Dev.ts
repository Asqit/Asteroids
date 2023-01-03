import { IState } from './IState';
import { Asteroid } from '../entities/Asteroid';
import { gameConfig } from '../config';
import { hero } from '../entities/Player';
import { initInput } from '../utils/Input';
import { Star } from '../entities/Star';

class Dev implements IState {
	public onEnter() {
		initInput();
		const { entities } = gameConfig;

		for (let i = 0; i < 70; i++) {
			entities.push(new Star());
		}

		for (let i = 0; i < 10; i++) {
			entities.push(new Asteroid());
		}

		entities.push(hero);
	}
	public onExit() {}
	public onPause() {}
	public onResume() {}
	public render() {
		let { width, height, entities } = gameConfig;
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.clearRect(0, 0, width, height);

		if (entities && entities.length !== 0) {
			entities = entities.filter((e) => e.active === true);
			entities.forEach((e) => e.render());
		}
	}
	public update() {
		const { entities } = gameConfig;

		if (entities && entities.length !== 0) {
			entities.forEach((e) => e.update());
		}
	}
}

export const dev = new Dev();
