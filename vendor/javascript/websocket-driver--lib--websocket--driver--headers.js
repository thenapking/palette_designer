// websocket-driver/lib/websocket/driver/headers@0.7.4 downloaded from https://ga.jspm.io/npm:websocket-driver@0.7.4/lib/websocket/driver/headers.js

var t={};var Headers=function(){this.clear()};Headers.prototype.ALLOWED_DUPLICATES=["set-cookie","set-cookie2","warning","www-authenticate"];Headers.prototype.clear=function(){this._sent={};this._lines=[]};Headers.prototype.set=function(t,e){if(void 0!==e){t=this._strip(t);e=this._strip(e);var i=t.toLowerCase();if(!this._sent.hasOwnProperty(i)||this.ALLOWED_DUPLICATES.indexOf(i)>=0){this._sent[i]=true;this._lines.push(t+": "+e+"\r\n")}}};Headers.prototype.toString=function(){return this._lines.join("")};Headers.prototype._strip=function(t){return t.toString().replace(/^ */,"").replace(/ *$/,"")};t=Headers;var e=t;export default e;

