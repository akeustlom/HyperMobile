import {Vector, Matrix} from '../core/linalg.js';
class Sticker {
    constructor(axis, side) {
        this.normal = Vector.normal(4, axis, side);
        this.color = (() => {
            switch (axis) {
                case 0: return side ? 'red' : 'orange'; break;
                case 1: return side ? 'white' : 'yellow'; break;
                case 2: return side ? 'green' : 'blue'; break;
                case 3: return side ? 'pink' : 'purple'; break;
                default: throw new Error(`Invalid axis: ${axis}`);
            }
        })();
    }
}
class Piece {
    constructor(_position) {
        this.position = _position;
        this.transform = new Matrix(4);
        this.stickers = [];
        addStickers();
    }
    addStickers() {
        for (let axis = 0; axis < 4; axis++) {
            if (_position.get(axis) === -1) {
                this.stickers.push(new Sticker(axis, false));
            } else if (_position.get(axis) === 1) {
                this.stickers.push(new Sticker(axis, true));
            }
        }
    }
}
class Puzzle4D {
    constructor(size) {
        this.pieces = [];
        generatePieces(size);
    }
    generatePieces(size) {
        for (let i = 0; i < size**4; i++) {
            const coords = [
                i % size,
                Math.floor(i / size) % size,
                Math.floor(i / size**2) % size,
                Math.floor(i / size**3) % size
            ].map(c => (c * size == 2 ? 2 : 1) - 1);
            this.pieces.push(new Piece(new Vector(coords)));
        }
    }
}