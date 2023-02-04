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

  objectValueChanged(_next, prev) {
    this.prevObject = { ...prev };
    this.fireState();
  }

  fireState() {
    const event = new CustomEvent(this.element.id, {
      detail: { ...this.objectValue, _previous: { ...this.prevObject } },
    });
    window.dispatchEvent(event);
  }

  setState(e) {
    this.objectValue = { ...this.objectValue, ...e.detail };
  }
}
