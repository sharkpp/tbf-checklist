(window["webpackJsonptbf-checklist"]=window["webpackJsonptbf-checklist"]||[]).push([[0],{137:function(e,t,r){"use strict";r.r(t);var a=r(0),c=r.n(a),n=r(13),o=r.n(n);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r(91),r(92);var i=r(26),l=r(27),s=r(45),u="https://api-gw98.herokuapp.com/https://techbookfest.org/api",d=/^(.+?)([0-9]+)(.*)$/,h="circle-cache";function f(e){var t=[].concat(d.exec(e)||["",0,""]).slice(1),r=t[0].codePointAt(0);return 1e3*(12353<=r&&r<=12435?r-12353+10:["\u904b","\u5354"].indexOf(t[0]))+ +t[1]}var m=function(){function e(){Object(i.a)(this,e),this._event=new s,this._store=Object.assign({loadCompleted:!1,orderBy:{booth:[]},lookupBy:{booth:{}},circles:{}},JSON.parse(sessionStorage.getItem(h))||{}),this._waitRequest={},this._waitRequestList=!1}return Object(l.a)(e,[{key:"_updateCache",value:function(){var e=JSON.stringify(this._store);console.debug("circle data len",e.length),sessionStorage.setItem(h,e)}},{key:"request",value:function(e){var t=this;(e=e||{}).circleId=e.circleId||null;var r=[],a=!1;if(e.circleId){if(this._waitRequest[e.circleId])return void console.debug("request wait for ".concat(e.circleId));r.push("".concat(u,"/circle/").concat(e.circleId)),this._waitRequest[e.circleId]=!0,a=e.circleId}else this._waitRequestList=a=!0,this._store.loadCompleted=!1,this._updateCache(),r.push("".concat(u,"/circle?eventID=").concat("tbf07","&eventExhibitCourseID=3&visibility=site&limit=100&onlyAdoption=true"));!function e(){var c=r.shift();c?fetch(c,{method:"GET"}).then((function(e){return e.json()})).then((function(a){if(a.cursor&&r.unshift("".concat(c.replace(/&cursor=.+$/,""),"&cursor=").concat(a.cursor)),a.list)for(var n,o=0;void 0!==(n=a.list[o]);++o){delete n.event,delete n.eventExhibitCourse,t._store.circles[n.id]=n;for(var i,l=0;void 0!==(i=n.spaces[l]);++l)t._store.lookupBy.booth[i]=n.id,t._store.orderBy.booth.indexOf(i)<0&&t._store.orderBy.booth.push(i)}else{var s=a;delete s.event,delete s.eventExhibitCourse,t._store.circles[s.id]=s;for(var u,d=0;void 0!==(u=s.spaces[d]);++d)t._store.lookupBy.booth[u]=s.id,t._store.orderBy.booth.indexOf(u)<0&&t._store.orderBy.booth.push(u)}return t._store.orderBy.booth=t._store.orderBy.booth.sort((function(e,t){return f(e)-f(t)})),t._updateCache(),t._event.emit("change"),e()})).catch((function(e){return console.error(e)})):(!0===a?(t._waitRequestList=!1,t._store.loadCompleted=!0):delete t._waitRequest[a],t._updateCache(),t._event.emit("change"),t._event.emit("loaded"))}()}},{key:"on",value:function(e,t){this._event.on(e,t),0<=["change","loaded"].indexOf(e)&&!1===this._waitRequestList&&t(e)}},{key:"off",value:function(e,t){this._event.removeListener(e,t)}},{key:"getCircleListOrderByBooth",value:function(){var e=this;return(this._store.orderBy.booth||[]).map((function(t){return(e.getCircleByBooth(t)||{}).id}))}},{key:"getCircleByBooth",value:function(e){return this._store.circles[this._store.lookupBy.booth[e]]}},{key:"getCircleBoothOrder",value:function(e){return!1!==this._waitRequestList?-2:this._store.orderBy.booth.indexOf(((this._store.circles[e]||{}).spaces||[])[0])}},{key:"getCircle",value:function(e){return this._store.circles[e]}},{key:"getFirstBooth",value:function(){return!1===this._waitRequestList&&this.getCircleByBooth(this._store.orderBy.booth[0])}},{key:"getLastBooth",value:function(){return!1===this._waitRequestList&&this.getCircleByBooth(this._store.orderBy.booth[this._store.orderBy.booth.length-1])}},{key:"hasPrevCircle",value:function(e){var t=this._store.circles[e];return!(!t||!t.prevCircleExhibitInfoID)}},{key:"hasNextCircle",value:function(e){var t=this._store.circles[e];return!(!t||!t.nextCircleExhibitInfoID)}},{key:"getPrevCircle",value:function(e){var t=this._store.circles[e];return t&&t.prevCircleExhibitInfoID&&this._store.circles[t.prevCircleExhibitInfoID]}},{key:"getNextCircle",value:function(e){var t=this._store.circles[e];return t&&t.nextCircleExhibitInfoID&&this._store.circles[t.nextCircleExhibitInfoID]}},{key:"getPrevCircleId",value:function(e){var t=this._store.circles[e];return t&&t.prevCircleExhibitInfoID}},{key:"getNextCircleId",value:function(e){var t=this._store.circles[e];return t&&t.nextCircleExhibitInfoID}},{key:"mergeFavorite",value:function(e){var t=this,r={};e.forEach((function(e){if(e.circleId){var a=t._store.circles[e.circleId];if(!a)return void(r[e.circleId]=!0);e.space=a.spaces[0],e.circleName=a.name}})),Object.keys(r).forEach((function(e){t.request({circleId:e})}))}}]),e}(),v=r(45),p=function(){function e(){Object(i.a)(this,e),this._event=new v,this._store={orderBy:{seq:{}},products:{}},this._reqWait={}}return Object(l.a)(e,[{key:"request",value:function(e){var t=this;(e=e||{}).circleId=e.circleId||null;var r=[],a=e.circleId;if(e.circleId&&!this._reqWait[e.circleId]){this._reqWait[e.circleId]=!0,r.push("".concat("https://api-gw98.herokuapp.com/https://techbookfest.org/api","/product?circleExhibitInfoID=").concat(e.circleId,"&limit=100"));!function e(){var c=r.shift();c?fetch(c,{method:"GET"}).then((function(e){return e.json()})).then((function(a){if(a.cursor&&r.unshift("".concat(c.replace(/&cursor=.+$/,""),"&cursor=").concat(a.cursor)),a.list)for(var n,o=0;void 0!==(n=a.list[o]);++o){var i=n.circleExhibitInfoID;t._store.products[i]=t._store.products[i]||{},t._store.products[i][n.id]=n,t._store.orderBy.seq[i]=t._store.orderBy.seq[i]||[],t._store.orderBy.seq[i][n.seq-1]=n.id}return t._event.emit("change"),e()})).catch((function(e){return console.error(e)})):(delete t._reqWait[a],t._event.emit("change"),t._event.emit("loaded"))}()}}},{key:"on",value:function(e,t){this._event.on(e,t)}},{key:"off",value:function(e,t){this._event.removeListener(e,t)}},{key:"getProductOrder",value:function(e,t){var r=this._store.orderBy.seq[e]||[];return r?r.indexOf(t):-1}},{key:"getProductList",value:function(e){var t=this._store.products[e];return t&&Object.keys(t)}},{key:"getProductByIndex",value:function(e,t){return(this._store.products[e]||{})[(this._store.orderBy.seq[e]||[])[t]]||!1}},{key:"getProduct",value:function(e,t){return(this._store.products[e]||{})[t]||!1}},{key:"getProductCount",value:function(e){var t=this._store.orderBy.seq[e];return t?t.length:-1}},{key:"hasNextProduct",value:function(e,t){var r=this._store.orderBy.seq[e],a=r&&r.indexOf(t);return!(!r||!r[a+1])}},{key:"getPrevSiblings",value:function(e,t){var r=this._store.products[e],a=this._store.orderBy.seq[e],c=a&&a.indexOf(t);return a&&r[a[c-1]]||!1}},{key:"getNextSiblings",value:function(e,t){var r=this._store.products[e],a=this._store.orderBy.seq[e],c=a&&a.indexOf(t);return a&&r[a[c+1]]||!1}},{key:"mergeFavorite",value:function(e){var t=this,r={};e.forEach((function(e){if(e.circleId&&e.productId){var a=(t._store.products[e.circleId]||{})[e.productId];if(!a)return void(r[e.circleId]=!0);e.productName=a.name,e.productPrice=a.price}})),Object.keys(r).forEach((function(e){t.request({circleId:e})}))}}]),e}(),b=r(56),E=r(45),g=r(93),y="favorite",I=function(){function e(){Object(i.a)(this,e),this._event=new E,this._store=JSON.parse(localStorage.getItem(y)||"{}")}return Object(l.a)(e,[{key:"on",value:function(e,t){this._event.on(e,t)}},{key:"off",value:function(e,t){this._event.removeListener(e,t)}},{key:"isFavorite",value:function(e,t){return!!(t?this._store.tbf07&&this._store.tbf07[e]&&this._store.tbf07[e][t]:this._store.tbf07&&this._store.tbf07[e]&&this._store.tbf07[e].circle)}},{key:"setFavorite",value:function(e,t){if(e){this._store.tbf07=this._store.tbf07||{},this._store.tbf07[e]=this._store.tbf07[e]||Object(b.a)({},"circle",null);var r=t||"circle",a=!0!==this._store.tbf07[e][r];this._store.tbf07[e][r]=!0,a&&(localStorage.setItem(y,JSON.stringify(this._store)),this._event.emit("change",{circleId:e,productId:t,favorite:!0}))}}},{key:"unsetFavorite",value:function(e,t){if(e){this._store.tbf07=this._store.tbf07||{},this._store.tbf07[e]=this._store.tbf07[e]||Object(b.a)({},"circle",null);var r=t||"circle",a=!0===this._store.tbf07[e][r];delete this._store.tbf07[e][r],a&&(localStorage.setItem(y,JSON.stringify(this._store)),this._event.emit("change",{circleId:e,productId:t,favorite:!1}))}}},{key:"export",value:function(){g(JSON.stringify(this._store),"favorite.json")}},{key:"import",value:function(e){try{var t=JSON.parse(e);return this._store=t,localStorage.setItem(y,JSON.stringify(this._store)),this._event.emit("change"),!0}catch(r){return console.debug(r),!1}}},{key:"list",value:function(e){var t=[],r={},a=this._store[e]||{};for(var c in a){var n=a[c]||{};for(var o in n)n[o]&&("circle"===o?t.push({eventId:"tbf07",circleId:c}):(t.push({eventId:"tbf07",circleId:c,productId:o}),r[c]=!0))}return t=t.reduce((function(e,t){return!t.productId&&r[t.circleId]||e.push(t),e}),[])}}]),e}(),_=r(37),k=r(28),C=(r(94),r(75)),O=r(73);var x=function(){return c.a.createElement("div",null,c.a.createElement(k.c,{to:"/7/circle/"}),c.a.createElement(O.LinkContainer,{to:"/7/circle/"},c.a.createElement(C.a,null,"\u6280\u8853\u66f8\u5178\uff17")))},w=r(14),j=r(140),B=r(144),N=r(23),S=r(24),q=r(20),L=r.n(q),P=r(40),F=r.n(P),R=r(9),D=r.n(R),G=r(76);var z=function(e){var t=e.models,r=e.circleId,n=e.productId,o=e.isCurrent,i=t.favorite,l=Object(a.useState)(i.isFavorite(r,n)),s=Object(w.a)(l,2),u=s[0],d=s[1],h=Object(a.useCallback)((function(){return i.setFavorite(r,n)}),[i,r,n]),f=Object(a.useCallback)((function(){return i.unsetFavorite(r,n)}),[i,r,n]);return Object(a.useEffect)((function(){var e=function(e){e?r===e.circleId&&n===e.productId&&d(e.favorite):d(i.isFavorite(r,n))};return o&&i.on("change",e),o?function(){i.off("change",e)}:function(){}}),[o,i,r,n]),c.a.createElement("div",{style:{position:"absolute",top:0,right:0,padding:".75rem"},onClick:u?f:h},c.a.createElement(N.a,{icon:u?S.f:G.a,color:"#ffcc00",size:"lg",onClick:u?f:h}))};var J=function(e){var t=e.models,r=e.circleInfo,a=e.isCurrent,n=r&&r.circleCutImage||{url:"",width:0,height:1};return c.a.createElement("div",{className:"circle-card"},c.a.createElement(L.a,null,c.a.createElement(L.a.Header,null,c.a.createElement(F.a,{variant:"secondary"},(r.spaces||[])[0]),r.name||" ",c.a.createElement(z,{key:"fav-".concat(r&&r.id),models:t,isCurrent:a,circleId:r&&r.id})),c.a.createElement("div",{style:{width:"100%",textAlign:"center",marginTop:"8px"}},n.url&&c.a.createElement(L.a.Img,{variant:"top",src:n.url,style:{width:200*n.width/n.height,height:200}}),!n.url&&c.a.createElement("div",{style:{display:"inline-block",width:141,height:200,border:"5px solid black",overflow:"hidden"}},c.a.createElement("div",{style:{top:"50%",position:"relative",marginTop:"-0.5em"}},"NO IMAGE"))),c.a.createElement(L.a.Body,null,c.a.createElement("div",{className:"card-text"},c.a.createElement(D.a,null,c.a.createElement(D.a.Group,{controlId:"name"},c.a.createElement(D.a.Label,null,"\u30b5\u30fc\u30af\u30eb\u540d"),c.a.createElement("div",{className:"form-control-plaintext"},r.nameRuby?"".concat(r.name,"(").concat(r.nameRuby,")"):r.name)),c.a.createElement(D.a.Group,{controlId:"spaces"},c.a.createElement(D.a.Label,null,"\u914d\u7f6e"),c.a.createElement("div",{className:"form-control-plaintext"},r.spaces&&r.spaces[0]||"")),c.a.createElement(D.a.Group,{controlId:"penName"},c.a.createElement(D.a.Label,null,"\u30da\u30f3\u30cd\u30fc\u30e0"),c.a.createElement("div",{className:"form-control-plaintext"},r.penName)),r.webSiteURL&&c.a.createElement(D.a.Group,{controlId:"webSiteURL"},c.a.createElement(D.a.Label,null,"Web\u30b5\u30a4\u30c8"),c.a.createElement("div",{className:"form-control-plaintext"},r.webSiteURL)),c.a.createElement(D.a.Group,{controlId:"genre"},c.a.createElement(D.a.Label,null,"\u30b8\u30e3\u30f3\u30eb"),c.a.createElement("div",{className:"form-control-plaintext"},r.genre)),c.a.createElement(D.a.Group,{controlId:"genreFreeFormat"},c.a.createElement(D.a.Label,null,"\u30b8\u30e3\u30f3\u30eb\u8a73\u7d30"),c.a.createElement("pre",{className:"form-control-plaintext",style:{whiteSpace:"pre-wrap"}},r.genreFreeFormat)))))))},A={fanzine:"\u540c\u4eba\u8a8c",commerce:"\u5546\u696d\u8a8c"},T=200;var U=function(e){var t=e.models,r=e.circleInfo,a=e.productInfo,n=e.isCurrent,o=a&&a.images&&a.images[0]||{url:"",width:0,height:1};return c.a.createElement("div",{className:"product-card"},c.a.createElement(L.a,null,c.a.createElement(L.a.Header,null,c.a.createElement(F.a,{variant:"secondary"},(r.spaces||[])[0]),r.name||" ",c.a.createElement(z,{key:"fav-".concat(r&&r.id,"-").concat(a&&a.id),models:t,isCurrent:n,circleId:r&&r.id,productId:a&&a.id})),!1,c.a.createElement("div",{style:{width:"100%",height:T,marginTop:"8px",display:"flex",justifyContent:"center",alignItems:"center"}},o.url&&c.a.createElement(L.a.Img,{variant:"top",src:o.url,style:Object.assign({},o.width<o.height?{width:o.width*T/o.height,height:T}:{width:T,height:o.height*T/o.width})})),c.a.createElement(L.a.Body,null,c.a.createElement("div",{className:"card-text"},c.a.createElement(D.a,null,c.a.createElement(D.a.Group,{controlId:"name"},c.a.createElement(D.a.Label,null,"\u9812\u5e03\u7269"),c.a.createElement("div",{className:"form-control-plaintext"},a.name)),c.a.createElement(D.a.Group,{controlId:"page"},c.a.createElement(D.a.Label,null,"\u7a2e\u985e / \u30da\u30fc\u30b8 / \u4fa1\u683c"),c.a.createElement("div",{className:"form-control-plaintext"},[A[a.type],a.page?"".concat(a.page," \u30da\u30fc\u30b8"):"\u30da\u30fc\u30b8\u6570\u4e0d\u660e",void 0!==a.price?"".concat(a.price," \u5186"):"\u4fa1\u683c\u4e0d\u660e"].join(" / "))),c.a.createElement(D.a.Group,{controlId:"firstAppearanceEventName"},c.a.createElement(D.a.Label,null,"\u521d\u51fa"),c.a.createElement("div",{className:"form-control-plaintext"},a.firstAppearanceEventName)),c.a.createElement(D.a.Group,{controlId:"description"},c.a.createElement(D.a.Label,null,"\u6982\u8981"),c.a.createElement("pre",{className:"form-control-plaintext",style:{whiteSpace:"pre-wrap"}},a.description)))))))},W=r(85),H=r(77),$=r(41),K=r(84),M=function(e){function t(e,r){var a;return Object(i.a)(this,t),(a=Object(W.a)(this,Object(H.a)(t).call(this,e,r))).handleClick=a.handleClick.bind(Object($.a)(a)),a}return Object(K.a)(t,e),Object(l.a)(t,[{key:"handleClick",value:function(e){e.preventDefault(),this.props.onClick(e)}},{key:"render",value:function(){return c.a.createElement("a",{href:"#",onClick:this.handleClick},c.a.createElement(N.a,{icon:S.e,color:"gray",size:"2x"}))}}]),t}(c.a.Component);var Q=function(e){var t=e.models,r=e.history,n=e.params,o=t.circle,i=t.product,l=t.favorite,s=n.event,u=n.circleId,d=n.productId,h=Object(a.useState)(),f=Object(w.a)(h,2),m=(f[0],f[1]),v=Object(a.useState)(),p=Object(w.a)(v,2),b=p[0],E=p[1],g=Object(a.useState)(),y=Object(w.a)(g,2),I=y[0],_=y[1],k=Object(a.useState)(),O=Object(w.a)(k,2),x=O[0],q=O[1],L=Object(a.useCallback)((function(){r.push("/fav/list")}),[r]),P=Object(a.useCallback)((function(){l.export()}),[l]),F=Object(a.useCallback)((function(){r.push("/fav/import")}),[l,r]);Object(a.useEffect)((function(){var e=o.getCircle(u);e?E(e):o.request({circleId:u}),i.getProductList(u)?_(I):i.request({circleId:u})}),[o,u,i,I]),Object(a.useEffect)((function(){if(u){var e=i.getProduct(u,d);e?q(e):i.request({circleId:u})}}),[u,i,d]),Object(a.useEffect)((function(){var e=function(){if(u)m(o.getCircleListOrderByBooth()),E(o.getCircle(u)),_(i.getProductList(u)),q(i.getProduct(u,d));else{var e=o.getFirstBooth();e&&r.replace("/".concat(s,"/circle/").concat(e.id))}},t=function(){m(o.getCircleListOrderByBooth()),E(o.getCircle(u)),_(i.getProductList(u)),q(i.getProduct(u,d))},a=function(){_(i.getProductList(u)),q(i.getProduct(u,d))},c=function(){_(i.getProductList(u)),q(i.getProduct(u,d))};return o.on("change",e),o.on("loaded",t),i.on("change",a),i.on("loaded",c),function(){o.off("change",e),o.off("loaded",t),i.off("change",a),i.off("loaded",c)}}),[s,o,i,u,d,r]);var R=b||{id:u},D=x||{id:d};return c.a.createElement("div",{className:"card-container"},[c.a.createElement("div",{className:"loading"},c.a.createElement(j.a,{animation:"border"})),c.a.createElement(J,{key:"_".concat(u),isCurrent:!0,models:t,circleInfo:R}),c.a.createElement(U,{key:"_".concat(u,"_").concat(d),isCurrent:!0,models:t,circleInfo:R,productInfo:D})][b?x&&x.name?2:1:0],c.a.createElement(B.a,{className:"card-menu-btn"},c.a.createElement(B.a.Toggle,{as:M,id:"dropdown-custom-components"}),c.a.createElement(B.a.Menu,null,c.a.createElement(B.a.Item,{eventKey:"1",onSelect:L},"\u304a\u6c17\u306b\u5165\u308a\u4e00\u89a7"),c.a.createElement(B.a.Divider,null),c.a.createElement(B.a.Item,{eventKey:"2",onSelect:P},"\u304a\u6c17\u306b\u5165\u308a\u3092\u30a8\u30af\u30b9\u30dd\u30fc\u30c8"),c.a.createElement(B.a.Item,{eventKey:"3",onSelect:F},"\u304a\u6c17\u306b\u5165\u308a\u3092\u30a4\u30f3\u30dd\u30fc\u30c8"))),c.a.createElement(C.a,{variant:"link",className:"circle-prev"+(b&&o.hasPrevCircle(u)?"":" btn-hidden"),onClick:function(){var e=o.getPrevCircleId(u);e&&r.push("/".concat(s,"/circle/").concat(e))}},c.a.createElement(N.a,{icon:S.b,color:"gray",size:"3x"})),c.a.createElement(C.a,{variant:"link",className:"circle-next"+(b&&o.hasNextCircle(u)?"":" btn-hidden"),onClick:function(){var e=o.getNextCircleId(u);e&&r.push("/".concat(s,"/circle/").concat(e))}},c.a.createElement(N.a,{icon:S.c,color:"gray",size:"3x"})),c.a.createElement(C.a,{variant:"link",className:"product-prev"+(d?"":" btn-hidden"),onClick:function(){var e=i.getPrevSiblings(u,d);r.push(e?"/".concat(s,"/circle/").concat(u,"/").concat(e.id):"/".concat(s,"/circle/").concat(u))}},c.a.createElement(N.a,{icon:S.d,color:"gray",size:"3x"})),c.a.createElement(C.a,{variant:"link",className:"product-next"+(i.hasNextProduct(u,d)?"":" btn-hidden"),onClick:function(){var e=i.getNextSiblings(u,d);r.push(e?"/".concat(s,"/circle/").concat(u,"/").concat(e.id):"/".concat(s,"/circle/").concat(u))}},c.a.createElement(N.a,{icon:S.a,color:"gray",size:"3x"})))},V=r(141),X=r(83),Y=(r(120),r(143));var Z=function(e){var t=e.title,r=e.message,n=e.onClose,o=Object(a.useState)(!!r),i=Object(w.a)(o,2),l=i[0],s=i[1];Object(a.useEffect)((function(){s(!!r)}),[r]);var u=Object(a.useCallback)((function(){s(!1),n&&n()}),[n]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(Y.a,{show:l,onHide:u},c.a.createElement(Y.a.Header,{closeButton:!0},c.a.createElement(Y.a.Title,null,t)),c.a.createElement(Y.a.Body,null,r),c.a.createElement(Y.a.Footer,null,c.a.createElement(C.a,{variant:"primary",onClick:u},"\u4e86\u89e3"))))},ee="\u304a\u6c17\u306b\u5165\u308a\u306e\u30a4\u30f3\u30dd\u30fc\u30c8\u306b\u6210\u529f\u3057\u307e\u3057\u305f",te="\u304a\u6c17\u306b\u5165\u308a\u306e\u30a4\u30f3\u30dd\u30fc\u30c8\u306b\u5931\u6557\u3057\u307e\u3057\u305f";var re=function(e){var t=e.models,r=e.history,n=t.favorite,o=Object(a.useState)(!1),i=Object(w.a)(o,2),l=i[0],s=i[1],u=Object(X.a)({accept:"application/json"}),d=u.acceptedFiles,h=u.rejectedFiles,f=u.getRootProps,m=u.getInputProps,v=h.map((function(e){return c.a.createElement("li",{key:e.path},e.path," \u306f\u5229\u7528\u3067\u304d\u307e\u305b\u3093\u3002")})),p=Object(a.useCallback)((function(){if(!(d.length<1)){var e=d[0],t=new FileReader;t.onload=function(e){n.import(e.target.result)?s(ee):s(te)},t.readAsText(e)}}),[d,n]),b=Object(a.useCallback)((function(){r.goBack()}),[r]),E=Object(a.useCallback)((function(){s(!1)}),[r]),g=Object(a.useCallback)((function(){s(!1),r.goBack()}),[r]);return c.a.createElement("div",{className:"page-container"},c.a.createElement("h3",null,"\u304a\u6c17\u306b\u5165\u308a\u306e\u30a4\u30f3\u30dd\u30fc\u30c8"),c.a.createElement("div",f({className:"dropzone"}),c.a.createElement("input",m()),c.a.createElement("p",null,"\u3053\u3053\u3067\u30a8\u30af\u30b9\u30dd\u30fc\u30c8\u3057\u305f\u304a\u6c17\u306b\u5165\u308a\u3092\u30c9\u30e9\u30c3\u30b0\uff06\u30c9\u30ed\u30c3\u30d7\u3059\u308b\u304b\u3001\u30af\u30ea\u30c3\u30af\u3057\u3066\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044"),c.a.createElement("em",null,"(*.json \u306e\u307f\u6307\u5b9a\u53ef\u80fd)")),c.a.createElement("ol",null,v),c.a.createElement(V.a,null,c.a.createElement(C.a,{variant:"primary",onClick:p,disabled:d.length<1},"\u30a4\u30f3\u30dd\u30fc\u30c8"),c.a.createElement(C.a,{variant:"secondary",onClick:b},"\u623b\u308b")),c.a.createElement(Z,{title:"\u30a4\u30f3\u30dd\u30fc\u30c8",message:l,onClose:l===ee?g:E}))},ae=r(142);var ce=function(e){var t=e.history,r=e.models,n=r.circle,o=r.product,i=r.favorite,l=Object(a.useState)(i.list("tbf07")),s=Object(w.a)(l,2),u=s[0],d=s[1],h=Object(a.useState)({price:0,withUnknown:!1}),f=Object(w.a)(h,2),m=f[0],v=f[1];Object(a.useEffect)((function(){var e=function(){var e=i.list("tbf07");n.mergeFavorite(e),o.mergeFavorite(e),d(e),v(e.reduce((function(e,t){return t.productId&&(void 0===t.productPrice?e.withUnknown=!0:e.price+=t.productPrice),e}),{price:0,withUnknown:!1}))};return n.on("change",e),n.on("loaded",e),o.on("change",e),o.on("loaded",e),i.on("change",e),function(){n.off("change",e),n.off("loaded",e),o.off("change",e),o.off("loaded",e),i.off("change",e)}}),[i]);var p=Object(a.useCallback)((function(){t.goBack()}),[t]);return c.a.createElement("div",{className:"page-container"},c.a.createElement("h3",null,"\u304a\u6c17\u306b\u5165\u308a\u4e00\u89a7"),c.a.createElement(ae.a,{striped:!0,bordered:!0,size:"sm"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"\u914d\u7f6e"),c.a.createElement("th",null,"\u30b5\u30fc\u30af\u30eb\u540d"),c.a.createElement("th",null,"\u9812\u5e03\u7269"),c.a.createElement("th",null,"\u4fa1\u683c"))),c.a.createElement("tbody",null,u.map((function(e,r){return c.a.createElement("tr",{key:"fav-".concat(e.circleId,"-").concat("circle"|e.productId)},c.a.createElement("td",{style:{wordBreak:"keep-all"}},c.a.createElement(C.a,{variant:"link",onClick:function(){e.productId?t.push("/".concat(e.eventId.replace(/^[a-z]+0*/,""),"/circle/").concat(e.circleId,"/").concat(e.productId)):t.push("/".concat(e.eventId.replace(/^[a-z]+0*/,""),"/circle/").concat(e.circleId))}},e.space||"")),c.a.createElement("td",null,e.circleName||""),c.a.createElement("td",null,e.productName||""),c.a.createElement("td",{style:{wordBreak:"keep-all",textAlign:"right"}},void 0===e.productPrice?"":"".concat(e.productPrice," \u5186")))}))),c.a.createElement("tfoot",null,c.a.createElement("tr",null,c.a.createElement("th",null,"\u5408\u8a08"),c.a.createElement("td",{colSpan:3,style:{textAlign:"right"}},"".concat(m.price," \u5186").concat(m.withUnknown?" \u203b\u4e0d\u660e\u542b\u3080":""))))),c.a.createElement(V.a,null,c.a.createElement(C.a,{variant:"secondary",onClick:p},"\u623b\u308b")))};var ne=function(e){var t=e.models;return c.a.createElement(_.HashRouter,null,c.a.createElement(k.d,{path:"/",exact:!0,render:function(e){return c.a.createElement(x,{models:t,history:e.history,params:e.match.params})}}),c.a.createElement(k.d,{path:"/:event/circle/:circleId?/:productId?",render:function(e){return c.a.createElement(Q,{models:t,history:e.history,params:e.match.params})}}),c.a.createElement(k.d,{path:"/fav/import",render:function(e){return c.a.createElement(re,{models:t,history:e.history})}}),c.a.createElement(k.d,{path:"/fav/list",render:function(e){return c.a.createElement(ce,{models:t,history:e.history})}}))},oe={circle:new m,product:new p,favorite:new I};oe.circle.request(),o.a.render(c.a.createElement(ne,{models:oe}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},86:function(e,t,r){e.exports=r(137)},92:function(e,t,r){},94:function(e,t,r){}},[[86,1,2]]]);
//# sourceMappingURL=main.498ba70f.chunk.js.map