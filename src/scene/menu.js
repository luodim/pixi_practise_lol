/**
 * menu.js is the module for the scene of menu
 */
import * as PIXI from 'pixi.js'
import {application, loader, res, sprite, TextureCache, preload, getRes} from '../preload.js'
import {dw, dh, containerSizeControl} from '../size-ctrl.js'
import Helper from '../helper.js'
import { tween, timeline, easing } from 'popmotion'

export default class Menu extends PIXI.Container {
 	constructor() {
 	  super()
      const menuBg = new PIXI.Sprite(getRes('bg_menu').texture)
      const placemat = new PIXI.Sprite(getRes('placemat').texture)
      const dishSmall = new PIXI.Sprite(getRes('dish_sm').texture)
      const dishBig = new PIXI.Sprite(getRes('dish').texture)

      Helper.setScale(1.2, placemat)
      Helper.setScale(0.5, dishSmall, dishBig)
      Helper.setScale(1, menuBg)

      const dishContainer = new PIXI.Container()
      dishContainer.addChild(placemat, dishSmall, dishBig)
      dishSmall.x = -45
      dishSmall.y = 350
      dishBig.x = 52
      dishContainer.x = 50
      dishContainer.y = 300

      this.addChild(menuBg, dishContainer)
      this.addTips()
      this.addArrow()
      this.addConveyor()
    }

    // add arrow element and define arrow animation
    addArrow() {
      const arrow = new PIXI.Sprite(getRes('hint_arrow').texture)
      arrow.anchor.y = 1
      arrow.scale.y *= -1
      arrow.y = 800
      arrow.x = 100
      this.addChild(arrow)

      tween({
      	from: {x: arrow.x, y: arrow.y},
      	to: {x: 150, y: 830},
      	duration: 500,
      	ease: easing.easeInOut,
      	flip: Infinity
      })
      .start({
        update: v => {
          arrow.x = v.x
          arrow.y = v.y
        }
      })
    }

    // add tips element
    addTips() {
      const style = {
        fontFamily: 'MF NianZhen(Noncommercial)',
        fontSize: 56,
        fill: 0xffffff,
        stroke: 0x7d3e1f,
        strokeThickness: 10,
        letterSpacing: 8,
        textBaseline: 'alphabetic',
      }

      const tips = new PIXI.Text('请选择一种食材', style)
      Helper.toCenterHorizatial(dw, tips)
      tips.y = 900
      this.addChild(tips)
    }

    // add conveyor, set conveyor animation
    addConveyor() {
      let conveyorContainer = new PIXI.Container()
      const item1 = new ConveyorView(1)
      const item2 = new ConveyorView(2)
      const item3 = new ConveyorView(3)
      const item4 = new ConveyorView(4)
      const item5 = new ConveyorView(5)

      this.addClickListener(item1, item2, item3, item4, item5)
      Helper.setScale(0.5, item1, item2, item3, item4, item5)
      Helper.toBottom(dh, item1, item2, item3, item4, item5)
      this.setOffset(true, item1.width, item1, item2, item3, item4, item5)
      conveyorContainer.addChild(item1, item2, item3, item4, item5)
      this.addChild(conveyorContainer)

      const itemWidth = 250
      timeline([{track: 'x', from: itemWidth * 5, to: 0, duration: 5000, ease: easing.linear}], 
        {loop: Infinity, ease: easing.linear})
      .start((v) => {
        item1.x = this.itemMoveCalculate(1, v, itemWidth)
        item2.x = this.itemMoveCalculate(2, v, itemWidth)
        item3.x = this.itemMoveCalculate(3, v, itemWidth)
        item4.x = this.itemMoveCalculate(4, v, itemWidth)
        item5.x = this.itemMoveCalculate(5, v, itemWidth)
      })
    }

    addClickListener(...sprites) {
      for (let i = 0; i < sprites.length; i++) {
        sprites[i].interactive = true
        sprites[i].on('pointerup', () => {
          console.log('click---')
          alert(`current click is ${i+1}`)
        })
      }
    }

    itemMoveCalculate(id, v, itemWidth) {
      let posX = v.x - itemWidth * (5 - (id - 1))
      if (posX < (-itemWidth)) posX = v.x + (id - 1) * itemWidth
      return posX
    }

    // set offset for view array
    setOffset(isX, offset, ...items) {
      let index = 0
      for (let item of items) {
      	if (isX) {
      	  item.x = offset * index
      	} else {
      	  item.y = offset * index
      	}
      	index ++
      }
    }
 }

 /*
  single item object
 */
 class ConveyorView extends PIXI.Container {
   constructor(id) {
     super()
     this.id = id
     this.addItem()
   }

   addItem() {
     const itemBg = new PIXI.Sprite(getRes('rotation').texture)
     const dish = new PIXI.Sprite(getRes('dish_sm').texture)
     const material = new PIXI.Sprite(getRes(`m${this.id}`).texture)
     const nameBoard = new PIXI.Sprite(getRes('name_bg').texture)
     const name = new PIXI.Sprite(getRes(`n${this.id}`).texture)

     dish.x = (itemBg.width - dish.width) / 2
     dish.y = 40
     material.x = (itemBg.width - material.width) / 2
     nameBoard.x = (itemBg.width - nameBoard.width) / 2
     nameBoard.y = 400
     name.x = (nameBoard.width - name.width) / 2
     name.y = (nameBoard.height - name.height) / 2

     nameBoard.addChild(name)
     this.addChild(itemBg, dish, material, nameBoard)
   }

 }