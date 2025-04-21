var EventTarget = function EventTarget() { // 构造函数

};
dogvm.safefunction(EventTarget);

// 因为EventTarget是构造函数，而我们要的是原型，因此需要先hook EventTarget.prototype，设置下原型的名字，否则它会使用父亲的名字
Object.defineProperties(EventTarget.prototype, {
    [Symbol.toStringTag]: {
        value: "EventTarget",
        configurable: true
    }
})

EventTarget.prototype.addEventListener = function addEventListener(type,callback) {
    debugger; //debugger的意义在于检测到是否检测了该方法
    if(!(type in dogvm.memory.listeners)){
        dogvm.memory.listeners[type] = [];
    }
    dogvm.memory.listeners[type].push(callback);
};
dogvm.safefunction(EventTarget.prototype.addEventListener);

EventTarget.prototype.dispatchEvent = function dispatchEvent() {
    debugger;
};
dogvm.safefunction(EventTarget.prototype.dispatchEvent);

EventTarget.prototype.removeEventListener = function removeEventListener() {
    debugger;
};
dogvm.safefunction(EventTarget.prototype.removeEventListener);

// EventTarget = dogvm.proxy(EventTarget);
// EventTarget.prototype = dogvm.proxy(EventTarget.prototype);