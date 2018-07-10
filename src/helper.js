/* 调整帮助类*/
export default class Helper {
  constructure(){}

  // 居中
  static toCenter(parentWidth, parentHeight, ...views) {
    for (let view of views) {
      this.toCenterHorizatial(parentWidth, view)
      this.toCenterVertical(parentHeight, view)
    }
    return this
  }

  // 左对齐
  static toLeft(...views) {
    for (let view of views) {
      view.x = 0
    }
    return this
  }

  // 顶部对齐
  static toTop(...views) {
    for (let view of views) {
      view.y = 0
    }
    return this
  }

  // 右对齐
  static toRight(parentWidth, ...views) {
    for (let view of views) {
      view.x = parentWidth - view.width
    }
    return this
  }

  // 底部对齐
  static toBottom(parentHeight, ...views) {
    for (let view of views) {
      view.y = parentHeight - view.height
      console.log(`parent height is ${parentHeight}, view height is ${view.height}, offsetY is ${view.y}`)
    }
    return this
  }

  // 水平居中
  static toCenterHorizatial(parentWidth, ...views) {
    for (let view of views) {
      view.x = (parentWidth - view.width) / 2
    }
    return this
  }

  // 垂直居中
  static toCenterVertical(parentHeight, ...views) {
    for (let view of views) {
      view.y = (parentHeight - view.height) / 2
    }
    return this
  }

  // 缩放
  static setScale(scale, ...views) {
    for (let v of views) {
      v.scale.set(scale)
    }
  }
}
