abstract class ElementBase<T> {

    abstract el: HTMLElement | SVGElement
    constructor(public val: T) {}

    abstract init(a: HTMLElement | SVGElement): void

    abstract update(a: UpdateOption<T>): void

    patch(p: Partial<T>) {
        let updateOption: UpdateOption<T> = {} as any
        for (let key in p){
            this.val[key] = p[key]!
            updateOption[key] = true
        }
        this.update(updateOption)
    }

}

type UpdateOption<T> = {
    [k in keyof T]?: boolean
}
