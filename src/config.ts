import { IEntity } from './entities/IEntity';
import { Frame } from './utils/Frame';
import { StateStack } from './utils/StateStack';

export type GameObject =
	| 'PLAYER'
	| 'BULLET'
	| 'ALIEN'
	| 'ASTEROID'
	| 'PARTICLE';

interface IGameConfig {
	frame: Frame;
	ctx: RenderingContext;
	stateStack: StateStack;
	id: number;
	width: number;
	height: number;
	entities: IEntity[];
}

// Preparing properties
const WIDTH = innerWidth;
const HEIGHT = innerHeight;
const stateStack = new StateStack();
const frame = new Frame(WIDTH, HEIGHT);

frame.setRenderingContext('2d');

const ctx = frame.getRenderingContext!;
const entities: IEntity[] = [];

export const gameConfig: IGameConfig = {
	stateStack,
	frame,
	ctx,
	width: WIDTH,
	height: HEIGHT,
	id: 0,
	entities,
};
