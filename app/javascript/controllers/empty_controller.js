import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="empty"
export default class extends Controller {
  static values = {
    counter: { type: Number, default: 0 },
  };
  static targets = ["item", "indicator"];
  static classes = ["hidden"];

  itemTargetConnected() {
    this.counterValue++;
  }

  itemTargetDisconnected() {
    this.counterValue--;
  }

  counterValueChanged(next, prev) {
    if (next > 0 && prev < 1) {
      this.indicatorTarget.classList.add(...this.hiddenClasses);
    } else if (next < 1 && prev > 0) {
      this.indicatorTarget.classList.remove(...this.hiddenClasses);
    }
  }
}
