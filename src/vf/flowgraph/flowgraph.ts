import { Block } from "./block"
import { BlockShape } from "../type/block"
import { BlockPool, SocketPool } from "./pool"
import { drag } from "./interact/drag"
import { Guid, root } from "../util/guid"

class FlowGraph {
    el: SVGSVGElement
    block_pool: BlockPool
    socket_pool: SocketPool
    guid: Guid = root

    constructor () {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        this.block_pool = new BlockPool(this.guid.alloc())
        this.socket_pool = new SocketPool(this.guid.alloc())
        this.el.setAttribute('width', '100%')
        this.el.setAttribute('height', '1000px')
    
    }

    create_block(shape: BlockShape): Block {
        let b = new Block(shape)
        b.init(this.el)
        this.block_pool.add_block(b)
        drag.init_block(b)
        return b
    }
}

let flowgraph = new FlowGraph()

export {
    FlowGraph,
    flowgraph
}