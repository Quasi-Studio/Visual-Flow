type Patch = {
    [key: string]: any
}

type PluginConfig = (p: Patch) => string[]

interface BaseConfig {
    plugins?: {
        [key: string] : PluginConfig
    },
    fields: {
        [key: string]: any
    }
}

abstract class ElementBase<T extends BaseConfig> {

    abstract el: HTMLElement | SVGElement
    constructor(public val: T) {}

    abstract init(a: HTMLElement | SVGElement): void

    abstract update(a: string[]): void

    patch(p: { [key: string]: any }) {
        let updateOption: string[] = []
        for (let key in p){
            if (this.val.fields.hasOwnProperty(key)) {
                this.val.fields[key] = p[key]
                updateOption.push(key)
            }
            if (this.val.plugins && this.val.plugins.hasOwnProperty(key)) {
                updateOption = [...this.val.plugins[key](p[key]), ...updateOption]
            }
        }
        this.update(updateOption)
    }
}