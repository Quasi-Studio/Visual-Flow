import { ElementBase } from "../base"

class ToolKit extends ElementBase<HTMLDivElement> {
    
    constructor () {
        super(document.createElement('div'))
    }
    
    initialize() {
        let lst = document.createElement('ul')
        lst.classList.add('mdui-list')
        this.register(lst)
        for (let i of item) {
            let _el = document.createElement('li')
            _el.textContent = i
            _el.classList.add('mdui-list-item')
            lst.appendChild(_el)
        }
    }
}

const item = ["123", "456", "567", "123", "456", "567", "123", "456", "567"]

export {
    ToolKit
}