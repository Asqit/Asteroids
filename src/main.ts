import { asteroids } from './game';
import { menu } from './states/Menu';

function main() {
	try {
		asteroids.init(menu);
	} catch (error) {
		console.error(error);
		alert(error);
	}
}

window.addEventListener('load', main);
