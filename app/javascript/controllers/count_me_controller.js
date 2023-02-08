import { Controller } from "@hotwired/stimulus";
import { fire } from "helpers";

// Connects to data-controller="count-me"
export default class extends Controller {
  static values = {
    counter: String,
  };

  connect() {
    fire(`inc_${this.counterValue}`);
  }

  disconnect() {
    fire(`dec_${this.counterValue}`);
  }
}
