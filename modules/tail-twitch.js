import AnimationCoordinator from "./animation-coordinator.js";

const TAIL_FRAMES = [
  "m 280,350 c 0.78135,14.88663 -40,20 -40,20",
  "m 280,350 c 0.78135,14.88663 -35,5 -30,-10",
];

export default new AnimationCoordinator(step);

function step(timestamp) {
  const progress = timestamp / 500;
  let path;

  if (progress <= 0 || progress >= 1) {
    path = TAIL_FRAMES[0];
  } else if (progress < 10 / 17) {
    const t = (progress * 17) / 10;
    const x = t < 0.5 ? 2 * Math.pow(t, 2) : 1 - 2 * Math.pow(1 - t, 2);
    path = getIntermediateFrame(TAIL_FRAMES[0], TAIL_FRAMES[1], x);
  } else {
    const t = ((progress - 10 / 17) * 17) / 7;
    const x = Math.pow(t, 2);
    path = getIntermediateFrame(TAIL_FRAMES[1], TAIL_FRAMES[0], x);
  }

  document.querySelector("#tail-front").setAttribute("d", path);

  return progress >= 1;
}

function getIntermediateFrame(start, end, progress) {
  const startElements = start.split(" ");
  const endElements = end.split(" ");

  return startElements
    .map((startElement, index) => {
      if (["m", "c"].includes(startElement)) return startElement;

      const [startX, startY] = startElement
        .split(",")
        .map((e) => Number(e));
      const [endX, endY] = endElements[index]
        .split(",")
        .map((e) => Number(e));

      return [
        startX + (endX - startX) * progress,
        startY + (endY - startY) * progress,
      ].join(",");
    })
    .join(" ");
}
