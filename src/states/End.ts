import GameOver from '../components/gameOver/GameOver';
import { gameConfig } from '../config';
import { rand } from '../utils/Maths';
import { IState } from './IState';

class End implements IState {
	onEnter() {
		this.renderHtml();
	}

	onExit() {}

	render() {
		const { width, height } = gameConfig;
		const ctx = gameConfig.ctx as CanvasRenderingContext2D;

		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = 'white';
		ctx.fillRect(0, rand(0, height), width, 10);
	}

	renderHtml() {
		GameOver({})(document.body);
	}

	update() {}
}

export const end = new End();
