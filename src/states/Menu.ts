import { gameConfig } from "../config";
import { Particle } from "../entities/Particle";
import { rand } from "../utils/Maths";
import { IState } from "./IState";
import MainMenu from "../components/menu/Menu";
import { play } from "./Play";

class Menu implements IState {
  public onEnter() {
    const { entities, width, height } = gameConfig;

    for (let i = 0; i < 75; i++) {
      entities.push(new Particle({ x: rand(0, width), y: rand(0, height) }));
    }

    this.renderHtml();
  }

  public render() {
    const { entities } = gameConfig;

    entities.forEach((entity) => {
      entity.render();
    });
  }

  private handlePlay() {
    gameConfig.stateStack.pop();
    gameConfig.stateStack.push(play);
  }

  private handleHighScore() {}

  private renderHtml() {
    MainMenu({
      onPlay: this.handlePlay,
      onHighScore: this.handleHighScore,
    })(document.body);
  }

  public update() {}

  public onExit() {
    gameConfig.entities.length = 0;
    document.querySelector(".main-menu")?.remove();
  }
}

export const menu = new Menu();
