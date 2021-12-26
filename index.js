import blink from "./modules/blink.js";
import tailTwitch from "./modules/tail-twitch.js";
import "./modules/eye-follow.js";

randomBlink();
randomTailTwitch();

function randomBlink() {
  const delay = -Math.log(Math.random()) * 15000;
  setTimeout(() => {
    blink.requestAnimationStart();
    randomBlink();
  }, delay);
}

function randomTailTwitch() {
  const delay = -Math.log(Math.random()) * 15000;
  setTimeout(() => {
    tailTwitch.requestAnimationStart();
    randomTailTwitch();
  }, delay);
}