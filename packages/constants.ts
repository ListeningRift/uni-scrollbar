import { UScrollbar } from './UScrollbar'

export type OptionValue = number | boolean

export interface UScrollbarOptions {
  [key: string]: OptionValue

  /**
   * @description 是否使用原生浏览器滚动条
   * @default false
   */
  native: boolean

  /**
   * @description 内容区域滚动距离和滚动条滚动距离的比例，可以理解为滚动速度
   * @default 10
   */
  ratio: number,

  /**
   * @description thumb的最小高度/宽度（纵向即是高度，横向就是宽度）
   * 当使用设置的ratio滚动条的高度/宽度会小于滚动条的最小高度/宽度时会自动扩大ratio以保证最小高度/宽度
   * @default 8
   */
  thumbMinSize: number,

  /**
   * @description 滚动条是否会在鼠标离开滚动区域后自动消失
   * 为true时，滚动条会一直显示，不会在鼠标离开滚动区域后消失
   * 为false时，滚动条会在鼠标离开滚动区域后消失
   * @default false
   */
  alwaysShow: boolean
}

export type UScrollbarOptionsParams = Partial<UScrollbarOptions>

export interface StringKeyMouseEvent extends MouseEvent {
  [key: string]: any
}

export interface StringKeyUScrollbar extends UScrollbar {
  [key: string]: any
}

export const DEFAULTOPTIONS: UScrollbarOptions = {
  native: false,
  ratio: 10,
  thumbMinSize: 8,
  alwaysShow: false
}

export enum DIRECTIONS {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

type Attributes = 'offset' | 'getScroll' | 'setScroll' | 'thumbSize' | 'page' | 'getThumb'

export const DERICTIONSMAP: Record<DIRECTIONS, Record<Attributes, string>> = {
  vertical: {
    offset: 'offsetY',
    getScroll: 'getScrollTop',
    setScroll: 'setScrollTop',
    thumbSize: 'thumbHeight',
    getThumb: 'getThumbTop',
    page: 'pageY'
  },
  horizontal: {
    offset: 'offsetX',
    getScroll: 'getScrollLeft',
    setScroll: 'setScrollLeft',
    thumbSize: 'thumbWidth',
    getThumb: 'getThumbLeft',
    page: 'pageX'
  }
}
