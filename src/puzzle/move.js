export class Move {
    constructor(_axis, _layerMask = [0], _p1, _p2) {
        if (_p1 == _axis || _p2 == _axis) {
            throw new Error("Tried to create a move that turns through the grip");
        }
        this.axis = _axis;
        this.layerMask = _layerMask.toSorted();
        this.p1 = _p1;
        this.p2 = _p2;
    }
    inverse() {
        return new Move(this.axis, this.layerMask, this.p2, this.p1);
    }
}
// keep move separate from move engine
// move keeps track of intention, move engine does the math