// https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas
// https://stackoverflow.com/questions/17411991/html5-canvas-rotate-image
// https://stackoverflow.com/a/20285053/1793548

import { cover } from 'intrinsic-scale'
import imageDegree from './image-degree'

// rotate image and scale fit
export default async (file,
  width /*default img.naturalWidth*/,
  height /*default img.naturalHeight*/
) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const pImg = new Promise(resolve => {
    const img = new Image
    // TODO onerror
    img.onload = () => resolve(img)
    img.src = URL.createObjectURL(file)
  })
  const pDeg = imageDegree(file)

  // parallel
  const deg = await pDeg
  const img = await pImg

  let fit
  if (deg % 180 === 0) {
    canvas.width = width || img.naturalWidth
    canvas.height = height || img.naturalHeight
    fit = cover(canvas.width, canvas.height, img.naturalWidth, img.naturalHeight)
  } else {
    canvas.width = width || img.naturalHeight
    canvas.height = height || img.naturalWidth
    fit = cover(canvas.height, canvas.width, img.naturalWidth, img.naturalHeight)
  }

  ctx.save()
  ctx.translate(canvas.width/2, canvas.height/2)
  ctx.rotate(deg*Math.PI/180)
  ctx.drawImage(img, fit.width/-2, fit.height/-2, fit.width, fit.height)
  ctx.restore()

  return canvas.toDataURL('image/jpeg', .8)
}
