export class Move {
    constructor(_layerMask = [0], _grip, _p1, _p2) {
        if (p1 == p2 || p1 < 0 || p2 < 0) {
            throw new Error("Failed to create move: invalid plane " + p1 +" " + p2);
        }
        if (!_layerMask.every(layer => layer > 0)) {
            throw new Error("Failed to create move: negative(s) in layer mask " + _layerMask);
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