import { gameConfig } from '../config';
import { Particle } from '../entities/Particle';
import { rand } from '../utils/Maths';
import { IState } from './IState';
import { html } from '@arrow-js/core';

class Menu implements IState {
	onEnter() {
		const { entities, width, height } = gameConfig;

		// Creating space full of stars
		for (let i = 0; i < 70; i++) {
			entities.push(
				new Particle({ x: rand(0, width), y: rand(0, height) })
			);
		}

		this.renderHtml();
	}

	onExit() {}
	onPause() {}
	onResume() {}

	render() {
		const { entities } = gameConfig;

		entities.forEach((e) => e.render());
	}

	update() {}

	renderHtml() {
		const mainMenuTemplate = html`
			<section class="menu">
				<article class="menu__container">
					<h1>Asteroids</h1>
					<ul class="main__container__list">
						<li>
							<button onclick="">Play game</button>
						</li>
						<li>
							<button onclick="${console.log('Hello world!')}">
								High score
							</button>
						</li>
					</ul>
				</article>
			</section>
		`;

		mainMenuTemplate(document.body);
	}
}

export const menu = new Menu();
