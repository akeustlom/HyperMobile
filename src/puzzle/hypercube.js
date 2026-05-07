import {Vector, Matrix} from '../core/linalg.js';
import {moveEngine} from "./moves/move_engine.js";
import {stringifyMove, parseMove} from "./moves/notation.js";

const SAVE_VERSION = 1;

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
    // Serialize a piece transform as a signed-permutation string; column-first representation
    encodeTrans() {
        return this.transform.toSigned();
    }
    decodeTrans(str) {
        if (str.length != this.position.dim) throw new Error("Transform length doesn't match puzzle dimension: " + str);
        this.transform = Matrix.fromSigned(str);
    }
}
export class PuzzleND {
    constructor(_size, _dim) {
        this.size = _size;
        this.dim = _dim;
        this.layers = [];
        this.generateLayers(this.size);
        this.pieces = [];
        this.generatePieces(this.size, this.dim);
        this.history = [];
        this.redoStack = [];
    }
    generatePieces(size, dim) {
        const outside = size - 1;
        for (let i = 0; i < size**dim; i++) {
            const coords = new Array(dim);
            for (let j = 0; j < dim; j++) {
                // Convert linear index to multi-dimensional coordinates
                coords[j] = Math.floor(i / (size**j)) % size;
            }
            const puzzleCoords = coords.map(c => this.layers[c]);
            // Only add a piece if it's on the outside of the puzzle, i.e., at least one coordinate is at the extreme
            if (puzzleCoords.every(c => Math.abs(c) < outside)) {
                continue;
            }
            const piece = new Piece(new Vector(puzzleCoords), outside);
            this.pieces.push(piece);
        }
    }
    // Since some puzzles have oddly-spaced layers, pregenerate the layer masks
    generateLayers(size) {
        const outside = size - 1;
        // Layers are centered on 0, spaced in steps of 2 such that every piece is at an integer coordinate
        for (let i = outside; i >= -outside; i -= 2) {
            this.layers.push(i);
        }
    }
    rotatePieces(pieceIds, matrix) {
        for (const id of pieceIds) {
            this.pieces[id].turn(matrix);
        }
    }
    applyMove(move) {
        moveEngine.applyMove(this, move);
    }
    serialize() {
        return {
            version: SAVE_VERSION,
            size: this.size,
            dim: this.dim,
            transforms: this.pieces.map(piece => piece.encodeTrans()),
            history: this.history.map(move => stringifyMove(move))
        };
    }
    static deserialize(data) {
        if (data.version != SAVE_VERSION) throw new Error("Unsupported save version");
        const cube = new PuzzleND(data.size, data.dim);
        if (data.transforms.length != cube.pieces.length) throw new Error("Corrupted save data");
        cube.pieces.forEach((piece, i) => {
            piece.decodeTrans(data.transforms[i]);
        });
        cube.history = data.history.map(move => parseMove(move));
        return cube;
    }
}