// 设计尺寸
export let dw = 750
export let dh = 1332

// 设计尺寸宽高比
let designAspectRatio = dw / dh

// 缩放比例
let scale = 1

// canvas尺寸适配计算
export const canvasSizeControl = (app) => {
  if (!app) return
  scaleCalculator()
  app.renderer.resize(dw / scale, dh / scale);
  console.log('w is ' + app.renderer.view.width + ' h is ' + app.renderer.view.height)
  canvasToCenter(app)
}

// 缩放比例计算器
function scaleCalculator() {
  let iW = window.innerWidth
  let iH = window.innerHeight
  let devAspectRatio = iW / iH
  scale = (devAspectRatio < designAspectRatio) ? (dw / iW) : (dh / iH)
}

// canvas水平居中
function canvasToCenter(app) {
  if (!app) return
  let offsetX = Math.abs(window.innerWidth - app.renderer.view.width) / 2
  app.renderer.view.style.marginLeft = `${offsetX}px`
}

// canvas中stage调节
export const containerSizeControl = (app) => {
  scaleCalculator()
  app.stage.scale.x = 1 / scale
  app.stage.scale.y = 1 / scale
}




