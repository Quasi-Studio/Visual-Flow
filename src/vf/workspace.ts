import { ElementBase } from './base'
import { ToolKit } from './toolkit/toolkit'
import { FlowGraph } from './flowgraph/flowgraph'
import mdui from "mdui"

class Workspace extends ElementBase<HTMLDivElement> {
    toolkit: ToolKit
    flowgraph: FlowGraph

    constructor (id: string) {
        super(document.getElementById(id) as HTMLDivElement)
        
        this.toolkit = new ToolKit()
        this.register(this.toolkit)
        
        this.flowgraph = new FlowGraph()
        this.register(this.flowgraph)

        this.layout()

        this.toolkit.initialize()
        mdui.mutation()
    }

    layout() {
        this.el.classList.add('mdui-container-fluid')
        this.toolkit.el.classList.add('mdui-col-xs-3')
        this.flowgraph.el.classList.add('mdui-col-xs-9')
        this.flowgraph.el.style.height = '1000px'
    }

}

export {
    Workspace
}