import {Move} from "./move.js";
import {selectCurrent} from "../filters.js";
import {Matrix} from "./core/linalg.js";
import {toAxis} from "./grip_map.js";

export class moveEngine {
    static applyMove(cube, move) {
        validateMove(cube, move);
        // build a rotation matrix from the move's plane
        const discrete = Matrix.discrete(cube.dim, move.p1, move.p2);
        // select pieces based on the axis and layer mask
        const selected = selectCurrent(cube, move.grip, move.layerMask);
        // apply the rotation to the selected pieces
        cube.rotatePieces(selected, discrete);
    }
    validateMove(cube, move) {
        if (move.p1 >= cube.dim || move.p2 >= cube.dim) {
            throw new Error("Move exceeded puzzle dimensions");
        }
        const axis = toAxis(move.grip)["axis"];
        if (move.p1 == axis || move.p2 == axis) {
            throw new Error("Tried to rotate through the grip");
        }
        if (Math.max(move.layerMask) >= cube.size) {
            throw new Error("Layer mask exceeded the puzzle");
        }
    }
}