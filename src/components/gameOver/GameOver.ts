import { html } from '@arrow-js/core';

interface IGameOverProps {
	score: number;
	highScore: number;
	playAgain: () => void;
}

export default function GameOver(props: IGameOverProps) {
	const { score, highScore, playAgain } = props;

	return html`
		<section class="game-over">
			<article class="game-over__container">
				<h1>Signal lost</h1>
				<p>Your score was ${score}</p>
				<p>highest achieved score was ${highScore}</p>
				<button @click="${playAgain}">play again</button>
			</article>
		</section>
	`;
}
