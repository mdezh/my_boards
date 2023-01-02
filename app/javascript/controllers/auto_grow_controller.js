import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="auto-grow"
export default class extends Controller {
  connect() {
    this.grow();
  }

  grow() {
    this.element.style.height = this.element.scrollHeight + 2 + "px";
  }
}
