// array-unique@0.3.2 downloaded from https://ga.jspm.io/npm:array-unique@0.3.2/index.js

var r={};r=function unique(r){if(!Array.isArray(r))throw new TypeError("array-unique expects an array.");var a=r.length;var e=-1;while(e++<a){var n=e+1;for(;n<r.length;++n)r[e]===r[n]&&r.splice(n--,1)}return r};r.immutable=function uniqueImmutable(a){if(!Array.isArray(a))throw new TypeError("array-unique expects an array.");var e=a.length;var n=new Array(e);for(var t=0;t<e;t++)n[t]=a[t];return r(n)};var a=r;const e=r.immutable;export default a;export{e as immutable};

