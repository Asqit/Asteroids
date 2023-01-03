import { asteroids } from './game';
import { dev } from './states/Dev';

function main() {
	try {
		asteroids.init(dev);
	} catch (error) {
		console.error(error);
		alert(error);
	}
}

window.addEventListener('load', main);
