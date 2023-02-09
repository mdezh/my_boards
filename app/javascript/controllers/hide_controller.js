import { Controller } from "@hotwired/stimulus";
import Show from "controllers/show_controller";

// Connects to data-controller="hide"
export default class extends Show {
  _check() {
    return !super._check();
  }
}
