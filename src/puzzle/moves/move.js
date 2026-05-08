import {toAxis} from "./grip_map.js";
import {Matrix} from "../../core/linalg.js";
export class Move {
    constructor(_layerMask = [0], _grip, _p1, _p2) {
        if (_p1 == _p2 || _p1 < 0 || _p2 < 0) {
            throw new Error("Failed to create move: invalid plane " + _p1 +" " + _p2);
        }
        if (!_layerMask.every(layer => layer >= 0)) {
            throw new Error("Failed to create move: negative(s) in layer mask " + _layerMask);
        }
        if (_grip) {
            const axis = toAxis(_grip)["axis"];
            if (_p1 == axis || _p2 == axis) {
               throw new Error("Failed to create move: plane cannot include grip axis " + _grip + "; " + _p1 + " " + _p2);
            }
        }
        this.layerMask = _layerMask.toSorted();
        this.grip = _grip;
        this.p1 = _p1;
        this.p2 = _p2;
    }
    inverse() {
        return new Move(this.layerMask, this.grip, this.p2, this.p1);
    }
    transform(dim) {
        return Matrix.discrete(dim, this.p1, this.p2);
    }
}