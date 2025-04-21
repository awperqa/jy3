// MediaQueryList
var MediaQueryList = function MediaQueryList(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(MediaQueryList);

Object.defineProperty(MediaQueryList.prototype, Symbol.toStringTag,{"value":"MediaQueryList","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(MediaQueryList.prototype, "media",{"configurable":true,"enumerable":true,"get": function media_get(){return this._media;},set:undefined, });
Object.defineProperty(MediaQueryList.prototype, "matches",{"configurable":true,"enumerable":true,"get": function matches_get(){return this._matches;},set:undefined, });
Object.defineProperty(MediaQueryList.prototype, "onchange",{"configurable":true,"enumerable":true,"get": function onchange_get(){return this._onchange;},"set": function onchange_set(value){debugger; this._onchange = value},});
Object.defineProperty(MediaQueryList.prototype, "addListener",{"configurable":true,"enumerable":true,"writable":true,"value": function addListener(){debugger;},});dogvm.safefunction(MediaQueryList.prototype.addListener);
Object.defineProperty(MediaQueryList.prototype, "removeListener",{"configurable":true,"enumerable":true,"writable":true,"value": function removeListener(){debugger;},});dogvm.safefunction(MediaQueryList.prototype.removeListener);
Object.setPrototypeOf(MediaQueryList.prototype, EventTarget.prototype);

dogvm.safeproperty(MediaQueryList);


MediaQueryList.createDog = function createDog(mediaQueryString){
    let a = Object.create(MediaQueryList.prototype);
    a._media = mediaQueryString;
    a.onchange = null;
    debugger;
    match = mediaQueryString.match(/\(([^:]+):/);
    let kind = match[1].trim()
    if (!dogvm.memory.media[kind]){
        // 类型第一次出现 给第一个为true
        dogvm.memory.media[kind] = mediaQueryString;
        a._matches = true;
        return dogvm.proxy(a);
    }
    //不是第一次出现 赋值false;
    a._matches = false;
    return dogvm.proxy(a);
}