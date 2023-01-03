/**
 * **Description:** This interface represents how State should be represented
 * in game
 */
export interface IState {
	props?: any;
	onEnter: () => void;
	onExit: () => void;
	onPause: () => void;
	onResume: () => void;
	render: () => void;
	update: () => void;
}
