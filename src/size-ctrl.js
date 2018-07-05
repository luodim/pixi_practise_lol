// design width and design height
export let dw = 750
export let dh = 1332

// design width / design height ratio
let designAspectRatio = dw / dh

// sacle ratio on devices
let scale = 1
let spriteScale = 1

// calculate the scale value of design dimension size
export const calculateScale = () => {
  let {innerWidth, innerHeight, devicePixelRatio} = window
  if (innerWidth / innerHeight < designAspectRatio) { // that means devices need scale base on device width
  	// use the actual value(physics width of devices) to divide design width to calculate the scale value
    scale = innerWidth * devicePixelRatio / dw

  } else { // that means devices need scale base on devices height
  	// use the actual value(physics width of devices) to divide design width to calculate the scale value
    scale = innerHeight * devicePixelRatio / dh
  }
}

// calculate the sprite size on stage
export const spriteSizeCtrl = (sprite, w, h) => {
  if (window.innerHeight / window.innerWidth < designAspectRatio) { // scale base on height ratio
    spriteScale = window.innerHeight / dh
  } else { // scale base on width ratio
    spriteScale = window.innerWidth / dw
  }
  sprite.width = spriteScale * w
  sprite.height = spriteScale * h
}

// run calculate function
calculateScale()


export const containerAdjust = (container) => {
  if (!container) return
  let innerW = window.innerWidth
  let innerH = window.innerHeight
  let ar = innerW / innerH
  if (designAspectRatio < ar) {
    scale = innerH / dh
  } else {
    scale = innerW / dw
  }
  container.width = dw * scale
  container.height = dh * scale
  container.x = (innerW - container.width) / 2
  console.log(`scale is ${scale}, container width is ${container.width}, container height is ${container.height}`)
}

export const position = class {
  constructure(){}

  static toCenter(...views) {
    for (let view of views) {
      this.toCenterHorizatial(view)
      this.toCenterVertical(view)
    }
    return this
  }

  static toLeft(...views) {
    for (let view of views) {
      view.x = 0
    }
    return this
  }

  static toTop(...views) {
    for (let view of views) {
      view.y = 0
    }
    return this
  }

  static toRight(...views) {
    for (let view of views) {
      view.x = dw - view.width
    }
    return this
  }

  static toBottom(...views) {
    for (let view of views) {
      view.y = dh - view.height
    }
    return this
  }

  static toCenterHorizatial(...views) {
    for (let view of views) {
      view.x = (dw - view.width) / 2
    }
    return this
  }

  static toCenterVertical(...views) {
    for (let view of views) {
      view.y = (dh - view.height) / 2
    }
    return this
  }

  static setScale(scale, ...views) {
    for (let v of views) {
      v.scale.set(scale)
    }
  }
}


