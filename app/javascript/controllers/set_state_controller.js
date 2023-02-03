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
    window.dispatchEvent(
      new CustomEvent(`set_${this.idValue}`, {
        detail: { ...this.objectValue },
      })
    );
  }
}
