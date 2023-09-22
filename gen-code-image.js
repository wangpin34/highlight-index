const { createCanvas } = require('canvas')
const htmlToImage = require('html-to-image')
const { JSDOM } = require('jsdom')

// Create a canvas element
const canvas = createCanvas(800, 600)

// Create a new JSDOM instance and set the HTML content and CSS styles
const dom = new JSDOM(`<!DOCTYPE html><html><head><style>
  body {
    background-color: #f0f0f0;
  }
  h1 {
    color: #333;
    font-size: 24px;
    font-weight: bold;
  }
</style></head><body><h1>Hello, world!</h1></body></html>`)

// Render the HTML element to the canvas
htmlToImage.toCanvas(canvas, dom.window.document.body)
  .then(() => {
    // Save the canvas as an image file
    const fs = require('fs')
    const out = fs.createWriteStream('output.png')
    const stream = canvas.createPNGStream()
    stream.pipe(out)
    out.on('finish', () => console.log('The PNG file was created.'))
  })
  .catch((error) => console.error(error))