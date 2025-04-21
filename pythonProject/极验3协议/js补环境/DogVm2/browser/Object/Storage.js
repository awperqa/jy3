// Storage对象
var Storage = function Storage(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(Storage);

Object.defineProperty(Storage.prototype, Symbol.toStringTag,{"value":"Storage","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Storage.prototype, "length",{"configurable":true,"enumerable":true,"get": function length_get(){
    debugger;
    return "3"
},set:undefined, });
Object.defineProperty(Storage.prototype, "clear",{"configurable":true,"enumerable":true,"writable":true,"value": function clear(){debugger;},});dogvm.safefunction(Storage.prototype.clear);
Object.defineProperty(Storage.prototype, "getItem",{"configurable":true,"enumerable":true,"writable":true,"value": function getItem(keyName){
    debugger;
    if(dogvm.memory.storage[keyName] == undefined){
        return null;
    }
    return dogvm.memory.storage[keyName];
},});dogvm.safefunction(Storage.prototype.getItem);
Object.defineProperty(Storage.prototype, "key",{"configurable":true,"enumerable":true,"writable":true,"value": function key(){debugger;},});dogvm.safefunction(Storage.prototype.key);
Object.defineProperty(Storage.prototype, "removeItem",{"configurable":true,"enumerable":true,"writable":true,"value": function removeItem(){debugger;},});dogvm.safefunction(Storage.prototype.removeItem);
Object.defineProperty(Storage.prototype, "setItem",{"configurable":true,"enumerable":true,"writable":true,"value": function setItem(keyName, keyValue){
    debugger;
    dogvm.memory.storage[keyName] = keyValue;
},});dogvm.safefunction(Storage.prototype.setItem);



// localStorage对象
var localStorage = {};
Object.defineProperty(localStorage, "captcha_webworker_supported",{"configurable":true,"enumerable":true,"writable":true,"value":"2",});
Object.defineProperty(localStorage, "user-cache",{"configurable":true,"enumerable":true,"writable":true,"value":'{"theme":"light","loginRedirect":"/"}',});
Object.defineProperty(localStorage, "isWhitelist",{"configurable":true,"enumerable":true,"writable":true,"value":"false",});
Object.setPrototypeOf(localStorage, Storage.prototype);


localStorage = dogvm.proxy(localStorage);


// sessionStorage对象
var sessionStorage = {};
Object.defineProperty(sessionStorage, "_bl_sid",{"configurable":true,"enumerable":true,"writable":true,"value":"gFmhj5bIawep9zks6oysj4z7878h",});
Object.setPrototypeOf(sessionStorage, Storage.prototype);

sessionStorage = dogvm.proxy(sessionStorage);