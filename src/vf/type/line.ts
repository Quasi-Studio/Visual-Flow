import { TricolorPreset } from "../preset/color"
import { Guid, root } from "../util/guid"
import { further, further_dis, get_point, reverse, rotate, to_point, update_point } from "./dire"
import { Point } from "./point"
import { Socket } from "./socket"

let line_guid = root.alloc()

class Line {

    start: Socket
    end: Socket
    id: Guid

    el: SVGPathElement

    static readonly color = TricolorPreset.cyan

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

        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        this.el.setAttribute('stroke', Line.color.primary.hex())
    }

    destructor () {
        this.start.used = false
        this.end.used = false
    }

    display() {
        this.el.setAttribute('d', this.path)
    }

    get path(): string {
        let turning_point: Point[] = []
        
        let ext_1 = Point.add(this.start.abs_pos, to_point(this.start.face, 20))
        let ext_2 = Point.add(this.end.abs_pos, to_point(this.end.face, 20))
        
        if (this.start.face === this.end.face || this.start.face === reverse(this.end.face)) {
            let dire = this.start.face
            if (this.start.face === this.end.face) { // U type
                let dis = further_dis(dire, ext_1, ext_2)
                let tp1 = update_point(dire, ext_1, dis)
                let tp2 = update_point(dire, ext_2, dis)
                turning_point = [tp1, tp2]
            } else {
                if (get_point(rotate(dire), this.start.abs_pos) === get_point(rotate(dire), this.end.abs_pos)) { // - type
                    turning_point = []
                } else {
                    let orth = rotate(dire)
                    if (further(dire, this.end.abs_pos, this.start.abs_pos)) { // Z type
                        let mid = (get_point(orth, this.start.abs_pos) + get_point(orth, this.end.abs_pos)) / 2
                        let tp1 = update_point(orth, ext_1, mid)
                        let tp2 = update_point(orth, ext_2, mid)
                        turning_point = [ext_1, tp1, tp2, ext_2]
                    } else { // S type


                    }
                }
            }
        } else {
            
        }
        let ret = `m ${this.start.abs_pos.x} ${this.start.abs_pos.y}`
        for (let i of turning_point)
            ret += ` L ${i.x} ${i.y}`
        ret += ` L ${this.end.abs_pos.x} ${this.end.abs_pos.y}`
        return ret
    }
}

export {
    Line
}