import { Rect } from './Maths';

interface ICamera {
	ctx: CanvasRenderingContext2D;
	w: number;
	h: number;
	sx: number;
	sy: number;
	source: Rect;
	beforeRender: () => void;
	afterRender: () => void;
}

interface ICameraProps {
	ctx: CanvasRenderingContext2D;
	w: number;
	h: number;
	sx: number;
	sy: number;
	source: Rect;
}

export class Camera implements ICamera {
	public ctx: CanvasRenderingContext2D;
	public w: number;
	public h: number;
	public sx: number;
	public sy: number;
	public source: Rect;

	constructor(props: ICameraProps) {
		const { ctx, w, h, sx, sy, source } = props;

		this.ctx = ctx;
		this.w = w;
		this.h = h;
		this.sx = sx;
		this.sy = sy;
		this.source = source;
	}

	public beforeRender() {
		this.ctx.save();
		this.ctx.translate(
			this.w / this.sx - this.source.x,
			this.h / this.sy - this.source.y
		);
	}

	public afterRender() {
		this.ctx.restore();
	}
}
