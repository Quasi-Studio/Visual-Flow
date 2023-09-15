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
        
        let start = this.start.abs_pos
        let end = this.end.abs_pos

        let dire_start = this.start.face
        let dire_end = this.start.face

        let ext_1 = Point.add(start, to_point(dire_start, 20))
        let ext_2 = Point.add(end, to_point(dire_end, 20))
        
        if (dire_start === dire_end || dire_start === reverse(dire_end)) {
            let dire = dire_start
            if (dire_start === dire_end) { // U type
                let dis = further_dis(dire, ext_1, ext_2)
                let tp1 = update_point(dire, ext_1, dis)
                let tp2 = update_point(dire, ext_2, dis)
                turning_point = [tp1, tp2]
            } else {
                if (get_point(rotate(dire), start) === get_point(rotate(dire), end)) { // - type
                    turning_point = []
                } else {
                    let orth = rotate(dire)
                    if (further(dire, end, start)) { // Z type
                        let mid = (get_point(orth, start) + get_point(orth, end)) / 2
                        let tp1 = update_point(orth, start, mid)
                        let tp2 = update_point(orth, end, mid)
                        turning_point = [tp1, tp2]
                    } else { // S type
                        let mid = (get_point(orth, start) + get_point(orth, end)) / 2
                        let tp1 = update_point(orth, ext_1, mid)
                        let tp2 = update_point(orth, ext_2, mid)
                        turning_point = [ext_1, tp1, tp2, ext_2]
                    }
                }
            }
        } else {
            if (further(dire_start, end, start) && further(dire_end, start, end)) { // L type
                let tp = update_point(dire_start, start, get_point(dire_start, end))
                turning_point = [tp]
            }
            if (further(dire_start, end, start) && ! further(dire_end, start, end)) { // ? type
                
            }
            if (! further(dire_start, end, start) && further(dire_end, start, end)) { // ? type
                
            }
            if (! further(dire_start, end, start) && ! further(dire_end, start, end)) { // C type
                let tp = update_point(dire_end, ext_1, get_point(dire_end, ext_2))
                turning_point = [ext_1, tp, ext_2]
            }
        }
        let ret = `m ${start.x} ${start.y}`
        for (let i of turning_point)
            ret += ` L ${i.x} ${i.y}`
        ret += ` L ${end.x} ${end.y}`
        return ret
    }
}

export {
    Line
}