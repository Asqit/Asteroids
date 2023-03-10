import { GameObject, gameConfig } from "../config";
import { createAudio } from "../utils/audio";
import { isDown } from "../utils/Input";
import { Vec2 } from "../utils/Maths";
import { delta } from "../utils/Perf";
import { Bullet } from "./Bullet";
import { IEntity } from "./IEntity";

interface IPlayer extends IEntity {}

interface IPlayerSave {
  highScore: number;
}

class Player implements IPlayer {
  public x: number = 0;
  public y: number = 0;
  public w: number = 32;
  public h: number = 32;
  public speed: number = 400;
  public angle: number = 0;
  public active: boolean = true;
  public id: GameObject = "PLAYER";

  /**
   * Implemented physics system from [this](https://codepen.io/OliverBalfour/pen/jqympW) page
   */
  private velocity: Vec2 = new Vec2(0, 0);
  private acceleration: Vec2 = new Vec2(0, 0);
  private friction: number = 0.99;

  private score: number = 0;
  private highScore: number = 0;
  private lives: number = 3;
  private cooldown: number = 0;
  private cooldownDecrement: number = 3;
  private hitPrepared: boolean = true;
  private shootSound: HTMLAudioElement = createAudio(
    "./assets/sfx/laserShoot.wav",
    {}
  );

  // Private Methods --------------------------------------
  private renderUi() {
    const ctx = gameConfig.ctx as CanvasRenderingContext2D;
    ctx.font = "20px monospace";
    ctx.fillStyle = "#fff";
    ctx.fillText(`score: ${this.score}`, 30, 30);
    ctx.fillText(`lives: ${this.lives}`, 30, 60);
  }

  private renderPlayer() {
    const ctx = gameConfig.ctx as CanvasRenderingContext2D;

    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(this.angle);

    let x = -this.w / 2;
    let y = -this.h / 2;

    // Player triangle
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + this.w, y + this.h / 2);
    ctx.lineTo(x, y + this.h);
    ctx.moveTo(x + this.w / 2, y + this.h / 2);
    ctx.lineTo(x, y);
    ctx.moveTo(x + this.w / 2, y + this.h / 2);
    ctx.lineTo(x, y + this.h);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  private shoot() {
    if (this.cooldown <= 0) {
      let x = this.x + this.w / 2;
      let y = this.y + this.h / 2;

      // Create a new bullet and bit of particles
      gameConfig.entities.push(new Bullet("PLAYER", x, y, this.angle));

      this.shootSound.play();

      this.cooldown = 100;
    }
  }

  private handleMovement() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    this.x += this.velocity.x * delta;
    this.y += this.velocity.y * delta;
  }

  private handleInput() {
    // Moving player
    if (isDown("W") || isDown("K")) {
      this.acceleration.x = this.speed * Math.cos(this.angle) * delta;
      this.acceleration.y = this.speed * Math.sin(this.angle) * delta;
    } else {
      this.acceleration.x = this.acceleration.y = 0;
    }

    // Rotating player
    if (isDown("A") || isDown("H")) {
      this.angle -= 3 * delta;
    } else if (isDown("D") || isDown("L")) {
      this.angle += 3 * delta;
    }

    // Shooting
    if (isDown("SPACE")) {
      this.shoot();
    }
  }

  private handleScreenBorders() {
    const { width, height } = gameConfig;

    switch (true) {
      case this.x < 0:
        this.x = width - this.w;
        break;
      case this.x > width:
        this.x = 0;
        break;
      case this.y < 0:
        this.y = height - this.h;
        break;
      case this.y + this.h > height:
        this.y = this.h;
        break;
    }
  }

  private handleCooldown() {
    if (this.cooldown > 0) {
      this.cooldown -= this.cooldownDecrement;
    }
  }

  private handleSave() {
    const SAVE_NAME = "asteroids/player";

    if (!localStorage.getItem(SAVE_NAME)) {
      const payload: IPlayerSave = {
        highScore: this.score,
      };

      localStorage.setItem(SAVE_NAME, JSON.stringify(payload));
    }

    const payload: IPlayerSave = JSON.parse(localStorage.getItem(SAVE_NAME)!);

    payload.highScore =
      this.score > payload.highScore ? this.score : payload.highScore;

    localStorage.setItem(SAVE_NAME, JSON.stringify(payload));
  }

  private handleLoad() {
    if (!localStorage.getItem("asteroids/player")) {
      console.warn("No user save");
      return;
    }

    const payload: IPlayerSave = JSON.parse(
      localStorage.getItem("asteroids/player")!
    );

    this.highScore = payload.highScore;
  }

  // Public Methods ---------------------------------------
  public update() {
    this.handleScreenBorders();
    this.handleInput();
    this.handleMovement();
    this.handleCooldown();
  }

  public render() {
    this.renderPlayer();
    this.renderUi();
  }

  public hit() {
    if (this.hitPrepared) {
      if (this.lives <= 1) {
        this.handleSave();
        this.active = false;
      }

      this.lives -= 1;
      this.hitPrepared = false;
    }

    setTimeout(() => (this.hitPrepared = true), 2000);
  }

  public isAlive() {
    return this.active;
  }

  public addScore() {
    this.score += 10;
  }

  public get getScore() {
    return this.score;
  }

  public get getHighScore() {
    return this.highScore;
  }

  public reset() {
    this.handleLoad();
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.active = true;
    this.lives = 3;
    this.velocity = new Vec2(0, 0);
    this.acceleration = new Vec2(0, 0);
    this.cooldown = 0;
    this.cooldownDecrement = 2.5;
    this.hitPrepared = true;
  }
}

/** **singleton** of class `Player` */
export const hero = new Player();
