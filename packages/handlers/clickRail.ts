import { DERICTIONSMAP, DIRECTIONS, StringKeyUScrollbar, StringKeyMouseEvent } from '../constants'

export default function bindClickRailEvent(instance: StringKeyUScrollbar, el: HTMLDivElement, direction: DIRECTIONS) {
  const {
    offset,
    getScroll,
    setScroll,
    getThumb,
    thumbSize
  } = DERICTIONSMAP[direction]

  const onRailClick = (e: StringKeyMouseEvent) => {
    e.stopPropagation()
    const ratio = instance.getOption('ratio') as number
    const newThumbPosition = e[offset] - (instance.getThumbSize()[thumbSize] / 2)
    instance[setScroll]((newThumbPosition - instance[getThumb]()) * ratio + instance[getScroll]())
  }

  el.addEventListener('mousedown', onRailClick)
}
