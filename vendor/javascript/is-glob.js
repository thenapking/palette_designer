// is-glob@4.0.3 downloaded from https://ga.jspm.io/npm:is-glob@4.0.3/index.js

import*as r from"is-extglob";var e="default"in r?r.default:r;var t={};var f=e;var i={"{":"}","(":")","[":"]"};var strictCheck=function(r){if("!"===r[0])return true;var e=0;var t=-2;var f=-2;var n=-2;var u=-2;var a=-2;while(e<r.length){if("*"===r[e])return true;if("?"===r[e+1]&&/[\].+)]/.test(r[e]))return true;if(-1!==f&&"["===r[e]&&"]"!==r[e+1]){f<e&&(f=r.indexOf("]",e));if(f>e){if(-1===a||a>f)return true;a=r.indexOf("\\",e);if(-1===a||a>f)return true}}if(-1!==n&&"{"===r[e]&&"}"!==r[e+1]){n=r.indexOf("}",e);if(n>e){a=r.indexOf("\\",e);if(-1===a||a>n)return true}}if(-1!==u&&"("===r[e]&&"?"===r[e+1]&&/[:!=]/.test(r[e+2])&&")"!==r[e+3]){u=r.indexOf(")",e);if(u>e){a=r.indexOf("\\",e);if(-1===a||a>u)return true}}if(-1!==t&&"("===r[e]&&"|"!==r[e+1]){t<e&&(t=r.indexOf("|",e));if(-1!==t&&")"!==r[t+1]){u=r.indexOf(")",t);if(u>t){a=r.indexOf("\\",t);if(-1===a||a>u)return true}}}if("\\"===r[e]){var v=r[e+1];e+=2;var l=i[v];if(l){var s=r.indexOf(l,e);-1!==s&&(e=s+1)}if("!"===r[e])return true}else e++}return false};var relaxedCheck=function(r){if("!"===r[0])return true;var e=0;while(e<r.length){if(/[*?{}()[\]]/.test(r[e]))return true;if("\\"===r[e]){var t=r[e+1];e+=2;var f=i[t];if(f){var n=r.indexOf(f,e);-1!==n&&(e=n+1)}if("!"===r[e])return true}else e++}return false};t=function isGlob(r,e){if("string"!==typeof r||""===r)return false;if(f(r))return true;var t=strictCheck;e&&false===e.strict&&(t=relaxedCheck);return t(r)};var n=t;export{n as default};

