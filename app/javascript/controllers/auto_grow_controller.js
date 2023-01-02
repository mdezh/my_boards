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
    const prevElement = this.prevValue
      ? document.querySelector(this.prevValue)
      : null;
    let oldHeight, oldTop;
    if (prevElement) {
      oldHeight = prevElement.clientHeight;
      oldTop = prevElement.scrollTop;
    }
    // next line is necessary for shrinking
    this.element.style.height = "";
    this.element.style.height = this.element.scrollHeight + 2 + "px";
    if (prevElement) {
      const deltaHeight = prevElement.clientHeight - oldHeight;
      prevElement.scrollTop = oldTop - deltaHeight;
    }
  }
}
