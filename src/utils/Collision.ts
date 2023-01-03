import { Circle, Rect, Maths, Vec2 } from './Maths';

export function circles(a: Circle, b: Circle) {
	const RADIUS_SUM = a.radius + b.radius;
	const DISTANCE = Maths.substrVectors(a.position, b.position);

	return Maths.getVectorLength(DISTANCE) <= RADIUS_SUM;
}

export function rects(a: Rect, b: Rect) {
	return (
		a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
	);
}

export function points(a: Vec2, b: Vec2) {
	return Maths.deepFloatCmp(a.x, b.x) && Maths.deepFloatCmp(a.y, b.y);
}

export function vectors(a: Vec2, b: Vec2) {
	const xs = a.x === b.x;
	const ys = a.y === b.y;
	return xs && ys;
}

export * as Collision from './Collision';
