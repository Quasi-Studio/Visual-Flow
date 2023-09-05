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
        return new SocketInfo(this.pos, this.face)
    }

    static eq(lhs: Socket, rhs: Socket) {
        return lhs.id.guid === rhs.id.guid
    }
}

class SocketInfo {
    constructor (public pos: Point, public face: Direction) {}

    static eq(lhs: SocketInfo, rhs: SocketInfo) {
        return Point.eq(lhs.pos, rhs.pos) && lhs.face === rhs.face
    }
}

export {
    Socket,
    SocketInfo
}