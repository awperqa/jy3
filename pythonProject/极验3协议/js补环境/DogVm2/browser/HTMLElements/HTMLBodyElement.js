// HTMLBodyElement对象
var HTMLBodyElement = function HTMLBodyElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLBodyElement);

/////////////////////////////////
Object.defineProperty(HTMLBodyElement.prototype, Symbol.toStringTag,{"value":"HTMLBodyElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLBodyElement.prototype, "text",{"configurable":true,"enumerable":true,"get": function text_get(){; return ""},"set": function text_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "link",{"configurable":true,"enumerable":true,"get": function link_get(){; return ""},"set": function link_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "vLink",{"configurable":true,"enumerable":true,"get": function vLink_get(){; return ""},"set": function vLink_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "aLink",{"configurable":true,"enumerable":true,"get": function aLink_get(){; return ""},"set": function aLink_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "bgColor",{"configurable":true,"enumerable":true,"get": function bgColor_get(){; return ""},"set": function bgColor_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "background",{"configurable":true,"enumerable":true,"get": function background_get(){; return ""},"set": function background_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onblur",{"configurable":true,"enumerable":true,"get": function onblur_get(){; return "null"},"set": function onblur_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onerror",{"configurable":true,"enumerable":true,"get": function onerror_get(){; return "null"},"set": function onerror_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onfocus",{"configurable":true,"enumerable":true,"get": function onfocus_get(){; return "null"},"set": function onfocus_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onload",{"configurable":true,"enumerable":true,"get": function onload_get(){; return "null"},"set": function onload_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onresize",{"configurable":true,"enumerable":true,"get": function onresize_get(){; return 'function(){s["default"].tVerify()&&r["default"].setPopPosition(s["default"].tVerify(),i.loadingSize.width,i.loadingSize.height||0)}'},"set": function onresize_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onscroll",{"configurable":true,"enumerable":true,"get": function onscroll_get(){; return "null"},"set": function onscroll_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onafterprint",{"configurable":true,"enumerable":true,"get": function onafterprint_get(){; return "null"},"set": function onafterprint_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onbeforeprint",{"configurable":true,"enumerable":true,"get": function onbeforeprint_get(){; return "null"},"set": function onbeforeprint_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onbeforeunload",{"configurable":true,"enumerable":true,"get": function onbeforeunload_get(){; return "null"},"set": function onbeforeunload_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onhashchange",{"configurable":true,"enumerable":true,"get": function onhashchange_get(){; return "null"},"set": function onhashchange_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onlanguagechange",{"configurable":true,"enumerable":true,"get": function onlanguagechange_get(){; return "null"},"set": function onlanguagechange_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onmessage",{"configurable":true,"enumerable":true,"get": function onmessage_get(){; return "null"},"set": function onmessage_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onmessageerror",{"configurable":true,"enumerable":true,"get": function onmessageerror_get(){; return "null"},"set": function onmessageerror_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onoffline",{"configurable":true,"enumerable":true,"get": function onoffline_get(){; return "null"},"set": function onoffline_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "ononline",{"configurable":true,"enumerable":true,"get": function ononline_get(){; return "null"},"set": function ononline_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onpagehide",{"configurable":true,"enumerable":true,"get": function onpagehide_get(){; return "null"},"set": function onpagehide_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onpageshow",{"configurable":true,"enumerable":true,"get": function onpageshow_get(){; return "null"},"set": function onpageshow_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onpopstate",{"configurable":true,"enumerable":true,"get": function onpopstate_get(){; return "function(){for(var c=arguments.length,l=new Array(c),p=0;p<c;p++)l[p]=arguments[p];var b=e.location.href;if(g(t,b),d)return d.apply(this,l)}"},"set": function onpopstate_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onrejectionhandled",{"configurable":true,"enumerable":true,"get": function onrejectionhandled_get(){; return "null"},"set": function onrejectionhandled_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onstorage",{"configurable":true,"enumerable":true,"get": function onstorage_get(){; return "null"},"set": function onstorage_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onunhandledrejection",{"configurable":true,"enumerable":true,"get": function onunhandledrejection_get(){; return "null"},"set": function onunhandledrejection_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onunload",{"configurable":true,"enumerable":true,"get": function onunload_get(){; return "null"},"set": function onunload_set(){;},});
Object.setPrototypeOf(HTMLBodyElement.prototype, HTMLElement.prototype);
/////////////////////////////

dogvm.safeproperty(HTMLBodyElement);

HTMLBodyElement.createHtmlBodyDog = function createHtmlBodyDog() {
    let instance = Object.create(HTMLBodyElement.prototype);
    // 浏览器实例属性
    Object.defineProperty(instance, "_reactListeningxqzyu425lap",{"configurable":true,"enumerable":true,"writable":true,"value":true,});
    return dogvm.proxy(instance);
  };dogvm.safefunction(HTMLBodyElement.createHtmlBodyDog);
  
HTMLBodyElement.bodyDog = HTMLBodyElement.createHtmlBodyDog();