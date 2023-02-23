import { asteroids } from "./game";
import { menu } from "./states/Menu";

function main() {
  try {
    asteroids.init(menu);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    alert(err.message);
  }
}

window.addEventListener("load", main);
