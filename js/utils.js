const log = console.log.bind(console)

const e = selector => document.querySelector(selector)

const es = sel => document.querySelectorAll(sel)

const bindEvent = (element, eventName, callback) => element.addEventListener(eventName, callback)

const bindAll = (elements, eventName, callback) => elements.forEach(item => item.addEventListener(eventName, callback))

const removeClassAll = (className) => {
    const selector = '.' + className
    const elements = document.querySelectorAll(selector)
    if (elements) {
        elements.forEach(item => item.classList.remove(className))
    }    
}
