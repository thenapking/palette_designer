// split@0.3.3 downloaded from https://ga.jspm.io/npm:split@0.3.3/index.js

import e from"through";import r from"string_decoder";var t="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var n={};var i=e;var o=r.StringDecoder;n=split;function split(e,r,n){var u=new o;var l="";var f=n&&n.maxLength;"function"===typeof e&&(r=e,e=null);e||(e=/\r?\n/);function emit(e,t){if(r){try{t=r(t)}catch(r){return e.emit("error",r)}"undefined"!==typeof t&&e.queue(t)}else e.queue(t)}function next(r,t){var n=((null!=l?l:"")+t).split(e);l=n.pop();f&&l.length>f&&r.emit("error",new Error("maximum buffer reached"));for(var i=0;i<n.length;i++){var o=n[i];emit(r,o)}}return i((function(e){next(this||t,u.write(e))}),(function(){u.end&&next(this||t,u.end());null!=l&&emit(this||t,l);this.queue(null)}))}var u=n;export default u;

