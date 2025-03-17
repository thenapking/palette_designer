// extend-shallow@2.0.1 downloaded from https://ga.jspm.io/npm:extend-shallow@2.0.1/index.js

import r from"is-extendable";var n={};var a=r;n=function extend(r){a(r)||(r={});var n=arguments.length;for(var t=1;t<n;t++){var e=arguments[t];a(e)&&assign(r,e)}return r};function assign(r,n){for(var a in n)hasOwn(n,a)&&(r[a]=n[a])}function hasOwn(r,n){return Object.prototype.hasOwnProperty.call(r,n)}var t=n;export default t;

