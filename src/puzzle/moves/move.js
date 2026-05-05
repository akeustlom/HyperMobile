export class Move {
    constructor(_layerMask = [0], _grip, _p1, _p2) {
        if (p1 == p2) {
            throw new Error("Failed to create move: " + grip + p1 + p2);
        }
        this.layerMask = _layerMask.toSorted();
        this.grip = _grip;
        this.p1 = _p1;
        this.p2 = _p2;
    }
    inverse() {
        return new Move(this.grip, this.layerMask, this.p2, this.p1);
    }
}