import { TricolorPreset } from "../../preset/color"
import { Tricolor } from "../../type/color"
import { Point } from "../../type/point"
import { appendChild } from "../../util/appendChild"
import { flowgraph } from "../flowgraph"
import { socket_pool } from "../pool"

class SocketHint {
    el: SVGSVGElement
    readonly color: Tricolor = TricolorPreset['tangerine']
    visibility: 'visible' | 'hidden'

    static readonly radis = 20

    constructor () {
        
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        // path.setAttribute('d', 'M 0 5 A 1 1 0 0 0 10 5 A 1 1 0 0 0 0 5 M 1 5 A 1 1 0 0 1 9 5 A 1 1 0 0 1 1 5 M 3 5 A 1 1 0 0 0 7 5 A 1 1 0 0 0 3 5 Z')
        path.setAttribute('d', 'm 0 0 v 5 a 1 1 0 0 0 10 0 a 1 1 0 0 0 -10 0 z')
        path.setAttribute('fill', this.color.primary.hex())
        this.el.appendChild(path)
        this.el.setAttribute('visibility', 'hidden')
        this.visibility = 'hidden'
    }
    
    init() {
        appendChild(flowgraph, this)
        flowgraph.el.addEventListener('mousemove', this.onmousemove.bind(this))
    }

    onmousemove(ev: MouseEvent): void {
        ev.preventDefault()
        let mouse = new Point(ev.offsetX, ev.offsetY)

        let nearest = socket_pool.nearest(mouse)

        if (nearest.soc !== undefined && nearest.dis < SocketHint.radis) {
            let fixed_pos = Point.add(nearest.soc.abs_pos, new Point(-5, -5))
            fixed_pos.apply(this.el, 'left-top')
            this.el.setAttribute('visibility', 'visible')
            this.visibility = 'visible'
            this.el.parentNode?.appendChild(this.el) // raise to top
        } else {
            this.el.setAttribute('visibility', 'hidden')
            this.visibility = 'hidden'
        }

    }
}

let socket_hint = new SocketHint()

export {
    SocketHint,
    socket_hint
}