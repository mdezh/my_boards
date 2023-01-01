import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="scroll-into-view"
export default class extends Controller {
  connect() {
    this.element.scrollIntoView();
  }
}
