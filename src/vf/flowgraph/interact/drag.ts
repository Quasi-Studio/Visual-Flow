import { Point } from "../../type/point"
import { Block } from "../block"
import { FlowGraph } from "../flowgraph"

class Drag {
    mouse_start: Point
    dragging = false

    constructor (private par: FlowGraph) {
        this.mouse_start = new Point(0, 0)
        
        this.par.el.addEventListener('click', (_) => {
            for (let blk of this.par.block_pool.blocks)
                blk.patch({ selected: false })
        })
        
        this.par.el.addEventListener('mousemove', (ev) => {
            this.onmousemove(ev)
        })
    }

    init_block(b: Block): void {
        b.el.addEventListener('mousedown', (ev) => this.onmousedown(b, ev))
        b.el.addEventListener('mouseup', (ev) => this.onmouseup(b, ev))
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
        if (ev.clientX == this.mouse_start.x && ev.clientY == this.mouse_start.y && this.dragging) {
            blk.patch({ selected: false })
            this.dragging = false
            return
        }
    }
}

export {
    Drag
}