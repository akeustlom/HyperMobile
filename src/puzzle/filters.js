// select pieces should use a predicate, not all this information. an alternative form can integrate this information into a predicate.
export function selectPieces(cube, axis, layerMask, current) {
    if (axis < 0 || axis >= cube.dim) {
        throw new Error("Filter axis out of bounds");
    }
    if (Math.min(...layerMask) < 0 || Math.max(...layerMask) >= cube.size) {
        throw new Error("Layer mask out of bounds");
    }
    const check = [];
    for (let i = 0; i < layerMask.length; i++) {
        check.push(cube.layers[layerMask[i]]);
    }
    const selected = [];
    for (let i = 0; i < cube.pieces.length; i++) {
        const piece = cube.pieces[i];
        const pos = current ? piece.getTransPos() : piece.position;
        if (check.includes(pos.get(axis))) {
            selected.push(i);
        }
    }
    return selected;
}