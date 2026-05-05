import {Vector, Matrix} from '../core/linalg.js';
class Sticker {
    constructor(_axis, _sign) {
        this.axis = _axis;
        this.sign = _sign;
    }
}
class Piece {
    constructor(_position, outside) {
        // home position of the piece; will not change, used to determine stickers
        this.position = _position;
        // current transformation of the piece; starts as identity, will be updated as the piece is moved around
        this.transform = Matrix.identity(this.position.dim());
        this.stickers = [];
        this.addStickers(this.position.dim(), outside);
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
export class PuzzleND {
    constructor(_size, _dim) {
        this.size = _size;
        this.dim = _dim;
        this.pieces = [];
        this.generatePieces(this.size, this.dim);
        this.layers = [];
        this.generateLayers(this.size);
        this.history = [];
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
    rotatePieces(pieceIds, matrix) {
        for (const id of pieceIds) {
            this.pieces[id].turn(matrix);
        }
    }
}