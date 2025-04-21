// ServiceWorkerContainer
var ServiceWorkerContainer = function ServiceWorkerContainer(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(ServiceWorkerContainer);

Object.defineProperty(ServiceWorkerContainer.prototype, Symbol.toStringTag,{"value":"ServiceWorkerContainer","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(ServiceWorkerContainer.prototype, "controller",{"configurable":true,"enumerable":true,"get": function controller_get(){ return "null"},set:undefined, });
Object.defineProperty(ServiceWorkerContainer.prototype, "ready",{"configurable":true,"enumerable":true,"get": function ready_get(){ return "[object Promise]"},set:undefined, });
Object.defineProperty(ServiceWorkerContainer.prototype, "oncontrollerchange",{"configurable":true,"enumerable":true,"get": function oncontrollerchange_get(){ return "null"},"set": function oncontrollerchange_set(){debugger;},});
Object.defineProperty(ServiceWorkerContainer.prototype, "onmessage",{"configurable":true,"enumerable":true,"get": function onmessage_get(){ return "null"},"set": function onmessage_set(){debugger;},});
Object.defineProperty(ServiceWorkerContainer.prototype, "onmessageerror",{"configurable":true,"enumerable":true,"get": function onmessageerror_get(){ return "null"},"set": function onmessageerror_set(){debugger;},});
Object.defineProperty(ServiceWorkerContainer.prototype, "getRegistration",{"configurable":true,"enumerable":true,"writable":true,"value": function getRegistration(){debugger;},});dogvm.safefunction(ServiceWorkerContainer.prototype.getRegistration);
Object.defineProperty(ServiceWorkerContainer.prototype, "getRegistrations",{"configurable":true,"enumerable":true,"writable":true,"value": function getRegistrations(){debugger;},});dogvm.safefunction(ServiceWorkerContainer.prototype.getRegistrations);
Object.defineProperty(ServiceWorkerContainer.prototype, "register",{"configurable":true,"enumerable":true,"writable":true,"value": function register(){debugger;},});dogvm.safefunction(ServiceWorkerContainer.prototype.register);
Object.defineProperty(ServiceWorkerContainer.prototype, "startMessages",{"configurable":true,"enumerable":true,"writable":true,"value": function startMessages(){debugger;},});dogvm.safefunction(ServiceWorkerContainer.prototype.startMessages);
Object.setPrototypeOf(ServiceWorkerContainer.prototype, EventTarget.prototype);


ServiceWorkerContainer.createDog = function createDog(){
    let d = Object.create(ServiceWorkerContainer.prototype);
    return dogvm.proxy(d);
};dogvm.safefunction(ServiceWorkerContainer.createDog);