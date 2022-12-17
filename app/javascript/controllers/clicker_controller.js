import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="click-elements"
export default class extends Controller {
  static values = {
    selector: String,
  };

  click() {
    const elements = document.querySelectorAll(this.selectorValue);
    elements && elements.forEach((element) => element.click());
  }
}
