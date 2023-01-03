function getTimeStamp() {
	return window.performance && window.performance.now
		? window.performance.now()
		: new Date().getTime();
}

let current = 0;
let last = getTimeStamp();
let step = 1 / 60;
export let fps = 0;
export let delta = 0;

export function beforeCycle() {
	current = getTimeStamp();
	delta = Math.min(1, (current - last) / 1e3);
	fps = 1 / delta;
}

export function afterCycle() {
	last = current;
}

export * as Perf from './Perf';
