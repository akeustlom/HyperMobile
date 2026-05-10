import {Vector} from '../core/linalg.js';
export function getStickerInfo(piece, sticker) {
    // TODO: Depict stickers as (N-1)-cubes rather than points
    // TODO: account for piece explode, facet spacing, and sticker shrink
    const stickerOffset = Vector.stick(sticker.axis, sticker.sign, piece.position.dim());
    const stickerPos = piece.position.add(stickerOffset);

    let color = '#000000';
    const pos = sticker.sign > 0;
    switch(sticker.axis) {
        case 0: color = pos ? '#ff0000' : '#ff7f00'; break;
        case 1: color = pos ? '#ffffff' : '#ffdd00'; break;
        case 2: color = pos ? '#00dd00' : '#007fff'; break;
        case 3: color = pos ? '#ff7fff' : '#7f00dd'; break;
        case 4: color = pos ? '#aaaaaa' : '#555555'; break;
    }
    return {pos: stickerPos, color: color};
}