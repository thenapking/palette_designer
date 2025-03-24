import { Controller } from "@hotwired/stimulus"
import "@hotwired/turbo-rails";

function debounce(func, wait, immediate) {
  let timeout;
  console.log('debounce');
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default class extends Controller {
  connect() {
    console.log('connect');
    this.debouncedSave = debounce(this.save.bind(this), 150);
  }

  update() {
    console.log('update');
    this.debouncedSave();
  }

  save() {
    console.log('save');
    const form = this.element;
    const url = form.action;
    const formData = new FormData(form);

    fetch(url, {
      method: form.method, // PATCH or PUT, for example.
      headers: {
        "Accept": "text/vnd.turbo-stream.html"
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) { throw new Error("Network response was not ok"); }
      return response.text();
    })
    .then(responseText => {
      Turbo.renderStreamMessage(responseText);
    })
    .catch(error => console.error("Error:", error));
  }
}
