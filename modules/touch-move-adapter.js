/**
 * A module for adapting touch events to mouse move events
 */

export default class TouchMoveAdapter {
  constructor(eventListener) {
    this.activeTouchId = null;
    this.eventListener = eventListener;
  }

  attach(target) {
    target.addEventListener('mousemove', this.eventListener.bind(this));

    target.addEventListener("touchstart", this.handleTouchMove.bind(this));
    target.addEventListener("touchmove", this.handleTouchMove.bind(this));
    target.addEventListener("touchend", this.handleTouchEnd.bind(this));
    target.addEventListener("touchcancel", this.handleTouchEnd.bind(this));
  }

  handleTouchMove(event) {
    event.preventDefault();
    const {targetTouches} = event;
    if (!this.activeTouchId) {
      this.activeTouchId = targetTouches[0].identifier;
    }
    const activeTouch = [...targetTouches].find(
      (touch) => touch.identifier === this.activeTouchId
    );

    return this.eventListener(activeTouch);
  }

  handleTouchEnd(event) {
    event.preventDefault();
    this.activeTouchId = null;
  }
}