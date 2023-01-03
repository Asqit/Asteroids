import { gameConfig } from './config';
import { IState } from './states/IState';
import { Perf } from './utils/Perf';

class Game {
	constructor() {
		// We need to rebind `this` keyword
		this.loop = this.loop.bind(this);
	}

	private render() {
		gameConfig.stateStack.peek()?.render();
	}

	private update() {
		gameConfig.stateStack.peek()?.update();
	}

	private loop() {
		Perf.beforeCycle();
		this.update();
		this.render();
		gameConfig.id = window.requestAnimationFrame(this.loop);
		Perf.afterCycle();
	}

	private onStart() {
		gameConfig.frame.create(document.body);
		this.loop();
	}

	public init(initialState?: IState) {
		if (initialState) {
			gameConfig.stateStack.push(initialState);
		}

		if (gameConfig.stateStack.size() !== 0) {
			this.onStart();
		} else {
			throw new Error('Cannot initialize game without any state');
		}
	}
}

/** **singleton** of class `Game` */
export const asteroids = new Game();
