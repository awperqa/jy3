// HTMLElement
var HTMLElement = function HTMLElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLElement);

Object.defineProperties(HTMLElement.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLElement",
        configurable: true
    }
});

HTMLElement.prototype.__proto__ = Element.prototype;

// HTMLElement属性
Object.defineProperty(HTMLElement.prototype, "title",{"configurable":true,"enumerable":true,"get": function title_get(){},"set": function title_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "lang",{"configurable":true,"enumerable":true,"get": function lang_get(){},"set": function lang_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "translate",{"configurable":true,"enumerable":true,"get": function translate_get(){},"set": function translate_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "dir",{"configurable":true,"enumerable":true,"get": function dir_get(){},"set": function dir_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "hidden",{"configurable":true,"enumerable":true,"get": function hidden_get(){},"set": function hidden_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "inert",{"configurable":true,"enumerable":true,"get": function inert_get(){},"set": function inert_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "accessKey",{"configurable":true,"enumerable":true,"get": function accessKey_get(){},"set": function accessKey_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "draggable",{"configurable":true,"enumerable":true,"get": function draggable_get(){},"set": function draggable_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "spellcheck",{"configurable":true,"enumerable":true,"get": function spellcheck_get(){},"set": function spellcheck_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "autocapitalize",{"configurable":true,"enumerable":true,"get": function autocapitalize_get(){},"set": function autocapitalize_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "editContext",{"configurable":true,"enumerable":true,"get": function editContext_get(){},"set": function editContext_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "contentEditable",{"configurable":true,"enumerable":true,"get": function contentEditable_get(){},"set": function contentEditable_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "enterKeyHint",{"configurable":true,"enumerable":true,"get": function enterKeyHint_get(){},"set": function enterKeyHint_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "isContentEditable",{"configurable":true,"enumerable":true,"get": function isContentEditable_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "inputMode",{"configurable":true,"enumerable":true,"get": function inputMode_get(){},"set": function inputMode_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "virtualKeyboardPolicy",{"configurable":true,"enumerable":true,"get": function virtualKeyboardPolicy_get(){},"set": function virtualKeyboardPolicy_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "offsetParent",{"configurable":true,"enumerable":true,"get": function offsetParent_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "offsetTop",{"configurable":true,"enumerable":true,"get": function offsetTop_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "offsetLeft",{"configurable":true,"enumerable":true,"get": function offsetLeft_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "offsetWidth",{"configurable":true,"enumerable":true,"get": function offsetWidth_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "offsetHeight",{"configurable":true,"enumerable":true,"get": function offsetHeight_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "popover",{"configurable":true,"enumerable":true,"get": function popover_get(){},"set": function popover_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "innerText",{"configurable":true,"enumerable":true,"get": function innerText_get(){},"set": function innerText_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "outerText",{"configurable":true,"enumerable":true,"get": function outerText_get(){},"set": function outerText_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "writingSuggestions",{"configurable":true,"enumerable":true,"get": function writingSuggestions_get(){},"set": function writingSuggestions_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onbeforexrselect",{"configurable":true,"enumerable":true,"get": function onbeforexrselect_get(){},"set": function onbeforexrselect_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onabort",{"configurable":true,"enumerable":true,"get": function onabort_get(){},"set": function onabort_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onbeforeinput",{"configurable":true,"enumerable":true,"get": function onbeforeinput_get(){},"set": function onbeforeinput_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onbeforematch",{"configurable":true,"enumerable":true,"get": function onbeforematch_get(){},"set": function onbeforematch_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onbeforetoggle",{"configurable":true,"enumerable":true,"get": function onbeforetoggle_get(){},"set": function onbeforetoggle_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onblur",{"configurable":true,"enumerable":true,"get": function onblur_get(){},"set": function onblur_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncancel",{"configurable":true,"enumerable":true,"get": function oncancel_get(){},"set": function oncancel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncanplay",{"configurable":true,"enumerable":true,"get": function oncanplay_get(){},"set": function oncanplay_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncanplaythrough",{"configurable":true,"enumerable":true,"get": function oncanplaythrough_get(){},"set": function oncanplaythrough_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onchange",{"configurable":true,"enumerable":true,"get": function onchange_get(){},"set": function onchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onclick",{"configurable":true,"enumerable":true,"get": function onclick_get(){},"set": function onclick_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onclose",{"configurable":true,"enumerable":true,"get": function onclose_get(){},"set": function onclose_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncontentvisibilityautostatechange",{"configurable":true,"enumerable":true,"get": function oncontentvisibilityautostatechange_get(){},"set": function oncontentvisibilityautostatechange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncontextlost",{"configurable":true,"enumerable":true,"get": function oncontextlost_get(){},"set": function oncontextlost_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncontextmenu",{"configurable":true,"enumerable":true,"get": function oncontextmenu_get(){},"set": function oncontextmenu_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncontextrestored",{"configurable":true,"enumerable":true,"get": function oncontextrestored_get(){},"set": function oncontextrestored_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncuechange",{"configurable":true,"enumerable":true,"get": function oncuechange_get(){},"set": function oncuechange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondblclick",{"configurable":true,"enumerable":true,"get": function ondblclick_get(){},"set": function ondblclick_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondrag",{"configurable":true,"enumerable":true,"get": function ondrag_get(){},"set": function ondrag_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragend",{"configurable":true,"enumerable":true,"get": function ondragend_get(){},"set": function ondragend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragenter",{"configurable":true,"enumerable":true,"get": function ondragenter_get(){},"set": function ondragenter_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragleave",{"configurable":true,"enumerable":true,"get": function ondragleave_get(){},"set": function ondragleave_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragover",{"configurable":true,"enumerable":true,"get": function ondragover_get(){},"set": function ondragover_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragstart",{"configurable":true,"enumerable":true,"get": function ondragstart_get(){},"set": function ondragstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondrop",{"configurable":true,"enumerable":true,"get": function ondrop_get(){},"set": function ondrop_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondurationchange",{"configurable":true,"enumerable":true,"get": function ondurationchange_get(){},"set": function ondurationchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onemptied",{"configurable":true,"enumerable":true,"get": function onemptied_get(){},"set": function onemptied_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onended",{"configurable":true,"enumerable":true,"get": function onended_get(){},"set": function onended_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onerror",{"configurable":true,"enumerable":true,"get": function onerror_get(){},"set": function onerror_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onfocus",{"configurable":true,"enumerable":true,"get": function onfocus_get(){},"set": function onfocus_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onformdata",{"configurable":true,"enumerable":true,"get": function onformdata_get(){},"set": function onformdata_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oninput",{"configurable":true,"enumerable":true,"get": function oninput_get(){},"set": function oninput_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oninvalid",{"configurable":true,"enumerable":true,"get": function oninvalid_get(){},"set": function oninvalid_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onkeydown",{"configurable":true,"enumerable":true,"get": function onkeydown_get(){},"set": function onkeydown_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onkeypress",{"configurable":true,"enumerable":true,"get": function onkeypress_get(){},"set": function onkeypress_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onkeyup",{"configurable":true,"enumerable":true,"get": function onkeyup_get(){},"set": function onkeyup_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onload",{"configurable":true,"enumerable":true,"get": function onload_get(){},"set": function onload_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onloadeddata",{"configurable":true,"enumerable":true,"get": function onloadeddata_get(){},"set": function onloadeddata_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onloadedmetadata",{"configurable":true,"enumerable":true,"get": function onloadedmetadata_get(){},"set": function onloadedmetadata_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onloadstart",{"configurable":true,"enumerable":true,"get": function onloadstart_get(){},"set": function onloadstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmousedown",{"configurable":true,"enumerable":true,"get": function onmousedown_get(){},"set": function onmousedown_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseenter",{"configurable":true,"enumerable":true,"get": function onmouseenter_get(){},"set": function onmouseenter_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseleave",{"configurable":true,"enumerable":true,"get": function onmouseleave_get(){},"set": function onmouseleave_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmousemove",{"configurable":true,"enumerable":true,"get": function onmousemove_get(){},"set": function onmousemove_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseout",{"configurable":true,"enumerable":true,"get": function onmouseout_get(){},"set": function onmouseout_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseover",{"configurable":true,"enumerable":true,"get": function onmouseover_get(){},"set": function onmouseover_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseup",{"configurable":true,"enumerable":true,"get": function onmouseup_get(){},"set": function onmouseup_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmousewheel",{"configurable":true,"enumerable":true,"get": function onmousewheel_get(){},"set": function onmousewheel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpause",{"configurable":true,"enumerable":true,"get": function onpause_get(){},"set": function onpause_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onplay",{"configurable":true,"enumerable":true,"get": function onplay_get(){},"set": function onplay_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onplaying",{"configurable":true,"enumerable":true,"get": function onplaying_get(){},"set": function onplaying_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onprogress",{"configurable":true,"enumerable":true,"get": function onprogress_get(){},"set": function onprogress_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onratechange",{"configurable":true,"enumerable":true,"get": function onratechange_get(){},"set": function onratechange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onreset",{"configurable":true,"enumerable":true,"get": function onreset_get(){},"set": function onreset_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onresize",{"configurable":true,"enumerable":true,"get": function onresize_get(){},"set": function onresize_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onscroll",{"configurable":true,"enumerable":true,"get": function onscroll_get(){},"set": function onscroll_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onsecuritypolicyviolation",{"configurable":true,"enumerable":true,"get": function onsecuritypolicyviolation_get(){},"set": function onsecuritypolicyviolation_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onseeked",{"configurable":true,"enumerable":true,"get": function onseeked_get(){},"set": function onseeked_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onseeking",{"configurable":true,"enumerable":true,"get": function onseeking_get(){},"set": function onseeking_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onselect",{"configurable":true,"enumerable":true,"get": function onselect_get(){},"set": function onselect_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onslotchange",{"configurable":true,"enumerable":true,"get": function onslotchange_get(){},"set": function onslotchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onstalled",{"configurable":true,"enumerable":true,"get": function onstalled_get(){},"set": function onstalled_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onsubmit",{"configurable":true,"enumerable":true,"get": function onsubmit_get(){},"set": function onsubmit_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onsuspend",{"configurable":true,"enumerable":true,"get": function onsuspend_get(){},"set": function onsuspend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontimeupdate",{"configurable":true,"enumerable":true,"get": function ontimeupdate_get(){},"set": function ontimeupdate_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontoggle",{"configurable":true,"enumerable":true,"get": function ontoggle_get(){},"set": function ontoggle_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onvolumechange",{"configurable":true,"enumerable":true,"get": function onvolumechange_get(){},"set": function onvolumechange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwaiting",{"configurable":true,"enumerable":true,"get": function onwaiting_get(){},"set": function onwaiting_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwebkitanimationend",{"configurable":true,"enumerable":true,"get": function onwebkitanimationend_get(){},"set": function onwebkitanimationend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwebkitanimationiteration",{"configurable":true,"enumerable":true,"get": function onwebkitanimationiteration_get(){},"set": function onwebkitanimationiteration_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwebkitanimationstart",{"configurable":true,"enumerable":true,"get": function onwebkitanimationstart_get(){},"set": function onwebkitanimationstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwebkittransitionend",{"configurable":true,"enumerable":true,"get": function onwebkittransitionend_get(){},"set": function onwebkittransitionend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwheel",{"configurable":true,"enumerable":true,"get": function onwheel_get(){},"set": function onwheel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onauxclick",{"configurable":true,"enumerable":true,"get": function onauxclick_get(){},"set": function onauxclick_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ongotpointercapture",{"configurable":true,"enumerable":true,"get": function ongotpointercapture_get(){},"set": function ongotpointercapture_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onlostpointercapture",{"configurable":true,"enumerable":true,"get": function onlostpointercapture_get(){},"set": function onlostpointercapture_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerdown",{"configurable":true,"enumerable":true,"get": function onpointerdown_get(){},"set": function onpointerdown_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointermove",{"configurable":true,"enumerable":true,"get": function onpointermove_get(){},"set": function onpointermove_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerrawupdate",{"configurable":true,"enumerable":true,"get": function onpointerrawupdate_get(){},"set": function onpointerrawupdate_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerup",{"configurable":true,"enumerable":true,"get": function onpointerup_get(){},"set": function onpointerup_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointercancel",{"configurable":true,"enumerable":true,"get": function onpointercancel_get(){},"set": function onpointercancel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerover",{"configurable":true,"enumerable":true,"get": function onpointerover_get(){},"set": function onpointerover_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerout",{"configurable":true,"enumerable":true,"get": function onpointerout_get(){},"set": function onpointerout_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerenter",{"configurable":true,"enumerable":true,"get": function onpointerenter_get(){},"set": function onpointerenter_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerleave",{"configurable":true,"enumerable":true,"get": function onpointerleave_get(){},"set": function onpointerleave_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onselectstart",{"configurable":true,"enumerable":true,"get": function onselectstart_get(){},"set": function onselectstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onselectionchange",{"configurable":true,"enumerable":true,"get": function onselectionchange_get(){},"set": function onselectionchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onanimationend",{"configurable":true,"enumerable":true,"get": function onanimationend_get(){},"set": function onanimationend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onanimationiteration",{"configurable":true,"enumerable":true,"get": function onanimationiteration_get(){},"set": function onanimationiteration_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onanimationstart",{"configurable":true,"enumerable":true,"get": function onanimationstart_get(){},"set": function onanimationstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontransitionrun",{"configurable":true,"enumerable":true,"get": function ontransitionrun_get(){},"set": function ontransitionrun_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontransitionstart",{"configurable":true,"enumerable":true,"get": function ontransitionstart_get(){},"set": function ontransitionstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontransitionend",{"configurable":true,"enumerable":true,"get": function ontransitionend_get(){},"set": function ontransitionend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontransitioncancel",{"configurable":true,"enumerable":true,"get": function ontransitioncancel_get(){},"set": function ontransitioncancel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncopy",{"configurable":true,"enumerable":true,"get": function oncopy_get(){},"set": function oncopy_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncut",{"configurable":true,"enumerable":true,"get": function oncut_get(){},"set": function oncut_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpaste",{"configurable":true,"enumerable":true,"get": function onpaste_get(){},"set": function onpaste_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "dataset",{"configurable":true,"enumerable":true,"get": function dataset_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "nonce",{"configurable":true,"enumerable":true,"get": function nonce_get(){},"set": function nonce_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "autofocus",{"configurable":true,"enumerable":true,"get": function autofocus_get(){},"set": function autofocus_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "tabIndex",{"configurable":true,"enumerable":true,"get": function tabIndex_get(){},"set": function tabIndex_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "attributeStyleMap",{"configurable":true,"enumerable":true,"get": function attributeStyleMap_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "attachInternals",{"configurable":true,"enumerable":true,"writable":true,"value": function attachInternals(){debugger;},});dogvm.safefunction(HTMLElement.prototype.attachInternals);
Object.defineProperty(HTMLElement.prototype, "blur",{"configurable":true,"enumerable":true,"writable":true,"value": function blur(){debugger;},});dogvm.safefunction(HTMLElement.prototype.blur);
Object.defineProperty(HTMLElement.prototype, "click",{"configurable":true,"enumerable":true,"writable":true,"value": function click(){debugger;},});dogvm.safefunction(HTMLElement.prototype.click);
Object.defineProperty(HTMLElement.prototype, "focus",{"configurable":true,"enumerable":true,"writable":true,"value": function focus(){debugger;},});dogvm.safefunction(HTMLElement.prototype.focus);
Object.defineProperty(HTMLElement.prototype, "hidePopover",{"configurable":true,"enumerable":true,"writable":true,"value": function hidePopover(){debugger;},});dogvm.safefunction(HTMLElement.prototype.hidePopover);
Object.defineProperty(HTMLElement.prototype, "showPopover",{"configurable":true,"enumerable":true,"writable":true,"value": function showPopover(){debugger;},});dogvm.safefunction(HTMLElement.prototype.showPopover);
Object.defineProperty(HTMLElement.prototype, "togglePopover",{"configurable":true,"enumerable":true,"writable":true,"value": function togglePopover(){debugger;},});dogvm.safefunction(HTMLElement.prototype.togglePopover);
Object.defineProperty(HTMLElement.prototype, "onscrollend",{"configurable":true,"enumerable":true,"get": function onscrollend_get(){},"set": function onscrollend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onscrollsnapchange",{"configurable":true,"enumerable":true,"get": function onscrollsnapchange_get(){},"set": function onscrollsnapchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onscrollsnapchanging",{"configurable":true,"enumerable":true,"get": function onscrollsnapchanging_get(){},"set": function onscrollsnapchanging_set(){debugger;},});
Object.setPrototypeOf(HTMLElement.prototype, Element.prototype);


/////////////////////// 默认返回一个CSSStyleDeclaration对象  如果元素内容特殊 再在单独里面去重写
Object.defineProperty(HTMLElement.prototype, "style",{"configurable":true,"enumerable":true,
    "get": function style_get(){
        debugger;
        return CSSStyleDeclaration.createCSSStyleDog();
    },"set": function style_set(){debugger;},});


dogvm.safeproperty(HTMLElement);