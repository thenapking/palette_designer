// chalk@4.1.2 downloaded from https://ga.jspm.io/npm:chalk@4.1.2/source/index.js

import*as e from"ansi-styles";import*as t from"supports-color";var s={};const stringReplaceAll$1=(e,t,s)=>{let n=e.indexOf(t);if(-1===n)return e;const r=t.length;let o=0;let l="";do{l+=e.substr(o,n-o)+t+s;o=n+r;n=e.indexOf(t,o)}while(-1!==n);l+=e.substr(o);return l};const stringEncaseCRLFWithFirstIndex$1=(e,t,s,n)=>{let r=0;let o="";do{const l="\r"===e[n-1];o+=e.substr(r,(l?n-1:n)-r)+t+(l?"\r\n":"\n")+s;r=n+1;n=e.indexOf("\n",r)}while(-1!==n);o+=e.substr(r);return o};s={stringReplaceAll:stringReplaceAll$1,stringEncaseCRLFWithFirstIndex:stringEncaseCRLFWithFirstIndex$1};var n=s;var r={};const o=/(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;const l=/(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;const i=/^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;const c=/\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;const a=new Map([["n","\n"],["r","\r"],["t","\t"],["b","\b"],["f","\f"],["v","\v"],["0","\0"],["\\","\\"],["e",""],["a",""]]);function unescape(e){const t="u"===e[0];const s="{"===e[1];return t&&!s&&5===e.length||"x"===e[0]&&3===e.length?String.fromCharCode(parseInt(e.slice(1),16)):t&&s?String.fromCodePoint(parseInt(e.slice(2,-1),16)):a.get(e)||e}function parseArguments(e,t){const s=[];const n=t.trim().split(/\s*,\s*/g);let r;for(const t of n){const n=Number(t);if(Number.isNaN(n)){if(!(r=t.match(i)))throw new Error(`Invalid Chalk template style argument: ${t} (in style '${e}')`);s.push(r[2].replace(c,((e,t,s)=>t?unescape(t):s)))}else s.push(n)}return s}function parseStyle(e){l.lastIndex=0;const t=[];let s;while(null!==(s=l.exec(e))){const e=s[1];if(s[2]){const n=parseArguments(e,s[2]);t.push([e].concat(n))}else t.push([e])}return t}function buildStyle(e,t){const s={};for(const e of t)for(const t of e.styles)s[t[0]]=e.inverse?null:t.slice(1);let n=e;for(const[e,t]of Object.entries(s))if(Array.isArray(t)){if(!(e in n))throw new Error(`Unknown Chalk style: ${e}`);n=t.length>0?n[e](...t):n[e]}return n}r=(e,t)=>{const s=[];const n=[];let r=[];t.replace(o,((t,o,l,i,c,a)=>{if(o)r.push(unescape(o));else if(i){const t=r.join("");r=[];n.push(0===s.length?t:buildStyle(e,s)(t));s.push({inverse:l,styles:parseStyle(i)})}else if(c){if(0===s.length)throw new Error("Found extraneous } in Chalk template literal");n.push(buildStyle(e,s)(r.join("")));r=[];s.pop()}else r.push(a)}));n.push(r.join(""));if(s.length>0){const e=`Chalk template literal is missing ${s.length} closing bracket${1===s.length?"":"s"} (\`}\`)`;throw new Error(e)}return n.join("")};var u=r;var p="default"in e?e.default:e;var h="default"in t?t.default:t;var f={};const d=p;const{stdout:g,stderr:v}=h;const{stringReplaceAll:y,stringEncaseCRLFWithFirstIndex:b}=n;const{isArray:m}=Array;const w=["ansi","ansi","ansi256","ansi16m"];const C=Object.create(null);const applyOptions=(e,t={})=>{if(t.level&&!(Number.isInteger(t.level)&&t.level>=0&&t.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");const s=g?g.level:0;e.level=void 0===t.level?s:t.level};class ChalkClass{constructor(e){return chalkFactory(e)}}const chalkFactory=e=>{const t={};applyOptions(t,e);t.template=(...e)=>chalkTag(t.template,...e);Object.setPrototypeOf(t,Chalk.prototype);Object.setPrototypeOf(t.template,t);t.template.constructor=()=>{throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.")};t.template.Instance=ChalkClass;return t.template};function Chalk(e){return chalkFactory(e)}for(const[e,t]of Object.entries(d))C[e]={get(){const s=createBuilder(this,createStyler(t.open,t.close,this._styler),this._isEmpty);Object.defineProperty(this,e,{value:s});return s}};C.visible={get(){const e=createBuilder(this,this._styler,true);Object.defineProperty(this,"visible",{value:e});return e}};const O=["rgb","hex","keyword","hsl","hsv","hwb","ansi","ansi256"];for(const e of O)C[e]={get(){const{level:t}=this;return function(...s){const n=createStyler(d.color[w[t]][e](...s),d.color.close,this._styler);return createBuilder(this,n,this._isEmpty)}}};for(const e of O){const t="bg"+e[0].toUpperCase()+e.slice(1);C[t]={get(){const{level:t}=this;return function(...s){const n=createStyler(d.bgColor[w[t]][e](...s),d.bgColor.close,this._styler);return createBuilder(this,n,this._isEmpty)}}}}const j=Object.defineProperties((()=>{}),{...C,level:{enumerable:true,get(){return this._generator.level},set(e){this._generator.level=e}}});const createStyler=(e,t,s)=>{let n;let r;if(void 0===s){n=e;r=t}else{n=s.openAll+e;r=t+s.closeAll}return{open:e,close:t,openAll:n,closeAll:r,parent:s}};const createBuilder=(e,t,s)=>{const builder=(...e)=>m(e[0])&&m(e[0].raw)?applyStyle(builder,chalkTag(builder,...e)):applyStyle(builder,1===e.length?""+e[0]:e.join(" "));Object.setPrototypeOf(builder,j);builder._generator=e;builder._styler=t;builder._isEmpty=s;return builder};const applyStyle=(e,t)=>{if(e.level<=0||!t)return e._isEmpty?"":t;let s=e._styler;if(void 0===s)return t;const{openAll:n,closeAll:r}=s;if(-1!==t.indexOf(""))while(void 0!==s){t=y(t,s.close,s.open);s=s.parent}const o=t.indexOf("\n");-1!==o&&(t=b(t,r,n,o));return n+t+r};let k;const chalkTag=(e,...t)=>{const[s]=t;if(!m(s)||!m(s.raw))return t.join(" ");const n=t.slice(1);const r=[s.raw[0]];for(let e=1;e<s.length;e++)r.push(String(n[e-1]).replace(/[{}\\]/g,"\\$&"),String(s.raw[e]));void 0===k&&(k=u);return k(e,r.join(""))};Object.defineProperties(Chalk.prototype,C);const x=Chalk();x.supportsColor=g;x.stderr=Chalk({level:v?v.level:0});x.stderr.supportsColor=v;f=x;var A=f;export default A;

