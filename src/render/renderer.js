import { project } from "./projection_nd.js";
import { getStickerInfo } from "./geometry.js";
export class Renderer {
    constructor(viewport) {
        this.viewport = viewport;
    }
    render(cube) {
        this.viewport.clear();
        cube.pieces.forEach(piece => {
            piece.stickers.forEach(sticker => {
                const info = getStickerInfo(piece, sticker);
                const proj = project(info.pos, 2.5);
                console.log(proj.coords);
                this.viewport.drawPoint(proj.get(0),proj.get(1),info.color);
            });
        });
    }
}