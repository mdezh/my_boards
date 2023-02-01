import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="delete-board"
export default class extends Controller {
  static outlets = ["state"];
  static values = {
    hiddenClass: { type: String, default: "hidden" },
  };

  connect() {
    const state = this.stateOutlet.objectValue;
    this.updateWithState(state);
  }

  refresh(e) {
    const state = e.detail;
    this.updateWithState(state);
  }

  updateWithState(state) {
    if (state.owned) {
      this.element.classList.remove(this.hiddenClassValue);
    } else {
      this.element.classList.add(this.hiddenClassValue);
    }
  }
}
