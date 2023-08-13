import { Point } from "./coordinate";

function intersect(el: SVGSVGElement, p: Point): boolean {
    for (let i of el.children) {
        let child_el = i as SVGGeometryElement

        if (! child_el.isPointInFill)
            continue

        let svg_point = el.createSVGPoint()
        svg_point.x = p.x - 100
        svg_point.y = p.y - 200

        if (child_el.isPointInFill(svg_point) || child_el.isPointInStroke(svg_point))
            return true
    }
    return false
}

export {
    intersect
}

SVGPoint