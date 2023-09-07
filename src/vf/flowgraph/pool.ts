import { Block } from "./block"
import { Guid, owner } from "../util/guid"
import { Socket } from "../type/socket"
import { Point } from "../type/point"

class BlockPool {
    blocks: Block[] = []

    constructor(public guid: Guid) {}

    add_block(e: Block): void {
        this.blocks.push(e)
    }

    lift_block(e: Block): void {
        e.el.parentNode!.appendChild(e.el)
    }

    owner(e: Socket): Block | undefined {
        let ret: Block[] = this.blocks.filter((blk: Block) => blk.val.id.guid === owner(e.id))
        if (ret.length === 0)
            return undefined
        if (ret.length === 1)
            return ret[0]
        throw new Error("Multiple blocks found with same guid.")
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

    nearest(p: Point): { soc: Socket | undefined, dis: number } {
        let min_dis: number = Number.MAX_VALUE
        let ret: Socket | undefined = undefined
        for (let soc of this.sockets.filter((s) => ! s.used)) {
            let dis = Point.distance(p, soc.abs_pos)
            if (dis < min_dis) {
                min_dis = dis
                ret = soc
            }
        }
        return {
            soc: ret,
            dis: min_dis
        }
    }

}

export {
    BlockPool,
    SocketPool
}