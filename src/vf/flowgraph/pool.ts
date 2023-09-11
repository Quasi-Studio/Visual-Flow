import { Block } from "./block"
import { owner } from "../util/guid"
import { Socket } from "../type/socket"
import { Point } from "../type/point"
import { Line } from "../type/line"

class BlockPool {
    blocks: Block[] = []

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

let block_pool = new BlockPool()

class SocketPool {
    sockets: Socket[] = []

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

let socket_pool = new SocketPool()

class LinePool {
    lines: Line[] = []

    add_line(e: Line): void {
        this.lines.push(e)
    }

    remote_line(e: Line): void {
        this.lines = this.lines.filter((el) => el.id !== e.id)
    }
}

let line_pool = new LinePool()

export {
    block_pool,
    socket_pool,
    line_pool
}