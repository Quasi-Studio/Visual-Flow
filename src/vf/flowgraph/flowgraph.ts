import { ElementBase } from "../base"
import { Block } from "../block/block"
import BlockPreset from "../block/preset/shape"

class FlowGraph extends ElementBase<SVGSVGElement> {
    
    constructor () {
        super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        let b = new Block(new BlockPreset.text('HellyH'))
        this.register(b)
    }
}

export {
    FlowGraph
}