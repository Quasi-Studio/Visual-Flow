import { Block } from "../block/block";
import { Point } from "../util/coordinate";
import { intersect } from "../util/intersect";
import { FlowGraph } from "./flowgraph";

abstract class Interactor {
    par: FlowGraph
    constructor(par: FlowGraph) {
        this.par = par
    }
}

class SocketHint extends Interactor {
    el: SVGSVGElement

    constructor (par: FlowGraph) {
        super(par)
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.setAttribute('d', 'M 0 5 A 1 1 0 0 0 10 5 A 1 1 0 0 0 0 5 M 1 5 A 1 1 0 0 1 9 5 A 1 1 0 0 1 1 5 M 3 5 A 1 1 0 0 0 7 5 A 1 1 0 0 0 3 5 Z')
        path.setAttribute('fill', '#000000')
        this.el.appendChild(path)
        this.el.setAttribute('visibility', 'hidden')
        par.register(this.el)
        par.el.addEventListener('mousemove', this.onmousemove.bind(this))
    }

    onmousemove(ev: MouseEvent): void {
        let mouse = new Point(ev.offsetX, ev.offsetY)
        let owner: Block | undefined = undefined
        let min_dis: number = Number.MAX_VALUE
        let min_pos: Point | undefined = undefined
        for (let blk of this.par.block_pool.blocks) {
            let socket = blk.shape.socket()
            for (let soc of socket) {
                // let socket_pos = new Point(soc.pos.x + blk.el.clientLeft, soc.pos.y + blk.el.clientTop)
                let socket_pos = new Point(soc.pos.x + 100 - 5, soc.pos.y + 200 - 5) // i do not want to use but i have to test

                if (Point.distance(socket_pos, mouse) < min_dis) {
                    min_dis = Point.distance(socket_pos, mouse)
                    min_pos = socket_pos
                    owner = blk
                }
            }
        }
        if (owner && min_dis < 50) {
            min_pos!.apply(this.el, 'left-top')
            this.el.setAttribute('visibility', 'visible')
        } else {
            this.el.setAttribute('visibility', 'hidden')
        }
    }
}

class Drag extends Interactor {
    mouse_start: Point

    constructor (par: FlowGraph) {
        super(par)
        this.mouse_start = new Point(0, 0)
    }

    onmousedown(blk: Block, ev: MouseEvent): void {
        let mouse = new Point(ev.offsetX, ev.offsetY)
        if (! blk.selected) {
            blk.selected = true
            blk.rerender()
            return
        }
        this.mouse_start = mouse
    }
    onmousemove(ev: MouseEvent): void {

    }
    onmouseup(ev: MouseEvent): void {

    }
}

export {
    SocketHint,
    Drag,
    Interactor
}