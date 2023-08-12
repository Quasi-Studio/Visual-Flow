import { Point } from "../../util/coordinate";
import { BlockShape } from "../block";
import { Color, ColorPreset, TricolorPreset, Tricolor } from "../color";
import calculateTextSize from '../../util/font'

class TextBlock implements BlockShape {
    text_content: string
    text_color: Color
    text_size: number
    color: Tricolor

    constructor (_text_content: string, _text_color: Color = ColorPreset.text_light, _color: Tricolor = TricolorPreset.blue, _text_size: number = 20) {
        this.text_content = _text_content
        this.text_color = _text_color
        this.text_size = _text_size
        this.color = _color
    }

    path(): { path: string, color: Tricolor } {
        let size = calculateTextSize(this.text_size, 'Consolas', this.text_content)
        console.log(size)
        return {
            path: `m 0 12 v ${size.height} c 0 9 3 12 12 12 h ${size.width} c 9 0 12 -3 12 -12 v -${size.height} c 0 -9 -3 -12 -12 -12 h -${size.width} c -9 0 -12 3 -12 12`,
            color: this.color
        }
    }

    text(): { text: string; pos: Point; color: Color; size: number }[] {
        let size = calculateTextSize(this.text_size, 'Consolas', this.text_content)
        return [{
            text: this.text_content,
            pos: new Point(12, 14 + size.ascent),
            color: this.text_color,
            size: this.text_size
        }]
    }

    socket(): { pos: Point; }[] {
        return []
    }
}

export default {
    text: TextBlock
}