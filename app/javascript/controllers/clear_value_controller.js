import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="clear-value"
export default class extends Controller {
  clear() {
    this.element.value = "";
  }
}
