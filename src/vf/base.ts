interface Nestable {
    appendChild(a: Nestable): void
}

abstract class ElementBase<T extends Nestable> {
    el: T

    constructor (val: T) {
        this.el = val
    }

    // register (elem: Nestable): void
    // register<T extends Nestable> (elem: ElementBase<T>): void

    register<T extends Nestable> (elem: Nestable | ElementBase<T>): void {
        if (elem instanceof ElementBase)
            this.el.appendChild(elem.el)
        else
            this.el.appendChild(elem)
    }
}

export {
    ElementBase
}