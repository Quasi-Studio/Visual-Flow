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

    apply(el: SVGSVGElement | HTMLDivElement) {
        el.style.width = this.size.x + 'px'
        el.style.height = this.size.y + 'px'
        el.style.left = this.left_top.x + 'px'
        el.style.top = this.left_top.y + 'px'
    }
}

export {
    Point,
    Area
}