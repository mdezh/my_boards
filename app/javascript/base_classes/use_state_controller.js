import UseStateBaseController from "./use_state_base_controller";

export default class UseStateController extends UseStateBaseController {
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
