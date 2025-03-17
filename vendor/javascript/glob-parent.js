// glob-parent@3.1.0 downloaded from https://ga.jspm.io/npm:glob-parent@3.1.0/index.js

import r from"path";import o from"is-glob";import t from"path-dirname";import a from"os";var i={};var e=r;var p=o;var m=t;var f="win32"===a.platform();i=function globParent(r){f&&r.indexOf("/")<0&&(r=r.split("\\").join("/"));/[\{\[].*[\/]*.*[\}\]]$/.test(r)&&(r+="/");r+="a";do{r=m.posix(r)}while(p(r)||/(^|[^\\])([\{\[]|\([^\)]+$)/.test(r));return r.replace(/\\([\*\?\|\[\]\(\)\{\}])/g,"$1")};var n=i;export default n;

