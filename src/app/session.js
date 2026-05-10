import {PuzzleND} from "../puzzle/hypercube.js";
import {parseMove} from "../puzzle/moves/notation.js";
export class Session {
    constructor(data = new PuzzleND(3, 4).serialize()) {
        this.cube = PuzzleND.deserialize(data);
    }
    applyMove(moveStr) {
        const move = parseMove(moveStr);
        this.cube.applyMove(move);
        cube.history.push(move);
        cube.redoStack.length = 0;
    }
    undo() {
        const lastMove = this.cube.history.pop();
        switch(lastMove) {
            case -1:
                // tried to undo past scramble boundary, TODO: notify
                this.cube.history.push(-1); break;
            case undefined:
                //tried to undo past solved, TODO: notify
                break;
            default:
                this.cube.applyMove(lastMove.inverse());
                this.cube.redoStack.push(lastMove);
        }
    }
    redo() {
        const nextMove = this.cube.redoStack.pop();
        if (nextMove == undefined) {
            // tried to redo past the end of the stack, TODO: notify
        } else {
            this.cube.applyMove(nextMove);
            this.cube.history.push(nextMove);
        }
    }
    getCube() {
        return this.cube;
    }
    snapshot() {
        return structuredClone(this.cube.pieces);
    }
}