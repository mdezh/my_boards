import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="state"
export default class StateController extends Controller {
  static values = {
    object: { type: Object, default: {} },
  };

  connect() {
    this.addActions();
  }

  addActions() {
    this.element.dataset.action = [
      this.element.dataset.action,
      `fire_${this.element.id}@window->state#fireState`,
      `set_${this.element.id}@window->state#setState`,
    ]
      .join(" ")
      .trim();
  }

  fireState() {
    const value = { ...this.objectValue };
    delete value._trigger;
    const event = new CustomEvent(this.element.id, {
      detail: value,
    });
    window.dispatchEvent(event);
  }

  setState(e) {
    this.updateState(e.detail);
  }

  updateState(changes) {
    // use _trigger to guarantee event firing even when the state remains the same
    let _trigger = 1 + this.objectValue._trigger ?? 0;
    this.objectValue = {
      ...this.objectValue,
      ...changes,
      _trigger,
    };
  }

  objectValueChanged() {
    this.fireState();
  }
}
