import { Block } from "../block/block"
import { Point } from "../type/point"

class BlockPool {
    blocks: Block[] = []

    add_block(e: Block): void {
        this.blocks.push(e)
    }

    lift_block(e: Block): void {
        let i = this.blocks.indexOf(e)
        if (i === -1) {
            console.error("Block not found")
            return
        }
        e.el.parentNode?.appendChild(e.el)
    }
}

interface Socket {
    pos: Point,
    id: string
}

class SocketPool {
    sockets: Socket[] = []
}

class LinePool {
    
}

export {
    BlockPool,
    SocketPool,
    LinePool
}