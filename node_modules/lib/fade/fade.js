// stage transition
document.addEventListener('animationend', ({ target }) => {
  target.classList.remove('animationstart')
}, false)
document.addEventListener('webkitAnimationEnd', ({ target }) => {
  target.classList.remove('animationstart')
}, false)

export const fadeIn = el => {
  el.classList.remove('fade')
}
export const fade = el => {
  el.classList.add('animationstart')
  el.classList.add('fade')
}
