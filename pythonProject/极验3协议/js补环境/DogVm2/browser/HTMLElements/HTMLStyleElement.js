// HTMLStyleElement对象
var HTMLStyleElement = function HTMLStyleElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLStyleElement);

Object.defineProperty(HTMLStyleElement.prototype, Symbol.toStringTag,{"value":"HTMLStyleElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLStyleElement.prototype, "disabled",{"configurable":true,"enumerable":true,"get": function disabled_get(){debugger; return "false"},"set": function disabled_set(){debugger;},});
Object.defineProperty(HTMLStyleElement.prototype, "media",{"configurable":true,"enumerable":true,"get": function media_get(){debugger; return ""},"set": function media_set(){debugger;},});
Object.defineProperty(HTMLStyleElement.prototype, "type",{"configurable":true,"enumerable":true,"get": function type_get(){debugger; return ""},"set": function type_set(){debugger;},});

Object.defineProperty(HTMLStyleElement.prototype, "blocking",{"configurable":true,"enumerable":true,"get": function blocking_get(){debugger; return ""},"set": function blocking_set(){debugger;},});
Object.setPrototypeOf(HTMLStyleElement.prototype, HTMLElement.prototype);


Object.defineProperty(HTMLStyleElement.prototype, "sheet",{"configurable":true,"enumerable":true,
    "get": function sheet_get(){
        debugger;
        // 从 dogvm 的内存中获取该节点的父节点
        for (const [key, value] of dogvm.memory.htmlNode) {
            if (value.includes(this)) {
                // 该元素是子节点
                return new CSSStyleSheet(this._innerHtml);
            }
        }
        return "null";
    },set:undefined, });


// 创建HTMLStyleElement
dogvm.memory.htmlelements["style"] = function () {
    var style = new (function () {});
    style.__proto__ = HTMLStyleElement.prototype;
    return style;
}