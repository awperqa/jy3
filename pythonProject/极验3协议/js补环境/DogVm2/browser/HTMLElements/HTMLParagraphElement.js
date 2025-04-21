// HTMLParagraphElement
var HTMLParagraphElement = function HTMLParagraphElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLParagraphElement);
Object.defineProperty(HTMLParagraphElement.prototype, Symbol.toStringTag,{"value":"HTMLParagraphElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLParagraphElement.prototype, "align",{"configurable":true,"enumerable":true,"get": function align_get(){debugger; return ""},"set": function align_set(){debugger;},});
Object.setPrototypeOf(HTMLParagraphElement.prototype, HTMLElement.prototype);


// 创建p
dogvm.memory.htmlelements["p"] = function () {
    var p = new (function () {});
    p.__proto__ = HTMLParagraphElement.prototype;
    return p;
}