import { html } from '@arrow-js/core';

interface IHighScoreProps {}

export default function HighScore(props: IHighScoreProps) {
	const {} = props;
	const payload = localStorage.getItem('asteroids/player');

	return html``;
}
