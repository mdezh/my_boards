import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="state"
export default class StateController extends Controller {
  static values = {
    object: { type: Object, default: {} },
  };

  connect() {
    this.addActions();
    this.fireState();
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
    const event = new CustomEvent(this.element.id, {
      detail: { ...this.objectValue },
    });
    window.dispatchEvent(event);
  }

  setState(e) {
    this.objectValue = {
      ...this.objectValue,
      ...e.detail,
    };

    // fire event manually instead of valueChanged() calling since we want guarantee to fire event even when the state remains the same
    this.fireState();
  }
}
