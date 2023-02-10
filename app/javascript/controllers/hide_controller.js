import Show from "controllers/show_controller";

// Connects to data-controller="hide"
export default class extends Show {
  _check(state) {
    return !super._check(state);
  }
}
