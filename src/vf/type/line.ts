import { Guid, root } from "../util/guid";
import { Socket } from "./socket";

let line_guid = root.alloc()

class Line {

    start: Socket
    end: Socket
    id: Guid

    constructor (info: { [key: string]: any }) {
        if (info.start !== undefined)
            this.start = info.start
        if (info.end !== undefined)
            this.end = info.end
        if (info.id !== undefined)
            this.id = info.id
        if (this.start.used || this.end.used)
            throw new Error("Socket already used")
        this.start.used = true
        this.end.used = true
        this.id = line_guid.alloc()
    }

    destructor () {
        this.start.used = false
        this.end.used = false
    }
}

export {
    Line
}