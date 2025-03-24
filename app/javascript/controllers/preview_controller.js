
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { palette: Object }

  

  connect() {
    console.log("Preview controller connected with palette:", this.paletteValue);

    if (typeof window.random === 'undefined') {
      // Create a dummy p5 instance without interfering with your main sketch.
      const dummy = new p5(() => {});
      // Bind global functions from the dummy instance.
      window.random = dummy.random.bind(dummy);
      window.noise  = dummy.noise.bind(dummy);
      window.round  = dummy.round.bind(dummy);
      window.pixelDensity    = dummy.pixelDensity.bind(dummy);
    }

    this.p5Instance = new p5(this.sketch.bind(this), this.element);
  }

  disconnect() {
    console.log("Preview controller disconnected");
    if (this.p5Instance) {
      this.p5Instance.remove();
    }
  }

  sketch(p) {
    const w = 1200;
    const h = 600;
    const bw = 100;
    const numCircles = 1000;
    const granularity = 103

    let palette = this.paletteValue || {};
    let bg ="#F6E9DF";
    let basic_colours = palette.colours || ["#4375db", "#B4B0C4", "#CC9395", "#EF611B", "#ED0707"];
    let steps = palette.steps || [0, 0.2, 0.4, 0.6, 0.8, 1];

    p.setup = function() {
      p.createCanvas(w + 2 * bw, h + 2 * bw);
      window.width = p.width;
      window.height = p.height;
      p.noLoop();
      p.noStroke();
      p.loadPixels();
      window.pixels = p.pixels;


    };

    p.draw = function() {
      p.background(bg);
      let colours = calculate_colours(basic_colours, steps);
      let r = 250;

      p.translate(r,r)
      for (let i = 0; i < colours.length - 1; i++) {
        let y = i * 0.5;
        p.fill(colours[i]);
        p.circle(0, y, r);
      }

      p.translate(2*r, 0)
      for (let i = colours.length - 1; i > 0; i--) {
        let y = (colours.length - i) * 0.5;
        p.fill(colours[i]);
        p.circle(0, y, r);
      }

        console.log("granulating")
        // window.p5grain.setup()
        // window.p5grain.granulateSimple(granularity);
    };

    function calculate_colours(basic_colours, steps) {
      console.log(steps, basic_colours)
      let colours = [];
      for (let i = 0; i < basic_colours.length - 1; i++) {
        let ncircles = Math.floor(numCircles * (steps[i + 1] - steps[i]));
        console.log(ncircles);
        let segment = chroma
          .scale([basic_colours[i], basic_colours[i + 1]])
          .correctLightness()
          .mode('lch')
          .colors(ncircles);
        colours = colours.concat(segment);

      }
      console.log(colours);
      return colours;
    }
  }
}
