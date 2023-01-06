import GameOver from '../components/gameOver/GameOver';
import { gameConfig } from '../config';
import { rand } from '../utils/Maths';
import { IState } from './IState';
import { hero } from '../entities/Player';
import { play } from './Play';

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

	private handleNewGame() {
		document.querySelector('.game-over')?.remove();
		gameConfig.stateStack.pop();
		gameConfig.stateStack.push(play);
		hero.reset();
	}

	renderHtml() {
		GameOver({
			score: hero.getScore,
			highScore: hero.getHighScore,
			playAgain: this.handleNewGame,
		})(document.body);
	}

	update() {}
}

export const end = new End();
