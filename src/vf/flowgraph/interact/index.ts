import { FlowGraph } from "../flowgraph"
import { Drag } from "./drag"
import { LineDrag } from "./line-drag"
import { SocketHint } from "./socket-hint"

let drag: Drag
let socket_hint: SocketHint
let line_drag: LineDrag

function init(fg: FlowGraph): void {
    drag = new Drag(fg)
    socket_hint = new SocketHint(fg)
    line_drag = new LineDrag(fg)
}

export {
    init,
    drag,
    socket_hint,
    line_drag
}