// is-extglob@2.1.1 downloaded from https://ga.jspm.io/npm:is-extglob@2.1.1/index.js

var e={};e=function isExtglob(e){if("string"!==typeof e||""===e)return false;var r;while(r=/(\\).|([@?!+*]\(.*\))/g.exec(e)){if(r[2])return true;e=e.slice(r.index+r[0].length)}return false};var r=e;export default r;

