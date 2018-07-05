/**
 * final.js is the module for the scene of final
 */
import * as PIXI from 'pixi.js'
import {application, loader, res, sprite, TextureCache, preload, getRes} from '../preload.js'

export default class Final extends PIXI.Container {
 	constructor() {
 	  super()
 	  let style = new PIXI.TextStyle({
	  fontFamily: "Arial",
	  fontSize: 36,
	  fill: "white",
	  stroke: '#ff3300',
	  strokeThickness: 4,
	  dropShadow: true,
	  dropShadowColor: "#000000",
	  dropShadowBlur: 4,
	  dropShadowAngle: Math.PI / 6,
	  dropShadowDistance: 6,
	})
      let message = new PIXI.Text('hellow final', style)
      this.addChild(message)
 	}
 }