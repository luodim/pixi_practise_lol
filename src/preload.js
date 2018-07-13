/**
 * this js is a preload module, to load all resources,
 * export the loader which loaded these resources
 * export the the PIXI.loader.resource object according to the parameter of resource key
 * export the short name of PIXI
 */
import meat from './assets/1-1.png'
import meat2 from './assets/1-2.png'
import meat3 from './assets/1-3.png'
import beaf from './assets/2-1.png'
import beaf2 from './assets/2-2.png'
import beaf3 from './assets/2-3.png'
import frog from './assets/3-1.png'
import frog2 from './assets/3-2.png'
import frog3 from './assets/3-3.png'
import mashroom from './assets/4-1.png'
import mashroom2 from './assets/4-2.png'
import mashroom3 from './assets/4-3.png'
import spider from './assets/5-1.png'
import spider2 from './assets/5-2.png'
import spider3 from './assets/5-3.png'
import amm from './assets/amm.png'
import bg from './assets/bg.jpg'
import bg_ex from './assets/bg_ex.jpg'
import bg_loading from './assets/bg_loading.jpg'
import bg_menu from './assets/bg_menu.jpg'
import blink from './assets/blink.png'
import border from './assets/border.png'
import btn_again from './assets/btn_again.png'
import btn_in from './assets/btn_in.png'
import btn_select from './assets/btn_select.png'
import btn_select1 from './assets/btn_select1.png'
import btn_share from './assets/btn_share.png'
import cook1 from './assets/cook1.png'
import cook2 from './assets/cook2.png'
import cook_selected from './assets/cook_selected.png'
import d1 from './assets/d1.png'
import d1_s from './assets/d1_s.png'
import d2 from './assets/d2.png'
import d2_s from './assets/d2_s.png'
import d3 from './assets/d3.png'
import d3_s from './assets/d3_s.png'
import d4 from './assets/d4.png'
import d4_s from './assets/d4_s.png'
import dialog_bg from './assets/diaglog_bg.png'
import dialog0 from './assets/dialog0.png'
import dialog1 from './assets/dialog1.png'
import dish from './assets/dish.png'
import dish_sm from './assets/dish-sm.png'
import door from './assets/door.png'
import door_side from './assets/door_side.png'
import drink_selected from './assets/drink_selected.png'
import drop_blue from './assets/drop-blue.png'
import drop_green from './assets/drop-green.png'
import drop_red from './assets/drop-red.png'
import drop_yellow from './assets/drop-yellow.png'
import halo from './assets/halo.png'
import hint_arrow from './assets/hint_arrow.png'
import hint_arrow1 from './assets/hint_arrow1.png'
import hint_cook_select from './assets/hint_cook_select.png'
import hint_drink_select from './assets/hint_drink_select.png'
import hint_open from './assets/hint_open.png'
import hint_press from './assets/hint_press.png'
import kitchen_b from './assets/kitchen_b.jpg'
import line from './assets/line.png'
import m1 from './assets/m1.png'
import m2 from './assets/m2.png'
import m3 from './assets/m3.png'
import m4 from './assets/m4.png'
import m5 from './assets/m5.png'
import n1 from './assets/n1.png'
import n2 from './assets/n2.png'
import n3 from './assets/n3.png'
import n4 from './assets/n4.png'
import n5 from './assets/n5.png'
import name_bg from './assets/name-bg.png'
import outer_bg from './assets/outer-bg.jpg'
import p1 from './assets/p1.png'
import p2 from './assets/p2.png'
import paper from './assets/paper.png'
import pl from './assets/pl.png'
import placemat from './assets/placemat.png'
import placemat1 from './assets/placemat1.png'
import rotation from './assets/rotation.jpg'
import sauce_bedplate from './assets/sauce-bedplate.png'
import sauce_blue from './assets/sauce-blue.png'
import sauce_green from './assets/sauce-green.png'
import sauce_red from './assets/sauce-red.png'
import sauce_shadow from './assets/sauce-shadow.png'
import sauce_yellow from './assets/sauce-yellow.png'
import select_board from './assets/select_board.png'
import share0 from './assets/share0.jpg'
import share1 from './assets/share1.jpg'
import share2 from './assets/share2.jpg'
import share3 from './assets/share3.jpg'
import share4 from './assets/share4.jpg'
import share5 from './assets/share5.jpg'
import share_bg from './assets/share_bg.jpg'
import smoke from './assets/smoke.png'
import taste_index from './assets/taste_index.png'
import outdoor from './assets/spine/outdoor.json'
import grandpa from './assets/spine/grandpa.json'
import scene from './assets/spine/scene.json'
import spine_fish from './assets/spine/1-1_1-2.json'
import spine_beaf from './assets/spine/2-1.json'
import spine_frog from './assets/spine/3-1_3-2.json'
import spine_mashroom from './assets/spine/4-1_4-2_4-3.json'
import spine_spider from './assets/spine/5-1.json'
import spine_resting from './assets/spine/resting.json'
import spine_frying from './assets/spine/frying.json'
import spine_stirring from './assets/spine/stirring'

const resources = {
  meat, meat2, meat3, beaf, beaf2, beaf3, frog, frog2, frog3, mashroom, mashroom2, mashroom3, spider, spider2, spider3,
  amm, bg, bg_ex, bg_loading, bg_menu, blink, border, btn_again, btn_in, btn_select, btn_select1, btn_share,
  cook1, cook2, cook_selected, d1, d1_s, d2, d2_s, d3, d3_s, d4, d4_s, dialog_bg, dialog0, dialog1, dish, dish_sm,
  door, door_side, drink_selected, drop_blue, drop_green, drop_red, drop_yellow, halo, hint_arrow, hint_arrow1,
  hint_cook_select, hint_drink_select, hint_open, hint_press, kitchen_b, line, m1, m2, m3, m4, m5, n1, n2, n3, n4, n5,
  name_bg, outer_bg, p1, p2, paper, pl, placemat, placemat1, rotation, sauce_bedplate, sauce_blue, sauce_green,
  sauce_red, sauce_shadow, sauce_yellow, select_board, share0, share1, share2, share3, share4, share5, share_bg, smoke, taste_index
}

require.context("./assets/spine/")

export const application = PIXI.Application,
      		   loader = PIXI.loader,
      	     res = PIXI.loader.resources,
      	     sprite = PIXI.Sprite,
      	     TextureCache = PIXI.utils.TextureCache

// execute the preload function to load the resources
export const preload = () => {
  Object.keys(resources).forEach((el) => {
  	loader.add(el, resources[el])
  })

  // todo
  loader.add('outdoor', outdoor, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('grandpa', grandpa, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('scene', scene, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('spine_fish', spine_fish, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('spine_beaf', spine_beaf, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('spine_frog', spine_frog, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('spine_mashroom', spine_mashroom, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('spine_spider', spine_spider, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('spine_resting', spine_resting, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('spine_frying', spine_frying, { metadata: { spineAtlasSuffix: '.conf' }})
  loader.add('spine_stirring', spine_stirring, { metadata: { spineAtlasSuffix: '.conf' }})
  return loader
}

export const getRes = (key) => {
  return res[key]
}
