
let item_on_hand = false
let current_object: HTMLDivElement;
let offsetX = 0, offsetY = 0
let mouseX = 0, mouseY = 0

function inject(a: string) {
    console.log(a)
    let el = document.getElementById(a) as HTMLDivElement
    // el.style.background = '#123456'
    el.style.height = '100%'
    el.style.width = '100%'
    el.style.border = '1px solid black'

    register_toolkit(el)

    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', (_: MouseEvent) => { item_on_hand = false })

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

function add_new_div(el: HTMLDivElement) {
    let div = document.createElement('div') as HTMLDivElement
    div.style.width = '120px'
    div.style.height = '80px'
    div.style.position = 'absolute'
    div.style.background = '#3366ff'
    div.style.top = '50px'
    div.style.left = '50px'
    div.addEventListener('mousedown', mousedownHandler)
    div.addEventListener('mousedown', (ev: MouseEvent) => { ev.preventDefault() })
    el.appendChild(div)
}


function mousedownHandler(this: HTMLDivElement, ev: MouseEvent){

    // 当前元素相对父级元素的偏移
    offsetX = this.offsetLeft
    offsetY = this.offsetTop

    // 鼠标的绝对位置
    mouseX = ev.clientX
    mouseY = ev.clientY
    
    item_on_hand = true
    current_object = this

    console.log('mouse', mouseX, mouseY)
    console.log('offset', offsetX, offsetY)
}

function mousemoveHandler(ev: MouseEvent){

    if(! item_on_hand){
        return;
    }

    console.log(ev)
    
    let mouseX_new = ev.clientX
    let mouseY_new = ev.clientY
    
    console.log('mouse new', mouseX_new, mouseY_new)

    let offsetX_new = offsetX + mouseX_new - mouseX
    let offsetY_new = offsetY + mouseY_new - mouseY

    console.log('offset new', offsetX_new, offsetY_new)
    
    // if (offsetX_new < 100) offsetX_new = 0
    // if (offsetY_new < 100) offsetY_new = 0

    if (offsetX_new < 50) offsetX_new = 50
    if (offsetX_new > 600) offsetX_new = 600
    if (offsetY_new < 50) offsetY_new = 50
    if (offsetY_new > 600) offsetY_new = 600

    if (Math.abs(offsetX_new - 300) < 50 && Math.abs(offsetY_new - 300) < 50) {
        offsetX_new = 300
        offsetY_new = 300
    }

    current_object.style.left = offsetX_new + 'px'
    current_object.style.top = offsetY_new + 'px'
}

export default inject