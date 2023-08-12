import { Block } from "../block/block"

class BlockPool {
    blocks: Block[]

    constructor () {
        this.blocks = []
    }

    add_block(e: Block) {
        this.blocks.push(e)
    }
}

export {
    BlockPool
}