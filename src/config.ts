import { IEntity } from "./entities/IEntity";
import { createAudio } from "./utils/audio";
import { Frame } from "./utils/Frame";
import { StateStack } from "./utils/StateStack";

export type GameObject =
  | "PLAYER"
  | "BULLET"
  | "ALIEN"
  | "ASTEROID"
  | "PARTICLE";

interface IGameConfig {
  frame: Frame;
  ctx: RenderingContext;
  stateStack: StateStack;
  id: number;
  width: number;
  height: number;
  entities: IEntity[];
  explosion: HTMLAudioElement;
}

// Preparing properties
const WIDTH = innerWidth;
const HEIGHT = innerHeight;
const stateStack = new StateStack();
const frame = new Frame(WIDTH, HEIGHT);

frame.setRenderingContext("2d");

const ctx = frame.getRenderingContext!;
const entities: IEntity[] = [];
const explosion = createAudio("./assets/sfx/explosion.wav", {});

/**
 * **Description:** Since objects are passed by reference I created this object which basically allows access
 * to some global variables. It's very similar to react's context API, only that this is simpler and does not involve
 * Subscriber/notifier pattern.
 */
export const gameConfig: IGameConfig = {
  stateStack,
  frame,
  ctx,
  width: WIDTH,
  height: HEIGHT,
  id: 0,
  entities,
  explosion,
};
