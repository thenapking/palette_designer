// websocket-extensions@0.1.4 downloaded from https://ga.jspm.io/npm:websocket-extensions@0.1.4/lib/websocket_extensions.js

var e={};var s=/([!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+)/,t=/([^!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z])/g,i=/"((?:\\[\x00-\x7f]|[^\x00-\x08\x0a-\x1f\x7f"\\])*)"/,r=new RegExp(s.source+"(?:=(?:"+s.source+"|"+i.source+"))?"),n=new RegExp(s.source+"(?: *; *"+r.source+")*","g"),o=new RegExp("^"+n.source+"(?: *, *"+n.source+")*$"),h=/^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;var a=Object.prototype.hasOwnProperty;var f={parseHeader:function(e){var s=new Offers;if(""===e||void 0===e)return s;if(!o.test(e))throw new SyntaxError("Invalid Sec-WebSocket-Extensions header: "+e);var t=e.match(n);t.forEach((function(e){var t=e.match(new RegExp(r.source,"g")),i=t.shift(),n={};t.forEach((function(e){var s=e.match(r),t=s[1],i;i=void 0!==s[2]?s[2]:void 0===s[3]||s[3].replace(/\\/g,"");h.test(i)&&(i=parseFloat(i));if(a.call(n,t)){n[t]=[].concat(n[t]);n[t].push(i)}else n[t]=i}),this);s.push(i,n)}),this);return s},serializeParams:function(e,s){var i=[];var print=function(e,s){s instanceof Array?s.forEach((function(s){print(e,s)})):true===s?i.push(e):"number"===typeof s?i.push(e+"="+s):t.test(s)?i.push(e+'="'+s.replace(/"/g,'\\"')+'"'):i.push(e+"="+s)};for(var r in s)print(r,s[r]);return[e].concat(i).join("; ")}};var Offers=function(){this._byName={};this._inOrder=[]};Offers.prototype.push=function(e,s){a.call(this._byName,e)||(this._byName[e]=[]);this._byName[e].push(s);this._inOrder.push({name:e,params:s})};Offers.prototype.eachOffer=function(e,s){var t=this._inOrder;for(var i=0,r=t.length;i<r;i++)e.call(s,t[i].name,t[i].params)};Offers.prototype.byName=function(e){return this._byName[e]||[]};Offers.prototype.toArray=function(){return this._inOrder.slice()};e=f;var u=e;var c={};var RingBuffer=function(e){this._bufferSize=e;this.clear()};RingBuffer.prototype.clear=function(){this._buffer=new Array(this._bufferSize);this._ringOffset=0;this._ringSize=this._bufferSize;this._head=0;this._tail=0;this.length=0};RingBuffer.prototype.push=function(e){var s=false,t=false;if(this._ringSize<this._bufferSize)s=0===this._tail;else if(this._ringOffset===this._ringSize){s=true;t=0===this._tail}if(s){this._tail=this._bufferSize;this._buffer=this._buffer.concat(new Array(this._bufferSize));this._bufferSize=this._buffer.length;t&&(this._ringSize=this._bufferSize)}this._buffer[this._tail]=e;this.length+=1;this._tail<this._ringSize&&(this._ringOffset+=1);this._tail=(this._tail+1)%this._bufferSize};RingBuffer.prototype.peek=function(){if(0!==this.length)return this._buffer[this._head]};RingBuffer.prototype.shift=function(){if(0!==this.length){var e=this._buffer[this._head];this._buffer[this._head]=void 0;this.length-=1;this._ringOffset-=1;if(0===this._ringOffset&&this.length>0){this._head=this._ringSize;this._ringOffset=this.length;this._ringSize=this._bufferSize}else this._head=(this._head+1)%this._ringSize;return e}};c=RingBuffer;var _=c;var p={};var l=_;var Functor=function(e,s){this._session=e;this._method=s;this._queue=new l(Functor.QUEUE_SIZE);this._stopped=false;this.pending=0};Functor.QUEUE_SIZE=8;Functor.prototype.call=function(e,s,t,i){if(!this._stopped){var r={error:e,message:s,callback:t,context:i,done:false},n=false,o=this;this._queue.push(r);if(r.error){r.done=true;this._stop();return this._flushQueue()}var handler=function(e,s){if(n^(n=true)){if(e){o._stop();r.error=e;r.message=null}else r.message=s;r.done=true;o._flushQueue()}};try{this._session[this._method](s,handler)}catch(e){handler(e)}}};Functor.prototype._stop=function(){this.pending=this._queue.length;this._stopped=true};Functor.prototype._flushQueue=function(){var e=this._queue,s;while(e.length>0&&e.peek().done){s=e.shift();if(s.error){this.pending=0;e.clear()}else this.pending-=1;s.callback.call(s.context,s.error,s.message)}};p=Functor;var v=p;var g={};var d=_;var Pledge=function(){this._complete=false;this._callbacks=new d(Pledge.QUEUE_SIZE)};Pledge.QUEUE_SIZE=4;Pledge.all=function(e){var s=new Pledge,t=e.length,i=t;0===t&&s.done();while(i--)e[i].then((function(){t-=1;0===t&&s.done()}));return s};Pledge.prototype.then=function(e){this._complete?e():this._callbacks.push(e)};Pledge.prototype.done=function(){this._complete=true;var e=this._callbacks,s;while(s=e.shift())s()};g=Pledge;var m=g;var y={};var b=v,w=m;var Cell=function(e){this._ext=e[0];this._session=e[1];this._functors={incoming:new b(this._session,"processIncomingMessage"),outgoing:new b(this._session,"processOutgoingMessage")}};Cell.prototype.pending=function(e){var s=this._functors[e];s._stopped||(s.pending+=1)};Cell.prototype.incoming=function(e,s,t,i){this._exec("incoming",e,s,t,i)};Cell.prototype.outgoing=function(e,s,t,i){this._exec("outgoing",e,s,t,i)};Cell.prototype.close=function(){this._closed=this._closed||new w;this._doClose();return this._closed};Cell.prototype._exec=function(e,s,t,i,r){this._functors[e].call(s,t,(function(e,s){e&&(e.message=this._ext.name+": "+e.message);i.call(r,e,s);this._doClose()}),this)};Cell.prototype._doClose=function(){var e=this._functors.incoming,s=this._functors.outgoing;if(this._closed&&e.pending+s.pending===0){this._session&&this._session.close();this._session=null;this._closed.done()}};y=Cell;var E=y;var S={};var x=E,O=m;var Pipeline=function(e){this._cells=e.map((function(e){return new x(e)}));this._stopped={incoming:false,outgoing:false}};Pipeline.prototype.processIncomingMessage=function(e,s,t){this._stopped.incoming||this._loop("incoming",this._cells.length-1,-1,-1,e,s,t)};Pipeline.prototype.processOutgoingMessage=function(e,s,t){this._stopped.outgoing||this._loop("outgoing",0,this._cells.length,1,e,s,t)};Pipeline.prototype.close=function(e,s){this._stopped={incoming:true,outgoing:true};var t=this._cells.map((function(e){return e.close()}));e&&O.all(t).then((function(){e.call(s)}))};Pipeline.prototype._loop=function(e,s,t,i,r,n,o){var h=this._cells,a=h.length,f=this;while(a--)h[a].pending(e);var pipe=function(s,r,a){if(s===t)return n.call(o,r,a);h[s][e](r,a,(function(t,r){t&&(f._stopped[e]=true);pipe(s+i,t,r)}))};pipe(s,null,r)};S=Pipeline;var z=S;var M={};var N=u,k=z;var Extensions=function(){this._rsv1=this._rsv2=this._rsv3=null;this._byName={};this._inOrder=[];this._sessions=[];this._index={}};Extensions.MESSAGE_OPCODES=[1,2];var A={add:function(e){if("string"!==typeof e.name)throw new TypeError("extension.name must be a string");if("permessage"!==e.type)throw new TypeError('extension.type must be "permessage"');if("boolean"!==typeof e.rsv1)throw new TypeError("extension.rsv1 must be true or false");if("boolean"!==typeof e.rsv2)throw new TypeError("extension.rsv2 must be true or false");if("boolean"!==typeof e.rsv3)throw new TypeError("extension.rsv3 must be true or false");if(this._byName.hasOwnProperty(e.name))throw new TypeError('An extension with name "'+e.name+'" is already registered');this._byName[e.name]=e;this._inOrder.push(e)},generateOffer:function(){var e=[],s=[],t={};this._inOrder.forEach((function(i){var r=i.createClientSession();if(r){var n=[i,r];e.push(n);t[i.name]=n;var o=r.generateOffer();o=o?[].concat(o):[];o.forEach((function(e){s.push(N.serializeParams(i.name,e))}),this)}}),this);this._sessions=e;this._index=t;return s.length>0?s.join(", "):null},activate:function(e){var s=N.parseHeader(e),t=[];s.eachOffer((function(e,s){var i=this._index[e];if(!i)throw new Error('Server sent an extension response for unknown extension "'+e+'"');var r=i[0],n=i[1],o=this._reserved(r);if(o)throw new Error("Server sent two extension responses that use the RSV"+o[0]+' bit: "'+o[1]+'" and "'+r.name+'"');if(true!==n.activate(s))throw new Error("Server sent unacceptable extension parameters: "+N.serializeParams(e,s));this._reserve(r);t.push(i)}),this);this._sessions=t;this._pipeline=new k(t)},generateResponse:function(e){var s=[],t=[],i=N.parseHeader(e);this._inOrder.forEach((function(e){var r=i.byName(e.name);if(0!==r.length&&!this._reserved(e)){var n=e.createServerSession(r);if(n){this._reserve(e);s.push([e,n]);t.push(N.serializeParams(e.name,n.generateResponse()))}}}),this);this._sessions=s;this._pipeline=new k(s);return t.length>0?t.join(", "):null},validFrameRsv:function(e){var s={rsv1:false,rsv2:false,rsv3:false},t;if(Extensions.MESSAGE_OPCODES.indexOf(e.opcode)>=0)for(var i=0,r=this._sessions.length;i<r;i++){t=this._sessions[i][0];s.rsv1=s.rsv1||t.rsv1;s.rsv2=s.rsv2||t.rsv2;s.rsv3=s.rsv3||t.rsv3}return(s.rsv1||!e.rsv1)&&(s.rsv2||!e.rsv2)&&(s.rsv3||!e.rsv3)},processIncomingMessage:function(e,s,t){this._pipeline.processIncomingMessage(e,s,t)},processOutgoingMessage:function(e,s,t){this._pipeline.processOutgoingMessage(e,s,t)},close:function(e,s){if(!this._pipeline)return e.call(s);this._pipeline.close(e,s)},_reserve:function(e){this._rsv1=this._rsv1||e.rsv1&&e.name;this._rsv2=this._rsv2||e.rsv2&&e.name;this._rsv3=this._rsv3||e.rsv3&&e.name},_reserved:function(e){return this._rsv1&&e.rsv1?[1,this._rsv1]:this._rsv2&&e.rsv2?[2,this._rsv2]:!(!this._rsv3||!e.rsv3)&&[3,this._rsv3]}};for(var I in A)Extensions.prototype[I]=A[I];M=Extensions;var P=M;export default P;

