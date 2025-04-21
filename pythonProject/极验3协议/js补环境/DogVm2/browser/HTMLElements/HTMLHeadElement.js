// HTMLHeadElement
var HTMLHeadElement = function HTMLHeadElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLHeadElement);

Object.defineProperty(HTMLHeadElement.prototype, Symbol.toStringTag,{"value":"HTMLHeadElement","writable":false,"enumerable":false,"configurable":true})
Object.setPrototypeOf(HTMLHeadElement.prototype, HTMLElement.prototype);


HTMLHeadElement.createHtmlHeadDog = function createHtmlHeadDog() {
    let instance = Object.create(HTMLHeadElement.prototype);
    return dogvm.proxy(instance);
};dogvm.safefunction(HTMLHeadElement.createHtmlHeadDog);


HTMLHeadElement.headDog = HTMLHeadElement.createHtmlHeadDog();



//////////////////////////////////
