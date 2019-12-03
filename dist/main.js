!function(t){var e={};function n(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(r,s,function(e){return t[e]}.bind(null,s));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(1);function s(t){if(t){const e=typeof t;return"object"===e||"function"===e}return!1}e.get=function(t,e,n){const o=Array.isArray(e)?e:r.toPath.cached(e);let i=t;for(const e of o){if(!s(i)){if(n)throw new ReferenceError(e+" is not defined in the scope ("+t+"). Parsed path: "+o);return}i=i[e]}return i}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r="'\"`";class s{constructor(t){this.size=t,this.reset()}reset(){this.oldestIndex=0,this.map={},this.cachedKeys=new Array(this.size)}get(t){return this.map[t]}set(t,e){this.map[t]=e;const n=this.cachedKeys[this.oldestIndex];void 0!==n&&delete this.map[n],this.cachedKeys[this.oldestIndex]=t,this.oldestIndex++,this.oldestIndex%=this.size}}e.Cache=s;const o=new s(100);function i(t){const e=t.charAt(0),n=t.substr(-1);if(r.includes(e)||r.includes(n)){if(t.length<2||e!==n)throw new SyntaxError("Mismatching string quotation: "+t);return t.substring(1,t.length-1)}if(t.includes("["))throw new SyntaxError("Missing ] in varName "+t);return"+"===e?t.substr(1):t}function a(t,e,n){let r=e.trim();if(""===r)return t;if(r.startsWith(".")){if(!n)throw new SyntaxError('Unexpected . at the start of "'+e+'"');if(r=r.substr(1).trim(),""===r)return t}else if(n)throw new SyntaxError('Missing . at the start of "'+e+'"');if(r.endsWith("."))throw new SyntaxError('Unexpected "." at the end of "'+e+'"');const s=r.split(".");for(const n of s){const r=n.trim();if(""===r)throw new SyntaxError('Empty prop name when parsing "'+e+'"');t.push(r)}return t}function c(t){if("string"!=typeof t)throw new TypeError("Expected string but Got "+t);let e,n,r,s=0,o=!1;const c=[];for(let h=0;h<t.length&&(e=t.indexOf("[",h),-1!==e);h=s){if(s=t.indexOf("]",e),-1===s)throw new SyntaxError("Missing ] in varName "+t);if(r=t.substring(e+1,s).trim(),0===r.length)throw new SyntaxError("Unexpected token ]");s++,n=t.substring(h,e),a(c,n,o),c.push(i(r)),o=!0}return a(c,t.substring(s),o)}e.toPath=c,c.cached=function(t){let e=o.get(t);return void 0===e&&(e=c(t),o.set(t,e)),e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(0),s=n(1),o={};e.Renderer=class{constructor(t,e=o){if(this.tokens=t,this.options=e,this.render=(t={})=>{const{varNames:e}=this.tokens,{length:n}=e;this.cacheParsedPaths();const s=new Array(n);for(let e=0;e<n;e++)s[e]=r.get(t,this.toPathCache[e],this.options.propsExist);return this.stringify(s)},this.renderFn=(t,e={})=>{const n=this.resolveVarNames(t,e);return this.stringify(n)},this.renderFnAsync=(t,e={})=>Promise.all(this.resolveVarNames(t,e)).then(t=>this.stringify(t)),null===t||"object"!=typeof t||!Array.isArray(t.strings)||!Array.isArray(t.varNames)||t.strings.length!==t.varNames.length+1)throw new TypeError("Invalid tokens object "+t);e.validateVarNames&&this.cacheParsedPaths()}cacheParsedPaths(){const{varNames:t}=this.tokens;if(void 0===this.toPathCache){this.toPathCache=new Array(t.length);for(let e=0;e<t.length;e++)this.toPathCache[e]=s.toPath.cached(t[e])}}resolveVarNames(t,e={}){const{varNames:n}=this.tokens;if("function"!=typeof t)throw new TypeError("Expected a resolver function but got "+t);const{length:r}=n,s=new Array(r);for(let o=0;o<r;o++)s[o]=t(n[o],e);return s}stringify(t){const{strings:e}=this.tokens,{explicit:n}=this.options;let r="";const{length:s}=t;for(let o=0;o<s;o++){r+=e[o];const s=t[o];(n||null!=s)&&(r+=s)}return r+=e[s],r}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=["{{","}}"];e.tokenize=function(t,e=r){if(!Array.isArray(e)||2!==e.length)throw Error("Tags should be an array with exactly two strings. Got "+e);const[n,s]=e;if("string"!=typeof n||"string"!=typeof s||0===n.length||0===s.length||n===s)throw new TypeError("The tags array should have two distinct non-empty strings. Got "+e.join(", "));const o=n.length,i=s.length;let a,c,h=0;const u=[],f=[];let l=0;for(;l<t.length&&(a=t.indexOf(n,l),-1!==a);){if(h=t.indexOf(s,a),-1===h)throw new SyntaxError("Missing "+s+" in the template expression "+t);if(c=t.substring(a+o,h).trim(),0===c.length)throw new SyntaxError("Unexpected token "+s);if(c.includes(n))throw new SyntaxError("Variable names cannot have "+n+" "+c);f.push(c),h+=i,u.push(t.substring(l,a)),l=h}return u.push(t.substring(h)),{strings:u,varNames:f}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(2),s=n(3),o={};e.compile=function(t,e=o){if("string"!=typeof t)throw new TypeError("The template parameter must be a string. Got "+t);if(null===e||"object"!=typeof e)throw new TypeError("The compiler options should be an object. Got "+e);const n=s.tokenize(t,e.tags);return new r.Renderer(n,e)}},function(t,e,n){const r=n(6);addEventListener("fetch",t=>{t.respondWith(async function(t){if("POST"===t.method){const e=await t.json(),n=t.headers.get("message")||e.message||"",s=r.render(n||"",e||{}),o=t.headers.get("slackwebhook"),i=t.headers.get("channel");await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({channel:i||"#general",text:s})})}return new Response({},{headers:{"content-type":"application/json"}})}(t.request))})},function(t,e,n){"use strict";function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(0)),r(n(2)),r(n(3)),r(n(4)),r(n(7))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const r=n(4);e.render=function(t,e,n){return r.compile(t,n).render(e)},e.renderFn=function(t,e,n,s){return r.compile(t,s).renderFn(e,n)},e.renderFnAsync=function(t,e,n,s){return r.compile(t,s).renderFnAsync(e,n)}}]);