import { ElementBase } from "../base"
import { Block } from "../block/block"
import BlockPreset from "../block/preset/shape"
import { Drag, SocketHint } from "./interact"
import { BlockPool } from "./block_pool"


class FlowGraph extends ElementBase<SVGSVGElement> {
    block_pool: BlockPool

    constructor () {
        super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        let b = new Block(new BlockPreset.text('jellyfish', { font: 'Consolas', text_size: 30 }))
        this.register(b)
        new SocketHint(this)
        new Drag(this)
        this.block_pool = new BlockPool()
        this.block_pool.add_block(b)
    }
}

export {
    FlowGraph
}