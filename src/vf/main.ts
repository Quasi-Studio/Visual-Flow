class Line {

    el: SVGLineElement

    startX: number
    startY: number
    endX: number
    endY: number

    constructor() {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        svg_el.appendChild(this.el)
        this.el.setAttribute('stroke-width', '5')
        this.el.style.position = 'absolute'
        this.el.setAttribute('stroke', 'black')
        this.startX = this.startY = this.endX = this.endY = 0
    }

    render() {
        this.el.setAttribute('x1', this.startX.toString())
        this.el.setAttribute('y1', this.startY.toString())
        this.el.setAttribute('x2', this.endX.toString())
        this.el.setAttribute('y2', this.endY.toString())
    }
}


let item_on_hand = false
let line_on_hand = false
let current_object: HTMLDivElement
let current_line: Line
let offsetX = 0, offsetY = 0
let mouseX = 0, mouseY = 0

let div_list: HTMLDivElement[] = []
let svg_el: SVGSVGElement
let line_list: Line[] = []

function inject(a: string) {
    console.log(a)
    let el = document.getElementById(a) as HTMLDivElement
    // el.style.background = '#123456'
    el.style.height = '100%'
    el.style.width = '100%'
    el.style.border = '1px solid black'

    register_toolkit(el)

    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', (_: MouseEvent) => { item_on_hand = line_on_hand = false })
    document.addEventListener('mousedown', mousedownHandler_line)

    svg_el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg_el.style.position = 'absolute'
    svg_el.style.top = '0px'
    svg_el.style.left = '0px'
    svg_el.style.height = '10000px'
    svg_el.style.width = '10000px'
    el.appendChild(svg_el)
}

function register_toolkit(el: HTMLDivElement) {
    let tk = document.createElement('div') as HTMLDivElement
    el.appendChild(tk)
    let button = document.createElement('button') as HTMLButtonElement
    tk.appendChild(button)
    button.textContent = '123'
    button.addEventListener('click', (_) => {
        add_new_div(el)
    })
}

function rand_color(): string {
    let str = "00000" + Math.floor(Math.random() * (1 << 24)).toString(16)
    return '#' + str.substring(str.length - 6)
}

function add_new_div(el: HTMLDivElement) {
    let div = document.createElement('div') as HTMLDivElement
    div.style.width = '120px'
    div.style.height = '80px'
    div.style.position = 'absolute'
    div.style.background = rand_color()
    div.style.top = '50px'
    div.style.left = '50px'
    div.addEventListener('mousedown', mousedownHandler)
    div.addEventListener('mousedown', (ev: MouseEvent) => { ev.preventDefault() })
    el.appendChild(div)
    div_list.push(div)
}

function mousedownHandler(this: HTMLDivElement, ev: MouseEvent){

    console.log('Enter123')

    // 当前元素相对父级元素的偏移
    offsetX = this.offsetLeft
    offsetY = this.offsetTop

    // 鼠标的绝对位置
    mouseX = ev.clientX
    mouseY = ev.clientY
    
    item_on_hand = true
    current_object = this

    // console.log('mouse', mouseX, mouseY)
    // console.log('offset', offsetX, offsetY)
}

function mousemoveHandler(ev: MouseEvent){

    if(! item_on_hand && ! line_on_hand) {
        return
    }

    if (line_on_hand) {
        current_line.endX = ev.clientX
        current_line.endY = ev.clientY
        current_line.render()
        return
    }

    // console.log(ev)
    
    let mouseX_new = ev.clientX
    let mouseY_new = ev.clientY
    
    // console.log('mouse new', mouseX_new, mouseY_new)

    let offsetX_new = offsetX + mouseX_new - mouseX
    let offsetY_new = offsetY + mouseY_new - mouseY

    // console.log('offset new', offsetX_new, offsetY_new)
    
    // if (offsetX_new < 100) offsetX_new = 0
    // if (offsetY_new < 100) offsetY_new = 0

    if (offsetX_new < 30) offsetX_new = 30
    if (offsetX_new > 850) offsetX_new = 850
    if (offsetY_new < 30) offsetY_new = 30
    if (offsetY_new > 700) offsetY_new = 700

    // if (Math.abs(offsetX_new - 300) < 50 && Math.abs(offsetY_new - 300) < 50) {
    //     offsetX_new = 300
    //     offsetY_new = 300
    // }

    for (let i of div_list) {
        if (Math.abs(offsetX_new - i.offsetLeft - 120) < 50
         && Math.abs(offsetY_new - i.offsetTop) < 50) {
            offsetX_new = i.offsetLeft + 120
            offsetY_new = i.offsetTop
            break
         }
        if (Math.abs(offsetX_new - i.offsetLeft) < 50
         && Math.abs(offsetY_new - i.offsetTop - 80) < 50) {
            offsetX_new = i.offsetLeft
            offsetY_new = i.offsetTop + 80
            break
         }
         if (Math.abs(offsetX_new - i.offsetLeft + 120) < 50
          && Math.abs(offsetY_new - i.offsetTop) < 50) {
             offsetX_new = i.offsetLeft - 120
             offsetY_new = i.offsetTop
             break;
          }
         if (Math.abs(offsetX_new - i.offsetLeft) < 50
          && Math.abs(offsetY_new - i.offsetTop + 80) < 50) {
             offsetX_new = i.offsetLeft
             offsetY_new = i.offsetTop - 80
             break
          }
    }

    current_object.style.left = offsetX_new + 'px'
    current_object.style.top = offsetY_new + 'px'
}

function mousedownHandler_line(ev: MouseEvent) {
    console.log('Enter')
    let l = new Line()
    line_list.push(l)
    current_line = l
    line_on_hand = true
    l.startX = l.endX = ev.clientX
    l.startY = l.endY = ev.clientY
}

export default inject