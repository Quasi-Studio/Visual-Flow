function inject(a: string) {
    console.log(a)
    let el = document.getElementById(a) as HTMLDivElement
    // el.style.background = '#123456'
    el.style.height = '100%'
    el.style.width = '100%'
    el.style.border = '1px solid black'

    register_toolkit(el)
}

function register_toolkit(el: HTMLDivElement) {
    let tk = document.createElement('div') as HTMLDivElement
    el.appendChild(tk)
    let button = document.createElement('button') as HTMLButtonElement
    tk.appendChild(button)
    button.textContent = '123'
    button.addEventListener('click', console.log)
}

export default inject