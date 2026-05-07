import {Vector, Matrix} from "./core/linalg.js";
import {stringifyMove, parseMove} from "./puzzle/moves/notation.js";
import {PuzzleND} from "./puzzle/hypercube.js";
import {Move} from "./puzzle/moves/move.js";
import {Mover} from "./puzzle/moves/mover.js";

// Verify converting moves to and from strings
const conversionMoves = [
    new Move([0], "R", 2, 1), // Rzy
    new Move([1], "L", 2, 1), // {2}Lzy
    new Move([0, 2], "U", 0, 2), // {1,3}Uxz
    new Move([0], undefined, 3, 2), // wz
    new Move([0, 1, 2], "F", 0, 1) // {1,2,3}Fxy
];
conversionMoves.forEach((move, index) => {
    const moveString = stringifyMove(move);
    console.log("Move " + index + ": " + moveString);
    const backMove = parseMove(moveString);
    console.log(backMove.layerMask, backMove.grip, backMove.p1, backMove.p2);
});

// Verify converting matrices to and from strings
const convMatrices = [
    Matrix.identity(4),
    Matrix.discrete(4, 2, 1)
];
convMatrices.forEach((matrix) => {
    const matrixString = matrix.toSigned();
    console.log(matrixString);
    const backMatrix = Matrix.fromSigned(matrixString);
    console.log(backMatrix.toString());
});

// Verify matrix multiplication
const multA = Matrix.discrete(4, 2, 1);
const multB = Matrix.discrete(4, 0, 3);
const multTest = multA.applyTo(multB);
console.log(multTest.toSigned());
const regMultA = new Matrix(new Vector(1, 4), new Vector(2, 5), new Vector(3, 6));
const regMultB = new Matrix(new Vector(10, 20, 30), new Vector(11, 21, 31));
const regMultC = regMultA.applyTo(regMultB);
console.log(regMultC.toString());

// Verify that applying a 90deg rotation 4 times results in identity
const cycleTests = [
    new Move([0], "R", 2, 1),
    new Move([0], "U", 0, 2),
    new Move([0], "F", 0, 1)
];
let cycleMatrix = Matrix.identity(3);
console.log(cycleMatrix.toSigned());
cycleTests.forEach((move) => {
    for (let i = 0; i < 4; i++) {
        cycleMatrix = cycleMatrix.apply(move.transform(3));
    }
    console.log(cycleMatrix.toSigned());
});

// Verify that a puzzle is created with the correct number of pieces - move logic to puzzle itself?
const testPuzzles = [
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4]
];
testPuzzles.forEach((puzzle) => {
    const n = puzzle[0];
    const d = puzzle[1];
    const expected = (n**d) - ((n-2)**d);
    const thePuzzle = new PuzzleND(n, d);
    console.log(thePuzzle.pieces.length + " / " + expected);
});

// Verify that applying a move, then its inverse, preserves puzzle state
const invMoves = [
    {
        puzzle: [3,3],
        move: new Move([0], "R", 2, 1)
    },
    {
        puzzle: [3,4],
        move: new Move([0], "R", 2, 1)
    },
    {
        puzzle: [4,4],
        move: new Move([1], "U", 0, 2)
    }
];
invMoves.forEach((test) => {
    const theCube = new PuzzleND(test["puzzle"][0], test["puzzle"][1]);
    const theMove = test["move"];
    const invMove = theMove.inverse();
    const idMatrix = Matrix.identity(theCube.dim);
    Mover.newMove(theCube, theMove);
    Mover.newMove(theCube, invMove);
    let matches = true;
    theCube.pieces.forEach((piece) => {
        if (!piece.transform.isEqual(idMatrix)) matches = false;
    });
    console.log(matches ? "inverse success" : "inverse fail");
});