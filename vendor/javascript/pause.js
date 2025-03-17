// pause@0.0.1 downloaded from https://ga.jspm.io/npm:pause@0.0.1/index.js

var e="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var n={};n=function(e){var n,t,a=[];e.on("data",n=function(e,n){a.push(["data",e,n])});e.on("end",t=function(e,n){a.push(["end",e,n])});return{end:function(){e.removeListener("data",n);e.removeListener("end",t)},resume:function(){this.end();for(var n=0,t=a.length;n<t;++n)e.emit.apply(e,a[n])}}};var t=n;export default t;

