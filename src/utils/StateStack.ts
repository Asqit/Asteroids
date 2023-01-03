import { IState } from '../states/IState';

export interface IStateStack {
	push(state: IState): void;
	pop(): IState | undefined;
	peek(): IState | undefined;
	size(): number;
}

class StateStack implements IStateStack {
	private storage: IState[] = [];

	constructor(private capacity: number = Infinity) {}

	push(state: IState) {
		if (this.size() === this.capacity) {
			throw new Error('Stack reached maximum capacity');
		}

		state.onEnter();

		this.storage.push(state);
	}

	pop() {
		let last = this.storage.pop();

		last?.onExit();

		return last;
	}

	peek() {
		return this.storage[this.size() - 1];
	}

	size() {
		return this.storage.length;
	}
}

export { StateStack };
