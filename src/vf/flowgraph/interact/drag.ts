import { socket_hint } from "./socket-hint"
import { Point } from "../../type/point"
import { Block } from "../block"
import { flowgraph } from "../flowgraph"
import { block_pool } from "../pool"

class Drag {
    mouse_start: Point
    dragging = false
    
    init() {
        flowgraph.el.addEventListener('click', (_) => {
            for (let blk of block_pool.blocks)
                blk.patch({ selected: false })
        })
        
        flowgraph.el.addEventListener('mousemove', (ev) => {
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
        if (socket_hint.visibility === 'visible')
            return
        if (! blk.val.fields.selected) {
            blk.patch({ selected: true })
            this.dragging = false
            return
        } else {
            this.dragging = true
        }
    }
    onmousemove(ev: MouseEvent): void {
        ev.preventDefault()
        if (this.dragging) {
            for (let blk of block_pool.blocks)
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
        ev.preventDefault()
        if (socket_hint.visibility === 'visible')
            return
        block_pool.lift_block(blk)
        if (ev.clientX == this.mouse_start.x && ev.clientY == this.mouse_start.y && this.dragging) {
            blk.patch({ selected: false })
            this.dragging = false
            return
        }
    }
}

const drag = new Drag()

export {
    Drag,
    drag
}