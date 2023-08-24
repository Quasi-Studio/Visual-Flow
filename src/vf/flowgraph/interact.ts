import { Block } from "../block/block"
import { Tricolor } from "../type/color"
import { TricolorPreset } from "../preset/color"
import { appendChild } from "../util/appendChild"
import { Point } from "../type/point"
import { FlowGraph } from "./flowgraph"

abstract class Interactor {
    par: FlowGraph
    constructor(par: FlowGraph) {
        this.par = par
    }
}

class SocketHint extends Interactor {
    el: SVGSVGElement
    readonly color: Tricolor = TricolorPreset['tangerine']

    constructor (par: FlowGraph) {
        super(par)
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        // path.setAttribute('d', 'M 0 5 A 1 1 0 0 0 10 5 A 1 1 0 0 0 0 5 M 1 5 A 1 1 0 0 1 9 5 A 1 1 0 0 1 1 5 M 3 5 A 1 1 0 0 0 7 5 A 1 1 0 0 0 3 5 Z')
        path.setAttribute('d', 'm 0 0 v 5 a 1 1 0 0 0 10 0 a 1 1 0 0 0 -10 0 z')
        path.setAttribute('fill', this.color.primary.hex())
        this.el.appendChild(path)
        this.el.setAttribute('visibility', 'hidden')
        appendChild(par, this)
        par.el.addEventListener('mousemove', this.onmousemove.bind(this))
    }

    onmousemove(ev: MouseEvent): void {
        ev.preventDefault()
        let mouse = new Point(ev.offsetX, ev.offsetY)
        let owner: Block | undefined = undefined
        let min_dis: number = Number.MAX_VALUE
        let min_pos: Point | undefined = undefined
        for (let blk of this.par.block_pool.blocks) {
            let socket = blk.val.plugins.shape.socket(blk)
            for (let soc of socket) {
                let socket_pos = new Point(soc.pos.x + blk.val.fields.position.x - 5, soc.pos.y + blk.val.fields.position.y - 5)

                if (Point.distance(socket_pos, mouse) < min_dis) {
                    min_dis = Point.distance(socket_pos, mouse)
                    min_pos = socket_pos
                    owner = blk
                }
            }
        }
        if (owner && min_dis < 20) {
            min_pos!.apply(this.el, 'left-top')
            this.el.setAttribute('visibility', 'visible')
            this.el.parentNode?.appendChild(this.el)
        } else {
            this.el.setAttribute('visibility', 'hidden')
        }
    }
}

class Drag extends Interactor {
    mouse_start: Point
    dragging = false

    constructor (par: FlowGraph) {
        super(par)
        this.mouse_start = new Point(0, 0)
    }

    onmousedown(blk: Block, ev: MouseEvent): void {
        ev.preventDefault()
        let mouse = new Point(ev.clientX, ev.clientY)
        this.mouse_start = mouse
        if (! blk.val.fields.selected) {
            blk.patch({ selected: true })
            this.dragging = false
            return
        } else {
            this.dragging = true
        }
    }
    onmousemove(ev: MouseEvent): void {
        if (this.dragging) {
            for (let blk of this.par.block_pool.blocks)
                if (blk.val.fields.selected)
                    blk.patch({
                        position: new Point(
                            blk.val.fields.position.x + (ev.clientX - this.mouse_start.x),
                            blk.val.fields.position.y + (ev.clientY - this.mouse_start.y)
                        )
                    })
            this.mouse_start = new Point(ev.clientX, ev.clientY)
        }
        ev.preventDefault()
    }
    onmouseup(blk: Block, ev: MouseEvent): void {
        this.par.block_pool.lift_block(blk)
        ev.preventDefault()
        console.log('up', ev.clientX, ev.clientY)
        if (ev.clientX == this.mouse_start.x && ev.clientY == this.mouse_start.y && this.dragging) {
            blk.patch({ selected: false })
            this.dragging = false
            return
        }
    }
}

export {
    SocketHint,
    Drag,
    Interactor
}