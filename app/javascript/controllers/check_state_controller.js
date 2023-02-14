import UseStateController from "controllers/use_state_controller";

// Connects to data-controller="check-state"
export default class CheckStateController extends UseStateController {
  static values = {
    ...super.values,
    check: String,
  };

  initialize() {
    super.initialize();

    if (!this.hasCheckValue) {
      this.checkValue = this.useValue.split(" ").join(" && ");
    }
  }

  _onCheckResultChange(_checkResult) { }

  _updateWithState(state) {
    const checkResult = this._check(state);
    if (checkResult === this.prevCheckResult) return;

    this._onCheckResultChange(checkResult);

    this.prevCheckResult = checkResult;
  }

  _check(state) {
    if (!this.checkFunction) {
      this.checkFunction = this._buildCheckFunction(state);
    }

    return this.checkFunction(state);
  }

  _buildCheckFunction(state) {
    const keys = (stateObj) => "{ " + Object.keys(stateObj).join(", ") + " }";

    return new Function(
      "state",
      `const ${keys(state)} = state; return ${this.checkValue};`
    );
  }
}
