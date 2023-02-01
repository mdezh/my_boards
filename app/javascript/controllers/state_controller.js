import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="state"
export default class extends Controller {
  static values = {
    object: { type: Object, default: {} },
  };

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
