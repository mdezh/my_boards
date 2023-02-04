import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="count-me"
export default class extends Controller {
  static values = {
    counter: String,
  };

  connect() {
    this.fireEvent(`inc_${this.counterValue}`);
  }

  disconnect() {
    this.fireEvent(`dec_${this.counterValue}`);
  }

  fireEvent(name) {
    window.dispatchEvent(new CustomEvent(name, {}));
  }
}
