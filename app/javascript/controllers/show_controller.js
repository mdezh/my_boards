import UseStateController from "controllers/use_state_controller";

// Connects to data-controller="show"
export default class Show extends UseStateController {
  static classes = ["shown", "hidden"];
  static values = {
    ...super.values,
    check: String,
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

    if (!this.hasCheckValue) {
      this.checkValue = this.useValue
        .map((state) => String(state))
        .join(" && ");
    }
  }

  _updateWithState() {
    const checkResult = this._check();
    if (checkResult === this.prevCheckResult) return;

    if (checkResult) {
      this._showHide(this.elements, this.oppositeElements);
    } else {
      this._showHide(this.oppositeElements, this.elements);
    }

    this.prevCheckResult = checkResult;
  }

  _check() {
    if (!this.checkFunction) this._buildCheckFunction();

    return this.checkFunction(this.state);
  }

  _buildCheckFunction() {
    const keys = (state) => "{ " + Object.keys(state).join(", ") + " }";

    this.checkFunction = new Function(
      "state",
      `const ${keys(this.state)} = state; return ${this.checkValue};`
    );
  }

  _showHide(elementsToShow, elementsToHide) {
    elementsToShow.forEach((elem) => {
      elem.classList.add(...this.classesToShow);
      elem.classList.remove(...this.classesToHide);
    });
    elementsToHide.forEach((elem) => {
      elem.classList.add(...this.classesToHide);
      elem.classList.remove(...this.classesToShow);
    });
  }
}
