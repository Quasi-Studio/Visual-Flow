import { Guid } from "../util/guid"
import { Direction } from "./dire"
import { Point } from "./point"

class Socket {
    pos: Point
    id: Guid
    used: boolean
    face: Direction

    constructor (info: { [key: string]: any}) {
        if (info.pos !== undefined)
            this.pos = info.pos as Point
        if (info.id !== undefined)
            this.id = info.id as Guid
        if (info.used !== undefined)
            this.used = info.used as boolean
        if (info.face !== undefined)
            this.face = info.face as Direction
    }

    get info(): SocketInfo {
        return {
            pos: this.pos,
            face: this.face
        }
    }

    static eq(lhs: Socket, rhs: Socket) {
        return lhs.id.guid === rhs.id.guid
    }
}

interface SocketInfo {
    pos: Point,
    face: Direction
}

export {
    Socket
}

export type {
    SocketInfo
}