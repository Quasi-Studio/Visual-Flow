import { Point } from "./coordinate";

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

function calculateTextSize(font_size: number, font_family: string, text: string) {
    context!.font = font_size + 'px ' + font_family;
    const m = context!.measureText(text);
    return new Point(
        m.width,
        m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
    )
}

export default calculateTextSize