// MouseEvent
var MouseEvent = function MouseEvent(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(MouseEvent);
Object.defineProperties(MouseEvent.prototype, {
    [Symbol.toStringTag]: {
        value: "MouseEvent",
        configurable: true
    }
});

// Object.defineProperty(MouseEvent.prototype, "screenX",{"configurable":true,"enumerable":true,"get": function screenX_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "screenY",{"configurable":true,"enumerable":true,"get": function screenY_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "clientX",{"configurable":true,"enumerable":true,"get": function clientX_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "clientY",{"configurable":true,"enumerable":true,"get": function clientY_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "ctrlKey",{"configurable":true,"enumerable":true,"get": function ctrlKey_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "shiftKey",{"configurable":true,"enumerable":true,"get": function shiftKey_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "altKey",{"configurable":true,"enumerable":true,"get": function altKey_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "metaKey",{"configurable":true,"enumerable":true,"get": function metaKey_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "button",{"configurable":true,"enumerable":true,"get": function button_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "buttons",{"configurable":true,"enumerable":true,"get": function buttons_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "relatedTarget",{"configurable":true,"enumerable":true,"get": function relatedTarget_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "pageX",{"configurable":true,"enumerable":true,"get": function pageX_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "pageY",{"configurable":true,"enumerable":true,"get": function pageY_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "x",{"configurable":true,"enumerable":true,"get": function x_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "y",{"configurable":true,"enumerable":true,"get": function y_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "offsetX",{"configurable":true,"enumerable":true,"get": function offsetX_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "offsetY",{"configurable":true,"enumerable":true,"get": function offsetY_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "movementX",{"configurable":true,"enumerable":true,"get": function movementX_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "movementY",{"configurable":true,"enumerable":true,"get": function movementY_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "fromElement",{"configurable":true,"enumerable":true,"get": function fromElement_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "toElement",{"configurable":true,"enumerable":true,"get": function toElement_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "layerX",{"configurable":true,"enumerable":true,"get": function layerX_get(){debugger;},set:undefined, });
// Object.defineProperty(MouseEvent.prototype, "layerY",{"configurable":true,"enumerable":true,"get": function layerY_get(){debugger;},set:undefined, });
Object.defineProperty(MouseEvent.prototype, "getModifierState",{"configurable":true,"enumerable":true,"writable":true,"value": function getModifierState(){debugger;},});dogvm.safefunction(MouseEvent.prototype.getModifierState);
Object.defineProperty(MouseEvent.prototype, "initMouseEvent",{"configurable":true,"enumerable":true,"writable":true,"value": function initMouseEvent(){debugger;},});dogvm.safefunction(MouseEvent.prototype.initMouseEvent);
Object.setPrototypeOf(MouseEvent.prototype, UIEvent.prototype);
MouseEvent.prototype.type = "mousemove";

// MouseEvent = dogvm.proxy(MouseEvent);


MouseEvent.getMeDog = function getMeDog(data){
    // mouseEvent对象
    let mouseEvent = {};
    Object.defineProperty(mouseEvent, "isTrusted",{"configurable":false,"enumerable":true,"get": function isTrusted_get(){debugger; return "true"},set:undefined, });
    Object.setPrototypeOf(mouseEvent, MouseEvent.prototype);
    mouseEvent.clientX = data.clientX
    mouseEvent.clientY = data.clientY
    mouseEvent.screenX = data.screenX
    mouseEvent.screenY = data.screenY    
    mouseEvent.movementX = data.movementX    
    mouseEvent.movementY = data.movementY
    mouseEvent.pageX = data.pageX
    mouseEvent.pageY = data.pageY
    mouseEvent.offsetX = data.offsetX
    mouseEvent.offsetY = data.offsetY
    return dogvm.proxy(mouseEvent);
};
