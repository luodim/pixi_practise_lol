// https://gist.github.com/runeb/c11f864cd7ead969a5f0
const DEGREES = {
  1: 0,
  3: 180,
  6: 90,
  8: 270,
}

export default async (file) => {
  const fileReader = new FileReader
  fileReader.readAsArrayBuffer(file)
  // TODO onerror?
  await new Promise(resolve => { fileReader.onloadend = resolve })

  const scanner = new DataView(fileReader.result)
  let idx = 0
  if (fileReader.result.length < 2 || scanner.getUint16(idx) !== 0xFFD8) {
    return DEGREES[1]
  }

  idx += 2
  let maxBytes = scanner.byteLength
  while(idx < maxBytes - 2) {
    const uint16 = scanner.getUint16(idx)
    idx += 2
    switch(uint16) {
      case 0xFFE1: // Start of EXIF
        const exifLength = scanner.getUint16(idx)
        maxBytes = exifLength - idx
        idx += 2
        break
      case 0x0112: // Orientation tag
        // Read the value, its 6 bytes further out
        // See page 102 at the following URL
        // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
        const value = scanner.getUint16(idx + 6, false)
        maxBytes = 0 // Stop scanning
        return DEGREES[value]
        break
    }
  }
  return DEGREES[1]
}
