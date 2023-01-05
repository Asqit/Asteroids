import { html } from '@arrow-js/core';

interface IMainMenuProps {
	onPlay: () => void;
	onHighScore: () => void;
}

export default function MainMenu(props: IMainMenuProps) {
	const { onPlay, onHighScore } = props;

	return html`
		<section class="main-menu">
			<article class="main-menu__container">
				<h1>Asteroids</h1>
				<ul>
					<li>
						<button @click="${onPlay}">Play</button>
					</li>

					<li>
						<button @click="${onHighScore}">High scores</button>
					</li>
				</ul>
			</article>
		</section>
	`;
}
