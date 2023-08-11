class Point {
    x: number
    y: number

    constructor (_x: number, _y: number) {
        this.x = _x
        this.y = _y
    }
    
    copy(a: Point): void {
        this.x = a.x
        this.y = a.y
    }

    apply(el: HTMLElement | SVGElement, option: 'left-top' | 'size'): void {
        if (el instanceof HTMLElement) {
            if (option == 'left-top') {
                el.style.left = this.x + 'px'
                el.style.top = this.y + 'px'
            } else if (option == 'size') {
                el.style.width = this.x + 'px'
                el.style.height = this.y + 'px'
            }
        } else if (el instanceof SVGElement) {
            if (option == 'left-top') {
                el.setAttribute('x', this.x + 'px')
                el.setAttribute('y', this.y + 'px')
            } else if (option == 'size') {
                el.setAttribute('width', this.x + 'px')
                el.setAttribute('height', this.y + 'px')
            }
        }
    }

    clone(): Point {
        return new Point(this.x, this.y)
    }
}

class Area {
    left_top: Point
    size: Point
    constructor (_left_top: Point, _size: Point) {
        this.left_top = _left_top.clone()
        this.size = _size.clone()
    }

    apply(el: SVGSVGElement | HTMLDivElement): void {
        this.size.apply(el, 'size')
        this.left_top.apply(el, 'left-top')
    }
}

export {
    Point,
    Area
}