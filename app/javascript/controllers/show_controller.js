import CheckStateController from "controllers/check_state_controller";

// Connects to data-controller="show"
export default class ShowController extends CheckStateController {
  static classes = ["shown", "hidden"];
  static values = {
    ...super.values,
    selector: String,
    oppositeSelector: String,
  };

  initialize() {
    super.initialize();

    this.classesToShow = this.hasShownClass ? this.shownClasses : [];
    this.classesToHide = this.hasHiddenClass ? this.hiddenClasses : ["hidden"];

    this.elements = this.hasSelectorValue
      ? Array.from(document.querySelectorAll(this.selectorValue))
      : [this.element];
    this.oppositeElements = this.hasOppositeSelectorValue
      ? Array.from(document.querySelectorAll(this.oppositeSelectorValue))
      : [];
  }

  _onCheckResultChange(checkResult) {
    if (checkResult) {
      this._showHide(this.elements, this.oppositeElements);
    } else {
      this._showHide(this.oppositeElements, this.elements);
    }
  }

  _showHide(elementsToShow, elementsToHide) {
    window.requestAnimationFrame(() => {
      elementsToShow.forEach((elem) => {
        elem.classList.add(...this.classesToShow);
        elem.classList.remove(...this.classesToHide);
      });
      elementsToHide.forEach((elem) => {
        elem.classList.add(...this.classesToHide);
        elem.classList.remove(...this.classesToShow);
      });
    });
  }
}
