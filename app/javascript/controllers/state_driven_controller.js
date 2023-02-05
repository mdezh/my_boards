import UseStateController from "../base_classes/use_state_controller";

// Connects to data-controller="state-driven"
export default class extends UseStateController {
  static values = {
    ...super.values,
    key: { type: String, default: "counter" }, // for state-counter controller
    not: { type: Boolean, default: false },
    eql: String,
    keys: Array, // array of state keys for checkFunction, possible with !: ["a", "b", "!c"]
    and: { type: Boolean, default: false }, // use && instead of default || to combine state values
  };

  connect() {
    this.combinedFunction = this.buildFunction();
    super.connect();
  }

  buildFunction() {
    const keys = this.hasKeysValue ? this.keysValue : [this.keyValue];
    const operands = keys.map((key) => {
      if (key.startsWith("!")) {
        key = key.slice(1);
        return (state) => !state[key];
      }
      return (state) => state[key];
    });
    const reducedFunction = this.andValue
      ? (state) => operands.reduce((acc, f) => acc && f(state), true)
      : (state) => operands.reduce((acc, f) => acc || f(state), false);
    const expectation = this.hasEqlValue ? this.eqlValue : true;
    return this.notValue
      ? (state) => reducedFunction(state) != expectation
      : (state) => reducedFunction(state) == expectation;
  }

  checkFunction() {
    return this.combinedFunction(this.state);
  }
}
