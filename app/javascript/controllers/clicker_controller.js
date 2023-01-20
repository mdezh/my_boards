import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="click-elements"
export default class extends Controller {
  static values = {
    submit: String,
    cancel: String,
    selector: String,
    prevent: { type: Boolean, default: false },
  };

  click(e) {
    this.preventValue && e.preventDefault();
    const elements = document.querySelectorAll(this.selectorValue);
    elements && elements.forEach((element) => element.click());
  }

  submit(e) {
    e.preventDefault();
    document.querySelector("#" + this.submitValue)?.click();
  }

  cancel(e) {
    e.preventDefault();
    document.querySelector("#" + this.cancelValue)?.click();
  }
}
