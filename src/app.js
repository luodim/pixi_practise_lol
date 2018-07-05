import * as PIXI from 'pixi.js'
import 'pixi-spine'
import * as popmotion from 'popmotion'
import {scale, dw, dh, spriteSizeCtrl, containerAdjust} from './size-ctrl.js'
import 'app.scss'
import {preload, getRes, application, loader, res, sprite, TextureCache} from './preload.js'
import Entry from './scene/entry.js'
import Welcome from './scene/welcome.js'
import Menu from './scene/menu.js'
import Cook from './scene/cook.js'
import Final from './scene/final.js'

// scence change
const SCENCE_ENTRY = 1
const SCENCE_WELCOME = 2
const SCENCE_MENU = 3
const SCENCE_COOK = 4
const SCENCE_FINAL = 5

// init application
let app = new application(
  {
  	antialias: true,
  	transparent: false,
  	resolution: 1,
  }
)
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

let curScence

// find elements
const spoon = document.getElementById('aa')
const progressText = document.getElementsByClassName('progress')[0].getElementsByTagName('p')[0]
const loading = document.getElementsByClassName('loading')[0]
const enterBtn = document.getElementById('enter_btn')

// set button icon invisible
enterBtn.style.visibility = 'hidden'

// set resize listener
window.addEventListener('resize', stageDimensionCtrl)

stageDimensionCtrl()

// load image convert it into texture
loader.onProgress.add(loadProgressHandler)
loader.onComplete.add(loadCompleteHandler)
preload().load(setRes)
console.log('loader is ' + loader)

// switch the scence according scence key
function switchScence(scence) {
  if (curScence) app.stage.removeChild(curScence)
  switch (scence) {
    case SCENCE_ENTRY:
      toEntry()
      break
    case SCENCE_WELCOME:
      toWelcome()
      break
    case SCENCE_MENU:
      toMenu()
      break
    case SCENCE_COOK:
      toCook()
      break
    case SCENCE_FINAL:
      toFinal()
      break
  }
  app.stage.addChild(curScence)
  containerAdjust(curScence)
}

// enter Entry scence
function toEntry() {
  curScence = new Entry().on('change', () => {
  	console.log('switch to welcome scence')
  	switchScence(SCENCE_WELCOME)
  })
}

function toWelcome() {
  curScence = new Welcome().on('change', () => {
  	console.log('switch to menu')
  	// switchScence(SCENCE_MENU)
  })
}
// enter menu scence
function toMenu() {
  curScence = new Menu().on('change', () => {
  	console.log('switch to cook scence')
  	switchScence(SCENCE_COOK)
  })
}

// enter cook scence
function toCook() {
  curScence = new Cook().on('change', () => {
  	console.log('switch to final scence')
  	switchScence(SCENCE_FINAL)
  })
}

// enter final scence
function toFinal() {
  curScence = new Final()
}

/*
* after loader finish loading task, call this function to create a sprite,
* then call size ctrl function to calculate the suitable size, finally,
* display the sprite on the canvas
*/
function setRes() {
  // let m = new sprite(getRes('meat').texture)
  // app.stage.addChild(m)
  // spriteSizeCtrl(m, 500, 400)
}

//adjust the canvas dimesion when resize event is called
function stageDimensionCtrl() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  containerAdjust(curScence)
}

// load progress listener
function loadProgressHandler() {
  progressText.textContent = `${Math.round(loader.progress)}%`
}

// load complete listener
function loadCompleteHandler() {
  enterBtn.style.visibility = 'visible'
  enterBtn.addEventListener('click', (evt) => {
    loading.style.display = 'none'
    document.body.appendChild(app.view)
    switchScence(SCENCE_ENTRY)
  })
}












