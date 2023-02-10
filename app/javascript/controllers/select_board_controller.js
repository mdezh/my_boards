import UseStateController from "controllers/use_state_controller";

// Connects to data-controller="select-board"
export default class extends UseStateController {
  static classes = ["active"];

  _updateWithState({ id }) {
    if (this.prevId) {
      this._classList(this.prevId)?.remove(...this.activeClasses);
    }
    this._classList(id)?.add(...this.activeClasses);
    this.prevId = id;
  }

  _classList(boardId) {
    const id = `board_${boardId}`;
    return document.getElementById(id)?.classList;
  }
}
