export const grips = [
    "R", "L",
    "U", "D",
    "F", "B",
    "O", "I",
    "A", "P",
    "Γ", "Δ",
    "Θ", "Λ",
    "Ξ", "Π",
    "Σ", "Φ",
    "Ψ", "Ω"
];
export const axes = "xyzwvutsrq".split();
export function toAxis(grip) {
    let index = 0;
    try {
        index = grips.indexOf(grip);
    } catch (error) {
        throw new Error("Unknown grip: " + grip);
    }
    axis = Math.trunc(index / 2);
    sign = index ^ 1;
}
export function toGrip(axis, sign) {
    const index = (axis * 2) + (sign > 0 ? 0 : 1);
    try {
        return grips.indexOf(index);
    } catch (error) {
        throw new Error("Unknown axis or sign: " + axis + ", " + sign);
    }
}
export function resolveLayer(cube, layer) {
    return cube.layers.indexOf(layer);
}