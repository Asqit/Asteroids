import { gameConfig } from '../config';
import { hero } from '../entities/Player';
import { initInput } from '../utils/Input';
import { end } from './End';
import { IState } from './IState';
import { playManager } from './PlayManager';

class Play implements IState {
	public onEnter() {
		initInput();
		playManager.init();
	}

	public onExit() {
		gameConfig.entities.length = 0;
	}

	public render() {
		const { entities, width, height } = gameConfig;
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.clearRect(0, 0, width, height);

		entities.forEach((e) => e.render());
	}

	public update() {
		playManager.update();

		if (!hero.isAlive()) {
			gameConfig.stateStack.pop();
			gameConfig.stateStack.push(end);
		}
	}
}

export const play = new Play();
