import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="clipboard"
export default class extends Controller {
  copyLocation() {
    this._copyToClipboard(location.href);
  }

  _copyToClipboard(value) {
    navigator.clipboard?.writeText(value);
  }
}
