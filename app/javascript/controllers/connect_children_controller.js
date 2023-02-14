import CheckStateController from "controllers/check_state_controller";

// Connects to data-controller="connect-children"
export default class extends CheckStateController {
  connect() {
    this.store = [];
    super.connect();
  }

  _onCheckResultChange(checkResult) {
    if (checkResult) {
      this._restoreChildren();
    } else {
      this._removeChildren();
    }
  }

  _removeChildren() {
    if (this.store.length == 0) {
      let child;
      while ((child = this.element.lastChild)) {
        this.store.push(this.element.removeChild(child));
      }
    }
  }

  _restoreChildren() {
    while (this.store.length > 0) {
      this.element.appendChild(this.store.pop());
    }
  }
}
