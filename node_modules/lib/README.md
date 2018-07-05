# My Personal FE lib


## Util
- Deferred

## DOM
https://github.com/react-bootstrap/dom-helpers
- events(on/off/once/delegate)
- ready
  var domReady = function(callback) {
      document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
  }


## Graphic
- ECS simple framework(Apple GameplayKit)
- Vec2
- Constraints(from Verlet)


## TODO

### Passive scroll event
https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
- 浏览器会在 handler 跑完前不执行滚动
- 但即使只加了空的 handler 也会导致变慢！

```
onPassiveScroll(el, callback)

if (supportPassive) {
  // direct
} else {
  // 1. debouncing by raf
  // 2. scrollStart simulate by first scroll, then raf scrollTop
  // 3. scrollStart simulate by raf(detect scrollTop)
}
```
https://github.com/WICG/EventListenerOptions/blob/gh-pages/EventListenerOptions.polyfill.js
https://github.com/zzarcon/default-passive-events
https://www.html5rocks.com/en/tutorials/speed/animations/#debouncing-scroll-events
