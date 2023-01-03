import { GameObject } from '../config';

export interface IEntity {
	x: number;
	y: number;
	w: number;
	h: number;
	speed: number;
	angle: number;
	active: boolean;
	id: GameObject;
	update: () => void;
	render: () => void;
}
