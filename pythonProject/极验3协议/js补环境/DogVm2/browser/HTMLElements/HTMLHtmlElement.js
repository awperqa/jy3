// HTMLHtmlElement对象
var HTMLHtmlElement = function HTMLHtmlElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLHtmlElement);
Object.defineProperty(HTMLHtmlElement.prototype, Symbol.toStringTag,{"value":"HTMLHtmlElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLHtmlElement.prototype, "version",{"configurable":true,"enumerable":true,"get": function version_get(){debugger; return ""},"set": function version_set(){debugger;},});
Object.setPrototypeOf(HTMLHtmlElement.prototype, HTMLElement.prototype);


HTMLHtmlElement.createHtmlElementDog = function createHtmlElementDog(){
    let html = Object.create(HTMLHtmlElement.prototype);
    return dogvm.proxy(html);
};dogvm.safefunction(HTMLHtmlElement.createHtmlElementDog);


dogvm.safeproperty(HTMLHtmlElement);