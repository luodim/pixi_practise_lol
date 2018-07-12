/**
 * menu.js is the module for the scene of menu
 */
import * as PIXI from 'pixi.js'
import {application, loader, res, sprite, TextureCache, preload, getRes} from '../preload.js'
import {dw, dh, containerSizeControl} from '../size-ctrl.js'
import Helper from '../helper.js'
import { tween, timeline, easing, spring } from 'popmotion'

export default class Menu extends PIXI.Container {
 	constructor() {
 	  super()
      const menuBg = new PIXI.Sprite(getRes('bg_menu').texture)
      this.plate = this.addSauce()
      this.dishContainer = this.addDish()

      this.itemArray = new Array()
      this.isShow = false

      this.addChild(menuBg, this.plate, this.dishContainer)
      this.addTips()
      this.addArrow()
      this.addConveyor()
    }

    addDish() {
      const container = new PIXI.Container()
      const placemat = new PIXI.Sprite(getRes('placemat').texture)
      const dishSmall = new PIXI.Sprite(getRes('dish_sm').texture)
      const dishBig = new PIXI.Sprite(getRes('dish').texture)

      Helper.setScale(1.2, placemat)
      Helper.setScale(0.5, dishSmall, dishBig)

      dishSmall.x = -45
      dishSmall.y = 350
      dishBig.x = 52
      container.x = 50
      container.y = 300
      container.addChild(placemat, dishSmall, dishBig)
      this.curMaterial = dishBig
      this.sauceDish = dishSmall
      return container
    }

    addSauce() {
      const container = new PIXI.Container()
      const plate = new PIXI.Sprite(getRes('sauce_bedplate').texture)
      const shadow = new PIXI.Sprite(getRes('sauce_shadow').texture)
      const yellow = new PIXI.Sprite(getRes('sauce_yellow').texture)
      const red = new PIXI.Sprite(getRes('sauce_red').texture)
      const blue = new PIXI.Sprite(getRes('sauce_blue').texture)
      const green = new PIXI.Sprite(getRes('sauce_green').texture)

      this.ye = yellow
      this.bl = blue
      this.gr = green

      Helper.setScale(0.5, plate)
      Helper.setScale(0.5, shadow, yellow, red, blue, green)

      container.addChild(plate, shadow, yellow, red, blue, green)
      shadow.y = 130
      yellow.x = 50 + 80
      yellow.y = 80
      red.x = 200
      blue.x = 380 + 50
      blue.y = 50
      green.x = 500 + 80
      green.y = 80
      yellow.pivot.set(150, 150)
      blue.pivot.set(150, 150)
      green.pivot.set(150, 150)
      container.y = -container.height

      // this.addSauceClickListener(yellow, red, blue, green)
      return container
    }

    // addSauceClickListener(...sprites) {
    //   for (let i = 0; i < sprites.length; i++) {
    //     sprites[i].on('pointerup', () => {
    //       this.
    //     })
    //   }
    // }

    // add arrow element and define arrow animation
    addArrow() {
      const arrow = new PIXI.Sprite(getRes('hint_arrow').texture)
      if (this.isShow) {
        arrow.y = 200
        arrow.x = 100
      } else {
        arrow.anchor.y = 1
        arrow.scale.y *= -1
        arrow.y = 800
        arrow.x = 100
      }

      this.arr = arrow
      this.addChild(arrow)

      tween({
      	from: {x: arrow.x, y: arrow.y},
      	to: {x: arrow.x + 50, y: arrow.y + 30},
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
      this.t = tips
      this.addChild(tips)
    }

    // add conveyor, set conveyor animation
    addConveyor() {
      let conveyorContainer = new PIXI.Container()
      // generate item----------------------------
      for (let i = 0; i < 5; i++) {
        let item = new ConveyorView(i + 1)
        this.itemArray.push(item)
        Helper.setScale(0.5, item)
        Helper.toBottom(dh, item)
        item.x = item.width * i
        conveyorContainer.addChild(item)

        item.interactive = true
        item.on('pointerup', () => {
          this.showSauce()
          this.addMaterial(i + 1)
        })
      }
      this.addChild(conveyorContainer)

      // set animation----------------------------------
      const itemWidth = 250
      timeline([{track: 'x', from: itemWidth * 5, to: 0, duration: 5000, ease: easing.linear}], 
        {loop: Infinity, ease: easing.linear})
      .start((v) => {
        for (let i = 0; i < this.itemArray.length; i++) {
          this.itemArray[i].x = this.itemMoveCalculate((i + 1), v, itemWidth)
        }
      })
    }

    addMaterial(id) {
      const spineNames = ['spine_fish', 'spine_beaf', 'spine_frog', 'spine_mashroom', 'spine_spider']
      if (this.curMaterial) this.dishContainer.removeChild(this.curMaterial)

      const material = new PIXI.spine.Spine(getRes(spineNames[id - 1]).spineData)
      Helper.setSkeleton(`${id}-1`, material)

      this.dishContainer.addChild(material)
      Helper.setScale(0.5, material)
      material.y = -270
      material.x = -60
      this.curMaterial = material
    }

    showSauce() {
      if (this.isShow) return
      this.isShow = true
      this.removeChild(this.arr, this.t)
      this.addArrow()
      tween({
        from: {y: this.plate.y},
        to: {y: 0},
        duration: 300,
        ease: easing.easeIn
      })
      .start({
        update: v => {
          this.plate.y = v.y
        }
      })

      spring({
        from: 0.3,
        velocity: 0.6,
        to: 0,
        stiffness: 600,
        mass: 6,
        damping: 10
      })
      .start(v => this.ye.rotation = v)

      spring({
        from: 0.25,
        velocity: 0.6,
        to: 0,
        stiffness: 600,
        mass: 5,
        damping: 15
      })
      .start(v => this.bl.rotation = v)

      spring({
        from: 0.15,
        velocity: 0.6,
        to: 0,
        stiffness: 600,
        mass: 8,
        damping: 30
      })
      .start(v => this.gr.rotation = v)
    }

    itemMoveCalculate(id, v, itemWidth) {
      let posX = v.x - itemWidth * (5 - (id - 1))
      if (posX < (-itemWidth)) posX = v.x + (id - 1) * itemWidth
      return posX
    }
 }

 /*single item object*/
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