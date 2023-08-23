import { Block, BlockShape } from "../block/block"
import { Drag, Interactor, SocketHint } from "./interact"
import { BlockPool } from "./block_pool"

class FlowGraph {
    el: SVGSVGElement
    block_pool: BlockPool
    interact: { [k: string]: Interactor } = {}

    constructor () {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.interact.SocketHint = new SocketHint(this)
        this.interact.Drag = new Drag(this)
        this.block_pool = new BlockPool(this.el)

        this.el.setAttribute('width', '100%')
        this.el.setAttribute('height', '1000px')
    }

    create_block(shape: BlockShape): Block {
        let b = new Block(shape)
        b.init(this.el)
        this.block_pool.add_block(b)
        let drag = this.interact.Drag as Drag
        b.el.addEventListener('mousedown', (ev) => drag.onmousedown(b, ev))
        b.el.addEventListener('mouseup', (ev) => drag.onmouseup(b, ev))
        b.el.addEventListener('mousemove', (ev) => drag.onmousemove(ev))
        // setInterval(() => {
        //     b.patch({
        //         shape: {
        //             text: b.val.plugins.shape.text[0].text + '!'
        //         }
        //     })
        // }, 1000)
        
        return b
    }
}

export {
    FlowGraph
}