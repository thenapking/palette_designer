// send@1.1.0 downloaded from https://ga.jspm.io/npm:send@1.1.0/index.js

import*as e from"http-errors";import*as t from"debug";import*as r from"destroy";import*as a from"encodeurl";import*as n from"escape-html";import*as i from"etag";import*as s from"fresh";import*as o from"fs";import*as d from"mime-types";import*as h from"ms";import*as f from"on-finished";import*as c from"range-parser";import*as l from"path";import*as u from"statuses";import*as m from"stream";import*as p from"util";import v from"buffer";var g=e;try{"default"in e&&(g=e.default)}catch(e){}var y=t;try{"default"in t&&(y=t.default)}catch(e){}var S=r;try{"default"in r&&(S=r.default)}catch(e){}var H=a;try{"default"in a&&(H=a.default)}catch(e){}var C=n;try{"default"in n&&(C=n.default)}catch(e){}var x=i;try{"default"in i&&(x=i.default)}catch(e){}var b=s;try{"default"in s&&(b=s.default)}catch(e){}var _=o;try{"default"in o&&(_=o.default)}catch(e){}var T=d;try{"default"in d&&(T=d.default)}catch(e){}var E=h;try{"default"in h&&(E=h.default)}catch(e){}var L=f;try{"default"in f&&(L=f.default)}catch(e){}var R=c;try{"default"in c&&(R=c.default)}catch(e){}var N=l;try{"default"in l&&(N=l.default)}catch(e){}var F=u;try{"default"in u&&(F=u.default)}catch(e){}var M=m;try{"default"in m&&(M=m.default)}catch(e){}var D=p;try{"default"in p&&(D=p.default)}catch(e){}var O={};var w=v.Buffer;var k=g;var q=y("send");var A=S;var B=H;var P=C;var z=x;var I=b;var j=_;var G=T;var U=E;var W=L;var X=R;var Y=N;var $=F;var J=M;var K=D;var Q=Y.extname;var V=Y.join;var Z=Y.normalize;var ee=Y.resolve;var te=Y.sep;var re=/^ *bytes=/;var ae=31536e6;var ne=/(?:^|[\\/])\.\.(?:[\\/]|$)/;O=send;
/**
 * Return a `SendStream` for `req` and `path`.
 *
 * @param {object} req
 * @param {string} path
 * @param {object} [options]
 * @return {SendStream}
 * @public
 */function send(e,t,r){return new SendStream(e,t,r)}
/**
 * Initialize a `SendStream` with the given `path`.
 *
 * @param {Request} req
 * @param {String} path
 * @param {object} [options]
 * @private
 */function SendStream(e,t,r){J.call(this);var a=r||{};this.options=a;this.path=t;this.req=e;this._acceptRanges=a.acceptRanges===void 0||Boolean(a.acceptRanges);this._cacheControl=a.cacheControl===void 0||Boolean(a.cacheControl);this._etag=a.etag===void 0||Boolean(a.etag);this._dotfiles=a.dotfiles!==void 0?a.dotfiles:"ignore";if(this._dotfiles!=="ignore"&&this._dotfiles!=="allow"&&this._dotfiles!=="deny")throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"');this._extensions=a.extensions!==void 0?normalizeList(a.extensions,"extensions option"):[];this._immutable=a.immutable!==void 0&&Boolean(a.immutable);this._index=a.index!==void 0?normalizeList(a.index,"index option"):["index.html"];this._lastModified=a.lastModified===void 0||Boolean(a.lastModified);this._maxage=a.maxAge||a.maxage;this._maxage=typeof this._maxage==="string"?U(this._maxage):Number(this._maxage);this._maxage=isNaN(this._maxage)?0:Math.min(Math.max(0,this._maxage),ae);this._root=a.root?ee(a.root):null}K.inherits(SendStream,J);
/**
 * Emit error with `status`.
 *
 * @param {number} status
 * @param {Error} [err]
 * @private
 */SendStream.prototype.error=function error(e,t){if(hasListeners(this,"error"))return this.emit("error",createHttpError(e,t));var r=this.res;var a=$.message[e]||String(e);var n=createHtmlDocument("Error",P(a));clearHeaders(r);t&&t.headers&&setHeaders(r,t.headers);r.statusCode=e;r.setHeader("Content-Type","text/html; charset=UTF-8");r.setHeader("Content-Length",w.byteLength(n));r.setHeader("Content-Security-Policy","default-src 'none'");r.setHeader("X-Content-Type-Options","nosniff");r.end(n)};SendStream.prototype.hasTrailingSlash=function hasTrailingSlash(){return this.path[this.path.length-1]==="/"};SendStream.prototype.isConditionalGET=function isConditionalGET(){return this.req.headers["if-match"]||this.req.headers["if-unmodified-since"]||this.req.headers["if-none-match"]||this.req.headers["if-modified-since"]};SendStream.prototype.isPreconditionFailure=function isPreconditionFailure(){var e=this.req;var t=this.res;var r=e.headers["if-match"];if(r){var a=t.getHeader("ETag");return!a||r!=="*"&&parseTokenList(r).every((function(e){return e!==a&&e!=="W/"+a&&"W/"+e!==a}))}var n=parseHttpDate(e.headers["if-unmodified-since"]);if(!isNaN(n)){var i=parseHttpDate(t.getHeader("Last-Modified"));return isNaN(i)||i>n}return false};SendStream.prototype.removeContentHeaderFields=function removeContentHeaderFields(){var e=this.res;e.removeHeader("Content-Encoding");e.removeHeader("Content-Language");e.removeHeader("Content-Length");e.removeHeader("Content-Range");e.removeHeader("Content-Type")};SendStream.prototype.notModified=function notModified(){var e=this.res;q("not modified");this.removeContentHeaderFields();e.statusCode=304;e.end()};SendStream.prototype.headersAlreadySent=function headersAlreadySent(){var e=new Error("Can't set headers after they are sent.");q("headers already sent");this.error(500,e)};SendStream.prototype.isCachable=function isCachable(){var e=this.res.statusCode;return e>=200&&e<300||e===304};
/**
 * Handle stat() error.
 *
 * @param {Error} error
 * @private
 */SendStream.prototype.onStatError=function onStatError(e){switch(e.code){case"ENAMETOOLONG":case"ENOENT":case"ENOTDIR":this.error(404,e);break;default:this.error(500,e);break}};SendStream.prototype.isFresh=function isFresh(){return I(this.req.headers,{etag:this.res.getHeader("ETag"),"last-modified":this.res.getHeader("Last-Modified")})};SendStream.prototype.isRangeFresh=function isRangeFresh(){var e=this.req.headers["if-range"];if(!e)return true;if(e.indexOf('"')!==-1){var t=this.res.getHeader("ETag");return Boolean(t&&e.indexOf(t)!==-1)}var r=this.res.getHeader("Last-Modified");return parseHttpDate(r)<=parseHttpDate(e)};
/**
 * Redirect to path.
 *
 * @param {string} path
 * @private
 */SendStream.prototype.redirect=function redirect(e){var t=this.res;if(hasListeners(this,"directory"))this.emit("directory",t,e);else if(this.hasTrailingSlash())this.error(403);else{var r=B(collapseLeadingSlashes(this.path+"/"));var a=createHtmlDocument("Redirecting","Redirecting to "+P(r));t.statusCode=301;t.setHeader("Content-Type","text/html; charset=UTF-8");t.setHeader("Content-Length",w.byteLength(a));t.setHeader("Content-Security-Policy","default-src 'none'");t.setHeader("X-Content-Type-Options","nosniff");t.setHeader("Location",r);t.end(a)}};
/**
 * Pipe to `res.
 *
 * @param {Stream} res
 * @return {Stream} res
 * @api public
 */SendStream.prototype.pipe=function pipe(e){var t=this._root;this.res=e;var r=decode(this.path);if(r===-1){this.error(400);return e}if(~r.indexOf("\0")){this.error(400);return e}var a;if(t!==null){r&&(r=Z("."+te+r));if(ne.test(r)){q('malicious path "%s"',r);this.error(403);return e}a=r.split(te);r=Z(V(t,r))}else{if(ne.test(r)){q('malicious path "%s"',r);this.error(403);return e}a=Z(r).split(te);r=ee(r)}if(containsDotFile(a)){q('%s dotfile "%s"',this._dotfiles,r);switch(this._dotfiles){case"allow":break;case"deny":this.error(403);return e;case"ignore":default:this.error(404);return e}}if(this._index.length&&this.hasTrailingSlash()){this.sendIndex(r);return e}this.sendFile(r);return e};
/**
 * Transfer `path`.
 *
 * @param {String} path
 * @api public
 */SendStream.prototype.send=function send(e,t){var r=t.size;var a=this.options;var n={};var i=this.res;var s=this.req;var o=s.headers.range;var d=a.start||0;if(i.headersSent)this.headersAlreadySent();else{q('pipe "%s"',e);this.setHeader(e,t);this.type(e);if(this.isConditionalGET()){if(this.isPreconditionFailure()){this.error(412);return}if(this.isCachable()&&this.isFresh()){this.notModified();return}}r=Math.max(0,r-d);if(a.end!==void 0){var h=a.end-d+1;r>h&&(r=h)}if(this._acceptRanges&&re.test(o)){o=X(r,o,{combine:true});if(!this.isRangeFresh()){q("range stale");o=-2}if(o===-1){q("range unsatisfiable");i.setHeader("Content-Range",contentRange("bytes",r));return this.error(416,{headers:{"Content-Range":i.getHeader("Content-Range")}})}if(o!==-2&&o.length===1){q("range %j",o);i.statusCode=206;i.setHeader("Content-Range",contentRange("bytes",r,o[0]));d+=o[0].start;r=o[0].end-o[0].start+1}}for(var f in a)n[f]=a[f];n.start=d;n.end=Math.max(d,d+r-1);i.setHeader("Content-Length",r);s.method!=="HEAD"?this.stream(e,n):i.end()}};
/**
 * Transfer file for `path`.
 *
 * @param {String} path
 * @api private
 */SendStream.prototype.sendFile=function sendFile(e){var t=0;var r=this;q('stat "%s"',e);j.stat(e,(function onstat(t,a){var n=e[e.length-1]===te;if(t&&t.code==="ENOENT"&&!Q(e)&&!n)return next(t);if(t)return r.onStatError(t);if(a.isDirectory())return r.redirect(e);if(n)return r.error(404);r.emit("file",e,a);r.send(e,a)}));function next(a){if(r._extensions.length<=t)return a?r.onStatError(a):r.error(404);var n=e+"."+r._extensions[t++];q('stat "%s"',n);j.stat(n,(function(e,t){if(e)return next(e);if(t.isDirectory())return next();r.emit("file",n,t);r.send(n,t)}))}};
/**
 * Transfer index for `path`.
 *
 * @param {String} path
 * @api private
 */SendStream.prototype.sendIndex=function sendIndex(e){var t=-1;var r=this;function next(a){if(++t>=r._index.length)return a?r.onStatError(a):r.error(404);var n=V(e,r._index[t]);q('stat "%s"',n);j.stat(n,(function(e,t){if(e)return next(e);if(t.isDirectory())return next();r.emit("file",n,t);r.send(n,t)}))}next()};
/**
 * Stream `path` to the response.
 *
 * @param {String} path
 * @param {Object} options
 * @api private
 */SendStream.prototype.stream=function stream(e,t){var r=this;var a=this.res;var stream=j.createReadStream(e,t);this.emit("stream",stream);stream.pipe(a);function cleanup(){A(stream,true)}W(a,cleanup);stream.on("error",(function onerror(e){cleanup();r.onStatError(e)}));stream.on("end",(function onend(){r.emit("end")}))};
/**
 * Set content-type based on `path`
 * if it hasn't been explicitly set.
 *
 * @param {String} path
 * @api private
 */SendStream.prototype.type=function type(e){var t=this.res;if(!t.getHeader("Content-Type")){var r=Q(e);var type=G.contentType(r)||"application/octet-stream";q("content-type %s",type);t.setHeader("Content-Type",type)}};
/**
 * Set response header fields, most
 * fields may be pre-defined.
 *
 * @param {String} path
 * @param {Object} stat
 * @api private
 */SendStream.prototype.setHeader=function setHeader(e,t){var r=this.res;this.emit("headers",r,e,t);if(this._acceptRanges&&!r.getHeader("Accept-Ranges")){q("accept ranges");r.setHeader("Accept-Ranges","bytes")}if(this._cacheControl&&!r.getHeader("Cache-Control")){var a="public, max-age="+Math.floor(this._maxage/1e3);this._immutable&&(a+=", immutable");q("cache-control %s",a);r.setHeader("Cache-Control",a)}if(this._lastModified&&!r.getHeader("Last-Modified")){var n=t.mtime.toUTCString();q("modified %s",n);r.setHeader("Last-Modified",n)}if(this._etag&&!r.getHeader("ETag")){var i=z(t);q("etag %s",i);r.setHeader("ETag",i)}};
/**
 * Clear all headers from a response.
 *
 * @param {object} res
 * @private
 */function clearHeaders(e){var t=getHeaderNames(e);for(var r=0;r<t.length;r++)e.removeHeader(t[r])}
/**
 * Collapse all leading slashes into a single slash
 *
 * @param {string} str
 * @private
 */function collapseLeadingSlashes(e){for(var t=0;t<e.length;t++)if(e[t]!=="/")break;return t>1?"/"+e.substr(t):e}function containsDotFile(e){for(var t=0;t<e.length;t++){var r=e[t];if(r.length>1&&r[0]===".")return true}return false}
/**
 * Create a Content-Range header.
 *
 * @param {string} type
 * @param {number} size
 * @param {array} [range]
 */function contentRange(e,t,r){return e+" "+(r?r.start+"-"+r.end:"*")+"/"+t}
/**
 * Create a minimal HTML document.
 *
 * @param {string} title
 * @param {string} body
 * @private
 */function createHtmlDocument(e,t){return'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>'+e+"</title>\n</head>\n<body>\n<pre>"+t+"</pre>\n</body>\n</html>\n"}
/**
 * Create a HttpError object from simple arguments.
 *
 * @param {number} status
 * @param {Error|object} err
 * @private
 */function createHttpError(e,t){return t?t instanceof Error?k(e,t,{expose:false}):k(e,t):k(e)}
/**
 * decodeURIComponent.
 *
 * Allows V8 to only deoptimize this fn instead of all
 * of send().
 *
 * @param {String} path
 * @api private
 */function decode(e){try{return decodeURIComponent(e)}catch(e){return-1}}
/**
 * Get the header names on a response.
 *
 * @param {object} res
 * @returns {array[string]}
 * @private
 */function getHeaderNames(e){return typeof e.getHeaderNames!=="function"?Object.keys(e._headers||{}):e.getHeaderNames()}
/**
 * Determine if emitter has listeners of a given type.
 *
 * The way to do this check is done three different ways in Node.js >= 0.10
 * so this consolidates them into a minimal set using instance methods.
 *
 * @param {EventEmitter} emitter
 * @param {string} type
 * @returns {boolean}
 * @private
 */function hasListeners(e,t){var r=typeof e.listenerCount!=="function"?e.listeners(t).length:e.listenerCount(t);return r>0}
/**
 * Normalize the index option into an array.
 *
 * @param {boolean|string|array} val
 * @param {string} name
 * @private
 */function normalizeList(e,t){var r=[].concat(e||[]);for(var a=0;a<r.length;a++)if(typeof r[a]!=="string")throw new TypeError(t+" must be array of strings or false");return r}
/**
 * Parse an HTTP Date into a number.
 *
 * @param {string} date
 * @private
 */function parseHttpDate(e){var t=e&&Date.parse(e);return typeof t==="number"?t:NaN}
/**
 * Parse a HTTP token list.
 *
 * @param {string} str
 * @private
 */function parseTokenList(e){var t=0;var r=[];var a=0;for(var n=0,i=e.length;n<i;n++)switch(e.charCodeAt(n)){case 32:a===t&&(a=t=n+1);break;case 44:a!==t&&r.push(e.substring(a,t));a=t=n+1;break;default:t=n+1;break}a!==t&&r.push(e.substring(a,t));return r}
/**
 * Set an object of headers on a response.
 *
 * @param {object} res
 * @param {object} headers
 * @private
 */function setHeaders(e,t){var r=Object.keys(t);for(var a=0;a<r.length;a++){var n=r[a];e.setHeader(n,t[n])}}var ie=O;export{ie as default};

