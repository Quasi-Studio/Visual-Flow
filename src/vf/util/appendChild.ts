
// append b to a
function appendChild(
    a: HTMLElement | SVGElement | {
        el: HTMLElement | SVGElement;
    },
    b: HTMLElement | SVGElement | {
        el: HTMLElement | SVGElement;
    }
) {
    ((a instanceof HTMLElement || a instanceof SVGElement) ? a : a.el).appendChild(
        (b instanceof HTMLElement || b instanceof SVGElement) ? b : b.el
    )
}

export {
    appendChild
}