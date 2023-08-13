import { Block } from "../block/block"

class BlockPool {
    blocks: Block[]
    el: SVGSVGElement
    height: number[]
    
    cur_height: number

    constructor (el: SVGSVGElement) {
        this.blocks = []
        this.el = el
        this.height = []
        this.cur_height = 1
    }

    alloc_height(): number {
        return this.cur_height ++
    }

    add_block(e: Block): void {
        this.blocks.push(e)
        this.height.push(this.alloc_height())
    }

    lift_block(e: Block): void {
        let i = this.blocks.indexOf(e)
        if (i === -1) {
            console.error("Block not found")
            return
        }
        this.height[i] = this.alloc_height()
    }
}

export {
    BlockPool
}