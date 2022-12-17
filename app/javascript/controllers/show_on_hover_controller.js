import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="show-on-hover"
export default class extends Controller {
  static targets = ["hidden"];

  show() {
    this.hiddenTarget.hidden = false;
  }

  hide() {
    this.hiddenTarget.hidden = true;
  }
}
