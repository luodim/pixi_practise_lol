/**
 * entry.js is the module for the scene of entry
 */
import {application, loader, res, sprite, TextureCache, preload, getRes} from '../preload.js'
import {dw, dh, position} from '../size-ctrl.js'
import { tween, chain, delay, easing } from 'popmotion'

export default class Entry extends PIXI.Container {
 	constructor() {
 	  super()
      const outdoor = new PIXI.spine.Spine(getRes('outdoor').spineData)
      outdoor.skeleton.setSkin(null)
      outdoor.skeleton.setSkinByName('outdoor')

      position.setScale(0.5, outdoor)
      this.addChild(outdoor)

      const peopleA = new PIXI.Sprite(getRes('p1').texture)
      const peopleB = new PIXI.Sprite(getRes('p2').texture)
      position.toRight(peopleA).toBottom(peopleA, peopleB)
      peopleB.x = dw - peopleA.width - peopleB.width + 60
      this.addChild(peopleB, peopleA)

      // test code will be changed late
      setTimeout(() => {this.showDialog(0)}, 500)
 	}

  // display the dialog by id
 	showDialog(id) {
 	  if (this.curDialog) this.removeChild(this.curDialog)
 	  const d = new PIXI.Sprite(getRes(`dialog${id}`).texture)
 	  const pos = [{'x':100, 'y':700}, {'x':360, 'y':700}]
 	  const content = [{'texts':[{'text': '好饿啊，吃点东西不', 'x':20, 'y':50}]},
 	  {'texts':[{'text': '前面好像有家新开的店', 'x':30, 'y':30}, {'text': '走，吃宵夜去', 'x':30, 'y':80}]}]
 	  d.x = pos[id]['x']
 	  d.y = pos[id]['y']
 	  this.curDialog = d
 	  this.addChild(d)

 	  const style = {
        fontFamily: 'MF NianZhen(Noncommercial)',
        fill: 0x000000,
        textBaseline: 'alphabetic',
        fontSize: 38,
      }

      let textInfos = content[id]['texts']
      for (let i = 0; i < textInfos.length; i++) {
      	console.log('content is ' + textInfos[i]['text'])
        const t = new PIXI.Text(textInfos[i]['text'], style)
        t.x = textInfos[i]['x']
        t.y = textInfos[i]['y']
        d.addChild(t)
      }

      if (id === 0) setTimeout(() => this.showDialog(1), 1500)
      if (id === 1) setTimeout(() => this.showDoor(), 1500)
    }

    // add door elements and play door open animation
    showDoor() {
      if (this.curDialog) this.removeChild(this.curDialog)

      const container = new PIXI.Container()
      const door = new PIXI.Sprite(getRes('door').texture)
      const door_side = new PIXI.Sprite(getRes('door_side').texture)
      const border = new PIXI.Sprite(getRes('border').texture)

      door.y = -10
      door.x = 120
      door_side.y = 15

      tween({ from: { x: door.x}, to: { x: -250}, duration: 1600 })
      .start({
        update: v => {door.x = v.x},
        complete: () => {this.emit('change')}
      })

      container.addChild(door_side, door, border)
      position.toCenter(container)
      this.addChild(container)
    }

 }
