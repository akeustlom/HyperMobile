import {Vector, Matrix} from "./core/linalg.js";
import {stringifyMove, parseMove} from "./puzzle/moves/notation.js";
import {PuzzleND} from "./puzzle/hypercube.js";
import {Move} from "./puzzle/moves/move.js";
import {Mover} from "./puzzle/moves/mover.js";
//time to be humbled

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

const multA = Matrix.discrete(4, 2, 1);
const multB = Matrix.discrete(4, 0, 3);
const multTest = multA.applyTo(multB);
console.log(multTest.toSigned());

const regMultA = new Matrix(new Vector(1, 4), new Vector(2, 5), new Vector(3, 6));
const regMultB = new Matrix(new Vector(10, 20, 30), new Vector(11, 21, 31));
const regMultC = regMultA.applyTo(regMultB);
console.log(regMultC.toString());