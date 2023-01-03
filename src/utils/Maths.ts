export class Vec2 {
	public y: number;
	public x: number;
	constructor(x?: number, y?: number) {
		this.x = x ?? 0;
		this.y = y ?? 0;
	}
}

export class Rect {
	public x: number;
	public y: number;
	public w: number;
	public h: number;

	constructor(x?: number, y?: number, w?: number, h?: number) {
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.w = w ?? 10;
		this.h = h ?? 10;
	}
}

export class OrientedRect extends Rect {
	public angle: number;

	constructor(x = 0, y = 0, w = 4, h = 4, angle = 0) {
		super(x, y, w, h);
		this.angle = angle;
	}
}

export class Line {
	public base: Vec2;
	public direction: Vec2;

	constructor(base?: Vec2, direction?: Vec2) {
		this.base = base ?? new Vec2();
		this.direction = direction ?? new Vec2();
	}
}

export class LineSegment {
	public a: Vec2;
	public b: Vec2;

	constructor(a?: Vec2, b?: Vec2) {
		this.a = a ?? new Vec2();
		this.b = b ?? new Vec2();
	}
}

export class Circle {
	public position: Vec2;
	public radius: number;

	constructor(position?: Vec2, radius?: number) {
		this.position = position ?? new Vec2();
		this.radius = radius ?? 0;
	}
}

export function rand(min: number, max: number) {
	return min + Math.random() * (max - min);
}

export function randEven(min: number, max: number) {
	let arr: number[] = [];

	for (let i = min; i < max; i++) {
		if (i % 2 === 0) {
			arr.push(i);
		}
	}

	return randElement(arr);
}

export function randInt(min: number, max: number) {
	return Math.floor(rand(min, max));
}

export function randElement(array: any[]) {
	return array[randInt(0, array.length)];
}

export function randBool() {
	return randElement([true, false]);
}

export function isNumberBetween(n: number, min: number, max: number) {
	return n >= min && n <= max;
}

export function degreeToRadian(degree: number) {
	return (degree * Math.PI) / 180;
}

export function limitValue(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n));
}

export function sumVectors(a: Vec2, b: Vec2) {
	return new Vec2(a.x + b.x, a.y + b.y);
}

export function sumVectorArray(vectors: Vec2[]) {
	const LENGTH = vectors.length - 1;
	const endResult = new Vec2();

	for (let i = 0; i < LENGTH; i++) {
		endResult.x += vectors[i].x;
		endResult.y += vectors[i].y;
	}

	return endResult;
}

export function substrVectors(a: Vec2, b: Vec2) {
	return new Vec2(a.x - b.x, a.y - b.y);
}

export function substrVectorArray(vectors: Vec2[]) {
	const LENGTH = vectors.length - 1;
	const endResult = new Vec2();

	for (let i = 0; i < LENGTH; i++) {
		endResult.x -= vectors[i].x;
		endResult.y -= vectors[i].y;
	}

	return endResult;
}

export function getNegateVector(vector: Vec2) {
	return new Vec2(-Math.abs(vector.x), -Math.abs(vector.y));
}

export function getScaledVector(vector: Vec2, scalar: number) {
	return new Vec2(vector.x * scalar, vector.y * scalar);
}

export function getDividedVector(vector: Vec2, divisor: number) {
	return new Vec2(vector.x / divisor, vector.y / divisor);
}

export function getVectorLength(vector: Vec2) {
	return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

export function deepFloatCmp(a: number, b: number) {
	let threshold = 1.0 / 8192.0;
	return Math.abs(a - b) < threshold;
}

export function getUnitVector(vector: Vec2) {
	const LENGTH = getVectorLength(vector);

	if (0 < LENGTH) {
		return getDividedVector(vector, LENGTH);
	}

	return vector;
}

const NULL_VECTOR = new Vec2(0, 0);
Object.freeze(NULL_VECTOR);

export * as Maths from './Maths';
