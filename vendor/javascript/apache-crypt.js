// apache-crypt@1.2.6 downloaded from https://ga.jspm.io/npm:apache-crypt@1.2.6/src/index.js

import*as t from"unix-crypt-td-js";var a="default"in t?t.default:t;var r={};const n=a;const e="./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";function getSalt(){return e[parseInt(64*Math.random())]+e[parseInt(64*Math.random())]}r=(t,a)=>n(t,a||getSalt());var o=r;export{o as default};

