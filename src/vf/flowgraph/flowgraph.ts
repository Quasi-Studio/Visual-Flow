import { Block } from "./block"
import { BlockShape } from "../type/block"
import { BlockPool } from "./pool"
import { drag, init as interact_init } from "./interact"

class FlowGraph {
    el: SVGSVGElement
    block_pool: BlockPool

    constructor () {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.block_pool = new BlockPool()
        this.el.setAttribute('width', '100%')
        this.el.setAttribute('height', '1000px')
        this.el.addEventListener('click', (_) => {
            for (let blk of this.block_pool.blocks)
            blk.patch({ selected: false })
        })
    
        interact_init(this)

        this.el.addEventListener('mousemove', (ev) => {
            drag.onmousemove(ev)
        })
    }

    create_block(shape: BlockShape): Block {
        let b = new Block(shape)
        b.init(this.el)
        this.block_pool.add_block(b)
        b.el.addEventListener('mousedown', (ev) => drag.onmousedown(b, ev))
        b.el.addEventListener('mouseup', (ev) => drag.onmouseup(b, ev))
        return b
    }
}

export {
    FlowGraph
}