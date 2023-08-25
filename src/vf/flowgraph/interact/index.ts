import { FlowGraph } from "../flowgraph"
import { Drag } from "./drag"
import { SocketHint } from "./socket-hint"

let drag: Drag
let socket_hint: SocketHint

function init(fg: FlowGraph): void {
    drag = new Drag(fg)
    socket_hint = new SocketHint(fg)
}

export {
    init,
    drag,
    socket_hint
}