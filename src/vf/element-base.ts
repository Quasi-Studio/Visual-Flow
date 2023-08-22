type Patch = {
    [key: string]: any
}

interface PluginConfig {
    update(p: Patch): string[]
}

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
    constructor(protected val: T) {}

    abstract init(par_el: HTMLElement | SVGElement): void

    update_batch(a: string[]): void {
        for (let i of a)
            this.update(i)
    }

    abstract update(key: string): void

    patch(p: { [key: string]: any }) {
        let updateOption: string[] = []
        for (let key in p){
            if (this.val.fields.hasOwnProperty(key)) {
                this.val.fields[key] = p[key]
                updateOption.push(key)
            }
            if (this.val.plugins && this.val.plugins.hasOwnProperty(key)) {
                updateOption = [...this.val.plugins[key].update(p[key]), ...updateOption]
            }
        }
        this.update_batch(updateOption)
    }
}