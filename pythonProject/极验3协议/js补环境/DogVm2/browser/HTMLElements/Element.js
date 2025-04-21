// Element
var Element = function Element(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(Element);

Object.defineProperties(Element.prototype, {
    [Symbol.toStringTag]: {
        value: "Element",
        configurable: true
    }
});

Object.defineProperties(Element.prototype, {
    [Symbol.unscopables]: {
        value: {
            after: true,
            append: true,
            before: true,
            prepend: true,
            remove: true,
            replaceChildren: true,
            replaceWith: true,
            slot: true
        },
        configurable: true
    }
});

Element.prototype.__proto__ = Node.prototype;

// Element属性
Object.defineProperty(Element.prototype, "namespaceURI",{"configurable":true,"enumerable":true,"get": function namespaceURI_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "prefix",{"configurable":true,"enumerable":true,"get": function prefix_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "localName",{"configurable":true,"enumerable":true,"get": function localName_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "id",{"configurable":true,"enumerable":true,"get": function id_get(){return this._id;},"set": function id_set(){debugger;},});
Object.defineProperty(Element.prototype, "className",{"configurable":true,"enumerable":true,"get": function className_get(){},"set": function className_set(){debugger;},});
Object.defineProperty(Element.prototype, "classList",{"configurable":true,"enumerable":true,"get": function classList_get(){},"set": function classList_set(){debugger;},});
Object.defineProperty(Element.prototype, "slot",{"configurable":true,"enumerable":true,"get": function slot_get(){},"set": function slot_set(){debugger;},});
Object.defineProperty(Element.prototype, "shadowRoot",{"configurable":true,"enumerable":true,"get": function shadowRoot_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "part",{"configurable":true,"enumerable":true,"get": function part_get(){},"set": function part_set(){debugger;},});
Object.defineProperty(Element.prototype, "assignedSlot",{"configurable":true,"enumerable":true,"get": function assignedSlot_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "scrollTop",{"configurable":true,"enumerable":true,"get": function scrollTop_get(){},"set": function scrollTop_set(){debugger;},});
Object.defineProperty(Element.prototype, "scrollLeft",{"configurable":true,"enumerable":true,"get": function scrollLeft_get(){},"set": function scrollLeft_set(){debugger;},});
Object.defineProperty(Element.prototype, "scrollWidth",{"configurable":true,"enumerable":true,"get": function scrollWidth_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "scrollHeight",{"configurable":true,"enumerable":true,"get": function scrollHeight_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "clientTop",{"configurable":true,"enumerable":true,"get": function clientTop_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "clientLeft",{"configurable":true,"enumerable":true,"get": function clientLeft_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "clientWidth",{"configurable":true,"enumerable":true,"get": function clientWidth_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "clientHeight",{"configurable":true,"enumerable":true,"get": function clientHeight_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "onbeforecopy",{"configurable":true,"enumerable":true,"get": function onbeforecopy_get(){},"set": function onbeforecopy_set(){debugger;},});
Object.defineProperty(Element.prototype, "onbeforecut",{"configurable":true,"enumerable":true,"get": function onbeforecut_get(){},"set": function onbeforecut_set(){debugger;},});
Object.defineProperty(Element.prototype, "onbeforepaste",{"configurable":true,"enumerable":true,"get": function onbeforepaste_get(){},"set": function onbeforepaste_set(){debugger;},});
Object.defineProperty(Element.prototype, "onsearch",{"configurable":true,"enumerable":true,"get": function onsearch_get(){},"set": function onsearch_set(){debugger;},});
Object.defineProperty(Element.prototype, "elementTiming",{"configurable":true,"enumerable":true,"get": function elementTiming_get(){},"set": function elementTiming_set(){debugger;},});
Object.defineProperty(Element.prototype, "onfullscreenchange",{"configurable":true,"enumerable":true,"get": function onfullscreenchange_get(){},"set": function onfullscreenchange_set(){debugger;},});
Object.defineProperty(Element.prototype, "onfullscreenerror",{"configurable":true,"enumerable":true,"get": function onfullscreenerror_get(){},"set": function onfullscreenerror_set(){debugger;},});
Object.defineProperty(Element.prototype, "onwebkitfullscreenchange",{"configurable":true,"enumerable":true,"get": function onwebkitfullscreenchange_get(){},"set": function onwebkitfullscreenchange_set(){debugger;},});
Object.defineProperty(Element.prototype, "onwebkitfullscreenerror",{"configurable":true,"enumerable":true,"get": function onwebkitfullscreenerror_get(){},"set": function onwebkitfullscreenerror_set(){debugger;},});
Object.defineProperty(Element.prototype, "role",{"configurable":true,"enumerable":true,"get": function role_get(){},"set": function role_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaAtomic",{"configurable":true,"enumerable":true,"get": function ariaAtomic_get(){},"set": function ariaAtomic_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaAutoComplete",{"configurable":true,"enumerable":true,"get": function ariaAutoComplete_get(){},"set": function ariaAutoComplete_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaBusy",{"configurable":true,"enumerable":true,"get": function ariaBusy_get(){},"set": function ariaBusy_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaBrailleLabel",{"configurable":true,"enumerable":true,"get": function ariaBrailleLabel_get(){},"set": function ariaBrailleLabel_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaBrailleRoleDescription",{"configurable":true,"enumerable":true,"get": function ariaBrailleRoleDescription_get(){},"set": function ariaBrailleRoleDescription_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaChecked",{"configurable":true,"enumerable":true,"get": function ariaChecked_get(){},"set": function ariaChecked_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaColCount",{"configurable":true,"enumerable":true,"get": function ariaColCount_get(){},"set": function ariaColCount_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaColIndex",{"configurable":true,"enumerable":true,"get": function ariaColIndex_get(){},"set": function ariaColIndex_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaColSpan",{"configurable":true,"enumerable":true,"get": function ariaColSpan_get(){},"set": function ariaColSpan_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaCurrent",{"configurable":true,"enumerable":true,"get": function ariaCurrent_get(){},"set": function ariaCurrent_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaDescription",{"configurable":true,"enumerable":true,"get": function ariaDescription_get(){},"set": function ariaDescription_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaDisabled",{"configurable":true,"enumerable":true,"get": function ariaDisabled_get(){},"set": function ariaDisabled_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaExpanded",{"configurable":true,"enumerable":true,"get": function ariaExpanded_get(){},"set": function ariaExpanded_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaHasPopup",{"configurable":true,"enumerable":true,"get": function ariaHasPopup_get(){},"set": function ariaHasPopup_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaHidden",{"configurable":true,"enumerable":true,"get": function ariaHidden_get(){},"set": function ariaHidden_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaInvalid",{"configurable":true,"enumerable":true,"get": function ariaInvalid_get(){},"set": function ariaInvalid_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaKeyShortcuts",{"configurable":true,"enumerable":true,"get": function ariaKeyShortcuts_get(){},"set": function ariaKeyShortcuts_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaLabel",{"configurable":true,"enumerable":true,"get": function ariaLabel_get(){},"set": function ariaLabel_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaLevel",{"configurable":true,"enumerable":true,"get": function ariaLevel_get(){},"set": function ariaLevel_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaLive",{"configurable":true,"enumerable":true,"get": function ariaLive_get(){},"set": function ariaLive_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaModal",{"configurable":true,"enumerable":true,"get": function ariaModal_get(){},"set": function ariaModal_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaMultiLine",{"configurable":true,"enumerable":true,"get": function ariaMultiLine_get(){},"set": function ariaMultiLine_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaMultiSelectable",{"configurable":true,"enumerable":true,"get": function ariaMultiSelectable_get(){},"set": function ariaMultiSelectable_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaOrientation",{"configurable":true,"enumerable":true,"get": function ariaOrientation_get(){},"set": function ariaOrientation_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaPlaceholder",{"configurable":true,"enumerable":true,"get": function ariaPlaceholder_get(){},"set": function ariaPlaceholder_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaPosInSet",{"configurable":true,"enumerable":true,"get": function ariaPosInSet_get(){},"set": function ariaPosInSet_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaPressed",{"configurable":true,"enumerable":true,"get": function ariaPressed_get(){},"set": function ariaPressed_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaReadOnly",{"configurable":true,"enumerable":true,"get": function ariaReadOnly_get(){},"set": function ariaReadOnly_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRelevant",{"configurable":true,"enumerable":true,"get": function ariaRelevant_get(){},"set": function ariaRelevant_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRequired",{"configurable":true,"enumerable":true,"get": function ariaRequired_get(){},"set": function ariaRequired_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRoleDescription",{"configurable":true,"enumerable":true,"get": function ariaRoleDescription_get(){},"set": function ariaRoleDescription_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRowCount",{"configurable":true,"enumerable":true,"get": function ariaRowCount_get(){},"set": function ariaRowCount_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRowIndex",{"configurable":true,"enumerable":true,"get": function ariaRowIndex_get(){},"set": function ariaRowIndex_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRowSpan",{"configurable":true,"enumerable":true,"get": function ariaRowSpan_get(){},"set": function ariaRowSpan_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaSelected",{"configurable":true,"enumerable":true,"get": function ariaSelected_get(){},"set": function ariaSelected_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaSetSize",{"configurable":true,"enumerable":true,"get": function ariaSetSize_get(){},"set": function ariaSetSize_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaSort",{"configurable":true,"enumerable":true,"get": function ariaSort_get(){},"set": function ariaSort_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaValueMax",{"configurable":true,"enumerable":true,"get": function ariaValueMax_get(){},"set": function ariaValueMax_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaValueMin",{"configurable":true,"enumerable":true,"get": function ariaValueMin_get(){},"set": function ariaValueMin_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaValueNow",{"configurable":true,"enumerable":true,"get": function ariaValueNow_get(){},"set": function ariaValueNow_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaValueText",{"configurable":true,"enumerable":true,"get": function ariaValueText_get(){},"set": function ariaValueText_set(){debugger;},});
Object.defineProperty(Element.prototype, "firstElementChild",{"configurable":true,"enumerable":true,"get": function firstElementChild_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "lastElementChild",{"configurable":true,"enumerable":true,"get": function lastElementChild_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "childElementCount",{"configurable":true,"enumerable":true,"get": function childElementCount_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "previousElementSibling",{"configurable":true,"enumerable":true,"get": function previousElementSibling_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "nextElementSibling",{"configurable":true,"enumerable":true,"get": function nextElementSibling_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "after",{"configurable":true,"enumerable":true,"writable":true,"value": function after(){debugger;},});dogvm.safefunction(Element.prototype.after);
Object.defineProperty(Element.prototype, "animate",{"configurable":true,"enumerable":true,"writable":true,"value": function animate(){debugger;},});dogvm.safefunction(Element.prototype.animate);
Object.defineProperty(Element.prototype, "append",{"configurable":true,"enumerable":true,"writable":true,"value": function append(){debugger;},});dogvm.safefunction(Element.prototype.append);
Object.defineProperty(Element.prototype, "attachShadow",{"configurable":true,"enumerable":true,"writable":true,"value": function attachShadow(){debugger;},});dogvm.safefunction(Element.prototype.attachShadow);
Object.defineProperty(Element.prototype, "before",{"configurable":true,"enumerable":true,"writable":true,"value": function before(){debugger;},});dogvm.safefunction(Element.prototype.before);
Object.defineProperty(Element.prototype, "checkVisibility",{"configurable":true,"enumerable":true,"writable":true,"value": function checkVisibility(){debugger;},});dogvm.safefunction(Element.prototype.checkVisibility);
Object.defineProperty(Element.prototype, "closest",{"configurable":true,"enumerable":true,"writable":true,"value": function closest(){debugger;},});dogvm.safefunction(Element.prototype.closest);
Object.defineProperty(Element.prototype, "computedStyleMap",{"configurable":true,"enumerable":true,"writable":true,"value": function computedStyleMap(){debugger;},});dogvm.safefunction(Element.prototype.computedStyleMap);
Object.defineProperty(Element.prototype, "getAnimations",{"configurable":true,"enumerable":true,"writable":true,"value": function getAnimations(){debugger;},});dogvm.safefunction(Element.prototype.getAnimations);
Object.defineProperty(Element.prototype, "getAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttributeNS(){debugger;},});dogvm.safefunction(Element.prototype.getAttributeNS);
Object.defineProperty(Element.prototype, "getAttributeNames",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttributeNames(){debugger;},});dogvm.safefunction(Element.prototype.getAttributeNames);
Object.defineProperty(Element.prototype, "getAttributeNode",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttributeNode(){debugger;},});dogvm.safefunction(Element.prototype.getAttributeNode);
Object.defineProperty(Element.prototype, "getAttributeNodeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttributeNodeNS(){debugger;},});dogvm.safefunction(Element.prototype.getAttributeNodeNS);
Object.defineProperty(Element.prototype, "getBoundingClientRect",{"configurable":true,"enumerable":true,"writable":true,"value": function getBoundingClientRect(){debugger;},});dogvm.safefunction(Element.prototype.getBoundingClientRect);
Object.defineProperty(Element.prototype, "getClientRects",{"configurable":true,"enumerable":true,"writable":true,"value": function getClientRects(){debugger;},});dogvm.safefunction(Element.prototype.getClientRects);
Object.defineProperty(Element.prototype, "getElementsByClassName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByClassName(){debugger;},});dogvm.safefunction(Element.prototype.getElementsByClassName);
Object.defineProperty(Element.prototype, "getElementsByTagName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByTagName(){debugger;},});dogvm.safefunction(Element.prototype.getElementsByTagName);
Object.defineProperty(Element.prototype, "getElementsByTagNameNS",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByTagNameNS(){debugger;},});dogvm.safefunction(Element.prototype.getElementsByTagNameNS);
Object.defineProperty(Element.prototype, "getHTML",{"configurable":true,"enumerable":true,"writable":true,"value": function getHTML(){debugger;},});dogvm.safefunction(Element.prototype.getHTML);
Object.defineProperty(Element.prototype, "hasAttribute",{"configurable":true,"enumerable":true,"writable":true,"value": function hasAttribute(){debugger;},});dogvm.safefunction(Element.prototype.hasAttribute);
Object.defineProperty(Element.prototype, "hasAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function hasAttributeNS(){debugger;},});dogvm.safefunction(Element.prototype.hasAttributeNS);
Object.defineProperty(Element.prototype, "hasAttributes",{"configurable":true,"enumerable":true,"writable":true,"value": function hasAttributes(){debugger;},});dogvm.safefunction(Element.prototype.hasAttributes);
Object.defineProperty(Element.prototype, "hasPointerCapture",{"configurable":true,"enumerable":true,"writable":true,"value": function hasPointerCapture(){debugger;},});dogvm.safefunction(Element.prototype.hasPointerCapture);
Object.defineProperty(Element.prototype, "insertAdjacentElement",{"configurable":true,"enumerable":true,"writable":true,"value": function insertAdjacentElement(){debugger;},});dogvm.safefunction(Element.prototype.insertAdjacentElement);
Object.defineProperty(Element.prototype, "insertAdjacentHTML",{"configurable":true,"enumerable":true,"writable":true,"value": function insertAdjacentHTML(){debugger;},});dogvm.safefunction(Element.prototype.insertAdjacentHTML);
Object.defineProperty(Element.prototype, "insertAdjacentText",{"configurable":true,"enumerable":true,"writable":true,"value": function insertAdjacentText(){debugger;},});dogvm.safefunction(Element.prototype.insertAdjacentText);
Object.defineProperty(Element.prototype, "matches",{"configurable":true,"enumerable":true,"writable":true,"value": function matches(){debugger;},});dogvm.safefunction(Element.prototype.matches);
Object.defineProperty(Element.prototype, "prepend",{"configurable":true,"enumerable":true,"writable":true,"value": function prepend(){debugger;},});dogvm.safefunction(Element.prototype.prepend);
Object.defineProperty(Element.prototype, "querySelector",{"configurable":true,"enumerable":true,"writable":true,"value": function querySelector(){debugger;},});dogvm.safefunction(Element.prototype.querySelector);
Object.defineProperty(Element.prototype, "querySelectorAll",{"configurable":true,"enumerable":true,"writable":true,"value": function querySelectorAll(){debugger;},});dogvm.safefunction(Element.prototype.querySelectorAll);
Object.defineProperty(Element.prototype, "releasePointerCapture",{"configurable":true,"enumerable":true,"writable":true,"value": function releasePointerCapture(){debugger;},});dogvm.safefunction(Element.prototype.releasePointerCapture);

Object.defineProperty(Element.prototype, "removeAttribute",{"configurable":true,"enumerable":true,"writable":true,"value": function removeAttribute(){debugger;},});dogvm.safefunction(Element.prototype.removeAttribute);
Object.defineProperty(Element.prototype, "removeAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function removeAttributeNS(){debugger;},});dogvm.safefunction(Element.prototype.removeAttributeNS);
Object.defineProperty(Element.prototype, "removeAttributeNode",{"configurable":true,"enumerable":true,"writable":true,"value": function removeAttributeNode(){debugger;},});dogvm.safefunction(Element.prototype.removeAttributeNode);
Object.defineProperty(Element.prototype, "replaceChildren",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceChildren(){debugger;},});dogvm.safefunction(Element.prototype.replaceChildren);
Object.defineProperty(Element.prototype, "replaceWith",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceWith(){debugger;},});dogvm.safefunction(Element.prototype.replaceWith);
Object.defineProperty(Element.prototype, "requestFullscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function requestFullscreen(){debugger;},});dogvm.safefunction(Element.prototype.requestFullscreen);
Object.defineProperty(Element.prototype, "requestPointerLock",{"configurable":true,"enumerable":true,"writable":true,"value": function requestPointerLock(){debugger;},});dogvm.safefunction(Element.prototype.requestPointerLock);
Object.defineProperty(Element.prototype, "scroll",{"configurable":true,"enumerable":true,"writable":true,"value": function scroll(){debugger;},});dogvm.safefunction(Element.prototype.scroll);
Object.defineProperty(Element.prototype, "scrollBy",{"configurable":true,"enumerable":true,"writable":true,"value": function scrollBy(){debugger;},});dogvm.safefunction(Element.prototype.scrollBy);
Object.defineProperty(Element.prototype, "scrollIntoView",{"configurable":true,"enumerable":true,"writable":true,"value": function scrollIntoView(){debugger;},});dogvm.safefunction(Element.prototype.scrollIntoView);
Object.defineProperty(Element.prototype, "scrollIntoViewIfNeeded",{"configurable":true,"enumerable":true,"writable":true,"value": function scrollIntoViewIfNeeded(){debugger;},});dogvm.safefunction(Element.prototype.scrollIntoViewIfNeeded);
Object.defineProperty(Element.prototype, "scrollTo",{"configurable":true,"enumerable":true,"writable":true,"value": function scrollTo(){debugger;},});dogvm.safefunction(Element.prototype.scrollTo);
Object.defineProperty(Element.prototype, "setAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function setAttributeNS(){debugger;},});dogvm.safefunction(Element.prototype.setAttributeNS);
Object.defineProperty(Element.prototype, "setAttributeNode",{"configurable":true,"enumerable":true,"writable":true,"value": function setAttributeNode(){debugger;},});dogvm.safefunction(Element.prototype.setAttributeNode);
Object.defineProperty(Element.prototype, "setAttributeNodeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function setAttributeNodeNS(){debugger;},});dogvm.safefunction(Element.prototype.setAttributeNodeNS);
Object.defineProperty(Element.prototype, "setHTMLUnsafe",{"configurable":true,"enumerable":true,"writable":true,"value": function setHTMLUnsafe(){debugger;},});dogvm.safefunction(Element.prototype.setHTMLUnsafe);
Object.defineProperty(Element.prototype, "setPointerCapture",{"configurable":true,"enumerable":true,"writable":true,"value": function setPointerCapture(){debugger;},});dogvm.safefunction(Element.prototype.setPointerCapture);
Object.defineProperty(Element.prototype, "toggleAttribute",{"configurable":true,"enumerable":true,"writable":true,"value": function toggleAttribute(){debugger;},});dogvm.safefunction(Element.prototype.toggleAttribute);
Object.defineProperty(Element.prototype, "webkitMatchesSelector",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitMatchesSelector(){debugger;},});dogvm.safefunction(Element.prototype.webkitMatchesSelector);
Object.defineProperty(Element.prototype, "webkitRequestFullScreen",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitRequestFullScreen(){debugger;},});dogvm.safefunction(Element.prototype.webkitRequestFullScreen);
Object.defineProperty(Element.prototype, "webkitRequestFullscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitRequestFullscreen(){debugger;},});dogvm.safefunction(Element.prototype.webkitRequestFullscreen);
Object.defineProperty(Element.prototype, "currentCSSZoom",{"configurable":true,"enumerable":true,"get": function currentCSSZoom_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "ariaColIndexText",{"configurable":true,"enumerable":true,"get": function ariaColIndexText_get(){},"set": function ariaColIndexText_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRowIndexText",{"configurable":true,"enumerable":true,"get": function ariaRowIndexText_get(){},"set": function ariaRowIndexText_set(){debugger;},});
Object.setPrototypeOf(Element.prototype, Node.prototype);


Object.defineProperty(Element.prototype, "children",{"configurable":true,"enumerable":true,"get": function children_get(){},set:undefined, });


Object.defineProperty(Element.prototype, "tagName", {"configurable": true,"enumerable": true,
    get: function tagName_get() {
        debugger;
        if (!this._tagName) {
            return '';
        }
        return this._tagName.toUpperCase();
    },
    set: undefined
});

Object.defineProperty(Element.prototype, "remove",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function remove(){
        debugger;
        // 如果元素有父节点，从父节点中移除自己
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    },});dogvm.safefunction(Element.prototype.remove);

Object.defineProperty(Element.prototype, "setAttribute", {
    value: function setAttribute(name, value) {
        debugger;
        if (!this._attributes) {
            this._attributes = new Map();
        }
        if(name == 'id'){
            dogvm.memory.htmlId.push({
                tag: this.tagName,
                id: value,
                content: '' ,// 存储内容
                parentList: [this.tagName]
            }
            );
        }
        this._attributes.set(String(name), String(value));
    },
    writable: true,
    enumerable: true,
    configurable: true
});dogvm.safefunction(Element.prototype.setAttribute);    

Object.defineProperty(Element.prototype, "getAttribute", {
    value: function getAttribute(name) {
        debugger;
        if (!this._attributes) {
            return null;
        }
        return this._attributes.get(String(name)) || null;
    },
    writable: true,
    enumerable: true,
    configurable: true
});dogvm.safefunction(Element.prototype.getAttribute);


Object.defineProperty(Element.prototype, "attributes", {
    get: function() {
        debugger;
        if (!this._attributes) {
            this._attributes = new Map();
        }
        
        let attrs = [];
        this._attributes.forEach((value, name) => {
            attrs.push({
                name: name,
                value: value,
                nodeType: 2, // ATTRIBUTE_NODE
                toString: function() {
                    return this.name + '="' + this.value + '"';
                }
            });
        });

        attrs.getNamedItem = function(name) {
            return this.find(attr => attr.name === name);
        };
        attrs.item = function(index) {
            return this[index];
        };
        
        return attrs;
    },
    enumerable: true,
    configurable: true
});



Object.defineProperty(Element.prototype, "innerHTML", {"configurable": true,"enumerable": true,
    get: function innerHTML_get() {
        debugger;
        return this._innerHtml || '';
    },
    set: function innerHTML_set(value) {
        debugger;
        function getParentTagsByIds(html, targetId) {
            let tagStack = []; // 用于记录标签的堆栈
            let result = {}; // 存储每个目标 ID 的父标签路径
            let currentIndex = 0; // 当前解析位置
            html = html.replace(/\n/g, '').replace(/\s+/g, ' ');
            while (currentIndex < html.length) {
                let currentChar = html[currentIndex];
                // 查找开始标签
                if (currentChar === '<' && html[currentIndex + 1] !== '/') {
                    let tagEnd = html.indexOf('>', currentIndex); // 找到结束标签的 '>'
                    if (tagEnd === -1) break; // 防止索引超出范围
                    let tag = html.substring(currentIndex + 1, tagEnd).trim();
                    let tagName = tag.split(' ')[0]; // 提取标签名
                    // 将当前标签推入堆栈
                    tagStack.push(tagName);
                    // 检查是否包含目标 ID
                    if (tag.includes(`id="${targetId}"`)) {
                        // 记录父标签路径
                        result[targetId] = [...tagStack];
                    }
                    currentIndex = tagEnd + 1; // 更新解析位置
                }
                // 查找结束标签
                else if (currentChar === '<' && html[currentIndex + 1] === '/') {
                    let tagEnd = html.indexOf('>', currentIndex); // 找到结束标签的 '>'
                    if (tagEnd === -1) break; // 防止索引超出范围
        
                    let closingTag = html.substring(currentIndex + 2, tagEnd).trim();
                    if (tagStack[tagStack.length - 1] === closingTag) {
                        tagStack.pop(); // 弹出栈顶标签
                    }
        
                    currentIndex = tagEnd + 1; // 更新解析位置
                } else {
                    currentIndex++; // 如果不是标签字符，则继续前进
                }
            }
        
            // 返回每个目标 ID 的父标签路径
            return result;
        }
        function getTagsWithIds(htmlString,e) {
            if (!dogvm.memory.htmlId) {
                dogvm.memory.htmlId = [];
            }
            let matches = htmlString.match(/<([a-zA-Z0-9]+)[^>]*?id=["']([^"']+)["'][^>]*>(.*?)<\/\1>/g) || [];
            matches.forEach(match => {
                let tagName = match.match(/<([a-zA-Z0-9]+)/)[1]; // 获取标签名
                let id = match.match(/id=["']([^"']+)["']/)[1]; // 获取 id
                let content = match.match(/>(.*?)<\/[a-zA-Z0-9]+>/)[1]; // 获取标签内的内容
                let existingIndex = dogvm.memory.htmlId.findIndex(item => item.id === id);
                if (existingIndex === -1) {
                    dogvm.memory.htmlId.push({
                        tag: tagName,
                        id: id,
                        content: content ,// 存储内容
                        parentList: getParentTagsByIds(htmlString,id)[id]
                    });
                } else {
                    dogvm.memory.htmlId[existingIndex].tag = tagName;
                    dogvm.memory.htmlId[existingIndex].content = content;
                    dogvm.memory.htmlId[existingIndex].parentList = getParentTagsByIds(htmlString,id)[id]; // 更新内容
                }
            });
        }
        function getCssChose(cssString,e){
            function isValidCSSSelector(selector) {
                // 基本的 CSS 选择器正则表达式
                const cssSelectorRegex = /^[\w-]+(\s*>\s*[\w-]+|\s+[\w-]+|\s*:\s*not\([^)]+\))*(\s*:\s*[\w-]+)?(\s*\.[\w-]+)*(\s*#\w+)*$/;
                return cssSelectorRegex.test(selector.trim());
            }
            // 正则表达式提取选择器和颜色
            const regex = /(\w+\s*:\s*not\([^)]+\))\s*{\s*color:\s*([^;]+);/g;
            let match;
            while ((match = regex.exec(cssString)) !== null) {
                const selector = match[1].trim(); // 提取选择器
                const color = match[2].trim(); // 提取颜色
                if (isValidCSSSelector(selector)) {
                    dogvm.memory.cssChose.push({ selector, color })
                }
            }
        }

        getCssChose(value,this);
        getTagsWithIds(value,this);
        this._innerHtml = value;
        return value;
    }
});

Object.defineProperty(Element.prototype, "outerHTML",{"configurable":true,"enumerable":true,
    "get": function outerHTML_get(){
        debugger;
        //outerHTML属性获取描述元素（包括其后代）的序列化 HTML 片段。它也可以设置为用从给定字符串解析的节点替换元素
        // 如果没有父节点 或者 子节点  就只返回自己标签
        let innerHTML = '';
        function getHTML(e,inner){
            return "<" + e._tagName + ">" + inner + "<" + "/" + e._tagName + ">";
        }
        let children = dogvm.memory.htmlNode.get(this) || [];
        if(children.length > 0){
            //有子节点  将子节点标签放里面
            children.forEach(e=>{
                let str = getHTML(e,e.innerHTML);
                innerHTML = innerHTML + str;
            });
        }
        return getHTML(this,innerHTML);
    },"set": function outerHTML_set(){debugger;},});


dogvm.safeproperty(Element);