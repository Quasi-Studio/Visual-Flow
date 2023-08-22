import { appendChild } from "../util/appendChild"
import { Point } from "../util/coordinate"
import { Color, Tricolor } from "./color"

interface BlockShape extends PluginConfig {
    // 其中的 pos 都是相对于 block 左上角的 offset
    get path(): { path: string, color: Tricolor }
    get text(): { text: string, pos: Point, color: Color, size: number, font: string }[]
    get socket(): { pos: Point }[]

}

class Block extends ElementBase<{
    plugins: {
        shape: BlockShape
    }
    fields: {
        selected: boolean,
        position: Point
    }
}> {
    el: SVGSVGElement = undefined as any
    path_el: SVGPathElement = undefined as any
    text_el: SVGTextElement[] = []

    constructor (shape: BlockShape) {
        super({
            plugins: {
                shape
            },
            fields: {
                selected: false,
                position: new Point(100, 200)
            }
        })
    }
    
    init(par_el: HTMLElement | SVGElement): void {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.el.setAttribute('x', this.val.fields.position.x + 'px')
        this.el.setAttribute('y', this.val.fields.position.y + 'px')
        appendChild(par_el, this.el)

        this.path_el = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        let path = this.val.plugins.shape.path
        this.path_el.setAttribute('d', path.path)
        this.path_el.setAttribute('fill', path.color.primary.hex())
        appendChild(this, this.path_el)

        for (let i of this.val.plugins.shape.text) {
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

    // update(a: string): void {
    //     if ()
    // }

}

export {
    Block
}

export type {
    BlockShape
}