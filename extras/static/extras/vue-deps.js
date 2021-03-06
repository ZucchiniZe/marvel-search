'use strict';

var exports = {}

var moveTo = function moveTo(list, fromIndex, toIndex) {
  var arr = [];
  toIndex = ~ ~toIndex;
  fromIndex = ~ ~fromIndex;
  if (toIndex >= fromIndex) {
    arr = arr.concat(list.slice(0, fromIndex)).concat(list.slice(fromIndex + 1, toIndex + 1)).concat(list.slice(fromIndex, fromIndex + 1)).concat(list.slice(toIndex + 1));
  } else {
    arr = arr.concat(list.slice(0, toIndex)).concat(list.slice(fromIndex, fromIndex + 1)).concat(list.slice(toIndex, fromIndex)).concat(list.slice(fromIndex + 1));
  }
  return arr;
};

var confirmTarget = function confirmTarget(target) {
  return target.nodeName === 'TD' ? target.parentElement : target;
};

var workWithClass = function workWithClass(element, newClass, defaultClassName, doWhat) {
  if (!element.classList) return;
  var className = defaultClassName;
  if (newClass) className = newClass;
  if (doWhat === 'add') {
    element.classList.add(className);
  } else if (doWhat === 'remove') {
    element.classList.remove(className);
  }
};

exports.install = function (Vue) {
  Vue.directive('dragable', {
    params: ['drag-class'],
    bind: function bind() {
      var self = this;
      var element = this.el;
      element.draggable = true;
      element.ondragstart = function (event) {
        workWithClass(element, self.params['dragClass'], 'yita-draging', 'add');
        event.dataTransfer.setData('text', self._scope['$index']);
      };
      element.ondragend = function (event) {
        workWithClass(element, self.params['dragClass'], 'yita-draging', 'remove');
      };
      element.ondrag = function (event) {};
    },
    update: function update(newValue, oldValue) {},
    unbind: function unbind() {}
  });
  Vue.directive('droper', {
    params: ['drag-class'],
    twoWay: true,
    bind: function bind() {
      var self = this;
      var expr = this.expression;
      var element = this.el;
      element.ondragenter = function (event) {
        var target = event.target;
        target = confirmTarget(target);
        // let index = Array.from(this.children).indexOf(target)
        workWithClass(target, self.params['dragClass'], 'yita-draging-zone', 'add');
      };
      element.ondragleave = function (event) {
        var target = event.target;
        target = confirmTarget(target);
        workWithClass(target, self.params['dragClass'], 'yita-draging-zone', 'remove');
      };
      element.ondragover = function (event) {
        event.preventDefault();
      };
      element.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var fromIndex = event.dataTransfer.getData('text');
        var target = event.target;
        target = confirmTarget(target);
        workWithClass(target, self.params['dragClass'], 'yita-draging-zone', 'remove');
        var toIndex = Array.from(this.children).indexOf(target);
        if (toIndex === -1) {
          console.warn('cannot found', target, 'in ', this);
        }
        var out = moveTo(self.vm[expr], fromIndex, toIndex);
        self.vm.$set(expr, out);
      };
    },
    update: function update(value, oldValue) {},
    unbind: function unbind() {}
  });
};

Vue.use(exports);

/**
 * vue-resource v0.7.2
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueResource=e():t.VueResource=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function r(t){if(!r.installed){var e=n(1);e.config=t.config,e.warning=t.util.warn,e.nextTick=t.util.nextTick,t.url=n(2),t.http=n(8),t.resource=n(23),t.Promise=n(10),Object.defineProperties(t.prototype,{$url:{get:function(){return e.options(t.url,this,this.$options.url)}},$http:{get:function(){return e.options(t.http,this,this.$options.http)}},$resource:{get:function(){return t.resource.bind(this)}},$promise:{get:function(){var e=this;return function(n){return new t.Promise(n,e)}}}})}}"undefined"!=typeof window&&window.Vue&&window.Vue.use(r),t.exports=r},function(t,e){function n(t,e,r){for(var i in e)r&&(o.isPlainObject(e[i])||o.isArray(e[i]))?(o.isPlainObject(e[i])&&!o.isPlainObject(t[i])&&(t[i]={}),o.isArray(e[i])&&!o.isArray(t[i])&&(t[i]=[]),n(t[i],e[i],r)):void 0!==e[i]&&(t[i]=e[i])}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},o=e,i=[],s=window.console;o.warn=function(t){s&&o.warning&&(!o.config.silent||o.config.debug)&&s.warn("[VueResource warn]: "+t)},o.error=function(t){s&&s.error(t)},o.trim=function(t){return t.replace(/^\s*|\s*$/g,"")},o.toLower=function(t){return t?t.toLowerCase():""},o.isArray=Array.isArray,o.isString=function(t){return"string"==typeof t},o.isFunction=function(t){return"function"==typeof t},o.isObject=function(t){return null!==t&&"object"===("undefined"==typeof t?"undefined":r(t))},o.isPlainObject=function(t){return o.isObject(t)&&Object.getPrototypeOf(t)==Object.prototype},o.options=function(t,e,n){return n=n||{},o.isFunction(n)&&(n=n.call(e)),o.merge(t.bind({$vm:e,$options:n}),t,{$options:n})},o.each=function(t,e){var n,r;if("number"==typeof t.length)for(n=0;n<t.length;n++)e.call(t[n],t[n],n);else if(o.isObject(t))for(r in t)t.hasOwnProperty(r)&&e.call(t[r],t[r],r);return t},o.defaults=function(t,e){for(var n in e)void 0===t[n]&&(t[n]=e[n]);return t},o.extend=function(t){var e=i.slice.call(arguments,1);return e.forEach(function(e){n(t,e)}),t},o.merge=function(t){var e=i.slice.call(arguments,1);return e.forEach(function(e){n(t,e,!0)}),t}},function(t,e,n){function r(t,e){var n,i=t;return s.isString(t)&&(i={url:t,params:e}),i=s.merge({},r.options,this.$options,i),r.transforms.forEach(function(t){n=o(t,n,this.$vm)},this),n(i)}function o(t,e,n){return function(r){return t.call(n,r,e)}}function i(t,e,n){var r,o=s.isArray(e),u=s.isPlainObject(e);s.each(e,function(e,a){r=s.isObject(e)||s.isArray(e),n&&(a=n+"["+(u||r?a:"")+"]"),!n&&o?t.add(e.name,e.value):r?i(t,e,a):t.add(a,e)})}var s=n(1),u=document.documentMode,a=document.createElement("a");r.options={url:"",root:null,params:{}},r.transforms=[n(3),n(5),n(6),n(7)],r.params=function(t){var e=[],n=encodeURIComponent;return e.add=function(t,e){s.isFunction(e)&&(e=e()),null===e&&(e=""),this.push(n(t)+"="+n(e))},i(e,t),e.join("&").replace(/%20/g,"+")},r.parse=function(t){return u&&(a.href=t,t=a.href),a.href=t,{href:a.href,protocol:a.protocol?a.protocol.replace(/:$/,""):"",port:a.port,host:a.host,hostname:a.hostname,pathname:"/"===a.pathname.charAt(0)?a.pathname:"/"+a.pathname,search:a.search?a.search.replace(/^\?/,""):"",hash:a.hash?a.hash.replace(/^#/,""):""}},t.exports=s.url=r},function(t,e,n){var r=n(4);t.exports=function(t){var e=[],n=r.expand(t.url,t.params,e);return e.forEach(function(e){delete t.params[e]}),n}},function(t,e){e.expand=function(t,e,n){var r=this.parse(t),o=r.expand(e);return n&&n.push.apply(n,r.vars),o},e.parse=function(t){var n=["+","#",".","/",";","?","&"],r=[];return{vars:r,expand:function(o){return t.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(t,i,s){if(i){var u=null,a=[];if(-1!==n.indexOf(i.charAt(0))&&(u=i.charAt(0),i=i.substr(1)),i.split(/,/g).forEach(function(t){var n=/([^:\*]*)(?::(\d+)|(\*))?/.exec(t);a.push.apply(a,e.getValues(o,u,n[1],n[2]||n[3])),r.push(n[1])}),u&&"+"!==u){var c=",";return"?"===u?c="&":"#"!==u&&(c=u),(0!==a.length?u:"")+a.join(c)}return a.join(",")}return e.encodeReserved(s)})}}},e.getValues=function(t,e,n,r){var o=t[n],i=[];if(this.isDefined(o)&&""!==o)if("string"==typeof o||"number"==typeof o||"boolean"==typeof o)o=o.toString(),r&&"*"!==r&&(o=o.substring(0,parseInt(r,10))),i.push(this.encodeValue(e,o,this.isKeyOperator(e)?n:null));else if("*"===r)Array.isArray(o)?o.filter(this.isDefined).forEach(function(t){i.push(this.encodeValue(e,t,this.isKeyOperator(e)?n:null))},this):Object.keys(o).forEach(function(t){this.isDefined(o[t])&&i.push(this.encodeValue(e,o[t],t))},this);else{var s=[];Array.isArray(o)?o.filter(this.isDefined).forEach(function(t){s.push(this.encodeValue(e,t))},this):Object.keys(o).forEach(function(t){this.isDefined(o[t])&&(s.push(encodeURIComponent(t)),s.push(this.encodeValue(e,o[t].toString())))},this),this.isKeyOperator(e)?i.push(encodeURIComponent(n)+"="+s.join(",")):0!==s.length&&i.push(s.join(","))}else";"===e?i.push(encodeURIComponent(n)):""!==o||"&"!==e&&"?"!==e?""===o&&i.push(""):i.push(encodeURIComponent(n)+"=");return i},e.isDefined=function(t){return void 0!==t&&null!==t},e.isKeyOperator=function(t){return";"===t||"&"===t||"?"===t},e.encodeValue=function(t,e,n){return e="+"===t||"#"===t?this.encodeReserved(e):encodeURIComponent(e),n?encodeURIComponent(n)+"="+e:e},e.encodeReserved=function(t){return t.split(/(%[0-9A-Fa-f]{2})/g).map(function(t){return/%[0-9A-Fa-f]/.test(t)||(t=encodeURI(t)),t}).join("")}},function(t,e,n){function r(t){return o(t,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function o(t,e){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,e?"%20":"+")}var i=n(1);t.exports=function(t,e){var n=[],o=e(t);return o=o.replace(/(\/?):([a-z]\w*)/gi,function(e,o,s){return i.warn("The `:"+s+"` parameter syntax has been deprecated. Use the `{"+s+"}` syntax instead."),t.params[s]?(n.push(s),o+r(t.params[s])):""}),n.forEach(function(e){delete t.params[e]}),o}},function(t,e,n){var r=n(1);t.exports=function(t,e){var n=Object.keys(r.url.options.params),o={},i=e(t);return r.each(t.params,function(t,e){-1===n.indexOf(e)&&(o[e]=t)}),o=r.url.params(o),o&&(i+=(-1==i.indexOf("?")?"?":"&")+o),i}},function(t,e,n){var r=n(1);t.exports=function(t,e){var n=e(t);return r.isString(t.root)&&!n.match(/^(https?:)?\//)&&(n=t.root+"/"+n),n}},function(t,e,n){function r(t,e){var n,a,c=this,f=i;return r.interceptors.forEach(function(t){f=u(t,c.$vm)(f)}),e=o.isObject(t)?t:o.extend({url:t},e),n=o.merge({},r.options,this.$options,e),a=f(n).bind(this.$vm).then(function(t){return t.ok?t:s.reject(t)},function(t){return t instanceof Error&&o.error(t),s.reject(t)}),n.success&&a.success(n.success),n.error&&a.error(n.error),a}var o=n(1),i=n(9),s=n(10),u=n(13),a={"Content-Type":"application/json"};r.options={method:"get",data:"",params:{},headers:{},xhr:null,upload:null,jsonp:"callback",beforeSend:null,crossOrigin:null,emulateHTTP:!1,emulateJSON:!1,timeout:0},r.interceptors=[n(14),n(15),n(16),n(18),n(19),n(20),n(21)],r.headers={put:a,post:a,patch:a,"delete":a,common:{Accept:"application/json, text/plain, */*"},custom:{"X-Requested-With":"XMLHttpRequest"}},["get","put","post","patch","delete","jsonp"].forEach(function(t){r[t]=function(e,n,r,i){return o.isFunction(n)&&(i=r,r=n,n=void 0),o.isObject(r)&&(i=r,r=void 0),this(e,o.extend({method:t,data:n,success:r},i))}}),t.exports=o.http=r},function(t,e,n){function r(t){var e,n,r,i={};return o.isString(t)&&o.each(t.split("\n"),function(t){r=t.indexOf(":"),n=o.trim(o.toLower(t.slice(0,r))),e=o.trim(t.slice(r+1)),i[n]?o.isArray(i[n])?i[n].push(e):i[n]=[i[n],e]:i[n]=e}),i}var o=n(1),i=n(10),s=n(12);t.exports=function(t){var e=(t.client||s)(t);return i.resolve(e).then(function(t){if(t.headers){var e=r(t.headers);t.headers=function(t){return t?e[o.toLower(t)]:e}}return t.ok=t.status>=200&&t.status<300,t})}},function(t,e,n){function r(t,e){t instanceof i?this.promise=t:this.promise=new i(t.bind(e)),this.context=e}var o=n(1),i=window.Promise||n(11);r.all=function(t,e){return new r(i.all(t),e)},r.resolve=function(t,e){return new r(i.resolve(t),e)},r.reject=function(t,e){return new r(i.reject(t),e)},r.race=function(t,e){return new r(i.race(t),e)};var s=r.prototype;s.bind=function(t){return this.context=t,this},s.then=function(t,e){return t&&t.bind&&this.context&&(t=t.bind(this.context)),e&&e.bind&&this.context&&(e=e.bind(this.context)),this.promise=this.promise.then(t,e),this},s["catch"]=function(t){return t&&t.bind&&this.context&&(t=t.bind(this.context)),this.promise=this.promise["catch"](t),this},s["finally"]=function(t){return this.then(function(e){return t.call(this),e},function(e){return t.call(this),i.reject(e)})},s.success=function(t){return o.warn("The `success` method has been deprecated. Use the `then` method instead."),this.then(function(e){return t.call(this,e.data,e.status,e)||e})},s.error=function(t){return o.warn("The `error` method has been deprecated. Use the `catch` method instead."),this["catch"](function(e){return t.call(this,e.data,e.status,e)||e})},s.always=function(t){o.warn("The `always` method has been deprecated. Use the `finally` method instead.");var e=function(e){return t.call(this,e.data,e.status,e)||e};return this.then(e,e)},t.exports=r},function(t,e,n){function r(t){this.state=a,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(n){e.reject(n)}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},i=n(1),s=0,u=1,a=2;r.reject=function(t){return new r(function(e,n){n(t)})},r.resolve=function(t){return new r(function(e,n){e(t)})},r.all=function(t){return new r(function(e,n){function o(n){return function(r){s[n]=r,i+=1,i===t.length&&e(s)}}var i=0,s=[];0===t.length&&e(s);for(var u=0;u<t.length;u+=1)r.resolve(t[u]).then(o(u),n)})},r.race=function(t){return new r(function(e,n){for(var o=0;o<t.length;o+=1)r.resolve(t[o]).then(e,n)})};var c=r.prototype;c.resolve=function(t){var e=this;if(e.state===a){if(t===e)throw new TypeError("Promise settled with itself.");var n=!1;try{var r=t&&t.then;if(null!==t&&"object"===("undefined"==typeof t?"undefined":o(t))&&"function"==typeof r)return void r.call(t,function(t){n||e.resolve(t),n=!0},function(t){n||e.reject(t),n=!0})}catch(i){return void(n||e.reject(i))}e.state=s,e.value=t,e.notify()}},c.reject=function(t){var e=this;if(e.state===a){if(t===e)throw new TypeError("Promise settled with itself.");e.state=u,e.value=t,e.notify()}},c.notify=function(){var t=this;i.nextTick(function(){if(t.state!==a)for(;t.deferred.length;){var e=t.deferred.shift(),n=e[0],r=e[1],o=e[2],i=e[3];try{t.state===s?o("function"==typeof n?n.call(void 0,t.value):t.value):t.state===u&&("function"==typeof r?o(r.call(void 0,t.value)):i(t.value))}catch(c){i(c)}}})},c.then=function(t,e){var n=this;return new r(function(r,o){n.deferred.push([t,e,r,o]),n.notify()})},c["catch"]=function(t){return this.then(void 0,t)},t.exports=r},function(t,e,n){var r=n(1),o=n(10);t.exports=function(t){return new o(function(e){var n,o=new XMLHttpRequest,i={request:t};t.cancel=function(){o.abort()},o.open(t.method,r.url(t),!0),n=function(t){i.data=o.responseText,i.status=o.status,i.statusText=o.statusText,i.headers=o.getAllResponseHeaders(),e(i)},o.timeout=0,o.onload=n,o.onabort=n,o.onerror=n,o.ontimeout=function(){},o.onprogress=function(){},r.isPlainObject(t.xhr)&&r.extend(o,t.xhr),r.isPlainObject(t.upload)&&r.extend(o.upload,t.upload),r.each(t.headers||{},function(t,e){o.setRequestHeader(e,t)}),o.send(t.data)})}},function(t,e,n){function r(t,e,n){var r=i.resolve(t);return arguments.length<2?r:r.then(e,n)}var o=n(1),i=n(10);t.exports=function(t,e){return function(n){return o.isFunction(t)&&(t=t.call(e,i)),function(i){return o.isFunction(t.request)&&(i=t.request.call(e,i)),r(i,function(i){return r(n(i),function(n){return o.isFunction(t.response)&&(n=t.response.call(e,n)),n})})}}}},function(t,e,n){var r=n(1);t.exports={request:function(t){return r.isFunction(t.beforeSend)&&t.beforeSend.call(this,t),t}}},function(t,e){t.exports=function(){var t;return{request:function(e){return e.timeout&&(t=setTimeout(function(){e.cancel()},e.timeout)),e},response:function(e){return clearTimeout(t),e}}}},function(t,e,n){var r=n(17);t.exports={request:function(t){return"JSONP"==t.method&&(t.client=r),t}}},function(t,e,n){var r=n(1),o=n(10);t.exports=function(t){return new o(function(e){var n,o,i="_jsonp"+Math.random().toString(36).substr(2),s={request:t,data:null};t.params[t.jsonp]=i,t.cancel=function(){n({type:"cancel"})},o=document.createElement("script"),o.src=r.url(t),o.type="text/javascript",o.async=!0,window[i]=function(t){s.data=t},n=function(t){"load"===t.type&&null!==s.data?s.status=200:"error"===t.type?s.status=404:s.status=0,e(s),delete window[i],document.body.removeChild(o)},o.onload=n,o.onerror=n,document.body.appendChild(o)})}},function(t,e){t.exports={request:function(t){return t.emulateHTTP&&/^(PUT|PATCH|DELETE)$/i.test(t.method)&&(t.headers["X-HTTP-Method-Override"]=t.method,t.method="POST"),t}}},function(t,e,n){var r=n(1);t.exports={request:function(t){return t.emulateJSON&&r.isPlainObject(t.data)&&(t.headers["Content-Type"]="application/x-www-form-urlencoded",t.data=r.url.params(t.data)),r.isObject(t.data)&&/FormData/i.test(t.data.toString())&&delete t.headers["Content-Type"],r.isPlainObject(t.data)&&(t.data=JSON.stringify(t.data)),t},response:function(t){try{t.data=JSON.parse(t.data)}catch(e){}return t}}},function(t,e,n){var r=n(1);t.exports={request:function(t){return t.method=t.method.toUpperCase(),t.headers=r.extend({},r.http.headers.common,t.crossOrigin?{}:r.http.headers.custom,r.http.headers[t.method.toLowerCase()],t.headers),r.isPlainObject(t.data)&&/^(GET|JSONP)$/i.test(t.method)&&(r.extend(t.params,t.data),delete t.data),t}}},function(t,e,n){function r(t){var e=o.url.parse(o.url(t));return e.protocol!==u.protocol||e.host!==u.host}var o=n(1),i=n(22),s="withCredentials"in new XMLHttpRequest,u=o.url.parse(location.href);t.exports={request:function(t){return null===t.crossOrigin&&(t.crossOrigin=r(t)),t.crossOrigin&&(s||(t.client=i),t.emulateHTTP=!1),t}}},function(t,e,n){var r=n(1),o=n(10);t.exports=function(t){return new o(function(e){var n,o=new XDomainRequest,i={request:t};t.cancel=function(){o.abort()},o.open(t.method,r.url(t),!0),n=function(t){i.data=o.responseText,i.status=o.status,i.statusText=o.statusText,e(i)},o.timeout=0,o.onload=n,o.onabort=n,o.onerror=n,o.ontimeout=function(){},o.onprogress=function(){},o.send(t.data)})}},function(t,e,n){function r(t,e,n,s){var u=this,a={};return n=i.extend({},r.actions,n),i.each(n,function(n,r){n=i.merge({url:t,params:e||{}},s,n),a[r]=function(){return(u.$http||i.http)(o(n,arguments))}}),a}function o(t,e){var n,r,o,s=i.extend({},t),u={};switch(e.length){case 4:o=e[3],r=e[2];case 3:case 2:if(!i.isFunction(e[1])){u=e[0],n=e[1],r=e[2];break}if(i.isFunction(e[0])){r=e[0],o=e[1];break}r=e[1],o=e[2];case 1:i.isFunction(e[0])?r=e[0]:/^(POST|PUT|PATCH)$/i.test(s.method)?n=e[0]:u=e[0];break;case 0:break;default:throw"Expected up to 4 arguments [params, data, success, error], got "+e.length+" arguments"}return s.data=n,s.params=i.extend({},s.params,u),r&&(s.success=r),o&&(s.error=o),s}var i=n(1);r.actions={get:{method:"GET"},save:{method:"POST"},query:{method:"GET"},update:{method:"PUT"},remove:{method:"DELETE"},"delete":{method:"DELETE"}},t.exports=i.resource=r}])});
