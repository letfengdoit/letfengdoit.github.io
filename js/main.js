
// 显示点击 nav
const goNavActive = (index) => {
    removeClassAll('nav-tag-active')
    es('.nav-tag')[index].classList.add('nav-tag-active')
    // 移动 nav-line
    // const index = Number(self.dataset.index)
    // const line = e('.nav-line')
    e('.nav-line').style.transform = `translateX(${index * 2.5}rem)`
}


// nav 点击事件
const bindNavClick = () => {
    const navAll = es('.nav-tag')
    const content = e('.content-container')
    bindAll(navAll, 'click', (event) => {
        const sel = event.target
        const index = Number(sel.dataset.index)
        goNextPage(content, index)
    })
}

// 计算下一个页面编号
const nextActive = (element, offset) => {
    const list = Number(element.dataset.list)
    const active = Number(element.dataset.active)
    const next =  (active + offset + list) % list
    return next
}

// 轮播图转动
const handleNextImage = (slide, next) => {

    // const images = Number(slide.dataset.list)
    // const active = Number(slide.dataset.active)
    // const next =  (active + offset + images) % images
    const nextImage = '#slide-image-' + next
    const nextIndi = '#slide-indi-' + next
    log('nextIndi', nextIndi)
    removeClassAll('slide-image-acitve')
    removeClassAll('slide-indi-active')

    slide.style.transform = `translate(${next  * -100}vw)`


    e(nextImage).classList.add('slide-image-acitve')
    e(nextIndi).classList.add('slide-indi-active')

    slide.dataset.active = next
}

const bindButtonClick =() => {
    const buttons = es('.slide-button')
    const slide = e('.slide-wrapper')
    bindAll(buttons, 'click', (event) => {
        const sel = event.target
        const offset = Number(sel.dataset.offset)
        const next = nextActive(slide, offset)
        handleNextImage(slide, next)
    })
}

const goNextPage= (content, index) => {
    if (index >= 0 && index < 4) {
        content.style.transform = `translateY(${index * (-100)}vh)`
        content.dataset.active = index
        goNavActive(index)
    }
    // if (index === 3) {
    //
    // }

}

// 鼠标滚轮滚动
const bindMousewheel = () => {
    const body = e('body')
    const content = e('.content-container')
    bindEvent(body, 'mousewheel', (event) => {
        // 取消鼠标滚轮默认效果
        event.preventDefault()
        let index = Number(content.dataset.active)
        // delta 为正向下，为负向上
        if (event.deltaY > 0) {
            index += 1
            goNextPage(content, index)
        } else {
            index -= 1
            goNextPage(content, index)
        }
    })
}

const bindSlideClick = () => {
    const indi = es('.slide-indi')
    const slide = e('.slide-wrapper')
    bindAll(indi, 'click', (event) => {
        const sel = event.target
        const index = Number(sel.dataset.index)
        handleNextImage(slide, index)
    })
}

// 绑定所有事件
const bindEvents = () => {
    bindNavClick()
    bindButtonClick()
    bindMousewheel()
    bindSlideClick()
}


// 入口
const __main = () => {
    bindEvents()
    fetchWeather()
}

__main()
