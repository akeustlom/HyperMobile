import {toAxis, resolveLayer} from "../moves/grip_map.js";

function selectPieces(cube, predicate) {
    const selected = [];
    for (let i = 0; i < cube.pieces.length; i++) {
        const piece = cube.pieces[i];
        // Allows for multiple functions to be placed in the boolean
        if (predicate(piece)) {
            selected.push(i);
        }
    }
    return selected;
}
// For one axis, select pieces on the layers specified by the mask; configurable to select based on current position (grip) or solved position (piece filters)
function selectLayers(cube, grip, layerMask, current) {
    const {axis: axis, sign: sign} = toAxis(grip);
    return selectPieces(cube, piece => {
        if (!grip) return true; // Select all pieces for full puzzle rotation
        const pos = current ? piece.getTransPos() : piece.position;
        return layerMask.includes(resolveLayer(cube, pos.get[axis] * sign));
    });
}
export function selectCurrent(cube, grip, layerMask) {
    return selectLayers(cube, grip, layerMask, true);
}
export function selectSolved(cube, grip, layerMask) {
    return selectLayers(cube, grip, layerMask, false);
}
// Combine multiple filters together, such as filtering on multiple axes, or having a filter active while selecting a grip
export function composeFilters(cube, filters) {
    if (filters.length === 0) {
        return Array.from({length: cube.pieces.length },(_, i) => i);
    }
    const sorted = [...filters].sort((a, b) => a.length - b.length);
    let result = new Set(sorted[0]);
    for (let i = 1; i < sorted.length; i++) {
        const current = new Set(sorted[i]);
        result = new Set([...result].filter(id => current.has(id)));
    }
    return [...result];
}