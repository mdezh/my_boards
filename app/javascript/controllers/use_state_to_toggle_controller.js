import UseStateController from "controllers/use_state_controller";

// Connects to data-controller="use-state-to-toggle"
export default class UseStateToToggleController extends UseStateController {
  static values = {
    ...super.values,
    hiddenClass: { type: String, default: "hidden" },
    primarySelector: { type: String, default: "" },
    secondarySelector: { type: String, default: "" },
  };

  connect() {
    this.primaryElements = this.primarySelectorValue
      ? document.querySelectorAll(this.primarySelectorValue)
      : [this.element];

    this.secondaryElements = this.secondarySelectorValue
      ? document.querySelectorAll(this.secondarySelectorValue)
      : undefined;

    super.connect();
  }

  checkFunction() {
    throw Error("Not implemented!");
  }

  updateWithState() {
    const checkResult = this.checkFunction();
    if (checkResult === this.prevCheckResult) return;

    this.prevCheckResult = checkResult;
    if (checkResult) {
      this.showHide(this.primaryElements, this.secondaryElements);
    } else {
      this.showHide(this.secondaryElements, this.primaryElements);
    }
  }

  showHide(toShow, toHide) {
    toShow?.forEach((element) =>
      element.classList.remove(this.hiddenClassValue)
    );
    toHide?.forEach((element) => element.classList.add(this.hiddenClassValue));
  }
}
