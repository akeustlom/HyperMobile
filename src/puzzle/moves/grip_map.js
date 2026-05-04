export function mapGrip(grip) {
    switch (grip) {
        case "R": return {axis: 0, sign: 1};
        case "L": return {axis: 0, sign: -1};
        case "U": return {axis: 1, sign: 1};
        case "D": return {axis: 1, sign: -1};
        case "F": return {axis: 2, sign: 1};
        case "B": return {axis: 2, sign: -1};
        case "O": return {axis: 3, sign: 1};
        case "I": return {axis: 3, sign: -1};
        case "A": return {axis: 4, sign: 1};
        case "P": return {axis: 4, sign: -1};
        default:
            throw new Error("Unassigned grip: " + grip);
    }
}