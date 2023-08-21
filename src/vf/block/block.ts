import { appendChild } from "../util/appendChild"
import { Point } from "../util/coordinate"
import { Color, Tricolor } from "./color"

interface BlockShape {
    // 其中的 pos 都是相对于 block 左上角的 offset
    path(): { path: string, color: Tricolor }
    text(): { text: string, pos: Point, color: Color, size: number, font: string }[]
    socket(): { pos: Point }[]
}

class Block {
    el: SVGSVGElement
    shape: BlockShape
    selected: boolean = false

    constructor (_shape: BlockShape) {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.el.setAttribute('x', '100px')
        this.el.setAttribute('y', '200px')
        this.shape = _shape
        this.init()
    }
    
    init(): void {
        let path_el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        let path = this.shape.path()
        path_el.setAttribute('d', path.path)
        path_el.setAttribute('fill', path.color.primary.hex())
        // path_el.setAttribute('stroke', path.color.secondary.hex())
        // path_el.setAttribute('stroke-width', '2px')
        appendChild(this, path_el)
        for (let i of this.shape.text()) {
            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            i.pos.apply(text, 'left-top')
            text.textContent = i.text
            text.setAttribute('font-family', i.font)
            text.setAttribute('font-size', i.size + 'px')
            text.setAttribute('fill', i.color.hex())
            appendChild(this, text)
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