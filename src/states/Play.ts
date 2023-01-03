import { IState } from './IState';

class Play implements IState {
	onEnter() {}
	onExit() {}
	onPause() {}
	onResume() {}
	render() {}
	update() {}
}

export const play = new Play();
