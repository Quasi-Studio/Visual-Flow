import { ElementBase } from "../base"

class ToolKit extends ElementBase<HTMLDivElement> {
    
    constructor () {
        super(document.createElement('div'))
    }
}

export {
    ToolKit
}