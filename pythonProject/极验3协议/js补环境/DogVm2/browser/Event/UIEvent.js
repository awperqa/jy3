// UIEvent
var UIEvent = function UIEvent(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(UIEvent);
Object.defineProperties(UIEvent.prototype, {
    [Symbol.toStringTag]: {
        value: "UIEvent",
        configurable: true
    }
});

// Object.defineProperty(UIEvent.prototype, "view",{"configurable":true,"enumerable":true,"get": function view_get(){debugger;},set:undefined, });
// Object.defineProperty(UIEvent.prototype, "detail",{"configurable":true,"enumerable":true,"get": function detail_get(){debugger;},set:undefined, });
// Object.defineProperty(UIEvent.prototype, "sourceCapabilities",{"configurable":true,"enumerable":true,"get": function sourceCapabilities_get(){debugger;},set:undefined, });
// Object.defineProperty(UIEvent.prototype, "which",{"configurable":true,"enumerable":true,"get": function which_get(){debugger;},set:undefined, });
Object.defineProperty(UIEvent.prototype, "initUIEvent",{"configurable":true,"enumerable":true,"writable":true,"value": function initUIEvent(){debugger;},});dogvm.safefunction(UIEvent.prototype.initUIEvent);
Object.setPrototypeOf(UIEvent.prototype, Event.prototype);