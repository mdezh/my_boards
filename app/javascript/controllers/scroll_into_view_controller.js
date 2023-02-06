import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="scroll-into-view"
export default class extends Controller {
  static values = {
    options: Object,
  };

  connect() {
    if (this.hasOptionsValue) {
      this.element.scrollIntoView(this.optionsValue);
    } else {
      this.element.scrollIntoView();
    }
  }
}
