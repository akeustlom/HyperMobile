export class Move {
    constructor(_grip, _layerMask = [0], _p1, _p2) {
        this.grip = _grip;
        this.layerMask = _layerMask.toSorted();
        this.p1 = _p1;
        this.p2 = _p2;
    }
    inverse() {
        return new Move(this.grip, this.layerMask, this.p2, this.p1);
    }
}