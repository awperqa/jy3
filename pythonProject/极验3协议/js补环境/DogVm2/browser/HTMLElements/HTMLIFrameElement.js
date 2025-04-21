// HTMLIFrameElement
var HTMLIFrameElement = function HTMLIFrameElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLIFrameElement);

Object.defineProperty(HTMLIFrameElement.prototype, Symbol.toStringTag,{"value":"HTMLIFrameElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLIFrameElement.prototype, "src",{"configurable":true,"enumerable":true,"get": function src_get(){debugger; return ""},"set": function src_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "srcdoc",{"configurable":true,"enumerable":true,"get": function srcdoc_get(){debugger; return ""},"set": function srcdoc_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "name",{"configurable":true,"enumerable":true,"get": function name_get(){debugger; return ""},"set": function name_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "sandbox",{"configurable":true,"enumerable":true,"get": function sandbox_get(){debugger; return ""},"set": function sandbox_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "allowFullscreen",{"configurable":true,"enumerable":true,"get": function allowFullscreen_get(){debugger; return "false"},"set": function allowFullscreen_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "width",{"configurable":true,"enumerable":true,"get": function width_get(){debugger; return ""},"set": function width_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "height",{"configurable":true,"enumerable":true,"get": function height_get(){debugger; return ""},"set": function height_set(){debugger;},});


Object.defineProperty(HTMLIFrameElement.prototype, "referrerPolicy",{"configurable":true,"enumerable":true,"get": function referrerPolicy_get(){debugger; return ""},"set": function referrerPolicy_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "csp",{"configurable":true,"enumerable":true,"get": function csp_get(){debugger; return ""},"set": function csp_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "allow",{"configurable":true,"enumerable":true,"get": function allow_get(){debugger; return ""},"set": function allow_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "featurePolicy",{"configurable":true,"enumerable":true,"get": function featurePolicy_get(){debugger; return "[object FeaturePolicy]"},set:undefined, });
Object.defineProperty(HTMLIFrameElement.prototype, "loading",{"configurable":true,"enumerable":true,"get": function loading_get(){debugger; return "auto"},"set": function loading_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "align",{"configurable":true,"enumerable":true,"get": function align_get(){debugger; return ""},"set": function align_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "scrolling",{"configurable":true,"enumerable":true,"get": function scrolling_get(){debugger; return ""},"set": function scrolling_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "frameBorder",{"configurable":true,"enumerable":true,"get": function frameBorder_get(){debugger; return ""},"set": function frameBorder_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "longDesc",{"configurable":true,"enumerable":true,"get": function longDesc_get(){debugger; return ""},"set": function longDesc_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "marginHeight",{"configurable":true,"enumerable":true,"get": function marginHeight_get(){debugger; return ""},"set": function marginHeight_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "marginWidth",{"configurable":true,"enumerable":true,"get": function marginWidth_get(){debugger; return ""},"set": function marginWidth_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "getSVGDocument",{"configurable":true,"enumerable":true,"writable":true,"value": function getSVGDocument(){debugger;},});dogvm.safefunction(HTMLIFrameElement.prototype.getSVGDocument);
Object.defineProperty(HTMLIFrameElement.prototype, "credentialless",{"configurable":true,"enumerable":true,"get": function credentialless_get(){debugger; return "false"},"set": function credentialless_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "allowPaymentRequest",{"configurable":true,"enumerable":true,"get": function allowPaymentRequest_get(){debugger; return "false"},"set": function allowPaymentRequest_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "privateToken",{"configurable":true,"enumerable":true,"get": function privateToken_get(){debugger; return ""},"set": function privateToken_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "browsingTopics",{"configurable":true,"enumerable":true,"get": function browsingTopics_get(){debugger; return "false"},"set": function browsingTopics_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "adAuctionHeaders",{"configurable":true,"enumerable":true,"get": function adAuctionHeaders_get(){debugger; return "false"},"set": function adAuctionHeaders_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "sharedStorageWritable",{"configurable":true,"enumerable":true,"get": function sharedStorageWritable_get(){debugger; return "false"},"set": function sharedStorageWritable_set(){debugger;},});
Object.setPrototypeOf(HTMLIFrameElement.prototype, HTMLElement.prototype);


Object.defineProperty(HTMLIFrameElement.prototype, "contentWindow",{"configurable":true,"enumerable":true,
    "get": function contentWindow_get(){
        debugger;
        if(this.parentNode){
            return (window[0]=window,window);
        }
        return "null";
    },set:undefined, });
Object.defineProperty(HTMLIFrameElement.prototype, "contentDocument",{"configurable":true,"enumerable":true,
    "get": function contentDocument_get(){
        debugger; return "null"
    },set:undefined, });


// 创建iframe
dogvm.memory.htmlelements["iframe"] = function () {
    var iframe = new (function () {});
    iframe.__proto__ = HTMLIFrameElement.prototype;
    return iframe;
}