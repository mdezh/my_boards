import StateController from "controllers/state_controller";
import { fire } from "helpers";

// Connects to data-controller="state-counter"
export default class extends StateController {
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

  connect() {
    fire(`${this.element.id}_count`);
  }

  incCounter() {
    this._updateState(this.objectValue.state + 1);
  }

  decCounter() {
    this._updateState(this.objectValue.state - 1);
  }

  _getNewActions() {
    return [
      ...super._getNewActions(),
      `inc_${this.element.id}@window->${this.identifier}#incCounter`,
      `dec_${this.element.id}@window->${this.identifier}#decCounter`,
    ];
  }
}
