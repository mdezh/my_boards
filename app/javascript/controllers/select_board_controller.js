import UseStateController from "controllers/use_state_controller";

// Connects to data-controller="select-board"
export default class extends UseStateController {
  static classes = ["active"];

  _updateWithState() {
    if (this.lastId) {
      this._classList(this.lastId)?.remove(...this.activeClasses);
    }
    this._classList(this.state.id)?.add(...this.activeClasses);
    this.lastId = this.state.id;
  }

  _classList(boardId) {
    const id = `board_${boardId}`;
    return document.getElementById(id)?.classList;
  }
}
