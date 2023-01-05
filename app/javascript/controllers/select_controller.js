import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="select"
export default class extends Controller {
  static outlets = ["active"];

  select({ params }) {
    this.activeOutlet.activeValue = params.id;
  }
}
