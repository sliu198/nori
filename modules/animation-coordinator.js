/**
 * Wrap an animation step function so that:
 * 1. a `requestAnimationStart` function is exposed to trigger the start of the animation.
 * 2. subsequent calls to `requestAnimationStart` have no effect until the animation is complete
 * 3. the step function receives a timestamp relative to the start of the animation
 */
export default class AnimationCoordinator {
  /**
   * @callback AnimationStep
   * @param {number} timestamp - number of ms since the beginning of the animation
   * @returns {boolean} - whether the animation has finished.
   */

  /**
   * @param {AnimationStep} step
   */
  constructor(step) {
    this.step = (timestamp) => {
      const isDone = step(timestamp - this.startTime);
      if (isDone) {
        this.startTime = null;
      } else {
        requestAnimationFrame(this.step);
      }
    };

    this.startTime = null;
  }

  requestAnimationStart() {
    if (this.startTime) {
      return;
    }

    this.startTime = performance.now();
    requestAnimationFrame(this.step);
  }
}