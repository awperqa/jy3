// Screen对象
var Screen = function Screen(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(Screen);
Object.defineProperty(Screen.prototype, Symbol.toStringTag,{"value":"Screen","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Screen.prototype, "availWidth",{"configurable":true,"enumerable":true,"get": function availWidth_get(){return 1536},set:undefined, });
Object.defineProperty(Screen.prototype, "availHeight",{"configurable":true,"enumerable":true,"get": function availHeight_get(){return 1032},set:undefined, });
Object.defineProperty(Screen.prototype, "width",{"configurable":true,"enumerable":true,"get": function width_get(){return 1536},set:undefined, });
Object.defineProperty(Screen.prototype, "height",{"configurable":true,"enumerable":true,"get": function height_get(){return 864},set:undefined, });
Object.defineProperty(Screen.prototype, "colorDepth",{"configurable":true,"enumerable":true,"get": function colorDepth_get(){return 24},set:undefined, });
Object.defineProperty(Screen.prototype, "pixelDepth",{"configurable":true,"enumerable":true,"get": function pixelDepth_get(){return 24},set:undefined, });
Object.defineProperty(Screen.prototype, "availLeft",{"configurable":true,"enumerable":true,"get": function availLeft_get(){return 0},set:undefined, });
Object.defineProperty(Screen.prototype, "availTop",{"configurable":true,"enumerable":true,"get": function availTop_get(){return 0},set:undefined, });
Object.defineProperty(Screen.prototype, "orientation",{"configurable":true,"enumerable":true,"get": function orientation_get(){return "[object ScreenOrientation]"},set:undefined, });
Object.defineProperty(Screen.prototype, "onchange",{"configurable":true,"enumerable":true,"get": function onchange_get(){return null},"set": function onchange_set(){},});
Object.defineProperty(Screen.prototype, "isExtended",{"configurable":true,"enumerable":true,"get": function isExtended_get(){return false},set:undefined, });
Object.setPrototypeOf(Screen.prototype, EventTarget.prototype);

var screen = {}
Object.setPrototypeOf(screen, Screen.prototype);
screen = dogvm.proxy(screen);

