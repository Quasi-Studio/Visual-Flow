import { Point } from "../../util/coordinate";
import { BlockShape } from "../block";
import { Color, ColorPreset, TricolorPreset, Tricolor } from "../color";
import calculateTextSize from '../../util/font'

interface TextBlockCreateOption {
    text_color?: Color
    text_size?: number
    color?: Tricolor
    font?: string
}

const TextBlockDefaultOption: TextBlockCreateOption = {
    text_color: ColorPreset.text_light,
    color: TricolorPreset.blue,
    text_size: 20,
    font: 'Consolas'
}

class TextBlock implements BlockShape {
    text_content: string
    text_color: Color
    text_size: number
    text_font: string
    color: Tricolor

    constructor (content: string, option?: TextBlockCreateOption) {
        this.text_content = content
        let opt = {...TextBlockDefaultOption, ...option}
        this.text_color = opt.text_color!
        this.text_size = opt.text_size!
        this.color = opt.color!
        this.text_font = opt.font!
    }

    path(): { path: string, color: Tricolor } {
        let size = calculateTextSize(this.text_size, this.text_font, this.text_content)
        console.log(size)
        return {
            path: `m 0 12 v ${size.height} c 0 9 3 12 12 12 h ${size.width} c 9 0 12 -3 12 -12 v -${size.height} c 0 -9 -3 -12 -12 -12 h -${size.width} c -9 0 -12 3 -12 12`,
            color: this.color
        }
    }

    text(): { text: string; pos: Point; color: Color; size: number; font: string }[] {
        let size = calculateTextSize(this.text_size, this.text_font, this.text_content)
        return [{
            text: this.text_content,
            pos: new Point(12, 14 + size.ascent),
            color: this.text_color,
            size: this.text_size,
            font: this.text_font
        }]
    }

    socket(): { pos: Point; }[] {
        let size = calculateTextSize(this.text_size, this.text_font, this.text_content)
        return [{
            pos: new Point(0, size.height / 2 + 12)
        }, {
            pos: new Point(size.width / 2 + 12, 0)
        }, {
            pos: new Point(size.width + 24, size.height / 2 + 12)
        }, {
            pos: new Point(size.width / 2 + 12, size.height + 24)
        }]
    }
}

export default {
    text: TextBlock
}