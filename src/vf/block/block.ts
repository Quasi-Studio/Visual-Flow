import { appendChild } from "../util/appendChild"
import { Point } from "../util/coordinate"
import { Color, Tricolor } from "./color"

interface BlockShape {
    // 其中的 pos 都是相对于 block 左上角的 offset
    path(): { path: string, color: Tricolor }
    text(): { text: string, pos: Point, color: Color, size: number, font: string }[]
    socket(): { pos: Point }[]
}

class Block extends ElementBase<{
    selected: boolean,
    shape: BlockShape
}> {
    el: SVGSVGElement = undefined as any
    path_el: SVGPathElement = undefined as any
    text_el: SVGTextElement[] = []

    constructor (shape: BlockShape) {
        super({
            selected: false,
            shape
        })
    }
    
    init(): void {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.el.setAttribute('x', '100px')
        this.el.setAttribute('y', '200px')

        this.path_el = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        let path = this.val.shape.path()
        this.path_el.setAttribute('d', path.path)
        this.path_el.setAttribute('fill', path.color.primary.hex())
        appendChild(this, this.path_el)

        for (let i of this.val.shape.text()) {
            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            i.pos.apply(text, 'left-top')
            text.textContent = i.text
            text.setAttribute('font-family', i.font)
            text.setAttribute('font-size', i.size + 'px')
            text.setAttribute('fill', i.color.hex())
            appendChild(this, text)
            this.text_el.push(text)
        }
    }

    // update(option: )

}

export {
    Block
}

export type {
    BlockShape
}