/**
 * ### Frame class
 * This is a wrapper class. It allows you to not directly manipulate with `HTMLCanvasElement`
 * You can use it to create a new canvas or manipulate already existing one.
 */
class Frame {
	private width: number;
	private height: number;
	private backgroundColor: string;
	private id: number | string;
	private canvas: HTMLCanvasElement;
	private destination: HTMLElement;
	private context: RenderingContext | null;

	constructor(width?: number, height?: number, backgroundColor?: string) {
		this.width = width ?? innerWidth;
		this.height = height ?? innerHeight;
		this.backgroundColor = backgroundColor ?? '#000000';
		this.id = Date.now();
		this.canvas = document.createElement('canvas');
		this.destination = document.body;
		this.context = null;

		// Assigning attributes to canvas
		this.canvas.id = String(this.id);
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.backgroundColor = this.backgroundColor;
		this.canvas.innerHTML = `
            <h2>Unsuported browser</h2>
            <p>
                Sorry, but your current browser won't do anymore. 
                Either you upgrade your browser or just leave.
            </p>
            <a href="https://www.mozilla.org/en-US/firefox/new/">Browser upgrade</a>
        `;
	}

	/**
	 * **Description:** This method will insert your canvas into HTML body or your own destination
	 */
	public create(destination?: HTMLElement): void {
		if (!destination) {
			this.destination.appendChild(this.canvas);
			return;
		}

		this.destination = destination;
		this.destination.appendChild(this.canvas);
	}

	/**
	 * **Description:** This method will remove current canvas from HTML.
	 */
	public remove(): void {
		this.destination.removeChild(this.canvas);
	}

	public resize(width: number, height: number): void {
		this.width = width;
		this.height = height;

		this.canvas.width = width;
		this.canvas.height = height;
	}

	public static createInstance(canvas: HTMLCanvasElement): Frame {
		let tmp = new Frame(
			canvas.width,
			canvas.height,
			canvas.style.backgroundColor
		);

		tmp.setDestination = canvas.parentElement!;

		return tmp;
	}

	///// Getters & Setters /////
	public get getWidth() {
		return this.width;
	}

	public get getHeight() {
		return this.height;
	}

	public get getBackgroundColor() {
		return this.backgroundColor;
	}

	public get getId() {
		return this.id;
	}

	public get getCanvas() {
		return this.canvas;
	}

	public get getDestination() {
		return this.destination;
	}

	public get getRenderingContext() {
		return this.context;
	}

	public set setWidth(width: number) {
		this.width = width;
		this.canvas.width = width;
	}

	public set setHeight(height: number) {
		this.height = height;
		this.canvas.height = height;
	}

	public set setBackgroundColor(backgroundColor: string) {
		this.backgroundColor = backgroundColor;
		this.canvas.style.backgroundColor = backgroundColor;
	}

	public set setId(id: string | number) {
		this.id = id;
		this.canvas.id = String(id);
	}

	public set setCanvas(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
	}

	public set setDestination(destination: HTMLElement) {
		this.destination = destination;
	}

	public setRenderingContext(variant: string, options?: any) {
		this.context = this.canvas.getContext(variant, options);
	}
}

export { Frame };
