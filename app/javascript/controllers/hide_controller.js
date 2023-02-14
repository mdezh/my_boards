import ShowController from "controllers/show_controller";

// Connects to data-controller="hide"
export default class extends ShowController {
  _check(state) {
    return !super._check(state);
  }
}
