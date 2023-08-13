import { ElementBase } from "../base"
import { Block, BlockShape } from "../block/block"
import { Drag, Interactor, SocketHint } from "./interact"
import { BlockPool } from "./block_pool"


class FlowGraph extends ElementBase<SVGSVGElement> {
    block_pool: BlockPool
    interact: { [k: string]: Interactor } = {}

    constructor () {
        super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        this.interact.SocketHint = new SocketHint(this)
        this.interact.Drag = new Drag(this)
        this.block_pool = new BlockPool(this.el)
    }

    create_block(shape: BlockShape): Block {
        let b = new Block(shape)
        this.register(b)
        this.block_pool.add_block(b)
        let drag = this.interact.Drag as Drag
        b.el.addEventListener('mousedown', (ev) => drag.onmousedown(b, ev))
        return b
    }
}

export {
    FlowGraph
}