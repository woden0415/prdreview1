(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{0:function(e,t,a){e.exports=a("JimZ")},1:function(e,t){},"Iw/T":function(e,t,a){},JimZ:function(e,t,a){"use strict";a.r(t);var n=a("Hg0r"),r=a("Whig"),i=(a("rE2o"),a("ioFf"),a("91GP"),a("tPa5")),o=function(){return(o=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var r in t=arguments[a])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},l=function(a,n){var r,o,c,i={label:0,sent:function(){if(1&c[0])throw c[1];return c[1]},trys:[],ops:[]},e={next:t(0),throw:t(1),return:t(2)};return"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,o&&(c=2&t[0]?o.return:t[0]?o.throw||((c=o.return)&&c.call(o),0):o.next)&&!(c=c.call(o,t[1])).done)return c;switch(o=0,c&&(t=[2&t[0],c.value]),t[0]){case 0:case 1:c=t;break;case 4:return i.label++,{value:t[1],done:!1};case 5:i.label++,o=t[1],t=[0];continue;case 7:t=i.ops.pop(),i.trys.pop();continue;default:if(!(c=0<(c=i.trys).length&&c[c.length-1])&&(6===t[0]||2===t[0])){i=0;continue}if(3===t[0]&&(!c||t[1]>c[0]&&t[1]<c[3])){i.label=t[1];break}if(6===t[0]&&i.label<c[1]){i.label=c[1],c=t;break}if(c&&i.label<c[2]){i.label=c[2],i.ops.push(t);break}c[2]&&i.ops.pop(),i.trys.pop();continue}t=n.call(a,i)}catch(e){t=[6,e],o=0}finally{r=c=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}},c=[{namespace:"demo",state:{demoList:[]},reducers:{save:function(e,t){var a=t.payload;return o(o({},e),a)}},effects:{getDemo:function(e,t){var a,n,r=e.payload,o=t.put,c=t.call;return l(this,function(e){switch(e.label){case 0:return a=r.params,[4,c(i.a,a)];case 1:return n=e.sent(),[4,o({type:"save",payload:{demoList:n.data.data}})];case 2:return e.sent(),[2]}})}}}],u=Object(n.a)();u.use(Object(r.a)({effect:!0})),c.forEach(function(e){u.model(e)}),u.router(a("fYDu").default),u.start("#app")},U2Ro:function(e,t,a){},fYDu:function(e,t,a){"use strict";a.r(t);function n(e){return p.createElement("div",{className:"layout",style:{minHeight:"100vh"}},p.createElement("div",{style:{padding:"0 50px"}},e.children))}function r(){var e=Object(p.useState)(""),t=e[0],n=e[1],a=Object(p.useState)([]),r=a[0],o=a[1],c=Object(p.useState)(!1),i=c[0],l=c[1],u={onRemove:function(){o([])},beforeUpload:function(){return!1},fileList:r,onChange:function(e){y.debounce(o(e.fileList),100)},directory:!0,webkitdirectory:!0},s=function(){o([])};return f.a.createElement("div",{className:"body-wrapper index-wrapper"},f.a.createElement("div",{className:"c-fileupload"},f.a.createElement("div",{className:"c-fileupload-header"},f.a.createElement("h2",{className:"header-h2"},"线上预览prd文件")),f.a.createElement("div",{className:"c-fileupload-wrapper"},f.a.createElement(E,w({},u),f.a.createElement("p",{className:"ant-upload-drag-icon"},f.a.createElement(b.a,null)),f.a.createElement("p",{className:"ant-upload-text"},"点击此处或者拖拽文件夹上传")),f.a.createElement(h.a,{gutter:[16,24]},f.a.createElement(m.a,{span:6},f.a.createElement(d.a,{className:"btn-upload",type:"dashed",onClick:s,style:{marginTop:16}},"清除当前已选文件")),f.a.createElement(m.a,{span:18},f.a.createElement(d.a,{className:"btn-upload",type:"primary",onClick:function(){var a;i||(a=new FormData,r.forEach(function(e){var t=e.originFileObj;a.append("fileLists",t,window.encodeURIComponent(t.webkitRelativePath))}),l(!0),Object(v.b)(a,function(e){var t=e.success,a=e.data;t&&n(a.prdUrl),l(!1),s()},function(e){console.error(e),l(!1),s()}))},disabled:0===r.length,style:{marginTop:16},loading:i},i?"上传中":"开始上传"))),t?f.a.createElement("a",{className:"ant-upload-hint",href:t,target:"_blank"}," ",t," "):f.a.createElement("p",{className:"ant-upload-hint"}," 此处显示线上地址 "))))}var p=a("q1tI"),f=a.n(p),o=(a("nWC1"),a("bAY4"),a("4IMT")),d=a.n(o),c=(a("YKpo"),a("ZPTe")),m=a.n(c),i=(a("SoD3"),a("9xET")),h=a.n(i),l=(a("e3Np"),a("B8+X")),u=a.n(l),v=(a("91GP"),a("tPa5")),s=a("+MSh"),b=a.n(s),y=(a("Iw/T"),a("KKXr"),{getUrlParams:function(){var e=window.location.href;e=(e=(e=(e=(e=e.split("#")||[])[1]||"").split("?")||[])[1]||"").split("&")||"";for(var t,a={},n=0;n<e.length;n++){e[n]&&(a[(t=e[n].split("="))[0]]=decodeURI(t[1]))}return a},debounce:function(a,n){var r;return function(){var e=this,t=arguments;r&&clearTimeout(r),r=setTimeout(function(){a.apply(e,t)},n)}}}),w=function(){return(w=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var r in t=arguments[a])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},E=u.a.Dragger,g=(a("U2Ro"),a("7DNP"));t.default=function(e){var t=e.history;return f.a.createElement(g.routerRedux.ConnectedRouter,{history:t},f.a.createElement(n,null,f.a.createElement(g.Switch,null,f.a.createElement(g.Route,{exact:!0,path:"/",component:r}),f.a.createElement(g.Route,{exact:!0,path:"/index",component:r}))))}},nWC1:function(e,t,a){},tPa5:function(e,l,u){"use strict";(function(e){u.d(l,"a",function(){return o}),u.d(l,"b",function(){return i});u("VRzm"),u("Btvt"),u("q5v/");var t=u("QpBz"),c=u.n(t),a=u("vDqi"),n=u.n(a);n.a.defaults.withCredentials=!0,n.a.interceptors.response.use(function(e){var t=e.data,a=void 0===t?{success:!1}:t,n=a.success,r=a.code,o=a.message;return n&&o?c.a.destroy():n||(403===r?location.href=a.data.login:(c.a.destroy(),c.a.error(o||"网络异常"))),a},function(e){c.a.error("网络错误"),Promise.resolve(e)});var r="production"===e.env.BABEL_ENV?"":"http://10.192.232.166:9079",o=function(e){return n.a.get(r+"/api/get",{params:e})},i=function(e,t,a){n.a.post(r+"/api/upload",e,{headers:{"Content-Type":"multipart/form-data"}}).then(function(e){t(e)}).catch(function(e){a(e)})}}).call(this,u("8oxB"))}},[[0,1,2]]]);