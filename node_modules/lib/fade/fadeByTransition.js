import { onceAny } from '../event'
import Deferred from '../deferred'

const SUPPORTED = typeof TransitionEvent !== 'undefined'

export const fadeIn = el => {
  const defer = new Deferred
  if (SUPPORTED) {
    el.classList.add('transiting')
    el.offsetTop // reflow
    onceAny(el, 'transitionend webkitTransitionEnd', () => {
      el.classList.remove('transiting')
      defer.resolve()
    })
  } else {
    defer.resolve()
  }
  el.classList.add('in')
  return defer.promise
}
export const fade = el => {
  const defer = new Deferred
  if (!el.classList.contains('in')) return
  if (SUPPORTED) {
    el.classList.add('transiting')
    onceAny(el, 'transitionend webkitTransitionEnd', () => {
      el.classList.remove('transiting')
      defer.resolve()
    })
  } else {
    defer.resolve()
  }
  el.classList.remove('in')
  return defer.promise
}
