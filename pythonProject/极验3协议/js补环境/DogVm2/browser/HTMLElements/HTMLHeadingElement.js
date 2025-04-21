// HTMLHeadingElement
var HTMLHeadingElement = function HTMLHeadingElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLHeadingElement);
Object.defineProperty(HTMLHeadingElement.prototype, Symbol.toStringTag,{"value":"HTMLHeadingElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLHeadingElement.prototype, "align",{"configurable":true,"enumerable":true,"get": function align_get(){},"set": function align_set(){debugger;},});
Object.setPrototypeOf(HTMLHeadingElement.prototype, HTMLElement.prototype);

// 创建HTMLHeadingElement
dogvm.memory.htmlelements["h"] = function () {
    var h = new (function () {});
    h.__proto__ = HTMLHeadingElement.prototype;
    return h;
}
