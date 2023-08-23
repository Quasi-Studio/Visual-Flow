import BlockPreset from './block/preset/shape';
import { FlowGraph } from './flowgraph/flowgraph';
import mdui from "mdui"
import { Point } from './util/coordinate';

function inject(id: string): void {
    let flowgraph = new FlowGraph()

    let block = new BlockPreset.text('jellyfish', { font: 'Consolas', text_size: 30 })
    flowgraph.create_block(block)

    let block_ = new BlockPreset.text('HelloWorld', { font: 'Aria', text_size: 50 })
    let bb = flowgraph.create_block(block_)
    bb.patch({
        position: new Point(100, 150)
    })

    
    document.getElementById(id)!.appendChild(flowgraph.el)

    mdui.mutation()
}

export default inject
