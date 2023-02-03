import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="set-state"
export default class extends Controller {
  static values = {
    object: Object,
    id: String,
  };

  connect() {
    window.dispatch(
      new CustomEvent(`set_${this.idValue}`, {
        detail: { ...this.objectValue },
      })
    );
  }
}
