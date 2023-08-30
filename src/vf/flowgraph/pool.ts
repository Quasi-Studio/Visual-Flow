import { Block } from "./block"
import { Point } from "../type/point"
import { Guid, owner } from "../util/guid"

class BlockPool {
    blocks: Block[] = []

    constructor(public guid: Guid) {}

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
    id: Guid,
    used: boolean
}

class SocketPool {
    sockets: Socket[] = []
    
    constructor(public guid: Guid) {}

    add_socket(e: Socket): void {
        this.sockets.push(e)
    }

    remove_socket(e: Socket): void {
        this.sockets = this.sockets.filter((el) => el.id !== e.id)
    }

    remove_block(e: Block): void {
        this.sockets = this.sockets.filter((el) => owner(el.id) !== e.val.id.guid)
    }
}

class LinePool {
    
}

export {
    BlockPool,
    SocketPool,
    LinePool
}