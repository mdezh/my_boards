import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="state"
export default class extends Controller {
  static values = {
    object: { type: Object, default: {} },
  };

  connect() {
    this.element.dataset.action = [
      ...(this.element.dataset.action ?? "").split(" ").filter(Boolean),
      `fire_${this.element.id}@window->state#fireState`,
    ].join(" ");
  }

  objectValueChanged() {
    this.fireState();
  }

  fireState() {
    const event = new CustomEvent(this.element.id, {
      detail: { ...this.objectValue },
    });
    window.dispatchEvent(event);
  }
}
