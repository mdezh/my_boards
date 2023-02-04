import UseStateController from "../base_classes/use_state_controller";

// Connects to data-controller="state-driven"
export default class extends UseStateController {
  static values = {
    ...super.values,
    key: String,
    not: { type: Boolean, default: false },
    eql: { type: String, default: "" },
  };

  checkFunction() {
    const result =
      this.state[this.keyValue] == (this.eqlValue ? this.eqlValue : true);
    return this.notValue ? !result : result;
  }
}
