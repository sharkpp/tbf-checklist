(window["webpackJsonptbf-checklist"]=window["webpackJsonptbf-checklist"]||[]).push([[0],{45:function(e,t,r){e.exports=r(72)},50:function(e,t,r){},51:function(e,t,r){},72:function(e,t,r){"use strict";r.r(t);var c=r(0),n=r.n(c),o=r(39),a=r.n(o);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r(33),r(50);var i=r(20),s=r(21),l=r(27),u="https://cors-anywhere.herokuapp.com/https://techbookfest.org/api",d=/^(.+?)([0-9]+)(.*)$/,h="circle-cache";function f(e){var t=[].concat(d.exec(e)||["",0,""]).slice(1),r=t[0].codePointAt(0);return 1e3*(12353<=r&&r<=12435?r-12353+10:["\u904b","\u5354"].indexOf(t[0]))+ +t[1]}var m=function(){function e(){Object(i.a)(this,e),this._event=new l,this._store=Object.assign({loadCompleted:!1,orderBy:{booth:[]},lookupBy:{booth:{}},circles:{}},JSON.parse(sessionStorage.getItem(h))||{}),this._waitRequest={},this._waitRequestList=!1}return Object(s.a)(e,[{key:"_updateCache",value:function(){var e=JSON.stringify(this._store);console.debug("circle data len",e.length),sessionStorage.setItem(h,e)}},{key:"request",value:function(e){var t=this;(e=e||{}).circleId=e.circleId||null;var r=[],c=!1;if(e.circleId){if(this._waitRequest[e.circleId])return void console.debug("request wait for ".concat(e.circleId));r.push("".concat(u,"/circle/").concat(e.circleId)),this._waitRequest[e.circleId]=!0,c=e.circleId}else this._waitRequestList=c=!0,this._store.loadCompleted=!1,this._updateCache(),r.push("".concat(u,"/circle?eventID=").concat("tbf07","&eventExhibitCourseID=3&visibility=site&limit=100&onlyAdoption=true"));!function e(){var n=r.shift();n?fetch(n,{method:"GET"}).then((function(e){return e.json()})).then((function(c){if(c.cursor&&r.unshift("".concat(n.replace(/&cursor=.+$/,""),"&cursor=").concat(c.cursor)),c.list)for(var o,a=0;void 0!==(o=c.list[a]);++a){delete o.event,delete o.eventExhibitCourse,t._store.circles[o.id]=o;for(var i,s=0;void 0!==(i=o.spaces[s]);++s)t._store.lookupBy.booth[i]=o.id,t._store.orderBy.booth.indexOf(i)<0&&t._store.orderBy.booth.push(i)}else{var l=c;delete l.event,delete l.eventExhibitCourse,t._store.circles[l.id]=l;for(var u,d=0;void 0!==(u=l.spaces[d]);++d)t._store.lookupBy.booth[u]=l.id,t._store.orderBy.booth.indexOf(u)<0&&t._store.orderBy.booth.push(u)}return t._store.orderBy.booth=t._store.orderBy.booth.sort((function(e,t){return f(e)-f(t)})),t._updateCache(),t._event.emit("change"),e()})).catch((function(e){return console.error(e)})):(!0===c?(t._waitRequestList=!1,t._store.loadCompleted=!0):delete t._waitRequest[c],t._updateCache(),t._event.emit("change"),t._event.emit("loaded"))}()}},{key:"on",value:function(e,t){this._event.on(e,t),0<=["change","loaded"].indexOf(e)&&!1===this._waitRequestList&&t(e)}},{key:"off",value:function(e,t){this._event.removeListener(e,t)}},{key:"getCircleListOrderByBooth",value:function(){var e=this;return(this._store.orderBy.booth||[]).map((function(t){return(e.getCircleByBooth(t)||{}).id}))}},{key:"getCircleByBooth",value:function(e){return this._store.circles[this._store.lookupBy.booth[e]]}},{key:"getCircleBoothOrder",value:function(e){return!1!==this._waitRequestList?-2:this._store.orderBy.booth.indexOf(((this._store.circles[e]||{}).spaces||[])[0])}},{key:"getCircle",value:function(e){return this._store.circles[e]}},{key:"getFirstBooth",value:function(){return!1===this._waitRequestList&&this.getCircleByBooth(this._store.orderBy.booth[0])}},{key:"getLastBooth",value:function(){return!1===this._waitRequestList&&this.getCircleByBooth(this._store.orderBy.booth[this._store.orderBy.booth.length-1])}},{key:"hasPrevCircle",value:function(e){var t=this._store.circles[e];return!(!t||!t.prevCircleExhibitInfoID)}},{key:"hasNextCircle",value:function(e){var t=this._store.circles[e];return!(!t||!t.nextCircleExhibitInfoID)}},{key:"getPrevCircle",value:function(e){var t=this._store.circles[e];return t&&t.prevCircleExhibitInfoID&&this._store.circles[t.prevCircleExhibitInfoID]}},{key:"getNextCircle",value:function(e){var t=this._store.circles[e];return t&&t.nextCircleExhibitInfoID&&this._store.circles[t.nextCircleExhibitInfoID]}},{key:"getPrevCircleId",value:function(e){var t=this._store.circles[e];return t&&t.prevCircleExhibitInfoID}},{key:"getNextCircleId",value:function(e){var t=this._store.circles[e];return t&&t.nextCircleExhibitInfoID}}]),e}(),v=r(27),p=function(){function e(){Object(i.a)(this,e),this._event=new v,this._store={orderBy:{seq:{}},products:{}}}return Object(s.a)(e,[{key:"request",value:function(e){var t=this;(e=e||{}).circleId=e.circleId||null;var r=[];if(e.circleId){r.push("".concat("https://cors-anywhere.herokuapp.com/https://techbookfest.org/api","/product?circleExhibitInfoID=").concat(e.circleId,"&limit=100"));!function e(){var c=r.shift();c?fetch(c,{method:"GET"}).then((function(e){return e.json()})).then((function(n){if(n.cursor&&r.unshift("".concat(c.replace(/&cursor=.+$/,""),"&cursor=").concat(n.cursor)),n.list)for(var o,a=0;void 0!==(o=n.list[a]);++a){var i=o.circleExhibitInfoID;t._store.products[i]=t._store.products[i]||{},t._store.products[i][o.id]=o,t._store.orderBy.seq[i]=t._store.orderBy.seq[i]||[],t._store.orderBy.seq[i][o.seq-1]=o.id}return t._event.emit("change"),e()})).catch((function(e){return console.error(e)})):(t._event.emit("change"),t._event.emit("loaded"))}()}}},{key:"on",value:function(e,t){this._event.on(e,t)}},{key:"off",value:function(e,t){this._event.removeListener(e,t)}},{key:"getProductOrder",value:function(e,t){var r=this._store.orderBy.seq[e]||[];return r?r.indexOf(t):-1}},{key:"getProductList",value:function(e){var t=this._store.products[e];return t&&Object.keys(t)}},{key:"getProductByIndex",value:function(e,t){return(this._store.products[e]||{})[(this._store.orderBy.seq[e]||[])[t]]||!1}},{key:"getProduct",value:function(e,t){return(this._store.products[e]||{})[t]||!1}},{key:"getProductCount",value:function(e){var t=this._store.orderBy.seq[e];return t?t.length:-1}},{key:"hasNextProduct",value:function(e,t){var r=this._store.orderBy.seq[e],c=r&&r.indexOf(t);return!(!r||!r[c+1])}},{key:"getPrevSiblings",value:function(e,t){var r=this._store.products[e],c=this._store.orderBy.seq[e],n=c&&c.indexOf(t);return c&&r[c[n-1]]||!1}},{key:"getNextSiblings",value:function(e,t){var r=this._store.products[e],c=this._store.orderBy.seq[e],n=c&&c.indexOf(t);return c&&r[c[n+1]]||!1}}]),e}(),b=r(27),g="favorite",_=function(){function e(){Object(i.a)(this,e),this._event=new b,this._store=JSON.parse(localStorage.getItem(g)||"{}")}return Object(s.a)(e,[{key:"on",value:function(e,t){this._event.on(e,t)}},{key:"off",value:function(e,t){this._event.removeListener(e,t)}},{key:"isFavorite",value:function(e,t){return!!(t?this._store.tbf07&&this._store.tbf07[e]&&this._store.tbf07[e][t]:this._store.tbf07&&this._store.tbf07[e]&&this._store.tbf07[e].circle)}},{key:"setFavorite",value:function(e,t){if(e){this._store.tbf07=this._store.tbf07||{},this._store.tbf07[e]=this._store.tbf07[e]||{circle:null};var r=t||"circle",c=!0!==this._store.tbf07[e][r];this._store.tbf07[e][r]=!0,c&&(localStorage.setItem(g,JSON.stringify(this._store)),this._event.emit("change",{circleId:e,productId:t,favorite:!0}))}}},{key:"unsetFavorite",value:function(e,t){if(e){this._store.tbf07=this._store.tbf07||{},this._store.tbf07[e]=this._store.tbf07[e]||{circle:null};var r=t||"circle",c=!0===this._store.tbf07[e][r];delete this._store.tbf07[e][r],c&&(localStorage.setItem(g,JSON.stringify(this._store)),this._event.emit("change",{circleId:e,productId:t,favorite:!1}))}}}]),e}(),E=r(23),y=r(15),I=(r(51),r(74)),k=r(40);var x=function(){return n.a.createElement("div",null,n.a.createElement(y.c,{to:"/7/circle/"}),n.a.createElement(k.LinkContainer,{to:"/7/circle/"},n.a.createElement(I.a,null,"\u6280\u8853\u66f8\u5178\uff17")))},C=r(18),B=r(73),w=r(16),O=r(17),N=r(13),L=r.n(N),q=r(25),j=r.n(q),P=r(3),S=r.n(P),R=r(43);var G=function(e){var t=e.models,r=e.circleId,o=e.productId,a=e.isCurrent,i=t.favorite,s=Object(c.useState)(i.isFavorite(r,o)),l=Object(C.a)(s,2),u=l[0],d=l[1],h=Object(c.useCallback)((function(){return i.setFavorite(r,o)}),[i,r,o]),f=Object(c.useCallback)((function(){return i.unsetFavorite(r,o)}),[i,r,o]);return Object(c.useEffect)((function(){var e=function(e){r===e.circleId&&o===e.productId&&d(e.favorite)};return a&&i.on("change",e),a?function(){i.off("change",e)}:function(){}}),[a,i,r,o]),n.a.createElement("div",{style:{position:"absolute",top:0,right:0,padding:".75rem"},onClick:u?f:h},n.a.createElement(w.a,{icon:u?O.e:R.a,color:"#ffcc00",size:"lg",onClick:u?f:h}))};var D=function(e){var t=e.models,r=e.circleInfo,c=e.isCurrent,o=r&&r.circleCutImage||{url:"",width:0,height:1};return n.a.createElement("div",{className:"circle-card"},n.a.createElement(L.a,null,n.a.createElement(L.a.Header,null,n.a.createElement(j.a,{variant:"secondary"},(r.spaces||[])[0]),r.name||" ",n.a.createElement(G,{models:t,isCurrent:c,circleId:r&&r.id})),n.a.createElement("div",{style:{width:"100%",textAlign:"center",marginTop:"8px"}},o.url&&n.a.createElement(L.a.Img,{variant:"top",src:o.url,style:{width:200*o.width/o.height,height:200}}),!o.url&&n.a.createElement("div",{style:{display:"inline-block",width:141,height:200,border:"5px solid black",overflow:"hidden"}},n.a.createElement("div",{style:{top:"50%",position:"relative",marginTop:"-0.5em"}},"NO IMAGE"))),n.a.createElement(L.a.Body,null,n.a.createElement("div",{className:"card-text"},n.a.createElement(S.a,null,n.a.createElement(S.a.Group,{controlId:"name"},n.a.createElement(S.a.Label,null,"\u30b5\u30fc\u30af\u30eb\u540d"),n.a.createElement("div",{className:"form-control-plaintext"},r.nameRuby?"".concat(r.name,"(").concat(r.nameRuby,")"):r.name)),n.a.createElement(S.a.Group,{controlId:"spaces"},n.a.createElement(S.a.Label,null,"\u914d\u7f6e"),n.a.createElement("div",{className:"form-control-plaintext"},r.spaces&&r.spaces[0]||"")),n.a.createElement(S.a.Group,{controlId:"penName"},n.a.createElement(S.a.Label,null,"\u30da\u30f3\u30cd\u30fc\u30e0"),n.a.createElement("div",{className:"form-control-plaintext"},r.penName)),n.a.createElement(S.a.Group,{controlId:"webSiteURL"},n.a.createElement(S.a.Label,null,"Web\u30b5\u30a4\u30c8"),n.a.createElement("div",{className:"form-control-plaintext"},r.webSiteURL)),n.a.createElement(S.a.Group,{controlId:"genre"},n.a.createElement(S.a.Label,null,"\u30b8\u30e3\u30f3\u30eb"),n.a.createElement("div",{className:"form-control-plaintext"},r.genre)),n.a.createElement(S.a.Group,{controlId:"genreFreeFormat"},n.a.createElement(S.a.Label,null,"\u30b8\u30e3\u30f3\u30eb\u8a73\u7d30"),n.a.createElement("div",{className:"form-control-plaintext"},r.genreFreeFormat)))))))},F={fanzine:"\u540c\u4eba\u8a8c",commerce:"\u5546\u696d\u8a8c"};var A=function(e){var t=e.models,r=e.circleInfo,c=e.productInfo,o=e.isCurrent,a=c&&c.images&&c.images[0]||{url:"",width:0,height:1};return n.a.createElement("div",{className:"product-card"},n.a.createElement(L.a,null,n.a.createElement(L.a.Header,null,n.a.createElement(j.a,{variant:"secondary"},(r.spaces||[])[0]),r.name||" ",n.a.createElement(G,{models:t,isCurrent:o,circleId:r&&r.id,productId:c&&c.id})),!1,n.a.createElement("div",{style:{width:"100%",textAlign:"center",marginTop:"8px"}},a.url&&n.a.createElement(L.a.Img,{variant:"top",src:a.url,style:{width:200*a.width/a.height,height:200}})),n.a.createElement(L.a.Body,null,n.a.createElement("div",{className:"card-text"},n.a.createElement(S.a,null,n.a.createElement(S.a.Group,{controlId:"name"},n.a.createElement(S.a.Label,null,"\u9812\u5e03\u7269"),n.a.createElement("div",{className:"form-control-plaintext"},c.name)),n.a.createElement(S.a.Group,{controlId:"page"},n.a.createElement(S.a.Label,null,"\u7a2e\u985e / \u30da\u30fc\u30b8 / \u4fa1\u683c"),n.a.createElement("div",{className:"form-control-plaintext"},"".concat(F[c.type]," / ").concat(c.page," \u30da\u30fc\u30b8 / ").concat(c.price?c.price+" \u5186":""))),n.a.createElement(S.a.Group,{controlId:"firstAppearanceEventName"},n.a.createElement(S.a.Label,null,"\u521d\u51fa"),n.a.createElement("div",{className:"form-control-plaintext"},c.firstAppearanceEventName)),n.a.createElement(S.a.Group,{controlId:"description"},n.a.createElement(S.a.Label,null,"\u6982\u8981"),n.a.createElement("pre",{className:"form-control-plaintext"},c.description)))))))};var J=function(e){var t=e.models,r=e.history,o=e.params,a=t.circle,i=t.product,s=o.event,l=o.circleId,u=o.productId,d=Object(c.useState)(),h=Object(C.a)(d,2),f=(h[0],h[1]),m=Object(c.useState)(),v=Object(C.a)(m,2),p=v[0],b=v[1],g=Object(c.useState)(),_=Object(C.a)(g,2),E=_[0],y=_[1],k=Object(c.useState)(),x=Object(C.a)(k,2),N=x[0],L=x[1];Object(c.useEffect)((function(){var e=a.getCircle(l);e?b(e):a.request({circleId:l}),i.getProductList(l)?y(E):i.request({circleId:l})}),[a,l,i,E]),Object(c.useEffect)((function(){if(l){var e=i.getProduct(l,u);e?L(e):i.request({circleId:l})}}),[l,i,u]),Object(c.useEffect)((function(){var e=function(){if(l)f(a.getCircleListOrderByBooth()),b(a.getCircle(l)),y(i.getProductList(l)),L(i.getProduct(l,u));else{var e=a.getFirstBooth();e&&r.replace("/".concat(s,"/circle/").concat(e.id))}},t=function(){f(a.getCircleListOrderByBooth()),b(a.getCircle(l)),y(i.getProductList(l)),L(i.getProduct(l,u))},c=function(){y(i.getProductList(l)),L(i.getProduct(l,u))},n=function(){y(i.getProductList(l)),L(i.getProduct(l,u))};return a.on("change",e),a.on("loaded",t),i.on("change",c),i.on("loaded",n),function(){a.off("change",e),a.off("loaded",t),i.off("change",c),i.off("loaded",n)}}),[s,a,i,l,u,r]);var q=p||{id:l},j=N||{id:u};return n.a.createElement("div",{className:"card-container"},[n.a.createElement("div",{className:"loading"},n.a.createElement(B.a,{animation:"border"})),n.a.createElement(D,{key:"_".concat(l),isCurrent:!0,models:t,circleInfo:q}),n.a.createElement(A,{key:"_".concat(l,"_").concat(u),isCurrent:!0,models:t,circleInfo:q,productInfo:j})][p?N&&N.name?2:1:0],n.a.createElement(I.a,{variant:"link",className:"circle-prev"+(p&&a.hasPrevCircle(l)?"":" btn-hidden"),onClick:function(){var e=a.getPrevCircleId(l);e&&r.push("/".concat(s,"/circle/").concat(e))}},n.a.createElement(w.a,{icon:O.b,color:"black",size:"3x"})),n.a.createElement(I.a,{variant:"link",className:"circle-next"+(p&&a.hasNextCircle(l)?"":" btn-hidden"),onClick:function(){var e=a.getNextCircleId(l);e&&r.push("/".concat(s,"/circle/").concat(e))}},n.a.createElement(w.a,{icon:O.c,color:"black",size:"3x"})),n.a.createElement(I.a,{variant:"link",className:"product-prev"+(u?"":" btn-hidden"),onClick:function(){var e=i.getPrevSiblings(l,u);r.push(e?"/".concat(s,"/circle/").concat(l,"/").concat(e.id):"/".concat(s,"/circle/").concat(l))}},n.a.createElement(w.a,{icon:O.d,color:"black",size:"3x"})),n.a.createElement(I.a,{variant:"link",className:"product-next"+(i.hasNextProduct(l,u)?"":" btn-hidden"),onClick:function(){var e=i.getNextSiblings(l,u);r.push(e?"/".concat(s,"/circle/").concat(l,"/").concat(e.id):"/".concat(s,"/circle/").concat(l))}},n.a.createElement(w.a,{icon:O.a,color:"black",size:"3x"})))};var z=function(e){var t=e.models;return n.a.createElement(E.HashRouter,null,!1,n.a.createElement(y.d,{path:"/",exact:!0,render:function(e){return n.a.createElement(x,{models:t,history:e.history,params:e.match.params})}}),n.a.createElement(y.d,{path:"/:event/circle/:circleId?/:productId?",render:function(e){return n.a.createElement(J,{models:t,history:e.history,params:e.match.params})}}))},T={circle:new m,product:new p,favorite:new _};T.circle.request(),a.a.render(n.a.createElement(z,{models:T}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[45,1,2]]]);
//# sourceMappingURL=main.f202bc1b.chunk.js.map