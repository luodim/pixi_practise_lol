const _matches = Element.prototype.matches
  || Element.prototype.matchesSelector
  || Element.prototype.mozMatchesSelector
  || Element.prototype.msMatchesSelector
  || Element.prototype.oMatchesSelector
  || Element.prototype.webkitMatchesSelector

export function matches(element, selector) {
  return _matches.call(element, selector)
}

export function toArray(elements) {
  return Array.prototype.slice.call(elements)
}

export function closest(el, selector) {
  if (matches(el, selector)) {
    return el
  } else if (el.parentNode) {
    return closest(el.parentNode, selector)
  }
}

// ? document.querySelector el.querySelector 貌似也差不多？
// pros 利于压缩/可更换实现/自带toArray cons 不直观
export function find(selector, el = document) {
  return toArray(el.querySelectorAll(selector))
}
export function findOne(selector, el = document) {
  return el.querySelector(selector)
}

