export class Vector {
    constructor(coords) {
        this.coords = Array.isArray(coords) ? coords : Array.from(arguments);
    }
    static normal(dim, axis, pos) {
        const coords = new Array(dim).fill(0);
        coords[axis] = pos ? 1 : -1;
        return new Vector(coords);
    }
    dim() {
        return this.coords.length;
    }
    get(i) {
        return this.coords[i];
    }
    add(other) {
        if (this.coords.length !== other.coords.length) {
            throw new Error("Vectors must have the same length");
        }
        return new Vector(this.coords.map((c, i) => c + other.get(i)));
    }
    sub(other) {
        if (this.coords.length !== other.coords.length) {
            throw new Error("Vectors must have the same length");
        }
        return new Vector(this.coords.map((c, i) => c - other.get(i)));
    }
    scale(scalar) {
        return new Vector(this.coords.map(c => c * scalar));
    }
    mag() {
        return Math.sqrt(this.coords.reduce((sum, c) => sum + c * c, 0));
    }
    unit() {
        const mag = this.mag();
        if (mag === 0) {
            throw new Error("Cannot compute unit vector of zero vector");
        }
        return this.scale(1 / mag);
    }
    dot(other) {
        if (this.coords.length !== other.coords.length) {
            throw new Error("Vectors must have the same length");
        }
        const a = this.coords;
        const b = other.coords;
        let sum = 0;
        for (let i = 0, n = a.length; i < n; i++) {
            sum += a[i] * b[i];
        }
        return sum;
    }
    toMatrix() {
        return new Matrix([this]);
    }
    toString() {
        return this.toMatrix().toString();
    }
}

export class Matrix {
    constructor(cols) {
        this.cols = Array.isArray(cols) ? cols : Array.from(arguments);
        if (this.cols.length > 0) {
            const expectedRows = this.cols[0].dim();
            for (const col of this.cols) {
                if (col.dim() !== expectedRows) {
                    throw new Error("Matrix columns must all have the same length");
                }
            }
        }
    }
    static fromVector(vec) {
        return new Matrix([vec]);
    }
    // TODO: create an identity matrix of a given size
    static identity(size) {
        const cols = [];
        for (let i = 0; i < size; i++) {
            const coords = new Array(size).fill(0);
            coords[i] = 1;
            cols.push(new Vector(coords));
        }
        return new Matrix(cols);
    }
    // TODO: create a rotation matrix from a dimension, an angle, and a plane of rotation
    numCols() {
        return this.cols.length;
    }
    numRows() {
        return this.cols[0].dim();
    }
    getCol(i) {
        return this.cols[i];
    }
    getRow(i) {
        return new Vector(this.cols.map(col => col.coords[i]));
    }
    add(other) {
        if (this.numCols() !== other.numCols() || this.numRows() !== other.cols[0].dim()) {
            throw new Error("Matrices must have the same dimensions");
        }
        return new Matrix(this.cols.map((col, i) => col.add(other.cols[i])));
    }
    sub(other) {
        if (this.numCols() !== other.numCols() || this.numRows() !== other.cols[0].dim()) {
            throw new Error("Matrices must have the same dimensions");
        }
        return new Matrix(this.cols.map((col, i) => col.sub(other.cols[i])));
    }
    scale(scalar) {
        return new Matrix(this.cols.map(col => col.scale(scalar)));
    }
    applyTo(other) {
        if (other instanceof Vector) {
            other = Matrix.fromVector(other);
        }
        const rowCount = this.numRows();
        const colCount = other.numCols();
        if (rowCount !== colCount) {
            throw new Error("Incompatible matrix dimensions for multiplication");
        }
        const resultVecs = new Array(colCount);
        for (let i = 0; i < colCount; i++) {
            resultVecs[i] = new Vector(new Array(rowCount));
        }
        for (let rowI = 0; rowI < rowCount; rowI++) {
            const row = this.getRow(rowI);
            for (let colI = 0; colI < colCount; colI++) {
                resultVecs[colI].coords[rowI] = row.dot(other.getCol(colI));
            }
        }
        return new Matrix(resultVecs);
    }
    apply(other) {
        return other.applyTo(this);
    }
    toString() {
        const rows = [];
        for (let i = 0; i < this.numRows(); i++) {
            let separator;
            if (this.numRows() == 1) {
                separator = "()";
            } else if (i == 0) {
                separator = "/\\";
            } else if (i == this.numRows() - 1) {
                separator = "\\/";
            } else {
                separator = "||";
            }
            rows.push(separator[0] + `${this.getRow(i).coords.join('\t')}` + separator[1]);
        }
        return rows.join('\n');
    }
}