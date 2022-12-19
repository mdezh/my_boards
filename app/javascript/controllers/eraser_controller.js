import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="eraser"
export default class extends Controller {
  static values = {
    selector: String,
    prevent: Boolean,
  };

  erase(event) {
    this.preventValue && event.preventDefault();
    const elements = document.querySelectorAll(this.selectorValue);
    elements && elements.forEach((element) => element.remove());
  }
}
