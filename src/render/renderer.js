import { project } from "./projection_nd.js";
import { getStickerInfo } from "./geometry.js";
import { Matrix } from "../core/linalg.js";

const mat45 = Matrix.rotation(4, 0, 2, Math.PI/4);
const matDefault = Matrix.rotation(4, 1, 2, Math.acos(1/3)/2.0).applyTo(mat45);

export class Renderer {
    constructor(viewport) {
        this.viewport = viewport;
    }
    render(cube) {
        this.viewport.clear();
        cube.pieces.forEach(piece => {
            piece.stickers.forEach(sticker => {
                const info = getStickerInfo(piece, sticker);
                const viewed = matDefault.applyTo(info.pos);
                const proj = project(viewed, cube.size*3);
                console.log(proj.coords);
                this.viewport.drawPoint(proj.get(0),proj.get(1),info.color);
            });
        });
    }
}