import { html } from '@arrow-js/core';

interface IGameOverProps {}

export default function GameOver(props: IGameOverProps) {
	const {} = props;

	return html`
		<section class="game-over">
			<article class="game-over__container">
				<h1>Game Over</h1>
				<p>Your score was</p>
				<p>highest achieved score was</p>
				<button>play again</button>
			</article>
		</section>
	`;
}
