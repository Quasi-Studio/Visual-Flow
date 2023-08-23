import BlockPreset from './block/preset/shape';
import { FlowGraph } from './flowgraph/flowgraph';
import mdui from "mdui"

function inject(id: string): void {
    let flowgraph = new FlowGraph()

    let block = new BlockPreset.text('jellyfish', { font: 'Consolas', text_size: 30 })
    flowgraph.create_block(block)

    document.getElementById(id)!.appendChild(flowgraph.el)

    mdui.mutation()
}

export default inject
