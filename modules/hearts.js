import randomNorm from "./normal-distribution.js";

const hearts = new Map();

export function requestHeart(x, y) {
  const newHeart = new Image(40, 30);
  newHeart.src = '../heart.svg';
  const createdAt = performance.now();
  const left = x - 20;
  const top = y - 30;
  hearts.set(newHeart, {left, top, createdAt, updatedAt: createdAt});
  Object.assign(newHeart.style, {
    left: `${left}px`,
    top: `${top}px`,
    position: 'absolute',
  });
  document.body.appendChild(newHeart);
  requestAnimationFrame(updateHearts);
}

function updateHearts(now) {
  for (const [heart, props] of hearts) {
    const {createdAt, updatedAt} = props;
    let opacity = 1 - (now - createdAt) / 1000;
    if (opacity > 1) opacity = 1;

    if (opacity < 0) {
      document.body.removeChild(heart);
      hearts.delete(heart);
    } else {
      let diff = now - updatedAt;
      if (diff < 0) diff = 0;

      const steps = diff / 10;
      props.top -= steps
      props.left += randomNorm() * Math.sqrt(steps);
      Object.assign(heart.style, {
        opacity,
        top: `${props.top}px`,
        left: `${props.left}px`
      });
      props.updatedAt = now;
    }
  }

  if (hearts.size) {
    requestAnimationFrame(updateHearts);
  }
}