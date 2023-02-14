import CheckStateController from "controllers/check_state_controller";

// Connects to data-controller="show-state"
export default class extends CheckStateController {
  _onCheckResultChange(checkResult) {
    this.element.innerText = checkResult;
  }
}
