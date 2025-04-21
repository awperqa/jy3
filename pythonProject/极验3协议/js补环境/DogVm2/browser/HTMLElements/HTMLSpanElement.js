// HTMLSpanElement
var HTMLSpanElement = function HTMLSpanElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLSpanElement);

Object.defineProperty(HTMLSpanElement.prototype, Symbol.toStringTag,{"value":"HTMLSpanElement","writable":false,"enumerable":false,"configurable":true})
Object.setPrototypeOf(HTMLSpanElement.prototype, HTMLElement.prototype);

// 创建span
dogvm.memory.htmlelements["span"] = function () {
    var span = new (function () {});
    span.__proto__ = HTMLSpanElement.prototype;
    return span;
}