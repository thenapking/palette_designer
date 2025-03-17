import { Controller } from "@hotwired/stimulus"
import p5 from "p5js"
import chroma from "chroma-js"

export default class extends Controller {
  static values = { palette: Object }

  connect() {
    console.log("Palette preview connected with data:", this.paletteValue)
    this.p5Instance = new p5(this.sketch.bind(this), this.element)
  }

  sketch(p) {
    let paletteData = this.paletteValue || { stops: [], colours: [] }
    
    p.setup = function() {
      p.createCanvas(400, 400)
      p.noLoop()
    }

    p.draw = function() {
      p.background(255)
      let num = paletteData.colours.length
      if (num === 0) return

      let spacing = p.width / (num + 1)
      paletteData.colours.forEach((col, i) => {
        let x = spacing * (i + 1)
        let y = p.height / 2
        let fillColor = chroma(col).hex()
        p.fill(fillColor)
        p.circle(x, y, 50)
      })
    }
  }

  updatePalette(newPaletteData) {
    this.paletteValue = newPaletteData
    if (this.p5Instance) {
      this.p5Instance.redraw()
    }
  }
}
