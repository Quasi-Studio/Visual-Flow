import { ElementBase } from './base'
import { ToolKit } from './toolkit/toolkit'
import { FlowGraph } from './flowgraph/flowgraph'

class Workspace extends ElementBase<HTMLDivElement> {
    toolkit: ToolKit
    flowgraph: FlowGraph

    constructor (id: string) {
        super(document.getElementById(id) as HTMLDivElement)
        this.toolkit = new ToolKit()
        this.flowgraph = new FlowGraph()
    }
}

export {
    Workspace
}