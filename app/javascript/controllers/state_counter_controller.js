import StateController from "./state_controller";

// Connects to data-controller="state-counter"
export default class extends StateController {
  static values = {
    object: { type: Object, default: { counter: 0 } },
  };

  addActions() {
    super.addActions();
    this.element.dataset.action = [
      this.element.dataset.action,
      `inc_${this.element.id}@window->${this.identifier}#incCounter`,
      `dec_${this.element.id}@window->${this.identifier}#decCounter`,
    ]
      .join(" ")
      .trim();
  }

  incCounter() {
    this.objectValue = { counter: this.objectValue.counter + 1 };
  }

  decCounter() {
    this.objectValue = { counter: this.objectValue.counter - 1 };
  }
}
