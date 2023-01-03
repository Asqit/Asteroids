export interface IEntity {
	x: number;
	y: number;
	w: number;
	h: number;
	speed: number;
	angle: number;
	active: boolean;
	update: () => void;
	render: () => void;
}
