import {Move} from "./move.js";
import {selectCurrent} from "../filters.js";
import {Matrix} from "./core/linalg.js";
import {axes} from "./puzzle/grip_map.js";

export class moveEngine {
    static applyMove(cube, move) {
        // TODO: verify that a move is valid
        
        // build a rotation matrix from the move's plane
        const discrete = Matrix.discrete(cube.dim, axes.indexOf(move.p1), axes.indexOf(move.p2));
        // select pieces based on the axis and layer mask
        const selected = selectCurrent(cube, move.grip, move.layerMask);
        // apply the rotation to the selected pieces
        cube.rotatePieces(selected, discrete);
    }
}