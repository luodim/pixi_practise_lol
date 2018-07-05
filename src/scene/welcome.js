import {application, loader, res, sprite, TextureCache, preload, getRes} from '../preload.js'
import {dw, dh, position} from '../size-ctrl.js'
import { tween, chain, delay, easing } from 'popmotion'

export default class Welcome extends PIXI.Container {
	constructor() {
	  super()
      const kitchen = new PIXI.Sprite(getRes('kitchen_b').texture)

      const scene = new PIXI.spine.Spine(getRes('scene').spineData)
      scene.state.setAnimation(0, 'scene', true);
      scene.skeleton.setSkin(null)
      scene.skeleton.setSkinByName('scene')

      const grandpa = new PIXI.spine.Spine(getRes('grandpa').spineData)
      grandpa.state.setAnimation(0, 'grandpa', true);
      grandpa.skeleton.setSkin(null)
      grandpa.skeleton.setSkinByName('grandpa')

      this.addChild(kitchen, grandpa, scene)

      setTimeout(() => {
      	this.showDialog()
      }, 1000)
	}

    // popup dialog to remind
	showDialog() {
	  this.dialog = new PIXI.Sprite(getRes('dialog_bg').texture)
	  position.toCenterHorizatial(this.dialog).toBottom(this.dialog)
      this.addText(0)
      this.addChild(this.dialog)
	}

    // add text content by id
	addText(id) {
	  const content = {'texts': [{'text': '欢迎光临【 L 】宵夜店', 'x': 80, 'y': 100},
	  {'text': '召唤师，来一份属于你的特别料理吧', 'x': 80, 'y': 150}]}

	  const style = {
        fontFamily: 'MF NianZhen(Noncommercial)',
        fontSize: 48,
        fill: 0x7d3e1f,
        textBaseline: 'alphabetic',
      }

      this.textView = new PIXI.Text('', style)
      this.textView.x = content['texts'][id]['x']
      this.textView.y = content['texts'][id]['y']
      this.dialog.addChild(this.textView)
      this.curTextLen = 0
      this.curContent = content['texts'][id]
      this.curId = id

      requestAnimationFrame(this.textAnim.bind(this))
	}

    // text diaplay animation implementation
	textAnim() {
	  this.textView.text = this.curContent['text'].slice(0, this.curTextLen)
	  if (this.curTextLen < this.curContent['text'].length) {
	  	this.curTextLen ++
	  	requestAnimationFrame(this.textAnim.bind(this))
	  } else {
	  	if (this.curId === 0) {
	  	  this.addText(1)
	  	} else if (this.curId === 1) {
	  	  this.addBtn()
	  	}
	  }
	}

    // add btn sprite into container
	addBtn() {
	  const cookBtn = new PIXI.Sprite(getRes('btn_in').texture)
	  cookBtn.x = (this.dialog.width - cookBtn.width) / 2
	  cookBtn.y = this.dialog.height - cookBtn.height - 20
	  this.dialog.addChild(cookBtn)
	  cookBtn.interactive = true
      cookBtn.on('pointerup', () => {
      	console.log('click---')
      	this.emit('change')
      })
	}

}