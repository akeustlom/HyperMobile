export function projectNDto3D(vec) {
    const w = vec.get(3);
    if (!w) return vec.toDim(3);
    return vec.toDim(3).scale(nonZero(w/5));
}

function nonZero(x) {
    return (Math.sqrt(x**2 + 4) + x)/2;
}