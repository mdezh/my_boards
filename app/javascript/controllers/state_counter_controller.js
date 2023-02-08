import StateController from "controllers/state_controller";

// Connects to data-controller="state-counter"
export default class extends StateController {
  static values = {
    ...super.values,
    init: { type: Number, default: 0 },
  };

  connect() {
    super.connect();
    if (typeof this.objectValue.state != "number") {
      throw Error(`Wrong initial value for counter: ${this.initValue}`);
    }
  }

  incCounter() {
    this._updateState(this.objectValue.state + 1);
  }

  decCounter() {
    this._updateState(this.objectValue.state - 1);
  }

  _addActions() {
    super._addActions();
    this.element.dataset.action = [
      this.element.dataset.action,
      `inc_${this.element.id}@window->${this.identifier}#incCounter`,
      `dec_${this.element.id}@window->${this.identifier}#decCounter`,
    ]
      .join(" ")
      .trim();
  }
}
