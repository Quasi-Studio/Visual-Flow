import { ElementBase } from "../base"
import { Block } from "../block/block"
import BlockPreset from "../block/preset"

class FlowGraph extends ElementBase<SVGSVGElement> {
    
    constructor () {
        super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
        let b = new Block(BlockPreset["test"])
        this.register(b)
    }
}

export {
    FlowGraph
}