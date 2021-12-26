import AnimationCoordinator from "./animation-coordinator.js";

export default new AnimationCoordinator(step);

function step(timestamp) {
  const progress = timestamp / 1000;
  let scale, translate;

  if (progress <= 0 || progress >= 1) {
    scale = 1;
    translate = 0;
  } else if (progress < 0.25) {
    scale = 1 - 8 * Math.pow(progress, 2);
    translate = 104 * (1 - scale);
  } else if (progress < 0.75) {
    scale = 8 * Math.pow(progress - 0.5, 2);
    translate = 104 * (1 - scale);
  } else {
    scale = 1 - 8 * Math.pow(progress - 1, 2);
    translate = 104 * (1 - scale);
  }

  if (scale === 0) scale = 0.001;

  document.querySelector(
    "#eyes"
  ).style.transform = `matrix(1,0,0,${scale},0,${translate})`;

  return progress >= 1;
}