import { DERICTIONSMAP, DIRECTIONS, StringKeyUScrollbar, StringKeyMouseEvent } from '../constants'

export default function bindDragThumbEvent(instance: StringKeyUScrollbar, el: HTMLDivElement, direction: DIRECTIONS) {
  let startMousePosition = 0
  let startScrollPosition = 0
  let originalOnSelectStart: ((this: GlobalEventHandlers, ev: Event) => any) | null = document.onselectstart
  const {
    getScroll,
    setScroll,
    page
  } = DERICTIONSMAP[direction]

  const onThumbDragStart = (e: StringKeyMouseEvent) => {
    e.stopPropagation()
    if (e.ctrlKey || [1, 2].includes(e.button)) return

    startMousePosition = e[page]
    startScrollPosition = instance[getScroll]()
    instance.setCursorDown(true)
    window.getSelection()?.removeAllRanges()
    originalOnSelectStart = document.onselectstart
    document.onselectstart = () => false
    document.addEventListener('mousemove', onThumbDragMove)
    document.addEventListener('mouseup', onThumbDragEnd)
  }

  const onThumbDragMove = (e: StringKeyMouseEvent) => {
    if (!instance.getCursorDown()) {
      return
    }
    const ratio = instance.getOption('ratio') as number
    const endMousePosition = e[page]
    instance[setScroll]((endMousePosition - startMousePosition) * ratio + startScrollPosition)
  }

  const onThumbDragEnd = () => {
    instance.setCursorDown(false)
    restoreOnselectstart()
    document.removeEventListener('mousemove', onThumbDragMove)
    document.removeEventListener('mouseup', onThumbDragEnd)
  }

  const restoreOnselectstart = () => {
    if (document.onselectstart !== originalOnSelectStart)
      document.onselectstart = originalOnSelectStart
  }

  el.addEventListener('mousedown', onThumbDragStart)
}
