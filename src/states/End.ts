import { IState } from './IState';

class End implements IState {
	onEnter() {}
	onExit() {}
	onPause() {}
	onResume() {}
	render() {}
	update() {}
}

export const end = new End();
