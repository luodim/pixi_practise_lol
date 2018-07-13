/**
 * cook.js is the module for the scene of cook
 */
import {application, loader, res, sprite, TextureCache, preload, getRes} from '../preload.js'
import {dw, dh, containerSizeControl} from '../size-ctrl.js'
import { tween, chain, delay, easing } from 'popmotion'
import Helper from '../helper.js'

export default class Cook extends PIXI.Container {
 	constructor() {
 	  super()
	  const bg_ex = new PIXI.Sprite(getRes('bg_ex').texture)
      const kitchen_b = new PIXI.Sprite(getRes('kitchen_b').texture)
      const scene = new PIXI.spine.Spine(getRes('scene').spineData)
      Helper.setSkeleton('scene', scene)
      const chef = new PIXI.spine.Spine(getRes('spine_resting').spineData)
      chef.state.setAnimation(0, 'resting', true);
      this.curChef = chef

      bg_ex.y = 1200

      this.addChild(bg_ex, kitchen_b, scene, chef)
      this.showBoard()
 	}

 	showBoard() {
	  const style = {
        fontFamily: 'MF NianZhen(Noncommercial)',
        fill: 0x000000,
        textBaseline: 'alphabetic',
        fontSize: 38,
      }

 	  const selectBoard = new PIXI.Sprite(getRes('select_board').texture)
      const textTips = new PIXI.Text('请选择一种烹饪方式', style)
      const hongShao = new PIXI.Sprite(getRes('cook1').texture)
      const qingTang = new PIXI.Sprite(getRes('cook2').texture)
      const hongShaoText = new PIXI.Text('红烧', style)
      const qingTangText = new PIXI.Text('清汤', style)
      this.circle = new PIXI.Sprite(getRes('cook_selected').texture)
      this.btn = new PIXI.Sprite(getRes('btn_select').texture)
      selectBoard.addChild(textTips, hongShao, qingTang, hongShao, qingTang, hongShaoText, qingTangText, this.circle, this.btn)

      this.circle.visible = false
      this.btn.visible = false

      Helper.toCenterHorizatial(selectBoard.width, textTips, this.btn)
      textTips.y = 200
      hongShaoText.y = qingTangText.y = 450
      hongShaoText.x = 150
      qingTangText.x = 360
      hongShao.y = 300
      qingTang.y = 280
      hongShao.x = 100
      qingTang.x = selectBoard.width - qingTang.width - 100
      this.btn.y = 600

	  this.addChild(selectBoard)
	  selectBoard.pivot.set(selectBoard.width, selectBoard.height)
	  selectBoard.x = (dw - selectBoard.width) / 2 + selectBoard.width
	  selectBoard.y = dh
	  this.curBoard = selectBoard

	  this.addCookClickListener(hongShao, qingTang, this.btn)
	  this.boardAnim(true)
 	}

 	handleBoardAnim(isCookMethodBoard) {
 	  this.removeChild()
 	  if (isCookMethodBoard) {
 	    this.toCook()
 	    this.showBoard()
 	  }
 	}

 	boardAnim(isIn) {
 	  if (!this.curBoard) return
 	  let f, t, e
 	  if (isIn) {
		f = -2
		t = 0
		e = easing.easeIn
 	  } else {
		f = 0
		t = -2
		e = easing.easeOut
 	  }
      tween({from: f, to: t, duration: 500, ease: e})
 	  .start((v) => {
 	    this.curBoard.rotation = v
 	    if (v === t) this.curBoard.emit('animFinish')
 	  })
 	}

 	addCookClickListener(...views) {
 	  let curView
	  for (let i = 0; i < views.length; i++) {
	    curView = views[i]
	    curView.interactive = true
	    curView.on('pointerup', () => this.handleCookClick(i))
	  }
 	}

 	handleCookClick(id) {
 	  const posArray = [{'x': 100, 'y': 300}, {'x': 300, 'y': 300}]
	  this.circle.visible = true
	  this.btn.visible = true
	  if (id !== 2) {
	  	this.circle.x = posArray[id]['x']
	    this.circle.y = posArray[id]['y']
	    this.cookMethod = id
	  } else {
	  	this.curBoard.on('animFinish', () => this.handleBoardAnim(true))
	  	this.boardAnim(false)
	  }
 	}

 	toCook() {
 	  const method = [{'name': 'spine_frying', 'animName': 'frying'}, {'name': 'spine_stirring', 'animName': 'stirring'}]
 	  let name = method[this.cookMethod]['name']
 	  let animName = method[this.cookMethod]['animName']
 	  if (this.curChef) this.removeChild(this.curChef)

 	  const chef = new PIXI.spine.Spine(getRes(name).spineData)
      chef.state.setAnimation(0, animName, true);
      this.curChef = chef
      this.addChild(chef)
 	}
 }