import { requestAnimFrame } from './utils'
import { DEFAULTOPTIONS, DIRECTIONS } from './constants'
import bindDragThumbEvent from './handlers/dragThumb'
import bindClickRailEvent from './handlers/clickRail'
import type { UScrollbarOptions, UScrollbarOptionsParams, OptionValue } from './constants'

export class UScrollbar {
  private options: UScrollbarOptions
  private wrapperEl: HTMLElement

  private scrollVerticalRailEl: HTMLDivElement = document.createElement('div')
  private scrollVerticalThumbEl: HTMLDivElement = document.createElement('div')
  private scrollHorizontalRailEl: HTMLDivElement = document.createElement('div')
  private scrollHorizontalThumbEl: HTMLDivElement = document.createElement('div')

  private cursorDown = false

  constructor(el: HTMLElement, options: UScrollbarOptionsParams) {
    this.wrapperEl = el
    this.options = Object.assign(DEFAULTOPTIONS, options)
    if (!this.options.native) {
      this.initScrollbar()
    } else {
      this.wrapperEl.classList.add('uni-scrollbar-wrapper__native')
    }
  }

  /**
   * @private
   */
  initScrollbar() {
    this.wrapperEl.classList.add('uni-scrollbar-wrapper')

    this.scrollVerticalRailEl.classList.add('uni-scrollbar-rail')
    this.scrollVerticalRailEl.classList.add('is-vertical')
    this.scrollVerticalThumbEl.classList.add('uni-scrollbar-thumb')

    this.scrollHorizontalRailEl.classList.add('uni-scrollbar-rail')
    this.scrollHorizontalRailEl.classList.add('is-horizontal')
    this.scrollHorizontalThumbEl.classList.add('uni-scrollbar-thumb')

    if (!(this.options.alwaysShow && this.wrapperEl.scrollHeight > this.wrapperEl.clientHeight)) {
      this.scrollVerticalRailEl.style.display = 'none'
    }
    if (!(this.options.alwaysShow && this.wrapperEl.scrollWidth > this.wrapperEl.clientWidth)) {
      this.scrollHorizontalRailEl.style.display = 'none'
    }

    if (!this.options.alwaysShow) {
      this.autoShow()
    }

    this.setRailAndThumb()
    this.wrapperEl.addEventListener('scroll', () => {
      this.setRailAndThumb()
    })

    bindDragThumbEvent(this, this.scrollVerticalRailEl, DIRECTIONS.vertical)
    bindDragThumbEvent(this, this.scrollHorizontalRailEl, DIRECTIONS.horizontal)
    bindClickRailEvent(this, this.scrollVerticalRailEl, DIRECTIONS.vertical)
    bindClickRailEvent(this, this.scrollHorizontalRailEl, DIRECTIONS.horizontal)

    this.scrollVerticalRailEl.appendChild(this.scrollVerticalThumbEl)
    this.scrollHorizontalRailEl.appendChild(this.scrollHorizontalThumbEl)
    this.wrapperEl.appendChild(this.scrollVerticalRailEl)
    this.wrapperEl.appendChild(this.scrollHorizontalRailEl)
  }

  /**
   * @private
   */
  autoShow() {
    this.wrapperEl.addEventListener('mouseenter', () => {
      if (this.wrapperEl.scrollHeight > this.wrapperEl.clientHeight) {
        this.scrollVerticalRailEl.style.display = ''
      }
      if (this.wrapperEl.scrollWidth > this.wrapperEl.clientWidth) {
        this.scrollHorizontalRailEl.style.display = ''
      }
    })

    this.wrapperEl.addEventListener('mouseleave', () => {
      if (this.wrapperEl.scrollHeight > this.wrapperEl.clientHeight && !this.cursorDown) {
        this.scrollVerticalRailEl.style.display = 'none'
      }
      if (this.wrapperEl.scrollWidth > this.wrapperEl.clientWidth && !this.cursorDown) {
        this.scrollHorizontalRailEl.style.display = 'none'
      }
    })
  }

  /**
   * @private
   */
  setRailAndThumb() {
    const { thumbHeight, thumbWidth } = this.getThumbSize()
    this.scrollVerticalRailEl.style.top = this.getScrollTop().toFixed(2) + 'px'
    this.scrollVerticalRailEl.style.right = '-' + this.getScrollLeft().toFixed(2) + 'px'
    this.scrollVerticalThumbEl.style.height = thumbHeight + 'px'
    this.scrollVerticalThumbEl.style.top = this.getScrollTop() / this.options.ratio + 'px'

    this.scrollHorizontalRailEl.style.left = this.getScrollLeft().toFixed(2) + 'px'
    this.scrollHorizontalRailEl.style.bottom = '-' + this.getScrollTop().toFixed(2) + 'px'
    this.scrollHorizontalThumbEl.style.width = thumbWidth + 'px'
    this.scrollHorizontalThumbEl.style.left = this.getScrollLeft() / this.options.ratio + 'px'
  }

  /**
   * @private
   */
  getThumbSize(): Record<string, number> {
    let { ratio, thumbMinSize } = this.options
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = this.wrapperEl
    let thumbHeight = clientHeight - ((scrollHeight - clientHeight) / ratio)
    if (thumbHeight < thumbMinSize) {
      thumbHeight = thumbMinSize
      ratio = (scrollHeight - clientHeight) / (clientHeight - thumbHeight)
    }
    const ratioCached = ratio

    let thumbWidth = clientWidth - ((scrollWidth - clientWidth) / ratio)
    if (thumbWidth < thumbMinSize) {
      thumbWidth = thumbMinSize
      ratio = (scrollWidth - clientWidth) / (clientWidth - thumbWidth)
    }

    if (ratio > ratioCached) {
      thumbHeight = clientHeight - ((scrollHeight - clientHeight) / ratio)
    }

    this.updateOption({
      ratio
    })
    return {
      thumbHeight,
      thumbWidth
    }
  }

  /**
   * @private
   */
  setCursorDown(value: boolean) {
    this.cursorDown = value
  }

  /**
   * @private
   */
  getCursorDown(): boolean {
    return this.cursorDown
  }

  getOption(key: string): OptionValue {
    return this.options[key]
  }

  getTargetElement(): HTMLElement {
    return this.wrapperEl
  }

  updateOption(options: UScrollbarOptionsParams) {
    Object.assign(this.options, options)
  }

  getScrollTop(): number {
    return this.wrapperEl.scrollTop
  }

  getScrollLeft(): number {
    return this.wrapperEl.scrollLeft
  }

  getThumbTop(): number {
    return Number(this.scrollVerticalThumbEl.style.top.replace('px', ''))
  }

  getThumbLeft(): number {
    return Number(this.scrollVerticalThumbEl.style.left.replace('px', ''))
  }

  setScrollTo(x: number, y: number) {
    this.wrapperEl.scrollTo(x, y)
  }

  setScrollTop(to: number, duration?: number) {
    if (!duration || duration < 0) {
      this.setScrollTo(this.getScrollLeft(), to)
      return
    }
    const diff = to - this.getScrollTop()
    if (diff === 0) return
    const step = diff / duration * 10
    requestAnimFrame(() => {
      if (Math.abs(step) > Math.abs(diff)) {
        this.setScrollTo(this.getScrollLeft(), this.getScrollTop() + diff)
        return
      }
      this.setScrollTo(this.getScrollLeft(), this.getScrollTop() + step)
      if ((diff > 0 && this.getScrollTop() >= to) || (diff < 0 && this.getScrollTop() <= to)) {
        return
      }
      this.setScrollTop(to, duration - 16)
    })
  }

  setScrollLeft(to: number, duration: number) {
    this.setScrollTo(to, this.getScrollTop())
    if (!duration || duration < 0) {
      this.setScrollTo(to, this.getScrollTop())
      return
    }
    const diff = to - this.getScrollLeft()
    if (diff === 0) return
    const step = diff / duration * 10
    requestAnimFrame(() => {
      if (Math.abs(step) > Math.abs(diff)) {
        this.setScrollTo(this.getScrollLeft() + diff, this.getScrollTop())
        return
      }
      this.setScrollTo(this.getScrollLeft(), this.getScrollTop() + step)
      if ((diff > 0 && this.getScrollLeft() >= to) || (diff < 0 && this.getScrollLeft() <= to)) {
        return
      }
      this.setScrollLeft(to, duration - 16)
    })
  }
}
