/**
 * cook.js is the module for the scene of cook
 */
import {application, loader, res, sprite, TextureCache, preload, getRes} from '../preload.js'
import {dw, dh, containerSizeControl} from '../size-ctrl.js'
import Helper from '../helper.js'

export default class Cook extends PIXI.Container {
 	constructor() {
 	  super()

	  const bg_ex = new PIXI.Sprite(getRes('bg_ex').texture)
      bg_ex.y = 1200

      const kitchen_b = new PIXI.Sprite(getRes('kitchen_b').texture)

      const scene = new PIXI.spine.Spine(getRes('scene').spineData)
      Helper.setSkeleton('scene', scene)

      const chef = new PIXI.spine.Spine(getRes('spine_resting').spineData)
      chef.state.setAnimation(0, 'resting', true);

      this.addChild(bg_ex, kitchen_b, scene, chef)
 	}
 }