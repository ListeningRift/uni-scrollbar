declare const window : Window & {
  webkitRequestAnimationFrame?: any
  mozRequestAnimationFrame?: any
}

export const requestAnimFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }
