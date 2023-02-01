import { Controller } from "@hotwired/stimulus";

export default class UseStateController extends Controller {
  static outlets = ["state"];
  static values = {
    hiddenClass: { type: String, default: "hidden" },
  };

  connect() {
    const stateOutletId = this.stateOutlet.element.id;
    this.element.dataset.action = [
      ...(this.element.dataset.action ?? "").split(" ").filter(Boolean),
      `${stateOutletId}@window->state-driven#refresh`,
    ].join(" ");
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
