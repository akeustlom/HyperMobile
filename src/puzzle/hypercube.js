import {Vector, Matrix} from '../core/linalg.js';
class Sticker {
    constructor(_axis, _sign) {
        this.axis = _axis;
        this.sign = _sign;
    }
    // sticker colors determined by data
    // sticker coords, passing piece?
}
class Piece {
    constructor(_position) {
        // home position of the piece; will not change, but can be used to determine which stickers the piece has and how to transform them
        this.position = _position;
        // current transformation of the piece; starts as identity, but will be updated as the piece is moved around
        this.transform = Matrix.identity(4);
        this.stickers = [];
        this.addStickers(this.position.dim());
    }
    addStickers(dim, outside) {
        for (let axis = 0; axis < dim; axis++) {
            const check = this.position.get(axis);
            if (Math.abs(check) == outside) {
                this.stickers.push(new Sticker(axis, check > 0));
            }
        }
    }
    getTransPos() {
        return this.transform.applyTo(this.position);
    }
    turn(matrix) {
        this.transform = matrix.applyTo(this.transform);
    }
}
class PuzzleND {
    constructor(_size, _dim) {
        this.size = _size;
        this.dim = _dim;
        this.pieces = [];
        this.generatePieces(this.size, this.dim);
        this.layers = [];
        this.generateLayers(this.size);
    }
    generatePieces(size, dim) {
        const outside = size - 1;
        for (let i = 0; i < size**dim; i++) {
            const coords = new Array(dim);
            for (let j = 0; j < dim; j++) {
                // Convert linear index to multi-dimensional coordinates
                coords[j] = Math.floor(i / (size**j)) % size;
            }
            // Convert coordinates to be centered around 0, in steps of 2 so that every piece is at an integer coordinate regardless of the size of the puzzle
            const puzzleCoords = coords.map(c => (c * 2) - (outside));
            // Only add a piece if it's on the outside of the puzzle, i.e., at least one coordinate is at the extreme
            if (puzzleCoords.every(c => Math.abs(c) < outside)) {
                continue;
            }
            const thePiece = new Piece(new Vector(puzzleCoords), outside);
            this.pieces.push(thePiece);
        }
    }
    // Since some puzzles have oddly-spaced layers, pregenerate the layer masks
    generateLayers(size) {
        const outside = size - 1;
        // Layers are indexed from the outside in
        for (let i = outside; i >= -outside; i -= 2) {
            this.layers.push(i);
        }
    }
    applyMove(axis, sign, layerMask, p1, p2) {
        // Validate the move parameters
        if (axis >= this.dim || axis < 0) {
            throw new Error("Grip axis out of bounds");
        }
        if (layerMask.length !== this.size) {
            throw new Error("Layer mask length must match puzzle size");
        }
        if (p1 < 0 || p1 >= this.dim || p2 < 0 || p2 >= this.dim || p1 === p2) {
            throw new Error("Rotation plane axes out of bounds or invalid");
        }
        if (p1 == axis || p2 == axis) {
            throw new Error("Rotation plane cannot include the move axis");
        }
        // Create the rotation matrix for this move
        const rotationMatrix = Matrix.discrete(this.dim, p1, p2);
        // Turn the layer mask into a list of coordinates along the selected axis
        const validLayers = [];
        for (let i = 0; i < this.size; i++) {
            if (layerMask[i]) {
                validLayers.push(this.layers[i] * (sign ? 1 : -1));
            }
        }
        // Search through pieces for ones that match the layer mask, then apply the rotation to those pieces
        for (const piece of this.pieces) {
            if (validLayers.includes(piece.getTransPos().get(axis))) {
                piece.turn(rotationMatrix);
            }
        }
    }
}

const testA = new PuzzleND(2, 4);
testA.applyMove(0, true, [true, false], 1, 2);