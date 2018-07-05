import { matches } from './dom'

export function on(element, eventName, handler) {
  element.addEventListener(eventName, handler, false)

  return () => {
    element.removeEventListener(eventName, handler, false)
  }
}

export function off(element, eventName, handler) {
  element.removeEventListener(eventName, handler, false)
}

export function once(element, eventName, handler) {
  on(element, eventName, function fn(evt) {
    off(element, eventName, fn)
    handler.call(this, evt)
  })
}

// https://github.com/rails/rails/blob/11341fd/actionview/app/assets/javascripts/rails-ujs/utils/event.coffee#L34
export function delegate(element, selector, eventType, handler) {
  on(element, eventType, function (e) {
    var target
    target = e.target
    while (!(!(target instanceof Element) || matches(target, selector))) {
      target = target.parentNode
    }
    if (target instanceof Element && handler.call(target, e, target) === false) {
      e.preventDefault()
      return e.stopPropagation()
    }
  })
}
export function live(selector, eventType, handler) {
  delegate(document, selector, eventType, handler)
}


let CustomEvent = window.CustomEvent
if (typeof CustomEvent !== 'function') {
  CustomEvent = (name, params) => {
    const event = document.createEvent('CustomEvent')
    event.initCustomEvent(name, params.bubbles, params.cancelable, params.detail)
    return event
  }
  CustomEvent.prototype = window.Event.prototype
}

export const fire = function(el, name, data) {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: data,
  })
  el.dispatchEvent(event)
  return !event.defaultPrevented
}


// extras
export function onceAny(element, eventNamesString, handler) {
  const eventNames = eventNamesString.split(/\s+/)
  function fn(evt) {
    eventNames.forEach(eventName => {
      off(element, eventName, fn)
    })
    handler.call(this, evt)
  }
  eventNames.forEach(eventName => {
    on(element, eventName, fn)
  })
}
