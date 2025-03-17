// apache-md5@1.1.8 downloaded from https://ga.jspm.io/npm:apache-md5@1.1.8/src/index.js

import*as t from"crypto";var e="default"in t?t.default:t;var r={};const a=e;const o="./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";function to64(t,e){let r="";while(--e>=0){r+=o[63&t];t>>=6}return r}function getSalt(t){let e="";if(t)e=t.split("$")[2];else while(e.length<8){let t=Math.floor(64*Math.random());e+=o[t]}return e}function getPassword(t){let e="";e+=to64(t.charCodeAt(0)<<16|t.charCodeAt(6)<<8|t.charCodeAt(12),4);e+=to64(t.charCodeAt(1)<<16|t.charCodeAt(7)<<8|t.charCodeAt(13),4);e+=to64(t.charCodeAt(2)<<16|t.charCodeAt(8)<<8|t.charCodeAt(14),4);e+=to64(t.charCodeAt(3)<<16|t.charCodeAt(9)<<8|t.charCodeAt(15),4);e+=to64(t.charCodeAt(4)<<16|t.charCodeAt(10)<<8|t.charCodeAt(5),4);e+=to64(t.charCodeAt(11),2);return e}r=(t,e)=>{let r="";r=e&&"1"===e.split("$")[1]?"$1$":"$apr1$";e=getSalt(e);let o=t+r+e;let d=a.createHash("md5").update(t+e+t,"ascii").digest("binary");for(let e=t.length;e>0;e-=16)o+=d.substr(0,e>16?16:e);for(let e=t.length;e;e>>=1)o+=e%2?String.fromCharCode(0):t.charAt(0);d=a.createHash("md5").update(o,"ascii").digest("binary");for(let r=0;r<1e3;++r){let o="";o+=r%2?t:d.substr(0,16);r%3&&(o+=e);r%7&&(o+=t);o+=r%2?d.substr(0,16):t;d=a.createHash("md5").update(o,"ascii").digest("binary")}return r+e+"$"+getPassword(d)};var d=r;export{d as default};

