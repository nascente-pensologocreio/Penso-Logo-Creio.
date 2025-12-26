const Lc=()=>{};var co={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Fc=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},ya={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,g=o>>2,I=(o&3)<<4|l>>4;let w=(l&15)<<2|d>>6,P=d&63;h||(P=64,a||(w=64)),r.push(e[g],e[I],e[w],e[P])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(_a(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Fc(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const d=s<n.length?e[n.charAt(s)]:64;++s;const I=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||d==null||I==null)throw new Uc;const w=o<<2|l>>4;if(r.push(w),d!==64){const P=l<<4&240|d>>2;if(r.push(P),I!==64){const k=d<<6&192|I;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Uc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Bc=function(n){const t=_a(n);return ya.encodeByteArray(t,!0)},Zn=function(n){return Bc(n).replace(/\./g,"")},jc=function(n){try{return ya.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=()=>qc().__FIREBASE_DEFAULTS__,zc=()=>{if(typeof process>"u"||typeof co>"u")return;const n=co.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Hc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&jc(n[1]);return t&&JSON.parse(t)},bs=()=>{try{return Lc()||$c()||zc()||Hc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Gc=n=>{var t,e;return(e=(t=bs())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},Kc=n=>{const t=Gc(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Ea=()=>{var n;return(n=bs())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ds(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wc(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xc(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Zn(JSON.stringify(e)),Zn(JSON.stringify(a)),""].join(".")}const un={};function Yc(){const n={prod:[],emulator:[]};for(const t of Object.keys(un))un[t]?n.emulator.push(t):n.prod.push(t);return n}function Jc(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let lo=!1;function Zc(n,t){if(typeof window>"u"||typeof document>"u"||!Ds(window.location.host)||un[n]===t||un[n]||lo)return;un[n]=t;function e(w){return`__firebase__banner__${w}`}const r="__firebase__banner",o=Yc().prod.length>0;function a(){const w=document.getElementById(r);w&&w.remove()}function l(w){w.style.display="flex",w.style.background="#7faaf0",w.style.position="fixed",w.style.bottom="5px",w.style.left="5px",w.style.padding=".5em",w.style.borderRadius="5px",w.style.alignItems="center"}function h(w,P){w.setAttribute("width","24"),w.setAttribute("id",P),w.setAttribute("height","24"),w.setAttribute("viewBox","0 0 24 24"),w.setAttribute("fill","none"),w.style.marginLeft="-6px"}function d(){const w=document.createElement("span");return w.style.cursor="pointer",w.style.marginLeft="16px",w.style.fontSize="24px",w.innerHTML=" &times;",w.onclick=()=>{lo=!0,a()},w}function g(w,P){w.setAttribute("id",P),w.innerText="Learn more",w.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",w.setAttribute("target","__blank"),w.style.paddingLeft="5px",w.style.textDecoration="underline"}function I(){const w=Jc(r),P=e("text"),k=document.getElementById(P)||document.createElement("span"),O=e("learnmore"),b=document.getElementById(O)||document.createElement("a"),G=e("preprendIcon"),z=document.getElementById(G)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(w.created){const K=w.element;l(K),g(b,O);const ut=d();h(z,G),K.append(z,k,b,ut),document.body.appendChild(K)}o?(k.innerText="Preview backend disconnected.",z.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(z.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",I):I()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function el(){var t;const n=(t=bs())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function nl(){return!el()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function rl(){try{return typeof indexedDB=="object"}catch{return!1}}function sl(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il="FirebaseError";class xe extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=il,Object.setPrototypeOf(this,xe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ta.prototype.create)}}class Ta{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?ol(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new xe(s,l,r)}}function ol(n,t){return n.replace(al,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const al=/\{\$([^}]+)}/g;function tr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(ho(o)&&ho(a)){if(!tr(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function ho(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n){return n&&n._delegate?n._delegate:n}class mn{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Qc;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(ll(t))try{this.getOrInitializeService({instanceIdentifier:le})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=le){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=le){return this.instances.has(t)}getOptions(t=le){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:cl(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=le){return this.component?this.component.multipleInstances?t:le:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function cl(n){return n===le?void 0:n}function ll(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new ul(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const fl={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},dl=$.INFO,ml={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},pl=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=ml[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Ia{constructor(t){this.name=t,this._logLevel=dl,this._logHandler=pl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in $))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?fl[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...t),this._logHandler(this,$.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...t),this._logHandler(this,$.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,$.INFO,...t),this._logHandler(this,$.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,$.WARN,...t),this._logHandler(this,$.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...t),this._logHandler(this,$.ERROR,...t)}}const gl=(n,t)=>t.some(e=>n instanceof e);let fo,mo;function _l(){return fo||(fo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function yl(){return mo||(mo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const va=new WeakMap,cs=new WeakMap,Aa=new WeakMap,ts=new WeakMap,Ns=new WeakMap;function El(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Qt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&va.set(e,n)}).catch(()=>{}),Ns.set(t,n),t}function Tl(n){if(cs.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});cs.set(n,t)}let ls={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return cs.get(n);if(t==="objectStoreNames")return n.objectStoreNames||Aa.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Qt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Il(n){ls=n(ls)}function vl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(es(this),t,...e);return Aa.set(r,t.sort?t.sort():[t]),Qt(r)}:yl().includes(n)?function(...t){return n.apply(es(this),t),Qt(va.get(this))}:function(...t){return Qt(n.apply(es(this),t))}}function Al(n){return typeof n=="function"?vl(n):(n instanceof IDBTransaction&&Tl(n),gl(n,_l())?new Proxy(n,ls):n)}function Qt(n){if(n instanceof IDBRequest)return El(n);if(ts.has(n))return ts.get(n);const t=Al(n);return t!==n&&(ts.set(n,t),Ns.set(t,n)),t}const es=n=>Ns.get(n);function wl(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),l=Qt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Qt(a.result),h.oldVersion,h.newVersion,Qt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Rl=["get","getKey","getAll","getAllKeys","count"],Sl=["put","add","delete","clear"],ns=new Map;function po(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(ns.get(t))return ns.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Sl.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Rl.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[e](...l),s&&h.done]))[0]};return ns.set(t,o),o}Il(n=>({...n,get:(t,e,r)=>po(t,e)||n.get(t,e,r),has:(t,e)=>!!po(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Pl(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Pl(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const hs="@firebase/app",go="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new Ia("@firebase/app"),Vl="@firebase/app-compat",bl="@firebase/analytics-compat",Dl="@firebase/analytics",Nl="@firebase/app-check-compat",kl="@firebase/app-check",Ol="@firebase/auth",Ml="@firebase/auth-compat",xl="@firebase/database",Ll="@firebase/data-connect",Fl="@firebase/database-compat",Ul="@firebase/functions",Bl="@firebase/functions-compat",jl="@firebase/installations",ql="@firebase/installations-compat",$l="@firebase/messaging",zl="@firebase/messaging-compat",Hl="@firebase/performance",Gl="@firebase/performance-compat",Kl="@firebase/remote-config",Ql="@firebase/remote-config-compat",Wl="@firebase/storage",Xl="@firebase/storage-compat",Yl="@firebase/firestore",Jl="@firebase/ai",Zl="@firebase/firestore-compat",th="firebase",eh="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs="[DEFAULT]",nh={[hs]:"fire-core",[Vl]:"fire-core-compat",[Dl]:"fire-analytics",[bl]:"fire-analytics-compat",[kl]:"fire-app-check",[Nl]:"fire-app-check-compat",[Ol]:"fire-auth",[Ml]:"fire-auth-compat",[xl]:"fire-rtdb",[Ll]:"fire-data-connect",[Fl]:"fire-rtdb-compat",[Ul]:"fire-fn",[Bl]:"fire-fn-compat",[jl]:"fire-iid",[ql]:"fire-iid-compat",[$l]:"fire-fcm",[zl]:"fire-fcm-compat",[Hl]:"fire-perf",[Gl]:"fire-perf-compat",[Kl]:"fire-rc",[Ql]:"fire-rc-compat",[Wl]:"fire-gcs",[Xl]:"fire-gcs-compat",[Yl]:"fire-fst",[Zl]:"fire-fst-compat",[Jl]:"fire-vertex","fire-js":"fire-js",[th]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=new Map,rh=new Map,ds=new Map;function _o(n,t){try{n.container.addComponent(t)}catch(e){Ft.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function nr(n){const t=n.name;if(ds.has(t))return Ft.debug(`There were multiple attempts to register component ${t}.`),!1;ds.set(t,n);for(const e of er.values())_o(e,n);for(const e of rh.values())_o(e,n);return!0}function sh(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function ih(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Wt=new Ta("app","Firebase",oh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new mn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Wt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh=eh;function ch(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:fs,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Wt.create("bad-app-name",{appName:String(s)});if(e||(e=Ea()),!e)throw Wt.create("no-options");const o=er.get(s);if(o){if(tr(e,o.options)&&tr(r,o.config))return o;throw Wt.create("duplicate-app",{appName:s})}const a=new hl(s);for(const h of ds.values())a.addComponent(h);const l=new ah(e,r,a);return er.set(s,l),l}function lh(n=fs){const t=er.get(n);if(!t&&n===fs&&Ea())return ch();if(!t)throw Wt.create("no-app",{appName:n});return t}function Ce(n,t,e){let r=nh[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ft.warn(a.join(" "));return}nr(new mn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh="firebase-heartbeat-database",fh=1,pn="firebase-heartbeat-store";let rs=null;function wa(){return rs||(rs=wl(hh,fh,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(pn)}catch(e){console.warn(e)}}}}).catch(n=>{throw Wt.create("idb-open",{originalErrorMessage:n.message})})),rs}async function dh(n){try{const e=(await wa()).transaction(pn),r=await e.objectStore(pn).get(Ra(n));return await e.done,r}catch(t){if(t instanceof xe)Ft.warn(t.message);else{const e=Wt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ft.warn(e.message)}}}async function yo(n,t){try{const r=(await wa()).transaction(pn,"readwrite");await r.objectStore(pn).put(t,Ra(n)),await r.done}catch(e){if(e instanceof xe)Ft.warn(e.message);else{const r=Wt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ft.warn(r.message)}}}function Ra(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh=1024,ph=30;class gh{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new yh(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Eo();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>ph){const a=Eh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ft.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Eo(),{heartbeatsToSend:r,unsentEntries:s}=_h(this._heartbeatsCache.heartbeats),o=Zn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Ft.warn(e),""}}}function Eo(){return new Date().toISOString().substring(0,10)}function _h(n,t=mh){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),To(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),To(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class yh{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return rl()?sl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await dh(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return yo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return yo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function To(n){return Zn(JSON.stringify({version:2,heartbeats:n})).length}function Eh(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Th(n){nr(new mn("platform-logger",t=>new Cl(t),"PRIVATE")),nr(new mn("heartbeat",t=>new gh(t),"PRIVATE")),Ce(hs,go,n),Ce(hs,go,"esm2020"),Ce("fire-js","")}Th("");var Io=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xt,Sa;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,m){function _(){}_.prototype=m.prototype,E.F=m.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(T,y,A){for(var p=Array(arguments.length-2),Tt=2;Tt<arguments.length;Tt++)p[Tt-2]=arguments[Tt];return m.prototype[y].apply(T,p)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,m,_){_||(_=0);const T=Array(16);if(typeof m=="string")for(var y=0;y<16;++y)T[y]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(y=0;y<16;++y)T[y]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=E.g[0],_=E.g[1],y=E.g[2];let A=E.g[3],p;p=m+(A^_&(y^A))+T[0]+3614090360&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(y^m&(_^y))+T[1]+3905402710&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(_^A&(m^_))+T[2]+606105819&4294967295,y=A+(p<<17&4294967295|p>>>15),p=_+(m^y&(A^m))+T[3]+3250441966&4294967295,_=y+(p<<22&4294967295|p>>>10),p=m+(A^_&(y^A))+T[4]+4118548399&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(y^m&(_^y))+T[5]+1200080426&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(_^A&(m^_))+T[6]+2821735955&4294967295,y=A+(p<<17&4294967295|p>>>15),p=_+(m^y&(A^m))+T[7]+4249261313&4294967295,_=y+(p<<22&4294967295|p>>>10),p=m+(A^_&(y^A))+T[8]+1770035416&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(y^m&(_^y))+T[9]+2336552879&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(_^A&(m^_))+T[10]+4294925233&4294967295,y=A+(p<<17&4294967295|p>>>15),p=_+(m^y&(A^m))+T[11]+2304563134&4294967295,_=y+(p<<22&4294967295|p>>>10),p=m+(A^_&(y^A))+T[12]+1804603682&4294967295,m=_+(p<<7&4294967295|p>>>25),p=A+(y^m&(_^y))+T[13]+4254626195&4294967295,A=m+(p<<12&4294967295|p>>>20),p=y+(_^A&(m^_))+T[14]+2792965006&4294967295,y=A+(p<<17&4294967295|p>>>15),p=_+(m^y&(A^m))+T[15]+1236535329&4294967295,_=y+(p<<22&4294967295|p>>>10),p=m+(y^A&(_^y))+T[1]+4129170786&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^y&(m^_))+T[6]+3225465664&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^_&(A^m))+T[11]+643717713&4294967295,y=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(y^A))+T[0]+3921069994&4294967295,_=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(_^y))+T[5]+3593408605&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^y&(m^_))+T[10]+38016083&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^_&(A^m))+T[15]+3634488961&4294967295,y=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(y^A))+T[4]+3889429448&4294967295,_=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(_^y))+T[9]+568446438&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^y&(m^_))+T[14]+3275163606&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^_&(A^m))+T[3]+4107603335&4294967295,y=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(y^A))+T[8]+1163531501&4294967295,_=y+(p<<20&4294967295|p>>>12),p=m+(y^A&(_^y))+T[13]+2850285829&4294967295,m=_+(p<<5&4294967295|p>>>27),p=A+(_^y&(m^_))+T[2]+4243563512&4294967295,A=m+(p<<9&4294967295|p>>>23),p=y+(m^_&(A^m))+T[7]+1735328473&4294967295,y=A+(p<<14&4294967295|p>>>18),p=_+(A^m&(y^A))+T[12]+2368359562&4294967295,_=y+(p<<20&4294967295|p>>>12),p=m+(_^y^A)+T[5]+4294588738&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^y)+T[8]+2272392833&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^_)+T[11]+1839030562&4294967295,y=A+(p<<16&4294967295|p>>>16),p=_+(y^A^m)+T[14]+4259657740&4294967295,_=y+(p<<23&4294967295|p>>>9),p=m+(_^y^A)+T[1]+2763975236&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^y)+T[4]+1272893353&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^_)+T[7]+4139469664&4294967295,y=A+(p<<16&4294967295|p>>>16),p=_+(y^A^m)+T[10]+3200236656&4294967295,_=y+(p<<23&4294967295|p>>>9),p=m+(_^y^A)+T[13]+681279174&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^y)+T[0]+3936430074&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^_)+T[3]+3572445317&4294967295,y=A+(p<<16&4294967295|p>>>16),p=_+(y^A^m)+T[6]+76029189&4294967295,_=y+(p<<23&4294967295|p>>>9),p=m+(_^y^A)+T[9]+3654602809&4294967295,m=_+(p<<4&4294967295|p>>>28),p=A+(m^_^y)+T[12]+3873151461&4294967295,A=m+(p<<11&4294967295|p>>>21),p=y+(A^m^_)+T[15]+530742520&4294967295,y=A+(p<<16&4294967295|p>>>16),p=_+(y^A^m)+T[2]+3299628645&4294967295,_=y+(p<<23&4294967295|p>>>9),p=m+(y^(_|~A))+T[0]+4096336452&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~y))+T[7]+1126891415&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~_))+T[14]+2878612391&4294967295,y=A+(p<<15&4294967295|p>>>17),p=_+(A^(y|~m))+T[5]+4237533241&4294967295,_=y+(p<<21&4294967295|p>>>11),p=m+(y^(_|~A))+T[12]+1700485571&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~y))+T[3]+2399980690&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~_))+T[10]+4293915773&4294967295,y=A+(p<<15&4294967295|p>>>17),p=_+(A^(y|~m))+T[1]+2240044497&4294967295,_=y+(p<<21&4294967295|p>>>11),p=m+(y^(_|~A))+T[8]+1873313359&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~y))+T[15]+4264355552&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~_))+T[6]+2734768916&4294967295,y=A+(p<<15&4294967295|p>>>17),p=_+(A^(y|~m))+T[13]+1309151649&4294967295,_=y+(p<<21&4294967295|p>>>11),p=m+(y^(_|~A))+T[4]+4149444226&4294967295,m=_+(p<<6&4294967295|p>>>26),p=A+(_^(m|~y))+T[11]+3174756917&4294967295,A=m+(p<<10&4294967295|p>>>22),p=y+(m^(A|~_))+T[2]+718787259&4294967295,y=A+(p<<15&4294967295|p>>>17),p=_+(A^(y|~m))+T[9]+3951481745&4294967295,E.g[0]=E.g[0]+m&4294967295,E.g[1]=E.g[1]+(y+(p<<21&4294967295|p>>>11))&4294967295,E.g[2]=E.g[2]+y&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.v=function(E,m){m===void 0&&(m=E.length);const _=m-this.blockSize,T=this.C;let y=this.h,A=0;for(;A<m;){if(y==0)for(;A<=_;)s(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<m;)if(T[y++]=E.charCodeAt(A++),y==this.blockSize){s(this,T),y=0;break}}else for(;A<m;)if(T[y++]=E[A++],y==this.blockSize){s(this,T),y=0;break}}this.h=y,this.o+=m},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var m=1;m<E.length-8;++m)E[m]=0;m=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=m&255,m/=256;for(this.v(E),E=Array(16),m=0,_=0;_<4;++_)for(let T=0;T<32;T+=8)E[m++]=this.g[_]>>>T&255;return E};function o(E,m){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=m(E)}function a(E,m){this.h=m;const _=[];let T=!0;for(let y=E.length-1;y>=0;y--){const A=E[y]|0;T&&A==m||(_[y]=A,T=!1)}this.g=_}var l={};function h(E){return-128<=E&&E<128?o(E,function(m){return new a([m|0],m<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return I;if(E<0)return b(d(-E));const m=[];let _=1;for(let T=0;E>=_;T++)m[T]=E/_|0,_*=4294967296;return new a(m,0)}function g(E,m){if(E.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(E.charAt(0)=="-")return b(g(E.substring(1),m));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(m,8));let T=I;for(let A=0;A<E.length;A+=8){var y=Math.min(8,E.length-A);const p=parseInt(E.substring(A,A+y),m);y<8?(y=d(Math.pow(m,y)),T=T.j(y).add(d(p))):(T=T.j(_),T=T.add(d(p)))}return T}var I=h(0),w=h(1),P=h(16777216);n=a.prototype,n.m=function(){if(O(this))return-b(this).m();let E=0,m=1;for(let _=0;_<this.g.length;_++){const T=this.i(_);E+=(T>=0?T:4294967296+T)*m,m*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(O(this))return"-"+b(this).toString(E);const m=d(Math.pow(E,6));var _=this;let T="";for(;;){const y=ut(_,m).g;_=G(_,y.j(m));let A=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=y,k(_))return A+T;for(;A.length<6;)A="0"+A;T=A+T}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(let m=0;m<E.g.length;m++)if(E.g[m]!=0)return!1;return!0}function O(E){return E.h==-1}n.l=function(E){return E=G(this,E),O(E)?-1:k(E)?0:1};function b(E){const m=E.g.length,_=[];for(let T=0;T<m;T++)_[T]=~E.g[T];return new a(_,~E.h).add(w)}n.abs=function(){return O(this)?b(this):this},n.add=function(E){const m=Math.max(this.g.length,E.g.length),_=[];let T=0;for(let y=0;y<=m;y++){let A=T+(this.i(y)&65535)+(E.i(y)&65535),p=(A>>>16)+(this.i(y)>>>16)+(E.i(y)>>>16);T=p>>>16,A&=65535,p&=65535,_[y]=p<<16|A}return new a(_,_[_.length-1]&-2147483648?-1:0)};function G(E,m){return E.add(b(m))}n.j=function(E){if(k(this)||k(E))return I;if(O(this))return O(E)?b(this).j(b(E)):b(b(this).j(E));if(O(E))return b(this.j(b(E)));if(this.l(P)<0&&E.l(P)<0)return d(this.m()*E.m());const m=this.g.length+E.g.length,_=[];for(var T=0;T<2*m;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(let y=0;y<E.g.length;y++){const A=this.i(T)>>>16,p=this.i(T)&65535,Tt=E.i(y)>>>16,se=E.i(y)&65535;_[2*T+2*y]+=p*se,z(_,2*T+2*y),_[2*T+2*y+1]+=A*se,z(_,2*T+2*y+1),_[2*T+2*y+1]+=p*Tt,z(_,2*T+2*y+1),_[2*T+2*y+2]+=A*Tt,z(_,2*T+2*y+2)}for(E=0;E<m;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=m;E<2*m;E++)_[E]=0;return new a(_,0)};function z(E,m){for(;(E[m]&65535)!=E[m];)E[m+1]+=E[m]>>>16,E[m]&=65535,m++}function K(E,m){this.g=E,this.h=m}function ut(E,m){if(k(m))throw Error("division by zero");if(k(E))return new K(I,I);if(O(E))return m=ut(b(E),m),new K(b(m.g),b(m.h));if(O(m))return m=ut(E,b(m)),new K(b(m.g),m.h);if(E.g.length>30){if(O(E)||O(m))throw Error("slowDivide_ only works with positive integers.");for(var _=w,T=m;T.l(E)<=0;)_=vt(_),T=vt(T);var y=rt(_,1),A=rt(T,1);for(T=rt(T,2),_=rt(_,2);!k(T);){var p=A.add(T);p.l(E)<=0&&(y=y.add(_),A=p),T=rt(T,1),_=rt(_,1)}return m=G(E,y.j(m)),new K(y,m)}for(y=I;E.l(m)>=0;){for(_=Math.max(1,Math.floor(E.m()/m.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),A=d(_),p=A.j(m);O(p)||p.l(E)>0;)_-=T,A=d(_),p=A.j(m);k(A)&&(A=w),y=y.add(A),E=G(E,p)}return new K(y,E)}n.B=function(E){return ut(this,E).h},n.and=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)&E.i(T);return new a(_,this.h&E.h)},n.or=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)|E.i(T);return new a(_,this.h|E.h)},n.xor=function(E){const m=Math.max(this.g.length,E.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)^E.i(T);return new a(_,this.h^E.h)};function vt(E){const m=E.g.length+1,_=[];for(let T=0;T<m;T++)_[T]=E.i(T)<<1|E.i(T-1)>>>31;return new a(_,E.h)}function rt(E,m){const _=m>>5;m%=32;const T=E.g.length-_,y=[];for(let A=0;A<T;A++)y[A]=m>0?E.i(A+_)>>>m|E.i(A+_+1)<<32-m:E.i(A+_);return new a(y,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Sa=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=g,Xt=a}).apply(typeof Io<"u"?Io:typeof self<"u"?self:typeof window<"u"?window:{});var qn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ca,rn,Pa,Kn,ms,Va,ba,Da;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof qn=="object"&&qn];for(var u=0;u<i.length;++u){var c=i[u];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=e(this);function s(i,u){if(u)t:{var c=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var v=i[f];if(!(v in c))break t;c=c[v]}i=i[i.length-1],f=c[i],u=u(f),u!=f&&u!=null&&t(c,i,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(u){var c=[],f;for(f in u)Object.prototype.hasOwnProperty.call(u,f)&&c.push([f,u[f]]);return c}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function h(i,u,c){return i.call.apply(i.bind,arguments)}function d(i,u,c){return d=h,d.apply(null,arguments)}function g(i,u){var c=Array.prototype.slice.call(arguments,1);return function(){var f=c.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function I(i,u){function c(){}c.prototype=u.prototype,i.Z=u.prototype,i.prototype=new c,i.prototype.constructor=i,i.Ob=function(f,v,R){for(var V=Array(arguments.length-2),U=2;U<arguments.length;U++)V[U-2]=arguments[U];return u.prototype[v].apply(f,V)}}var w=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function P(i){const u=i.length;if(u>0){const c=Array(u);for(let f=0;f<u;f++)c[f]=i[f];return c}return[]}function k(i,u){for(let f=1;f<arguments.length;f++){const v=arguments[f];var c=typeof v;if(c=c!="object"?c:v?Array.isArray(v)?"array":c:"null",c=="array"||c=="object"&&typeof v.length=="number"){c=i.length||0;const R=v.length||0;i.length=c+R;for(let V=0;V<R;V++)i[c+V]=v[V]}else i.push(v)}}class O{constructor(u,c){this.i=u,this.j=c,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function b(i){a.setTimeout(()=>{throw i},0)}function G(){var i=E;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class z{constructor(){this.h=this.g=null}add(u,c){const f=K.get();f.set(u,c),this.h?this.h.next=f:this.g=f,this.h=f}}var K=new O(()=>new ut,i=>i.reset());class ut{constructor(){this.next=this.g=this.h=null}set(u,c){this.h=u,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let vt,rt=!1,E=new z,m=()=>{const i=Promise.resolve(void 0);vt=()=>{i.then(_)}};function _(){for(var i;i=G();){try{i.h.call(i.g)}catch(c){b(c)}var u=K;u.j(i),u.h<100&&(u.h++,i.next=u.g,u.g=i)}rt=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};a.addEventListener("test",c,u),a.removeEventListener("test",c,u)}catch{}return i}();function p(i){return/^[\s\xa0]*$/.test(i)}function Tt(i,u){y.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,u)}I(Tt,y),Tt.prototype.init=function(i,u){const c=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget,u||(c=="mouseover"?u=i.fromElement:c=="mouseout"&&(u=i.toElement)),this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&Tt.Z.h.call(this)},Tt.prototype.h=function(){Tt.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var se="closure_listenable_"+(Math.random()*1e6|0),ic=0;function oc(i,u,c,f,v){this.listener=i,this.proxy=null,this.src=u,this.type=c,this.capture=!!f,this.ha=v,this.key=++ic,this.da=this.fa=!1}function Cn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Pn(i,u,c){for(const f in i)u.call(c,i[f],f,i)}function ac(i,u){for(const c in i)u.call(void 0,i[c],c,i)}function ui(i){const u={};for(const c in i)u[c]=i[c];return u}const ci="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function li(i,u){let c,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(c in f)i[c]=f[c];for(let R=0;R<ci.length;R++)c=ci[R],Object.prototype.hasOwnProperty.call(f,c)&&(i[c]=f[c])}}function Vn(i){this.src=i,this.g={},this.h=0}Vn.prototype.add=function(i,u,c,f,v){const R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);const V=Dr(i,u,f,v);return V>-1?(u=i[V],c||(u.fa=!1)):(u=new oc(u,this.src,R,!!f,v),u.fa=c,i.push(u)),u};function br(i,u){const c=u.type;if(c in i.g){var f=i.g[c],v=Array.prototype.indexOf.call(f,u,void 0),R;(R=v>=0)&&Array.prototype.splice.call(f,v,1),R&&(Cn(u),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Dr(i,u,c,f){for(let v=0;v<i.length;++v){const R=i[v];if(!R.da&&R.listener==u&&R.capture==!!c&&R.ha==f)return v}return-1}var Nr="closure_lm_"+(Math.random()*1e6|0),kr={};function hi(i,u,c,f,v){if(Array.isArray(u)){for(let R=0;R<u.length;R++)hi(i,u[R],c,f,v);return null}return c=mi(c),i&&i[se]?i.J(u,c,l(f)?!!f.capture:!1,v):uc(i,u,c,!1,f,v)}function uc(i,u,c,f,v,R){if(!u)throw Error("Invalid event type");const V=l(v)?!!v.capture:!!v;let U=Mr(i);if(U||(i[Nr]=U=new Vn(i)),c=U.add(u,c,f,V,R),c.proxy)return c;if(f=cc(),c.proxy=f,f.src=i,f.listener=c,i.addEventListener)A||(v=V),v===void 0&&(v=!1),i.addEventListener(u.toString(),f,v);else if(i.attachEvent)i.attachEvent(di(u.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return c}function cc(){function i(c){return u.call(i.src,i.listener,c)}const u=lc;return i}function fi(i,u,c,f,v){if(Array.isArray(u))for(var R=0;R<u.length;R++)fi(i,u[R],c,f,v);else f=l(f)?!!f.capture:!!f,c=mi(c),i&&i[se]?(i=i.i,R=String(u).toString(),R in i.g&&(u=i.g[R],c=Dr(u,c,f,v),c>-1&&(Cn(u[c]),Array.prototype.splice.call(u,c,1),u.length==0&&(delete i.g[R],i.h--)))):i&&(i=Mr(i))&&(u=i.g[u.toString()],i=-1,u&&(i=Dr(u,c,f,v)),(c=i>-1?u[i]:null)&&Or(c))}function Or(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[se])br(u.i,i);else{var c=i.type,f=i.proxy;u.removeEventListener?u.removeEventListener(c,f,i.capture):u.detachEvent?u.detachEvent(di(c),f):u.addListener&&u.removeListener&&u.removeListener(f),(c=Mr(u))?(br(c,i),c.h==0&&(c.src=null,u[Nr]=null)):Cn(i)}}}function di(i){return i in kr?kr[i]:kr[i]="on"+i}function lc(i,u){if(i.da)i=!0;else{u=new Tt(u,this);const c=i.listener,f=i.ha||i.src;i.fa&&Or(i),i=c.call(f,u)}return i}function Mr(i){return i=i[Nr],i instanceof Vn?i:null}var xr="__closure_events_fn_"+(Math.random()*1e9>>>0);function mi(i){return typeof i=="function"?i:(i[xr]||(i[xr]=function(u){return i.handleEvent(u)}),i[xr])}function mt(){T.call(this),this.i=new Vn(this),this.M=this,this.G=null}I(mt,T),mt.prototype[se]=!0,mt.prototype.removeEventListener=function(i,u,c,f){fi(this,i,u,c,f)};function yt(i,u){var c,f=i.G;if(f)for(c=[];f;f=f.G)c.push(f);if(i=i.M,f=u.type||u,typeof u=="string")u=new y(u,i);else if(u instanceof y)u.target=u.target||i;else{var v=u;u=new y(f,i),li(u,v)}v=!0;let R,V;if(c)for(V=c.length-1;V>=0;V--)R=u.g=c[V],v=bn(R,f,!0,u)&&v;if(R=u.g=i,v=bn(R,f,!0,u)&&v,v=bn(R,f,!1,u)&&v,c)for(V=0;V<c.length;V++)R=u.g=c[V],v=bn(R,f,!1,u)&&v}mt.prototype.N=function(){if(mt.Z.N.call(this),this.i){var i=this.i;for(const u in i.g){const c=i.g[u];for(let f=0;f<c.length;f++)Cn(c[f]);delete i.g[u],i.h--}}this.G=null},mt.prototype.J=function(i,u,c,f){return this.i.add(String(i),u,!1,c,f)},mt.prototype.K=function(i,u,c,f){return this.i.add(String(i),u,!0,c,f)};function bn(i,u,c,f){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();let v=!0;for(let R=0;R<u.length;++R){const V=u[R];if(V&&!V.da&&V.capture==c){const U=V.listener,st=V.ha||V.src;V.fa&&br(i.i,V),v=U.call(st,f)!==!1&&v}}return v&&!f.defaultPrevented}function hc(i,u){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=d(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(i,u||0)}function pi(i){i.g=hc(()=>{i.g=null,i.i&&(i.i=!1,pi(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class fc extends T{constructor(u,c){super(),this.m=u,this.l=c,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:pi(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function je(i){T.call(this),this.h=i,this.g={}}I(je,T);var gi=[];function _i(i){Pn(i.g,function(u,c){this.g.hasOwnProperty(c)&&Or(u)},i),i.g={}}je.prototype.N=function(){je.Z.N.call(this),_i(this)},je.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Lr=a.JSON.stringify,dc=a.JSON.parse,mc=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function yi(){}function Ei(){}var qe={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Fr(){y.call(this,"d")}I(Fr,y);function Ur(){y.call(this,"c")}I(Ur,y);var ie={},Ti=null;function Dn(){return Ti=Ti||new mt}ie.Ia="serverreachability";function Ii(i){y.call(this,ie.Ia,i)}I(Ii,y);function $e(i){const u=Dn();yt(u,new Ii(u))}ie.STAT_EVENT="statevent";function vi(i,u){y.call(this,ie.STAT_EVENT,i),this.stat=u}I(vi,y);function Et(i){const u=Dn();yt(u,new vi(u,i))}ie.Ja="timingevent";function Ai(i,u){y.call(this,ie.Ja,i),this.size=u}I(Ai,y);function ze(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},u)}function He(){this.g=!0}He.prototype.ua=function(){this.g=!1};function pc(i,u,c,f,v,R){i.info(function(){if(i.g)if(R){var V="",U=R.split("&");for(let Q=0;Q<U.length;Q++){var st=U[Q].split("=");if(st.length>1){const ct=st[0];st=st[1];const Pt=ct.split("_");V=Pt.length>=2&&Pt[1]=="type"?V+(ct+"="+st+"&"):V+(ct+"=redacted&")}}}else V=null;else V=R;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+u+`
`+c+`
`+V})}function gc(i,u,c,f,v,R,V){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+u+`
`+c+`
`+R+" "+V})}function Te(i,u,c,f){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+yc(i,c)+(f?" "+f:"")})}function _c(i,u){i.info(function(){return"TIMEOUT: "+u})}He.prototype.info=function(){};function yc(i,u){if(!i.g)return u;if(!u)return null;try{const R=JSON.parse(u);if(R){for(i=0;i<R.length;i++)if(Array.isArray(R[i])){var c=R[i];if(!(c.length<2)){var f=c[1];if(Array.isArray(f)&&!(f.length<1)){var v=f[0];if(v!="noop"&&v!="stop"&&v!="close")for(let V=1;V<f.length;V++)f[V]=""}}}}return Lr(R)}catch{return u}}var Nn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},wi={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ri;function Br(){}I(Br,yi),Br.prototype.g=function(){return new XMLHttpRequest},Ri=new Br;function Ge(i){return encodeURIComponent(String(i))}function Ec(i){var u=1;i=i.split(":");const c=[];for(;u>0&&i.length;)c.push(i.shift()),u--;return i.length&&c.push(i.join(":")),c}function jt(i,u,c,f){this.j=i,this.i=u,this.l=c,this.S=f||1,this.V=new je(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Si}function Si(){this.i=null,this.g="",this.h=!1}var Ci={},jr={};function qr(i,u,c){i.M=1,i.A=On(Ct(u)),i.u=c,i.R=!0,Pi(i,null)}function Pi(i,u){i.F=Date.now(),kn(i),i.B=Ct(i.A);var c=i.B,f=i.S;Array.isArray(f)||(f=[String(f)]),ji(c.i,"t",f),i.C=0,c=i.j.L,i.h=new Si,i.g=io(i.j,c?u:null,!i.u),i.P>0&&(i.O=new fc(d(i.Y,i,i.g),i.P)),u=i.V,c=i.g,f=i.ba;var v="readystatechange";Array.isArray(v)||(v&&(gi[0]=v.toString()),v=gi);for(let R=0;R<v.length;R++){const V=hi(c,v[R],f||u.handleEvent,!1,u.h||u);if(!V)break;u.g[V.key]=V}u=i.J?ui(i.J):{},i.u?(i.v||(i.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,u)):(i.v="GET",i.g.ea(i.B,i.v,null,u)),$e(),pc(i.i,i.v,i.B,i.l,i.S,i.u)}jt.prototype.ba=function(i){i=i.target;const u=this.O;u&&zt(i)==3?u.j():this.Y(i)},jt.prototype.Y=function(i){try{if(i==this.g)t:{const U=zt(this.g),st=this.g.ya(),Q=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||Qi(this.g)))){this.K||U!=4||st==7||(st==8||Q<=0?$e(3):$e(2)),$r(this);var u=this.g.ca();this.X=u;var c=Tc(this);if(this.o=u==200,gc(this.i,this.v,this.B,this.l,this.S,U,u),this.o){if(this.U&&!this.L){e:{if(this.g){var f,v=this.g;if((f=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!p(f)){var R=f;break e}}R=null}if(i=R)Te(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,zr(this,i);else{this.o=!1,this.m=3,Et(12),oe(this),Ke(this);break t}}if(this.R){i=!0;let ct;for(;!this.K&&this.C<c.length;)if(ct=Ic(this,c),ct==jr){U==4&&(this.m=4,Et(14),i=!1),Te(this.i,this.l,null,"[Incomplete Response]");break}else if(ct==Ci){this.m=4,Et(15),Te(this.i,this.l,c,"[Invalid Chunk]"),i=!1;break}else Te(this.i,this.l,ct,null),zr(this,ct);if(Vi(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||c.length!=0||this.h.h||(this.m=1,Et(16),i=!1),this.o=this.o&&i,!i)Te(this.i,this.l,c,"[Invalid Chunked Response]"),oe(this),Ke(this);else if(c.length>0&&!this.W){this.W=!0;var V=this.j;V.g==this&&V.aa&&!V.P&&(V.j.info("Great, no buffering proxy detected. Bytes received: "+c.length),Jr(V),V.P=!0,Et(11))}}else Te(this.i,this.l,c,null),zr(this,c);U==4&&oe(this),this.o&&!this.K&&(U==4?eo(this.j,this):(this.o=!1,kn(this)))}else Mc(this.g),u==400&&c.indexOf("Unknown SID")>0?(this.m=3,Et(12)):(this.m=0,Et(13)),oe(this),Ke(this)}}}catch{}finally{}};function Tc(i){if(!Vi(i))return i.g.la();const u=Qi(i.g);if(u==="")return"";let c="";const f=u.length,v=zt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return oe(i),Ke(i),"";i.h.i=new a.TextDecoder}for(let R=0;R<f;R++)i.h.h=!0,c+=i.h.i.decode(u[R],{stream:!(v&&R==f-1)});return u.length=0,i.h.g+=c,i.C=0,i.h.g}function Vi(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Ic(i,u){var c=i.C,f=u.indexOf(`
`,c);return f==-1?jr:(c=Number(u.substring(c,f)),isNaN(c)?Ci:(f+=1,f+c>u.length?jr:(u=u.slice(f,f+c),i.C=f+c,u)))}jt.prototype.cancel=function(){this.K=!0,oe(this)};function kn(i){i.T=Date.now()+i.H,bi(i,i.H)}function bi(i,u){if(i.D!=null)throw Error("WatchDog timer not null");i.D=ze(d(i.aa,i),u)}function $r(i){i.D&&(a.clearTimeout(i.D),i.D=null)}jt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(_c(this.i,this.B),this.M!=2&&($e(),Et(17)),oe(this),this.m=2,Ke(this)):bi(this,this.T-i)};function Ke(i){i.j.I==0||i.K||eo(i.j,i)}function oe(i){$r(i);var u=i.O;u&&typeof u.dispose=="function"&&u.dispose(),i.O=null,_i(i.V),i.g&&(u=i.g,i.g=null,u.abort(),u.dispose())}function zr(i,u){try{var c=i.j;if(c.I!=0&&(c.g==i||Hr(c.h,i))){if(!i.L&&Hr(c.h,i)&&c.I==3){try{var f=c.Ba.g.parse(u)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){t:if(!c.v){if(c.g)if(c.g.F+3e3<i.F)Un(c),Ln(c);else break t;Yr(c),Et(18)}}else c.xa=v[1],0<c.xa-c.K&&v[2]<37500&&c.F&&c.A==0&&!c.C&&(c.C=ze(d(c.Va,c),6e3));ki(c.h)<=1&&c.ta&&(c.ta=void 0)}else ue(c,11)}else if((i.L||c.g==i)&&Un(c),!p(u))for(v=c.Ba.g.parse(u),u=0;u<v.length;u++){let Q=v[u];const ct=Q[0];if(!(ct<=c.K))if(c.K=ct,Q=Q[1],c.I==2)if(Q[0]=="c"){c.M=Q[1],c.ba=Q[2];const Pt=Q[3];Pt!=null&&(c.ka=Pt,c.j.info("VER="+c.ka));const ce=Q[4];ce!=null&&(c.za=ce,c.j.info("SVER="+c.za));const Ht=Q[5];Ht!=null&&typeof Ht=="number"&&Ht>0&&(f=1.5*Ht,c.O=f,c.j.info("backChannelRequestTimeoutMs_="+f)),f=c;const Gt=i.g;if(Gt){const jn=Gt.g?Gt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(jn){var R=f.h;R.g||jn.indexOf("spdy")==-1&&jn.indexOf("quic")==-1&&jn.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Gr(R,R.h),R.h=null))}if(f.G){const Zr=Gt.g?Gt.g.getResponseHeader("X-HTTP-Session-Id"):null;Zr&&(f.wa=Zr,W(f.J,f.G,Zr))}}c.I=3,c.l&&c.l.ra(),c.aa&&(c.T=Date.now()-i.F,c.j.info("Handshake RTT: "+c.T+"ms")),f=c;var V=i;if(f.na=so(f,f.L?f.ba:null,f.W),V.L){Oi(f.h,V);var U=V,st=f.O;st&&(U.H=st),U.D&&($r(U),kn(U)),f.g=V}else Zi(f);c.i.length>0&&Fn(c)}else Q[0]!="stop"&&Q[0]!="close"||ue(c,7);else c.I==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?ue(c,7):Xr(c):Q[0]!="noop"&&c.l&&c.l.qa(Q),c.A=0)}}$e(4)}catch{}}var vc=class{constructor(i,u){this.g=i,this.map=u}};function Di(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ni(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function ki(i){return i.h?1:i.g?i.g.size:0}function Hr(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function Gr(i,u){i.g?i.g.add(u):i.h=u}function Oi(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}Di.prototype.cancel=function(){if(this.i=Mi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Mi(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const c of i.g.values())u=u.concat(c.G);return u}return P(i.i)}var xi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ac(i,u){if(i){i=i.split("&");for(let c=0;c<i.length;c++){const f=i[c].indexOf("=");let v,R=null;f>=0?(v=i[c].substring(0,f),R=i[c].substring(f+1)):v=i[c],u(v,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function qt(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;i instanceof qt?(this.l=i.l,Qe(this,i.j),this.o=i.o,this.g=i.g,We(this,i.u),this.h=i.h,Kr(this,qi(i.i)),this.m=i.m):i&&(u=String(i).match(xi))?(this.l=!1,Qe(this,u[1]||"",!0),this.o=Xe(u[2]||""),this.g=Xe(u[3]||"",!0),We(this,u[4]),this.h=Xe(u[5]||"",!0),Kr(this,u[6]||"",!0),this.m=Xe(u[7]||"")):(this.l=!1,this.i=new Je(null,this.l))}qt.prototype.toString=function(){const i=[];var u=this.j;u&&i.push(Ye(u,Li,!0),":");var c=this.g;return(c||u=="file")&&(i.push("//"),(u=this.o)&&i.push(Ye(u,Li,!0),"@"),i.push(Ge(c).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.u,c!=null&&i.push(":",String(c))),(c=this.h)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(Ye(c,c.charAt(0)=="/"?Sc:Rc,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",Ye(c,Pc)),i.join("")},qt.prototype.resolve=function(i){const u=Ct(this);let c=!!i.j;c?Qe(u,i.j):c=!!i.o,c?u.o=i.o:c=!!i.g,c?u.g=i.g:c=i.u!=null;var f=i.h;if(c)We(u,i.u);else if(c=!!i.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var v=u.h.lastIndexOf("/");v!=-1&&(f=u.h.slice(0,v+1)+f)}if(v=f,v==".."||v==".")f="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){f=v.lastIndexOf("/",0)==0,v=v.split("/");const R=[];for(let V=0;V<v.length;){const U=v[V++];U=="."?f&&V==v.length&&R.push(""):U==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),f&&V==v.length&&R.push("")):(R.push(U),f=!0)}f=R.join("/")}else f=v}return c?u.h=f:c=i.i.toString()!=="",c?Kr(u,qi(i.i)):c=!!i.m,c&&(u.m=i.m),u};function Ct(i){return new qt(i)}function Qe(i,u,c){i.j=c?Xe(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function We(i,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);i.u=u}else i.u=null}function Kr(i,u,c){u instanceof Je?(i.i=u,Vc(i.i,i.l)):(c||(u=Ye(u,Cc)),i.i=new Je(u,i.l))}function W(i,u,c){i.i.set(u,c)}function On(i){return W(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function Xe(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Ye(i,u,c){return typeof i=="string"?(i=encodeURI(i).replace(u,wc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function wc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Li=/[#\/\?@]/g,Rc=/[#\?:]/g,Sc=/[#\?]/g,Cc=/[#\?@]/g,Pc=/#/g;function Je(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function ae(i){i.g||(i.g=new Map,i.h=0,i.i&&Ac(i.i,function(u,c){i.add(decodeURIComponent(u.replace(/\+/g," ")),c)}))}n=Je.prototype,n.add=function(i,u){ae(this),this.i=null,i=Ie(this,i);let c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(u),this.h+=1,this};function Fi(i,u){ae(i),u=Ie(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function Ui(i,u){return ae(i),u=Ie(i,u),i.g.has(u)}n.forEach=function(i,u){ae(this),this.g.forEach(function(c,f){c.forEach(function(v){i.call(u,v,f,this)},this)},this)};function Bi(i,u){ae(i);let c=[];if(typeof u=="string")Ui(i,u)&&(c=c.concat(i.g.get(Ie(i,u))));else for(i=Array.from(i.g.values()),u=0;u<i.length;u++)c=c.concat(i[u]);return c}n.set=function(i,u){return ae(this),this.i=null,i=Ie(this,i),Ui(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},n.get=function(i,u){return i?(i=Bi(this,i),i.length>0?String(i[0]):u):u};function ji(i,u,c){Fi(i,u),c.length>0&&(i.i=null,i.g.set(Ie(i,u),P(c)),i.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(let f=0;f<u.length;f++){var c=u[f];const v=Ge(c);c=Bi(this,c);for(let R=0;R<c.length;R++){let V=v;c[R]!==""&&(V+="="+Ge(c[R])),i.push(V)}}return this.i=i.join("&")};function qi(i){const u=new Je;return u.i=i.i,i.g&&(u.g=new Map(i.g),u.h=i.h),u}function Ie(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function Vc(i,u){u&&!i.j&&(ae(i),i.i=null,i.g.forEach(function(c,f){const v=f.toLowerCase();f!=v&&(Fi(this,f),ji(this,v,c))},i)),i.j=u}function bc(i,u){const c=new He;if(a.Image){const f=new Image;f.onload=g($t,c,"TestLoadImage: loaded",!0,u,f),f.onerror=g($t,c,"TestLoadImage: error",!1,u,f),f.onabort=g($t,c,"TestLoadImage: abort",!1,u,f),f.ontimeout=g($t,c,"TestLoadImage: timeout",!1,u,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else u(!1)}function Dc(i,u){const c=new He,f=new AbortController,v=setTimeout(()=>{f.abort(),$t(c,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:f.signal}).then(R=>{clearTimeout(v),R.ok?$t(c,"TestPingServer: ok",!0,u):$t(c,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(v),$t(c,"TestPingServer: error",!1,u)})}function $t(i,u,c,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(c)}catch{}}function Nc(){this.g=new mc}function Qr(i){this.i=i.Sb||null,this.h=i.ab||!1}I(Qr,yi),Qr.prototype.g=function(){return new Mn(this.i,this.h)};function Mn(i,u){mt.call(this),this.H=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}I(Mn,mt),n=Mn.prototype,n.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=u,this.readyState=1,tn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(u.body=i),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ze(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,tn(this)),this.g&&(this.readyState=3,tn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;$i(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function $i(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?Ze(this):tn(this),this.readyState==3&&$i(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,Ze(this))},n.Na=function(i){this.g&&(this.response=i,Ze(this))},n.ga=function(){this.g&&Ze(this)};function Ze(i){i.readyState=4,i.l=null,i.j=null,i.B=null,tn(i)}n.setRequestHeader=function(i,u){this.A.append(i,u)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var c=u.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=u.next();return i.join(`\r
`)};function tn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Mn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function zi(i){let u="";return Pn(i,function(c,f){u+=f,u+=":",u+=c,u+=`\r
`}),u}function Wr(i,u,c){t:{for(f in c){var f=!1;break t}f=!0}f||(c=zi(c),typeof i=="string"?c!=null&&Ge(c):W(i,u,c))}function Z(i){mt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}I(Z,mt);var kc=/^https?$/i,Oc=["POST","PUT"];n=Z.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,u,c,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ri.g(),this.g.onreadystatechange=w(d(this.Ca,this));try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch(R){Hi(this,R);return}if(i=c||"",c=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)c.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())c.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(c.keys()).find(R=>R.toLowerCase()=="content-type"),v=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Oc,u,void 0)>=0)||f||v||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,V]of c)this.g.setRequestHeader(R,V);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(R){Hi(this,R)}};function Hi(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.o=5,Gi(i),xn(i)}function Gi(i){i.A||(i.A=!0,yt(i,"complete"),yt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,yt(this,"complete"),yt(this,"abort"),xn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),xn(this,!0)),Z.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Ki(this):this.Xa())},n.Xa=function(){Ki(this)};function Ki(i){if(i.h&&typeof o<"u"){if(i.v&&zt(i)==4)setTimeout(i.Ca.bind(i),0);else if(yt(i,"readystatechange"),zt(i)==4){i.h=!1;try{const R=i.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var c;if(!(c=u)){var f;if(f=R===0){let V=String(i.D).match(xi)[1]||null;!V&&a.self&&a.self.location&&(V=a.self.location.protocol.slice(0,-1)),f=!kc.test(V?V.toLowerCase():"")}c=f}if(c)yt(i,"complete"),yt(i,"success");else{i.o=6;try{var v=zt(i)>2?i.g.statusText:""}catch{v=""}i.l=v+" ["+i.ca()+"]",Gi(i)}}finally{xn(i)}}}}function xn(i,u){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const c=i.g;i.g=null,u||yt(i,"ready");try{c.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function zt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return zt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),dc(u)}};function Qi(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Mc(i){const u={};i=(i.g&&zt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(p(i[f]))continue;var c=Ec(i[f]);const v=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const R=u[v]||[];u[v]=R,R.push(c)}ac(u,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function en(i,u,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||u}function Wi(i){this.za=0,this.i=[],this.j=new He,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=en("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=en("baseRetryDelayMs",5e3,i),this.Za=en("retryDelaySeedMs",1e4,i),this.Ta=en("forwardChannelMaxRetries",2,i),this.va=en("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new Di(i&&i.concurrentRequestLimit),this.Ba=new Nc,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Wi.prototype,n.ka=8,n.I=1,n.connect=function(i,u,c,f){Et(0),this.W=i,this.H=u||{},c&&f!==void 0&&(this.H.OSID=c,this.H.OAID=f),this.F=this.X,this.J=so(this,null,this.W),Fn(this)};function Xr(i){if(Xi(i),i.I==3){var u=i.V++,c=Ct(i.J);if(W(c,"SID",i.M),W(c,"RID",u),W(c,"TYPE","terminate"),nn(i,c),u=new jt(i,i.j,u),u.M=2,u.A=On(Ct(c)),c=!1,a.navigator&&a.navigator.sendBeacon)try{c=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!c&&a.Image&&(new Image().src=u.A,c=!0),c||(u.g=io(u.j,null),u.g.ea(u.A)),u.F=Date.now(),kn(u)}ro(i)}function Ln(i){i.g&&(Jr(i),i.g.cancel(),i.g=null)}function Xi(i){Ln(i),i.v&&(a.clearTimeout(i.v),i.v=null),Un(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function Fn(i){if(!Ni(i.h)&&!i.m){i.m=!0;var u=i.Ea;vt||m(),rt||(vt(),rt=!0),E.add(u,i),i.D=0}}function xc(i,u){return ki(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=u.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=ze(d(i.Ea,i,u),no(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const v=new jt(this,this.j,i);let R=this.o;if(this.U&&(R?(R=ui(R),li(R,this.U)):R=this.U),this.u!==null||this.R||(v.J=R,R=null),this.S)t:{for(var u=0,c=0;c<this.i.length;c++){e:{var f=this.i[c];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(u+=f,u>4096){u=c;break t}if(u===4096||c===this.i.length-1){u=c+1;break t}}u=1e3}else u=1e3;u=Ji(this,v,u),c=Ct(this.J),W(c,"RID",i),W(c,"CVER",22),this.G&&W(c,"X-HTTP-Session-Id",this.G),nn(this,c),R&&(this.R?u="headers="+Ge(zi(R))+"&"+u:this.u&&Wr(c,this.u,R)),Gr(this.h,v),this.Ra&&W(c,"TYPE","init"),this.S?(W(c,"$req",u),W(c,"SID","null"),v.U=!0,qr(v,c,null)):qr(v,c,u),this.I=2}}else this.I==3&&(i?Yi(this,i):this.i.length==0||Ni(this.h)||Yi(this))};function Yi(i,u){var c;u?c=u.l:c=i.V++;const f=Ct(i.J);W(f,"SID",i.M),W(f,"RID",c),W(f,"AID",i.K),nn(i,f),i.u&&i.o&&Wr(f,i.u,i.o),c=new jt(i,i.j,c,i.D+1),i.u===null&&(c.J=i.o),u&&(i.i=u.G.concat(i.i)),u=Ji(i,c,1e3),c.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),Gr(i.h,c),qr(c,f,u)}function nn(i,u){i.H&&Pn(i.H,function(c,f){W(u,f,c)}),i.l&&Pn({},function(c,f){W(u,f,c)})}function Ji(i,u,c){c=Math.min(i.i.length,c);const f=i.l?d(i.l.Ka,i.l,i):null;t:{var v=i.i;let U=-1;for(;;){const st=["count="+c];U==-1?c>0?(U=v[0].g,st.push("ofs="+U)):U=0:st.push("ofs="+U);let Q=!0;for(let ct=0;ct<c;ct++){var R=v[ct].g;const Pt=v[ct].map;if(R-=U,R<0)U=Math.max(0,v[ct].g-100),Q=!1;else try{R="req"+R+"_"||"";try{var V=Pt instanceof Map?Pt:Object.entries(Pt);for(const[ce,Ht]of V){let Gt=Ht;l(Ht)&&(Gt=Lr(Ht)),st.push(R+ce+"="+encodeURIComponent(Gt))}}catch(ce){throw st.push(R+"type="+encodeURIComponent("_badmap")),ce}}catch{f&&f(Pt)}}if(Q){V=st.join("&");break t}}V=void 0}return i=i.i.splice(0,c),u.G=i,V}function Zi(i){if(!i.g&&!i.v){i.Y=1;var u=i.Da;vt||m(),rt||(vt(),rt=!0),E.add(u,i),i.A=0}}function Yr(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=ze(d(i.Da,i),no(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,to(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=ze(d(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Et(10),Ln(this),to(this))};function Jr(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function to(i){i.g=new jt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var u=Ct(i.na);W(u,"RID","rpc"),W(u,"SID",i.M),W(u,"AID",i.K),W(u,"CI",i.F?"0":"1"),!i.F&&i.ia&&W(u,"TO",i.ia),W(u,"TYPE","xmlhttp"),nn(i,u),i.u&&i.o&&Wr(u,i.u,i.o),i.O&&(i.g.H=i.O);var c=i.g;i=i.ba,c.M=1,c.A=On(Ct(u)),c.u=null,c.R=!0,Pi(c,i)}n.Va=function(){this.C!=null&&(this.C=null,Ln(this),Yr(this),Et(19))};function Un(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function eo(i,u){var c=null;if(i.g==u){Un(i),Jr(i),i.g=null;var f=2}else if(Hr(i.h,u))c=u.G,Oi(i.h,u),f=1;else return;if(i.I!=0){if(u.o)if(f==1){c=u.u?u.u.length:0,u=Date.now()-u.F;var v=i.D;f=Dn(),yt(f,new Ai(f,c)),Fn(i)}else Zi(i);else if(v=u.m,v==3||v==0&&u.X>0||!(f==1&&xc(i,u)||f==2&&Yr(i)))switch(c&&c.length>0&&(u=i.h,u.i=u.i.concat(c)),v){case 1:ue(i,5);break;case 4:ue(i,10);break;case 3:ue(i,6);break;default:ue(i,2)}}}function no(i,u){let c=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(c*=2),c*u}function ue(i,u){if(i.j.info("Error code "+u),u==2){var c=d(i.bb,i),f=i.Ua;const v=!f;f=new qt(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Qe(f,"https"),On(f),v?bc(f.toString(),c):Dc(f.toString(),c)}else Et(2);i.I=0,i.l&&i.l.pa(u),ro(i),Xi(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function ro(i){if(i.I=0,i.ja=[],i.l){const u=Mi(i.h);(u.length!=0||i.i.length!=0)&&(k(i.ja,u),k(i.ja,i.i),i.h.i.length=0,P(i.i),i.i.length=0),i.l.oa()}}function so(i,u,c){var f=c instanceof qt?Ct(c):new qt(c);if(f.g!="")u&&(f.g=u+"."+f.g),We(f,f.u);else{var v=a.location;f=v.protocol,u=u?u+"."+v.hostname:v.hostname,v=+v.port;const R=new qt(null);f&&Qe(R,f),u&&(R.g=u),v&&We(R,v),c&&(R.h=c),f=R}return c=i.G,u=i.wa,c&&u&&W(f,c,u),W(f,"VER",i.ka),nn(i,f),f}function io(i,u,c){if(u&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Aa&&!i.ma?new Z(new Qr({ab:c})):new Z(i.ma),u.Fa(i.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function oo(){}n=oo.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Bn(){}Bn.prototype.g=function(i,u){return new At(i,u)};function At(i,u){mt.call(this),this.g=new Wi(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(i?i["X-WebChannel-Client-Profile"]=u.sa:i={"X-WebChannel-Client-Profile":u.sa}),this.g.U=i,(i=u&&u.Qb)&&!p(i)&&(this.g.u=i),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!p(u)&&(this.g.G=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new ve(this)}I(At,mt),At.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Xr(this.g)},At.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.v&&(c={},c.__data__=Lr(i),i=c);u.i.push(new vc(u.Ya++,i)),u.I==3&&Fn(u)},At.prototype.N=function(){this.g.l=null,delete this.j,Xr(this.g),delete this.g,At.Z.N.call(this)};function ao(i){Fr.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){t:{for(const c in u){i=c;break t}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}I(ao,Fr);function uo(){Ur.call(this),this.status=1}I(uo,Ur);function ve(i){this.g=i}I(ve,oo),ve.prototype.ra=function(){yt(this.g,"a")},ve.prototype.qa=function(i){yt(this.g,new ao(i))},ve.prototype.pa=function(i){yt(this.g,new uo)},ve.prototype.oa=function(){yt(this.g,"b")},Bn.prototype.createWebChannel=Bn.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,Da=function(){return new Bn},ba=function(){return Dn()},Va=ie,ms={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Nn.NO_ERROR=0,Nn.TIMEOUT=8,Nn.HTTP_ERROR=6,Kn=Nn,wi.COMPLETE="complete",Pa=wi,Ei.EventType=qe,qe.OPEN="a",qe.CLOSE="b",qe.ERROR="c",qe.MESSAGE="d",mt.prototype.listen=mt.prototype.J,rn=Ei,Z.prototype.listenOnce=Z.prototype.K,Z.prototype.getLastError=Z.prototype.Ha,Z.prototype.getLastErrorCode=Z.prototype.ya,Z.prototype.getStatus=Z.prototype.ca,Z.prototype.getResponseJson=Z.prototype.La,Z.prototype.getResponseText=Z.prototype.la,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Fa,Ca=Z}).apply(typeof qn<"u"?qn:typeof self<"u"?self:typeof window<"u"?window:{});const vo="@firebase/firestore",Ao="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Le="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=new Ia("@firebase/firestore");function Ae(){return de.logLevel}function D(n,...t){if(de.logLevel<=$.DEBUG){const e=t.map(ks);de.debug(`Firestore (${Le}): ${n}`,...e)}}function Ut(n,...t){if(de.logLevel<=$.ERROR){const e=t.map(ks);de.error(`Firestore (${Le}): ${n}`,...e)}}function be(n,...t){if(de.logLevel<=$.WARN){const e=t.map(ks);de.warn(`Firestore (${Le}): ${n}`,...e)}}function ks(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Na(n,r,e)}function Na(n,t,e){let r=`FIRESTORE (${Le}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw Ut(r),new Error(r)}function H(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||Na(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends xe{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Ih{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(gt.UNAUTHENTICATED))}shutdown(){}}class vh{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Ah{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){H(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new xt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new xt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},l=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>l(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new xt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string",31837,{l:r}),new ka(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return H(t===null||typeof t=="string",2055,{h:t}),new gt(t)}}class wh{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Rh{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new wh(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class wo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Sh{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ih(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){H(this.o===void 0,3512);const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const s=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new wo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(H(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new wo(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ch(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Ch(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function ps(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return ss(s)===ss(o)?B(s,o):ss(s)?1:-1}return B(n.length,t.length)}const Ph=55296,Vh=57343;function ss(n){const t=n.charCodeAt(0);return t>=Ph&&t<=Vh}function De(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro="__name__";class Vt{constructor(t,e,r){e===void 0?e=0:e>t.length&&x(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&x(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Vt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Vt?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Vt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=Vt.isNumericId(t),s=Vt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Vt.extractNumericId(t).compare(Vt.extractNumericId(e)):ps(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Xt.fromString(t.substring(4,t.length-2))}}class X extends Vt{construct(t,e,r){return new X(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new N(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new X(e)}static emptyPath(){return new X([])}}const bh=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ft extends Vt{construct(t,e,r){return new ft(t,e,r)}static isValidIdentifier(t){return bh.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ft.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ro}static keyField(){return new ft([Ro])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new N(C.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new N(C.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new N(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new N(C.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ft(e)}static emptyPath(){return new ft([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(t){this.path=t}static fromPath(t){return new M(X.fromString(t))}static fromName(t){return new M(X.fromString(t).popFirst(5))}static empty(){return new M(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&X.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return X.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new M(new X(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oa(n,t,e){if(!e)throw new N(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Dh(n,t,e,r){if(t===!0&&r===!0)throw new N(C.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function So(n){if(!M.isDocumentKey(n))throw new N(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Co(n){if(M.isDocumentKey(n))throw new N(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ma(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ms(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":x(12329,{type:typeof n})}function me(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new N(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ms(n);throw new N(C.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,t){const e={typeString:n};return t&&(e.value=t),e}function vn(n,t){if(!Ma(n))throw new N(C.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new N(C.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po=-62135596800,Vo=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(t){return Y.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Vo);return new Y(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new N(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new N(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Po)throw new N(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new N(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Vo}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(vn(t,Y._jsonSchema))return new Y(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Po;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:nt("string",Y._jsonSchemaVersion),seconds:nt("number"),nanoseconds:nt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new Y(0,0))}static max(){return new L(new Y(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=-1;function Nh(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new Y(e+1,0):new Y(e,r));return new Jt(s,M.empty(),t)}function kh(n){return new Jt(n.readTime,n.key,gn)}class Jt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Jt(L.min(),M.empty(),gn)}static max(){return new Jt(L.max(),M.empty(),gn)}}function Oh(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=M.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class xh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fe(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==Mh)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,r)=>{e(t)})}static reject(t){return new S((e,r)=>{r(t)})}static waitFor(t){return new S((e,r)=>{let s=0,o=0,a=!1;t.forEach(l=>{++s,l.next(()=>{++o,a&&o===s&&e()},h=>r(h))}),a=!0,o===s&&e()})}static or(t){let e=S.resolve(!1);for(const r of t)e=e.next(s=>s?S.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,o)=>{r.push(e.call(this,s,o))}),this.waitFor(r)}static mapArray(t,e){return new S((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const d=h;e(t[d]).next(g=>{a[d]=g,++l,l===o&&r(a)},g=>s(g))}})}static doWhile(t,e){return new S((r,s)=>{const o=()=>{t()===!0?e().next(()=>{o()},s):r()};o()})}}function Lh(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Ue(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}pr.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=-1;function gr(n){return n==null}function rr(n){return n===0&&1/n==-1/0}function Fh(n){return typeof n=="number"&&Number.isInteger(n)&&!rr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa="";function Uh(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=bo(t)),t=Bh(n.get(e),t);return bo(t)}function Bh(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case xa:e+="";break;default:e+=o}}return e}function bo(n){return n+xa+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function ge(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function La(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(t,e){this.comparator=t,this.root=e||ht.EMPTY}insert(t,e){return new J(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ht.BLACK,null,null))}remove(t){return new J(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ht.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new $n(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new $n(this.root,t,this.comparator,!1)}getReverseIterator(){return new $n(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new $n(this.root,t,this.comparator,!0)}}class $n{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ht{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ht.RED,this.left=s??ht.EMPTY,this.right=o??ht.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ht(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ht.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ht.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ht.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ht.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw x(27949);return t+(this.isRed()?0:1)}}ht.EMPTY=null,ht.RED=!0,ht.BLACK=!1;ht.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ht(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(t){this.comparator=t,this.data=new J(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new No(this.data.getIterator())}getIteratorFrom(t){return new No(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof at)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new at(this.comparator);return e.data=t,e}}class No{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.fields=t,t.sort(ft.comparator)}static empty(){return new St([])}unionWith(t){let e=new at(ft.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return De(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Fa("Invalid base64 string: "+o):o}}(t);return new dt(e)}static fromUint8Array(t){const e=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(t);return new dt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}dt.EMPTY_BYTE_STRING=new dt("");const jh=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Zt(n){if(H(!!n,39018),typeof n=="string"){let t=0;const e=jh.exec(n);if(H(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:tt(n.seconds),nanos:tt(n.nanos)}}function tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function te(n){return typeof n=="string"?dt.fromBase64String(n):dt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua="server_timestamp",Ba="__type__",ja="__previous_value__",qa="__local_write_time__";function Ls(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Ba])==null?void 0:r.stringValue)===Ua}function _r(n){const t=n.mapValue.fields[ja];return Ls(t)?_r(t):t}function _n(n){const t=Zt(n.mapValue.fields[qa].timestampValue);return new Y(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(t,e,r,s,o,a,l,h,d,g){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=g}}const sr="(default)";class yn{constructor(t,e){this.projectId=t,this.database=e||sr}static empty(){return new yn("","")}get isDefaultDatabase(){return this.database===sr}isEqual(t){return t instanceof yn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a="__type__",$h="__max__",zn={mapValue:{}},za="__vector__",ir="value";function ee(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ls(n)?4:Hh(n)?9007199254740991:zh(n)?10:11:x(28295,{value:n})}function Ot(n,t){if(n===t)return!0;const e=ee(n);if(e!==ee(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return _n(n).isEqual(_n(t));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=Zt(s.timestampValue),l=Zt(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,o){return te(s.bytesValue).isEqual(te(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,o){return tt(s.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(s.geoPointValue.longitude)===tt(o.geoPointValue.longitude)}(n,t);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return tt(s.integerValue)===tt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=tt(s.doubleValue),l=tt(o.doubleValue);return a===l?rr(a)===rr(l):isNaN(a)&&isNaN(l)}return!1}(n,t);case 9:return De(n.arrayValue.values||[],t.arrayValue.values||[],Ot);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(Do(a)!==Do(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Ot(a[h],l[h])))return!1;return!0}(n,t);default:return x(52216,{left:n})}}function En(n,t){return(n.values||[]).find(e=>Ot(e,t))!==void 0}function Ne(n,t){if(n===t)return 0;const e=ee(n),r=ee(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return function(o,a){const l=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1}(n,t);case 3:return ko(n.timestampValue,t.timestampValue);case 4:return ko(_n(n),_n(t));case 5:return ps(n.stringValue,t.stringValue);case 6:return function(o,a){const l=te(o),h=te(a);return l.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,a){const l=o.split("/"),h=a.split("/");for(let d=0;d<l.length&&d<h.length;d++){const g=B(l[d],h[d]);if(g!==0)return g}return B(l.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,a){const l=B(tt(o.latitude),tt(a.latitude));return l!==0?l:B(tt(o.longitude),tt(a.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Oo(n.arrayValue,t.arrayValue);case 10:return function(o,a){var w,P,k,O;const l=o.fields||{},h=a.fields||{},d=(w=l[ir])==null?void 0:w.arrayValue,g=(P=h[ir])==null?void 0:P.arrayValue,I=B(((k=d==null?void 0:d.values)==null?void 0:k.length)||0,((O=g==null?void 0:g.values)==null?void 0:O.length)||0);return I!==0?I:Oo(d,g)}(n.mapValue,t.mapValue);case 11:return function(o,a){if(o===zn.mapValue&&a===zn.mapValue)return 0;if(o===zn.mapValue)return 1;if(a===zn.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),d=a.fields||{},g=Object.keys(d);h.sort(),g.sort();for(let I=0;I<h.length&&I<g.length;++I){const w=ps(h[I],g[I]);if(w!==0)return w;const P=Ne(l[h[I]],d[g[I]]);if(P!==0)return P}return B(h.length,g.length)}(n.mapValue,t.mapValue);default:throw x(23264,{he:e})}}function ko(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=Zt(n),r=Zt(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function Oo(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Ne(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function ke(n){return gs(n)}function gs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=Zt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return te(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return M.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=gs(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${gs(e.fields[a])}`;return s+"}"}(n.mapValue):x(61005,{value:n})}function Qn(n){switch(ee(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=_r(n);return t?16+Qn(t):16;case 5:return 2*n.stringValue.length;case 6:return te(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+Qn(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return ge(r.fields,(o,a)=>{s+=o.length+Qn(a)}),s}(n.mapValue);default:throw x(13486,{value:n})}}function _s(n){return!!n&&"integerValue"in n}function Fs(n){return!!n&&"arrayValue"in n}function Mo(n){return!!n&&"nullValue"in n}function xo(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Wn(n){return!!n&&"mapValue"in n}function zh(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[$a])==null?void 0:r.stringValue)===za}function cn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return ge(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=cn(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=cn(n.arrayValue.values[e]);return t}return{...n}}function Hh(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===$h}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.value=t}static empty(){return new wt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Wn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=cn(e)}setAll(t){let e=ft.emptyPath(),r={},s=[];t.forEach((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=cn(a):s.push(l.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());Wn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ot(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Wn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){ge(e,(s,o)=>t[s]=o);for(const s of r)delete t[s]}clone(){return new wt(cn(this.value))}}function Ha(n){const t=[];return ge(n.fields,(e,r)=>{const s=new ft([e]);if(Wn(r)){const o=Ha(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)}),new St(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new _t(t,0,L.min(),L.min(),L.min(),wt.empty(),0)}static newFoundDocument(t,e,r,s){return new _t(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new _t(t,2,e,L.min(),L.min(),wt.empty(),0)}static newUnknownDocument(t,e){return new _t(t,3,e,L.min(),L.min(),wt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof _t&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(t,e){this.position=t,this.inclusive=e}}function Lo(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=M.comparator(M.fromName(a.referenceValue),e.key):r=Ne(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Fo(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ot(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(t,e="asc"){this.field=t,this.dir=e}}function Gh(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{}class it extends Ga{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Qh(t,e,r):e==="array-contains"?new Yh(t,r):e==="in"?new Jh(t,r):e==="not-in"?new Zh(t,r):e==="array-contains-any"?new tf(t,r):new it(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Wh(t,r):new Xh(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Ne(e,this.value)):e!==null&&ee(this.value)===ee(e)&&this.matchesComparison(Ne(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Mt extends Ga{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Mt(t,e)}matches(t){return Ka(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ka(n){return n.op==="and"}function Qa(n){return Kh(n)&&Ka(n)}function Kh(n){for(const t of n.filters)if(t instanceof Mt)return!1;return!0}function ys(n){if(n instanceof it)return n.field.canonicalString()+n.op.toString()+ke(n.value);if(Qa(n))return n.filters.map(t=>ys(t)).join(",");{const t=n.filters.map(e=>ys(e)).join(",");return`${n.op}(${t})`}}function Wa(n,t){return n instanceof it?function(r,s){return s instanceof it&&r.op===s.op&&r.field.isEqual(s.field)&&Ot(r.value,s.value)}(n,t):n instanceof Mt?function(r,s){return s instanceof Mt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,l)=>o&&Wa(a,s.filters[l]),!0):!1}(n,t):void x(19439)}function Xa(n){return n instanceof it?function(e){return`${e.field.canonicalString()} ${e.op} ${ke(e.value)}`}(n):n instanceof Mt?function(e){return e.op.toString()+" {"+e.getFilters().map(Xa).join(" ,")+"}"}(n):"Filter"}class Qh extends it{constructor(t,e,r){super(t,e,r),this.key=M.fromName(r.referenceValue)}matches(t){const e=M.comparator(t.key,this.key);return this.matchesComparison(e)}}class Wh extends it{constructor(t,e){super(t,"in",e),this.keys=Ya("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Xh extends it{constructor(t,e){super(t,"not-in",e),this.keys=Ya("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function Ya(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(r=>M.fromName(r.referenceValue))}class Yh extends it{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Fs(e)&&En(e.arrayValue,this.value)}}class Jh extends it{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&En(this.value.arrayValue,e)}}class Zh extends it{constructor(t,e){super(t,"not-in",e)}matches(t){if(En(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!En(this.value.arrayValue,e)}}class tf extends it{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Fs(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>En(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function Uo(n,t=null,e=[],r=[],s=null,o=null,a=null){return new ef(n,t,e,r,s,o,a)}function Us(n){const t=F(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>ys(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),gr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>ke(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>ke(r)).join(",")),t.Te=e}return t.Te}function Bs(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Gh(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!Wa(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Fo(n.startAt,t.startAt)&&Fo(n.endAt,t.endAt)}function Es(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function nf(n,t,e,r,s,o,a,l){return new yr(n,t,e,r,s,o,a,l)}function js(n){return new yr(n)}function Bo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function rf(n){return n.collectionGroup!==null}function ln(n){const t=F(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ie.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new at(ft.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ie.push(new ar(o,r))}),e.has(ft.keyField().canonicalString())||t.Ie.push(new ar(ft.keyField(),r))}return t.Ie}function bt(n){const t=F(n);return t.Ee||(t.Ee=sf(t,ln(n))),t.Ee}function sf(n,t){if(n.limitType==="F")return Uo(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new ar(s.field,o)});const e=n.endAt?new or(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new or(n.startAt.position,n.startAt.inclusive):null;return Uo(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ts(n,t,e){return new yr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Er(n,t){return Bs(bt(n),bt(t))&&n.limitType===t.limitType}function Ja(n){return`${Us(bt(n))}|lt:${n.limitType}`}function we(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>Xa(s)).join(", ")}]`),gr(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>ke(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>ke(s)).join(",")),`Target(${r})`}(bt(n))}; limitType=${n.limitType})`}function Tr(n,t){return t.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):M.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,s){for(const o of ln(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(a,l,h){const d=Lo(a,l,h);return a.inclusive?d<=0:d<0}(r.startAt,ln(r),s)||r.endAt&&!function(a,l,h){const d=Lo(a,l,h);return a.inclusive?d>=0:d>0}(r.endAt,ln(r),s))}(n,t)}function of(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Za(n){return(t,e)=>{let r=!1;for(const s of ln(n)){const o=af(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function af(n,t,e){const r=n.field.isKeyField()?M.comparator(t.key,e.key):function(o,a,l){const h=a.data.field(o),d=l.data.field(o);return h!==null&&d!==null?Ne(h,d):x(42886)}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){ge(this.inner,(e,r)=>{for(const[s,o]of r)t(s,o)})}isEmpty(){return La(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf=new J(M.comparator);function Bt(){return uf}const tu=new J(M.comparator);function sn(...n){let t=tu;for(const e of n)t=t.insert(e.key,e);return t}function eu(n){let t=tu;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function he(){return hn()}function nu(){return hn()}function hn(){return new _e(n=>n.toString(),(n,t)=>n.isEqual(t))}const cf=new J(M.comparator),lf=new at(M.comparator);function j(...n){let t=lf;for(const e of n)t=t.add(e);return t}const hf=new at(B);function ff(){return hf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qs(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:rr(t)?"-0":t}}function ru(n){return{integerValue:""+n}}function df(n,t){return Fh(t)?ru(t):qs(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(){this._=void 0}}function mf(n,t,e){return n instanceof ur?function(s,o){const a={fields:{[Ba]:{stringValue:Ua},[qa]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Ls(o)&&(o=_r(o)),o&&(a.fields[ja]=o),{mapValue:a}}(e,t):n instanceof Tn?iu(n,t):n instanceof In?ou(n,t):function(s,o){const a=su(s,o),l=jo(a)+jo(s.Ae);return _s(a)&&_s(s.Ae)?ru(l):qs(s.serializer,l)}(n,t)}function pf(n,t,e){return n instanceof Tn?iu(n,t):n instanceof In?ou(n,t):e}function su(n,t){return n instanceof cr?function(r){return _s(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class ur extends Ir{}class Tn extends Ir{constructor(t){super(),this.elements=t}}function iu(n,t){const e=au(t);for(const r of n.elements)e.some(s=>Ot(s,r))||e.push(r);return{arrayValue:{values:e}}}class In extends Ir{constructor(t){super(),this.elements=t}}function ou(n,t){let e=au(t);for(const r of n.elements)e=e.filter(s=>!Ot(s,r));return{arrayValue:{values:e}}}class cr extends Ir{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function jo(n){return tt(n.integerValue||n.doubleValue)}function au(n){return Fs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function gf(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof Tn&&s instanceof Tn||r instanceof In&&s instanceof In?De(r.elements,s.elements,Ot):r instanceof cr&&s instanceof cr?Ot(r.Ae,s.Ae):r instanceof ur&&s instanceof ur}(n.transform,t.transform)}class _f{constructor(t,e){this.version=t,this.transformResults=e}}class Lt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Lt}static exists(t){return new Lt(void 0,t)}static updateTime(t){return new Lt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Xn(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class vr{}function uu(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new lu(n.key,Lt.none()):new An(n.key,n.data,Lt.none());{const e=n.data,r=wt.empty();let s=new at(ft.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new ye(n.key,r,new St(s.toArray()),Lt.none())}}function yf(n,t,e){n instanceof An?function(s,o,a){const l=s.value.clone(),h=$o(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,t,e):n instanceof ye?function(s,o,a){if(!Xn(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=$o(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(cu(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,t,e):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function fn(n,t,e,r){return n instanceof An?function(o,a,l,h){if(!Xn(o.precondition,a))return l;const d=o.value.clone(),g=zo(o.fieldTransforms,h,a);return d.setAll(g),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,t,e,r):n instanceof ye?function(o,a,l,h){if(!Xn(o.precondition,a))return l;const d=zo(o.fieldTransforms,h,a),g=a.data;return g.setAll(cu(o)),g.setAll(d),a.convertToFoundDocument(a.version,g).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(n,t,e,r):function(o,a,l){return Xn(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,t,e)}function Ef(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=su(r.transform,s||null);o!=null&&(e===null&&(e=wt.empty()),e.set(r.field,o))}return e||null}function qo(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&De(r,s,(o,a)=>gf(o,a))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class An extends vr{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ye extends vr{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function cu(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function $o(n,t,e){const r=new Map;H(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,pf(a,l,e[s]))}return r}function zo(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,mf(o,a,t))}return r}class lu extends vr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Tf extends vr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&yf(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=fn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=fn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=nu();return this.mutations.forEach(s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=uu(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(L.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),j())}isEqual(t){return this.batchId===t.batchId&&De(this.mutations,t.mutations,(e,r)=>qo(e,r))&&De(this.baseMutations,t.baseMutations,(e,r)=>qo(e,r))}}class $s{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){H(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=function(){return cf}();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new $s(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,q;function wf(n){switch(n){case C.OK:return x(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return x(15467,{code:n})}}function hu(n){if(n===void 0)return Ut("GRPC error has no .code"),C.UNKNOWN;switch(n){case et.OK:return C.OK;case et.CANCELLED:return C.CANCELLED;case et.UNKNOWN:return C.UNKNOWN;case et.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case et.INTERNAL:return C.INTERNAL;case et.UNAVAILABLE:return C.UNAVAILABLE;case et.UNAUTHENTICATED:return C.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case et.NOT_FOUND:return C.NOT_FOUND;case et.ALREADY_EXISTS:return C.ALREADY_EXISTS;case et.PERMISSION_DENIED:return C.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case et.ABORTED:return C.ABORTED;case et.OUT_OF_RANGE:return C.OUT_OF_RANGE;case et.UNIMPLEMENTED:return C.UNIMPLEMENTED;case et.DATA_LOSS:return C.DATA_LOSS;default:return x(39323,{code:n})}}(q=et||(et={}))[q.OK=0]="OK",q[q.CANCELLED=1]="CANCELLED",q[q.UNKNOWN=2]="UNKNOWN",q[q.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",q[q.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",q[q.NOT_FOUND=5]="NOT_FOUND",q[q.ALREADY_EXISTS=6]="ALREADY_EXISTS",q[q.PERMISSION_DENIED=7]="PERMISSION_DENIED",q[q.UNAUTHENTICATED=16]="UNAUTHENTICATED",q[q.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",q[q.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",q[q.ABORTED=10]="ABORTED",q[q.OUT_OF_RANGE=11]="OUT_OF_RANGE",q[q.UNIMPLEMENTED=12]="UNIMPLEMENTED",q[q.INTERNAL=13]="INTERNAL",q[q.UNAVAILABLE=14]="UNAVAILABLE",q[q.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rf(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf=new Xt([4294967295,4294967295],0);function Ho(n){const t=Rf().encode(n),e=new Sa;return e.update(t),new Uint8Array(e.digest())}function Go(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Xt([e,r],0),new Xt([s,o],0)]}class zs{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new on(`Invalid padding: ${e}`);if(r<0)throw new on(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new on(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new on(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Xt.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(Xt.fromNumber(r)));return s.compare(Sf)===1&&(s=new Xt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Ho(t),[r,s]=Go(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new zs(o,s,e);return r.forEach(l=>a.insert(l)),a}insert(t){if(this.ge===0)return;const e=Ho(t),[r,s]=Go(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class on extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,wn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Ar(L.min(),s,new J(B),Bt(),j())}}class wn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new wn(r,e,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class fu{constructor(t,e){this.targetId=t,this.Ce=e}}class du{constructor(t,e,r=dt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Ko{constructor(){this.ve=0,this.Fe=Qo(),this.Me=dt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=j(),e=j(),r=j();return this.Fe.forEach((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:x(38017,{changeType:o})}}),new wn(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=Qo()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,H(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Cf{constructor(t){this.Ge=t,this.ze=new Map,this.je=Bt(),this.Je=Hn(),this.He=Hn(),this.Ye=new J(B)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.We(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:x(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((r,s)=>{this.rt(s)&&e(s)})}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const o=s.target;if(Es(o))if(r===0){const a=new M(o.path);this.et(e,a,_t.newNoDocument(a,L.min()))}else H(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const l=this.ut(t),h=l?this.ct(l,t,a):1;if(h!==0){this.it(e);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,d)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=te(r).toUint8Array()}catch(h){if(h instanceof Fa)return be("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new zs(a,s,o)}catch(h){return be(h instanceof on?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach(o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)}),s}Tt(t){const e=new Map;this.ze.forEach((o,a)=>{const l=this.ot(a);if(l){if(o.current&&Es(l.target)){const h=new M(l.target.path);this.It(h).has(a)||this.Et(a,h)||this.et(a,h,_t.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.qe())}});let r=j();this.He.forEach((o,a)=>{let l=!0;a.forEachWhile(h=>{const d=this.ot(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(o))}),this.je.forEach((o,a)=>a.setReadTime(t));const s=new Ar(t,e,this.Ye,this.je,r);return this.je=Bt(),this.Je=Hn(),this.He=Hn(),this.Ye=new J(B),s}Xe(t,e){if(!this.rt(t))return;const r=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new Ko,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new at(B),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new at(B),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||D("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Ko),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Hn(){return new J(M.comparator)}function Qo(){return new J(M.comparator)}const Pf={asc:"ASCENDING",desc:"DESCENDING"},Vf={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},bf={and:"AND",or:"OR"};class Df{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Is(n,t){return n.useProto3Json||gr(t)?t:{value:t}}function lr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function mu(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Nf(n,t){return lr(n,t.toTimestamp())}function Dt(n){return H(!!n,49232),L.fromTimestamp(function(e){const r=Zt(e);return new Y(r.seconds,r.nanos)}(n))}function Hs(n,t){return vs(n,t).canonicalString()}function vs(n,t){const e=function(s){return new X(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function pu(n){const t=X.fromString(n);return H(Tu(t),10190,{key:t.toString()}),t}function As(n,t){return Hs(n.databaseId,t.path)}function is(n,t){const e=pu(t);if(e.get(1)!==n.databaseId.projectId)throw new N(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new N(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new M(_u(e))}function gu(n,t){return Hs(n.databaseId,t)}function kf(n){const t=pu(n);return t.length===4?X.emptyPath():_u(t)}function ws(n){return new X(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function _u(n){return H(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Wo(n,t,e){return{name:As(n,t),fields:e.value.mapValue.fields}}function Of(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:x(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=function(d,g){return d.useProto3Json?(H(g===void 0||typeof g=="string",58123),dt.fromBase64String(g||"")):(H(g===void 0||g instanceof Buffer||g instanceof Uint8Array,16193),dt.fromUint8Array(g||new Uint8Array))}(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&function(d){const g=d.code===void 0?C.UNKNOWN:hu(d.code);return new N(g,d.message||"")}(a);e=new du(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=is(n,r.document.name),o=Dt(r.document.updateTime),a=r.document.createTime?Dt(r.document.createTime):L.min(),l=new wt({mapValue:{fields:r.document.fields}}),h=_t.newFoundDocument(s,o,a,l),d=r.targetIds||[],g=r.removedTargetIds||[];e=new Yn(d,g,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=is(n,r.document),o=r.readTime?Dt(r.readTime):L.min(),a=_t.newNoDocument(s,o),l=r.removedTargetIds||[];e=new Yn([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=is(n,r.document),o=r.removedTargetIds||[];e=new Yn([],o,s,null)}else{if(!("filter"in t))return x(11601,{Rt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new Af(s,o),l=r.targetId;e=new fu(l,a)}}return e}function Mf(n,t){let e;if(t instanceof An)e={update:Wo(n,t.key,t.value)};else if(t instanceof lu)e={delete:As(n,t.key)};else if(t instanceof ye)e={update:Wo(n,t.key,t.data),updateMask:zf(t.fieldMask)};else{if(!(t instanceof Tf))return x(16599,{Vt:t.type});e={verify:As(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,a){const l=a.transform;if(l instanceof ur)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Tn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof In)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof cr)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw x(20930,{transform:a.transform})}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:Nf(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:x(27497)}(n,t.precondition)),e}function xf(n,t){return n&&n.length>0?(H(t!==void 0,14353),n.map(e=>function(s,o){let a=s.updateTime?Dt(s.updateTime):Dt(o);return a.isEqual(L.min())&&(a=Dt(o)),new _f(a,s.transformResults||[])}(e,t))):[]}function Lf(n,t){return{documents:[gu(n,t.path)]}}function Ff(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=gu(n,s);const o=function(d){if(d.length!==0)return Eu(Mt.create(d,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(g=>function(w){return{field:Re(w.field),direction:jf(w.dir)}}(g))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=Is(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{ft:e,parent:s}}function Uf(n){let t=kf(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){H(r===1,65062);const g=e.from[0];g.allDescendants?s=g.collectionId:t=t.child(g.collectionId)}let o=[];e.where&&(o=function(I){const w=yu(I);return w instanceof Mt&&Qa(w)?w.getFilters():[w]}(e.where));let a=[];e.orderBy&&(a=function(I){return I.map(w=>function(k){return new ar(Se(k.field),function(b){switch(b){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(w))}(e.orderBy));let l=null;e.limit&&(l=function(I){let w;return w=typeof I=="object"?I.value:I,gr(w)?null:w}(e.limit));let h=null;e.startAt&&(h=function(I){const w=!!I.before,P=I.values||[];return new or(P,w)}(e.startAt));let d=null;return e.endAt&&(d=function(I){const w=!I.before,P=I.values||[];return new or(P,w)}(e.endAt)),nf(t,s,a,o,l,"F",h,d)}function Bf(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function yu(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Se(e.unaryFilter.field);return it.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Se(e.unaryFilter.field);return it.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Se(e.unaryFilter.field);return it.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Se(e.unaryFilter.field);return it.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}}(n):n.fieldFilter!==void 0?function(e){return it.create(Se(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Mt.create(e.compositeFilter.filters.map(r=>yu(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return x(1026)}}(e.compositeFilter.op))}(n):x(30097,{filter:n})}function jf(n){return Pf[n]}function qf(n){return Vf[n]}function $f(n){return bf[n]}function Re(n){return{fieldPath:n.canonicalString()}}function Se(n){return ft.fromServerFormat(n.fieldPath)}function Eu(n){return n instanceof it?function(e){if(e.op==="=="){if(xo(e.value))return{unaryFilter:{field:Re(e.field),op:"IS_NAN"}};if(Mo(e.value))return{unaryFilter:{field:Re(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(xo(e.value))return{unaryFilter:{field:Re(e.field),op:"IS_NOT_NAN"}};if(Mo(e.value))return{unaryFilter:{field:Re(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Re(e.field),op:qf(e.op),value:e.value}}}(n):n instanceof Mt?function(e){const r=e.getFilters().map(s=>Eu(s));return r.length===1?r[0]:{compositeFilter:{op:$f(e.op),filters:r}}}(n):x(54877,{filter:n})}function zf(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Tu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(t,e,r,s,o=L.min(),a=L.min(),l=dt.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new Kt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Kt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(t){this.yt=t}}function Gf(n){const t=Uf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ts(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(){this.Cn=new Qf}addToCollectionParentIndex(t,e){return this.Cn.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Jt.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Jt.min())}updateCollectionGroup(t,e,r){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class Qf{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new at(X.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new at(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xo={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Iu=41943040;class It{static withCacheSize(t){return new It(t,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */It.DEFAULT_COLLECTION_PERCENTILE=10,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,It.DEFAULT=new It(Iu,It.DEFAULT_COLLECTION_PERCENTILE,It.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),It.DISABLED=new It(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new Oe(0)}static cr(){return new Oe(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo="LruGarbageCollector",Wf=1048576;function Jo([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class Xf{constructor(t){this.Ir=t,this.buffer=new at(Jo),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Jo(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Yf{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){D(Yo,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ue(e)?D(Yo,"Ignoring IndexedDB error during garbage collection: ",e):await Fe(e)}await this.Vr(3e5)})}}class Jf{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next(r=>Math.floor(e/100*r))}nthSequenceNumber(t,e){if(e===0)return S.resolve(pr.ce);const r=new Xf(e);return this.mr.forEachTarget(t,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(t,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(t,e,r){return this.mr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Xo)):this.getCacheSize(t).next(r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xo):this.yr(t,e))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let r,s,o,a,l,h,d;const g=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(I=>(I>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${I}`),s=this.params.maximumSequenceNumbersToCollect):s=I,a=Date.now(),this.nthSequenceNumber(t,s))).next(I=>(r=I,l=Date.now(),this.removeTargets(t,r,e))).next(I=>(o=I,h=Date.now(),this.removeOrphanedDocuments(t,r))).next(I=>(d=Date.now(),Ae()<=$.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-g}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${I} documents in `+(d-h)+`ms
Total Duration: ${d-g}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:I})))}}function Zf(n,t){return new Jf(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(){this.changes=new _e(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,_t.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?S.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&fn(r.mutation,s,St.empty(),Y.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,j()).next(()=>r))}getLocalViewOfDocuments(t,e,r=j()){const s=he();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(o=>{let a=sn();return o.forEach((l,h)=>{a=a.insert(l,h.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const r=he();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,j()))}populateOverlays(t,e,r){const s=[];return r.forEach(o=>{e.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(t,s).next(o=>{o.forEach((a,l)=>{e.set(a,l)})})}computeViews(t,e,r,s){let o=Bt();const a=hn(),l=function(){return hn()}();return e.forEach((h,d)=>{const g=r.get(d.key);s.has(d.key)&&(g===void 0||g.mutation instanceof ye)?o=o.insert(d.key,d):g!==void 0?(a.set(d.key,g.mutation.getFieldMask()),fn(g.mutation,d,g.mutation.getFieldMask(),Y.now())):a.set(d.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((d,g)=>a.set(d,g)),e.forEach((d,g)=>l.set(d,new ed(g,a.get(d)??null))),l))}recalculateAndSaveOverlays(t,e){const r=hn();let s=new J((a,l)=>a-l),o=j();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const l of a)l.keys().forEach(h=>{const d=e.get(h);if(d===null)return;let g=r.get(h)||St.empty();g=l.applyToLocalView(d,g),r.set(h,g);const I=(s.get(l.batchId)||j()).add(h);s=s.insert(l.batchId,I)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),d=h.key,g=h.value,I=nu();g.forEach(w=>{if(!o.has(w)){const P=uu(e.get(w),r.get(w));P!==null&&I.set(w,P),o=o.add(w)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,I))}return S.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):rf(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):S.resolve(he());let l=gn,h=o;return a.next(d=>S.forEach(d,(g,I)=>(l<I.largestBatchId&&(l=I.largestBatchId),o.get(g)?S.resolve():this.remoteDocumentCache.getEntry(t,g).next(w=>{h=h.insert(g,w)}))).next(()=>this.populateOverlays(t,d,o)).next(()=>this.computeViews(t,h,d,j())).next(g=>({batchId:l,changes:eu(g)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new M(e)).next(r=>{let s=sn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=sn();return this.indexManager.getCollectionParents(t,o).next(l=>S.forEach(l,h=>{const d=function(I,w){return new yr(w,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,d,r,s).next(g=>{g.forEach((I,w)=>{a=a.insert(I,w)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s))).next(a=>{o.forEach((h,d)=>{const g=d.getKey();a.get(g)===null&&(a=a.insert(g,_t.newInvalidDocument(g)))});let l=sn();return a.forEach((h,d)=>{const g=o.get(h);g!==void 0&&fn(g.mutation,d,St.empty(),Y.now()),Tr(e,d)&&(l=l.insert(h,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return S.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Dt(s.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,function(s){return{name:s.name,query:Gf(s.bundledQuery),readTime:Dt(s.readTime)}}(e)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(){this.overlays=new J(M.comparator),this.qr=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const r=he();return S.forEach(e,s=>this.getOverlay(t,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,o)=>{this.St(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.qr.delete(r)),S.resolve()}getOverlaysForCollection(t,e,r){const s=he(),o=e.length+1,a=new M(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,d=h.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new J((d,g)=>d-g);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>r){let g=o.get(d.largestBatchId);g===null&&(g=he(),o=o.insert(d.largestBatchId,g)),g.set(d.getKey(),d)}}const l=he(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,g)=>l.set(d,g)),!(l.size()>=s)););return S.resolve(l)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new vf(e,r));let o=this.qr.get(e);o===void 0&&(o=j(),this.qr.set(e,o)),this.qr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(){this.sessionToken=dt.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(){this.Qr=new at(lt.$r),this.Ur=new at(lt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const r=new lt(t,e);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Gr(new lt(t,e))}zr(t,e){t.forEach(r=>this.removeReference(r,e))}jr(t){const e=new M(new X([])),r=new lt(e,t),s=new lt(e,t+1),o=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),o.push(a.key)}),o}Jr(){this.Qr.forEach(t=>this.Gr(t))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new M(new X([])),r=new lt(e,t),s=new lt(e,t+1);let o=j();return this.Ur.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(t){const e=new lt(t,0),r=this.Qr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class lt{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return M.comparator(t.key,e.key)||B(t.Yr,e.Yr)}static Kr(t,e){return B(t.Yr,e.Yr)||M.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new at(lt.$r)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new If(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new lt(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return S.resolve(a)}lookupMutationBatch(t,e){return S.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.ei(r),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?xs:this.tr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new lt(e,0),s=new lt(e,Number.POSITIVE_INFINITY),o=[];return this.Zr.forEachInRange([r,s],a=>{const l=this.Xr(a.Yr);o.push(l)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new at(B);return e.forEach(s=>{const o=new lt(s,0),a=new lt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([o,a],l=>{r=r.add(l.Yr)})}),S.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;M.isDocumentKey(o)||(o=o.child(""));const a=new lt(new M(o),0);let l=new at(B);return this.Zr.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(h.Yr)),!0)},a),S.resolve(this.ti(l))}ti(t){const e=[];return t.forEach(r=>{const s=this.Xr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){H(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return S.forEach(e.mutations,s=>{const o=new lt(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Zr=r})}ir(t){}containsKey(t,e){const r=new lt(e,0),s=this.Zr.firstAfterOrEqual(r);return S.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(t){this.ri=t,this.docs=function(){return new J(M.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ri(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return S.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(e))}getEntries(t,e){let r=Bt();return e.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():_t.newInvalidDocument(s))}),S.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=Bt();const a=e.path,l=new M(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:d,value:{document:g}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Oh(kh(g),r)<=0||(s.has(g.key)||Tr(e,g))&&(o=o.insert(g.key,g.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,r,s){x(9500)}ii(t,e){return S.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new ud(this)}getSize(t){return S.resolve(this.size)}}class ud extends td{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(r)}),S.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(t){this.persistence=t,this.si=new _e(e=>Us(e),Bs),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.oi=0,this._i=new Gs,this.targetCount=0,this.ai=Oe.ur()}forEachTarget(t,e){return this.si.forEach((r,s)=>e(s)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.oi&&(this.oi=e),S.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new Oe(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Pr(e),S.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.si.forEach((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.si.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)}),S.waitFor(o).next(()=>s)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const r=this.si.get(e)||null;return S.resolve(r)}addMatchingKeys(t,e,r){return this._i.Wr(e,r),S.resolve()}removeMatchingKeys(t,e,r){this._i.zr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach(a=>{o.push(s.markPotentiallyOrphaned(t,a))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const r=this._i.Hr(e);return S.resolve(r)}containsKey(t,e){return S.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(t,e){this.ui={},this.overlays={},this.ci=new pr(0),this.li=!1,this.li=!0,this.hi=new id,this.referenceDelegate=t(this),this.Pi=new cd(this),this.indexManager=new Kf,this.remoteDocumentCache=function(s){return new ad(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new Hf(e),this.Ii=new rd(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new sd,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.ui[t.toKey()];return r||(r=new od(e,this.referenceDelegate),this.ui[t.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,r){D("MemoryPersistence","Starting transaction:",t);const s=new ld(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(o=>this.referenceDelegate.di(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ai(t,e){return S.or(Object.values(this.ui).map(r=>()=>r.containsKey(t,e)))}}class ld extends xh{constructor(t){super(),this.currentSequenceNumber=t}}class Ks{constructor(t){this.persistence=t,this.Ri=new Gs,this.Vi=null}static mi(t){return new Ks(t)}get fi(){if(this.Vi)return this.Vi;throw x(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.fi.delete(r.toString()),S.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.fi.add(r.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),S.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(o=>this.fi.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.fi,r=>{const s=M.fromPath(r);return this.gi(t,s).next(o=>{o||e.removeEntry(s,L.min())})}).next(()=>(this.Vi=null,e.apply(t)))}updateLimboDocument(t,e){return this.gi(t,e).next(r=>{r?this.fi.delete(e.toString()):this.fi.add(e.toString())})}Ti(t){return 0}gi(t,e){return S.or([()=>S.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class hr{constructor(t,e){this.persistence=t,this.pi=new _e(r=>Uh(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=Zf(this,e)}static mi(t,e){return new hr(t,e)}Ei(){}di(t){return S.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next(r=>e.next(s=>r+s))}wr(t){let e=0;return this.pr(t,r=>{e++}).next(()=>e)}pr(t,e){return S.forEach(this.pi,(r,s)=>this.br(t,r,s).next(o=>o?S.resolve():e(s)))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ii(t,a=>this.br(t,a,e).next(l=>{l||(r++,o.removeEntry(a,L.min()))})).next(()=>o.apply(t)).next(()=>r)}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),S.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),S.resolve()}removeReference(t,e,r){return this.pi.set(r,t.currentSequenceNumber),S.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),S.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Qn(t.data.value)),e}br(t,e,r){return S.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Es=r,this.ds=s}static As(t,e){let r=j(),s=j();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Qs(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return nl()?8:Lh(tl())>0?6:4}()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.ys(t,e).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ws(t,e,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new hd;return this.Ss(t,e,a).next(l=>{if(o.result=l,this.Vs)return this.bs(t,e,a,l.size)})}).next(()=>o.result)}bs(t,e,r,s){return r.documentReadCount<this.fs?(Ae()<=$.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",we(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),S.resolve()):(Ae()<=$.DEBUG&&D("QueryEngine","Query:",we(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Ae()<=$.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",we(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,bt(e))):S.resolve())}ys(t,e){if(Bo(e))return S.resolve(null);let r=bt(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Ts(e,null,"F"),r=bt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const a=j(...o);return this.ps.getDocuments(t,a).next(l=>this.indexManager.getMinOffset(t,r).next(h=>{const d=this.Ds(e,l);return this.Cs(e,d,a,h.readTime)?this.ys(t,Ts(e,null,"F")):this.vs(t,d,e,h)}))})))}ws(t,e,r,s){return Bo(e)||s.isEqual(L.min())?S.resolve(null):this.ps.getDocuments(t,r).next(o=>{const a=this.Ds(e,o);return this.Cs(e,a,r,s)?S.resolve(null):(Ae()<=$.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),we(e)),this.vs(t,a,e,Nh(s,gn)).next(l=>l))})}Ds(t,e){let r=new at(Za(t));return e.forEach((s,o)=>{Tr(t,o)&&(r=r.add(o))}),r}Cs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Ss(t,e,r){return Ae()<=$.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",we(e)),this.ps.getDocumentsMatchingQuery(t,e,Jt.min(),r)}vs(t,e,r,s){return this.ps.getDocumentsMatchingQuery(t,r,s).next(o=>(e.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ws="LocalStore",dd=3e8;class md{constructor(t,e,r,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new J(B),this.xs=new _e(o=>Us(o),Bs),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(r)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new nd(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ms))}}function pd(n,t,e,r){return new md(n,t,e,r)}async function Au(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,e.Bs(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],l=[];let h=j();for(const d of s){a.push(d.batchId);for(const g of d.mutations)h=h.add(g.key)}for(const d of o){l.push(d.batchId);for(const g of d.mutations)h=h.add(g.key)}return e.localDocuments.getDocuments(r,h).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:l}))})})}function gd(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),o=e.Ns.newChangeBuffer({trackRemovals:!0});return function(l,h,d,g){const I=d.batch,w=I.keys();let P=S.resolve();return w.forEach(k=>{P=P.next(()=>g.getEntry(h,k)).next(O=>{const b=d.docVersions.get(k);H(b!==null,48541),O.version.compareTo(b)<0&&(I.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),g.addEntry(O)))})}),P.next(()=>l.mutationQueue.removeMutationBatch(h,I))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let h=j();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(h=h.add(l.batch.mutations[d].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function wu(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function _d(n,t){const e=F(n),r=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const l=[];t.targetChanges.forEach((g,I)=>{const w=s.get(I);if(!w)return;l.push(e.Pi.removeMatchingKeys(o,g.removedDocuments,I).next(()=>e.Pi.addMatchingKeys(o,g.addedDocuments,I)));let P=w.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(I)!==null?P=P.withResumeToken(dt.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):g.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(g.resumeToken,r)),s=s.insert(I,P),function(O,b,G){return O.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=dd?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0}(w,P,g)&&l.push(e.Pi.updateTargetData(o,P))});let h=Bt(),d=j();if(t.documentUpdates.forEach(g=>{t.resolvedLimboDocuments.has(g)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,g))}),l.push(yd(o,a,t.documentUpdates).next(g=>{h=g.ks,d=g.qs})),!r.isEqual(L.min())){const g=e.Pi.getLastRemoteSnapshotVersion(o).next(I=>e.Pi.setTargetsMetadata(o,o.currentSequenceNumber,r));l.push(g)}return S.waitFor(l).next(()=>a.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(e.Ms=s,o))}function yd(n,t,e){let r=j(),s=j();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let a=Bt();return e.forEach((l,h)=>{const d=o.get(l);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):D(Ws,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",h.version)}),{ks:a,qs:s}})}function Ed(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=xs),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function Td(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.Pi.getTargetData(r,t).next(o=>o?(s=o,S.resolve(s)):e.Pi.allocateTargetId(r).next(a=>(s=new Kt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(r.targetId,r),e.xs.set(t,r.targetId)),r})}async function Rs(n,t,e){const r=F(n),s=r.Ms.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Ue(a))throw a;D(Ws,`Failed to update sequence numbers for target ${t}: ${a}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function Zo(n,t,e){const r=F(n);let s=L.min(),o=j();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,g){const I=F(h),w=I.xs.get(g);return w!==void 0?S.resolve(I.Ms.get(w)):I.Pi.getTargetData(d,g)}(r,a,bt(t)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next(h=>{o=h})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?o:j())).next(l=>(Id(r,of(t),l),{documents:l,Qs:o})))}function Id(n,t,e){let r=n.Os.get(t)||L.min();e.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Os.set(t,r)}class ta{constructor(){this.activeTargetIds=ff()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class vd{constructor(){this.Mo=new ta,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,r){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new ta,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="ConnectivityMonitor";class na{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){D(ea,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){D(ea,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gn=null;function Ss(){return Gn===null?Gn=function(){return 268435456+Math.round(2147483648*Math.random())}():Gn++,"0x"+Gn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os="RestConnection",wd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Rd{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===sr?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(t,e,r,s,o){const a=Ss(),l=this.zo(t,e.toUriEncodedString());D(os,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(h,s,o);const{host:d}=new URL(l),g=Ds(d);return this.Jo(t,l,h,r,g).then(I=>(D(os,`Received RPC '${t}' ${a}: `,I),I),I=>{throw be(os,`RPC '${t}' ${a} failed with error: `,I,"url: ",l,"request:",r),I})}Ho(t,e,r,s,o,a){return this.Go(t,e,r,s,o)}jo(t,e,r){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Le}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,o)=>t[o]=s),r&&r.headers.forEach((s,o)=>t[o]=s)}zo(t,e){const r=wd[t];return`${this.Uo}/v1/${e}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="WebChannelConnection";class Cd extends Rd{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,r,s,o){const a=Ss();return new Promise((l,h)=>{const d=new Ca;d.setWithCredentials(!0),d.listenOnce(Pa.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Kn.NO_ERROR:const I=d.getResponseJson();D(pt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(I)),l(I);break;case Kn.TIMEOUT:D(pt,`RPC '${t}' ${a} timed out`),h(new N(C.DEADLINE_EXCEEDED,"Request time out"));break;case Kn.HTTP_ERROR:const w=d.getStatus();if(D(pt,`RPC '${t}' ${a} failed with status:`,w,"response text:",d.getResponseText()),w>0){let P=d.getResponseJson();Array.isArray(P)&&(P=P[0]);const k=P==null?void 0:P.error;if(k&&k.status&&k.message){const O=function(G){const z=G.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(z)>=0?z:C.UNKNOWN}(k.status);h(new N(O,k.message))}else h(new N(C.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new N(C.UNAVAILABLE,"Connection failed."));break;default:x(9055,{l_:t,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{D(pt,`RPC '${t}' ${a} completed.`)}});const g=JSON.stringify(s);D(pt,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",g,r,15)})}T_(t,e,r){const s=Ss(),o=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Da(),l=ba(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.jo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const g=o.join("");D(pt,`Creating RPC '${t}' stream ${s}: ${g}`,h);const I=a.createWebChannel(g,h);this.I_(I);let w=!1,P=!1;const k=new Sd({Yo:b=>{P?D(pt,`Not sending because RPC '${t}' stream ${s} is closed:`,b):(w||(D(pt,`Opening RPC '${t}' stream ${s} transport.`),I.open(),w=!0),D(pt,`RPC '${t}' stream ${s} sending:`,b),I.send(b))},Zo:()=>I.close()}),O=(b,G,z)=>{b.listen(G,K=>{try{z(K)}catch(ut){setTimeout(()=>{throw ut},0)}})};return O(I,rn.EventType.OPEN,()=>{P||(D(pt,`RPC '${t}' stream ${s} transport opened.`),k.o_())}),O(I,rn.EventType.CLOSE,()=>{P||(P=!0,D(pt,`RPC '${t}' stream ${s} transport closed`),k.a_(),this.E_(I))}),O(I,rn.EventType.ERROR,b=>{P||(P=!0,be(pt,`RPC '${t}' stream ${s} transport errored. Name:`,b.name,"Message:",b.message),k.a_(new N(C.UNAVAILABLE,"The operation could not be completed")))}),O(I,rn.EventType.MESSAGE,b=>{var G;if(!P){const z=b.data[0];H(!!z,16349);const K=z,ut=(K==null?void 0:K.error)||((G=K[0])==null?void 0:G.error);if(ut){D(pt,`RPC '${t}' stream ${s} received error:`,ut);const vt=ut.status;let rt=function(_){const T=et[_];if(T!==void 0)return hu(T)}(vt),E=ut.message;rt===void 0&&(rt=C.INTERNAL,E="Unknown error status: "+vt+" with message "+ut.message),P=!0,k.a_(new N(rt,E)),I.close()}else D(pt,`RPC '${t}' stream ${s} received:`,z),k.u_(z)}}),O(l,Va.STAT_EVENT,b=>{b.stat===ms.PROXY?D(pt,`RPC '${t}' stream ${s} detected buffering proxy`):b.stat===ms.NOPROXY&&D(pt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.__()},0),k}terminate(){this.c_.forEach(t=>t.close()),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter(e=>e===t)}}function as(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(n){return new Df(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Mi=t,this.timerId=e,this.d_=r,this.A_=s,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),t())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="PersistentStream";class Su{constructor(t,e,r,s,o,a,l,h){this.Mi=t,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ru(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===C.RESOURCE_EXHAUSTED?(Ut(e.toString()),Ut("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===e&&this.G_(r,s)},r=>{t(()=>{const s=new N(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(t,e){const r=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(t){return D(ra,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget(()=>this.D_===t?e():(D(ra,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Pd extends Su{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=Of(this.serializer,t),r=function(o){if(!("targetChange"in o))return L.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?Dt(a.readTime):L.min()}(t);return this.listener.H_(e,r)}Y_(t){const e={};e.database=ws(this.serializer),e.addTarget=function(o,a){let l;const h=a.target;if(l=Es(h)?{documents:Lf(o,h)}:{query:Ff(o,h).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=mu(o,a.resumeToken);const d=Is(o,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(L.min())>0){l.readTime=lr(o,a.snapshotVersion.toTimestamp());const d=Is(o,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,t);const r=Bf(this.serializer,t);r&&(e.labels=r),this.q_(e)}Z_(t){const e={};e.database=ws(this.serializer),e.removeTarget=t,this.q_(e)}}class Vd extends Su{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return H(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,H(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){H(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=xf(t.writeResults,t.commitTime),r=Dt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=ws(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>Mf(this.serializer,r))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{}class Dd extends bd{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(C.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Go(t,vs(e,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(C.UNKNOWN,o.toString())})}Ho(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Ho(t,vs(e,r),s,a,l,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(C.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Nd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ut(e),this.aa=!1):D("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pe="RemoteStore";class kd{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=o,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{Ee(this)&&(D(pe,"Restarting streams for network reachability change."),await async function(h){const d=F(h);d.Ea.add(4),await Rn(d),d.Ra.set("Unknown"),d.Ea.delete(4),await Rr(d)}(this))})}),this.Ra=new Nd(r,s)}}async function Rr(n){if(Ee(n))for(const t of n.da)await t(!0)}async function Rn(n){for(const t of n.da)await t(!1)}function Cu(n,t){const e=F(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),Zs(e)?Js(e):Be(e).O_()&&Ys(e,t))}function Xs(n,t){const e=F(n),r=Be(e);e.Ia.delete(t),r.O_()&&Pu(e,t),e.Ia.size===0&&(r.O_()?r.L_():Ee(e)&&e.Ra.set("Unknown"))}function Ys(n,t){if(n.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Be(n).Y_(t)}function Pu(n,t){n.Va.Ue(t),Be(n).Z_(t)}function Js(n){n.Va=new Cf({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),Be(n).start(),n.Ra.ua()}function Zs(n){return Ee(n)&&!Be(n).x_()&&n.Ia.size>0}function Ee(n){return F(n).Ea.size===0}function Vu(n){n.Va=void 0}async function Od(n){n.Ra.set("Online")}async function Md(n){n.Ia.forEach((t,e)=>{Ys(n,t)})}async function xd(n,t){Vu(n),Zs(n)?(n.Ra.ha(t),Js(n)):n.Ra.set("Unknown")}async function Ld(n,t,e){if(n.Ra.set("Online"),t instanceof du&&t.state===2&&t.cause)try{await async function(s,o){const a=o.cause;for(const l of o.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))}(n,t)}catch(r){D(pe,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await fr(n,r)}else if(t instanceof Yn?n.Va.Ze(t):t instanceof fu?n.Va.st(t):n.Va.tt(t),!e.isEqual(L.min()))try{const r=await wu(n.localStore);e.compareTo(r)>=0&&await function(o,a){const l=o.Va.Tt(a);return l.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const g=o.Ia.get(d);g&&o.Ia.set(d,g.withResumeToken(h.resumeToken,a))}}),l.targetMismatches.forEach((h,d)=>{const g=o.Ia.get(h);if(!g)return;o.Ia.set(h,g.withResumeToken(dt.EMPTY_BYTE_STRING,g.snapshotVersion)),Pu(o,h);const I=new Kt(g.target,h,d,g.sequenceNumber);Ys(o,I)}),o.remoteSyncer.applyRemoteEvent(l)}(n,e)}catch(r){D(pe,"Failed to raise snapshot:",r),await fr(n,r)}}async function fr(n,t,e){if(!Ue(t))throw t;n.Ea.add(1),await Rn(n),n.Ra.set("Offline"),e||(e=()=>wu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{D(pe,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await Rr(n)})}function bu(n,t){return t().catch(e=>fr(n,e,t))}async function Sr(n){const t=F(n),e=ne(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:xs;for(;Fd(t);)try{const s=await Ed(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,Ud(t,s)}catch(s){await fr(t,s)}Du(t)&&Nu(t)}function Fd(n){return Ee(n)&&n.Ta.length<10}function Ud(n,t){n.Ta.push(t);const e=ne(n);e.O_()&&e.X_&&e.ea(t.mutations)}function Du(n){return Ee(n)&&!ne(n).x_()&&n.Ta.length>0}function Nu(n){ne(n).start()}async function Bd(n){ne(n).ra()}async function jd(n){const t=ne(n);for(const e of n.Ta)t.ea(e.mutations)}async function qd(n,t,e){const r=n.Ta.shift(),s=$s.from(r,t,e);await bu(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Sr(n)}async function $d(n,t){t&&ne(n).X_&&await async function(r,s){if(function(a){return wf(a)&&a!==C.ABORTED}(s.code)){const o=r.Ta.shift();ne(r).B_(),await bu(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Sr(r)}}(n,t),Du(n)&&Nu(n)}async function sa(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),D(pe,"RemoteStore received new credentials");const r=Ee(e);e.Ea.add(3),await Rn(e),r&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await Rr(e)}async function zd(n,t){const e=F(n);t?(e.Ea.delete(2),await Rr(e)):t||(e.Ea.add(2),await Rn(e),e.Ra.set("Unknown"))}function Be(n){return n.ma||(n.ma=function(e,r,s){const o=F(e);return o.sa(),new Pd(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Xo:Od.bind(null,n),t_:Md.bind(null,n),r_:xd.bind(null,n),H_:Ld.bind(null,n)}),n.da.push(async t=>{t?(n.ma.B_(),Zs(n)?Js(n):n.Ra.set("Unknown")):(await n.ma.stop(),Vu(n))})),n.ma}function ne(n){return n.fa||(n.fa=function(e,r,s){const o=F(e);return o.sa(),new Vd(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Bd.bind(null,n),r_:$d.bind(null,n),ta:jd.bind(null,n),na:qd.bind(null,n)}),n.da.push(async t=>{t?(n.fa.B_(),await Sr(n)):(await n.fa.stop(),n.Ta.length>0&&(D(pe,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new xt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new ti(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(C.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ei(n,t){if(Ut("AsyncQueue",`${t}: ${n}`),Ue(n))return new N(C.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{static emptySet(t){return new Pe(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||M.comparator(e.key,r.key):(e,r)=>M.comparator(e.key,r.key),this.keyedMap=sn(),this.sortedSet=new J(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Pe)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Pe;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(){this.ga=new J(M.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):x(63341,{Rt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,r)=>{t.push(r)}),t}}class Me{constructor(t,e,r,s,o,a,l,h,d){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach(l=>{a.push({type:0,doc:l})}),new Me(t,e,Pe.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Er(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(t=>t.Da())}}class Gd{constructor(){this.queries=oa(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=oa(),o.forEach((a,l)=>{for(const h of l.Sa)h.onError(r)})})(this,new N(C.ABORTED,"Firestore shutting down"))}}function oa(){return new _e(n=>Ja(n),Er)}async function ku(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.ba()&&t.Da()&&(r=2):(o=new Hd,r=t.Da()?0:1);try{switch(r){case 0:o.wa=await e.onListen(s,!0);break;case 1:o.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=ei(a,`Initialization of query '${we(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&ni(e)}async function Ou(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Sa.indexOf(t);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?s=t.Da()?0:1:!o.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Kd(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&ni(e)}function Qd(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.Sa)o.onError(e);r.queries.delete(t)}function ni(n){n.Ca.forEach(t=>{t.next()})}var Cs,aa;(aa=Cs||(Cs={})).Ma="default",aa.Cache="cache";class Mu{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new Me(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=Me.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Cs.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(t){this.key=t}}class Lu{constructor(t){this.key=t}}class Wd{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=j(),this.mutatedKeys=j(),this.eu=Za(t),this.tu=new Pe(this.eu)}get nu(){return this.Ya}ru(t,e){const r=e?e.iu:new ia,s=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((g,I)=>{const w=s.get(g),P=Tr(this.query,I)?I:null,k=!!w&&this.mutatedKeys.has(w.key),O=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let b=!1;w&&P?w.data.isEqual(P.data)?k!==O&&(r.track({type:3,doc:P}),b=!0):this.su(w,P)||(r.track({type:2,doc:P}),b=!0,(h&&this.eu(P,h)>0||d&&this.eu(P,d)<0)&&(l=!0)):!w&&P?(r.track({type:0,doc:P}),b=!0):w&&!P&&(r.track({type:1,doc:w}),b=!0,(h||d)&&(l=!0)),b&&(P?(a=a.add(P),o=O?o.add(g):o.delete(g)):(a=a.delete(g),o=o.delete(g)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const g=this.query.limitType==="F"?a.last():a.first();a=a.delete(g.key),o=o.delete(g.key),r.track({type:1,doc:g})}return{tu:a,iu:r,Cs:l,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort((g,I)=>function(P,k){const O=b=>{switch(b){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{Rt:b})}};return O(P)-O(k)}(g.type,I.type)||this.eu(g.doc,I.doc)),this.ou(r),s=s??!1;const l=e&&!s?this._u():[],h=this.Xa.size===0&&this.current&&!s?1:0,d=h!==this.Za;return this.Za=h,a.length!==0||d?{snapshot:new Me(this.query,t.tu,o,a,t.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new ia,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=j(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const e=[];return t.forEach(r=>{this.Xa.has(r)||e.push(new Lu(r))}),this.Xa.forEach(r=>{t.has(r)||e.push(new xu(r))}),e}cu(t){this.Ya=t.Qs,this.Xa=j();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return Me.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const ri="SyncEngine";class Xd{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Yd{constructor(t){this.key=t,this.hu=!1}}class Jd{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new _e(l=>Ja(l),Er),this.Iu=new Map,this.Eu=new Set,this.du=new J(M.comparator),this.Au=new Map,this.Ru=new Gs,this.Vu={},this.mu=new Map,this.fu=Oe.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Zd(n,t,e=!0){const r=$u(n);let s;const o=r.Tu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.lu()):s=await Fu(r,t,e,!0),s}async function tm(n,t){const e=$u(n);await Fu(e,t,!0,!1)}async function Fu(n,t,e,r){const s=await Td(n.localStore,bt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await em(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&Cu(n.remoteStore,s),l}async function em(n,t,e,r,s){n.pu=(I,w,P)=>async function(O,b,G,z){let K=b.view.ru(G);K.Cs&&(K=await Zo(O.localStore,b.query,!1).then(({documents:E})=>b.view.ru(E,K)));const ut=z&&z.targetChanges.get(b.targetId),vt=z&&z.targetMismatches.get(b.targetId)!=null,rt=b.view.applyChanges(K,O.isPrimaryClient,ut,vt);return ca(O,b.targetId,rt.au),rt.snapshot}(n,I,w,P);const o=await Zo(n.localStore,t,!0),a=new Wd(t,o.Qs),l=a.ru(o.documents),h=wn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,h);ca(n,e,d.au);const g=new Xd(t,e,a);return n.Tu.set(t,g),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),d.snapshot}async function nm(n,t,e){const r=F(n),s=r.Tu.get(t),o=r.Iu.get(s.targetId);if(o.length>1)return r.Iu.set(s.targetId,o.filter(a=>!Er(a,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Rs(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),e&&Xs(r.remoteStore,s.targetId),Ps(r,s.targetId)}).catch(Fe)):(Ps(r,s.targetId),await Rs(r.localStore,s.targetId,!0))}async function rm(n,t){const e=F(n),r=e.Tu.get(t),s=e.Iu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Xs(e.remoteStore,r.targetId))}async function sm(n,t,e){const r=hm(n);try{const s=await function(a,l){const h=F(a),d=Y.now(),g=l.reduce((P,k)=>P.add(k.key),j());let I,w;return h.persistence.runTransaction("Locally write mutations","readwrite",P=>{let k=Bt(),O=j();return h.Ns.getEntries(P,g).next(b=>{k=b,k.forEach((G,z)=>{z.isValidDocument()||(O=O.add(G))})}).next(()=>h.localDocuments.getOverlayedDocuments(P,k)).next(b=>{I=b;const G=[];for(const z of l){const K=Ef(z,I.get(z.key).overlayedDocument);K!=null&&G.push(new ye(z.key,K,Ha(K.value.mapValue),Lt.exists(!0)))}return h.mutationQueue.addMutationBatch(P,d,G,l)}).next(b=>{w=b;const G=b.applyToLocalDocumentSet(I,O);return h.documentOverlayCache.saveOverlays(P,b.batchId,G)})}).then(()=>({batchId:w.batchId,changes:eu(I)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,h){let d=a.Vu[a.currentUser.toKey()];d||(d=new J(B)),d=d.insert(l,h),a.Vu[a.currentUser.toKey()]=d}(r,s.batchId,e),await Sn(r,s.changes),await Sr(r.remoteStore)}catch(s){const o=ei(s,"Failed to persist write");e.reject(o)}}async function Uu(n,t){const e=F(n);try{const r=await _d(e.localStore,t);t.targetChanges.forEach((s,o)=>{const a=e.Au.get(o);a&&(H(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?H(a.hu,14607):s.removedDocuments.size>0&&(H(a.hu,42227),a.hu=!1))}),await Sn(e,r,t)}catch(r){await Fe(r)}}function ua(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach((o,a)=>{const l=a.view.va(t);l.snapshot&&s.push(l.snapshot)}),function(a,l){const h=F(a);h.onlineState=l;let d=!1;h.queries.forEach((g,I)=>{for(const w of I.Sa)w.va(l)&&(d=!0)}),d&&ni(h)}(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function im(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),o=s&&s.key;if(o){let a=new J(M.comparator);a=a.insert(o,_t.newNoDocument(o,L.min()));const l=j().add(o),h=new Ar(L.min(),new Map,new J(B),a,l);await Uu(r,h),r.du=r.du.remove(o),r.Au.delete(t),si(r)}else await Rs(r.localStore,t,!1).then(()=>Ps(r,t,e)).catch(Fe)}async function om(n,t){const e=F(n),r=t.batch.batchId;try{const s=await gd(e.localStore,t);ju(e,r,null),Bu(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Sn(e,s)}catch(s){await Fe(s)}}async function am(n,t,e){const r=F(n);try{const s=await function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let g;return h.mutationQueue.lookupMutationBatch(d,l).next(I=>(H(I!==null,37113),g=I.keys(),h.mutationQueue.removeMutationBatch(d,I))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,g,l)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,g)).next(()=>h.localDocuments.getDocuments(d,g))})}(r.localStore,t);ju(r,t,e),Bu(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Sn(r,s)}catch(s){await Fe(s)}}function Bu(n,t){(n.mu.get(t)||[]).forEach(e=>{e.resolve()}),n.mu.delete(t)}function ju(n,t,e){const r=F(n);let s=r.Vu[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function Ps(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Iu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Iu.delete(t),n.isPrimaryClient&&n.Ru.jr(t).forEach(r=>{n.Ru.containsKey(r)||qu(n,r)})}function qu(n,t){n.Eu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(Xs(n.remoteStore,e),n.du=n.du.remove(t),n.Au.delete(e),si(n))}function ca(n,t,e){for(const r of e)r instanceof xu?(n.Ru.addReference(r.key,t),um(n,r)):r instanceof Lu?(D(ri,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,t),n.Ru.containsKey(r.key)||qu(n,r.key)):x(19791,{wu:r})}function um(n,t){const e=t.key,r=e.path.canonicalString();n.du.get(e)||n.Eu.has(r)||(D(ri,"New document in limbo: "+e),n.Eu.add(r),si(n))}function si(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new M(X.fromString(t)),r=n.fu.next();n.Au.set(r,new Yd(e)),n.du=n.du.insert(e,r),Cu(n.remoteStore,new Kt(bt(js(e.path)),r,"TargetPurposeLimboResolution",pr.ce))}}async function Sn(n,t,e){const r=F(n),s=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,h)=>{a.push(r.pu(h,t,e).then(d=>{var g;if((d||e)&&r.isPrimaryClient){const I=d?!d.fromCache:(g=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:g.current;r.sharedClientState.updateQueryState(h.targetId,I?"current":"not-current")}if(d){s.push(d);const I=Qs.As(h.targetId,d);o.push(I)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(h,d){const g=F(h);try{await g.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>S.forEach(d,w=>S.forEach(w.Es,P=>g.persistence.referenceDelegate.addReference(I,w.targetId,P)).next(()=>S.forEach(w.ds,P=>g.persistence.referenceDelegate.removeReference(I,w.targetId,P)))))}catch(I){if(!Ue(I))throw I;D(Ws,"Failed to update sequence numbers: "+I)}for(const I of d){const w=I.targetId;if(!I.fromCache){const P=g.Ms.get(w),k=P.snapshotVersion,O=P.withLastLimboFreeSnapshotVersion(k);g.Ms=g.Ms.insert(w,O)}}}(r.localStore,o))}async function cm(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){D(ri,"User change. New user:",t.toKey());const r=await Au(e.localStore,t);e.currentUser=t,function(o,a){o.mu.forEach(l=>{l.forEach(h=>{h.reject(new N(C.CANCELLED,a))})}),o.mu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Sn(e,r.Ls)}}function lm(n,t){const e=F(n),r=e.Au.get(t);if(r&&r.hu)return j().add(r.key);{let s=j();const o=e.Iu.get(t);if(!o)return s;for(const a of o){const l=e.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function $u(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Uu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=lm.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=im.bind(null,t),t.Pu.H_=Kd.bind(null,t.eventManager),t.Pu.yu=Qd.bind(null,t.eventManager),t}function hm(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=om.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=am.bind(null,t),t}class dr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=wr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return pd(this.persistence,new fd,t.initialUser,this.serializer)}Cu(t){return new vu(Ks.mi,this.serializer)}Du(t){return new vd}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}dr.provider={build:()=>new dr};class fm extends dr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){H(this.persistence.referenceDelegate instanceof hr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Yf(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?It.withCacheSize(this.cacheSizeBytes):It.DEFAULT;return new vu(r=>hr.mi(r,e),this.serializer)}}class Vs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>ua(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=cm.bind(null,this.syncEngine),await zd(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Gd}()}createDatastore(t){const e=wr(t.databaseInfo.databaseId),r=function(o){return new Cd(o)}(t.databaseInfo);return function(o,a,l,h){return new Dd(o,a,l,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,o,a,l){return new kd(r,s,o,a,l)}(this.localStore,this.datastore,t.asyncQueue,e=>ua(this.syncEngine,e,0),function(){return na.v()?new na:new Ad}())}createSyncEngine(t,e){return function(s,o,a,l,h,d,g){const I=new Jd(s,o,a,l,h,d);return g&&(I.gu=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const o=F(s);D(pe,"RemoteStore shutting down."),o.Ea.add(5),await Rn(o),o.Aa.shutdown(),o.Ra.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Vs.provider={build:()=>new Vs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):Ut("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re="FirestoreClient";class dm{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=gt.UNAUTHENTICATED,this.clientId=Os.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{D(re,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(D(re,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new xt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=ei(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function us(n,t){n.asyncQueue.verifyOperationInProgress(),D(re,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Au(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function la(n,t){n.asyncQueue.verifyOperationInProgress();const e=await mm(n);D(re,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>sa(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>sa(t.remoteStore,s)),n._onlineComponents=t}async function mm(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D(re,"Using user provided OfflineComponentProvider");try{await us(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;be("Error using user provided cache. Falling back to memory cache: "+e),await us(n,new dr)}}else D(re,"Using default OfflineComponentProvider"),await us(n,new fm(void 0));return n._offlineComponents}async function Hu(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D(re,"Using user provided OnlineComponentProvider"),await la(n,n._uninitializedComponentsProvider._online)):(D(re,"Using default OnlineComponentProvider"),await la(n,new Vs))),n._onlineComponents}function pm(n){return Hu(n).then(t=>t.syncEngine)}async function Gu(n){const t=await Hu(n),e=t.eventManager;return e.onListen=Zd.bind(null,t.syncEngine),e.onUnlisten=nm.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=tm.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=rm.bind(null,t.syncEngine),e}function gm(n,t,e={}){const r=new xt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,d){const g=new zu({next:w=>{g.Nu(),a.enqueueAndForget(()=>Ou(o,I));const P=w.docs.has(l);!P&&w.fromCache?d.reject(new N(C.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&w.fromCache&&h&&h.source==="server"?d.reject(new N(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(w)},error:w=>d.reject(w)}),I=new Mu(js(l.path),g,{includeMetadataChanges:!0,qa:!0});return ku(o,I)}(await Gu(n),n.asyncQueue,t,e,r)),r.promise}function _m(n,t,e={}){const r=new xt;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,l,h,d){const g=new zu({next:w=>{g.Nu(),a.enqueueAndForget(()=>Ou(o,I)),w.fromCache&&h.source==="server"?d.reject(new N(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(w)},error:w=>d.reject(w)}),I=new Mu(l,g,{includeMetadataChanges:!0,qa:!0});return ku(o,I)}(await Gu(n),n.asyncQueue,t,e,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu="firestore.googleapis.com",fa=!0;class da{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new N(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Qu,this.ssl=fa}else this.host=t.host,this.ssl=t.ssl??fa;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Iu;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Wf)throw new N(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Dh("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ku(t.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new N(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Cr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new da({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new N(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new da(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ih;switch(r.type){case"firstParty":return new Rh(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=ha.get(e);r&&(D("ComponentProvider","Removing Datastore"),ha.delete(e),r.terminate())}(this),Promise.resolve()}}function ym(n,t,e,r={}){var d;n=me(n,Cr);const s=Ds(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;s&&(Wc(`https://${l}`),Zc("Firestore",!0)),o.host!==Qu&&o.host!==l&&be("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:l,ssl:s,emulatorOptions:r};if(!tr(h,a)&&(n._setSettings(h),r.mockUserToken)){let g,I;if(typeof r.mockUserToken=="string")g=r.mockUserToken,I=gt.MOCK_USER;else{g=Xc(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const w=r.mockUserToken.sub||r.mockUserToken.user_id;if(!w)throw new N(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");I=new gt(w)}n._authCredentials=new vh(new ka(g,I))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Pr(this.firestore,t,this._query)}}class ot{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Yt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new ot(this.firestore,t,this._key)}toJSON(){return{type:ot._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(vn(e,ot._jsonSchema))return new ot(t,r||null,new M(X.fromString(e.referencePath)))}}ot._jsonSchemaVersion="firestore/documentReference/1.0",ot._jsonSchema={type:nt("string",ot._jsonSchemaVersion),referencePath:nt("string")};class Yt extends Pr{constructor(t,e,r){super(t,e,js(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new ot(this.firestore,null,new M(t))}withConverter(t){return new Yt(this.firestore,t,this._path)}}function Fm(n,t,...e){if(n=dn(n),Oa("collection","path",t),n instanceof Cr){const r=X.fromString(t,...e);return Co(r),new Yt(n,null,r)}{if(!(n instanceof ot||n instanceof Yt))throw new N(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(t,...e));return Co(r),new Yt(n.firestore,null,r)}}function Um(n,t,...e){if(n=dn(n),arguments.length===1&&(t=Os.newId()),Oa("doc","path",t),n instanceof Cr){const r=X.fromString(t,...e);return So(r),new ot(n,null,new M(r))}{if(!(n instanceof ot||n instanceof Yt))throw new N(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(t,...e));return So(r),new ot(n.firestore,n instanceof Yt?n.converter:null,new M(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma="AsyncQueue";class pa{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ru(this,"async_queue_retry"),this._c=()=>{const r=as();r&&D(ma,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=as();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=as();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new xt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Xu.push(t),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!Ue(t))throw t;D(ma,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(r=>{throw this.nc=r,this.rc=!1,Ut("INTERNAL UNHANDLED ERROR: ",ga(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=ti.createAndSchedule(this,t,e,r,o=>this.hc(o));return this.tc.push(s),s}uc(){this.nc&&x(47125,{Pc:ga(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then(()=>{this.tc.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()})}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function ga(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class Vr extends Cr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new pa,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new pa(t),this._firestoreClient=void 0,await t}}}function Bm(n,t){const e=typeof n=="object"?n:lh(),r=typeof n=="string"?n:sr,s=sh(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Kc("firestore");o&&ym(s,...o)}return s}function ii(n){if(n._terminated)throw new N(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Em(n),n._firestoreClient}function Em(n){var r,s,o;const t=n._freezeSettings(),e=function(l,h,d,g){return new qh(l,h,d,g.host,g.ssl,g.experimentalForceLongPolling,g.experimentalAutoDetectLongPolling,Ku(g.experimentalLongPollingOptions),g.useFetchStreams,g.isUsingEmulator)}(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,t);n._componentsProvider||(s=t.localCache)!=null&&s._offlineComponentProvider&&((o=t.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new dm(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&function(l){const h=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Rt(dt.fromBase64String(t))}catch(e){throw new N(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Rt(dt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Rt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(vn(t,Rt._jsonSchema))return Rt.fromBase64String(t.bytes)}}Rt._jsonSchemaVersion="firestore/bytes/1.0",Rt._jsonSchema={type:nt("string",Rt._jsonSchemaVersion),bytes:nt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new N(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ft(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new N(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new N(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Nt._jsonSchemaVersion}}static fromJSON(t){if(vn(t,Nt._jsonSchema))return new Nt(t.latitude,t.longitude)}}Nt._jsonSchemaVersion="firestore/geoPoint/1.0",Nt._jsonSchema={type:nt("string",Nt._jsonSchemaVersion),latitude:nt("number"),longitude:nt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,t._values)}toJSON(){return{type:kt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(vn(t,kt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new kt(t.vectorValues);throw new N(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}kt._jsonSchemaVersion="firestore/vectorValue/1.0",kt._jsonSchema={type:nt("string",kt._jsonSchemaVersion),vectorValues:nt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tm=/^__.*__$/;class Im{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new ye(t,this.data,this.fieldMask,e,this.fieldTransforms):new An(t,this.data,e,this.fieldTransforms)}}function Xu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{Ac:n})}}class ai{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new ai({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.gc(t),r}yc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.Vc({path:e,fc:!1});return r.Rc(),r}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return mr(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(Xu(this.Ac)&&Tm.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class vm{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||wr(t)}Cc(t,e,r,s=!1){return new ai({Ac:t,methodName:e,Dc:r,path:ft.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Am(n){const t=n._freezeSettings(),e=wr(n._databaseId);return new vm(n._databaseId,!!t.ignoreUndefinedProperties,e)}function wm(n,t,e,r,s,o={}){const a=n.Cc(o.merge||o.mergeFields?2:0,t,e,s);tc("Data must be an object, but it was:",a,r);const l=Ju(r,a);let h,d;if(o.merge)h=new St(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const g=[];for(const I of o.mergeFields){const w=Rm(t,I,e);if(!a.contains(w))throw new N(C.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Cm(g,w)||g.push(w)}h=new St(g),d=a.fieldTransforms.filter(I=>h.covers(I.field))}else h=null,d=a.fieldTransforms;return new Im(new wt(l),h,d)}function Yu(n,t){if(Zu(n=dn(n)))return tc("Unsupported field value:",t,n),Ju(n,t);if(n instanceof Wu)return function(r,s){if(!Xu(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const l of r){let h=Yu(l,s.wc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,t)}return function(r,s){if((r=dn(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return df(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=Y.fromDate(r);return{timestampValue:lr(s.serializer,o)}}if(r instanceof Y){const o=new Y(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:lr(s.serializer,o)}}if(r instanceof Nt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Rt)return{bytesValue:mu(s.serializer,r._byteString)};if(r instanceof ot){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Hs(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof kt)return function(a,l){return{mapValue:{fields:{[$a]:{stringValue:za},[ir]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw l.Sc("VectorValues must only contain numeric values.");return qs(l.serializer,d)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${Ms(r)}`)}(n,t)}function Ju(n,t){const e={};return La(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ge(n,(r,s)=>{const o=Yu(s,t.mc(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function Zu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Y||n instanceof Nt||n instanceof Rt||n instanceof ot||n instanceof Wu||n instanceof kt)}function tc(n,t,e){if(!Zu(e)||!Ma(e)){const r=Ms(e);throw r==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+r)}}function Rm(n,t,e){if((t=dn(t))instanceof oi)return t._internalPath;if(typeof t=="string")return ec(n,t);throw mr("Field path arguments must be of type string or ",n,!1,void 0,e)}const Sm=new RegExp("[~\\*/\\[\\]]");function ec(n,t,e){if(t.search(Sm)>=0)throw mr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new oi(...t.split("."))._internalPath}catch{throw mr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function mr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new N(C.INVALID_ARGUMENT,l+n+h)}function Cm(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new ot(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Pm(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(rc("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Pm extends nc{data(){return super.data()}}function rc(n,t){return typeof t=="string"?ec(n,t):t instanceof oi?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vm(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bm{convertValue(t,e="none"){switch(ee(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(te(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw x(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return ge(t,(s,o)=>{r[s]=this.convertValue(o,e)}),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[ir].arrayValue)==null?void 0:s.values)==null?void 0:o.map(a=>tt(a.doubleValue));return new kt(e)}convertGeoPoint(t){return new Nt(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=_r(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(_n(t));default:return null}}convertTimestamp(t){const e=Zt(t);return new Y(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=X.fromString(t);H(Tu(r),9688,{name:t});const s=new yn(r.get(1),r.get(3)),o=new M(r.popFirst(5));return s.isEqual(e)||Ut(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dm(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class an{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class fe extends nc{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Jn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(rc("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=fe._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}fe._jsonSchemaVersion="firestore/documentSnapshot/1.0",fe._jsonSchema={type:nt("string",fe._jsonSchemaVersion),bundleSource:nt("string","DocumentSnapshot"),bundleName:nt("string"),bundle:nt("string")};class Jn extends fe{data(t={}){return super.data(t)}}class Ve{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new an(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new Jn(this._firestore,this._userDataWriter,r.key,r,new an(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new N(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const h=new Jn(s._firestore,s._userDataWriter,l.doc.key,l.doc,new an(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>o||l.type!==3).map(l=>{const h=new Jn(s._firestore,s._userDataWriter,l.doc.key,l.doc,new an(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,g=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),g=a.indexOf(l.doc.key)),{type:Nm(l.type),doc:h,oldIndex:d,newIndex:g}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Ve._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Os.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach(o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Nm(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jm(n){n=me(n,ot);const t=me(n.firestore,Vr);return gm(ii(t),n._key).then(e=>Om(t,n,e))}Ve._jsonSchemaVersion="firestore/querySnapshot/1.0",Ve._jsonSchema={type:nt("string",Ve._jsonSchemaVersion),bundleSource:nt("string","QuerySnapshot"),bundleName:nt("string"),bundle:nt("string")};class sc extends bm{constructor(t){super(),this.firestore=t}convertBytes(t){return new Rt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new ot(this.firestore,null,e)}}function qm(n){n=me(n,Pr);const t=me(n.firestore,Vr),e=ii(t),r=new sc(t);return Vm(n._query),_m(e,n._query).then(s=>new Ve(t,r,n,s))}function $m(n,t,e){n=me(n,ot);const r=me(n.firestore,Vr),s=Dm(n.converter,t,e);return km(r,[wm(Am(r),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Lt.none())])}function km(n,t){return function(r,s){const o=new xt;return r.asyncQueue.enqueueAndForget(async()=>sm(await pm(r),s,o)),o.promise}(ii(n),t)}function Om(n,t,e){const r=e.docs.get(t._key),s=new sc(n);return new fe(n,s,t._key,r,new an(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){(function(s){Le=s})(uh),nr(new mn("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new Vr(new Ah(r.getProvider("auth-internal")),new Sh(a,r.getProvider("app-check-internal")),function(d,g){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new N(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new yn(d.options.projectId,g)}(a,s),a);return o={useFetchStreams:e,...o},l._setSettings(o),l},"PUBLIC").setMultipleInstances(!0)),Ce(vo,Ao,t),Ce(vo,Ao,"esm2020")})();var Mm="firebase",xm="12.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ce(Mm,xm,"app");export{qm as a,Bm as b,Fm as c,Um as d,jm as g,ch as i,$m as s};
//# sourceMappingURL=firebase-core-3RcgupBU.js.map
