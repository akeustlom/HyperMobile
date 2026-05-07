export class Mover {
    static newMove(cube, move) {
        cube.applyMove(move);
        cube.history.push(move);
        cube.redoStack.length = 0;
    }
    static undo(cube) {
        const lastMove = cube.history.pop();
        switch(lastMove) {
            case -1:
                // tried to undo past scramble boundary, TODO: notify
                cube.history.push(-1); break;
            case undefined:
                //tried to undo past solved, TODO: notify
                break;
            default:
                cube.applyMove(lastMove.inverse());
                cube.redoStack.push(lastMove);
        }
    }
    static redo(cube) {
        const nextMove = cube.redoStack.pop();
        if (nextMove == undefined) {
            // tried to redo past the end of the stack, TODO: notify
        } else {
            cube.applyMove(nextMove);
            cube.history.push(nextMove);
        }
    }
}