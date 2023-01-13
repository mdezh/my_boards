import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="timeout-clicker"
export default class extends Controller {
  static values = {
    timeout: { type: Number, default: 5000 },
  };
  static targets = ["btn"];

  connect() {
    if (!this.hasBtnTarget) return;

    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.btnTarget.click();
    }, this.timeoutValue);
  }

  disconnect() {
    this.clear();
  }

  btnTargetDisconnected() {
    this.clear();
    this.element.remove();
  }

  clear() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}
