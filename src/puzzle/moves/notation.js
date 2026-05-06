import {axes} from "./grip_map.js";
import {Move} from "./move.js";
export function stringifyMove(move) {
    const mask = 
        move.layerMask.length == 1 && move.layerMask[0] == 0 ?
        "" :
        `{${move.layerMask.map(x => x+1).join(",")}}`;
    const grip = move.grip ? move.grip : "";
    const plane = axes[move.p1] + axes[move.p2];
    return `${mask}${grip}${plane}`;
}
export function parseMove(str) {
    const match = str.match(/^(?:\{([\d,]+)\})?([A-Z])?([a-z])([a-z])$/);
    if (!match) throw new Error("Invalid move notation " + str);
    const layerMask = match[1] ?
        match[1].split(",").map(x => Number(x) - 1)
        : [0];
    const grip = match[2];
    const p1 = axes.indexOf(match[3]);
    const p2 = axes.indexOf(match[4]);
    return new Move(layerMask, grip, p1, p2);
}