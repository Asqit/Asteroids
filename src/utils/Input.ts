const _key: any = {};

export function isDown(key: string) {
	return _key[key];
}

function setKey(e: KeyboardEvent, state: boolean) {
	const ASCII = e.keyCode;
	let key = undefined;

	switch (ASCII) {
		case 27:
			key = 'ESC';
			break;
		case 32:
			key = 'SPACE';
			break;
		case 13:
			key = 'ENTER';
			break;
		default:
			key = String.fromCharCode(ASCII);
			break;
	}

	_key[key] = state;
}

export function initInput() {
	window.addEventListener('keydown', (e: any) => setKey(e, true));
	window.addEventListener('keyup', (e: any) => setKey(e, false));
}
