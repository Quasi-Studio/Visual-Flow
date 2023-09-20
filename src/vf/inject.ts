import { flowgraph } from './flowgraph/flowgraph'
import BlockPreset from './preset/shape'
import { Point } from './type/point'

function inject(id: string): void {

    let block = new BlockPreset.text('jellyfish', { font: 'Consolas', text_size: 30 })
    flowgraph.create_block(block)

    let block_ = new BlockPreset.text('HelloWorld', { font: 'Aria', text_size: 50 })
    let bb = flowgraph.create_block(block_)
    bb.patch({
        position: new Point(300, 150)
    })

    flowgraph.inject(document.getElementById(id) as HTMLDivElement)

}

export default inject
