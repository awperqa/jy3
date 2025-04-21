// 从浏览器中知道Document是全局的，new Document会返回一个对象

// Document
var Document = function Document(){};
dogvm.safefunction(Document);
Object.defineProperties(Document.prototype, {
    [Symbol.toStringTag]: {
        value: "Document",
        configurable: true
    }
});
Document.prototype.__proto__ = Node.prototype;

//////////////////////////
Object.defineProperty(Document, "parseHTMLUnsafe",{"configurable":true,"enumerable":true,"writable":true,"value": function parseHTMLUnsafe(){debugger;},});dogvm.safefunction(Document.parseHTMLUnsafe);
Object.defineProperty(Document.prototype, Symbol.toStringTag,{"value":"Document","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Document.prototype, "implementation",{"configurable":true,"enumerable":true,"get": function implementation_get(){debugger;return "[object DOMImplementation]"},set:undefined, });
Object.defineProperty(Document.prototype, "URL",{"configurable":true,"enumerable":true,"get": function URL_get(){debugger;return "https://turing.captcha.gtimg.com/1/template/drag_ele.html"},set:undefined, });
Object.defineProperty(Document.prototype, "documentURI",{"configurable":true,"enumerable":true,"get": function documentURI_get(){debugger;return "https://turing.captcha.gtimg.com/1/template/drag_ele.html"},set:undefined, });
Object.defineProperty(Document.prototype, "compatMode",{"configurable":true,"enumerable":true,"get": function compatMode_get(){debugger;return "CSS1Compat"},set:undefined, });
Object.defineProperty(Document.prototype, "characterSet",{"configurable":true,"enumerable":true,"get": function characterSet_get(){debugger;return "UTF-8"},set:undefined, });
Object.defineProperty(Document.prototype, "charset",{"configurable":true,"enumerable":true,"get": function charset_get(){debugger;return "UTF-8"},set:undefined, });
Object.defineProperty(Document.prototype, "inputEncoding",{"configurable":true,"enumerable":true,"get": function inputEncoding_get(){debugger;return "UTF-8"},set:undefined, });
Object.defineProperty(Document.prototype, "contentType",{"configurable":true,"enumerable":true,"get": function contentType_get(){debugger;return "text/html"},set:undefined, });
Object.defineProperty(Document.prototype, "doctype",{"configurable":true,"enumerable":true,"get": function doctype_get(){debugger;return "[object DocumentType]"},set:undefined, });
Object.defineProperty(Document.prototype, "xmlEncoding",{"configurable":true,"enumerable":true,"get": function xmlEncoding_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "xmlVersion",{"configurable":true,"enumerable":true,"get": function xmlVersion_get(){debugger;return "null"},"set": function xmlVersion_set(){debugger;},});
Object.defineProperty(Document.prototype, "xmlStandalone",{"configurable":true,"enumerable":true,"get": function xmlStandalone_get(){debugger;return "false"},"set": function xmlStandalone_set(){debugger;},});
Object.defineProperty(Document.prototype, "domain",{"configurable":true,"enumerable":true,"get": function domain_get(){debugger;return "turing.captcha.gtimg.com"},"set": function domain_set(){debugger;},});
Object.defineProperty(Document.prototype, "referrer",{"configurable":true,"enumerable":true,"get": function referrer_get(){debugger;return "https://pintia.cn/"},set:undefined, });
Object.defineProperty(Document.prototype, "lastModified",{"configurable":true,"enumerable":true,"get": function lastModified_get(){debugger;return "12/31/2024 14:47:24"},set:undefined, });
Object.defineProperty(Document.prototype, "readyState",{"configurable":true,"enumerable":true,"get": function readyState_get(){debugger;return "complete"},set:undefined, });
Object.defineProperty(Document.prototype, "title",{"configurable":true,"enumerable":true,"get": function title_get(){debugger;return "验证码"},"set": function title_set(){debugger;},});
Object.defineProperty(Document.prototype, "dir",{"configurable":true,"enumerable":true,"get": function dir_get(){debugger;return ""},"set": function dir_set(){debugger;},});
Object.defineProperty(Document.prototype, "images",{"configurable":true,"enumerable":true,"get": function images_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "embeds",{"configurable":true,"enumerable":true,"get": function embeds_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "plugins",{"configurable":true,"enumerable":true,"get": function plugins_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "links",{"configurable":true,"enumerable":true,"get": function links_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "forms",{"configurable":true,"enumerable":true,"get": function forms_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "scripts",{"configurable":true,"enumerable":true,"get": function scripts_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "currentScript",{"configurable":true,"enumerable":true,"get": function currentScript_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "defaultView",{"configurable":true,"enumerable":true,"get": function defaultView_get(){debugger;return "[object Window]"},set:undefined, });
Object.defineProperty(Document.prototype, "designMode",{"configurable":true,"enumerable":true,"get": function designMode_get(){debugger;return "off"},"set": function designMode_set(){debugger;},});
Object.defineProperty(Document.prototype, "onreadystatechange",{"configurable":true,"enumerable":true,"get": function onreadystatechange_get(){debugger;return "null"},"set": function onreadystatechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "anchors",{"configurable":true,"enumerable":true,"get": function anchors_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "applets",{"configurable":true,"enumerable":true,"get": function applets_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "fgColor",{"configurable":true,"enumerable":true,"get": function fgColor_get(){debugger;return ""},"set": function fgColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "linkColor",{"configurable":true,"enumerable":true,"get": function linkColor_get(){debugger;return ""},"set": function linkColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "vlinkColor",{"configurable":true,"enumerable":true,"get": function vlinkColor_get(){debugger;return ""},"set": function vlinkColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "alinkColor",{"configurable":true,"enumerable":true,"get": function alinkColor_get(){debugger;return ""},"set": function alinkColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "bgColor",{"configurable":true,"enumerable":true,"get": function bgColor_get(){debugger;return ""},"set": function bgColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "all",{"configurable":true,"enumerable":true,"get": function all_get(){debugger;return "[object HTMLAllCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "scrollingElement",{"configurable":true,"enumerable":true,"get": function scrollingElement_get(){debugger;return "[object HTMLHtmlElement]"},set:undefined, });
Object.defineProperty(Document.prototype, "onpointerlockchange",{"configurable":true,"enumerable":true,"get": function onpointerlockchange_get(){debugger;return "null"},"set": function onpointerlockchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerlockerror",{"configurable":true,"enumerable":true,"get": function onpointerlockerror_get(){debugger;return "null"},"set": function onpointerlockerror_set(){debugger;},});
Object.defineProperty(Document.prototype, "hidden",{"configurable":true,"enumerable":true,"get": function hidden_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "visibilityState",{"configurable":true,"enumerable":true,"get": function visibilityState_get(){debugger;return "visible"},set:undefined, });
Object.defineProperty(Document.prototype, "wasDiscarded",{"configurable":true,"enumerable":true,"get": function wasDiscarded_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "prerendering",{"configurable":true,"enumerable":true,"get": function prerendering_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "featurePolicy",{"configurable":true,"enumerable":true,"get": function featurePolicy_get(){debugger;return "[object FeaturePolicy]"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitVisibilityState",{"configurable":true,"enumerable":true,"get": function webkitVisibilityState_get(){debugger;return "visible"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitHidden",{"configurable":true,"enumerable":true,"get": function webkitHidden_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "onbeforecopy",{"configurable":true,"enumerable":true,"get": function onbeforecopy_get(){debugger;return "null"},"set": function onbeforecopy_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforecut",{"configurable":true,"enumerable":true,"get": function onbeforecut_get(){debugger;return "null"},"set": function onbeforecut_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforepaste",{"configurable":true,"enumerable":true,"get": function onbeforepaste_get(){debugger;return "null"},"set": function onbeforepaste_set(){debugger;},});
Object.defineProperty(Document.prototype, "onfreeze",{"configurable":true,"enumerable":true,"get": function onfreeze_get(){debugger;return "null"},"set": function onfreeze_set(){debugger;},});
Object.defineProperty(Document.prototype, "onprerenderingchange",{"configurable":true,"enumerable":true,"get": function onprerenderingchange_get(){debugger;return "null"},"set": function onprerenderingchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onresume",{"configurable":true,"enumerable":true,"get": function onresume_get(){debugger;return "null"},"set": function onresume_set(){debugger;},});
Object.defineProperty(Document.prototype, "onsearch",{"configurable":true,"enumerable":true,"get": function onsearch_get(){debugger;return "null"},"set": function onsearch_set(){debugger;},});
Object.defineProperty(Document.prototype, "onvisibilitychange",{"configurable":true,"enumerable":true,"get": function onvisibilitychange_get(){debugger;return "null"},"set": function onvisibilitychange_set(){debugger;},});
Object.defineProperty(Document.prototype, "timeline",{"configurable":true,"enumerable":true,"get": function timeline_get(){debugger;return "[object DocumentTimeline]"},set:undefined, });
Object.defineProperty(Document.prototype, "fullscreenEnabled",{"configurable":true,"enumerable":true,"get": function fullscreenEnabled_get(){debugger;return "false"},"set": function fullscreenEnabled_set(){debugger;},});
Object.defineProperty(Document.prototype, "fullscreen",{"configurable":true,"enumerable":true,"get": function fullscreen_get(){debugger;return "false"},"set": function fullscreen_set(){debugger;},});
Object.defineProperty(Document.prototype, "onfullscreenchange",{"configurable":true,"enumerable":true,"get": function onfullscreenchange_get(){debugger;return "null"},"set": function onfullscreenchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onfullscreenerror",{"configurable":true,"enumerable":true,"get": function onfullscreenerror_get(){debugger;return "null"},"set": function onfullscreenerror_set(){debugger;},});
Object.defineProperty(Document.prototype, "webkitIsFullScreen",{"configurable":true,"enumerable":true,"get": function webkitIsFullScreen_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitCurrentFullScreenElement",{"configurable":true,"enumerable":true,"get": function webkitCurrentFullScreenElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitFullscreenEnabled",{"configurable":true,"enumerable":true,"get": function webkitFullscreenEnabled_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitFullscreenElement",{"configurable":true,"enumerable":true,"get": function webkitFullscreenElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "onwebkitfullscreenchange",{"configurable":true,"enumerable":true,"get": function onwebkitfullscreenchange_get(){debugger;return "null"},"set": function onwebkitfullscreenchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkitfullscreenerror",{"configurable":true,"enumerable":true,"get": function onwebkitfullscreenerror_get(){debugger;return "null"},"set": function onwebkitfullscreenerror_set(){debugger;},});
Object.defineProperty(Document.prototype, "rootElement",{"configurable":true,"enumerable":true,"get": function rootElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "pictureInPictureEnabled",{"configurable":true,"enumerable":true,"get": function pictureInPictureEnabled_get(){debugger;return "true"},set:undefined, });
Object.defineProperty(Document.prototype, "onbeforexrselect",{"configurable":true,"enumerable":true,"get": function onbeforexrselect_get(){debugger;return "null"},"set": function onbeforexrselect_set(){debugger;},});
Object.defineProperty(Document.prototype, "onabort",{"configurable":true,"enumerable":true,"get": function onabort_get(){debugger;return "null"},"set": function onabort_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforeinput",{"configurable":true,"enumerable":true,"get": function onbeforeinput_get(){debugger;return "null"},"set": function onbeforeinput_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforematch",{"configurable":true,"enumerable":true,"get": function onbeforematch_get(){debugger;return "null"},"set": function onbeforematch_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforetoggle",{"configurable":true,"enumerable":true,"get": function onbeforetoggle_get(){debugger;return "null"},"set": function onbeforetoggle_set(){debugger;},});
Object.defineProperty(Document.prototype, "onblur",{"configurable":true,"enumerable":true,"get": function onblur_get(){debugger;return "null"},"set": function onblur_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncancel",{"configurable":true,"enumerable":true,"get": function oncancel_get(){debugger;return "null"},"set": function oncancel_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncanplay",{"configurable":true,"enumerable":true,"get": function oncanplay_get(){debugger;return "null"},"set": function oncanplay_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncanplaythrough",{"configurable":true,"enumerable":true,"get": function oncanplaythrough_get(){debugger;return "null"},"set": function oncanplaythrough_set(){debugger;},});
Object.defineProperty(Document.prototype, "onchange",{"configurable":true,"enumerable":true,"get": function onchange_get(){debugger;return "null"},"set": function onchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onclick",{"configurable":true,"enumerable":true,"get": function onclick_get(){debugger;return "null"},"set": function onclick_set(){debugger;},});
Object.defineProperty(Document.prototype, "onclose",{"configurable":true,"enumerable":true,"get": function onclose_get(){debugger;return "null"},"set": function onclose_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncontentvisibilityautostatechange",{"configurable":true,"enumerable":true,"get": function oncontentvisibilityautostatechange_get(){debugger;return "null"},"set": function oncontentvisibilityautostatechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncontextlost",{"configurable":true,"enumerable":true,"get": function oncontextlost_get(){debugger;return "null"},"set": function oncontextlost_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncontextmenu",{"configurable":true,"enumerable":true,"get": function oncontextmenu_get(){debugger;return "null"},"set": function oncontextmenu_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncontextrestored",{"configurable":true,"enumerable":true,"get": function oncontextrestored_get(){debugger;return "null"},"set": function oncontextrestored_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncuechange",{"configurable":true,"enumerable":true,"get": function oncuechange_get(){debugger;return "null"},"set": function oncuechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondblclick",{"configurable":true,"enumerable":true,"get": function ondblclick_get(){debugger;return "null"},"set": function ondblclick_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondrag",{"configurable":true,"enumerable":true,"get": function ondrag_get(){debugger;return "null"},"set": function ondrag_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragend",{"configurable":true,"enumerable":true,"get": function ondragend_get(){debugger;return "null"},"set": function ondragend_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragenter",{"configurable":true,"enumerable":true,"get": function ondragenter_get(){debugger;return "null"},"set": function ondragenter_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragleave",{"configurable":true,"enumerable":true,"get": function ondragleave_get(){debugger;return "null"},"set": function ondragleave_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragover",{"configurable":true,"enumerable":true,"get": function ondragover_get(){debugger;return "null"},"set": function ondragover_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragstart",{"configurable":true,"enumerable":true,"get": function ondragstart_get(){debugger;return "null"},"set": function ondragstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondrop",{"configurable":true,"enumerable":true,"get": function ondrop_get(){debugger;return "null"},"set": function ondrop_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondurationchange",{"configurable":true,"enumerable":true,"get": function ondurationchange_get(){debugger;return "null"},"set": function ondurationchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onemptied",{"configurable":true,"enumerable":true,"get": function onemptied_get(){debugger;return "null"},"set": function onemptied_set(){debugger;},});
Object.defineProperty(Document.prototype, "onended",{"configurable":true,"enumerable":true,"get": function onended_get(){debugger;return "null"},"set": function onended_set(){debugger;},});
Object.defineProperty(Document.prototype, "onerror",{"configurable":true,"enumerable":true,"get": function onerror_get(){debugger;return "null"},"set": function onerror_set(){debugger;},});
Object.defineProperty(Document.prototype, "onfocus",{"configurable":true,"enumerable":true,"get": function onfocus_get(){debugger;return "null"},"set": function onfocus_set(){debugger;},});
Object.defineProperty(Document.prototype, "onformdata",{"configurable":true,"enumerable":true,"get": function onformdata_get(){debugger;return "null"},"set": function onformdata_set(){debugger;},});
Object.defineProperty(Document.prototype, "oninput",{"configurable":true,"enumerable":true,"get": function oninput_get(){debugger;return "null"},"set": function oninput_set(){debugger;},});
Object.defineProperty(Document.prototype, "oninvalid",{"configurable":true,"enumerable":true,"get": function oninvalid_get(){debugger;return "null"},"set": function oninvalid_set(){debugger;},});
Object.defineProperty(Document.prototype, "onkeydown",{"configurable":true,"enumerable":true,"get": function onkeydown_get(){debugger;return "null"},"set": function onkeydown_set(){debugger;},});
Object.defineProperty(Document.prototype, "onkeypress",{"configurable":true,"enumerable":true,"get": function onkeypress_get(){debugger;return "null"},"set": function onkeypress_set(){debugger;},});
Object.defineProperty(Document.prototype, "onkeyup",{"configurable":true,"enumerable":true,"get": function onkeyup_get(){debugger;return "null"},"set": function onkeyup_set(){debugger;},});
Object.defineProperty(Document.prototype, "onload",{"configurable":true,"enumerable":true,"get": function onload_get(){debugger;return "null"},"set": function onload_set(){debugger;},});
Object.defineProperty(Document.prototype, "onloadeddata",{"configurable":true,"enumerable":true,"get": function onloadeddata_get(){debugger;return "null"},"set": function onloadeddata_set(){debugger;},});
Object.defineProperty(Document.prototype, "onloadedmetadata",{"configurable":true,"enumerable":true,"get": function onloadedmetadata_get(){debugger;return "null"},"set": function onloadedmetadata_set(){debugger;},});
Object.defineProperty(Document.prototype, "onloadstart",{"configurable":true,"enumerable":true,"get": function onloadstart_get(){debugger;return "null"},"set": function onloadstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmousedown",{"configurable":true,"enumerable":true,"get": function onmousedown_get(){debugger;return "null"},"set": function onmousedown_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseenter",{"configurable":true,"enumerable":true,"get": function onmouseenter_get(){debugger;return "null"},"set": function onmouseenter_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseleave",{"configurable":true,"enumerable":true,"get": function onmouseleave_get(){debugger;return "null"},"set": function onmouseleave_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmousemove",{"configurable":true,"enumerable":true,"get": function onmousemove_get(){debugger;return "null"},"set": function onmousemove_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseout",{"configurable":true,"enumerable":true,"get": function onmouseout_get(){debugger;return "null"},"set": function onmouseout_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseover",{"configurable":true,"enumerable":true,"get": function onmouseover_get(){debugger;return "null"},"set": function onmouseover_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseup",{"configurable":true,"enumerable":true,"get": function onmouseup_get(){debugger;return "null"},"set": function onmouseup_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmousewheel",{"configurable":true,"enumerable":true,"get": function onmousewheel_get(){debugger;return "null"},"set": function onmousewheel_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpause",{"configurable":true,"enumerable":true,"get": function onpause_get(){debugger;return "null"},"set": function onpause_set(){debugger;},});
Object.defineProperty(Document.prototype, "onplay",{"configurable":true,"enumerable":true,"get": function onplay_get(){debugger;return "null"},"set": function onplay_set(){debugger;},});
Object.defineProperty(Document.prototype, "onplaying",{"configurable":true,"enumerable":true,"get": function onplaying_get(){debugger;return "null"},"set": function onplaying_set(){debugger;},});
Object.defineProperty(Document.prototype, "onprogress",{"configurable":true,"enumerable":true,"get": function onprogress_get(){debugger;return "null"},"set": function onprogress_set(){debugger;},});
Object.defineProperty(Document.prototype, "onratechange",{"configurable":true,"enumerable":true,"get": function onratechange_get(){debugger;return "null"},"set": function onratechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onreset",{"configurable":true,"enumerable":true,"get": function onreset_get(){debugger;return "null"},"set": function onreset_set(){debugger;},});
Object.defineProperty(Document.prototype, "onresize",{"configurable":true,"enumerable":true,"get": function onresize_get(){debugger;return "null"},"set": function onresize_set(){debugger;},});
Object.defineProperty(Document.prototype, "onscroll",{"configurable":true,"enumerable":true,"get": function onscroll_get(){debugger;return "null"},"set": function onscroll_set(){debugger;},});
Object.defineProperty(Document.prototype, "onsecuritypolicyviolation",{"configurable":true,"enumerable":true,"get": function onsecuritypolicyviolation_get(){debugger;return "null"},"set": function onsecuritypolicyviolation_set(){debugger;},});
Object.defineProperty(Document.prototype, "onseeked",{"configurable":true,"enumerable":true,"get": function onseeked_get(){debugger;return "null"},"set": function onseeked_set(){debugger;},});
Object.defineProperty(Document.prototype, "onseeking",{"configurable":true,"enumerable":true,"get": function onseeking_get(){debugger;return "null"},"set": function onseeking_set(){debugger;},});
Object.defineProperty(Document.prototype, "onselect",{"configurable":true,"enumerable":true,"get": function onselect_get(){debugger;return "null"},"set": function onselect_set(){debugger;},});
Object.defineProperty(Document.prototype, "onslotchange",{"configurable":true,"enumerable":true,"get": function onslotchange_get(){debugger;return "null"},"set": function onslotchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onstalled",{"configurable":true,"enumerable":true,"get": function onstalled_get(){debugger;return "null"},"set": function onstalled_set(){debugger;},});
Object.defineProperty(Document.prototype, "onsubmit",{"configurable":true,"enumerable":true,"get": function onsubmit_get(){debugger;return "null"},"set": function onsubmit_set(){debugger;},});
Object.defineProperty(Document.prototype, "onsuspend",{"configurable":true,"enumerable":true,"get": function onsuspend_get(){debugger;return "null"},"set": function onsuspend_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontimeupdate",{"configurable":true,"enumerable":true,"get": function ontimeupdate_get(){debugger;return "null"},"set": function ontimeupdate_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontoggle",{"configurable":true,"enumerable":true,"get": function ontoggle_get(){debugger;return "null"},"set": function ontoggle_set(){debugger;},});
Object.defineProperty(Document.prototype, "onvolumechange",{"configurable":true,"enumerable":true,"get": function onvolumechange_get(){debugger;return "null"},"set": function onvolumechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwaiting",{"configurable":true,"enumerable":true,"get": function onwaiting_get(){debugger;return "null"},"set": function onwaiting_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkitanimationend",{"configurable":true,"enumerable":true,"get": function onwebkitanimationend_get(){debugger;return "null"},"set": function onwebkitanimationend_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkitanimationiteration",{"configurable":true,"enumerable":true,"get": function onwebkitanimationiteration_get(){debugger;return "null"},"set": function onwebkitanimationiteration_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkitanimationstart",{"configurable":true,"enumerable":true,"get": function onwebkitanimationstart_get(){debugger;return "null"},"set": function onwebkitanimationstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkittransitionend",{"configurable":true,"enumerable":true,"get": function onwebkittransitionend_get(){debugger;return "null"},"set": function onwebkittransitionend_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwheel",{"configurable":true,"enumerable":true,"get": function onwheel_get(){debugger;return "null"},"set": function onwheel_set(){debugger;},});
Object.defineProperty(Document.prototype, "onauxclick",{"configurable":true,"enumerable":true,"get": function onauxclick_get(){debugger;return "null"},"set": function onauxclick_set(){debugger;},});
Object.defineProperty(Document.prototype, "ongotpointercapture",{"configurable":true,"enumerable":true,"get": function ongotpointercapture_get(){debugger;return "null"},"set": function ongotpointercapture_set(){debugger;},});
Object.defineProperty(Document.prototype, "onlostpointercapture",{"configurable":true,"enumerable":true,"get": function onlostpointercapture_get(){debugger;return "null"},"set": function onlostpointercapture_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerdown",{"configurable":true,"enumerable":true,"get": function onpointerdown_get(){debugger;return "null"},"set": function onpointerdown_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointermove",{"configurable":true,"enumerable":true,"get": function onpointermove_get(){debugger;return "null"},"set": function onpointermove_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerrawupdate",{"configurable":true,"enumerable":true,"get": function onpointerrawupdate_get(){debugger;return "null"},"set": function onpointerrawupdate_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerup",{"configurable":true,"enumerable":true,"get": function onpointerup_get(){debugger;return "null"},"set": function onpointerup_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointercancel",{"configurable":true,"enumerable":true,"get": function onpointercancel_get(){debugger;return "null"},"set": function onpointercancel_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerover",{"configurable":true,"enumerable":true,"get": function onpointerover_get(){debugger;return "null"},"set": function onpointerover_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerout",{"configurable":true,"enumerable":true,"get": function onpointerout_get(){debugger;return "null"},"set": function onpointerout_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerenter",{"configurable":true,"enumerable":true,"get": function onpointerenter_get(){debugger;return "null"},"set": function onpointerenter_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerleave",{"configurable":true,"enumerable":true,"get": function onpointerleave_get(){debugger;return "null"},"set": function onpointerleave_set(){debugger;},});
Object.defineProperty(Document.prototype, "onselectstart",{"configurable":true,"enumerable":true,"get": function onselectstart_get(){debugger;return "null"},"set": function onselectstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "onselectionchange",{"configurable":true,"enumerable":true,"get": function onselectionchange_get(){debugger;return "null"},"set": function onselectionchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onanimationend",{"configurable":true,"enumerable":true,"get": function onanimationend_get(){debugger;return "null"},"set": function onanimationend_set(){debugger;},});
Object.defineProperty(Document.prototype, "onanimationiteration",{"configurable":true,"enumerable":true,"get": function onanimationiteration_get(){debugger;return "null"},"set": function onanimationiteration_set(){debugger;},});
Object.defineProperty(Document.prototype, "onanimationstart",{"configurable":true,"enumerable":true,"get": function onanimationstart_get(){debugger;return "null"},"set": function onanimationstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontransitionrun",{"configurable":true,"enumerable":true,"get": function ontransitionrun_get(){debugger;return "null"},"set": function ontransitionrun_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontransitionstart",{"configurable":true,"enumerable":true,"get": function ontransitionstart_get(){debugger;return "null"},"set": function ontransitionstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontransitionend",{"configurable":true,"enumerable":true,"get": function ontransitionend_get(){debugger;return "null"},"set": function ontransitionend_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontransitioncancel",{"configurable":true,"enumerable":true,"get": function ontransitioncancel_get(){debugger;return "null"},"set": function ontransitioncancel_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncopy",{"configurable":true,"enumerable":true,"get": function oncopy_get(){debugger;return "null"},"set": function oncopy_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncut",{"configurable":true,"enumerable":true,"get": function oncut_get(){debugger;return "null"},"set": function oncut_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpaste",{"configurable":true,"enumerable":true,"get": function onpaste_get(){debugger;return "null"},"set": function onpaste_set(){debugger;},});
Object.defineProperty(Document.prototype, "children",{"configurable":true,"enumerable":true,"get": function children_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "firstElementChild",{"configurable":true,"enumerable":true,"get": function firstElementChild_get(){debugger;return "[object HTMLHtmlElement]"},set:undefined, });
Object.defineProperty(Document.prototype, "lastElementChild",{"configurable":true,"enumerable":true,"get": function lastElementChild_get(){debugger;return "[object HTMLHtmlElement]"},set:undefined, });
Object.defineProperty(Document.prototype, "childElementCount",{"configurable":true,"enumerable":true,"get": function childElementCount_get(){debugger;return "1"},set:undefined, });
Object.defineProperty(Document.prototype, "activeElement",{"configurable":true,"enumerable":true,"get": function activeElement_get(){debugger;return "[object HTMLBodyElement]"},set:undefined, });
Object.defineProperty(Document.prototype, "styleSheets",{"configurable":true,"enumerable":true,"get": function styleSheets_get(){debugger;return "[object StyleSheetList]"},set:undefined, });
Object.defineProperty(Document.prototype, "pointerLockElement",{"configurable":true,"enumerable":true,"get": function pointerLockElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "fullscreenElement",{"configurable":true,"enumerable":true,"get": function fullscreenElement_get(){debugger;return "null"},"set": function fullscreenElement_set(){debugger;},});
Object.defineProperty(Document.prototype, "adoptedStyleSheets",{"configurable":true,"enumerable":true,"get": function adoptedStyleSheets_get(){debugger;return ""},"set": function adoptedStyleSheets_set(){debugger;},});
Object.defineProperty(Document.prototype, "pictureInPictureElement",{"configurable":true,"enumerable":true,"get": function pictureInPictureElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "fonts",{"configurable":true,"enumerable":true,"get": function fonts_get(){debugger;return "[object FontFaceSet]"},set:undefined, });
Object.defineProperty(Document.prototype, "adoptNode",{"configurable":true,"enumerable":true,"writable":true,"value": function adoptNode(){debugger;},});dogvm.safefunction(Document.prototype.adoptNode);
Object.defineProperty(Document.prototype, "append",{"configurable":true,"enumerable":true,"writable":true,"value": function append(){debugger;},});dogvm.safefunction(Document.prototype.append);
Object.defineProperty(Document.prototype, "captureEvents",{"configurable":true,"enumerable":true,"writable":true,"value": function captureEvents(){debugger;},});dogvm.safefunction(Document.prototype.captureEvents);
Object.defineProperty(Document.prototype, "caretRangeFromPoint",{"configurable":true,"enumerable":true,"writable":true,"value": function caretRangeFromPoint(){debugger;},});dogvm.safefunction(Document.prototype.caretRangeFromPoint);
Object.defineProperty(Document.prototype, "clear",{"configurable":true,"enumerable":true,"writable":true,"value": function clear(){debugger;},});dogvm.safefunction(Document.prototype.clear);
Object.defineProperty(Document.prototype, "close",{"configurable":true,"enumerable":true,"writable":true,"value": function close(){debugger;},});dogvm.safefunction(Document.prototype.close);
Object.defineProperty(Document.prototype, "createAttribute",{"configurable":true,"enumerable":true,"writable":true,"value": function createAttribute(){debugger;},});dogvm.safefunction(Document.prototype.createAttribute);
Object.defineProperty(Document.prototype, "createAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function createAttributeNS(){debugger;},});dogvm.safefunction(Document.prototype.createAttributeNS);
Object.defineProperty(Document.prototype, "createCDATASection",{"configurable":true,"enumerable":true,"writable":true,"value": function createCDATASection(){debugger;},});dogvm.safefunction(Document.prototype.createCDATASection);
Object.defineProperty(Document.prototype, "createComment",{"configurable":true,"enumerable":true,"writable":true,"value": function createComment(){debugger;},});dogvm.safefunction(Document.prototype.createComment);
Object.defineProperty(Document.prototype, "createDocumentFragment",{"configurable":true,"enumerable":true,"writable":true,"value": function createDocumentFragment(){debugger;},});dogvm.safefunction(Document.prototype.createDocumentFragment);
Object.defineProperty(Document.prototype, "createElement",{"configurable":true,"enumerable":true,"writable":true,"value": function createElement(){debugger;},});dogvm.safefunction(Document.prototype.createElement);
Object.defineProperty(Document.prototype, "createElementNS",{"configurable":true,"enumerable":true,"writable":true,"value": function createElementNS(){debugger;},});dogvm.safefunction(Document.prototype.createElementNS);
Object.defineProperty(Document.prototype, "createEvent",{"configurable":true,"enumerable":true,"writable":true,"value": function createEvent(){debugger;},});dogvm.safefunction(Document.prototype.createEvent);
Object.defineProperty(Document.prototype, "createExpression",{"configurable":true,"enumerable":true,"writable":true,"value": function createExpression(){debugger;},});dogvm.safefunction(Document.prototype.createExpression);
Object.defineProperty(Document.prototype, "createNSResolver",{"configurable":true,"enumerable":true,"writable":true,"value": function createNSResolver(){debugger;},});dogvm.safefunction(Document.prototype.createNSResolver);
Object.defineProperty(Document.prototype, "createNodeIterator",{"configurable":true,"enumerable":true,"writable":true,"value": function createNodeIterator(){debugger;},});dogvm.safefunction(Document.prototype.createNodeIterator);
Object.defineProperty(Document.prototype, "createProcessingInstruction",{"configurable":true,"enumerable":true,"writable":true,"value": function createProcessingInstruction(){debugger;},});dogvm.safefunction(Document.prototype.createProcessingInstruction);
Object.defineProperty(Document.prototype, "createRange",{"configurable":true,"enumerable":true,"writable":true,"value": function createRange(){debugger;},});dogvm.safefunction(Document.prototype.createRange);
Object.defineProperty(Document.prototype, "createTextNode",{"configurable":true,"enumerable":true,"writable":true,"value": function createTextNode(){debugger;},});dogvm.safefunction(Document.prototype.createTextNode);
Object.defineProperty(Document.prototype, "createTreeWalker",{"configurable":true,"enumerable":true,"writable":true,"value": function createTreeWalker(){debugger;},});dogvm.safefunction(Document.prototype.createTreeWalker);
Object.defineProperty(Document.prototype, "elementFromPoint",{"configurable":true,"enumerable":true,"writable":true,"value": function elementFromPoint(){debugger;},});dogvm.safefunction(Document.prototype.elementFromPoint);
Object.defineProperty(Document.prototype, "elementsFromPoint",{"configurable":true,"enumerable":true,"writable":true,"value": function elementsFromPoint(){debugger;},});dogvm.safefunction(Document.prototype.elementsFromPoint);
Object.defineProperty(Document.prototype, "evaluate",{"configurable":true,"enumerable":true,"writable":true,"value": function evaluate(){debugger;},});dogvm.safefunction(Document.prototype.evaluate);
Object.defineProperty(Document.prototype, "execCommand",{"configurable":true,"enumerable":true,"writable":true,"value": function execCommand(){debugger;},});dogvm.safefunction(Document.prototype.execCommand);
Object.defineProperty(Document.prototype, "exitFullscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function exitFullscreen(){debugger;},});dogvm.safefunction(Document.prototype.exitFullscreen);
Object.defineProperty(Document.prototype, "exitPictureInPicture",{"configurable":true,"enumerable":true,"writable":true,"value": function exitPictureInPicture(){debugger;},});dogvm.safefunction(Document.prototype.exitPictureInPicture);
Object.defineProperty(Document.prototype, "exitPointerLock",{"configurable":true,"enumerable":true,"writable":true,"value": function exitPointerLock(){debugger;},});dogvm.safefunction(Document.prototype.exitPointerLock);
Object.defineProperty(Document.prototype, "getAnimations",{"configurable":true,"enumerable":true,"writable":true,"value": function getAnimations(){debugger;},});dogvm.safefunction(Document.prototype.getAnimations);
Object.defineProperty(Document.prototype, "getElementsByClassName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByClassName(){debugger;},});dogvm.safefunction(Document.prototype.getElementsByClassName);
Object.defineProperty(Document.prototype, "getElementsByName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByName(){debugger;},});dogvm.safefunction(Document.prototype.getElementsByName);
Object.defineProperty(Document.prototype, "getElementsByTagName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByTagName(){debugger;},});dogvm.safefunction(Document.prototype.getElementsByTagName);
Object.defineProperty(Document.prototype, "getElementsByTagNameNS",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByTagNameNS(){debugger;},});dogvm.safefunction(Document.prototype.getElementsByTagNameNS);
Object.defineProperty(Document.prototype, "getSelection",{"configurable":true,"enumerable":true,"writable":true,"value": function getSelection(){debugger;},});dogvm.safefunction(Document.prototype.getSelection);
Object.defineProperty(Document.prototype, "hasFocus",{"configurable":true,"enumerable":true,"writable":true,"value": function hasFocus(){debugger;},});dogvm.safefunction(Document.prototype.hasFocus);
Object.defineProperty(Document.prototype, "hasStorageAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function hasStorageAccess(){debugger;},});dogvm.safefunction(Document.prototype.hasStorageAccess);
Object.defineProperty(Document.prototype, "hasUnpartitionedCookieAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function hasUnpartitionedCookieAccess(){debugger;},});dogvm.safefunction(Document.prototype.hasUnpartitionedCookieAccess);
Object.defineProperty(Document.prototype, "importNode",{"configurable":true,"enumerable":true,"writable":true,"value": function importNode(){debugger;},});dogvm.safefunction(Document.prototype.importNode);
Object.defineProperty(Document.prototype, "open",{"configurable":true,"enumerable":true,"writable":true,"value": function open(){debugger;},});dogvm.safefunction(Document.prototype.open);
Object.defineProperty(Document.prototype, "prepend",{"configurable":true,"enumerable":true,"writable":true,"value": function prepend(){debugger;},});dogvm.safefunction(Document.prototype.prepend);
Object.defineProperty(Document.prototype, "queryCommandEnabled",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandEnabled(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandEnabled);
Object.defineProperty(Document.prototype, "queryCommandIndeterm",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandIndeterm(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandIndeterm);
Object.defineProperty(Document.prototype, "queryCommandState",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandState(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandState);
Object.defineProperty(Document.prototype, "queryCommandSupported",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandSupported(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandSupported);
Object.defineProperty(Document.prototype, "queryCommandValue",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandValue(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandValue);
Object.defineProperty(Document.prototype, "querySelector",{"configurable":true,"enumerable":true,"writable":true,"value": function querySelector(){debugger;},});dogvm.safefunction(Document.prototype.querySelector);
Object.defineProperty(Document.prototype, "querySelectorAll",{"configurable":true,"enumerable":true,"writable":true,"value": function querySelectorAll(){debugger;},});dogvm.safefunction(Document.prototype.querySelectorAll);
Object.defineProperty(Document.prototype, "releaseEvents",{"configurable":true,"enumerable":true,"writable":true,"value": function releaseEvents(){debugger;},});dogvm.safefunction(Document.prototype.releaseEvents);
Object.defineProperty(Document.prototype, "replaceChildren",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceChildren(){debugger;},});dogvm.safefunction(Document.prototype.replaceChildren);
Object.defineProperty(Document.prototype, "requestStorageAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function requestStorageAccess(){debugger;},});dogvm.safefunction(Document.prototype.requestStorageAccess);
Object.defineProperty(Document.prototype, "requestStorageAccessFor",{"configurable":true,"enumerable":true,"writable":true,"value": function requestStorageAccessFor(){debugger;},});dogvm.safefunction(Document.prototype.requestStorageAccessFor);
Object.defineProperty(Document.prototype, "startViewTransition",{"configurable":true,"enumerable":true,"writable":true,"value": function startViewTransition(){debugger;},});dogvm.safefunction(Document.prototype.startViewTransition);
Object.defineProperty(Document.prototype, "webkitCancelFullScreen",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitCancelFullScreen(){debugger;},});dogvm.safefunction(Document.prototype.webkitCancelFullScreen);
Object.defineProperty(Document.prototype, "webkitExitFullscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitExitFullscreen(){debugger;},});dogvm.safefunction(Document.prototype.webkitExitFullscreen);
Object.defineProperty(Document.prototype, "write",{"configurable":true,"enumerable":true,"writable":true,"value": function write(){debugger;},});dogvm.safefunction(Document.prototype.write);
Object.defineProperty(Document.prototype, "writeln",{"configurable":true,"enumerable":true,"writable":true,"value": function writeln(){debugger;},});dogvm.safefunction(Document.prototype.writeln);
Object.defineProperty(Document.prototype, "fragmentDirective",{"configurable":true,"enumerable":true,"get": function fragmentDirective_get(){debugger;return "[object FragmentDirective]"},set:undefined, });
Object.defineProperty(Document.prototype, "browsingTopics",{"configurable":true,"enumerable":true,"writable":true,"value": function browsingTopics(){debugger;},});dogvm.safefunction(Document.prototype.browsingTopics);
Object.defineProperty(Document.prototype, "hasPrivateToken",{"configurable":true,"enumerable":true,"writable":true,"value": function hasPrivateToken(){debugger;},});dogvm.safefunction(Document.prototype.hasPrivateToken);
Object.defineProperty(Document.prototype, "hasRedemptionRecord",{"configurable":true,"enumerable":true,"writable":true,"value": function hasRedemptionRecord(){debugger;},});dogvm.safefunction(Document.prototype.hasRedemptionRecord);
Object.defineProperty(Document.prototype, "onscrollend",{"configurable":true,"enumerable":true,"get": function onscrollend_get(){debugger;return "null"},"set": function onscrollend_set(){debugger;},});
Object.defineProperty(Document.prototype, "onscrollsnapchange",{"configurable":true,"enumerable":true,"get": function onscrollsnapchange_get(){debugger;return "null"},"set": function onscrollsnapchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onscrollsnapchanging",{"configurable":true,"enumerable":true,"get": function onscrollsnapchanging_get(){debugger;return "null"},"set": function onscrollsnapchanging_set(){debugger;},});
Object.defineProperty(Document.prototype, "caretPositionFromPoint",{"configurable":true,"enumerable":true,"writable":true,"value": function caretPositionFromPoint(){debugger;},});dogvm.safefunction(Document.prototype.caretPositionFromPoint);


Object.defineProperty(Document.prototype, "head",{"configurable":true,"enumerable":true,
    "get": function head_get(){
        debugger;
        return HTMLHeadElement.headDog;
    },set:undefined, });


Object.defineProperty(Document.prototype, "body",{"configurable":true,"enumerable":true,
    "get": function body_get(){
    debugger;return HTMLBodyElement.bodyDog;
},"set": function body_set(){debugger;},});


Object.defineProperty(Document.prototype, "documentElement",{"configurable":true,"enumerable":true,
    "get": function documentElement_get(){
        debugger;return HTMLHtmlElement.createHtmlElementDog();
    },set:undefined, });

Object.defineProperty(Document.prototype, "getElementById",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function getElementById(id) {
        debugger;
        let element = dogvm.memory.htmlId.find(e => e.id === id);
        // 先判断是否创建过 没有创建过就去创建 创建过的去内存寻址
        for (const [key, value] of dogvm.memory.htmlNode ) {
            for(let p in value){
                if (value[p] instanceof Element && value[p].getAttribute("id") == id) {
                    return value[p];
                }
            }
        }

        if (element) {
            let a = document.createElement(element.tag);
            a._id = element.id;
            a._tagName = element.tag;
            a.innerHTML = element.content;
            a.parentList = element.parentList;
            return a;
        }
        return null;
},});dogvm.safefunction(Document.prototype.getElementById);

var my_cookie_dog = "";
Object.defineProperty(Document.prototype, "cookie",{"configurable":true,"enumerable":true,
    "get": function cookie_get(){
        debugger;
        return my_cookie_dog;
    },
    "set": function cookie_set(value){
        debugger;
        console.log("cookie设置:",value)
        my_cookie_dog = value;
        return value;
    },});

//////////////////////////


// HTMLDocument
var HTMLDocument = function HTMLDocument(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLDocument);

Object.defineProperties(HTMLDocument.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLDocument",
        configurable: true
    }
});
HTMLDocument.prototype.__proto__ = Document.prototype;


// document
document = {};
document.__proto__ = HTMLDocument.prototype;

// document属性方法
document.createElement = function createElement(tagName) {
    debugger
    tagName = tagName.toLowerCase();
    tagName = tagName.replace(/\d+/g, '')
    if (dogvm.memory.htmlelements[tagName] == undefined) {
        debugger;
    } else {
        var tagElement = dogvm.memory.htmlelements[tagName]();
        tagElement._tagName = tagName;
        return dogvm.proxy(tagElement);
    }
};
dogvm.safefunction(document.createElement);

document.location = location;
Object.defineProperty(document, "_reactListeningmdo4y3a4jz",{"configurable":true,"enumerable":true,"writable":true,"value":true,});
Object.defineProperty(document, "form_name_1735543137199",{"configurable":true,"enumerable":true,"writable":true,"value":{},});


document = dogvm.proxy(document);