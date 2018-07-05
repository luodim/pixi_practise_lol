const sass = require('node-sass')
const sizeOf = require('image-size')

module.exports = {
  'imageSize($image)'(image, done) {
    // TODO
    // relative path
    // console.log('hehe', this)
    // https://github.com/sass/node-sass/issues/895

    const src = image.getValue()
    const { width, height } = /*await*/ sizeOf(`./src/${src}`)

    const out = new sass.types.List(3)
    out.setValue(0, new sass.types.Number(width))
    out.setValue(1, new sass.types.Number(height))
    out.setValue(2, new sass.types.String(src))
    done(out)
    // done(new sass.types.String('heihe'))
  },
}
