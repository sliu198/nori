import blink from "./modules/blink.js";
import tailTwitch from "./modules/tail-twitch.js";
import {requestHeart} from "./modules/hearts.js";
import "./modules/eye-follow.js";
import TouchMoveAdapter from "./modules/touch-move-adapter.js";

randomBlink();
randomTailTwitch();
headPat();

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

function headPat() {
  let nextHeart = -Math.log(Math.random()) * 5000;
  let lastMovedAt = 0;
  new TouchMoveAdapter(function({y, pageX, pageY}) {
    if (y > 104) return;

    const now = performance.now()
    const tDiff = now - lastMovedAt;
    lastMovedAt = now;
    if (tDiff > 500) return;

    nextHeart -= tDiff;
    while (nextHeart <= 0) {
      requestHeart(pageX, pageY);
      blink.requestAnimationStart();
      nextHeart = -Math.log(Math.random()) * 5000;
    }
    console.log(nextHeart);
  }).attach(document.getElementById('face'));
}