// Event
var Event = function Event(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(Event);
Object.defineProperties(Event.prototype, {
    [Symbol.toStringTag]: {
        value: "Event",
        configurable: true
    }
});

Object.defineProperty(Event, "NONE",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(Event, "CAPTURING_PHASE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Event, "AT_TARGET",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Event, "BUBBLING_PHASE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
// Object.defineProperty(Event.prototype, "type",{"configurable":true,"enumerable":true,"get": function type_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "target",{"configurable":true,"enumerable":true,"get": function target_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "currentTarget",{"configurable":true,"enumerable":true,"get": function currentTarget_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "eventPhase",{"configurable":true,"enumerable":true,"get": function eventPhase_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "bubbles",{"configurable":true,"enumerable":true,"get": function bubbles_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "cancelable",{"configurable":true,"enumerable":true,"get": function cancelable_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "defaultPrevented",{"configurable":true,"enumerable":true,"get": function defaultPrevented_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "composed",{"configurable":true,"enumerable":true,"get": function composed_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "timeStamp",{"configurable":true,"enumerable":true,"get": function timeStamp_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "srcElement",{"configurable":true,"enumerable":true,"get": function srcElement_get(){debugger;},set:undefined, });
// Object.defineProperty(Event.prototype, "returnValue",{"configurable":true,"enumerable":true,"get": function returnValue_get(){debugger;},"set": function returnValue_set(){debugger;},});
// Object.defineProperty(Event.prototype, "cancelBubble",{"configurable":true,"enumerable":true,"get": function cancelBubble_get(){debugger;},"set": function cancelBubble_set(){debugger;},});
Object.defineProperty(Event.prototype, "NONE",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(Event.prototype, "CAPTURING_PHASE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Event.prototype, "AT_TARGET",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Event.prototype, "BUBBLING_PHASE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(Event.prototype, "composedPath",{"configurable":true,"enumerable":true,"writable":true,"value": function composedPath(){debugger;},});dogvm.safefunction(Event.prototype.composedPath);
Object.defineProperty(Event.prototype, "initEvent",{"configurable":true,"enumerable":true,"writable":true,"value": function initEvent(){debugger;},});dogvm.safefunction(Event.prototype.initEvent);
Object.defineProperty(Event.prototype, "preventDefault",{"configurable":true,"enumerable":true,"writable":true,"value": function preventDefault(){debugger;},});dogvm.safefunction(Event.prototype.preventDefault);
Object.defineProperty(Event.prototype, "stopImmediatePropagation",{"configurable":true,"enumerable":true,"writable":true,"value": function stopImmediatePropagation(){debugger;},});dogvm.safefunction(Event.prototype.stopImmediatePropagation);
Object.defineProperty(Event.prototype, "stopPropagation",{"configurable":true,"enumerable":true,"writable":true,"value": function stopPropagation(){debugger;},});dogvm.safefunction(Event.prototype.stopPropagation);


