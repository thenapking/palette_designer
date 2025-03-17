// fsevents@1.2.13 downloaded from https://ga.jspm.io/npm:fsevents@1.2.13/fsevents.js

import t from"bindings";import e from"events";import n from"fs";import o from"util";import a from"process";var r="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var s={};var i=a;if("darwin"!==i.platform)throw new Error("Module 'fsevents' is not compatible with platform '"+i.platform+"'");var v=t("fse");var m=e.EventEmitter;var l=n;var f=o.inherits;function FSEvents(t,e){m.call(this);Object.defineProperty(this,"_impl",{value:new v.FSEvents(String(t||""),e),enumerable:false,writable:false})}f(FSEvents,m);proxies(FSEvents,v.FSEvents);s=watch;s.getInfo=getInfo;s.FSEvents=v.FSEvents;s.Constants=v.Constants;var E=r.setImmediate||i.nextTick;function watch(t){var e=new FSEvents(String(t||""),handler);m.call(e);return e;function handler(t,n,o){E((function(){e.emit("fsevent",t,n,o);var a=getInfo(t,n);a.id=o;if("moved"===a.event)l.stat(a.path,(function(n,o){a.event=n||!o?"moved-out":"moved-in";e.emit("change",t,a);e.emit(a.event,t,a)}));else{e.emit("change",t,a);e.emit(a.event,t,a)}}))}}function proxies(t,e){Object.keys(e.prototype).filter((function(t){return"function"===typeof e.prototype[t]})).forEach((function(e){t.prototype[e]=function(){this._impl[e].apply(this._impl,arguments);return this}}))}function getFileType(t){return v.Constants.kFSEventStreamEventFlagItemIsFile&t?"file":v.Constants.kFSEventStreamEventFlagItemIsDir&t?"directory":v.Constants.kFSEventStreamEventFlagItemIsSymlink&t?"symlink":void 0}function getEventType(t){return v.Constants.kFSEventStreamEventFlagItemRemoved&t?"deleted":v.Constants.kFSEventStreamEventFlagItemRenamed&t?"moved":v.Constants.kFSEventStreamEventFlagItemCreated&t?"created":v.Constants.kFSEventStreamEventFlagItemModified&t?"modified":v.Constants.kFSEventStreamEventFlagRootChanged&t?"root-changed":"unknown"}function getFileChanges(t){return{inode:!!(v.Constants.kFSEventStreamEventFlagItemInodeMetaMod&t),finder:!!(v.Constants.kFSEventStreamEventFlagItemFinderInfoMod&t),access:!!(v.Constants.kFSEventStreamEventFlagItemChangeOwner&t),xattrs:!!(v.Constants.kFSEventStreamEventFlagItemXattrMod&t)}}function getInfo(t,e){return{path:t,event:getEventType(e),type:getFileType(e),changes:getFileChanges(e),flags:e}}var F=s;const g=s.Constants;const d=s.getInfo,S=s.FSEvents;export default F;export{g as Constants,S as FSEvents,d as getInfo};

