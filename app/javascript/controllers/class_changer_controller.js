import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="class-changer"
export default class extends Controller {
  static values = {
    selector: String,
    class: String,
  };

  _applyToElems(fn) {
    document.querySelectorAll(this.selectorValue).forEach(fn);
  }

  add() {
    this._applyToElems((elem) => elem.classList.add(this.classValue));
  }

  remove() {
    this._applyToElems((elem) => elem.classList.remove(this.classValue));
  }

  toggle() {
    this._applyToElems((elem) => elem.classList.toggle(this.classValue));
  }
}
