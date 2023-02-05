import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="set-state"
export default class extends Controller {
  static values = {
    object: Object,
    id: String,
    onConnect: { type: Boolean, default: false },
  };

  connect() {
    if (this.onConnectValue) {
      this.fire();
    }
  }

  fire() {
    this.createEvents().forEach((event) => window.dispatchEvent(event));
  }

  createEvents() {
    if (this.hasIdValue) {
      return [
        new CustomEvent(`set_${this.idValue}`, {
          detail: { ...this.objectValue },
        }),
      ];
    }

    return Object.keys(this.objectValue).map(
      (key) =>
        new CustomEvent(`set_${key}`, {
          detail: { ...this.objectValue[key] },
        })
    );
  }
}
