import { Block } from "../block/block"
import { BlockShape } from "../type/block"
import { Drag, Interactor, SocketHint } from "./interact"
import { BlockPool } from "./pool"

class FlowGraph {
    el: SVGSVGElement
    block_pool: BlockPool
    interact: { [k: string]: Interactor } = {}

    constructor () {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.interact.SocketHint = new SocketHint(this)
        this.interact.Drag = new Drag(this)
        this.block_pool = new BlockPool()

        this.el.setAttribute('width', '100%')
        this.el.setAttribute('height', '1000px')
        this.el.addEventListener('click', (_) => {
            for (let blk of this.block_pool.blocks)
                blk.patch({ selected: false })
        })

        this.el.addEventListener('mousemove', (ev) => {
            (this.interact.Drag as Drag).onmousemove(ev)
        })
    }

    create_block(shape: BlockShape): Block {
        let b = new Block(shape)
        b.init(this.el)
        this.block_pool.add_block(b)
        let drag = this.interact.Drag as Drag
        b.el.addEventListener('mousedown', (ev) => drag.onmousedown(b, ev))
        b.el.addEventListener('mouseup', (ev) => drag.onmouseup(b, ev))
        return b
    }
}

export {
    FlowGraph
}