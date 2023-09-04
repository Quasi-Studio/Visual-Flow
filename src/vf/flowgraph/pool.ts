import { Block } from "./block"
import { Guid, owner } from "../util/guid"
import { Socket } from "../type/block"

class BlockPool {
    blocks: Block[] = []

    constructor(public guid: Guid) {}

    add_block(e: Block): void {
        this.blocks.push(e)
    }

    lift_block(e: Block): void {
        e.el.parentNode!.appendChild(e.el)
    }
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

    search_block(e: Block): Socket[] {
        return this.sockets.filter((el) => owner(el.id) === e.val.id.guid)
    }
}

export {
    BlockPool,
    SocketPool
}