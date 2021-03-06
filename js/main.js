// 显示隐藏 footer
const toggleFooter = (index) => {
    const footer = e('.foot-wrapper')
    const show = footer.classList.contains('hide')
    if (index < 3 && show) {
        footer.classList.remove('hide')
    } else if (index === 3 && !show) {
        footer.classList.add('hide')
    }    
}


// 显示点击 nav
const goNavActive = (index) => {
    removeClassAll('nav-tag-active')
    es('.nav-tag')[index].classList.add('nav-tag-active')
    const style = e('.nav-line').style
    if (window.screen.width > 480) {
        style.transform = `translateX(${index * 2.4}rem)`
        return
    } else  if (index !== 0) {
        style.transform = `translateX(${index * 1.6}rem)`
    } else {
        style.transform = `translateX(.2rem)`
    }
    toggleFooter(index)
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
    const nextImage = '#slide-image-' + next
    const nextIndi = '#slide-indi-' + next
    removeClassAll('slide-image-acitve')
    removeClassAll('slide-indi-active')

    slide.style.transform = `translate(${next  * -100}vw)`


    e(nextImage).classList.add('slide-image-acitve')
    e(nextIndi).classList.add('slide-indi-active')

    slide.dataset.active = next
}

// 轮播图按键
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

// 下一个页面
const goNextPage= (content, index) => {
    if (index >= 0 && index < 4) {
        content.style.transform = `translateY(${index * (-100)}vh)`
        content.dataset.active = index
        goNavActive(index)
    }
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

// 轮播图下面小按钮
const bindSlideClick = () => {
    const indi = es('.slide-indi')
    const slide = e('.slide-wrapper')
    bindAll(indi, 'click', (event) => {
        const sel = event.target
        const index = Number(sel.dataset.index)
        handleNextImage(slide, index)
    })
}

// 播放器介绍切换
const bindReadClick = () => {
    const read = e('.page-2-read')
    const left = e('.page-2-left')
    const right = e('.page-2-right')
    bindEvent(read, 'click', (event) => {
        left.classList.toggle('display')
        right.classList.toggle('active')
    })
}

const getDirection = (sX, sY, eX, eY) => {
    const resultX = eX - sX
    const resultY = eY - sY
    const absX = Math.abs(resultX)
    const absY = Math.abs(resultY)
    let d = ''
    if (absX > absY && resultX > 0) {
        d = 'right'
    } else if (absX > absY && resultX < 0) {
        d = 'left'
    } else if (absX < absY && resultY > 0) {
        d = 'up'
    }  else if (absX < absY && resultY < 0) {
        d = 'down'
    }
    log('Direction', d)
    return d
}

// 手机控制页面
const handleMobliePage = (direction) => {
    const content = e('.content-container')
    const slide = e('.slide-wrapper')
    const active = Number(content.dataset.active)
    let index, next
    if (direction === 'up') {
        index = -1
        next = active + index
        goNextPage(content, next)
    } else if (direction === 'down') {
        index = 1
        next = active + index
        goNextPage(content, next)
    } else if (direction === 'left' && active === 1) {
        index = 1
        next = nextActive(slide, index)
        handleNextImage(slide, next)
    } else if (direction === 'right' && active === 1) {
        index = -1
        next = nextActive(slide, index)
        handleNextImage(slide, next)
    }
}

// 手机滑动
const bindScreenTouch = () => {
    let startX, startY
    const container = e('.container')
    bindEvent(container, 'touchstart', (event) => {        
        startX = event.touches[0].pageX
        startY = event.touches[0].pageY
    })

    bindEvent(container, 'touchmove', (event) => {
        event.preventDefault()
    })

    bindEvent(container, 'touchend', (event) => {
        const endX = event.changedTouches[0].pageX
        const endY = event.changedTouches[0].pageY
        const direction = getDirection(startX, startY, endX, endY)
        handleMobliePage(direction)
    })

}

// 绑定所有事件
const bindEvents = () => {
    bindNavClick()
    bindButtonClick()
    bindMousewheel()
    bindSlideClick()
    bindReadClick()
    bindScreenTouch()
}


// 入口
const __main = () => {
    bindEvents()
    fetchWeather()

}

__main()
