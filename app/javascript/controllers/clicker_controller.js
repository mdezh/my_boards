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
    document.getElementById(this.submitValue)?.click();
  }

  cancel(e) {
    // sometimes we get here unsuspected events
    if (!e.cancelable) return;

    e.preventDefault();
    document.getElementById(this.cancelValue)?.click();
  }
}
