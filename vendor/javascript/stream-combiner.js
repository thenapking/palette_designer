// stream-combiner@0.0.4 downloaded from https://ga.jspm.io/npm:stream-combiner@0.0.4/index.js

import r from"duplexer";var e={};var n=r;e=function(){var r=[].slice.call(arguments),e=r[0],t=r[r.length-1],l=n(e,t);if(1==r.length)return r[0];if(!r.length)throw new Error("connect called with empty args");function recurse(r){if(!(r.length<2)){r[0].pipe(r[1]);recurse(r.slice(1))}}recurse(r);function onerror(){var r=[].slice.call(arguments);r.unshift("error");l.emit.apply(l,r)}for(var o=1;o<r.length-1;o++)r[o].on("error",onerror);return l};var t=e;export default t;

