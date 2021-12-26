import {requestBlink} from "./modules/blink.js";
import {requestTwitch} from "./modules/tail-twitch.js";
import "./modules/eye-follow.js";

randomBlink();
randomTailTwitch();

function randomBlink() {
  const delay = -Math.log(Math.random()) * 15000;
  setTimeout(() => {
    requestBlink();
    randomBlink();
  }, delay);
}

function randomTailTwitch() {
  const delay = -Math.log(Math.random()) * 15000;
  setTimeout(() => {
    requestTwitch();
    randomTailTwitch();
  }, delay);
}