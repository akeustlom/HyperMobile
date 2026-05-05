import {Move} from "./move.js";
import {selectCurrent} from "../filters.js";
import {Matrix} from "./core/linalg.js";
import {mapGrip} from "./puzzle/grip_map.js";

export function applyMove(cube, move) {
    // TODO: verify that the move is valid

    // build a rotation matrix from the move's plane
    const discrete = Matrix.discrete(cube.dim, move.p1, move.p2);
    // retrieve an axis and sign from the move's grip
    const converted = mapGrip(move.grip);
    const axis = converted["axis"];
    const sign = converted["sign"];
    // use sign to correct the layer mask
    const layerMask = move.layerMask.map(l => cube.layers[l] * sign)
    // select pieces based on the axis and layer mask
    const selected = selectCurrent(cube, axis, layerMask);
    // apply the rotation to the selected pieces
    cube.rotatePieces(selected, discrete);
    cube.history.push(move);
}