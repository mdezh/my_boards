import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="auto-grow"
export default class extends Controller {
  static values = {
    prev: String,
  };

  connect() {
    this.grow();
  }

  grow() {
    const oldHeight = this.element.clientHeight;
    this.element.style.height = this.element.scrollHeight + 2 + "px";
    const prevElement = this.prevValue
      ? document.querySelector(this.prevValue)
      : null;
    if (prevElement) {
      const deltaHeight = this.element.clientHeight - oldHeight;
      prevElement.scrollTop += deltaHeight;
    }
  }
}
