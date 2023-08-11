import { ElementBase } from "../base";
import { Point } from "../util/coordinate";

interface BlockShape {
    // 其中的 pos 都是相对于 block 左上角的 offset
    path(): string
    text(): { text: string, pos: Point }[]
    socket(): { pos: Point }[]
}

class Block extends ElementBase<SVGSVGElement>{
    shape: BlockShape
    constructor (_shape: BlockShape) {
        super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        this.shape = _shape
        this.el.setAttribute('x', '100px')
        this.el.setAttribute('y', '200px')
        this.render()
    }
    
    render(): void {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute("d", this.shape.path())
        // path.setAttribute('stroke', 'black')
        // path.setAttribute('fill', 'transparent')
        this.register(path)
        for (let i of this.shape.text()) {
            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            i.pos.apply(text, 'left-top')
            text.textContent = i.text
            this.register(text)
        }
    }
}

export {
    Block
}

export type {
    BlockShape
}