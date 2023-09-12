import { Block } from "./block"
import { BlockShape } from "../type/block"
import { block_pool } from "./pool"
import { drag } from "./interact/drag"
import { Guid, root } from "../util/guid"
import { socket_hint } from "./interact/socket-hint"

class FlowGraph {
    el: SVGSVGElement
    guid: Guid = root

    constructor () {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.el.setAttribute('width', '100%')
        this.el.setAttribute('height', '1000px')
    }
    
    init() {
        socket_hint.init()
        drag.init()
    }

    create_block(shape: BlockShape): Block {
        let b = new Block(shape)
        b.init(this.el)
        block_pool.add_block(b)
        drag.init_block(b)
        return b
    }
}

const flowgraph = new FlowGraph()
flowgraph.init()

export {
    flowgraph
}