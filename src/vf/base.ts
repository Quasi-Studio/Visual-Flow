abstract class ElementBase<T extends Element> {
    el: T

    constructor (val: T) {
        this.el = val
    }

    register (elem: Element): void
    register (elem: ElementBase<T>): void

    register (elem: Element | ElementBase<T>): void {
        if (elem instanceof Element)
            this.el.appendChild(elem)
        else
            this.el.appendChild(elem.el)
    }
}

export {
    ElementBase
}