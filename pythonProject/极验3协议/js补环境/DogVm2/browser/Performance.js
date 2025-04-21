// Performance对象
var Performance = function Performance(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(Performance);

Object.defineProperty(Performance.prototype, Symbol.toStringTag,{"value":"Performance","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Performance.prototype, "timeOrigin",{"configurable":true,"enumerable":true,"get": function timeOrigin_get(){},set:undefined, });
Object.defineProperty(Performance.prototype, "onresourcetimingbufferfull",{"configurable":true,"enumerable":true,"get": function onresourcetimingbufferfull_get(){},"set": function onresourcetimingbufferfull_set(){debugger;},});
Object.defineProperty(Performance.prototype, "clearMarks",{"configurable":true,"enumerable":true,"writable":true,"value": function clearMarks(){debugger;},});dogvm.safefunction(Performance.prototype.clearMarks);
Object.defineProperty(Performance.prototype, "clearMeasures",{"configurable":true,"enumerable":true,"writable":true,"value": function clearMeasures(){debugger;},});dogvm.safefunction(Performance.prototype.clearMeasures);
Object.defineProperty(Performance.prototype, "clearResourceTimings",{"configurable":true,"enumerable":true,"writable":true,"value": function clearResourceTimings(){debugger;},});dogvm.safefunction(Performance.prototype.clearResourceTimings);
Object.defineProperty(Performance.prototype, "getEntries",{"configurable":true,"enumerable":true,"writable":true,"value": function getEntries(){debugger;},});dogvm.safefunction(Performance.prototype.getEntries);
Object.defineProperty(Performance.prototype, "getEntriesByName",{"configurable":true,"enumerable":true,"writable":true,"value": function getEntriesByName(){debugger;},});dogvm.safefunction(Performance.prototype.getEntriesByName);
Object.defineProperty(Performance.prototype, "getEntriesByType",{"configurable":true,"enumerable":true,"writable":true,"value": function getEntriesByType(){debugger;},});dogvm.safefunction(Performance.prototype.getEntriesByType);
Object.defineProperty(Performance.prototype, "mark",{"configurable":true,"enumerable":true,"writable":true,"value": function mark(){debugger;},});dogvm.safefunction(Performance.prototype.mark);
Object.defineProperty(Performance.prototype, "measure",{"configurable":true,"enumerable":true,"writable":true,"value": function measure(){debugger;},});dogvm.safefunction(Performance.prototype.measure);
Object.defineProperty(Performance.prototype, "setResourceTimingBufferSize",{"configurable":true,"enumerable":true,"writable":true,"value": function setResourceTimingBufferSize(){debugger;},});dogvm.safefunction(Performance.prototype.setResourceTimingBufferSize);
Object.defineProperty(Performance.prototype, "toJSON",{"configurable":true,"enumerable":true,"writable":true,"value": function toJSON(){debugger;},});dogvm.safefunction(Performance.prototype.toJSON);
Object.defineProperty(Performance.prototype, "now",{"configurable":true,"enumerable":true,"writable":true,"value": function now(){debugger;},});dogvm.safefunction(Performance.prototype.now);
Object.defineProperty(Performance.prototype, "timing",{"configurable":true,"enumerable":true,"get": function timing_get(){},set:undefined, });
Object.defineProperty(Performance.prototype, "navigation",{"configurable":true,"enumerable":true,"get": function navigation_get(){},set:undefined, });
Object.defineProperty(Performance.prototype, "memory",{"configurable":true,"enumerable":true,"get": function memory_get(){},set:undefined, });
Object.defineProperty(Performance.prototype, "eventCounts",{"configurable":true,"enumerable":true,"get": function eventCounts_get(){},set:undefined, });
Object.setPrototypeOf(Performance.prototype, EventTarget.prototype);

var performance = {};
performance.timeOrigin = 1739859480521.3;
performance.onresourcetimingbufferfull = null;
performance.timing = PerformanceTiming.create_dog();
performance.navigation = {};
performance.memory = {};
performance.eventCounts = {};
Object.setPrototypeOf(performance, Performance.prototype);
performance = dogvm.proxy(performance);