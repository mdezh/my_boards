import { Controller } from "@hotwired/stimulus";

export default class UseStateController extends Controller {
  static outlets = ["state"];
  static values = {
    hiddenClass: { type: String, default: "hidden" },
  };

  connect() {
    const actions = this.stateOutlets.map(
      (outlet) => `${outlet.element.id}@window->${this.identifier}#refresh`
    );
    this.element.dataset.action = [
      ...(this.element.dataset.action ?? "").split(" ").filter(Boolean),
      ...actions,
    ].join(" ");

    const states = this.stateOutlets.map((outlet) => outlet.objectValue);
    this.state = states.reduce((acc, state) => Object.assign(acc, state), {});
    this.updateWithState();
  }

  refresh(e) {
    this.state = Object.assign(this.state, e.detail);
    this.updateWithState();
  }

  updateWithState() {
    console.error("Not implemented!");
  }
}

export { UseStateController };
