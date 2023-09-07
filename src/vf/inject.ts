import { flowgraph } from './flowgraph/flowgraph'
import BlockPreset from './preset/shape'
import { Point } from './type/point'

function inject(id: string): void {

    let block = new BlockPreset.text('jellyfish', { font: 'Consolas', text_size: 30 })
    flowgraph.create_block(block)

    let block_ = new BlockPreset.text('HelloWorld', { font: 'Aria', text_size: 50 })
    let bb = flowgraph.create_block(block_)
    bb.patch({
        position: new Point(100, 150)
    })

    
    document.getElementById(id)!.appendChild(flowgraph.el)

}

export default inject
