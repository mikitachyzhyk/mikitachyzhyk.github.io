function centerCurrentPage() {
  const hash = window.location.hash
  const currentPage = document.querySelector(hash)

  if (currentPage && window.matchMedia('(min-width: 576px)').matches) {
    currentPage.scrollIntoView(top)
  }
}

document.addEventListener('scroll', centerCurrentPage)

/* Works section */

class PortfolioSlider {
  constructor(
    containerSelector,
    itemSelector,
    prevBtnSelector,
    nextBtnSelector
  ) {
    this.selectors = {}
    this.selectors.itemSelector = itemSelector
    this.selectors.prevBtnSelector = prevBtnSelector
    this.selectors.nextBtnSelector = nextBtnSelector

    this.container = document.querySelector(containerSelector)

    this.init()
  }

  isTouchDevice() {
    // https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    )
  }

  isItemHorizontallyVisible() {
    const item = this.container.firstElementChild
    if (!item) return false

    const itemRect = item.getBoundingClientRect()

    if (
      itemRect.top > document.documentElement.clientHeight ||
      itemRect.bottom < 0
    )
      return false

    return true
  }

  getCenteredElem() {
    const containerRect = this.container.getBoundingClientRect()
    const containerCenterX = Math.min(
      Math.max(this.container.offsetWidth / 2 + containerRect.left, 0),
      document.documentElement.clientWidth - 1
    )
    const containerCenterY = Math.min(
      Math.max(this.container.offsetHeight / 2 + containerRect.top, 0),
      document.documentElement.clientHeight - 1
    )

    const centeredElem = document.elementFromPoint(
      containerCenterX,
      containerCenterY
    )

    return centeredElem.closest(this.selectors.itemSelector)
  }

  disableNavBtns() {
    this.prevBtn.disabled = this.nextBtn.disabled = true
  }
  enableNavBtns() {
    this.prevBtn.disabled = this.nextBtn.disabled = false
  }

  updateSliderElems() {
    this.enableNavBtns()

    const centeredElem = this.getCenteredElem()
    const itemContainerHalfWidth =
      this.container.firstElementChild.clientWidth / 2

    for (let child of this.container.children) {
      child.classList.remove('active')
    }

    if (centeredElem) centeredElem.classList.add('active')

    if (
      !this.container.contains(centeredElem) ||
      this.container === centeredElem
    )
      return

    if (!centeredElem.previousElementSibling) {
      this.prevBtn.disabled = true
    }

    if (!centeredElem.nextElementSibling) {
      this.nextBtn.disabled = true
    }
  }

  dragHandler = (e) => {
    const offsetX = e.clientX - this.dragStartCoordinates.clientX
    const newPageXOffset = this.dragStartCoordinates.pageX - offsetX

    this.container.scrollLeft = newPageXOffset
  }

  initDragBehavior() {
    this.container.addEventListener('scroll', () => {
      this.updateSliderElems()
    })

    if (this.isTouchDevice()) return

    this.dragStartCoordinates = {
      clientX: 0,
      pageX: 0,
    }

    this.container.addEventListener('mousedown', (e) => {
      if (e.which !== 1) return
      if (e.target.tagName === 'A') return

      this.dragStartCoordinates.clientX = e.clientX
      this.dragStartCoordinates.pageX = this.container.scrollLeft
      document.addEventListener('mousemove', this.dragHandler)
      this.container.style.cursor = 'grabbing'
      this.container.style.userSelect = 'none'
    })

    document.addEventListener('mouseup', (e) => {
      if (e.which !== 1) return

      document.removeEventListener('mousemove', this.dragHandler)
      this.container.style.cursor = 'default'
      this.container.style.userSelect = ''
    })
  }

  navBtnsClickHandler(direction) {
    return () => {
      const centeredElem = this.getCenteredElem()
      const containerHalfWidth = this.container.offsetWidth / 2
      const itemContainerHalfWidth =
        this.container.firstElementChild.offsetWidth / 2
      const leftIndentFromWindowToItem =
        containerHalfWidth - itemContainerHalfWidth

      if (
        !this.container.contains(centeredElem) ||
        this.container === centeredElem
      )
        return

      if (direction === 'prev') {
        if (centeredElem.previousElementSibling) {
          this.container.scrollLeft =
            centeredElem.previousElementSibling.offsetLeft -
            leftIndentFromWindowToItem
        }
      } else if (direction === 'next') {
        if (centeredElem.nextElementSibling) {
          this.container.scrollLeft =
            centeredElem.nextElementSibling.offsetLeft -
            leftIndentFromWindowToItem
        }
      }
    }
  }

  initNavButtons() {
    this.prevBtn = document.querySelector(this.selectors.prevBtnSelector)
    this.nextBtn = document.querySelector(this.selectors.nextBtnSelector)

    this.prevBtn.addEventListener('click', this.navBtnsClickHandler('prev'))
    this.nextBtn.addEventListener('click', this.navBtnsClickHandler('next'))

    this.updateSliderElems()
  }

  onKeyDownHandler = (e) => {
    if (!this.isItemHorizontallyVisible()) return

    if (e.code === 'ArrowLeft') {
      this.navBtnsClickHandler('prev')()
    }

    if (e.code === 'ArrowRight') {
      this.navBtnsClickHandler('next')()
    }
  }

  initKeyboardControls() {
    document.addEventListener('keydown', this.onKeyDownHandler)
  }

  init() {
    this.initDragBehavior()
    this.initNavButtons()
    this.initKeyboardControls()

    document.addEventListener('scroll', () => {
      if (this.isItemHorizontallyVisible()) this.updateSliderElems()
      else this.disableNavBtns()
    })
  }
}

const portfolioSlider = new PortfolioSlider(
  '.worksList',
  '.worksItem',
  '#prev',
  '#next'
)
