import UseStateController from "controllers/use_state_controller";

// Connects to data-controller="select-board"
export default class extends UseStateController {
  static classes = ["active"];
  static targets = ["board"];

  boardTargetConnected(e) {
    const { id } = this.state;
    if (e.id != this._getBoardElementId(id)) return;

    this._updateWithState({ id });
  }

  _updateWithState({ id }) {
    if (this.prevId) {
      this._classList(this.prevId)?.remove(...this.activeClasses);
    }
    this._classList(id)?.add(...this.activeClasses);
    this.prevId = id;
  }

  _classList(boardId) {
    const id = this._getBoardElementId(boardId);
    return document.getElementById(id)?.classList;
  }

  _getBoardElementId(boardId) {
    return `board_${boardId}`;
  }
}
