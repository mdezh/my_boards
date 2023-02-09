import StateController from "controllers/state_controller";

// Connects to data-controller="state-counter"
export default class extends StateController {
  static targets = ["item"];
  static values = {
    ...super.values,
    init: { type: Number, default: 0 },
  };

  initialize() {
    super.initialize();
    if (typeof this.objectValue.state != "number") {
      throw Error(`Wrong initial value for counter: ${this.initValue}`);
    }
  }

  itemTargetConnected() {
    this._updateState(this.objectValue.state + 1);
  }

  itemTargetDisconnected() {
    this._updateState(this.objectValue.state - 1);
  }
}
