const {
  x: X_MIN,
  y: Y_MIN,
  width: pupilsWidth,
  height: pupilsHeight,
} = document.querySelector("#pupils").getBBox();
const X_MAX = X_MIN + pupilsWidth;
const Y_MAX = Y_MIN + pupilsHeight;

const RETURN_DELAY = 2000;
const TRACKING_SPEED = 1 / 20;

let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
let lookUntil = 0;
let lastTimestamp = 0;
let activeTouchId = null;
const nori = document.querySelector("#nori");
nori.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  extendLook(clientX, clientY);
});
nori.addEventListener("touchstart", handleTouchMove);
nori.addEventListener("touchmove", handleTouchMove);
nori.addEventListener("touchend", handleTouchEnd);
nori.addEventListener("touchcancel", handleTouchEnd);

function handleTouchMove(event) {
  event.preventDefault();
  const { targetTouches } = event;
  if (!activeTouchId) {
    activeTouchId = targetTouches[0].identifier;
  }
  const activeTouch = [...targetTouches].find(
    (touch) => touch.identifier === activeTouchId
  );
  extendLook(activeTouch.clientX, activeTouch.clientY);
}

function handleTouchEnd(event) {
  event.preventDefault();
  activeTouchId = null;
}

// make nori look at a point expressed in viewport coordinates
function extendLook(clientX, clientY) {
  targetX = 0;
  targetY = 0;

  const { x, y, width, height } = nori.getBoundingClientRect();

  // transform from client coords to SVG coords
  const svgX = ((clientX - x) * nori.width.baseVal.value) / width;
  const svgY = ((clientY - y) * nori.height.baseVal.value) / height;

  if (svgX < X_MIN) {
    targetX = svgX - X_MIN;
  } else if (svgX > X_MAX) {
    targetX = svgX - X_MAX;
  }
  targetX = (targetX * 5) / 100;

  if (svgY < Y_MIN) {
    targetY = svgY - Y_MIN;
  } else if (svgY > Y_MAX) {
    targetY = svgY - Y_MAX;
  }
  targetY = (targetY * 5) / 100;

  const targetDist = dist(targetX, targetY);
  if (targetDist > 5) {
    targetX = (targetX * 5) / targetDist;
    targetY = (targetY * 5) / targetDist;
  }

  lookUntil = Date.now() + RETURN_DELAY;

  // start animation
  if (!lastTimestamp) {
    lastTimestamp = Date.now();
    requestAnimationFrame(lookStep);
  }
}

function lookStep() {
  const timestamp = Date.now();
  if (timestamp > lookUntil) {
    // stop animating if back to neutral
    if (currentX === 0 && currentY === 0) {
      lastTimestamp = 0;
      lookUntil = 0;
      return;
    }

    targetX = 0;
    targetY = 0;
    lastTimestamp = lookUntil;
  }

  // move a max of 1px / 20s
  const diffT = timestamp - lastTimestamp;
  const diffX = targetX - currentX;
  const diffY = targetY - currentY;
  const diff = dist(diffX, diffY);
  if (diff > diffT * TRACKING_SPEED) {
    currentX += (diffX * diffT * TRACKING_SPEED) / diff;
    currentY += (diffY * diffT * TRACKING_SPEED) / diff;
  } else {
    currentX = targetX;
    currentY = targetY;
  }

  document.querySelector(
    "#pupils"
  ).style.transform = `matrix(1,0,0,1,${currentX},${currentY})`;
  lastTimestamp = timestamp;
  requestAnimationFrame(lookStep);
}

function dist(dX, dY) {
  return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
}