class Color {
    r: number
    g: number
    b: number

    constructor (_r: number, _g: number, _b: number) {
        this.r = _r
        this.g = _g
        this.b = _b
    }

    hex(): string {
        let s = "00000" + (this.r << 8 + this.g << 4 + this.b).toString(16)
        return s.substring(s.length - 6)
    }
}

class Tricolor {
    primary: Color
    secondary: Color
    tertiary: Color

    constructor (p: Color, s: Color, t: Color) {
        this.primary = p
        this.secondary = s
        this.tertiary = t
    }
}

const TriColorPreset: { [k: string]: Tricolor } = {
    blue: new Tricolor(
        new Color(0x4c, 0x97, 0xff),
        new Color(0x42, 0x80, 0xd7),
        new Color(0x33, 0x73, 0xcc)
    ),
    purple: new Tricolor(
        new Color(0x99, 0x66, 0xff),
        new Color(0x85, 0x5c, 0xd6),
        new Color(0x77, 0x4d, 0xcb)
    ),
    pink: new Tricolor(
        new Color(0xcf, 0x63, 0xcf),
        new Color(0xc9, 0x4f, 0xc9),
        new Color(0xa6, 0x3f, 0xa6)
    ),
    orange: new Tricolor(
        new Color(0xff, 0xab, 0x19),
        new Color(0xec, 0x9c, 0x13),
        new Color(0xcf, 0x8b, 0x17)
    ),
    yellow: new Tricolor(
        new Color(0xff, 0xbf, 0x00),
        new Color(0xe6, 0xac, 0x00),
        new Color(0xcc, 0x99, 0x00)
    ),
    cyan: new Tricolor(
        new Color(0x5c, 0xb1, 0xd6),
        new Color(0x47, 0xa8, 0xd1),
        new Color(0x2e, 0x8e, 0xb8)
    ),
    green: new Tricolor(
        new Color(0x0f, 0xbd, 0x8c),
        new Color(0x0d, 0xa5, 0x7a),
        new Color(0x0b, 0x8e, 0x69)
    ),
    grassgreen: new Tricolor(
        new Color(0x59, 0xc0, 0x59),
        new Color(0x46, 0xb9, 0x46),
        new Color(0x38, 0x94, 0x38)
    ),
    tangerine: new Tricolor(
        new Color(0xff, 0x8c, 0x1a),
        new Color(0xff, 0x80, 0x00),
        new Color(0xdb, 0x6e, 0x00)
    ),
    red: new Tricolor(
        new Color(0xff, 0x66, 0x80),
        new Color(0xff, 0x4d, 0x6a),
        new Color(0xff, 0x33, 0x55)
    )
}

const ColorPreset: { [k: string]: Color } = {
    text: new Color(0x57, 0x5e, 0x75)
}

export {
    Color,
    Tricolor,
    ColorPreset,
    TriColorPreset
}