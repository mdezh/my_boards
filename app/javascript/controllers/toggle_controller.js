import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="toggle"
export default class extends Controller {
  static classes = ["manipulate"];
  static values = {
    selector: String,
  };

  toggle() {
    const elements = document.querySelectorAll(this.selectorValue);
    elements.forEach((element) =>
      element.classList.toggle(this.manipulateClasses)
    );
  }
}
