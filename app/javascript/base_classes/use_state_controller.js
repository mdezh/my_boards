import { Controller } from "@hotwired/stimulus";

export default class UseStateController extends Controller {
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

  updateWithState(_state) {
    console.error("Not implemented!");
  }
}

export { UseStateController };
