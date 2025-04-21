// PerformanceTiming对象
var PerformanceTiming = function PerformanceTiming(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(PerformanceTiming);

Object.defineProperty(PerformanceTiming.prototype, Symbol.toStringTag,{"value":"PerformanceTiming","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(PerformanceTiming.prototype, "navigationStart",{"configurable":true,"enumerable":true,"get": function navigationStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "unloadEventStart",{"configurable":true,"enumerable":true,"get": function unloadEventStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "unloadEventEnd",{"configurable":true,"enumerable":true,"get": function unloadEventEnd_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "redirectStart",{"configurable":true,"enumerable":true,"get": function redirectStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "redirectEnd",{"configurable":true,"enumerable":true,"get": function redirectEnd_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "fetchStart",{"configurable":true,"enumerable":true,"get": function fetchStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "domainLookupStart",{"configurable":true,"enumerable":true,"get": function domainLookupStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "domainLookupEnd",{"configurable":true,"enumerable":true,"get": function domainLookupEnd_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "connectStart",{"configurable":true,"enumerable":true,"get": function connectStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "connectEnd",{"configurable":true,"enumerable":true,"get": function connectEnd_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "secureConnectionStart",{"configurable":true,"enumerable":true,"get": function secureConnectionStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "requestStart",{"configurable":true,"enumerable":true,"get": function requestStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "responseStart",{"configurable":true,"enumerable":true,"get": function responseStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "responseEnd",{"configurable":true,"enumerable":true,"get": function responseEnd_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "domLoading",{"configurable":true,"enumerable":true,"get": function domLoading_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "domInteractive",{"configurable":true,"enumerable":true,"get": function domInteractive_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "domContentLoadedEventStart",{"configurable":true,"enumerable":true,"get": function domContentLoadedEventStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "domContentLoadedEventEnd",{"configurable":true,"enumerable":true,"get": function domContentLoadedEventEnd_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "domComplete",{"configurable":true,"enumerable":true,"get": function domComplete_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "loadEventStart",{"configurable":true,"enumerable":true,"get": function loadEventStart_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "loadEventEnd",{"configurable":true,"enumerable":true,"get": function loadEventEnd_get(){},set:undefined, });
Object.defineProperty(PerformanceTiming.prototype, "toJSON",{"configurable":true,"enumerable":true,"writable":true,"value": function toJSON(){debugger;},});dogvm.safefunction(PerformanceTiming.prototype.toJSON);

PerformanceTiming.create_dog = function create_dog(){
    let performanceTiming = {};
    navStart = Date.now();
    performanceTiming.navigationStart = navStart;
    performanceTiming.unloadEventStart = navStart + 49;
    performanceTiming.unloadEventEnd = navStart + 49;
    performanceTiming.redirectStart = 0;
    performanceTiming.redirectEnd = 0;
    performanceTiming.fetchStart = navStart + 5;
    performanceTiming.domainLookupStart = navStart + 5;
    performanceTiming.domainLookupEnd = navStart + 5;
    performanceTiming.connectStart = navStart + 5;
    performanceTiming.connectEnd = navStart + 5;
    performanceTiming.secureConnectionStart = 0;
    performanceTiming.requestStart = navStart + 13;
    performanceTiming.responseStart = navStart + 44;
    performanceTiming.responseEnd = navStart + 45;
    performanceTiming.domLoading = navStart + 53;
    performanceTiming.domInteractive = navStart + 669;
    performanceTiming.domContentLoadedEventStart = navStart + 669;
    performanceTiming.domContentLoadedEventEnd = navStart + 672;
    performanceTiming.domComplete = navStart + 687;
    performanceTiming.loadEventStart = navStart + 687;
    performanceTiming.loadEventEnd = navStart + 688;
    Object.setPrototypeOf(performanceTiming, PerformanceTiming.prototype);
    performanceTiming = dogvm.proxy(performanceTiming);
    return performanceTiming;
}