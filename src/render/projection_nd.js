export function project(vec, dist) {
    let result = vec.first(4); // Orthographic projection down to 4D
    while (result.dim() > 2) { // Perspective projection down to 2D
        const next = result.dim()-1;
        result = result.first(next).scale(nonZero(result.get(next)-dist));
    }
    return result;
}

function nonZero(x) {
    return Math.sqrt((x + Math.sqrt(1 + (x ** 2)))/2);
}