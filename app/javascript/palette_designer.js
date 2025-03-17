// app/javascript/palette_designer.js
import * as chroma from 'chroma-js';
import * as p5 from 'p5';
import '@shoelace-style/shoelace';

export default class PaletteDesigner {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      initialPalette: { stops: [0, 1], colors: ['#FF0000', '#0000FF'] },
      circleCount: 50,
      ...options
    };
    
    this.palette = this.options.initialPalette;
    this.setupUI();
    this.setupP5();
    this.bindEvents();
  }
  
  setupUI() {
    // Main container
    this.container.innerHTML = `
      <div class="palette-designer">
        <div class="controls">
          <div class="stops-container" id="stops-container"></div>
          <div class="actions">
            <button id="add-stop">Add Stop</button>
            <button id="export-palette">Export JSON</button>
            <sl-input label="Circle Count" type="number" min="10" max="200" id="circle-count" value="${this.options.circleCount}"></sl-input>
          </div>
        </div>
        <div id="palette-preview"></div>
      </div>
    `;
    
    this.renderStops();
  }
  
  renderStops() {
    const stopsContainer = this.container.querySelector('#stops-container');
    stopsContainer.innerHTML = '';
    
    this.palette.stops.forEach((stop, index) => {
      const stopEl = document.createElement('div');
      stopEl.className = 'color-stop';
      stopEl.innerHTML = `
        <div class="stop-header">
          <span>Stop ${index + 1}</span>
          ${index > 0 && index < this.palette.stops.length - 1 ? 
            '<button class="remove-stop" data-index="' + index + '">Remove</button>' : ''}
        </div>
        <div class="stop-controls">
          <sl-color-picker value="${this.palette.colors[index]}" data-index="${index}"></sl-color-picker>
          <sl-input type="number" min="0" max="1" step="0.01" value="${stop}" 
            data-index="${index}" label="Position"></sl-input>
        </div>
        <div class="stop-actions">
          ${index > 0 ? '<button class="move-stop" data-direction="up" data-index="' + index + '">↑</button>' : ''}
          ${index < this.palette.stops.length - 1 ? '<button class="move-stop" data-direction="down" data-index="' + index + '">↓</button>' : ''}
        </div>
      `;
      stopsContainer.appendChild(stopEl);
    });
    
    this.updatePreview();
  }
  
  setupP5() {
    const sketch = (p) => {
      p.setup = () => {
        const previewEl = this.container.querySelector('#palette-preview');
        const canvas = p.createCanvas(previewEl.offsetWidth, 300);
        canvas.parent(previewEl);
        p.noStroke();
      };
      
      p.draw = () => {
        p.background(240);
        
        // Create color scale
        const scale = chroma.scale(this.palette.colors)
          .domain(this.palette.stops)
          .mode('lab');
        
        const circleCount = parseInt(this.container.querySelector('#circle-count').value);
        const size = p.width / circleCount;
        
        for (let i = 0; i < circleCount; i++) {
          const value = i / (circleCount - 1);
          const color = scale(value).hex();
          p.fill(color);
          p.ellipse(i * size + size/2, p.height/2, size * 0.8);
        }
      };
    };
    
    new p5(sketch);
  }
  
  bindEvents() {
    this.container.addEventListener('input', (e) => {
      if (e.target.matches('sl-color-picker')) {
        const index = parseInt(e.target.dataset.index);
        this.palette.colors[index] = e.target.value;
        this.updatePreview();
      } else if (e.target.matches('sl-input[type="number"]')) {
        const index = parseInt(e.target.dataset.index);
        let value = parseFloat(e.target.value);
        
        // Ensure value is between 0 and 1
        value = Math.max(0, Math.min(1, value));
        e.target.value = value;
        
        this.palette.stops[index] = value;
        this.updatePreview();
      }
    });
    
    this.container.addEventListener('click', (e) => {
      if (e.target.matches('#add-stop')) {
        this.addStop();
      } else if (e.target.matches('#export-palette')) {
        this.exportPalette();
      } else if (e.target.matches('.remove-stop')) {
        const index = parseInt(e.target.dataset.index);
        this.removeStop(index);
      } else if (e.target.matches('.move-stop')) {
        const index = parseInt(e.target.dataset.index);
        const direction = e.target.dataset.direction;
        this.moveStop(index, direction);
      }
    });
    
    this.container.addEventListener('sl-change', (e) => {
      if (e.target.matches('#circle-count')) {
        this.updatePreview();
      }
    });
  }
  
  addStop() {
    // Add a stop in the middle of the largest gap
    let largestGap = 0;
    let insertIndex = 1;
    
    for (let i = 0; i < this.palette.stops.length - 1; i++) {
      const gap = this.palette.stops[i+1] - this.palette.stops[i];
      if (gap > largestGap) {
        largestGap = gap;
        insertIndex = i + 1;
      }
    }
    
    const newStop = (this.palette.stops[insertIndex-1] + this.palette.stops[insertIndex]) / 2;
    
    // Use chroma to calculate an interpolated color
    const scale = chroma.scale([this.palette.colors[insertIndex-1], this.palette.colors[insertIndex]])
      .mode('lab');
    const newColor = scale(0.5).hex();
    
    this.palette.stops.splice(insertIndex, 0, newStop);
    this.palette.colors.splice(insertIndex, 0, newColor);
    
    this.renderStops();
  }
  
  removeStop(index) {
    if (index > 0 && index < this.palette.stops.length - 1) {
      this.palette.stops.splice(index, 1);
      this.palette.colors.splice(index, 1);
      this.renderStops();
    }
  }
  
  moveStop(index, direction) {
    if (direction === 'up' && index > 0) {
      // Swap with previous
      [this.palette.stops[index], this.palette.stops[index-1]] = 
        [this.palette.stops[index-1], this.palette.stops[index]];
      [this.palette.colors[index], this.palette.colors[index-1]] = 
        [this.palette.colors[index-1], this.palette.colors[index]];
      this.renderStops();
    } else if (direction === 'down' && index < this.palette.stops.length - 1) {
      // Swap with next
      [this.palette.stops[index], this.palette.stops[index+1]] = 
        [this.palette.stops[index+1], this.palette.stops[index]];
      [this.palette.colors[index], this.palette.colors[index+1]] = 
        [this.palette.colors[index+1], this.palette.colors[index]];
      this.renderStops();
    }
  }
  
  updatePreview() {
    // Simply trigger a redraw in p5
  }
  
  exportPalette() {
    const jsonData = JSON.stringify(this.palette, null, 2);
    const blob = new Blob([jsonData], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  getPaletteData() {
    return this.palette;
  }
  
  setPaletteData(palette) {
    this.palette = palette;
    this.renderStops();
  }
}
