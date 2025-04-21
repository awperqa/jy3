// 框架内存管理，用于解决变量名重复问题
// 调试日志 window.catvm 把框架功能集中管理，

var dogvm = {};
// 框架运行内存
dogvm.memory = {
    config: {print: true, proxy: true}, // 框架配置：是否打印，是否使用proxy
    htmlelements:{}, // 所有的html节点元素存放位置
    htmlNode: new Map(), //html节点关系
    htmlId: [], //html元素id
    media: {}, //媒体
    cssChose: [], //css选择器
    listeners:{}, // 所有事件存放位置
    log:[], // 环境调用日志统一存放点
    storage:{}, // localStorage 全局存放点
    webgl:{}
}; // 默认关闭打印



// 主要用来保护伪造的函数，使其更难被识别
// 主要用来保护伪造的函数，让其更难识破
;
(() => {
    'use strict';
    // 取原型链上的toString
    const $toString = Function.toString;
    // 取方法名 reload
    const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
    const myToString = function () {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };

    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,  // 不可枚举
            "configurable": true, // 可配置
            "writable": true, // 可写
            "value": value
        })
    }

    delete Function.prototype['toString'];// 删除原型链上的toString
    set_native(Function.prototype, "toString", myToString); // 自定义一个getter方法，其实就是一个hook
    //套个娃，保护一下我们定义的toString，避免js对toString再次toString，如：location.reload.toString.toString() 否则就暴露了
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");
    this.dogvm.safefunction = (func) => {
        set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol,func.name || ''}() { [native code] }`);
    }; //导出函数到globalThis，更改原型上的toSting为自己的toString。这个方法相当于过掉func的toString检测点
}).call(this);

// 主要用来保护伪造的原型，使其更难被识别
;
(() => {
    'use strict';
    // 自动处理属性的逻辑
    function hookProperties(func) {
        debugger;
        let properties = Object.getOwnPropertyDescriptors(func.prototype);
        // 遍历所有属性
        Object.entries(properties).forEach(([prop, descriptor]) => {
            // 检查是否存在 getter
            if (descriptor.get) {
                // let get_result = descriptor.get;
                // 在原型链上定义属性（添加非法调用检查逻辑）
                Object.defineProperty(func.prototype, prop, {
                    get: function () {
                        debugger;
                        if (this !== func.prototype) {
                            return descriptor.get.call(this); 
                        }
                        throw new TypeError("Illegal invocation");
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        });
    }
    // 将函数导出到全局对象（如 globalThis），并提供接口用于动态处理
    this.dogvm.safeproperty = hookProperties
})();


// 日志调试功能
dogvm.print = {};
dogvm.memory.print = []; // 缓存
dogvm.print.log = function () {
    if (dogvm.memory.config.print) {
        console.table(dogvm.memory.log);
    }
};

dogvm.print.getAll = function () { // 列出所有日志
    if (dogvm.memory.config.print) {
        console.table(dogvm.memory.log);
        console.log(dogvm.memory.print);
    }
};
// 框架代理功能
dogvm.proxy = function (obj) {
    // Proxy 可以多层代理，即 a = new proxy(a); a = new proxy(a);第二次代理
    // 后代理的检测不到先代理的
    if (dogvm.memory.config.proxy == false) {
        return obj
    }
    return new Proxy(obj, {
        set(target, property, value) {
            console.log({"类型":"set-->","调用者":target,"调用属性":property,"设置值":value});
            dogvm.memory.log.push({"类型":"set-->","调用者":target,"调用属性":property,"设置值":value});
            return Reflect.set(...arguments); //这是一种反射语句，这种不会产生死循环问题
        },
        get(target, property, receiver) {
            const d = Reflect.get(target, property, receiver);
            if(property === Symbol.for('debug.description') || property === Symbol.for('nodejs.util.inspect.custom') || property == "toString"){
                return d;
            }
            console.log({"类型":"get<--","调用者":target,"调用属性":property,"获取值":d});
            dogvm.memory.log.push({"类型":"get<--","调用者":target,"调用属性":property,"获取值":d});
            return d;  // target中访问属性不会再被proxy拦截，所以不会死循环
        }
    });
}

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


// CSS对象
var CSS = {};
Object.defineProperty(CSS, Symbol.toStringTag,{"value":"CSS","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CSS, "highlights",{"configurable":true,"enumerable":true,"get": function highlights_get(){debugger; return "[object HighlightRegistry]"},set:undefined, });
Object.defineProperty(CSS, "Hz",{"configurable":true,"enumerable":true,"writable":true,"value": function Hz(){debugger;},});dogvm.safefunction(CSS.Hz);
Object.defineProperty(CSS, "Q",{"configurable":true,"enumerable":true,"writable":true,"value": function Q(){debugger;},});dogvm.safefunction(CSS.Q);
Object.defineProperty(CSS, "cap",{"configurable":true,"enumerable":true,"writable":true,"value": function cap(){debugger;},});dogvm.safefunction(CSS.cap);
Object.defineProperty(CSS, "ch",{"configurable":true,"enumerable":true,"writable":true,"value": function ch(){debugger;},});dogvm.safefunction(CSS.ch);
Object.defineProperty(CSS, "cm",{"configurable":true,"enumerable":true,"writable":true,"value": function cm(){debugger;},});dogvm.safefunction(CSS.cm);
Object.defineProperty(CSS, "cqb",{"configurable":true,"enumerable":true,"writable":true,"value": function cqb(){debugger;},});dogvm.safefunction(CSS.cqb);
Object.defineProperty(CSS, "cqh",{"configurable":true,"enumerable":true,"writable":true,"value": function cqh(){debugger;},});dogvm.safefunction(CSS.cqh);
Object.defineProperty(CSS, "cqi",{"configurable":true,"enumerable":true,"writable":true,"value": function cqi(){debugger;},});dogvm.safefunction(CSS.cqi);
Object.defineProperty(CSS, "cqmax",{"configurable":true,"enumerable":true,"writable":true,"value": function cqmax(){debugger;},});dogvm.safefunction(CSS.cqmax);
Object.defineProperty(CSS, "cqmin",{"configurable":true,"enumerable":true,"writable":true,"value": function cqmin(){debugger;},});dogvm.safefunction(CSS.cqmin);
Object.defineProperty(CSS, "cqw",{"configurable":true,"enumerable":true,"writable":true,"value": function cqw(){debugger;},});dogvm.safefunction(CSS.cqw);
Object.defineProperty(CSS, "deg",{"configurable":true,"enumerable":true,"writable":true,"value": function deg(){debugger;},});dogvm.safefunction(CSS.deg);
Object.defineProperty(CSS, "dpcm",{"configurable":true,"enumerable":true,"writable":true,"value": function dpcm(){debugger;},});dogvm.safefunction(CSS.dpcm);
Object.defineProperty(CSS, "dpi",{"configurable":true,"enumerable":true,"writable":true,"value": function dpi(){debugger;},});dogvm.safefunction(CSS.dpi);
Object.defineProperty(CSS, "dppx",{"configurable":true,"enumerable":true,"writable":true,"value": function dppx(){debugger;},});dogvm.safefunction(CSS.dppx);
Object.defineProperty(CSS, "dvb",{"configurable":true,"enumerable":true,"writable":true,"value": function dvb(){debugger;},});dogvm.safefunction(CSS.dvb);
Object.defineProperty(CSS, "dvh",{"configurable":true,"enumerable":true,"writable":true,"value": function dvh(){debugger;},});dogvm.safefunction(CSS.dvh);
Object.defineProperty(CSS, "dvi",{"configurable":true,"enumerable":true,"writable":true,"value": function dvi(){debugger;},});dogvm.safefunction(CSS.dvi);
Object.defineProperty(CSS, "dvmax",{"configurable":true,"enumerable":true,"writable":true,"value": function dvmax(){debugger;},});dogvm.safefunction(CSS.dvmax);
Object.defineProperty(CSS, "dvmin",{"configurable":true,"enumerable":true,"writable":true,"value": function dvmin(){debugger;},});dogvm.safefunction(CSS.dvmin);
Object.defineProperty(CSS, "dvw",{"configurable":true,"enumerable":true,"writable":true,"value": function dvw(){debugger;},});dogvm.safefunction(CSS.dvw);
Object.defineProperty(CSS, "em",{"configurable":true,"enumerable":true,"writable":true,"value": function em(){debugger;},});dogvm.safefunction(CSS.em);
Object.defineProperty(CSS, "escape",{"configurable":true,"enumerable":true,"writable":true,"value": function escape(){debugger;},});dogvm.safefunction(CSS.escape);
Object.defineProperty(CSS, "ex",{"configurable":true,"enumerable":true,"writable":true,"value": function ex(){debugger;},});dogvm.safefunction(CSS.ex);
Object.defineProperty(CSS, "fr",{"configurable":true,"enumerable":true,"writable":true,"value": function fr(){debugger;},});dogvm.safefunction(CSS.fr);
Object.defineProperty(CSS, "grad",{"configurable":true,"enumerable":true,"writable":true,"value": function grad(){debugger;},});dogvm.safefunction(CSS.grad);
Object.defineProperty(CSS, "ic",{"configurable":true,"enumerable":true,"writable":true,"value": function ic(){debugger;},});dogvm.safefunction(CSS.ic);
Object.defineProperty(CSS, "in", {
    "configurable": true,
    "enumerable": true,
    "writable": true,
    "value": function () {
      debugger;
    },
  });
  dogvm.safefunction(CSS["in"]);
  
Object.defineProperty(CSS, "kHz",{"configurable":true,"enumerable":true,"writable":true,"value": function kHz(){debugger;},});dogvm.safefunction(CSS.kHz);
Object.defineProperty(CSS, "lh",{"configurable":true,"enumerable":true,"writable":true,"value": function lh(){debugger;},});dogvm.safefunction(CSS.lh);
Object.defineProperty(CSS, "lvb",{"configurable":true,"enumerable":true,"writable":true,"value": function lvb(){debugger;},});dogvm.safefunction(CSS.lvb);
Object.defineProperty(CSS, "lvh",{"configurable":true,"enumerable":true,"writable":true,"value": function lvh(){debugger;},});dogvm.safefunction(CSS.lvh);
Object.defineProperty(CSS, "lvi",{"configurable":true,"enumerable":true,"writable":true,"value": function lvi(){debugger;},});dogvm.safefunction(CSS.lvi);
Object.defineProperty(CSS, "lvmax",{"configurable":true,"enumerable":true,"writable":true,"value": function lvmax(){debugger;},});dogvm.safefunction(CSS.lvmax);
Object.defineProperty(CSS, "lvmin",{"configurable":true,"enumerable":true,"writable":true,"value": function lvmin(){debugger;},});dogvm.safefunction(CSS.lvmin);
Object.defineProperty(CSS, "lvw",{"configurable":true,"enumerable":true,"writable":true,"value": function lvw(){debugger;},});dogvm.safefunction(CSS.lvw);
Object.defineProperty(CSS, "mm",{"configurable":true,"enumerable":true,"writable":true,"value": function mm(){debugger;},});dogvm.safefunction(CSS.mm);
Object.defineProperty(CSS, "ms",{"configurable":true,"enumerable":true,"writable":true,"value": function ms(){debugger;},});dogvm.safefunction(CSS.ms);
Object.defineProperty(CSS, "number",{"configurable":true,"enumerable":true,"writable":true,"value": function number(){debugger;},});dogvm.safefunction(CSS.number);
Object.defineProperty(CSS, "pc",{"configurable":true,"enumerable":true,"writable":true,"value": function pc(){debugger;},});dogvm.safefunction(CSS.pc);
Object.defineProperty(CSS, "percent",{"configurable":true,"enumerable":true,"writable":true,"value": function percent(){debugger;},});dogvm.safefunction(CSS.percent);
Object.defineProperty(CSS, "pt",{"configurable":true,"enumerable":true,"writable":true,"value": function pt(){debugger;},});dogvm.safefunction(CSS.pt);
Object.defineProperty(CSS, "px",{"configurable":true,"enumerable":true,"writable":true,"value": function px(){debugger;},});dogvm.safefunction(CSS.px);
Object.defineProperty(CSS, "rad",{"configurable":true,"enumerable":true,"writable":true,"value": function rad(){debugger;},});dogvm.safefunction(CSS.rad);
Object.defineProperty(CSS, "rcap",{"configurable":true,"enumerable":true,"writable":true,"value": function rcap(){debugger;},});dogvm.safefunction(CSS.rcap);
Object.defineProperty(CSS, "rch",{"configurable":true,"enumerable":true,"writable":true,"value": function rch(){debugger;},});dogvm.safefunction(CSS.rch);
Object.defineProperty(CSS, "registerProperty",{"configurable":true,"enumerable":true,"writable":true,"value": function registerProperty(){debugger;},});dogvm.safefunction(CSS.registerProperty);
Object.defineProperty(CSS, "rem",{"configurable":true,"enumerable":true,"writable":true,"value": function rem(){debugger;},});dogvm.safefunction(CSS.rem);
Object.defineProperty(CSS, "rex",{"configurable":true,"enumerable":true,"writable":true,"value": function rex(){debugger;},});dogvm.safefunction(CSS.rex);
Object.defineProperty(CSS, "ric",{"configurable":true,"enumerable":true,"writable":true,"value": function ric(){debugger;},});dogvm.safefunction(CSS.ric);
Object.defineProperty(CSS, "rlh",{"configurable":true,"enumerable":true,"writable":true,"value": function rlh(){debugger;},});dogvm.safefunction(CSS.rlh);
Object.defineProperty(CSS, "s",{"configurable":true,"enumerable":true,"writable":true,"value": function s(){debugger;},});dogvm.safefunction(CSS.s);
Object.defineProperty(CSS, "svb",{"configurable":true,"enumerable":true,"writable":true,"value": function svb(){debugger;},});dogvm.safefunction(CSS.svb);
Object.defineProperty(CSS, "svh",{"configurable":true,"enumerable":true,"writable":true,"value": function svh(){debugger;},});dogvm.safefunction(CSS.svh);
Object.defineProperty(CSS, "svi",{"configurable":true,"enumerable":true,"writable":true,"value": function svi(){debugger;},});dogvm.safefunction(CSS.svi);
Object.defineProperty(CSS, "svmax",{"configurable":true,"enumerable":true,"writable":true,"value": function svmax(){debugger;},});dogvm.safefunction(CSS.svmax);
Object.defineProperty(CSS, "svmin",{"configurable":true,"enumerable":true,"writable":true,"value": function svmin(){debugger;},});dogvm.safefunction(CSS.svmin);
Object.defineProperty(CSS, "svw",{"configurable":true,"enumerable":true,"writable":true,"value": function svw(){debugger;},});dogvm.safefunction(CSS.svw);
Object.defineProperty(CSS, "turn",{"configurable":true,"enumerable":true,"writable":true,"value": function turn(){debugger;},});dogvm.safefunction(CSS.turn);
Object.defineProperty(CSS, "vb",{"configurable":true,"enumerable":true,"writable":true,"value": function vb(){debugger;},});dogvm.safefunction(CSS.vb);
Object.defineProperty(CSS, "vh",{"configurable":true,"enumerable":true,"writable":true,"value": function vh(){debugger;},});dogvm.safefunction(CSS.vh);
Object.defineProperty(CSS, "vi",{"configurable":true,"enumerable":true,"writable":true,"value": function vi(){debugger;},});dogvm.safefunction(CSS.vi);
Object.defineProperty(CSS, "vmax",{"configurable":true,"enumerable":true,"writable":true,"value": function vmax(){debugger;},});dogvm.safefunction(CSS.vmax);
Object.defineProperty(CSS, "vmin",{"configurable":true,"enumerable":true,"writable":true,"value": function vmin(){debugger;},});dogvm.safefunction(CSS.vmin);
Object.defineProperty(CSS, "vw",{"configurable":true,"enumerable":true,"writable":true,"value": function vw(){debugger;},});dogvm.safefunction(CSS.vw);
Object.defineProperty(CSS, "x",{"configurable":true,"enumerable":true,"writable":true,"value": function x(){debugger;},});dogvm.safefunction(CSS.x);
Object.defineProperty(CSS, "paintWorklet",{"configurable":true,"enumerable":true,"get": function paintWorklet_get(){debugger; return "[object Worklet]"},set:undefined, });

Object.defineProperty(CSS, "supports",{"configurable":true,"enumerable":true,"writable":true,
    "value": function supports(){
        if(arguments[0]=="overscroll-behavior" && arguments[1]=="auto"){
            return true;
        }
        debugger;
        return false;
    },});dogvm.safefunction(CSS.supports);

CSS = dogvm.proxy(CSS);
// CSSStyleDeclaration对象
var CSSStyleDeclaration = function CSSStyleDeclaration(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CSSStyleDeclaration);

Object.defineProperty(CSSStyleDeclaration.prototype, Symbol.toStringTag,{"value":"CSSStyleDeclaration","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CSSStyleDeclaration.prototype, "cssText",{"configurable":true,"enumerable":true,"get": function cssText_get(){debugger; return ""},"set": function cssText_set(){debugger;},});
Object.defineProperty(CSSStyleDeclaration.prototype, "length",{"configurable":true,"enumerable":true,"get": function length_get(){debugger; return "0"},set:undefined, });
Object.defineProperty(CSSStyleDeclaration.prototype, "parentRule",{"configurable":true,"enumerable":true,"get": function parentRule_get(){debugger; return "null"},set:undefined, });
Object.defineProperty(CSSStyleDeclaration.prototype, "cssFloat",{"configurable":true,"enumerable":true,"get": function cssFloat_get(){debugger; return ""},"set": function cssFloat_set(){debugger;},});
Object.defineProperty(CSSStyleDeclaration.prototype, "getPropertyPriority",{"configurable":true,"enumerable":true,"writable":true,"value": function getPropertyPriority(){debugger;},});dogvm.safefunction(CSSStyleDeclaration.prototype.getPropertyPriority);

Object.defineProperty(CSSStyleDeclaration.prototype, "item",{"configurable":true,"enumerable":true,"writable":true,"value": function item(){debugger;},});dogvm.safefunction(CSSStyleDeclaration.prototype.item);
Object.defineProperty(CSSStyleDeclaration.prototype, "removeProperty",{"configurable":true,"enumerable":true,"writable":true,"value": function removeProperty(){debugger;},});dogvm.safefunction(CSSStyleDeclaration.prototype.removeProperty);
Object.defineProperty(CSSStyleDeclaration.prototype, "setProperty",{"configurable":true,"enumerable":true,"writable":true,"value": function setProperty(){debugger;},});dogvm.safefunction(CSSStyleDeclaration.prototype.setProperty);

Object.defineProperty(CSSStyleDeclaration.prototype, "getPropertyValue",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function getPropertyValue(property){
        debugger;
        if (property == 'color'){
            return this.color;
        }
    },});dogvm.safefunction(CSSStyleDeclaration.prototype.getPropertyValue);



dogvm.safeproperty(CSSStyleDeclaration);


////////////////////////////////////// 实列
CSSStyleDeclaration.createCSSStyleDog = function createCSSStyleDog(element){
    // a对象
    debugger;
    let a = Object.create(CSSStyleDeclaration.prototype);
    Object.defineProperty(a,"display",{"configurable":true,"enumerable":true,"get": function display_get(){debugger; return this._display || ""},"set": function display_set(value){debugger;this._display = value;},})
    if(element == undefined){
        return dogvm.proxy(a);
    }
    function setColor(p){
        return p =='green' ? 'rgb(0, 128, 0)' : p=='red' ? 'rgb(255, 0, 0)' : p=='blue' ? 'rgb(0, 0, 255)'  : 'rgb(0, 0, 0)';
    }
    a.color = setColor(element.innerHTML);
    // 获取元素的最开始父节点
    let parentNode = {};
    for (const [key, value] of dogvm.memory.htmlNode ) {
        value.forEach(e => {
            e.innerHTML.includes(element.innerHTML) ? parentNode = key : null;
        });
    }

    for(const css of dogvm.memory.cssChose){
        let dealObj = css.selector.split(':')[0].trim();
        // body相关
        if(parentNode.constructor.name.includes('Body') && dealObj.includes("body")){
            // 有not
            if(css.selector.includes("not")){
                if(css.selector.includes(element.id)){
                    a.color = setColor(element.innerHTML);
                }else   a.color = setColor(css.color);
            }else{
                if(css.selector.includes(element.id)){
                    a.color = setColor(css.color);
                }else   a.color = setColor(element.innerHTML);
            }
        }
        // 不是body  判断是否含义目标
        contains = element.parentList.some(item => dealObj.includes(item));
        if(contains){
            if(css.selector.includes("not")){
                if(css.selector.includes(element.id)){
                    a.color = setColor(element.innerHTML);
                }else   a.color = setColor(css.color);
            }else{
                if(css.selector.includes(element.id)){
                    a.color = setColor(css.color);
                }else   a.color = setColor(element.innerHTML);
            }
        }
    }
    return dogvm.proxy(a);
};dogvm.safefunction(CSSStyleDeclaration.createCSSStyleDog);




// Location
var Location = function Location(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(Location);

Object.defineProperty(Location.prototype, Symbol.toStringTag,{"value":"Location","writable":false,"enumerable":false,"configurable":true});


// location对象
var location = {
    ancestorOrigins: 'https://pintia.cn'
}

// DOMStringList
DOMStringList = function DOMStringList(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(DOMStringList);

Object.defineProperty(DOMStringList.prototype, Symbol.toStringTag,{"value":"DOMStringList","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(DOMStringList.prototype, "length",{"configurable":true,"enumerable":true,"get": function length_get(){debugger;},set:undefined,});
Object.defineProperty(DOMStringList.prototype, "contains",{"configurable":true,"enumerable":true,"writable":true,"value": function contains(){debugger;},});dogvm.safefunction(DOMStringList.prototype.contains);
Object.defineProperty(DOMStringList.prototype, "item",{"configurable":true,"enumerable":true,"writable":true,"value": function item(){debugger;},});dogvm.safefunction(DOMStringList.prototype.item);

DOMStringList.getDOMDog = function getDOMDog(){
    let aaa = {};
    aaa.__proto__ = DOMStringList.prototype;
    return aaa;
};dogvm.safefunction(DOMStringList);

////////////////////////////////////
location.assign = function assign(){debugger;};dogvm.safefunction(location.assign);
location.hash = "";
location.host = "turing.captcha.gtimg.com";
location.hostname = "turing.captcha.gtimg.com";
location.href = "https://turing.captcha.gtimg.com/1/template/drag_ele.html";
location.origin = "https://turing.captcha.gtimg.com";
location.pathname = "/1/template/drag_ele.html";
location.port = "";
location.protocol = "https:";
location.reload = function reload(){debugger;};dogvm.safefunction(location.reload);dogvm.safefunction(location.reload);
location.replace = function replace(){debugger;};dogvm.safefunction(location.replace);dogvm.safefunction(location.replace);
location.search = "";

Object.setPrototypeOf(location, Location.prototype);
var Navigator = function Navigator() { // 构造函数
    throw new TypeError("Illegal constructor");
};
dogvm.safefunction(Navigator);

Object.defineProperties(Navigator.prototype, {
    [Symbol.toStringTag]: {
        value: "Navigator",
        configurable: true
    }
});

navigator = {};
navigator.__proto__ = Navigator.prototype;

////////// 浏览器代码自动生成部分

// Navigator对象
Object.defineProperty(Navigator.prototype, "vendorSub",{"configurable":true,"enumerable":true,"get": function vendorSub_get(){debugger; return ""},set:undefined, });
Object.defineProperty(Navigator.prototype, "productSub",{"configurable":true,"enumerable":true,"get": function productSub_get(){debugger; return "20030107"},set:undefined, });
Object.defineProperty(Navigator.prototype, "vendor",{"configurable":true,"enumerable":true,"get": function vendor_get(){debugger; return "Google Inc."},set:undefined, });
Object.defineProperty(Navigator.prototype, "maxTouchPoints",{"configurable":true,"enumerable":true,"get": function maxTouchPoints_get(){debugger; return "0"},set:undefined, });
Object.defineProperty(Navigator.prototype, "scheduling",{"configurable":true,"enumerable":true,"get": function scheduling_get(){debugger; return "[object Scheduling]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "userActivation",{"configurable":true,"enumerable":true,"get": function userActivation_get(){debugger; return "[object UserActivation]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "doNotTrack",{"configurable":true,"enumerable":true,"get": function doNotTrack_get(){debugger; return "null"},set:undefined, });
Object.defineProperty(Navigator.prototype, "geolocation",{"configurable":true,"enumerable":true,"get": function geolocation_get(){debugger; return "[object Geolocation]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "connection",{"configurable":true,"enumerable":true,"get": function connection_get(){debugger; return "[object NetworkInformation]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "plugins",{"configurable":true,"enumerable":true,"get": function plugins_get(){debugger; return "[object PluginArray]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "mimeTypes",{"configurable":true,"enumerable":true,"get": function mimeTypes_get(){debugger; return "[object MimeTypeArray]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "pdfViewerEnabled",{"configurable":true,"enumerable":true,"get": function pdfViewerEnabled_get(){debugger; return "true"},set:undefined, });
Object.defineProperty(Navigator.prototype, "webkitTemporaryStorage",{"configurable":true,"enumerable":true,"get": function webkitTemporaryStorage_get(){debugger; return "[object DeprecatedStorageQuota]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "webkitPersistentStorage",{"configurable":true,"enumerable":true,"get": function webkitPersistentStorage_get(){debugger; return "[object DeprecatedStorageQuota]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "windowControlsOverlay",{"configurable":true,"enumerable":true,"get": function windowControlsOverlay_get(){debugger; return "[object WindowControlsOverlay]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "hardwareConcurrency",{"configurable":true,"enumerable":true,"get": function hardwareConcurrency_get(){debugger; return 16},set:undefined, });
Object.defineProperty(Navigator.prototype, "cookieEnabled",{"configurable":true,"enumerable":true,"get": function cookieEnabled_get(){debugger; return "true"},set:undefined, });
Object.defineProperty(Navigator.prototype, "appCodeName",{"configurable":true,"enumerable":true,"get": function appCodeName_get(){debugger; return "Mozilla"},set:undefined, });
Object.defineProperty(Navigator.prototype, "appName",{"configurable":true,"enumerable":true,"get": function appName_get(){debugger; return "Netscape"},set:undefined, });
Object.defineProperty(Navigator.prototype, "appVersion",{"configurable":true,"enumerable":true,"get": function appVersion_get(){debugger; return "'5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0'"},set:undefined, });
Object.defineProperty(Navigator.prototype, "platform",{"configurable":true,"enumerable":true,"get": function platform_get(){debugger; return "Win32"},set:undefined, });
Object.defineProperty(Navigator.prototype, "product",{"configurable":true,"enumerable":true,"get": function product_get(){debugger; return "Gecko"},set:undefined, });
Object.defineProperty(Navigator.prototype, "userAgent",{"configurable":true,"enumerable":true,"get": function userAgent_get(){debugger; return "'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0'"},set:undefined, });
Object.defineProperty(Navigator.prototype, "language",{"configurable":true,"enumerable":true,"get": function language_get(){debugger; return "zh-CN"},set:undefined, });
Object.defineProperty(Navigator.prototype, "languages",{"configurable":true,"enumerable":true,"get": function languages_get(){debugger; return ['zh-CN', 'en', 'en-GB', 'en-US']},set:undefined, });
Object.defineProperty(Navigator.prototype, "onLine",{"configurable":true,"enumerable":true,"get": function onLine_get(){debugger; return "true"},set:undefined, });
Object.defineProperty(Navigator.prototype, "webdriver",{"configurable":true,"enumerable":true,"get": function webdriver_get(){debugger; return "false"},set:undefined, });
Object.defineProperty(Navigator.prototype, "getGamepads",{"configurable":true,"enumerable":true,"writable":true,"value": function getGamepads(){debugger;},});dogvm.safefunction(Navigator.prototype.getGamepads);
Object.defineProperty(Navigator.prototype, "javaEnabled",{"configurable":true,"enumerable":true,"writable":true,"value": function javaEnabled(){debugger;},});dogvm.safefunction(Navigator.prototype.javaEnabled);
Object.defineProperty(Navigator.prototype, "sendBeacon",{"configurable":true,"enumerable":true,"writable":true,"value": function sendBeacon(){debugger;},});dogvm.safefunction(Navigator.prototype.sendBeacon);
Object.defineProperty(Navigator.prototype, "vibrate",{"configurable":true,"enumerable":true,"writable":true,"value": function vibrate(){debugger;},});dogvm.safefunction(Navigator.prototype.vibrate);
Object.defineProperty(Navigator.prototype, "deprecatedRunAdAuctionEnforcesKAnonymity",{"configurable":true,"enumerable":true,"get": function deprecatedRunAdAuctionEnforcesKAnonymity_get(){debugger; return "false"},set:undefined, });
Object.defineProperty(Navigator.prototype, "protectedAudience",{"configurable":true,"enumerable":true,"get": function protectedAudience_get(){debugger; return "[object ProtectedAudience]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "bluetooth",{"configurable":true,"enumerable":true,"get": function bluetooth_get(){debugger; return "[object Bluetooth]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "storageBuckets",{"configurable":true,"enumerable":true,"get": function storageBuckets_get(){debugger; return "[object StorageBucketManager]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "clipboard",{"configurable":true,"enumerable":true,"get": function clipboard_get(){debugger; return "[object Clipboard]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "credentials",{"configurable":true,"enumerable":true,"get": function credentials_get(){debugger; return "[object CredentialsContainer]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "keyboard",{"configurable":true,"enumerable":true,"get": function keyboard_get(){debugger; return "[object Keyboard]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "managed",{"configurable":true,"enumerable":true,"get": function managed_get(){debugger; return "[object NavigatorManagedData]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "mediaDevices",{"configurable":true,"enumerable":true,"get": function mediaDevices_get(){debugger; return "[object MediaDevices]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "storage",{"configurable":true,"enumerable":true,"get": function storage_get(){debugger; return "[object StorageManager]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "serviceWorker",{"configurable":true,"enumerable":true,"get": function serviceWorker_get(){debugger; return ServiceWorkerContainer.createDog();},set:undefined, });
Object.defineProperty(Navigator.prototype, "virtualKeyboard",{"configurable":true,"enumerable":true,"get": function virtualKeyboard_get(){debugger; return "[object VirtualKeyboard]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "wakeLock",{"configurable":true,"enumerable":true,"get": function wakeLock_get(){debugger; return "[object WakeLock]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "deviceMemory",{"configurable":true,"enumerable":true,"get": function deviceMemory_get(){debugger; return "8"},set:undefined, });
Object.defineProperty(Navigator.prototype, "userAgentData",{"configurable":true,"enumerable":true,"get": function userAgentData_get(){debugger; return "[object NavigatorUAData]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "login",{"configurable":true,"enumerable":true,"get": function login_get(){debugger; return "[object NavigatorLogin]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "ink",{"configurable":true,"enumerable":true,"get": function ink_get(){debugger; return "[object Ink]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "mediaCapabilities",{"configurable":true,"enumerable":true,"get": function mediaCapabilities_get(){debugger; return "[object MediaCapabilities]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "hid",{"configurable":true,"enumerable":true,"get": function hid_get(){debugger; return "[object HID]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "locks",{"configurable":true,"enumerable":true,"get": function locks_get(){debugger; return "[object LockManager]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "gpu",{"configurable":true,"enumerable":true,"get": function gpu_get(){debugger; return "[object GPU]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "mediaSession",{"configurable":true,"enumerable":true,"get": function mediaSession_get(){debugger; return "[object MediaSession]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "permissions",{"configurable":true,"enumerable":true,"get": function permissions_get(){debugger; return "[object Permissions]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "presentation",{"configurable":true,"enumerable":true,"get": function presentation_get(){debugger; return "[object Presentation]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "usb",{"configurable":true,"enumerable":true,"get": function usb_get(){debugger; return "[object USB]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "xr",{"configurable":true,"enumerable":true,"get": function xr_get(){debugger; return "[object XRSystem]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "serial",{"configurable":true,"enumerable":true,"get": function serial_get(){debugger; return "[object Serial]"},set:undefined, });
Object.defineProperty(Navigator.prototype, "adAuctionComponents",{"configurable":true,"enumerable":true,"writable":true,"value": function adAuctionComponents(){debugger;},});dogvm.safefunction(Navigator.prototype.adAuctionComponents);
Object.defineProperty(Navigator.prototype, "runAdAuction",{"configurable":true,"enumerable":true,"writable":true,"value": function runAdAuction(){debugger;},});dogvm.safefunction(Navigator.prototype.runAdAuction);
Object.defineProperty(Navigator.prototype, "canLoadAdAuctionFencedFrame",{"configurable":true,"enumerable":true,"writable":true,"value": function canLoadAdAuctionFencedFrame(){debugger;},});dogvm.safefunction(Navigator.prototype.canLoadAdAuctionFencedFrame);
Object.defineProperty(Navigator.prototype, "canShare",{"configurable":true,"enumerable":true,"writable":true,"value": function canShare(){debugger;},});dogvm.safefunction(Navigator.prototype.canShare);
Object.defineProperty(Navigator.prototype, "share",{"configurable":true,"enumerable":true,"writable":true,"value": function share(){debugger;},});dogvm.safefunction(Navigator.prototype.share);
Object.defineProperty(Navigator.prototype, "clearAppBadge",{"configurable":true,"enumerable":true,"writable":true,"value": function clearAppBadge(){debugger;},});dogvm.safefunction(Navigator.prototype.clearAppBadge);
Object.defineProperty(Navigator.prototype, "getBattery",{"configurable":true,"enumerable":true,"writable":true,"value": function getBattery(){debugger;},});dogvm.safefunction(Navigator.prototype.getBattery);
Object.defineProperty(Navigator.prototype, "getUserMedia",{"configurable":true,"enumerable":true,"writable":true,"value": function getUserMedia(){debugger;},});dogvm.safefunction(Navigator.prototype.getUserMedia);
Object.defineProperty(Navigator.prototype, "requestMIDIAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function requestMIDIAccess(){debugger;},});dogvm.safefunction(Navigator.prototype.requestMIDIAccess);
Object.defineProperty(Navigator.prototype, "requestMediaKeySystemAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function requestMediaKeySystemAccess(){debugger;},});dogvm.safefunction(Navigator.prototype.requestMediaKeySystemAccess);
Object.defineProperty(Navigator.prototype, "setAppBadge",{"configurable":true,"enumerable":true,"writable":true,"value": function setAppBadge(){debugger;},});dogvm.safefunction(Navigator.prototype.setAppBadge);
Object.defineProperty(Navigator.prototype, "webkitGetUserMedia",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitGetUserMedia(){debugger;},});dogvm.safefunction(Navigator.prototype.webkitGetUserMedia);
Object.defineProperty(Navigator.prototype, "clearOriginJoinedAdInterestGroups",{"configurable":true,"enumerable":true,"writable":true,"value": function clearOriginJoinedAdInterestGroups(){debugger;},});dogvm.safefunction(Navigator.prototype.clearOriginJoinedAdInterestGroups);
Object.defineProperty(Navigator.prototype, "createAuctionNonce",{"configurable":true,"enumerable":true,"writable":true,"value": function createAuctionNonce(){debugger;},});dogvm.safefunction(Navigator.prototype.createAuctionNonce);
Object.defineProperty(Navigator.prototype, "joinAdInterestGroup",{"configurable":true,"enumerable":true,"writable":true,"value": function joinAdInterestGroup(){debugger;},});dogvm.safefunction(Navigator.prototype.joinAdInterestGroup);
Object.defineProperty(Navigator.prototype, "leaveAdInterestGroup",{"configurable":true,"enumerable":true,"writable":true,"value": function leaveAdInterestGroup(){debugger;},});dogvm.safefunction(Navigator.prototype.leaveAdInterestGroup);
Object.defineProperty(Navigator.prototype, "updateAdInterestGroups",{"configurable":true,"enumerable":true,"writable":true,"value": function updateAdInterestGroups(){debugger;},});dogvm.safefunction(Navigator.prototype.updateAdInterestGroups);
Object.defineProperty(Navigator.prototype, "deprecatedReplaceInURN",{"configurable":true,"enumerable":true,"writable":true,"value": function deprecatedReplaceInURN(){debugger;},});dogvm.safefunction(Navigator.prototype.deprecatedReplaceInURN);
Object.defineProperty(Navigator.prototype, "deprecatedURNToURL",{"configurable":true,"enumerable":true,"writable":true,"value": function deprecatedURNToURL(){debugger;},});dogvm.safefunction(Navigator.prototype.deprecatedURNToURL);
Object.defineProperty(Navigator.prototype, "getInstalledRelatedApps",{"configurable":true,"enumerable":true,"writable":true,"value": function getInstalledRelatedApps(){debugger;},});dogvm.safefunction(Navigator.prototype.getInstalledRelatedApps);
Object.defineProperty(Navigator.prototype, "getInterestGroupAdAuctionData",{"configurable":true,"enumerable":true,"writable":true,"value": function getInterestGroupAdAuctionData(){debugger;},});dogvm.safefunction(Navigator.prototype.getInterestGroupAdAuctionData);
Object.defineProperty(Navigator.prototype, "registerProtocolHandler",{"configurable":true,"enumerable":true,"writable":true,"value": function registerProtocolHandler(){debugger;},});dogvm.safefunction(Navigator.prototype.registerProtocolHandler);
Object.defineProperty(Navigator.prototype, "unregisterProtocolHandler",{"configurable":true,"enumerable":true,"writable":true,"value": function unregisterProtocolHandler(){debugger;},});dogvm.safefunction(Navigator.prototype.unregisterProtocolHandler);

////////////

////////

dogvm.safeproperty(Navigator);

navigator = dogvm.proxy(navigator);
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
// WebGLRenderingContext对象
var WebGLRenderingContext = function WebGLRenderingContext(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(WebGLRenderingContext);
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_BUFFER_BIT",{"configurable":false,"enumerable":true,"writable":false,"value":256,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BUFFER_BIT",{"configurable":false,"enumerable":true,"writable":false,"value":1024,});
Object.defineProperty(WebGLRenderingContext.prototype, "COLOR_BUFFER_BIT",{"configurable":false,"enumerable":true,"writable":false,"value":16384,});
Object.defineProperty(WebGLRenderingContext.prototype, "POINTS",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINES",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINE_LOOP",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINE_STRIP",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(WebGLRenderingContext.prototype, "TRIANGLES",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(WebGLRenderingContext.prototype, "TRIANGLE_STRIP",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(WebGLRenderingContext.prototype, "TRIANGLE_FAN",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(WebGLRenderingContext.prototype, "ZERO",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(WebGLRenderingContext.prototype, "SRC_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":768,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_SRC_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":769,});
Object.defineProperty(WebGLRenderingContext.prototype, "SRC_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":770,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_SRC_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":771,});
Object.defineProperty(WebGLRenderingContext.prototype, "DST_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":772,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_DST_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":773,});
Object.defineProperty(WebGLRenderingContext.prototype, "DST_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":774,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_DST_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":775,});
Object.defineProperty(WebGLRenderingContext.prototype, "SRC_ALPHA_SATURATE",{"configurable":false,"enumerable":true,"writable":false,"value":776,});
Object.defineProperty(WebGLRenderingContext.prototype, "FUNC_ADD",{"configurable":false,"enumerable":true,"writable":false,"value":32774,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_EQUATION",{"configurable":false,"enumerable":true,"writable":false,"value":32777,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_EQUATION_RGB",{"configurable":false,"enumerable":true,"writable":false,"value":32777,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_EQUATION_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":34877,});
Object.defineProperty(WebGLRenderingContext.prototype, "FUNC_SUBTRACT",{"configurable":false,"enumerable":true,"writable":false,"value":32778,});
Object.defineProperty(WebGLRenderingContext.prototype, "FUNC_REVERSE_SUBTRACT",{"configurable":false,"enumerable":true,"writable":false,"value":32779,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_DST_RGB",{"configurable":false,"enumerable":true,"writable":false,"value":32968,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_SRC_RGB",{"configurable":false,"enumerable":true,"writable":false,"value":32969,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_DST_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":32970,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_SRC_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":32971,});
Object.defineProperty(WebGLRenderingContext.prototype, "CONSTANT_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":32769,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_CONSTANT_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":32770,});
Object.defineProperty(WebGLRenderingContext.prototype, "CONSTANT_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":32771,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_CONSTANT_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":32772,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":32773,});
Object.defineProperty(WebGLRenderingContext.prototype, "ARRAY_BUFFER",{"configurable":false,"enumerable":true,"writable":false,"value":34962,});
Object.defineProperty(WebGLRenderingContext.prototype, "ELEMENT_ARRAY_BUFFER",{"configurable":false,"enumerable":true,"writable":false,"value":34963,});
Object.defineProperty(WebGLRenderingContext.prototype, "ARRAY_BUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":34964,});
Object.defineProperty(WebGLRenderingContext.prototype, "ELEMENT_ARRAY_BUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":34965,});
Object.defineProperty(WebGLRenderingContext.prototype, "STREAM_DRAW",{"configurable":false,"enumerable":true,"writable":false,"value":35040,});
Object.defineProperty(WebGLRenderingContext.prototype, "STATIC_DRAW",{"configurable":false,"enumerable":true,"writable":false,"value":35044,});
Object.defineProperty(WebGLRenderingContext.prototype, "DYNAMIC_DRAW",{"configurable":false,"enumerable":true,"writable":false,"value":35048,});
Object.defineProperty(WebGLRenderingContext.prototype, "BUFFER_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":34660,});
Object.defineProperty(WebGLRenderingContext.prototype, "BUFFER_USAGE",{"configurable":false,"enumerable":true,"writable":false,"value":34661,});
Object.defineProperty(WebGLRenderingContext.prototype, "CURRENT_VERTEX_ATTRIB",{"configurable":false,"enumerable":true,"writable":false,"value":34342,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRONT",{"configurable":false,"enumerable":true,"writable":false,"value":1028,});
Object.defineProperty(WebGLRenderingContext.prototype, "BACK",{"configurable":false,"enumerable":true,"writable":false,"value":1029,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRONT_AND_BACK",{"configurable":false,"enumerable":true,"writable":false,"value":1032,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_2D",{"configurable":false,"enumerable":true,"writable":false,"value":3553,});
Object.defineProperty(WebGLRenderingContext.prototype, "CULL_FACE",{"configurable":false,"enumerable":true,"writable":false,"value":2884,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND",{"configurable":false,"enumerable":true,"writable":false,"value":3042,});
Object.defineProperty(WebGLRenderingContext.prototype, "DITHER",{"configurable":false,"enumerable":true,"writable":false,"value":3024,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_TEST",{"configurable":false,"enumerable":true,"writable":false,"value":2960,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_TEST",{"configurable":false,"enumerable":true,"writable":false,"value":2929,});
Object.defineProperty(WebGLRenderingContext.prototype, "SCISSOR_TEST",{"configurable":false,"enumerable":true,"writable":false,"value":3089,});
Object.defineProperty(WebGLRenderingContext.prototype, "POLYGON_OFFSET_FILL",{"configurable":false,"enumerable":true,"writable":false,"value":32823,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_ALPHA_TO_COVERAGE",{"configurable":false,"enumerable":true,"writable":false,"value":32926,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_COVERAGE",{"configurable":false,"enumerable":true,"writable":false,"value":32928,});
Object.defineProperty(WebGLRenderingContext.prototype, "NO_ERROR",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVALID_ENUM",{"configurable":false,"enumerable":true,"writable":false,"value":1280,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVALID_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":1281,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVALID_OPERATION",{"configurable":false,"enumerable":true,"writable":false,"value":1282,});
Object.defineProperty(WebGLRenderingContext.prototype, "OUT_OF_MEMORY",{"configurable":false,"enumerable":true,"writable":false,"value":1285,});
Object.defineProperty(WebGLRenderingContext.prototype, "CW",{"configurable":false,"enumerable":true,"writable":false,"value":2304,});
Object.defineProperty(WebGLRenderingContext.prototype, "CCW",{"configurable":false,"enumerable":true,"writable":false,"value":2305,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINE_WIDTH",{"configurable":false,"enumerable":true,"writable":false,"value":2849,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALIASED_POINT_SIZE_RANGE",{"configurable":false,"enumerable":true,"writable":false,"value":33901,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALIASED_LINE_WIDTH_RANGE",{"configurable":false,"enumerable":true,"writable":false,"value":33902,});
Object.defineProperty(WebGLRenderingContext.prototype, "CULL_FACE_MODE",{"configurable":false,"enumerable":true,"writable":false,"value":2885,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRONT_FACE",{"configurable":false,"enumerable":true,"writable":false,"value":2886,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_RANGE",{"configurable":false,"enumerable":true,"writable":false,"value":2928,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_WRITEMASK",{"configurable":false,"enumerable":true,"writable":false,"value":2930,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_CLEAR_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":2931,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_FUNC",{"configurable":false,"enumerable":true,"writable":false,"value":2932,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_CLEAR_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":2961,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_FUNC",{"configurable":false,"enumerable":true,"writable":false,"value":2962,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_FAIL",{"configurable":false,"enumerable":true,"writable":false,"value":2964,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_PASS_DEPTH_FAIL",{"configurable":false,"enumerable":true,"writable":false,"value":2965,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_PASS_DEPTH_PASS",{"configurable":false,"enumerable":true,"writable":false,"value":2966,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_REF",{"configurable":false,"enumerable":true,"writable":false,"value":2967,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_VALUE_MASK",{"configurable":false,"enumerable":true,"writable":false,"value":2963,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_WRITEMASK",{"configurable":false,"enumerable":true,"writable":false,"value":2968,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_FUNC",{"configurable":false,"enumerable":true,"writable":false,"value":34816,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_FAIL",{"configurable":false,"enumerable":true,"writable":false,"value":34817,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_PASS_DEPTH_FAIL",{"configurable":false,"enumerable":true,"writable":false,"value":34818,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_PASS_DEPTH_PASS",{"configurable":false,"enumerable":true,"writable":false,"value":34819,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_REF",{"configurable":false,"enumerable":true,"writable":false,"value":36003,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_VALUE_MASK",{"configurable":false,"enumerable":true,"writable":false,"value":36004,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_WRITEMASK",{"configurable":false,"enumerable":true,"writable":false,"value":36005,});
Object.defineProperty(WebGLRenderingContext.prototype, "VIEWPORT",{"configurable":false,"enumerable":true,"writable":false,"value":2978,});
Object.defineProperty(WebGLRenderingContext.prototype, "SCISSOR_BOX",{"configurable":false,"enumerable":true,"writable":false,"value":3088,});
Object.defineProperty(WebGLRenderingContext.prototype, "COLOR_CLEAR_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":3106,});
Object.defineProperty(WebGLRenderingContext.prototype, "COLOR_WRITEMASK",{"configurable":false,"enumerable":true,"writable":false,"value":3107,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNPACK_ALIGNMENT",{"configurable":false,"enumerable":true,"writable":false,"value":3317,});
Object.defineProperty(WebGLRenderingContext.prototype, "PACK_ALIGNMENT",{"configurable":false,"enumerable":true,"writable":false,"value":3333,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_TEXTURE_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":3379,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VIEWPORT_DIMS",{"configurable":false,"enumerable":true,"writable":false,"value":3386,});
Object.defineProperty(WebGLRenderingContext.prototype, "SUBPIXEL_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3408,});
Object.defineProperty(WebGLRenderingContext.prototype, "RED_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3410,});
Object.defineProperty(WebGLRenderingContext.prototype, "GREEN_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3411,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLUE_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3412,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALPHA_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3413,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3414,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3415,});
Object.defineProperty(WebGLRenderingContext.prototype, "POLYGON_OFFSET_UNITS",{"configurable":false,"enumerable":true,"writable":false,"value":10752,});
Object.defineProperty(WebGLRenderingContext.prototype, "POLYGON_OFFSET_FACTOR",{"configurable":false,"enumerable":true,"writable":false,"value":32824,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_BINDING_2D",{"configurable":false,"enumerable":true,"writable":false,"value":32873,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_BUFFERS",{"configurable":false,"enumerable":true,"writable":false,"value":32936,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLES",{"configurable":false,"enumerable":true,"writable":false,"value":32937,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_COVERAGE_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":32938,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_COVERAGE_INVERT",{"configurable":false,"enumerable":true,"writable":false,"value":32939,});
Object.defineProperty(WebGLRenderingContext.prototype, "COMPRESSED_TEXTURE_FORMATS",{"configurable":false,"enumerable":true,"writable":false,"value":34467,});
Object.defineProperty(WebGLRenderingContext.prototype, "DONT_CARE",{"configurable":false,"enumerable":true,"writable":false,"value":4352,});
Object.defineProperty(WebGLRenderingContext.prototype, "FASTEST",{"configurable":false,"enumerable":true,"writable":false,"value":4353,});
Object.defineProperty(WebGLRenderingContext.prototype, "NICEST",{"configurable":false,"enumerable":true,"writable":false,"value":4354,});
Object.defineProperty(WebGLRenderingContext.prototype, "GENERATE_MIPMAP_HINT",{"configurable":false,"enumerable":true,"writable":false,"value":33170,});
Object.defineProperty(WebGLRenderingContext.prototype, "BYTE",{"configurable":false,"enumerable":true,"writable":false,"value":5120,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_BYTE",{"configurable":false,"enumerable":true,"writable":false,"value":5121,});
Object.defineProperty(WebGLRenderingContext.prototype, "SHORT",{"configurable":false,"enumerable":true,"writable":false,"value":5122,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_SHORT",{"configurable":false,"enumerable":true,"writable":false,"value":5123,});
Object.defineProperty(WebGLRenderingContext.prototype, "INT",{"configurable":false,"enumerable":true,"writable":false,"value":5124,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_INT",{"configurable":false,"enumerable":true,"writable":false,"value":5125,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT",{"configurable":false,"enumerable":true,"writable":false,"value":5126,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_COMPONENT",{"configurable":false,"enumerable":true,"writable":false,"value":6402,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":6406,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGB",{"configurable":false,"enumerable":true,"writable":false,"value":6407,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGBA",{"configurable":false,"enumerable":true,"writable":false,"value":6408,});
Object.defineProperty(WebGLRenderingContext.prototype, "LUMINANCE",{"configurable":false,"enumerable":true,"writable":false,"value":6409,});
Object.defineProperty(WebGLRenderingContext.prototype, "LUMINANCE_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":6410,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_SHORT_4_4_4_4",{"configurable":false,"enumerable":true,"writable":false,"value":32819,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_SHORT_5_5_5_1",{"configurable":false,"enumerable":true,"writable":false,"value":32820,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_SHORT_5_6_5",{"configurable":false,"enumerable":true,"writable":false,"value":33635,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAGMENT_SHADER",{"configurable":false,"enumerable":true,"writable":false,"value":35632,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_SHADER",{"configurable":false,"enumerable":true,"writable":false,"value":35633,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VERTEX_ATTRIBS",{"configurable":false,"enumerable":true,"writable":false,"value":34921,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VERTEX_UNIFORM_VECTORS",{"configurable":false,"enumerable":true,"writable":false,"value":36347,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VARYING_VECTORS",{"configurable":false,"enumerable":true,"writable":false,"value":36348,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_COMBINED_TEXTURE_IMAGE_UNITS",{"configurable":false,"enumerable":true,"writable":false,"value":35661,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VERTEX_TEXTURE_IMAGE_UNITS",{"configurable":false,"enumerable":true,"writable":false,"value":35660,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_TEXTURE_IMAGE_UNITS",{"configurable":false,"enumerable":true,"writable":false,"value":34930,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_FRAGMENT_UNIFORM_VECTORS",{"configurable":false,"enumerable":true,"writable":false,"value":36349,});
Object.defineProperty(WebGLRenderingContext.prototype, "SHADER_TYPE",{"configurable":false,"enumerable":true,"writable":false,"value":35663,});
Object.defineProperty(WebGLRenderingContext.prototype, "DELETE_STATUS",{"configurable":false,"enumerable":true,"writable":false,"value":35712,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINK_STATUS",{"configurable":false,"enumerable":true,"writable":false,"value":35714,});
Object.defineProperty(WebGLRenderingContext.prototype, "VALIDATE_STATUS",{"configurable":false,"enumerable":true,"writable":false,"value":35715,});
Object.defineProperty(WebGLRenderingContext.prototype, "ATTACHED_SHADERS",{"configurable":false,"enumerable":true,"writable":false,"value":35717,});
Object.defineProperty(WebGLRenderingContext.prototype, "ACTIVE_UNIFORMS",{"configurable":false,"enumerable":true,"writable":false,"value":35718,});
Object.defineProperty(WebGLRenderingContext.prototype, "ACTIVE_ATTRIBUTES",{"configurable":false,"enumerable":true,"writable":false,"value":35721,});
Object.defineProperty(WebGLRenderingContext.prototype, "SHADING_LANGUAGE_VERSION",{"configurable":false,"enumerable":true,"writable":false,"value":35724,});
Object.defineProperty(WebGLRenderingContext.prototype, "CURRENT_PROGRAM",{"configurable":false,"enumerable":true,"writable":false,"value":35725,});
Object.defineProperty(WebGLRenderingContext.prototype, "NEVER",{"configurable":false,"enumerable":true,"writable":false,"value":512,});
Object.defineProperty(WebGLRenderingContext.prototype, "LESS",{"configurable":false,"enumerable":true,"writable":false,"value":513,});
Object.defineProperty(WebGLRenderingContext.prototype, "EQUAL",{"configurable":false,"enumerable":true,"writable":false,"value":514,});
Object.defineProperty(WebGLRenderingContext.prototype, "LEQUAL",{"configurable":false,"enumerable":true,"writable":false,"value":515,});
Object.defineProperty(WebGLRenderingContext.prototype, "GREATER",{"configurable":false,"enumerable":true,"writable":false,"value":516,});
Object.defineProperty(WebGLRenderingContext.prototype, "NOTEQUAL",{"configurable":false,"enumerable":true,"writable":false,"value":517,});
Object.defineProperty(WebGLRenderingContext.prototype, "GEQUAL",{"configurable":false,"enumerable":true,"writable":false,"value":518,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALWAYS",{"configurable":false,"enumerable":true,"writable":false,"value":519,});
Object.defineProperty(WebGLRenderingContext.prototype, "KEEP",{"configurable":false,"enumerable":true,"writable":false,"value":7680,});
Object.defineProperty(WebGLRenderingContext.prototype, "REPLACE",{"configurable":false,"enumerable":true,"writable":false,"value":7681,});
Object.defineProperty(WebGLRenderingContext.prototype, "INCR",{"configurable":false,"enumerable":true,"writable":false,"value":7682,});
Object.defineProperty(WebGLRenderingContext.prototype, "DECR",{"configurable":false,"enumerable":true,"writable":false,"value":7683,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVERT",{"configurable":false,"enumerable":true,"writable":false,"value":5386,});
Object.defineProperty(WebGLRenderingContext.prototype, "INCR_WRAP",{"configurable":false,"enumerable":true,"writable":false,"value":34055,});
Object.defineProperty(WebGLRenderingContext.prototype, "DECR_WRAP",{"configurable":false,"enumerable":true,"writable":false,"value":34056,});
Object.defineProperty(WebGLRenderingContext.prototype, "VENDOR",{"configurable":false,"enumerable":true,"writable":false,"value":7936,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERER",{"configurable":false,"enumerable":true,"writable":false,"value":7937,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERSION",{"configurable":false,"enumerable":true,"writable":false,"value":7938,});
Object.defineProperty(WebGLRenderingContext.prototype, "NEAREST",{"configurable":false,"enumerable":true,"writable":false,"value":9728,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINEAR",{"configurable":false,"enumerable":true,"writable":false,"value":9729,});
Object.defineProperty(WebGLRenderingContext.prototype, "NEAREST_MIPMAP_NEAREST",{"configurable":false,"enumerable":true,"writable":false,"value":9984,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINEAR_MIPMAP_NEAREST",{"configurable":false,"enumerable":true,"writable":false,"value":9985,});
Object.defineProperty(WebGLRenderingContext.prototype, "NEAREST_MIPMAP_LINEAR",{"configurable":false,"enumerable":true,"writable":false,"value":9986,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINEAR_MIPMAP_LINEAR",{"configurable":false,"enumerable":true,"writable":false,"value":9987,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_MAG_FILTER",{"configurable":false,"enumerable":true,"writable":false,"value":10240,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_MIN_FILTER",{"configurable":false,"enumerable":true,"writable":false,"value":10241,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_WRAP_S",{"configurable":false,"enumerable":true,"writable":false,"value":10242,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_WRAP_T",{"configurable":false,"enumerable":true,"writable":false,"value":10243,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE",{"configurable":false,"enumerable":true,"writable":false,"value":5890,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP",{"configurable":false,"enumerable":true,"writable":false,"value":34067,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_BINDING_CUBE_MAP",{"configurable":false,"enumerable":true,"writable":false,"value":34068,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_POSITIVE_X",{"configurable":false,"enumerable":true,"writable":false,"value":34069,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_NEGATIVE_X",{"configurable":false,"enumerable":true,"writable":false,"value":34070,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_POSITIVE_Y",{"configurable":false,"enumerable":true,"writable":false,"value":34071,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_NEGATIVE_Y",{"configurable":false,"enumerable":true,"writable":false,"value":34072,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_POSITIVE_Z",{"configurable":false,"enumerable":true,"writable":false,"value":34073,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_NEGATIVE_Z",{"configurable":false,"enumerable":true,"writable":false,"value":34074,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_CUBE_MAP_TEXTURE_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":34076,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE0",{"configurable":false,"enumerable":true,"writable":false,"value":33984,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE1",{"configurable":false,"enumerable":true,"writable":false,"value":33985,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE2",{"configurable":false,"enumerable":true,"writable":false,"value":33986,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE3",{"configurable":false,"enumerable":true,"writable":false,"value":33987,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE4",{"configurable":false,"enumerable":true,"writable":false,"value":33988,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE5",{"configurable":false,"enumerable":true,"writable":false,"value":33989,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE6",{"configurable":false,"enumerable":true,"writable":false,"value":33990,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE7",{"configurable":false,"enumerable":true,"writable":false,"value":33991,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE8",{"configurable":false,"enumerable":true,"writable":false,"value":33992,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE9",{"configurable":false,"enumerable":true,"writable":false,"value":33993,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE10",{"configurable":false,"enumerable":true,"writable":false,"value":33994,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE11",{"configurable":false,"enumerable":true,"writable":false,"value":33995,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE12",{"configurable":false,"enumerable":true,"writable":false,"value":33996,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE13",{"configurable":false,"enumerable":true,"writable":false,"value":33997,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE14",{"configurable":false,"enumerable":true,"writable":false,"value":33998,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE15",{"configurable":false,"enumerable":true,"writable":false,"value":33999,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE16",{"configurable":false,"enumerable":true,"writable":false,"value":34000,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE17",{"configurable":false,"enumerable":true,"writable":false,"value":34001,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE18",{"configurable":false,"enumerable":true,"writable":false,"value":34002,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE19",{"configurable":false,"enumerable":true,"writable":false,"value":34003,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE20",{"configurable":false,"enumerable":true,"writable":false,"value":34004,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE21",{"configurable":false,"enumerable":true,"writable":false,"value":34005,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE22",{"configurable":false,"enumerable":true,"writable":false,"value":34006,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE23",{"configurable":false,"enumerable":true,"writable":false,"value":34007,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE24",{"configurable":false,"enumerable":true,"writable":false,"value":34008,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE25",{"configurable":false,"enumerable":true,"writable":false,"value":34009,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE26",{"configurable":false,"enumerable":true,"writable":false,"value":34010,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE27",{"configurable":false,"enumerable":true,"writable":false,"value":34011,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE28",{"configurable":false,"enumerable":true,"writable":false,"value":34012,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE29",{"configurable":false,"enumerable":true,"writable":false,"value":34013,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE30",{"configurable":false,"enumerable":true,"writable":false,"value":34014,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE31",{"configurable":false,"enumerable":true,"writable":false,"value":34015,});
Object.defineProperty(WebGLRenderingContext.prototype, "ACTIVE_TEXTURE",{"configurable":false,"enumerable":true,"writable":false,"value":34016,});
Object.defineProperty(WebGLRenderingContext.prototype, "REPEAT",{"configurable":false,"enumerable":true,"writable":false,"value":10497,});
Object.defineProperty(WebGLRenderingContext.prototype, "CLAMP_TO_EDGE",{"configurable":false,"enumerable":true,"writable":false,"value":33071,});
Object.defineProperty(WebGLRenderingContext.prototype, "MIRRORED_REPEAT",{"configurable":false,"enumerable":true,"writable":false,"value":33648,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_VEC2",{"configurable":false,"enumerable":true,"writable":false,"value":35664,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_VEC3",{"configurable":false,"enumerable":true,"writable":false,"value":35665,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_VEC4",{"configurable":false,"enumerable":true,"writable":false,"value":35666,});
Object.defineProperty(WebGLRenderingContext.prototype, "INT_VEC2",{"configurable":false,"enumerable":true,"writable":false,"value":35667,});
Object.defineProperty(WebGLRenderingContext.prototype, "INT_VEC3",{"configurable":false,"enumerable":true,"writable":false,"value":35668,});
Object.defineProperty(WebGLRenderingContext.prototype, "INT_VEC4",{"configurable":false,"enumerable":true,"writable":false,"value":35669,});
Object.defineProperty(WebGLRenderingContext.prototype, "BOOL",{"configurable":false,"enumerable":true,"writable":false,"value":35670,});
Object.defineProperty(WebGLRenderingContext.prototype, "BOOL_VEC2",{"configurable":false,"enumerable":true,"writable":false,"value":35671,});
Object.defineProperty(WebGLRenderingContext.prototype, "BOOL_VEC3",{"configurable":false,"enumerable":true,"writable":false,"value":35672,});
Object.defineProperty(WebGLRenderingContext.prototype, "BOOL_VEC4",{"configurable":false,"enumerable":true,"writable":false,"value":35673,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_MAT2",{"configurable":false,"enumerable":true,"writable":false,"value":35674,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_MAT3",{"configurable":false,"enumerable":true,"writable":false,"value":35675,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_MAT4",{"configurable":false,"enumerable":true,"writable":false,"value":35676,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLER_2D",{"configurable":false,"enumerable":true,"writable":false,"value":35678,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLER_CUBE",{"configurable":false,"enumerable":true,"writable":false,"value":35680,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_ENABLED",{"configurable":false,"enumerable":true,"writable":false,"value":34338,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":34339,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_STRIDE",{"configurable":false,"enumerable":true,"writable":false,"value":34340,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_TYPE",{"configurable":false,"enumerable":true,"writable":false,"value":34341,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_NORMALIZED",{"configurable":false,"enumerable":true,"writable":false,"value":34922,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_POINTER",{"configurable":false,"enumerable":true,"writable":false,"value":34373,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":34975,});
Object.defineProperty(WebGLRenderingContext.prototype, "IMPLEMENTATION_COLOR_READ_TYPE",{"configurable":false,"enumerable":true,"writable":false,"value":35738,});
Object.defineProperty(WebGLRenderingContext.prototype, "IMPLEMENTATION_COLOR_READ_FORMAT",{"configurable":false,"enumerable":true,"writable":false,"value":35739,});
Object.defineProperty(WebGLRenderingContext.prototype, "COMPILE_STATUS",{"configurable":false,"enumerable":true,"writable":false,"value":35713,});
Object.defineProperty(WebGLRenderingContext.prototype, "LOW_FLOAT",{"configurable":false,"enumerable":true,"writable":false,"value":36336,});
Object.defineProperty(WebGLRenderingContext.prototype, "MEDIUM_FLOAT",{"configurable":false,"enumerable":true,"writable":false,"value":36337,});
Object.defineProperty(WebGLRenderingContext.prototype, "HIGH_FLOAT",{"configurable":false,"enumerable":true,"writable":false,"value":36338,});
Object.defineProperty(WebGLRenderingContext.prototype, "LOW_INT",{"configurable":false,"enumerable":true,"writable":false,"value":36339,});
Object.defineProperty(WebGLRenderingContext.prototype, "MEDIUM_INT",{"configurable":false,"enumerable":true,"writable":false,"value":36340,});
Object.defineProperty(WebGLRenderingContext.prototype, "HIGH_INT",{"configurable":false,"enumerable":true,"writable":false,"value":36341,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER",{"configurable":false,"enumerable":true,"writable":false,"value":36160,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER",{"configurable":false,"enumerable":true,"writable":false,"value":36161,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGBA4",{"configurable":false,"enumerable":true,"writable":false,"value":32854,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGB5_A1",{"configurable":false,"enumerable":true,"writable":false,"value":32855,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGB565",{"configurable":false,"enumerable":true,"writable":false,"value":36194,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_COMPONENT16",{"configurable":false,"enumerable":true,"writable":false,"value":33189,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_INDEX8",{"configurable":false,"enumerable":true,"writable":false,"value":36168,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_STENCIL",{"configurable":false,"enumerable":true,"writable":false,"value":34041,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_WIDTH",{"configurable":false,"enumerable":true,"writable":false,"value":36162,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_HEIGHT",{"configurable":false,"enumerable":true,"writable":false,"value":36163,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_INTERNAL_FORMAT",{"configurable":false,"enumerable":true,"writable":false,"value":36164,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_RED_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36176,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_GREEN_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36177,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_BLUE_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36178,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_ALPHA_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36179,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_DEPTH_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36180,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_STENCIL_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36181,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",{"configurable":false,"enumerable":true,"writable":false,"value":36048,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",{"configurable":false,"enumerable":true,"writable":false,"value":36049,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",{"configurable":false,"enumerable":true,"writable":false,"value":36050,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",{"configurable":false,"enumerable":true,"writable":false,"value":36051,});
Object.defineProperty(WebGLRenderingContext.prototype, "COLOR_ATTACHMENT0",{"configurable":false,"enumerable":true,"writable":false,"value":36064,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":36096,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":36128,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_STENCIL_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":33306,});
Object.defineProperty(WebGLRenderingContext.prototype, "NONE",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_COMPLETE",{"configurable":false,"enumerable":true,"writable":false,"value":36053,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":36054,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":36055,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",{"configurable":false,"enumerable":true,"writable":false,"value":36057,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_UNSUPPORTED",{"configurable":false,"enumerable":true,"writable":false,"value":36061,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":36006,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":36007,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_RENDERBUFFER_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":34024,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVALID_FRAMEBUFFER_OPERATION",{"configurable":false,"enumerable":true,"writable":false,"value":1286,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNPACK_FLIP_Y_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37440,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNPACK_PREMULTIPLY_ALPHA_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37441,});
Object.defineProperty(WebGLRenderingContext.prototype, "CONTEXT_LOST_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37442,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNPACK_COLORSPACE_CONVERSION_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37443,});
Object.defineProperty(WebGLRenderingContext.prototype, "BROWSER_DEFAULT_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37444,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGB8",{"configurable":false,"enumerable":true,"writable":false,"value":32849,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGBA8",{"configurable":false,"enumerable":true,"writable":false,"value":32856,});
Object.defineProperty(WebGLRenderingContext.prototype, Symbol.toStringTag,{"value":"WebGLRenderingContext","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(WebGLRenderingContext.prototype, "canvas",{"configurable":true,"enumerable":true,"get": function canvas_get(){},});
Object.defineProperty(WebGLRenderingContext.prototype, "drawingBufferWidth",{"configurable":true,"enumerable":true,"get": function drawingBufferWidth_get(){}, });
Object.defineProperty(WebGLRenderingContext.prototype, "drawingBufferHeight",{"configurable":true,"enumerable":true,"get": function drawingBufferHeight_get(){}, });
Object.defineProperty(WebGLRenderingContext.prototype, "drawingBufferColorSpace",{"configurable":true,"enumerable":true,"get": function drawingBufferColorSpace_get(){},});
Object.defineProperty(WebGLRenderingContext.prototype, "unpackColorSpace",{"configurable":true,"enumerable":true,"get": function unpackColorSpace_get(){},"set": function unpackColorSpace_set(){},});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_BUFFER_BIT",{"configurable":false,"enumerable":true,"writable":false,"value":256,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BUFFER_BIT",{"configurable":false,"enumerable":true,"writable":false,"value":1024,});
Object.defineProperty(WebGLRenderingContext.prototype, "COLOR_BUFFER_BIT",{"configurable":false,"enumerable":true,"writable":false,"value":16384,});
Object.defineProperty(WebGLRenderingContext.prototype, "POINTS",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINES",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINE_LOOP",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINE_STRIP",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(WebGLRenderingContext.prototype, "TRIANGLES",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(WebGLRenderingContext.prototype, "TRIANGLE_STRIP",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(WebGLRenderingContext.prototype, "TRIANGLE_FAN",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(WebGLRenderingContext.prototype, "ZERO",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(WebGLRenderingContext.prototype, "SRC_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":768,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_SRC_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":769,});
Object.defineProperty(WebGLRenderingContext.prototype, "SRC_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":770,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_SRC_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":771,});
Object.defineProperty(WebGLRenderingContext.prototype, "DST_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":772,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_DST_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":773,});
Object.defineProperty(WebGLRenderingContext.prototype, "DST_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":774,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_DST_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":775,});
Object.defineProperty(WebGLRenderingContext.prototype, "SRC_ALPHA_SATURATE",{"configurable":false,"enumerable":true,"writable":false,"value":776,});
Object.defineProperty(WebGLRenderingContext.prototype, "FUNC_ADD",{"configurable":false,"enumerable":true,"writable":false,"value":32774,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_EQUATION",{"configurable":false,"enumerable":true,"writable":false,"value":32777,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_EQUATION_RGB",{"configurable":false,"enumerable":true,"writable":false,"value":32777,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_EQUATION_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":34877,});
Object.defineProperty(WebGLRenderingContext.prototype, "FUNC_SUBTRACT",{"configurable":false,"enumerable":true,"writable":false,"value":32778,});
Object.defineProperty(WebGLRenderingContext.prototype, "FUNC_REVERSE_SUBTRACT",{"configurable":false,"enumerable":true,"writable":false,"value":32779,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_DST_RGB",{"configurable":false,"enumerable":true,"writable":false,"value":32968,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_SRC_RGB",{"configurable":false,"enumerable":true,"writable":false,"value":32969,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_DST_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":32970,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_SRC_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":32971,});
Object.defineProperty(WebGLRenderingContext.prototype, "CONSTANT_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":32769,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_CONSTANT_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":32770,});
Object.defineProperty(WebGLRenderingContext.prototype, "CONSTANT_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":32771,});
Object.defineProperty(WebGLRenderingContext.prototype, "ONE_MINUS_CONSTANT_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":32772,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND_COLOR",{"configurable":false,"enumerable":true,"writable":false,"value":32773,});
Object.defineProperty(WebGLRenderingContext.prototype, "ARRAY_BUFFER",{"configurable":false,"enumerable":true,"writable":false,"value":34962,});
Object.defineProperty(WebGLRenderingContext.prototype, "ELEMENT_ARRAY_BUFFER",{"configurable":false,"enumerable":true,"writable":false,"value":34963,});
Object.defineProperty(WebGLRenderingContext.prototype, "ARRAY_BUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":34964,});
Object.defineProperty(WebGLRenderingContext.prototype, "ELEMENT_ARRAY_BUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":34965,});
Object.defineProperty(WebGLRenderingContext.prototype, "STREAM_DRAW",{"configurable":false,"enumerable":true,"writable":false,"value":35040,});
Object.defineProperty(WebGLRenderingContext.prototype, "STATIC_DRAW",{"configurable":false,"enumerable":true,"writable":false,"value":35044,});
Object.defineProperty(WebGLRenderingContext.prototype, "DYNAMIC_DRAW",{"configurable":false,"enumerable":true,"writable":false,"value":35048,});
Object.defineProperty(WebGLRenderingContext.prototype, "BUFFER_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":34660,});
Object.defineProperty(WebGLRenderingContext.prototype, "BUFFER_USAGE",{"configurable":false,"enumerable":true,"writable":false,"value":34661,});
Object.defineProperty(WebGLRenderingContext.prototype, "CURRENT_VERTEX_ATTRIB",{"configurable":false,"enumerable":true,"writable":false,"value":34342,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRONT",{"configurable":false,"enumerable":true,"writable":false,"value":1028,});
Object.defineProperty(WebGLRenderingContext.prototype, "BACK",{"configurable":false,"enumerable":true,"writable":false,"value":1029,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRONT_AND_BACK",{"configurable":false,"enumerable":true,"writable":false,"value":1032,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_2D",{"configurable":false,"enumerable":true,"writable":false,"value":3553,});
Object.defineProperty(WebGLRenderingContext.prototype, "CULL_FACE",{"configurable":false,"enumerable":true,"writable":false,"value":2884,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLEND",{"configurable":false,"enumerable":true,"writable":false,"value":3042,});
Object.defineProperty(WebGLRenderingContext.prototype, "DITHER",{"configurable":false,"enumerable":true,"writable":false,"value":3024,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_TEST",{"configurable":false,"enumerable":true,"writable":false,"value":2960,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_TEST",{"configurable":false,"enumerable":true,"writable":false,"value":2929,});
Object.defineProperty(WebGLRenderingContext.prototype, "SCISSOR_TEST",{"configurable":false,"enumerable":true,"writable":false,"value":3089,});
Object.defineProperty(WebGLRenderingContext.prototype, "POLYGON_OFFSET_FILL",{"configurable":false,"enumerable":true,"writable":false,"value":32823,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_ALPHA_TO_COVERAGE",{"configurable":false,"enumerable":true,"writable":false,"value":32926,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_COVERAGE",{"configurable":false,"enumerable":true,"writable":false,"value":32928,});
Object.defineProperty(WebGLRenderingContext.prototype, "NO_ERROR",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVALID_ENUM",{"configurable":false,"enumerable":true,"writable":false,"value":1280,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVALID_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":1281,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVALID_OPERATION",{"configurable":false,"enumerable":true,"writable":false,"value":1282,});
Object.defineProperty(WebGLRenderingContext.prototype, "OUT_OF_MEMORY",{"configurable":false,"enumerable":true,"writable":false,"value":1285,});
Object.defineProperty(WebGLRenderingContext.prototype, "CW",{"configurable":false,"enumerable":true,"writable":false,"value":2304,});
Object.defineProperty(WebGLRenderingContext.prototype, "CCW",{"configurable":false,"enumerable":true,"writable":false,"value":2305,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINE_WIDTH",{"configurable":false,"enumerable":true,"writable":false,"value":2849,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALIASED_POINT_SIZE_RANGE",{"configurable":false,"enumerable":true,"writable":false,"value":33901,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALIASED_LINE_WIDTH_RANGE",{"configurable":false,"enumerable":true,"writable":false,"value":33902,});
Object.defineProperty(WebGLRenderingContext.prototype, "CULL_FACE_MODE",{"configurable":false,"enumerable":true,"writable":false,"value":2885,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRONT_FACE",{"configurable":false,"enumerable":true,"writable":false,"value":2886,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_RANGE",{"configurable":false,"enumerable":true,"writable":false,"value":2928,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_WRITEMASK",{"configurable":false,"enumerable":true,"writable":false,"value":2930,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_CLEAR_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":2931,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_FUNC",{"configurable":false,"enumerable":true,"writable":false,"value":2932,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_CLEAR_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":2961,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_FUNC",{"configurable":false,"enumerable":true,"writable":false,"value":2962,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_FAIL",{"configurable":false,"enumerable":true,"writable":false,"value":2964,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_PASS_DEPTH_FAIL",{"configurable":false,"enumerable":true,"writable":false,"value":2965,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_PASS_DEPTH_PASS",{"configurable":false,"enumerable":true,"writable":false,"value":2966,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_REF",{"configurable":false,"enumerable":true,"writable":false,"value":2967,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_VALUE_MASK",{"configurable":false,"enumerable":true,"writable":false,"value":2963,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_WRITEMASK",{"configurable":false,"enumerable":true,"writable":false,"value":2968,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_FUNC",{"configurable":false,"enumerable":true,"writable":false,"value":34816,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_FAIL",{"configurable":false,"enumerable":true,"writable":false,"value":34817,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_PASS_DEPTH_FAIL",{"configurable":false,"enumerable":true,"writable":false,"value":34818,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_PASS_DEPTH_PASS",{"configurable":false,"enumerable":true,"writable":false,"value":34819,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_REF",{"configurable":false,"enumerable":true,"writable":false,"value":36003,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_VALUE_MASK",{"configurable":false,"enumerable":true,"writable":false,"value":36004,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BACK_WRITEMASK",{"configurable":false,"enumerable":true,"writable":false,"value":36005,});
Object.defineProperty(WebGLRenderingContext.prototype, "VIEWPORT",{"configurable":false,"enumerable":true,"writable":false,"value":2978,});
Object.defineProperty(WebGLRenderingContext.prototype, "SCISSOR_BOX",{"configurable":false,"enumerable":true,"writable":false,"value":3088,});
Object.defineProperty(WebGLRenderingContext.prototype, "COLOR_CLEAR_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":3106,});
Object.defineProperty(WebGLRenderingContext.prototype, "COLOR_WRITEMASK",{"configurable":false,"enumerable":true,"writable":false,"value":3107,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNPACK_ALIGNMENT",{"configurable":false,"enumerable":true,"writable":false,"value":3317,});
Object.defineProperty(WebGLRenderingContext.prototype, "PACK_ALIGNMENT",{"configurable":false,"enumerable":true,"writable":false,"value":3333,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_TEXTURE_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":3379,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VIEWPORT_DIMS",{"configurable":false,"enumerable":true,"writable":false,"value":3386,});
Object.defineProperty(WebGLRenderingContext.prototype, "SUBPIXEL_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3408,});
Object.defineProperty(WebGLRenderingContext.prototype, "RED_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3410,});
Object.defineProperty(WebGLRenderingContext.prototype, "GREEN_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3411,});
Object.defineProperty(WebGLRenderingContext.prototype, "BLUE_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3412,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALPHA_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3413,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3414,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_BITS",{"configurable":false,"enumerable":true,"writable":false,"value":3415,});
Object.defineProperty(WebGLRenderingContext.prototype, "POLYGON_OFFSET_UNITS",{"configurable":false,"enumerable":true,"writable":false,"value":10752,});
Object.defineProperty(WebGLRenderingContext.prototype, "POLYGON_OFFSET_FACTOR",{"configurable":false,"enumerable":true,"writable":false,"value":32824,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_BINDING_2D",{"configurable":false,"enumerable":true,"writable":false,"value":32873,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_BUFFERS",{"configurable":false,"enumerable":true,"writable":false,"value":32936,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLES",{"configurable":false,"enumerable":true,"writable":false,"value":32937,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_COVERAGE_VALUE",{"configurable":false,"enumerable":true,"writable":false,"value":32938,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLE_COVERAGE_INVERT",{"configurable":false,"enumerable":true,"writable":false,"value":32939,});
Object.defineProperty(WebGLRenderingContext.prototype, "COMPRESSED_TEXTURE_FORMATS",{"configurable":false,"enumerable":true,"writable":false,"value":34467,});
Object.defineProperty(WebGLRenderingContext.prototype, "DONT_CARE",{"configurable":false,"enumerable":true,"writable":false,"value":4352,});
Object.defineProperty(WebGLRenderingContext.prototype, "FASTEST",{"configurable":false,"enumerable":true,"writable":false,"value":4353,});
Object.defineProperty(WebGLRenderingContext.prototype, "NICEST",{"configurable":false,"enumerable":true,"writable":false,"value":4354,});
Object.defineProperty(WebGLRenderingContext.prototype, "GENERATE_MIPMAP_HINT",{"configurable":false,"enumerable":true,"writable":false,"value":33170,});
Object.defineProperty(WebGLRenderingContext.prototype, "BYTE",{"configurable":false,"enumerable":true,"writable":false,"value":5120,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_BYTE",{"configurable":false,"enumerable":true,"writable":false,"value":5121,});
Object.defineProperty(WebGLRenderingContext.prototype, "SHORT",{"configurable":false,"enumerable":true,"writable":false,"value":5122,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_SHORT",{"configurable":false,"enumerable":true,"writable":false,"value":5123,});
Object.defineProperty(WebGLRenderingContext.prototype, "INT",{"configurable":false,"enumerable":true,"writable":false,"value":5124,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_INT",{"configurable":false,"enumerable":true,"writable":false,"value":5125,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT",{"configurable":false,"enumerable":true,"writable":false,"value":5126,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_COMPONENT",{"configurable":false,"enumerable":true,"writable":false,"value":6402,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":6406,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGB",{"configurable":false,"enumerable":true,"writable":false,"value":6407,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGBA",{"configurable":false,"enumerable":true,"writable":false,"value":6408,});
Object.defineProperty(WebGLRenderingContext.prototype, "LUMINANCE",{"configurable":false,"enumerable":true,"writable":false,"value":6409,});
Object.defineProperty(WebGLRenderingContext.prototype, "LUMINANCE_ALPHA",{"configurable":false,"enumerable":true,"writable":false,"value":6410,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_SHORT_4_4_4_4",{"configurable":false,"enumerable":true,"writable":false,"value":32819,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_SHORT_5_5_5_1",{"configurable":false,"enumerable":true,"writable":false,"value":32820,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNSIGNED_SHORT_5_6_5",{"configurable":false,"enumerable":true,"writable":false,"value":33635,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAGMENT_SHADER",{"configurable":false,"enumerable":true,"writable":false,"value":35632,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_SHADER",{"configurable":false,"enumerable":true,"writable":false,"value":35633,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VERTEX_ATTRIBS",{"configurable":false,"enumerable":true,"writable":false,"value":34921,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VERTEX_UNIFORM_VECTORS",{"configurable":false,"enumerable":true,"writable":false,"value":36347,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VARYING_VECTORS",{"configurable":false,"enumerable":true,"writable":false,"value":36348,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_COMBINED_TEXTURE_IMAGE_UNITS",{"configurable":false,"enumerable":true,"writable":false,"value":35661,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_VERTEX_TEXTURE_IMAGE_UNITS",{"configurable":false,"enumerable":true,"writable":false,"value":35660,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_TEXTURE_IMAGE_UNITS",{"configurable":false,"enumerable":true,"writable":false,"value":34930,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_FRAGMENT_UNIFORM_VECTORS",{"configurable":false,"enumerable":true,"writable":false,"value":36349,});
Object.defineProperty(WebGLRenderingContext.prototype, "SHADER_TYPE",{"configurable":false,"enumerable":true,"writable":false,"value":35663,});
Object.defineProperty(WebGLRenderingContext.prototype, "DELETE_STATUS",{"configurable":false,"enumerable":true,"writable":false,"value":35712,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINK_STATUS",{"configurable":false,"enumerable":true,"writable":false,"value":35714,});
Object.defineProperty(WebGLRenderingContext.prototype, "VALIDATE_STATUS",{"configurable":false,"enumerable":true,"writable":false,"value":35715,});
Object.defineProperty(WebGLRenderingContext.prototype, "ATTACHED_SHADERS",{"configurable":false,"enumerable":true,"writable":false,"value":35717,});
Object.defineProperty(WebGLRenderingContext.prototype, "ACTIVE_UNIFORMS",{"configurable":false,"enumerable":true,"writable":false,"value":35718,});
Object.defineProperty(WebGLRenderingContext.prototype, "ACTIVE_ATTRIBUTES",{"configurable":false,"enumerable":true,"writable":false,"value":35721,});
Object.defineProperty(WebGLRenderingContext.prototype, "SHADING_LANGUAGE_VERSION",{"configurable":false,"enumerable":true,"writable":false,"value":35724,});
Object.defineProperty(WebGLRenderingContext.prototype, "CURRENT_PROGRAM",{"configurable":false,"enumerable":true,"writable":false,"value":35725,});
Object.defineProperty(WebGLRenderingContext.prototype, "NEVER",{"configurable":false,"enumerable":true,"writable":false,"value":512,});
Object.defineProperty(WebGLRenderingContext.prototype, "LESS",{"configurable":false,"enumerable":true,"writable":false,"value":513,});
Object.defineProperty(WebGLRenderingContext.prototype, "EQUAL",{"configurable":false,"enumerable":true,"writable":false,"value":514,});
Object.defineProperty(WebGLRenderingContext.prototype, "LEQUAL",{"configurable":false,"enumerable":true,"writable":false,"value":515,});
Object.defineProperty(WebGLRenderingContext.prototype, "GREATER",{"configurable":false,"enumerable":true,"writable":false,"value":516,});
Object.defineProperty(WebGLRenderingContext.prototype, "NOTEQUAL",{"configurable":false,"enumerable":true,"writable":false,"value":517,});
Object.defineProperty(WebGLRenderingContext.prototype, "GEQUAL",{"configurable":false,"enumerable":true,"writable":false,"value":518,});
Object.defineProperty(WebGLRenderingContext.prototype, "ALWAYS",{"configurable":false,"enumerable":true,"writable":false,"value":519,});
Object.defineProperty(WebGLRenderingContext.prototype, "KEEP",{"configurable":false,"enumerable":true,"writable":false,"value":7680,});
Object.defineProperty(WebGLRenderingContext.prototype, "REPLACE",{"configurable":false,"enumerable":true,"writable":false,"value":7681,});
Object.defineProperty(WebGLRenderingContext.prototype, "INCR",{"configurable":false,"enumerable":true,"writable":false,"value":7682,});
Object.defineProperty(WebGLRenderingContext.prototype, "DECR",{"configurable":false,"enumerable":true,"writable":false,"value":7683,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVERT",{"configurable":false,"enumerable":true,"writable":false,"value":5386,});
Object.defineProperty(WebGLRenderingContext.prototype, "INCR_WRAP",{"configurable":false,"enumerable":true,"writable":false,"value":34055,});
Object.defineProperty(WebGLRenderingContext.prototype, "DECR_WRAP",{"configurable":false,"enumerable":true,"writable":false,"value":34056,});
Object.defineProperty(WebGLRenderingContext.prototype, "VENDOR",{"configurable":false,"enumerable":true,"writable":false,"value":7936,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERER",{"configurable":false,"enumerable":true,"writable":false,"value":7937,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERSION",{"configurable":false,"enumerable":true,"writable":false,"value":7938,});
Object.defineProperty(WebGLRenderingContext.prototype, "NEAREST",{"configurable":false,"enumerable":true,"writable":false,"value":9728,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINEAR",{"configurable":false,"enumerable":true,"writable":false,"value":9729,});
Object.defineProperty(WebGLRenderingContext.prototype, "NEAREST_MIPMAP_NEAREST",{"configurable":false,"enumerable":true,"writable":false,"value":9984,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINEAR_MIPMAP_NEAREST",{"configurable":false,"enumerable":true,"writable":false,"value":9985,});
Object.defineProperty(WebGLRenderingContext.prototype, "NEAREST_MIPMAP_LINEAR",{"configurable":false,"enumerable":true,"writable":false,"value":9986,});
Object.defineProperty(WebGLRenderingContext.prototype, "LINEAR_MIPMAP_LINEAR",{"configurable":false,"enumerable":true,"writable":false,"value":9987,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_MAG_FILTER",{"configurable":false,"enumerable":true,"writable":false,"value":10240,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_MIN_FILTER",{"configurable":false,"enumerable":true,"writable":false,"value":10241,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_WRAP_S",{"configurable":false,"enumerable":true,"writable":false,"value":10242,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_WRAP_T",{"configurable":false,"enumerable":true,"writable":false,"value":10243,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE",{"configurable":false,"enumerable":true,"writable":false,"value":5890,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP",{"configurable":false,"enumerable":true,"writable":false,"value":34067,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_BINDING_CUBE_MAP",{"configurable":false,"enumerable":true,"writable":false,"value":34068,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_POSITIVE_X",{"configurable":false,"enumerable":true,"writable":false,"value":34069,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_NEGATIVE_X",{"configurable":false,"enumerable":true,"writable":false,"value":34070,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_POSITIVE_Y",{"configurable":false,"enumerable":true,"writable":false,"value":34071,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_NEGATIVE_Y",{"configurable":false,"enumerable":true,"writable":false,"value":34072,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_POSITIVE_Z",{"configurable":false,"enumerable":true,"writable":false,"value":34073,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE_CUBE_MAP_NEGATIVE_Z",{"configurable":false,"enumerable":true,"writable":false,"value":34074,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_CUBE_MAP_TEXTURE_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":34076,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE0",{"configurable":false,"enumerable":true,"writable":false,"value":33984,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE1",{"configurable":false,"enumerable":true,"writable":false,"value":33985,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE2",{"configurable":false,"enumerable":true,"writable":false,"value":33986,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE3",{"configurable":false,"enumerable":true,"writable":false,"value":33987,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE4",{"configurable":false,"enumerable":true,"writable":false,"value":33988,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE5",{"configurable":false,"enumerable":true,"writable":false,"value":33989,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE6",{"configurable":false,"enumerable":true,"writable":false,"value":33990,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE7",{"configurable":false,"enumerable":true,"writable":false,"value":33991,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE8",{"configurable":false,"enumerable":true,"writable":false,"value":33992,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE9",{"configurable":false,"enumerable":true,"writable":false,"value":33993,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE10",{"configurable":false,"enumerable":true,"writable":false,"value":33994,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE11",{"configurable":false,"enumerable":true,"writable":false,"value":33995,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE12",{"configurable":false,"enumerable":true,"writable":false,"value":33996,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE13",{"configurable":false,"enumerable":true,"writable":false,"value":33997,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE14",{"configurable":false,"enumerable":true,"writable":false,"value":33998,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE15",{"configurable":false,"enumerable":true,"writable":false,"value":33999,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE16",{"configurable":false,"enumerable":true,"writable":false,"value":34000,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE17",{"configurable":false,"enumerable":true,"writable":false,"value":34001,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE18",{"configurable":false,"enumerable":true,"writable":false,"value":34002,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE19",{"configurable":false,"enumerable":true,"writable":false,"value":34003,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE20",{"configurable":false,"enumerable":true,"writable":false,"value":34004,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE21",{"configurable":false,"enumerable":true,"writable":false,"value":34005,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE22",{"configurable":false,"enumerable":true,"writable":false,"value":34006,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE23",{"configurable":false,"enumerable":true,"writable":false,"value":34007,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE24",{"configurable":false,"enumerable":true,"writable":false,"value":34008,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE25",{"configurable":false,"enumerable":true,"writable":false,"value":34009,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE26",{"configurable":false,"enumerable":true,"writable":false,"value":34010,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE27",{"configurable":false,"enumerable":true,"writable":false,"value":34011,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE28",{"configurable":false,"enumerable":true,"writable":false,"value":34012,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE29",{"configurable":false,"enumerable":true,"writable":false,"value":34013,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE30",{"configurable":false,"enumerable":true,"writable":false,"value":34014,});
Object.defineProperty(WebGLRenderingContext.prototype, "TEXTURE31",{"configurable":false,"enumerable":true,"writable":false,"value":34015,});
Object.defineProperty(WebGLRenderingContext.prototype, "ACTIVE_TEXTURE",{"configurable":false,"enumerable":true,"writable":false,"value":34016,});
Object.defineProperty(WebGLRenderingContext.prototype, "REPEAT",{"configurable":false,"enumerable":true,"writable":false,"value":10497,});
Object.defineProperty(WebGLRenderingContext.prototype, "CLAMP_TO_EDGE",{"configurable":false,"enumerable":true,"writable":false,"value":33071,});
Object.defineProperty(WebGLRenderingContext.prototype, "MIRRORED_REPEAT",{"configurable":false,"enumerable":true,"writable":false,"value":33648,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_VEC2",{"configurable":false,"enumerable":true,"writable":false,"value":35664,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_VEC3",{"configurable":false,"enumerable":true,"writable":false,"value":35665,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_VEC4",{"configurable":false,"enumerable":true,"writable":false,"value":35666,});
Object.defineProperty(WebGLRenderingContext.prototype, "INT_VEC2",{"configurable":false,"enumerable":true,"writable":false,"value":35667,});
Object.defineProperty(WebGLRenderingContext.prototype, "INT_VEC3",{"configurable":false,"enumerable":true,"writable":false,"value":35668,});
Object.defineProperty(WebGLRenderingContext.prototype, "INT_VEC4",{"configurable":false,"enumerable":true,"writable":false,"value":35669,});
Object.defineProperty(WebGLRenderingContext.prototype, "BOOL",{"configurable":false,"enumerable":true,"writable":false,"value":35670,});
Object.defineProperty(WebGLRenderingContext.prototype, "BOOL_VEC2",{"configurable":false,"enumerable":true,"writable":false,"value":35671,});
Object.defineProperty(WebGLRenderingContext.prototype, "BOOL_VEC3",{"configurable":false,"enumerable":true,"writable":false,"value":35672,});
Object.defineProperty(WebGLRenderingContext.prototype, "BOOL_VEC4",{"configurable":false,"enumerable":true,"writable":false,"value":35673,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_MAT2",{"configurable":false,"enumerable":true,"writable":false,"value":35674,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_MAT3",{"configurable":false,"enumerable":true,"writable":false,"value":35675,});
Object.defineProperty(WebGLRenderingContext.prototype, "FLOAT_MAT4",{"configurable":false,"enumerable":true,"writable":false,"value":35676,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLER_2D",{"configurable":false,"enumerable":true,"writable":false,"value":35678,});
Object.defineProperty(WebGLRenderingContext.prototype, "SAMPLER_CUBE",{"configurable":false,"enumerable":true,"writable":false,"value":35680,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_ENABLED",{"configurable":false,"enumerable":true,"writable":false,"value":34338,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":34339,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_STRIDE",{"configurable":false,"enumerable":true,"writable":false,"value":34340,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_TYPE",{"configurable":false,"enumerable":true,"writable":false,"value":34341,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_NORMALIZED",{"configurable":false,"enumerable":true,"writable":false,"value":34922,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_POINTER",{"configurable":false,"enumerable":true,"writable":false,"value":34373,});
Object.defineProperty(WebGLRenderingContext.prototype, "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":34975,});
Object.defineProperty(WebGLRenderingContext.prototype, "IMPLEMENTATION_COLOR_READ_TYPE",{"configurable":false,"enumerable":true,"writable":false,"value":35738,});
Object.defineProperty(WebGLRenderingContext.prototype, "IMPLEMENTATION_COLOR_READ_FORMAT",{"configurable":false,"enumerable":true,"writable":false,"value":35739,});
Object.defineProperty(WebGLRenderingContext.prototype, "COMPILE_STATUS",{"configurable":false,"enumerable":true,"writable":false,"value":35713,});
Object.defineProperty(WebGLRenderingContext.prototype, "LOW_FLOAT",{"configurable":false,"enumerable":true,"writable":false,"value":36336,});
Object.defineProperty(WebGLRenderingContext.prototype, "MEDIUM_FLOAT",{"configurable":false,"enumerable":true,"writable":false,"value":36337,});
Object.defineProperty(WebGLRenderingContext.prototype, "HIGH_FLOAT",{"configurable":false,"enumerable":true,"writable":false,"value":36338,});
Object.defineProperty(WebGLRenderingContext.prototype, "LOW_INT",{"configurable":false,"enumerable":true,"writable":false,"value":36339,});
Object.defineProperty(WebGLRenderingContext.prototype, "MEDIUM_INT",{"configurable":false,"enumerable":true,"writable":false,"value":36340,});
Object.defineProperty(WebGLRenderingContext.prototype, "HIGH_INT",{"configurable":false,"enumerable":true,"writable":false,"value":36341,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER",{"configurable":false,"enumerable":true,"writable":false,"value":36160,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER",{"configurable":false,"enumerable":true,"writable":false,"value":36161,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGBA4",{"configurable":false,"enumerable":true,"writable":false,"value":32854,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGB5_A1",{"configurable":false,"enumerable":true,"writable":false,"value":32855,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGB565",{"configurable":false,"enumerable":true,"writable":false,"value":36194,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_COMPONENT16",{"configurable":false,"enumerable":true,"writable":false,"value":33189,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_INDEX8",{"configurable":false,"enumerable":true,"writable":false,"value":36168,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_STENCIL",{"configurable":false,"enumerable":true,"writable":false,"value":34041,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_WIDTH",{"configurable":false,"enumerable":true,"writable":false,"value":36162,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_HEIGHT",{"configurable":false,"enumerable":true,"writable":false,"value":36163,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_INTERNAL_FORMAT",{"configurable":false,"enumerable":true,"writable":false,"value":36164,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_RED_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36176,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_GREEN_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36177,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_BLUE_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36178,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_ALPHA_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36179,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_DEPTH_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36180,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_STENCIL_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":36181,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",{"configurable":false,"enumerable":true,"writable":false,"value":36048,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",{"configurable":false,"enumerable":true,"writable":false,"value":36049,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",{"configurable":false,"enumerable":true,"writable":false,"value":36050,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",{"configurable":false,"enumerable":true,"writable":false,"value":36051,});
Object.defineProperty(WebGLRenderingContext.prototype, "COLOR_ATTACHMENT0",{"configurable":false,"enumerable":true,"writable":false,"value":36064,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":36096,});
Object.defineProperty(WebGLRenderingContext.prototype, "STENCIL_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":36128,});
Object.defineProperty(WebGLRenderingContext.prototype, "DEPTH_STENCIL_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":33306,});
Object.defineProperty(WebGLRenderingContext.prototype, "NONE",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_COMPLETE",{"configurable":false,"enumerable":true,"writable":false,"value":36053,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":36054,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",{"configurable":false,"enumerable":true,"writable":false,"value":36055,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",{"configurable":false,"enumerable":true,"writable":false,"value":36057,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_UNSUPPORTED",{"configurable":false,"enumerable":true,"writable":false,"value":36061,});
Object.defineProperty(WebGLRenderingContext.prototype, "FRAMEBUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":36006,});
Object.defineProperty(WebGLRenderingContext.prototype, "RENDERBUFFER_BINDING",{"configurable":false,"enumerable":true,"writable":false,"value":36007,});
Object.defineProperty(WebGLRenderingContext.prototype, "MAX_RENDERBUFFER_SIZE",{"configurable":false,"enumerable":true,"writable":false,"value":34024,});
Object.defineProperty(WebGLRenderingContext.prototype, "INVALID_FRAMEBUFFER_OPERATION",{"configurable":false,"enumerable":true,"writable":false,"value":1286,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNPACK_FLIP_Y_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37440,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNPACK_PREMULTIPLY_ALPHA_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37441,});
Object.defineProperty(WebGLRenderingContext.prototype, "CONTEXT_LOST_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37442,});
Object.defineProperty(WebGLRenderingContext.prototype, "UNPACK_COLORSPACE_CONVERSION_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37443,});
Object.defineProperty(WebGLRenderingContext.prototype, "BROWSER_DEFAULT_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37444,});
Object.defineProperty(WebGLRenderingContext.prototype, "activeTexture",{"configurable":true,"enumerable":true,"writable":true,"value": function activeTexture(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.activeTexture);
Object.defineProperty(WebGLRenderingContext.prototype, "attachShader",{"configurable":true,"enumerable":true,"writable":true,"value": function attachShader(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.attachShader);
Object.defineProperty(WebGLRenderingContext.prototype, "bindAttribLocation",{"configurable":true,"enumerable":true,"writable":true,"value": function bindAttribLocation(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.bindAttribLocation);
Object.defineProperty(WebGLRenderingContext.prototype, "bindRenderbuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function bindRenderbuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.bindRenderbuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "blendColor",{"configurable":true,"enumerable":true,"writable":true,"value": function blendColor(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.blendColor);
Object.defineProperty(WebGLRenderingContext.prototype, "blendEquation",{"configurable":true,"enumerable":true,"writable":true,"value": function blendEquation(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.blendEquation);
Object.defineProperty(WebGLRenderingContext.prototype, "blendEquationSeparate",{"configurable":true,"enumerable":true,"writable":true,"value": function blendEquationSeparate(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.blendEquationSeparate);
Object.defineProperty(WebGLRenderingContext.prototype, "blendFunc",{"configurable":true,"enumerable":true,"writable":true,"value": function blendFunc(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.blendFunc);
Object.defineProperty(WebGLRenderingContext.prototype, "blendFuncSeparate",{"configurable":true,"enumerable":true,"writable":true,"value": function blendFuncSeparate(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.blendFuncSeparate);
Object.defineProperty(WebGLRenderingContext.prototype, "bufferData",{"configurable":true,"enumerable":true,"writable":true,"value": function bufferData(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.bufferData);
Object.defineProperty(WebGLRenderingContext.prototype, "bufferSubData",{"configurable":true,"enumerable":true,"writable":true,"value": function bufferSubData(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.bufferSubData);
Object.defineProperty(WebGLRenderingContext.prototype, "checkFramebufferStatus",{"configurable":true,"enumerable":true,"writable":true,"value": function checkFramebufferStatus(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.checkFramebufferStatus);
Object.defineProperty(WebGLRenderingContext.prototype, "compileShader",{"configurable":true,"enumerable":true,"writable":true,"value": function compileShader(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.compileShader);
Object.defineProperty(WebGLRenderingContext.prototype, "compressedTexImage2D",{"configurable":true,"enumerable":true,"writable":true,"value": function compressedTexImage2D(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.compressedTexImage2D);
Object.defineProperty(WebGLRenderingContext.prototype, "compressedTexSubImage2D",{"configurable":true,"enumerable":true,"writable":true,"value": function compressedTexSubImage2D(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.compressedTexSubImage2D);
Object.defineProperty(WebGLRenderingContext.prototype, "copyTexImage2D",{"configurable":true,"enumerable":true,"writable":true,"value": function copyTexImage2D(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.copyTexImage2D);
Object.defineProperty(WebGLRenderingContext.prototype, "copyTexSubImage2D",{"configurable":true,"enumerable":true,"writable":true,"value": function copyTexSubImage2D(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.copyTexSubImage2D);
Object.defineProperty(WebGLRenderingContext.prototype, "createBuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function createBuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.createBuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "createFramebuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function createFramebuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.createFramebuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "createProgram",{"configurable":true,"enumerable":true,"writable":true,"value": function createProgram(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.createProgram);
Object.defineProperty(WebGLRenderingContext.prototype, "createRenderbuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function createRenderbuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.createRenderbuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "createShader",{"configurable":true,"enumerable":true,"writable":true,"value": function createShader(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.createShader);
Object.defineProperty(WebGLRenderingContext.prototype, "createTexture",{"configurable":true,"enumerable":true,"writable":true,"value": function createTexture(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.createTexture);
Object.defineProperty(WebGLRenderingContext.prototype, "cullFace",{"configurable":true,"enumerable":true,"writable":true,"value": function cullFace(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.cullFace);
Object.defineProperty(WebGLRenderingContext.prototype, "deleteBuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteBuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.deleteBuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "deleteFramebuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteFramebuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.deleteFramebuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "deleteProgram",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteProgram(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.deleteProgram);
Object.defineProperty(WebGLRenderingContext.prototype, "deleteRenderbuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteRenderbuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.deleteRenderbuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "deleteShader",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteShader(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.deleteShader);
Object.defineProperty(WebGLRenderingContext.prototype, "deleteTexture",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteTexture(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.deleteTexture);
Object.defineProperty(WebGLRenderingContext.prototype, "depthFunc",{"configurable":true,"enumerable":true,"writable":true,"value": function depthFunc(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.depthFunc);
Object.defineProperty(WebGLRenderingContext.prototype, "depthMask",{"configurable":true,"enumerable":true,"writable":true,"value": function depthMask(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.depthMask);
Object.defineProperty(WebGLRenderingContext.prototype, "depthRange",{"configurable":true,"enumerable":true,"writable":true,"value": function depthRange(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.depthRange);
Object.defineProperty(WebGLRenderingContext.prototype, "detachShader",{"configurable":true,"enumerable":true,"writable":true,"value": function detachShader(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.detachShader);
Object.defineProperty(WebGLRenderingContext.prototype, "disable",{"configurable":true,"enumerable":true,"writable":true,"value": function disable(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.disable);
Object.defineProperty(WebGLRenderingContext.prototype, "enable",{"configurable":true,"enumerable":true,"writable":true,"value": function enable(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.enable);
Object.defineProperty(WebGLRenderingContext.prototype, "finish",{"configurable":true,"enumerable":true,"writable":true,"value": function finish(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.finish);
Object.defineProperty(WebGLRenderingContext.prototype, "flush",{"configurable":true,"enumerable":true,"writable":true,"value": function flush(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.flush);
Object.defineProperty(WebGLRenderingContext.prototype, "framebufferRenderbuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function framebufferRenderbuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.framebufferRenderbuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "framebufferTexture2D",{"configurable":true,"enumerable":true,"writable":true,"value": function framebufferTexture2D(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.framebufferTexture2D);
Object.defineProperty(WebGLRenderingContext.prototype, "frontFace",{"configurable":true,"enumerable":true,"writable":true,"value": function frontFace(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.frontFace);
Object.defineProperty(WebGLRenderingContext.prototype, "generateMipmap",{"configurable":true,"enumerable":true,"writable":true,"value": function generateMipmap(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.generateMipmap);
Object.defineProperty(WebGLRenderingContext.prototype, "getActiveAttrib",{"configurable":true,"enumerable":true,"writable":true,"value": function getActiveAttrib(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getActiveAttrib);
Object.defineProperty(WebGLRenderingContext.prototype, "getActiveUniform",{"configurable":true,"enumerable":true,"writable":true,"value": function getActiveUniform(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getActiveUniform);
Object.defineProperty(WebGLRenderingContext.prototype, "getAttachedShaders",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttachedShaders(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getAttachedShaders);
Object.defineProperty(WebGLRenderingContext.prototype, "getAttribLocation",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttribLocation(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getAttribLocation);
Object.defineProperty(WebGLRenderingContext.prototype, "getBufferParameter",{"configurable":true,"enumerable":true,"writable":true,"value": function getBufferParameter(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getBufferParameter);
Object.defineProperty(WebGLRenderingContext.prototype, "getContextAttributes",{"configurable":true,"enumerable":true,"writable":true,"value": function getContextAttributes(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getContextAttributes);
Object.defineProperty(WebGLRenderingContext.prototype, "getError",{"configurable":true,"enumerable":true,"writable":true,"value": function getError(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getError);
Object.defineProperty(WebGLRenderingContext.prototype, "getFramebufferAttachmentParameter",{"configurable":true,"enumerable":true,"writable":true,"value": function getFramebufferAttachmentParameter(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getFramebufferAttachmentParameter);
Object.defineProperty(WebGLRenderingContext.prototype, "getProgramInfoLog",{"configurable":true,"enumerable":true,"writable":true,"value": function getProgramInfoLog(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getProgramInfoLog);
Object.defineProperty(WebGLRenderingContext.prototype, "getProgramParameter",{"configurable":true,"enumerable":true,"writable":true,"value": function getProgramParameter(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getProgramParameter);
Object.defineProperty(WebGLRenderingContext.prototype, "getRenderbufferParameter",{"configurable":true,"enumerable":true,"writable":true,"value": function getRenderbufferParameter(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getRenderbufferParameter);
Object.defineProperty(WebGLRenderingContext.prototype, "getShaderInfoLog",{"configurable":true,"enumerable":true,"writable":true,"value": function getShaderInfoLog(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getShaderInfoLog);
Object.defineProperty(WebGLRenderingContext.prototype, "getShaderParameter",{"configurable":true,"enumerable":true,"writable":true,"value": function getShaderParameter(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getShaderParameter);
Object.defineProperty(WebGLRenderingContext.prototype, "getShaderPrecisionFormat",{"configurable":true,"enumerable":true,"writable":true,"value": function getShaderPrecisionFormat(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getShaderPrecisionFormat);
Object.defineProperty(WebGLRenderingContext.prototype, "getShaderSource",{"configurable":true,"enumerable":true,"writable":true,"value": function getShaderSource(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getShaderSource);
Object.defineProperty(WebGLRenderingContext.prototype, "getTexParameter",{"configurable":true,"enumerable":true,"writable":true,"value": function getTexParameter(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getTexParameter);
Object.defineProperty(WebGLRenderingContext.prototype, "getUniform",{"configurable":true,"enumerable":true,"writable":true,"value": function getUniform(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getUniform);
Object.defineProperty(WebGLRenderingContext.prototype, "getUniformLocation",{"configurable":true,"enumerable":true,"writable":true,"value": function getUniformLocation(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getUniformLocation);
Object.defineProperty(WebGLRenderingContext.prototype, "getVertexAttrib",{"configurable":true,"enumerable":true,"writable":true,"value": function getVertexAttrib(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getVertexAttrib);
Object.defineProperty(WebGLRenderingContext.prototype, "getVertexAttribOffset",{"configurable":true,"enumerable":true,"writable":true,"value": function getVertexAttribOffset(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.getVertexAttribOffset);
Object.defineProperty(WebGLRenderingContext.prototype, "hint",{"configurable":true,"enumerable":true,"writable":true,"value": function hint(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.hint);
Object.defineProperty(WebGLRenderingContext.prototype, "isBuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function isBuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.isBuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "isContextLost",{"configurable":true,"enumerable":true,"writable":true,"value": function isContextLost(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.isContextLost);
Object.defineProperty(WebGLRenderingContext.prototype, "isEnabled",{"configurable":true,"enumerable":true,"writable":true,"value": function isEnabled(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.isEnabled);
Object.defineProperty(WebGLRenderingContext.prototype, "isFramebuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function isFramebuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.isFramebuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "isProgram",{"configurable":true,"enumerable":true,"writable":true,"value": function isProgram(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.isProgram);
Object.defineProperty(WebGLRenderingContext.prototype, "isRenderbuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function isRenderbuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.isRenderbuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "isShader",{"configurable":true,"enumerable":true,"writable":true,"value": function isShader(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.isShader);
Object.defineProperty(WebGLRenderingContext.prototype, "isTexture",{"configurable":true,"enumerable":true,"writable":true,"value": function isTexture(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.isTexture);
Object.defineProperty(WebGLRenderingContext.prototype, "lineWidth",{"configurable":true,"enumerable":true,"writable":true,"value": function lineWidth(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.lineWidth);
Object.defineProperty(WebGLRenderingContext.prototype, "linkProgram",{"configurable":true,"enumerable":true,"writable":true,"value": function linkProgram(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.linkProgram);
Object.defineProperty(WebGLRenderingContext.prototype, "pixelStorei",{"configurable":true,"enumerable":true,"writable":true,"value": function pixelStorei(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.pixelStorei);
Object.defineProperty(WebGLRenderingContext.prototype, "polygonOffset",{"configurable":true,"enumerable":true,"writable":true,"value": function polygonOffset(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.polygonOffset);
Object.defineProperty(WebGLRenderingContext.prototype, "readPixels",{"configurable":true,"enumerable":true,"writable":true,"value": function readPixels(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.readPixels);
Object.defineProperty(WebGLRenderingContext.prototype, "renderbufferStorage",{"configurable":true,"enumerable":true,"writable":true,"value": function renderbufferStorage(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.renderbufferStorage);
Object.defineProperty(WebGLRenderingContext.prototype, "sampleCoverage",{"configurable":true,"enumerable":true,"writable":true,"value": function sampleCoverage(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.sampleCoverage);
Object.defineProperty(WebGLRenderingContext.prototype, "shaderSource",{"configurable":true,"enumerable":true,"writable":true,"value": function shaderSource(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.shaderSource);
Object.defineProperty(WebGLRenderingContext.prototype, "stencilFunc",{"configurable":true,"enumerable":true,"writable":true,"value": function stencilFunc(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.stencilFunc);
Object.defineProperty(WebGLRenderingContext.prototype, "stencilFuncSeparate",{"configurable":true,"enumerable":true,"writable":true,"value": function stencilFuncSeparate(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.stencilFuncSeparate);
Object.defineProperty(WebGLRenderingContext.prototype, "stencilMask",{"configurable":true,"enumerable":true,"writable":true,"value": function stencilMask(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.stencilMask);
Object.defineProperty(WebGLRenderingContext.prototype, "stencilMaskSeparate",{"configurable":true,"enumerable":true,"writable":true,"value": function stencilMaskSeparate(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.stencilMaskSeparate);
Object.defineProperty(WebGLRenderingContext.prototype, "stencilOp",{"configurable":true,"enumerable":true,"writable":true,"value": function stencilOp(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.stencilOp);
Object.defineProperty(WebGLRenderingContext.prototype, "stencilOpSeparate",{"configurable":true,"enumerable":true,"writable":true,"value": function stencilOpSeparate(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.stencilOpSeparate);
Object.defineProperty(WebGLRenderingContext.prototype, "texImage2D",{"configurable":true,"enumerable":true,"writable":true,"value": function texImage2D(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.texImage2D);
Object.defineProperty(WebGLRenderingContext.prototype, "texParameterf",{"configurable":true,"enumerable":true,"writable":true,"value": function texParameterf(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.texParameterf);
Object.defineProperty(WebGLRenderingContext.prototype, "texParameteri",{"configurable":true,"enumerable":true,"writable":true,"value": function texParameteri(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.texParameteri);
Object.defineProperty(WebGLRenderingContext.prototype, "texSubImage2D",{"configurable":true,"enumerable":true,"writable":true,"value": function texSubImage2D(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.texSubImage2D);
Object.defineProperty(WebGLRenderingContext.prototype, "useProgram",{"configurable":true,"enumerable":true,"writable":true,"value": function useProgram(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.useProgram);
Object.defineProperty(WebGLRenderingContext.prototype, "validateProgram",{"configurable":true,"enumerable":true,"writable":true,"value": function validateProgram(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.validateProgram);
Object.defineProperty(WebGLRenderingContext.prototype, "bindBuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function bindBuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.bindBuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "bindFramebuffer",{"configurable":true,"enumerable":true,"writable":true,"value": function bindFramebuffer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.bindFramebuffer);
Object.defineProperty(WebGLRenderingContext.prototype, "bindTexture",{"configurable":true,"enumerable":true,"writable":true,"value": function bindTexture(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.bindTexture);
Object.defineProperty(WebGLRenderingContext.prototype, "clear",{"configurable":true,"enumerable":true,"writable":true,"value": function clear(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.clear);
Object.defineProperty(WebGLRenderingContext.prototype, "clearColor",{"configurable":true,"enumerable":true,"writable":true,"value": function clearColor(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.clearColor);
Object.defineProperty(WebGLRenderingContext.prototype, "clearDepth",{"configurable":true,"enumerable":true,"writable":true,"value": function clearDepth(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.clearDepth);
Object.defineProperty(WebGLRenderingContext.prototype, "clearStencil",{"configurable":true,"enumerable":true,"writable":true,"value": function clearStencil(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.clearStencil);
Object.defineProperty(WebGLRenderingContext.prototype, "colorMask",{"configurable":true,"enumerable":true,"writable":true,"value": function colorMask(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.colorMask);
Object.defineProperty(WebGLRenderingContext.prototype, "disableVertexAttribArray",{"configurable":true,"enumerable":true,"writable":true,"value": function disableVertexAttribArray(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.disableVertexAttribArray);
Object.defineProperty(WebGLRenderingContext.prototype, "drawArrays",{"configurable":true,"enumerable":true,"writable":true,"value": function drawArrays(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.drawArrays);
Object.defineProperty(WebGLRenderingContext.prototype, "drawElements",{"configurable":true,"enumerable":true,"writable":true,"value": function drawElements(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.drawElements);
Object.defineProperty(WebGLRenderingContext.prototype, "enableVertexAttribArray",{"configurable":true,"enumerable":true,"writable":true,"value": function enableVertexAttribArray(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.enableVertexAttribArray);
Object.defineProperty(WebGLRenderingContext.prototype, "scissor",{"configurable":true,"enumerable":true,"writable":true,"value": function scissor(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.scissor);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform1f",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform1f(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform1f);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform1fv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform1fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform1fv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform1i",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform1i(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform1i);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform1iv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform1iv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform1iv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform2f",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform2f(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform2f);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform2fv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform2fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform2fv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform2i",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform2i(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform2i);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform2iv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform2iv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform2iv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform3f",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform3f(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform3f);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform3fv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform3fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform3fv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform3i",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform3i(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform3i);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform3iv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform3iv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform3iv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform4f",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform4f(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform4f);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform4fv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform4fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform4fv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform4i",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform4i(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform4i);
Object.defineProperty(WebGLRenderingContext.prototype, "uniform4iv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniform4iv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniform4iv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniformMatrix2fv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniformMatrix2fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniformMatrix2fv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniformMatrix3fv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniformMatrix3fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniformMatrix3fv);
Object.defineProperty(WebGLRenderingContext.prototype, "uniformMatrix4fv",{"configurable":true,"enumerable":true,"writable":true,"value": function uniformMatrix4fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.uniformMatrix4fv);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttrib1f",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttrib1f(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttrib1f);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttrib1fv",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttrib1fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttrib1fv);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttrib2f",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttrib2f(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttrib2f);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttrib2fv",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttrib2fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttrib2fv);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttrib3f",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttrib3f(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttrib3f);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttrib3fv",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttrib3fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttrib3fv);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttrib4f",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttrib4f(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttrib4f);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttrib4fv",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttrib4fv(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttrib4fv);
Object.defineProperty(WebGLRenderingContext.prototype, "vertexAttribPointer",{"configurable":true,"enumerable":true,"writable":true,"value": function vertexAttribPointer(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.vertexAttribPointer);
Object.defineProperty(WebGLRenderingContext.prototype, "viewport",{"configurable":true,"enumerable":true,"writable":true,"value": function viewport(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.viewport);
Object.defineProperty(WebGLRenderingContext.prototype, "drawingBufferFormat",{"configurable":true,"enumerable":true,"get": function drawingBufferFormat_get(){}, });
Object.defineProperty(WebGLRenderingContext.prototype, "RGB8",{"configurable":false,"enumerable":true,"writable":false,"value":32849,});
Object.defineProperty(WebGLRenderingContext.prototype, "RGBA8",{"configurable":false,"enumerable":true,"writable":false,"value":32856,});
Object.defineProperty(WebGLRenderingContext.prototype, "drawingBufferStorage",{"configurable":true,"enumerable":true,"writable":true,"value": function drawingBufferStorage(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.drawingBufferStorage);
Object.defineProperty(WebGLRenderingContext.prototype, "makeXRCompatible",{"configurable":true,"enumerable":true,"writable":true,"value": function makeXRCompatible(){debugger;},});dogvm.safefunction(WebGLRenderingContext.prototype.makeXRCompatible);

Object.defineProperty(WebGLRenderingContext.prototype, "getSupportedExtensions",{"configurable":true,"enumerable":true,"writable":true,"value": function getSupportedExtensions(){
    // debugger;
    return ['ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_clip_control', 'EXT_color_buffer_half_float', 'EXT_depth_clamp', 'EXT_disjoint_timer_query', 'EXT_float_blend', 'EXT_frag_depth', 'EXT_polygon_offset_clamp', 'EXT_shader_texture_lod', 'EXT_texture_compression_bptc', 'EXT_texture_compression_rgtc', 'EXT_texture_filter_anisotropic', 'EXT_texture_mirror_clamp_to_edge', 'EXT_sRGB', 'KHR_parallel_shader_compile', 'OES_element_index_uint', 'OES_fbo_render_mipmap', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_blend_func_extended', 'WEBGL_color_buffer_float', 'WEBGL_compressed_texture_s3tc', 'WEBGL_compressed_texture_s3tc_srgb', 'WEBGL_debug_renderer_info', 'WEBGL_debug_shaders', 'WEBGL_depth_texture', 'WEBGL_draw_buffers', 'WEBGL_lose_context', 'WEBGL_multi_draw', 'WEBGL_polygon_mode'];
},});dogvm.safefunction(WebGLRenderingContext.prototype.getSupportedExtensions);


Object.defineProperty(WebGLRenderingContext.prototype, "getExtension",{"configurable":true,"enumerable":true,"writable":true,
    "value": function getExtension(name){
        all = WebGLRenderingContext.prototype.getSupportedExtensions()
        if(all.includes(name)){
            return dogvm.memory.webgl[name];
        }else{
            debugger;
            return null;
        }
    },});dogvm.safefunction(WebGLRenderingContext.prototype.getExtension);


Object.defineProperty(WebGLRenderingContext.prototype, "getParameter",{"configurable":true,"enumerable":true,"writable":true,
    "value": function getParameter(pname){
        if(pname==37446){
            return 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Laptop GPU (0x00002520) Direct3D11 vs_5_0 ps_5_0, D3D11)';
        }
        if(pname==37445){
            return 'Google Inc. (NVIDIA)';
        }
        debugger;
        return null
    },});dogvm.safefunction(WebGLRenderingContext.prototype.getParameter);

    
WebGLRenderingContext.getWebDog = function getWebDog(){
    webGLRenderingContext = {};
    webGLRenderingContext.__proto__ = WebGLRenderingContext.prototype;
    webGLRenderingContext.canvas = this;
    webGLRenderingContext.drawingBufferColorSpace = "srgb";
    webGLRenderingContext.drawingBufferFormat = 32856;
    webGLRenderingContext.drawingBufferHeight = 150;
    webGLRenderingContext.drawingBufferWidth = 300;
    webGLRenderingContext.unpackColorSpace = "srgb";
    return dogvm.proxy(webGLRenderingContext);
};
// CanvasRenderingContext2D对象
var CanvasRenderingContext2D = function CanvasRenderingContext2D(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CanvasRenderingContext2D);

Object.defineProperty(CanvasRenderingContext2D.prototype, Symbol.toStringTag,{"value":"CanvasRenderingContext2D","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CanvasRenderingContext2D.prototype, "canvas",{"configurable":true,"enumerable":true,"get": function canvas_get(){debugger; return "[object HTMLCanvasElement]"},set:undefined, });
Object.defineProperty(CanvasRenderingContext2D.prototype, "globalAlpha",{"configurable":true,"enumerable":true,"get": function globalAlpha_get(){debugger; return "1"},"set": function globalAlpha_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "globalCompositeOperation",{"configurable":true,"enumerable":true,"get": function globalCompositeOperation_get(){debugger; return "source-over"},"set": function globalCompositeOperation_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "filter",{"configurable":true,"enumerable":true,"get": function filter_get(){debugger; return "none"},"set": function filter_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "imageSmoothingEnabled",{"configurable":true,"enumerable":true,"get": function imageSmoothingEnabled_get(){debugger; return "true"},"set": function imageSmoothingEnabled_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "imageSmoothingQuality",{"configurable":true,"enumerable":true,"get": function imageSmoothingQuality_get(){debugger; return "low"},"set": function imageSmoothingQuality_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "strokeStyle",{"configurable":true,"enumerable":true,"get": function strokeStyle_get(){debugger; return "#000000"},"set": function strokeStyle_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "fillStyle",{"configurable":true,"enumerable":true,"get": function fillStyle_get(){debugger; return "#000000"},"set": function fillStyle_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "shadowOffsetX",{"configurable":true,"enumerable":true,"get": function shadowOffsetX_get(){debugger; return "0"},"set": function shadowOffsetX_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "shadowOffsetY",{"configurable":true,"enumerable":true,"get": function shadowOffsetY_get(){debugger; return "0"},"set": function shadowOffsetY_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "shadowBlur",{"configurable":true,"enumerable":true,"get": function shadowBlur_get(){debugger; return "0"},"set": function shadowBlur_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "shadowColor",{"configurable":true,"enumerable":true,"get": function shadowColor_get(){debugger; return "rgba(0, 0, 0, 0)"},"set": function shadowColor_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "lineWidth",{"configurable":true,"enumerable":true,"get": function lineWidth_get(){debugger; return "1"},"set": function lineWidth_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "lineCap",{"configurable":true,"enumerable":true,"get": function lineCap_get(){debugger; return "butt"},"set": function lineCap_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "lineJoin",{"configurable":true,"enumerable":true,"get": function lineJoin_get(){debugger; return "miter"},"set": function lineJoin_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "miterLimit",{"configurable":true,"enumerable":true,"get": function miterLimit_get(){debugger; return "10"},"set": function miterLimit_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "lineDashOffset",{"configurable":true,"enumerable":true,"get": function lineDashOffset_get(){debugger; return "0"},"set": function lineDashOffset_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "font",{"configurable":true,"enumerable":true,"get": function font_get(){debugger; return "10px sans-serif"},"set": function font_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "textAlign",{"configurable":true,"enumerable":true,"get": function textAlign_get(){debugger; return "start"},"set": function textAlign_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "textBaseline",{"configurable":true,"enumerable":true,"get": function textBaseline_get(){debugger; return "alphabetic"},"set": function textBaseline_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "direction",{"configurable":true,"enumerable":true,"get": function direction_get(){debugger; return "ltr"},"set": function direction_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "fontKerning",{"configurable":true,"enumerable":true,"get": function fontKerning_get(){debugger; return "auto"},"set": function fontKerning_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "fontStretch",{"configurable":true,"enumerable":true,"get": function fontStretch_get(){debugger; return "normal"},"set": function fontStretch_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "fontVariantCaps",{"configurable":true,"enumerable":true,"get": function fontVariantCaps_get(){debugger; return "normal"},"set": function fontVariantCaps_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "letterSpacing",{"configurable":true,"enumerable":true,"get": function letterSpacing_get(){debugger; return "0px"},"set": function letterSpacing_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "textRendering",{"configurable":true,"enumerable":true,"get": function textRendering_get(){debugger; return "auto"},"set": function textRendering_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "wordSpacing",{"configurable":true,"enumerable":true,"get": function wordSpacing_get(){debugger; return "0px"},"set": function wordSpacing_set(){debugger;},});
Object.defineProperty(CanvasRenderingContext2D.prototype, "clip",{"configurable":true,"enumerable":true,"writable":true,"value": function clip(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.clip);
Object.defineProperty(CanvasRenderingContext2D.prototype, "createConicGradient",{"configurable":true,"enumerable":true,"writable":true,"value": function createConicGradient(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.createConicGradient);
Object.defineProperty(CanvasRenderingContext2D.prototype, "createImageData",{"configurable":true,"enumerable":true,"writable":true,"value": function createImageData(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.createImageData);
Object.defineProperty(CanvasRenderingContext2D.prototype, "createLinearGradient",{"configurable":true,"enumerable":true,"writable":true,"value": function createLinearGradient(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.createLinearGradient);
Object.defineProperty(CanvasRenderingContext2D.prototype, "createPattern",{"configurable":true,"enumerable":true,"writable":true,"value": function createPattern(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.createPattern);
Object.defineProperty(CanvasRenderingContext2D.prototype, "createRadialGradient",{"configurable":true,"enumerable":true,"writable":true,"value": function createRadialGradient(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.createRadialGradient);
Object.defineProperty(CanvasRenderingContext2D.prototype, "drawFocusIfNeeded",{"configurable":true,"enumerable":true,"writable":true,"value": function drawFocusIfNeeded(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.drawFocusIfNeeded);
Object.defineProperty(CanvasRenderingContext2D.prototype, "drawImage",{"configurable":true,"enumerable":true,"writable":true,"value": function drawImage(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.drawImage);
Object.defineProperty(CanvasRenderingContext2D.prototype, "fill",{"configurable":true,"enumerable":true,"writable":true,"value": function fill(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.fill);
Object.defineProperty(CanvasRenderingContext2D.prototype, "fillText",{"configurable":true,"enumerable":true,"writable":true,"value": function fillText(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.fillText);
Object.defineProperty(CanvasRenderingContext2D.prototype, "getContextAttributes",{"configurable":true,"enumerable":true,"writable":true,"value": function getContextAttributes(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.getContextAttributes);
Object.defineProperty(CanvasRenderingContext2D.prototype, "getImageData",{"configurable":true,"enumerable":true,"writable":true,"value": function getImageData(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.getImageData);
Object.defineProperty(CanvasRenderingContext2D.prototype, "getLineDash",{"configurable":true,"enumerable":true,"writable":true,"value": function getLineDash(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.getLineDash);
Object.defineProperty(CanvasRenderingContext2D.prototype, "getTransform",{"configurable":true,"enumerable":true,"writable":true,"value": function getTransform(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.getTransform);
Object.defineProperty(CanvasRenderingContext2D.prototype, "isContextLost",{"configurable":true,"enumerable":true,"writable":true,"value": function isContextLost(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.isContextLost);
Object.defineProperty(CanvasRenderingContext2D.prototype, "isPointInPath",{"configurable":true,"enumerable":true,"writable":true,"value": function isPointInPath(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.isPointInPath);
Object.defineProperty(CanvasRenderingContext2D.prototype, "isPointInStroke",{"configurable":true,"enumerable":true,"writable":true,"value": function isPointInStroke(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.isPointInStroke);
Object.defineProperty(CanvasRenderingContext2D.prototype, "measureText",{"configurable":true,"enumerable":true,"writable":true,"value": function measureText(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.measureText);
Object.defineProperty(CanvasRenderingContext2D.prototype, "putImageData",{"configurable":true,"enumerable":true,"writable":true,"value": function putImageData(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.putImageData);
Object.defineProperty(CanvasRenderingContext2D.prototype, "reset",{"configurable":true,"enumerable":true,"writable":true,"value": function reset(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.reset);
Object.defineProperty(CanvasRenderingContext2D.prototype, "roundRect",{"configurable":true,"enumerable":true,"writable":true,"value": function roundRect(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.roundRect);
Object.defineProperty(CanvasRenderingContext2D.prototype, "save",{"configurable":true,"enumerable":true,"writable":true,"value": function save(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.save);
Object.defineProperty(CanvasRenderingContext2D.prototype, "scale",{"configurable":true,"enumerable":true,"writable":true,"value": function scale(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.scale);
Object.defineProperty(CanvasRenderingContext2D.prototype, "setLineDash",{"configurable":true,"enumerable":true,"writable":true,"value": function setLineDash(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.setLineDash);
Object.defineProperty(CanvasRenderingContext2D.prototype, "setTransform",{"configurable":true,"enumerable":true,"writable":true,"value": function setTransform(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.setTransform);
Object.defineProperty(CanvasRenderingContext2D.prototype, "stroke",{"configurable":true,"enumerable":true,"writable":true,"value": function stroke(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.stroke);
Object.defineProperty(CanvasRenderingContext2D.prototype, "strokeText",{"configurable":true,"enumerable":true,"writable":true,"value": function strokeText(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.strokeText);
Object.defineProperty(CanvasRenderingContext2D.prototype, "transform",{"configurable":true,"enumerable":true,"writable":true,"value": function transform(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.transform);
Object.defineProperty(CanvasRenderingContext2D.prototype, "translate",{"configurable":true,"enumerable":true,"writable":true,"value": function translate(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.translate);
Object.defineProperty(CanvasRenderingContext2D.prototype, "arc",{"configurable":true,"enumerable":true,"writable":true,"value": function arc(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.arc);
Object.defineProperty(CanvasRenderingContext2D.prototype, "arcTo",{"configurable":true,"enumerable":true,"writable":true,"value": function arcTo(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.arcTo);
Object.defineProperty(CanvasRenderingContext2D.prototype, "beginPath",{"configurable":true,"enumerable":true,"writable":true,"value": function beginPath(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.beginPath);
Object.defineProperty(CanvasRenderingContext2D.prototype, "bezierCurveTo",{"configurable":true,"enumerable":true,"writable":true,"value": function bezierCurveTo(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.bezierCurveTo);
Object.defineProperty(CanvasRenderingContext2D.prototype, "clearRect",{"configurable":true,"enumerable":true,"writable":true,"value": function clearRect(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.clearRect);
Object.defineProperty(CanvasRenderingContext2D.prototype, "closePath",{"configurable":true,"enumerable":true,"writable":true,"value": function closePath(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.closePath);
Object.defineProperty(CanvasRenderingContext2D.prototype, "ellipse",{"configurable":true,"enumerable":true,"writable":true,"value": function ellipse(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.ellipse);
Object.defineProperty(CanvasRenderingContext2D.prototype, "fillRect",{"configurable":true,"enumerable":true,"writable":true,"value": function fillRect(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.fillRect);
Object.defineProperty(CanvasRenderingContext2D.prototype, "lineTo",{"configurable":true,"enumerable":true,"writable":true,"value": function lineTo(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.lineTo);
Object.defineProperty(CanvasRenderingContext2D.prototype, "moveTo",{"configurable":true,"enumerable":true,"writable":true,"value": function moveTo(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.moveTo);
Object.defineProperty(CanvasRenderingContext2D.prototype, "quadraticCurveTo",{"configurable":true,"enumerable":true,"writable":true,"value": function quadraticCurveTo(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.quadraticCurveTo);
Object.defineProperty(CanvasRenderingContext2D.prototype, "rect",{"configurable":true,"enumerable":true,"writable":true,"value": function rect(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.rect);
Object.defineProperty(CanvasRenderingContext2D.prototype, "resetTransform",{"configurable":true,"enumerable":true,"writable":true,"value": function resetTransform(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.resetTransform);
Object.defineProperty(CanvasRenderingContext2D.prototype, "restore",{"configurable":true,"enumerable":true,"writable":true,"value": function restore(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.restore);
Object.defineProperty(CanvasRenderingContext2D.prototype, "rotate",{"configurable":true,"enumerable":true,"writable":true,"value": function rotate(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.rotate);
Object.defineProperty(CanvasRenderingContext2D.prototype, "strokeRect",{"configurable":true,"enumerable":true,"writable":true,"value": function strokeRect(){debugger;},});dogvm.safefunction(CanvasRenderingContext2D.prototype.strokeRect);

CanvasRenderingContext2D.create2DDog = function create2DDog(){
    let dd = {};
    dd.__proto__ = CanvasRenderingContext2D.prototype;
    return dogvm.proxy(dd);
};dogvm.safefunction(CanvasRenderingContext2D.create2DDog);
// CustomElementRegistry对象
var CustomElementRegistry = function CustomElementRegistry(){};dogvm.safefunction(CustomElementRegistry);

Object.defineProperty(CustomElementRegistry.prototype, Symbol.toStringTag,{"value":"CustomElementRegistry","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CustomElementRegistry.prototype, "define",{"configurable":true,"enumerable":true,"writable":true,"value": function define(){debugger;},});dogvm.safefunction(CustomElementRegistry.prototype.define);
Object.defineProperty(CustomElementRegistry.prototype, "get",{"configurable":true,"enumerable":true,"writable":true,"value": function get(){debugger;},});dogvm.safefunction(CustomElementRegistry.prototype.get);
Object.defineProperty(CustomElementRegistry.prototype, "getName",{"configurable":true,"enumerable":true,"writable":true,"value": function getName(){debugger;},});dogvm.safefunction(CustomElementRegistry.prototype.getName);
Object.defineProperty(CustomElementRegistry.prototype, "upgrade",{"configurable":true,"enumerable":true,"writable":true,"value": function upgrade(){debugger;},});dogvm.safefunction(CustomElementRegistry.prototype.upgrade);
Object.defineProperty(CustomElementRegistry.prototype, "whenDefined",{"configurable":true,"enumerable":true,"writable":true,"value": function whenDefined(){debugger;},});dogvm.safefunction(CustomElementRegistry.prototype.whenDefined);
// CSSRule
var CSSRule = function CSSRule(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CSSRule);
Object.defineProperty(CSSRule, "STYLE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(CSSRule, "CHARSET_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(CSSRule, "IMPORT_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(CSSRule, "MEDIA_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(CSSRule, "FONT_FACE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(CSSRule, "PAGE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(CSSRule, "NAMESPACE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":10,});
Object.defineProperty(CSSRule, "KEYFRAMES_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":7,});
Object.defineProperty(CSSRule, "KEYFRAME_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(CSSRule, "COUNTER_STYLE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":11,});
Object.defineProperty(CSSRule, "FONT_FEATURE_VALUES_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":14,});
Object.defineProperty(CSSRule, "SUPPORTS_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":12,});
Object.defineProperty(CSSRule, "MARGIN_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":9,});
Object.defineProperty(CSSRule.prototype, Symbol.toStringTag,{"value":"CSSRule","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CSSRule.prototype, "parentRule",{"configurable":true,"enumerable":true,"get": function parentRule_get(){},set:undefined, });
Object.defineProperty(CSSRule.prototype, "parentStyleSheet",{"configurable":true,"enumerable":true,"get": function parentStyleSheet_get(){},set:undefined, });
Object.defineProperty(CSSRule.prototype, "STYLE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(CSSRule.prototype, "CHARSET_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(CSSRule.prototype, "IMPORT_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(CSSRule.prototype, "MEDIA_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(CSSRule.prototype, "FONT_FACE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(CSSRule.prototype, "PAGE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(CSSRule.prototype, "NAMESPACE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":10,});
Object.defineProperty(CSSRule.prototype, "KEYFRAMES_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":7,});
Object.defineProperty(CSSRule.prototype, "KEYFRAME_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(CSSRule.prototype, "COUNTER_STYLE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":11,});
Object.defineProperty(CSSRule.prototype, "FONT_FEATURE_VALUES_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":14,});
Object.defineProperty(CSSRule.prototype, "SUPPORTS_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":12,});
Object.defineProperty(CSSRule.prototype, "MARGIN_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":9,});

Object.defineProperty(CSSRule.prototype, "type",{"configurable":true,"enumerable":true,"get": function type_get(){return this._type;},set:undefined, });
Object.defineProperty(CSSRule.prototype, "cssText",{"configurable":true,"enumerable":true,"get": function cssText_get(){return this._cssText},"set": function cssText_set(value){debugger;this._cssText=value;},});
// CSSRuleList
var CSSRuleList = function CSSRuleList(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CSSRuleList);

Object.defineProperty(CSSRuleList.prototype, Symbol.toStringTag,{"value":"CSSRuleList","writable":false,"enumerable":false,"configurable":true})

Object.defineProperty(CSSRuleList.prototype, "item",{"configurable":true,"enumerable":true,"writable":true,"value": function item(){debugger;},});dogvm.safefunction(CSSRuleList.prototype.item);

Object.defineProperty(CSSRuleList.prototype, "length",{"configurable":true,"enumerable":true,
    "get": function length_get(){
        return this._rule.length;
    },set:undefined, });

CSSRuleList.createDog = function createDog(_innerHtml){
    let obj = Object.create(CSSRuleList.prototype);
    obj[0] = CSSStyleRule.createDog(_innerHtml);
    obj._rule = [obj[0]];
    return obj;
};dogvm.safefunction(CSSRuleList.createDog);
// CSSStyleRule
var CSSStyleRule = function CSSStyleRule(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CSSStyleRule);

Object.defineProperty(CSSStyleRule.prototype, Symbol.toStringTag,{"value":"CSSStyleRule","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CSSStyleRule.prototype, "selectorText",{"configurable":true,"enumerable":true,"get": function selectorText_get(){return this._selectorText;},"set": function selectorText_set(value){debugger;this._selectorText=value;},});
Object.defineProperty(CSSStyleRule.prototype, "style",{"configurable":true,"enumerable":true,"get": function style_get(){},"set": function style_set(){debugger;},});
Object.defineProperty(CSSStyleRule.prototype, "styleMap",{"configurable":true,"enumerable":true,"get": function styleMap_get(){},set:undefined, });
Object.defineProperty(CSSStyleRule.prototype, "cssRules",{"configurable":true,"enumerable":true,"get": function cssRules_get(){},set:undefined, });
Object.defineProperty(CSSStyleRule.prototype, "deleteRule",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteRule(){debugger;},});dogvm.safefunction(CSSStyleRule.prototype.deleteRule);
Object.defineProperty(CSSStyleRule.prototype, "insertRule",{"configurable":true,"enumerable":true,"writable":true,"value": function insertRule(){debugger;},});dogvm.safefunction(CSSStyleRule.prototype.insertRule);
Object.setPrototypeOf(CSSStyleRule.prototype, CSSRule.prototype);

CSSStyleRule.createDog = function createDog(_innerHtml){
    let csRule = Object.create(CSSStyleRule.prototype);
    csRule.selectorText = _innerHtml;
    csRule.cssText = _innerHtml;
    csRule._type = 1;
    return csRule;
}
// StyleSheet对象
var StyleSheet = function StyleSheet(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(StyleSheet);
Object.defineProperty(StyleSheet.prototype, Symbol.toStringTag,{"value":"StyleSheet","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(StyleSheet.prototype, "type",{"configurable":true,"enumerable":true,"get": function type_get(){return this._type;},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "href",{"configurable":true,"enumerable":true,"get": function href_get(){},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "ownerNode",{"configurable":true,"enumerable":true,"get": function ownerNode_get(){},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "parentStyleSheet",{"configurable":true,"enumerable":true,"get": function parentStyleSheet_get(){},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "title",{"configurable":true,"enumerable":true,"get": function title_get(){},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "media",{"configurable":true,"enumerable":true,"get": function media_get(){},"set": function media_set(){debugger;},});
Object.defineProperty(StyleSheet.prototype, "disabled",{"configurable":true,"enumerable":true,"get": function disabled_get(){},"set": function disabled_set(){debugger;},});


dogvm.safeproperty(StyleSheet);

// CSSStyleSheet
var CSSStyleSheet = function CSSStyleSheet(_innerHtml){
    let cs = Object.create(CSSStyleSheet.prototype);
    cs._type = "text/css";
    cs._innerHtml = _innerHtml;
    return dogvm.proxy(cs);
};dogvm.safefunction(CSSStyleSheet);

Object.defineProperty(CSSStyleSheet.prototype, Symbol.toStringTag,{"value":"CSSStyleSheet","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CSSStyleSheet.prototype, "ownerRule",{"configurable":true,"enumerable":true,"get": function ownerRule_get(){ return "null"},set:undefined, });
Object.defineProperty(CSSStyleSheet.prototype, "rules",{"configurable":true,"enumerable":true,"get": function rules_get(){ return "[object CSSRuleList]"},set:undefined, });
Object.defineProperty(CSSStyleSheet.prototype, "addRule",{"configurable":true,"enumerable":true,"writable":true,"value": function addRule(){debugger;},});dogvm.safefunction(CSSStyleSheet.prototype.addRule);
Object.defineProperty(CSSStyleSheet.prototype, "deleteRule",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteRule(){debugger;},});dogvm.safefunction(CSSStyleSheet.prototype.deleteRule);
Object.defineProperty(CSSStyleSheet.prototype, "insertRule",{"configurable":true,"enumerable":true,"writable":true,"value": function insertRule(){debugger;},});dogvm.safefunction(CSSStyleSheet.prototype.insertRule);
Object.defineProperty(CSSStyleSheet.prototype, "removeRule",{"configurable":true,"enumerable":true,"writable":true,"value": function removeRule(){debugger;},});dogvm.safefunction(CSSStyleSheet.prototype.removeRule);
Object.defineProperty(CSSStyleSheet.prototype, "replace",{"configurable":true,"enumerable":true,"writable":true,"value": function replace(){debugger;},});dogvm.safefunction(CSSStyleSheet.prototype.replace);
Object.defineProperty(CSSStyleSheet.prototype, "replaceSync",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceSync(){debugger;},});dogvm.safefunction(CSSStyleSheet.prototype.replaceSync);
Object.setPrototypeOf(CSSStyleSheet.prototype, StyleSheet.prototype);


Object.defineProperty(CSSStyleSheet.prototype, "cssRules",{"configurable":true,"enumerable":true,
    "get": function cssRules_get(){
        list = CSSRuleList.createDog(this._innerHtml);
        return list;
    },
    set:undefined, });
// Crypto对象
var Crypto = function Crypto(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(Crypto);

Object.defineProperty(Crypto.prototype, Symbol.toStringTag,{"value":"Crypto","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Crypto.prototype, "getRandomValues",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function getRandomValues(TypedArray){
        debugger;
        // 1. 校验输入是否为合法的 TypedArray
    const allowedTypes = [
        'Int8Array', 'Uint8Array', 'Uint8ClampedArray',
        'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array',
        'BigInt64Array', 'BigUint64Array'
      ];
      if (!array || !allowedTypes.includes(array.constructor.name)) {
        throw new TypeError(
          "Failed to execute 'getRandomValues' on 'Crypto': The provided value is not of a supported type."
        );
      }
  
      // 2. 根据 TypedArray 类型生成随机值
      const bytesPerElement = array.BYTES_PER_ELEMENT;
      const maxValue = Math.pow(2, 8 * bytesPerElement) - 1;
  
      for (let i = 0; i < array.length; i++) {
        // 生成 0 到 maxValue 之间的随机整数
        let randomValue = Math.floor(Math.random() * (maxValue + 1));
  
        // 处理有符号类型（如 Int8Array, Int16Array 等）
        if (array.constructor.name.startsWith('Int') && !array.constructor.name.includes('Uint')) {
          randomValue -= Math.floor(maxValue / 2);
        }
  
        array[i] = randomValue;
      }
  
      return array;
    },});dogvm.safefunction(Crypto.prototype.getRandomValues);
Object.defineProperty(Crypto.prototype, "subtle",{"configurable":true,"enumerable":true,
    "get": function subtle_get(){
        debugger; 
        return "[object SubtleCrypto]"
    },set:undefined, });
Object.defineProperty(Crypto.prototype, "randomUUID",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function randomUUID(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },});dogvm.safefunction(Crypto.prototype.randomUUID);

var crypto = {};
crypto.subtle = {};
Object.setPrototypeOf(crypto, Crypto.prototype);
crypto = dogvm.proxy(crypto);
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

WebGLDebugRendererInfo = {};
WebGLDebugRendererInfo.prototype = {};

Object.defineProperties(WebGLDebugRendererInfo.prototype, {
    [Symbol.toStringTag]: {
        value: "WebGLDebugRendererInfo",
        configurable: true
    }
});
Object.defineProperty(WebGLDebugRendererInfo.prototype, "UNMASKED_RENDERER_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37446,});
Object.defineProperty(WebGLDebugRendererInfo.prototype, "UNMASKED_VENDOR_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37445,});

WebGLDebugRendererInfo = dogvm.proxy(WebGLDebugRendererInfo);

webGLDebugRendererInfo = {};
webGLDebugRendererInfo.__proto__ = WebGLDebugRendererInfo.prototype;

dogvm.memory.webgl["WEBGL_debug_renderer_info"] = webGLDebugRendererInfo;

// // Error对象
// // 重写 Error 构造函数
// debugger;
// var originalError = Error;
// var Error = function (message) {
//     debugger;
//     const error = new originalError(message);
//     // 获取堆栈信息
//     let stack = error.stack;
//     // 格式化堆栈信息
//     function replaceStackTrace(str, targetPath, endPath) {

//     }

//     const targetPath = "tdc.js?app_data=7283145436216164352&t=573262812";
//     const str = 'Error: errr\n    at eval (eval-ee8821db.repl:1:1)\n    at D:\\code\\逆向\\js补环境/debugger.js:3126:17\n    at B (D:\\code\\逆向\\js补环境/debugger.js:3128:14)\n    at Array.R (D:\\code\\逆向\\js补环境/debugger.js:3241:20)\n    at __TENCENT_CHAOS_VM (D:\\code\\逆向\\js补环境/debugger.js:3380:34)\n    at Proxy.Q (D:\\code\\逆向\\js补环境/debugger.js:3221:24)\n    at Array.R (D:\\code\\逆向\\js补环境/debugger.js:3155:29)\n    at __TENCENT_CHAOS_VM (D:\\code\\逆向\\js补环境/debugger.js:3380:34)\n    at Object.Q [as getData] (D:\\code\\逆向\\js补环境/debugger.js:3221:24)\n    at D:\\code\\逆向\\js补环境/debugger.js:3533:12';
//     stack = replaceStackTrace(stack, targetPath, 'at e.getTdcData (dy-ele.5be1e8be.js:1:99567)');

//     // 修改堆栈
//     error.stack = stack;

//     return error;
// };
// dogvm.safefunction(Error);


// Error = dogvm.proxy(Error);

debugger

Error.prepareStackTrace = (err, structuredStackTrace) => {
    debugger;
    // 获取错误信息并作为第一行
    const errorMessage = `${err.name}: ${err.message}`;
    // const stackLines = structuredStackTrace.map((callSite, index) => {

    //     const functionName = callSite.getFunctionName() ;
    //     const fileName = callSite.getFileName() || '';
    //     const lineNumber = callSite.getLineNumber();
    //     const columnNumber = callSite.getColumnNumber();
    //     const replaceUrl = 'https://turing.captcha.qcloud.com/tdc.js?app_data=7283483814907846656&t=1344382419';
    //     const newFileName = fileName.split('debugger.js')[0].replace(/.*/, replaceUrl);
    //     if (index === 0 && callSite.isEval()) {
    //         return `    at eval (eval at <anonymous> (${newFileName}:${1}:${1}), <anonymous>:1:12)`;
    //     }

    //     if (index !== 0 && callSite.getFunctionName() == null){
    //         return `    at e.getTdcData (https://turing.captcha.gtimg.com/1/dy-ele.5be1e8be.js:1:99985)`;
    //     }

    //     if (index === structuredStackTrace.length - 1) {
    //         return `    at t.verify (https://turing.captcha.gtimg.com/1/dy-ele.5be1e8be.js:1:126659)`;
    //     }

    //     return functionName == null 
    //         ?`    at ${newFileName}:${lineNumber}:${columnNumber}`
    //         :`    at ${functionName} (${newFileName}:${lineNumber}:${columnNumber})`;
    // }).join('\n');

    // 将错误信息和堆栈信息组合
    stackLines = '    at https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:19:24\n    at B (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:21:14)\n    at Array.R (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:130:20)\n    at __TENCENT_CHAOS_VM (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:266:34)\n    at Q (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:110:24)\n    at Array.R (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:48:29)\n    at __TENCENT_CHAOS_VM (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:266:34)\n    at Object.Q [as getData] (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:110:24)\n    at e.getTdcData (https://turing.captcha.gtimg.com/1/dy-ele.5be1e8be.js:1:99985)\n    at t.verify (https://turing.captcha.gtimg.com/1/dy-ele.5be1e8be.js:1:126659)';
    return `${errorMessage}\n${stackLines}`;
};


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

var Node = function Node(){
    throw new TypeError("Illegal constructor");
};
dogvm.safefunction(Node);

Node.prototype.__proto__ = EventTarget.prototype;

///////////////////////////////////////
Object.defineProperty(Node, "ELEMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Node, "ATTRIBUTE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Node, "TEXT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(Node, "CDATA_SECTION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(Node, "ENTITY_REFERENCE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(Node, "ENTITY_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(Node, "PROCESSING_INSTRUCTION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":7,});
Object.defineProperty(Node, "COMMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(Node, "DOCUMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":9,});
Object.defineProperty(Node, "DOCUMENT_TYPE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":10,});
Object.defineProperty(Node, "DOCUMENT_FRAGMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":11,});
Object.defineProperty(Node, "NOTATION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":12,});
Object.defineProperty(Node, "DOCUMENT_POSITION_DISCONNECTED",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Node, "DOCUMENT_POSITION_PRECEDING",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Node, "DOCUMENT_POSITION_FOLLOWING",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(Node, "DOCUMENT_POSITION_CONTAINS",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(Node, "DOCUMENT_POSITION_CONTAINED_BY",{"configurable":false,"enumerable":true,"writable":false,"value":16,});
Object.defineProperty(Node, "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC",{"configurable":false,"enumerable":true,"writable":false,"value":32,});
Object.defineProperty(Node.prototype, Symbol.toStringTag,{"value":"Node","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Node.prototype, "baseURI",{"configurable":true,"enumerable":true,"get": function baseURI_get(){},set:Node, });
Object.defineProperty(Node.prototype, "isConnected",{"configurable":true,"enumerable":true,"get": function isConnected_get(){},set:Node, });
Object.defineProperty(Node.prototype, "ownerDocument",{"configurable":true,"enumerable":true,"get": function ownerDocument_get(){},set:Node, });
Object.defineProperty(Node.prototype, "parentElement",{"configurable":true,"enumerable":true,"get": function parentElement_get(){},set:Node, });
Object.defineProperty(Node.prototype, "childNodes",{"configurable":true,"enumerable":true,"get": function childNodes_get(){},set:Node, });
Object.defineProperty(Node.prototype, "firstChild",{"configurable":true,"enumerable":true,"get": function firstChild_get(){},set:Node, });
Object.defineProperty(Node.prototype, "lastChild",{"configurable":true,"enumerable":true,"get": function lastChild_get(){},set:Node, });
Object.defineProperty(Node.prototype, "previousSibling",{"configurable":true,"enumerable":true,"get": function previousSibling_get(){},set:Node, });
Object.defineProperty(Node.prototype, "nextSibling",{"configurable":true,"enumerable":true,"get": function nextSibling_get(){},set:Node, });
Object.defineProperty(Node.prototype, "nodeValue",{"configurable":true,"enumerable":true,"get": function nodeValue_get(){},"set": function nodeValue_set(){debugger;},});
Object.defineProperty(Node.prototype, "textContent",{"configurable":true,"enumerable":true,"get": function textContent_get(){},"set": function textContent_set(){debugger;},});
Object.defineProperty(Node.prototype, "ELEMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Node.prototype, "ATTRIBUTE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Node.prototype, "TEXT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(Node.prototype, "CDATA_SECTION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(Node.prototype, "ENTITY_REFERENCE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(Node.prototype, "ENTITY_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(Node.prototype, "PROCESSING_INSTRUCTION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":7,});
Object.defineProperty(Node.prototype, "COMMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(Node.prototype, "DOCUMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":9,});
Object.defineProperty(Node.prototype, "DOCUMENT_TYPE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":10,});
Object.defineProperty(Node.prototype, "DOCUMENT_FRAGMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":11,});
Object.defineProperty(Node.prototype, "NOTATION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":12,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_DISCONNECTED",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_PRECEDING",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_FOLLOWING",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_CONTAINS",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_CONTAINED_BY",{"configurable":false,"enumerable":true,"writable":false,"value":16,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC",{"configurable":false,"enumerable":true,"writable":false,"value":32,});
Object.defineProperty(Node.prototype, "compareDocumentPosition",{"configurable":true,"enumerable":true,"writable":true,"value": function compareDocumentPosition(){debugger;},});dogvm.safefunction(Node.prototype.compareDocumentPosition);
Object.defineProperty(Node.prototype, "contains",{"configurable":true,"enumerable":true,"writable":true,"value": function contains(){debugger;},});dogvm.safefunction(Node.prototype.contains);
Object.defineProperty(Node.prototype, "getRootNode",{"configurable":true,"enumerable":true,"writable":true,"value": function getRootNode(){debugger;},});dogvm.safefunction(Node.prototype.getRootNode);
Object.defineProperty(Node.prototype, "hasChildNodes",{"configurable":true,"enumerable":true,"writable":true,"value": function hasChildNodes(){debugger;},});dogvm.safefunction(Node.prototype.hasChildNodes);
Object.defineProperty(Node.prototype, "isDefaultNamespace",{"configurable":true,"enumerable":true,"writable":true,"value": function isDefaultNamespace(){debugger;},});dogvm.safefunction(Node.prototype.isDefaultNamespace);
Object.defineProperty(Node.prototype, "isEqualNode",{"configurable":true,"enumerable":true,"writable":true,"value": function isEqualNode(){debugger;},});dogvm.safefunction(Node.prototype.isEqualNode);
Object.defineProperty(Node.prototype, "isSameNode",{"configurable":true,"enumerable":true,"writable":true,"value": function isSameNode(){debugger;},});dogvm.safefunction(Node.prototype.isSameNode);
Object.defineProperty(Node.prototype, "lookupNamespaceURI",{"configurable":true,"enumerable":true,"writable":true,"value": function lookupNamespaceURI(){debugger;},});dogvm.safefunction(Node.prototype.lookupNamespaceURI);
Object.defineProperty(Node.prototype, "lookupPrefix",{"configurable":true,"enumerable":true,"writable":true,"value": function lookupPrefix(){debugger;},});dogvm.safefunction(Node.prototype.lookupPrefix);
Object.defineProperty(Node.prototype, "normalize",{"configurable":true,"enumerable":true,"writable":true,"value": function normalize(){debugger;},});dogvm.safefunction(Node.prototype.normalize);
Object.defineProperty(Node.prototype, "replaceChild",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceChild(){debugger;},});dogvm.safefunction(Node.prototype.replaceChild);
Object.setPrototypeOf(Node.prototype, EventTarget.prototype);


Object.defineProperty(Node.prototype, "appendChild",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function appendChild(aChild){
        debugger;

        if (aChild.parentNode) {
            aChild.parentNode.removeChild(aChild);
        }

        // dogvm.memory.htmlelements[this].push(aChild);

        aChild.parentNode = this;

        return aChild;
    },});dogvm.safefunction(Node.prototype.appendChild);


Object.defineProperty(Node.prototype, "removeChild",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function removeChild(child){
        debugger;
        if(!child instanceof Node){
            throw new Error("parameter 1 is not of type 'Node'");
        }
        let list = dogvm.memory.htmlNode.get(this);
        let childIndex = list.findIndex(element => element === child);

        if (childIndex !== -1) {
            // 从父节点的子节点列表中移除
            dogvm.memory.htmlNode.get(this).splice(childIndex, 1);
            for (let i = dogvm.memory.htmlId.length - 1; i >= 0; i--) {
                if (child.innerHTML.includes(dogvm.memory.htmlId[i].id)) { 
                    dogvm.memory.htmlId.splice(i, 1); 
                }
            }
            return child; // 返回被移除的节点
        } else {
            throw new NotFoundError("The node to be removed is not a child of this node");
        }

    },});dogvm.safefunction(Node.prototype.removeChild);


Object.defineProperty(Node.prototype, "parentNode", {
    "configurable": true,
    "enumerable": true,
    "get": function parentNode_get() {
        debugger;
        // 从 dogvm 的内存中获取该节点的父节点
        for (const [key, value] of dogvm.memory.htmlNode ) {
            if (value.includes(this)) {
                return key;
            }
        }
        return null;
    },
    "set": function parentNode_set(newParent) {
        debugger;

        // 确保新父节点的子节点列表存在
        if (!dogvm.memory.htmlNode.get(newParent)) {
            dogvm.memory.htmlNode.set(newParent, [])
        }
        // 添加到新父节点的子节点列表
        if (!dogvm.memory.htmlNode.get(newParent).includes(this)) {
            dogvm.memory.htmlNode.get(newParent).push(this);
        }
    }
    
});

Object.defineProperty(Node.prototype, "cloneNode",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function cloneNode(deep = false){
        debugger;
        // 克隆当前节点
        const clonedNode = document.createElement(this._tagName);
        // 如果需要深度克隆，克隆子节点
        if (deep) {
            debugger
            // clonedNode.children = this.children.map(child => child.cloneNode(true));
        }
        return dogvm.proxy(clonedNode);    
    },});dogvm.safefunction(Node.prototype.cloneNode);

Object.defineProperty(Node.prototype, "nodeType",{"configurable":true,"enumerable":true,"get": function nodeType_get(){},set:Node, });
Object.defineProperty(Node.prototype, "nodeName",{"configurable":true,"enumerable":true,"get": function nodeName_get(){},set:Node, });


Object.defineProperty(Node.prototype, "insertBefore",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function insertBefore(newNode, referenceNode){
        debugger;
        if (newNode.parentNode) {
            newNode.parentNode.removeChild(newNode);
        }
        newNode.parentNode = this;
        if(referenceNode != undefined){
            //将一个节点插入到指定父节点的子节点中，并位于参考节点之前
            let list = dogvm.memory.htmlNode.get(this);
           let childIndex = list.findIndex(e=>e===referenceNode);
           if(childIndex!==-1){
                const lastElement = list[list.length - 1];
                dogvm.memory.htmlNode.get(this).pop();
                dogvm.memory.htmlNode.get(this).splice(childIndex, 0, lastElement);
           }else{
                debugger;
                // 参考节点不是子节点 考虑报错
           }
        }
        return newNode;
    },});dogvm.safefunction(Node.prototype.insertBefore);



dogvm.safeproperty(Node);

var WindowProperties = function WindowProperties() { // 构造函数

};
dogvm.safefunction(WindowProperties);

Object.defineProperties(WindowProperties.prototype, {
    [Symbol.toStringTag]: {
        value: "WindowProperties",
        configurable: true
    }
})

// 设置原型的父对象
WindowProperties.prototype.__proto__ = EventTarget.prototype;



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
window = this;
debugger;
var Window = function Window() { // 构造函数
    // 容易被检测到的  js可以查看堆栈
    throw new TypeError("Illegal constructor");
};
dogvm.safefunction(Window);

Object.defineProperties(Window.prototype, {
    [Symbol.toStringTag]: {
        value: "Window",
        configurable: true
    }
})
Window.prototype.__proto__ = WindowProperties.prototype;
window.__proto__ = Window.prototype;

///////////////////////////// 浏览器代码自动生成部分
Object.defineProperty(Window.prototype, "TEMPORARY",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(Window.prototype, "PERSISTENT",{"configurable":false,"enumerable":true,"writable":false,"value":1,});

window.setTimeout = function (x, y) {
    debugger;
    // x可能是方法也可能是文本
    typeof (x) == "function" ? x() : undefined;
    typeof (x) == "string" ? eval(x) : undefined;
    // 正确应该 生成UUID，并且保存到内存
    return crypto.randomUUID();;
};
dogvm.safefunction(window.setTimeout);


window.open = function open() {
    debugger;
};
dogvm.safefunction(window.open);
// 赋值空对象最好使用这种class chrome{} 形式，而不是 {},因为这样我们可以看名字，并且最好挂上代理
window.chrome = dogvm.proxy(class chrome {
});


window.DeviceOrientationEvent = function DeviceOrientationEvent() {
    debugger;
};
dogvm.safefunction(window.DeviceOrientationEvent);

window.DeviceMotionEvent = function DeviceMotionEvent() {
    debugger;
};
dogvm.safefunction(window.DeviceMotionEvent);

window.btoa = function btoa(stringToEncode){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = stringToEncode;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars; 
         str.charAt(i | 0) || (map = '=', i % 1); 
         output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

        charCode = str.charCodeAt(i += 3 / 4);

        if (charCode > 0xFF) {
            throw new Error('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');
        }

        block = block << 8 | charCode;
    }

    return output;
};dogvm.safefunction(window.btoa);
window.atob = function atob(encodedData){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = encodedData.replace(/=+$/, ''); // 移除末尾的填充字符
    let output = '';

    if (str.length % 4 === 1) {
        throw new Error('"atob" failed: The string to be decoded is not correctly encoded.');
    }

    for (let bc = 0, bs, buffer, i = 0; buffer = str.charAt(i++); ) {
        buffer = chars.indexOf(buffer);

        if (buffer === -1) continue; // 忽略无效字符

        bs = bc % 4 ? bs * 64 + buffer : buffer;

        if (bc++ % 4) {
            output += String.fromCharCode(255 & bs >> (-2 * bc & 6));
        }
    }

    return output;
};dogvm.safefunction(window.atob);

window.setInterval = function(func,delay){
    debugger;
    return crypto.randomUUID();
};dogvm.safefunction(window.setInterval);

window.innerWidth = 360
window.innerHeight = 360 //edge 867 chrome 945

window.customElements = dogvm.proxy(new CustomElementRegistry());

window.getComputedStyle = function getComputedStyle(element, pseudoElt){
    debugger;
    return CSSStyleDeclaration.createCSSStyleDog(element);
};dogvm.safefunction(window.getComputedStyle);

window.matchMedia = function matchMedia(mediaQueryString){
    debugger;
    return MediaQueryList.createDog(mediaQueryString);
};dogvm.safefunction(window.matchMedia);

window.SyncManager = function SyncManager(){
    debugger;
};dogvm.safefunction(window.SyncManager);

window.TCaptchaReferrer = 'https://pintia.cn/auth/login?redirect=%2F';

window = dogvm.proxy(window);

Global = class global{
    
};

window.top = new Global();

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


// CharacterData
var CharacterData = function CharacterData(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CharacterData);
Object.defineProperty(CharacterData.prototype, Symbol.toStringTag,{"value":"CharacterData","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CharacterData.prototype, "data",{"configurable":true,"enumerable":true,"get": function data_get(){},"set": function data_set(){debugger;},});
Object.defineProperty(CharacterData.prototype, "length",{"configurable":true,"enumerable":true,"get": function length_get(){},set:undefined, });
Object.defineProperty(CharacterData.prototype, "previousElementSibling",{"configurable":true,"enumerable":true,"get": function previousElementSibling_get(){},set:undefined, });
Object.defineProperty(CharacterData.prototype, "nextElementSibling",{"configurable":true,"enumerable":true,"get": function nextElementSibling_get(){},set:undefined, });
Object.defineProperty(CharacterData.prototype, "after",{"configurable":true,"enumerable":true,"writable":true,"value": function after(){debugger;},});dogvm.safefunction(CharacterData.prototype.after);
Object.defineProperty(CharacterData.prototype, "appendData",{"configurable":true,"enumerable":true,"writable":true,"value": function appendData(){debugger;},});dogvm.safefunction(CharacterData.prototype.appendData);
Object.defineProperty(CharacterData.prototype, "before",{"configurable":true,"enumerable":true,"writable":true,"value": function before(){debugger;},});dogvm.safefunction(CharacterData.prototype.before);
Object.defineProperty(CharacterData.prototype, "deleteData",{"configurable":true,"enumerable":true,"writable":true,"value": function deleteData(){debugger;},});dogvm.safefunction(CharacterData.prototype.deleteData);
Object.defineProperty(CharacterData.prototype, "insertData",{"configurable":true,"enumerable":true,"writable":true,"value": function insertData(){debugger;},});dogvm.safefunction(CharacterData.prototype.insertData);
Object.defineProperty(CharacterData.prototype, "remove",{"configurable":true,"enumerable":true,"writable":true,"value": function remove(){debugger;},});dogvm.safefunction(CharacterData.prototype.remove);
Object.defineProperty(CharacterData.prototype, "replaceData",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceData(){debugger;},});dogvm.safefunction(CharacterData.prototype.replaceData);
Object.defineProperty(CharacterData.prototype, "replaceWith",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceWith(){debugger;},});dogvm.safefunction(CharacterData.prototype.replaceWith);
Object.defineProperty(CharacterData.prototype, "substringData",{"configurable":true,"enumerable":true,"writable":true,"value": function substringData(){debugger;},});dogvm.safefunction(CharacterData.prototype.substringData);
Object.setPrototypeOf(CharacterData.prototype, Node.prototype);


// Text
var Text = function Text(){};
Object.defineProperty(Text.prototype, Symbol.toStringTag,{"value":"Text","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Text.prototype, "wholeText",{"configurable":true,"enumerable":true,"get": function wholeText_get(){},set:undefined, });
Object.defineProperty(Text.prototype, "assignedSlot",{"configurable":true,"enumerable":true,"get": function assignedSlot_get(){},set:undefined, });
Object.defineProperty(Text.prototype, "splitText",{"configurable":true,"enumerable":true,"writable":true,"value": function splitText(){debugger;},});dogvm.safefunction(Text.prototype.splitText);
Object.setPrototypeOf(Text.prototype, CharacterData.prototype);


Text.createTextDog = function createTextDog(text){
    let my_text = Object.create(Text.prototype);
    my_text.wholeText = text;
    my_text.nodeType = 3;  // TEXT_NODE
    my_text.nodeName = "#text";
};dogvm.safefunction(Text.createTextDog);

dogvm.safeproperty(Text);
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
// Element
var Element = function Element(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(Element);

Object.defineProperties(Element.prototype, {
    [Symbol.toStringTag]: {
        value: "Element",
        configurable: true
    }
});

Object.defineProperties(Element.prototype, {
    [Symbol.unscopables]: {
        value: {
            after: true,
            append: true,
            before: true,
            prepend: true,
            remove: true,
            replaceChildren: true,
            replaceWith: true,
            slot: true
        },
        configurable: true
    }
});

Element.prototype.__proto__ = Node.prototype;

// Element属性
Object.defineProperty(Element.prototype, "namespaceURI",{"configurable":true,"enumerable":true,"get": function namespaceURI_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "prefix",{"configurable":true,"enumerable":true,"get": function prefix_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "localName",{"configurable":true,"enumerable":true,"get": function localName_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "id",{"configurable":true,"enumerable":true,"get": function id_get(){return this._id;},"set": function id_set(){debugger;},});
Object.defineProperty(Element.prototype, "className",{"configurable":true,"enumerable":true,"get": function className_get(){},"set": function className_set(){debugger;},});
Object.defineProperty(Element.prototype, "classList",{"configurable":true,"enumerable":true,"get": function classList_get(){},"set": function classList_set(){debugger;},});
Object.defineProperty(Element.prototype, "slot",{"configurable":true,"enumerable":true,"get": function slot_get(){},"set": function slot_set(){debugger;},});
Object.defineProperty(Element.prototype, "shadowRoot",{"configurable":true,"enumerable":true,"get": function shadowRoot_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "part",{"configurable":true,"enumerable":true,"get": function part_get(){},"set": function part_set(){debugger;},});
Object.defineProperty(Element.prototype, "assignedSlot",{"configurable":true,"enumerable":true,"get": function assignedSlot_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "scrollTop",{"configurable":true,"enumerable":true,"get": function scrollTop_get(){},"set": function scrollTop_set(){debugger;},});
Object.defineProperty(Element.prototype, "scrollLeft",{"configurable":true,"enumerable":true,"get": function scrollLeft_get(){},"set": function scrollLeft_set(){debugger;},});
Object.defineProperty(Element.prototype, "scrollWidth",{"configurable":true,"enumerable":true,"get": function scrollWidth_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "scrollHeight",{"configurable":true,"enumerable":true,"get": function scrollHeight_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "clientTop",{"configurable":true,"enumerable":true,"get": function clientTop_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "clientLeft",{"configurable":true,"enumerable":true,"get": function clientLeft_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "clientWidth",{"configurable":true,"enumerable":true,"get": function clientWidth_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "clientHeight",{"configurable":true,"enumerable":true,"get": function clientHeight_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "onbeforecopy",{"configurable":true,"enumerable":true,"get": function onbeforecopy_get(){},"set": function onbeforecopy_set(){debugger;},});
Object.defineProperty(Element.prototype, "onbeforecut",{"configurable":true,"enumerable":true,"get": function onbeforecut_get(){},"set": function onbeforecut_set(){debugger;},});
Object.defineProperty(Element.prototype, "onbeforepaste",{"configurable":true,"enumerable":true,"get": function onbeforepaste_get(){},"set": function onbeforepaste_set(){debugger;},});
Object.defineProperty(Element.prototype, "onsearch",{"configurable":true,"enumerable":true,"get": function onsearch_get(){},"set": function onsearch_set(){debugger;},});
Object.defineProperty(Element.prototype, "elementTiming",{"configurable":true,"enumerable":true,"get": function elementTiming_get(){},"set": function elementTiming_set(){debugger;},});
Object.defineProperty(Element.prototype, "onfullscreenchange",{"configurable":true,"enumerable":true,"get": function onfullscreenchange_get(){},"set": function onfullscreenchange_set(){debugger;},});
Object.defineProperty(Element.prototype, "onfullscreenerror",{"configurable":true,"enumerable":true,"get": function onfullscreenerror_get(){},"set": function onfullscreenerror_set(){debugger;},});
Object.defineProperty(Element.prototype, "onwebkitfullscreenchange",{"configurable":true,"enumerable":true,"get": function onwebkitfullscreenchange_get(){},"set": function onwebkitfullscreenchange_set(){debugger;},});
Object.defineProperty(Element.prototype, "onwebkitfullscreenerror",{"configurable":true,"enumerable":true,"get": function onwebkitfullscreenerror_get(){},"set": function onwebkitfullscreenerror_set(){debugger;},});
Object.defineProperty(Element.prototype, "role",{"configurable":true,"enumerable":true,"get": function role_get(){},"set": function role_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaAtomic",{"configurable":true,"enumerable":true,"get": function ariaAtomic_get(){},"set": function ariaAtomic_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaAutoComplete",{"configurable":true,"enumerable":true,"get": function ariaAutoComplete_get(){},"set": function ariaAutoComplete_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaBusy",{"configurable":true,"enumerable":true,"get": function ariaBusy_get(){},"set": function ariaBusy_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaBrailleLabel",{"configurable":true,"enumerable":true,"get": function ariaBrailleLabel_get(){},"set": function ariaBrailleLabel_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaBrailleRoleDescription",{"configurable":true,"enumerable":true,"get": function ariaBrailleRoleDescription_get(){},"set": function ariaBrailleRoleDescription_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaChecked",{"configurable":true,"enumerable":true,"get": function ariaChecked_get(){},"set": function ariaChecked_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaColCount",{"configurable":true,"enumerable":true,"get": function ariaColCount_get(){},"set": function ariaColCount_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaColIndex",{"configurable":true,"enumerable":true,"get": function ariaColIndex_get(){},"set": function ariaColIndex_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaColSpan",{"configurable":true,"enumerable":true,"get": function ariaColSpan_get(){},"set": function ariaColSpan_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaCurrent",{"configurable":true,"enumerable":true,"get": function ariaCurrent_get(){},"set": function ariaCurrent_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaDescription",{"configurable":true,"enumerable":true,"get": function ariaDescription_get(){},"set": function ariaDescription_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaDisabled",{"configurable":true,"enumerable":true,"get": function ariaDisabled_get(){},"set": function ariaDisabled_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaExpanded",{"configurable":true,"enumerable":true,"get": function ariaExpanded_get(){},"set": function ariaExpanded_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaHasPopup",{"configurable":true,"enumerable":true,"get": function ariaHasPopup_get(){},"set": function ariaHasPopup_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaHidden",{"configurable":true,"enumerable":true,"get": function ariaHidden_get(){},"set": function ariaHidden_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaInvalid",{"configurable":true,"enumerable":true,"get": function ariaInvalid_get(){},"set": function ariaInvalid_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaKeyShortcuts",{"configurable":true,"enumerable":true,"get": function ariaKeyShortcuts_get(){},"set": function ariaKeyShortcuts_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaLabel",{"configurable":true,"enumerable":true,"get": function ariaLabel_get(){},"set": function ariaLabel_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaLevel",{"configurable":true,"enumerable":true,"get": function ariaLevel_get(){},"set": function ariaLevel_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaLive",{"configurable":true,"enumerable":true,"get": function ariaLive_get(){},"set": function ariaLive_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaModal",{"configurable":true,"enumerable":true,"get": function ariaModal_get(){},"set": function ariaModal_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaMultiLine",{"configurable":true,"enumerable":true,"get": function ariaMultiLine_get(){},"set": function ariaMultiLine_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaMultiSelectable",{"configurable":true,"enumerable":true,"get": function ariaMultiSelectable_get(){},"set": function ariaMultiSelectable_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaOrientation",{"configurable":true,"enumerable":true,"get": function ariaOrientation_get(){},"set": function ariaOrientation_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaPlaceholder",{"configurable":true,"enumerable":true,"get": function ariaPlaceholder_get(){},"set": function ariaPlaceholder_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaPosInSet",{"configurable":true,"enumerable":true,"get": function ariaPosInSet_get(){},"set": function ariaPosInSet_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaPressed",{"configurable":true,"enumerable":true,"get": function ariaPressed_get(){},"set": function ariaPressed_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaReadOnly",{"configurable":true,"enumerable":true,"get": function ariaReadOnly_get(){},"set": function ariaReadOnly_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRelevant",{"configurable":true,"enumerable":true,"get": function ariaRelevant_get(){},"set": function ariaRelevant_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRequired",{"configurable":true,"enumerable":true,"get": function ariaRequired_get(){},"set": function ariaRequired_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRoleDescription",{"configurable":true,"enumerable":true,"get": function ariaRoleDescription_get(){},"set": function ariaRoleDescription_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRowCount",{"configurable":true,"enumerable":true,"get": function ariaRowCount_get(){},"set": function ariaRowCount_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRowIndex",{"configurable":true,"enumerable":true,"get": function ariaRowIndex_get(){},"set": function ariaRowIndex_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRowSpan",{"configurable":true,"enumerable":true,"get": function ariaRowSpan_get(){},"set": function ariaRowSpan_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaSelected",{"configurable":true,"enumerable":true,"get": function ariaSelected_get(){},"set": function ariaSelected_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaSetSize",{"configurable":true,"enumerable":true,"get": function ariaSetSize_get(){},"set": function ariaSetSize_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaSort",{"configurable":true,"enumerable":true,"get": function ariaSort_get(){},"set": function ariaSort_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaValueMax",{"configurable":true,"enumerable":true,"get": function ariaValueMax_get(){},"set": function ariaValueMax_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaValueMin",{"configurable":true,"enumerable":true,"get": function ariaValueMin_get(){},"set": function ariaValueMin_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaValueNow",{"configurable":true,"enumerable":true,"get": function ariaValueNow_get(){},"set": function ariaValueNow_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaValueText",{"configurable":true,"enumerable":true,"get": function ariaValueText_get(){},"set": function ariaValueText_set(){debugger;},});
Object.defineProperty(Element.prototype, "firstElementChild",{"configurable":true,"enumerable":true,"get": function firstElementChild_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "lastElementChild",{"configurable":true,"enumerable":true,"get": function lastElementChild_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "childElementCount",{"configurable":true,"enumerable":true,"get": function childElementCount_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "previousElementSibling",{"configurable":true,"enumerable":true,"get": function previousElementSibling_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "nextElementSibling",{"configurable":true,"enumerable":true,"get": function nextElementSibling_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "after",{"configurable":true,"enumerable":true,"writable":true,"value": function after(){debugger;},});dogvm.safefunction(Element.prototype.after);
Object.defineProperty(Element.prototype, "animate",{"configurable":true,"enumerable":true,"writable":true,"value": function animate(){debugger;},});dogvm.safefunction(Element.prototype.animate);
Object.defineProperty(Element.prototype, "append",{"configurable":true,"enumerable":true,"writable":true,"value": function append(){debugger;},});dogvm.safefunction(Element.prototype.append);
Object.defineProperty(Element.prototype, "attachShadow",{"configurable":true,"enumerable":true,"writable":true,"value": function attachShadow(){debugger;},});dogvm.safefunction(Element.prototype.attachShadow);
Object.defineProperty(Element.prototype, "before",{"configurable":true,"enumerable":true,"writable":true,"value": function before(){debugger;},});dogvm.safefunction(Element.prototype.before);
Object.defineProperty(Element.prototype, "checkVisibility",{"configurable":true,"enumerable":true,"writable":true,"value": function checkVisibility(){debugger;},});dogvm.safefunction(Element.prototype.checkVisibility);
Object.defineProperty(Element.prototype, "closest",{"configurable":true,"enumerable":true,"writable":true,"value": function closest(){debugger;},});dogvm.safefunction(Element.prototype.closest);
Object.defineProperty(Element.prototype, "computedStyleMap",{"configurable":true,"enumerable":true,"writable":true,"value": function computedStyleMap(){debugger;},});dogvm.safefunction(Element.prototype.computedStyleMap);
Object.defineProperty(Element.prototype, "getAnimations",{"configurable":true,"enumerable":true,"writable":true,"value": function getAnimations(){debugger;},});dogvm.safefunction(Element.prototype.getAnimations);
Object.defineProperty(Element.prototype, "getAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttributeNS(){debugger;},});dogvm.safefunction(Element.prototype.getAttributeNS);
Object.defineProperty(Element.prototype, "getAttributeNames",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttributeNames(){debugger;},});dogvm.safefunction(Element.prototype.getAttributeNames);
Object.defineProperty(Element.prototype, "getAttributeNode",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttributeNode(){debugger;},});dogvm.safefunction(Element.prototype.getAttributeNode);
Object.defineProperty(Element.prototype, "getAttributeNodeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function getAttributeNodeNS(){debugger;},});dogvm.safefunction(Element.prototype.getAttributeNodeNS);
Object.defineProperty(Element.prototype, "getBoundingClientRect",{"configurable":true,"enumerable":true,"writable":true,"value": function getBoundingClientRect(){debugger;},});dogvm.safefunction(Element.prototype.getBoundingClientRect);
Object.defineProperty(Element.prototype, "getClientRects",{"configurable":true,"enumerable":true,"writable":true,"value": function getClientRects(){debugger;},});dogvm.safefunction(Element.prototype.getClientRects);
Object.defineProperty(Element.prototype, "getElementsByClassName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByClassName(){debugger;},});dogvm.safefunction(Element.prototype.getElementsByClassName);
Object.defineProperty(Element.prototype, "getElementsByTagName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByTagName(){debugger;},});dogvm.safefunction(Element.prototype.getElementsByTagName);
Object.defineProperty(Element.prototype, "getElementsByTagNameNS",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByTagNameNS(){debugger;},});dogvm.safefunction(Element.prototype.getElementsByTagNameNS);
Object.defineProperty(Element.prototype, "getHTML",{"configurable":true,"enumerable":true,"writable":true,"value": function getHTML(){debugger;},});dogvm.safefunction(Element.prototype.getHTML);
Object.defineProperty(Element.prototype, "hasAttribute",{"configurable":true,"enumerable":true,"writable":true,"value": function hasAttribute(){debugger;},});dogvm.safefunction(Element.prototype.hasAttribute);
Object.defineProperty(Element.prototype, "hasAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function hasAttributeNS(){debugger;},});dogvm.safefunction(Element.prototype.hasAttributeNS);
Object.defineProperty(Element.prototype, "hasAttributes",{"configurable":true,"enumerable":true,"writable":true,"value": function hasAttributes(){debugger;},});dogvm.safefunction(Element.prototype.hasAttributes);
Object.defineProperty(Element.prototype, "hasPointerCapture",{"configurable":true,"enumerable":true,"writable":true,"value": function hasPointerCapture(){debugger;},});dogvm.safefunction(Element.prototype.hasPointerCapture);
Object.defineProperty(Element.prototype, "insertAdjacentElement",{"configurable":true,"enumerable":true,"writable":true,"value": function insertAdjacentElement(){debugger;},});dogvm.safefunction(Element.prototype.insertAdjacentElement);
Object.defineProperty(Element.prototype, "insertAdjacentHTML",{"configurable":true,"enumerable":true,"writable":true,"value": function insertAdjacentHTML(){debugger;},});dogvm.safefunction(Element.prototype.insertAdjacentHTML);
Object.defineProperty(Element.prototype, "insertAdjacentText",{"configurable":true,"enumerable":true,"writable":true,"value": function insertAdjacentText(){debugger;},});dogvm.safefunction(Element.prototype.insertAdjacentText);
Object.defineProperty(Element.prototype, "matches",{"configurable":true,"enumerable":true,"writable":true,"value": function matches(){debugger;},});dogvm.safefunction(Element.prototype.matches);
Object.defineProperty(Element.prototype, "prepend",{"configurable":true,"enumerable":true,"writable":true,"value": function prepend(){debugger;},});dogvm.safefunction(Element.prototype.prepend);
Object.defineProperty(Element.prototype, "querySelector",{"configurable":true,"enumerable":true,"writable":true,"value": function querySelector(){debugger;},});dogvm.safefunction(Element.prototype.querySelector);
Object.defineProperty(Element.prototype, "querySelectorAll",{"configurable":true,"enumerable":true,"writable":true,"value": function querySelectorAll(){debugger;},});dogvm.safefunction(Element.prototype.querySelectorAll);
Object.defineProperty(Element.prototype, "releasePointerCapture",{"configurable":true,"enumerable":true,"writable":true,"value": function releasePointerCapture(){debugger;},});dogvm.safefunction(Element.prototype.releasePointerCapture);

Object.defineProperty(Element.prototype, "removeAttribute",{"configurable":true,"enumerable":true,"writable":true,"value": function removeAttribute(){debugger;},});dogvm.safefunction(Element.prototype.removeAttribute);
Object.defineProperty(Element.prototype, "removeAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function removeAttributeNS(){debugger;},});dogvm.safefunction(Element.prototype.removeAttributeNS);
Object.defineProperty(Element.prototype, "removeAttributeNode",{"configurable":true,"enumerable":true,"writable":true,"value": function removeAttributeNode(){debugger;},});dogvm.safefunction(Element.prototype.removeAttributeNode);
Object.defineProperty(Element.prototype, "replaceChildren",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceChildren(){debugger;},});dogvm.safefunction(Element.prototype.replaceChildren);
Object.defineProperty(Element.prototype, "replaceWith",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceWith(){debugger;},});dogvm.safefunction(Element.prototype.replaceWith);
Object.defineProperty(Element.prototype, "requestFullscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function requestFullscreen(){debugger;},});dogvm.safefunction(Element.prototype.requestFullscreen);
Object.defineProperty(Element.prototype, "requestPointerLock",{"configurable":true,"enumerable":true,"writable":true,"value": function requestPointerLock(){debugger;},});dogvm.safefunction(Element.prototype.requestPointerLock);
Object.defineProperty(Element.prototype, "scroll",{"configurable":true,"enumerable":true,"writable":true,"value": function scroll(){debugger;},});dogvm.safefunction(Element.prototype.scroll);
Object.defineProperty(Element.prototype, "scrollBy",{"configurable":true,"enumerable":true,"writable":true,"value": function scrollBy(){debugger;},});dogvm.safefunction(Element.prototype.scrollBy);
Object.defineProperty(Element.prototype, "scrollIntoView",{"configurable":true,"enumerable":true,"writable":true,"value": function scrollIntoView(){debugger;},});dogvm.safefunction(Element.prototype.scrollIntoView);
Object.defineProperty(Element.prototype, "scrollIntoViewIfNeeded",{"configurable":true,"enumerable":true,"writable":true,"value": function scrollIntoViewIfNeeded(){debugger;},});dogvm.safefunction(Element.prototype.scrollIntoViewIfNeeded);
Object.defineProperty(Element.prototype, "scrollTo",{"configurable":true,"enumerable":true,"writable":true,"value": function scrollTo(){debugger;},});dogvm.safefunction(Element.prototype.scrollTo);
Object.defineProperty(Element.prototype, "setAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function setAttributeNS(){debugger;},});dogvm.safefunction(Element.prototype.setAttributeNS);
Object.defineProperty(Element.prototype, "setAttributeNode",{"configurable":true,"enumerable":true,"writable":true,"value": function setAttributeNode(){debugger;},});dogvm.safefunction(Element.prototype.setAttributeNode);
Object.defineProperty(Element.prototype, "setAttributeNodeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function setAttributeNodeNS(){debugger;},});dogvm.safefunction(Element.prototype.setAttributeNodeNS);
Object.defineProperty(Element.prototype, "setHTMLUnsafe",{"configurable":true,"enumerable":true,"writable":true,"value": function setHTMLUnsafe(){debugger;},});dogvm.safefunction(Element.prototype.setHTMLUnsafe);
Object.defineProperty(Element.prototype, "setPointerCapture",{"configurable":true,"enumerable":true,"writable":true,"value": function setPointerCapture(){debugger;},});dogvm.safefunction(Element.prototype.setPointerCapture);
Object.defineProperty(Element.prototype, "toggleAttribute",{"configurable":true,"enumerable":true,"writable":true,"value": function toggleAttribute(){debugger;},});dogvm.safefunction(Element.prototype.toggleAttribute);
Object.defineProperty(Element.prototype, "webkitMatchesSelector",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitMatchesSelector(){debugger;},});dogvm.safefunction(Element.prototype.webkitMatchesSelector);
Object.defineProperty(Element.prototype, "webkitRequestFullScreen",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitRequestFullScreen(){debugger;},});dogvm.safefunction(Element.prototype.webkitRequestFullScreen);
Object.defineProperty(Element.prototype, "webkitRequestFullscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitRequestFullscreen(){debugger;},});dogvm.safefunction(Element.prototype.webkitRequestFullscreen);
Object.defineProperty(Element.prototype, "currentCSSZoom",{"configurable":true,"enumerable":true,"get": function currentCSSZoom_get(){},set:undefined, });
Object.defineProperty(Element.prototype, "ariaColIndexText",{"configurable":true,"enumerable":true,"get": function ariaColIndexText_get(){},"set": function ariaColIndexText_set(){debugger;},});
Object.defineProperty(Element.prototype, "ariaRowIndexText",{"configurable":true,"enumerable":true,"get": function ariaRowIndexText_get(){},"set": function ariaRowIndexText_set(){debugger;},});
Object.setPrototypeOf(Element.prototype, Node.prototype);


Object.defineProperty(Element.prototype, "children",{"configurable":true,"enumerable":true,"get": function children_get(){},set:undefined, });


Object.defineProperty(Element.prototype, "tagName", {"configurable": true,"enumerable": true,
    get: function tagName_get() {
        debugger;
        if (!this._tagName) {
            return '';
        }
        return this._tagName.toUpperCase();
    },
    set: undefined
});

Object.defineProperty(Element.prototype, "remove",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function remove(){
        debugger;
        // 如果元素有父节点，从父节点中移除自己
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    },});dogvm.safefunction(Element.prototype.remove);

Object.defineProperty(Element.prototype, "setAttribute", {
    value: function setAttribute(name, value) {
        debugger;
        if (!this._attributes) {
            this._attributes = new Map();
        }
        if(name == 'id'){
            dogvm.memory.htmlId.push({
                tag: this.tagName,
                id: value,
                content: '' ,// 存储内容
                parentList: [this.tagName]
            }
            );
        }
        this._attributes.set(String(name), String(value));
    },
    writable: true,
    enumerable: true,
    configurable: true
});dogvm.safefunction(Element.prototype.setAttribute);    

Object.defineProperty(Element.prototype, "getAttribute", {
    value: function getAttribute(name) {
        debugger;
        if (!this._attributes) {
            return null;
        }
        return this._attributes.get(String(name)) || null;
    },
    writable: true,
    enumerable: true,
    configurable: true
});dogvm.safefunction(Element.prototype.getAttribute);


Object.defineProperty(Element.prototype, "attributes", {
    get: function() {
        debugger;
        if (!this._attributes) {
            this._attributes = new Map();
        }
        
        let attrs = [];
        this._attributes.forEach((value, name) => {
            attrs.push({
                name: name,
                value: value,
                nodeType: 2, // ATTRIBUTE_NODE
                toString: function() {
                    return this.name + '="' + this.value + '"';
                }
            });
        });

        attrs.getNamedItem = function(name) {
            return this.find(attr => attr.name === name);
        };
        attrs.item = function(index) {
            return this[index];
        };
        
        return attrs;
    },
    enumerable: true,
    configurable: true
});



Object.defineProperty(Element.prototype, "innerHTML", {"configurable": true,"enumerable": true,
    get: function innerHTML_get() {
        debugger;
        return this._innerHtml || '';
    },
    set: function innerHTML_set(value) {
        debugger;
        function getParentTagsByIds(html, targetId) {
            let tagStack = []; // 用于记录标签的堆栈
            let result = {}; // 存储每个目标 ID 的父标签路径
            let currentIndex = 0; // 当前解析位置
            html = html.replace(/\n/g, '').replace(/\s+/g, ' ');
            while (currentIndex < html.length) {
                let currentChar = html[currentIndex];
                // 查找开始标签
                if (currentChar === '<' && html[currentIndex + 1] !== '/') {
                    let tagEnd = html.indexOf('>', currentIndex); // 找到结束标签的 '>'
                    if (tagEnd === -1) break; // 防止索引超出范围
                    let tag = html.substring(currentIndex + 1, tagEnd).trim();
                    let tagName = tag.split(' ')[0]; // 提取标签名
                    // 将当前标签推入堆栈
                    tagStack.push(tagName);
                    // 检查是否包含目标 ID
                    if (tag.includes(`id="${targetId}"`)) {
                        // 记录父标签路径
                        result[targetId] = [...tagStack];
                    }
                    currentIndex = tagEnd + 1; // 更新解析位置
                }
                // 查找结束标签
                else if (currentChar === '<' && html[currentIndex + 1] === '/') {
                    let tagEnd = html.indexOf('>', currentIndex); // 找到结束标签的 '>'
                    if (tagEnd === -1) break; // 防止索引超出范围
        
                    let closingTag = html.substring(currentIndex + 2, tagEnd).trim();
                    if (tagStack[tagStack.length - 1] === closingTag) {
                        tagStack.pop(); // 弹出栈顶标签
                    }
        
                    currentIndex = tagEnd + 1; // 更新解析位置
                } else {
                    currentIndex++; // 如果不是标签字符，则继续前进
                }
            }
        
            // 返回每个目标 ID 的父标签路径
            return result;
        }
        function getTagsWithIds(htmlString,e) {
            if (!dogvm.memory.htmlId) {
                dogvm.memory.htmlId = [];
            }
            let matches = htmlString.match(/<([a-zA-Z0-9]+)[^>]*?id=["']([^"']+)["'][^>]*>(.*?)<\/\1>/g) || [];
            matches.forEach(match => {
                let tagName = match.match(/<([a-zA-Z0-9]+)/)[1]; // 获取标签名
                let id = match.match(/id=["']([^"']+)["']/)[1]; // 获取 id
                let content = match.match(/>(.*?)<\/[a-zA-Z0-9]+>/)[1]; // 获取标签内的内容
                let existingIndex = dogvm.memory.htmlId.findIndex(item => item.id === id);
                if (existingIndex === -1) {
                    dogvm.memory.htmlId.push({
                        tag: tagName,
                        id: id,
                        content: content ,// 存储内容
                        parentList: getParentTagsByIds(htmlString,id)[id]
                    });
                } else {
                    dogvm.memory.htmlId[existingIndex].tag = tagName;
                    dogvm.memory.htmlId[existingIndex].content = content;
                    dogvm.memory.htmlId[existingIndex].parentList = getParentTagsByIds(htmlString,id)[id]; // 更新内容
                }
            });
        }
        function getCssChose(cssString,e){
            function isValidCSSSelector(selector) {
                // 基本的 CSS 选择器正则表达式
                const cssSelectorRegex = /^[\w-]+(\s*>\s*[\w-]+|\s+[\w-]+|\s*:\s*not\([^)]+\))*(\s*:\s*[\w-]+)?(\s*\.[\w-]+)*(\s*#\w+)*$/;
                return cssSelectorRegex.test(selector.trim());
            }
            // 正则表达式提取选择器和颜色
            const regex = /(\w+\s*:\s*not\([^)]+\))\s*{\s*color:\s*([^;]+);/g;
            let match;
            while ((match = regex.exec(cssString)) !== null) {
                const selector = match[1].trim(); // 提取选择器
                const color = match[2].trim(); // 提取颜色
                if (isValidCSSSelector(selector)) {
                    dogvm.memory.cssChose.push({ selector, color })
                }
            }
        }

        getCssChose(value,this);
        getTagsWithIds(value,this);
        this._innerHtml = value;
        return value;
    }
});

Object.defineProperty(Element.prototype, "outerHTML",{"configurable":true,"enumerable":true,
    "get": function outerHTML_get(){
        debugger;
        //outerHTML属性获取描述元素（包括其后代）的序列化 HTML 片段。它也可以设置为用从给定字符串解析的节点替换元素
        // 如果没有父节点 或者 子节点  就只返回自己标签
        let innerHTML = '';
        function getHTML(e,inner){
            return "<" + e._tagName + ">" + inner + "<" + "/" + e._tagName + ">";
        }
        let children = dogvm.memory.htmlNode.get(this) || [];
        if(children.length > 0){
            //有子节点  将子节点标签放里面
            children.forEach(e=>{
                let str = getHTML(e,e.innerHTML);
                innerHTML = innerHTML + str;
            });
        }
        return getHTML(this,innerHTML);
    },"set": function outerHTML_set(){debugger;},});


dogvm.safeproperty(Element);
// HTMLElement
var HTMLElement = function HTMLElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLElement);

Object.defineProperties(HTMLElement.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLElement",
        configurable: true
    }
});

HTMLElement.prototype.__proto__ = Element.prototype;

// HTMLElement属性
Object.defineProperty(HTMLElement.prototype, "title",{"configurable":true,"enumerable":true,"get": function title_get(){},"set": function title_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "lang",{"configurable":true,"enumerable":true,"get": function lang_get(){},"set": function lang_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "translate",{"configurable":true,"enumerable":true,"get": function translate_get(){},"set": function translate_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "dir",{"configurable":true,"enumerable":true,"get": function dir_get(){},"set": function dir_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "hidden",{"configurable":true,"enumerable":true,"get": function hidden_get(){},"set": function hidden_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "inert",{"configurable":true,"enumerable":true,"get": function inert_get(){},"set": function inert_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "accessKey",{"configurable":true,"enumerable":true,"get": function accessKey_get(){},"set": function accessKey_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "draggable",{"configurable":true,"enumerable":true,"get": function draggable_get(){},"set": function draggable_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "spellcheck",{"configurable":true,"enumerable":true,"get": function spellcheck_get(){},"set": function spellcheck_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "autocapitalize",{"configurable":true,"enumerable":true,"get": function autocapitalize_get(){},"set": function autocapitalize_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "editContext",{"configurable":true,"enumerable":true,"get": function editContext_get(){},"set": function editContext_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "contentEditable",{"configurable":true,"enumerable":true,"get": function contentEditable_get(){},"set": function contentEditable_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "enterKeyHint",{"configurable":true,"enumerable":true,"get": function enterKeyHint_get(){},"set": function enterKeyHint_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "isContentEditable",{"configurable":true,"enumerable":true,"get": function isContentEditable_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "inputMode",{"configurable":true,"enumerable":true,"get": function inputMode_get(){},"set": function inputMode_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "virtualKeyboardPolicy",{"configurable":true,"enumerable":true,"get": function virtualKeyboardPolicy_get(){},"set": function virtualKeyboardPolicy_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "offsetParent",{"configurable":true,"enumerable":true,"get": function offsetParent_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "offsetTop",{"configurable":true,"enumerable":true,"get": function offsetTop_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "offsetLeft",{"configurable":true,"enumerable":true,"get": function offsetLeft_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "offsetWidth",{"configurable":true,"enumerable":true,"get": function offsetWidth_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "offsetHeight",{"configurable":true,"enumerable":true,"get": function offsetHeight_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "popover",{"configurable":true,"enumerable":true,"get": function popover_get(){},"set": function popover_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "innerText",{"configurable":true,"enumerable":true,"get": function innerText_get(){},"set": function innerText_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "outerText",{"configurable":true,"enumerable":true,"get": function outerText_get(){},"set": function outerText_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "writingSuggestions",{"configurable":true,"enumerable":true,"get": function writingSuggestions_get(){},"set": function writingSuggestions_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onbeforexrselect",{"configurable":true,"enumerable":true,"get": function onbeforexrselect_get(){},"set": function onbeforexrselect_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onabort",{"configurable":true,"enumerable":true,"get": function onabort_get(){},"set": function onabort_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onbeforeinput",{"configurable":true,"enumerable":true,"get": function onbeforeinput_get(){},"set": function onbeforeinput_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onbeforematch",{"configurable":true,"enumerable":true,"get": function onbeforematch_get(){},"set": function onbeforematch_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onbeforetoggle",{"configurable":true,"enumerable":true,"get": function onbeforetoggle_get(){},"set": function onbeforetoggle_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onblur",{"configurable":true,"enumerable":true,"get": function onblur_get(){},"set": function onblur_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncancel",{"configurable":true,"enumerable":true,"get": function oncancel_get(){},"set": function oncancel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncanplay",{"configurable":true,"enumerable":true,"get": function oncanplay_get(){},"set": function oncanplay_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncanplaythrough",{"configurable":true,"enumerable":true,"get": function oncanplaythrough_get(){},"set": function oncanplaythrough_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onchange",{"configurable":true,"enumerable":true,"get": function onchange_get(){},"set": function onchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onclick",{"configurable":true,"enumerable":true,"get": function onclick_get(){},"set": function onclick_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onclose",{"configurable":true,"enumerable":true,"get": function onclose_get(){},"set": function onclose_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncontentvisibilityautostatechange",{"configurable":true,"enumerable":true,"get": function oncontentvisibilityautostatechange_get(){},"set": function oncontentvisibilityautostatechange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncontextlost",{"configurable":true,"enumerable":true,"get": function oncontextlost_get(){},"set": function oncontextlost_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncontextmenu",{"configurable":true,"enumerable":true,"get": function oncontextmenu_get(){},"set": function oncontextmenu_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncontextrestored",{"configurable":true,"enumerable":true,"get": function oncontextrestored_get(){},"set": function oncontextrestored_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncuechange",{"configurable":true,"enumerable":true,"get": function oncuechange_get(){},"set": function oncuechange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondblclick",{"configurable":true,"enumerable":true,"get": function ondblclick_get(){},"set": function ondblclick_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondrag",{"configurable":true,"enumerable":true,"get": function ondrag_get(){},"set": function ondrag_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragend",{"configurable":true,"enumerable":true,"get": function ondragend_get(){},"set": function ondragend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragenter",{"configurable":true,"enumerable":true,"get": function ondragenter_get(){},"set": function ondragenter_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragleave",{"configurable":true,"enumerable":true,"get": function ondragleave_get(){},"set": function ondragleave_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragover",{"configurable":true,"enumerable":true,"get": function ondragover_get(){},"set": function ondragover_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondragstart",{"configurable":true,"enumerable":true,"get": function ondragstart_get(){},"set": function ondragstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondrop",{"configurable":true,"enumerable":true,"get": function ondrop_get(){},"set": function ondrop_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ondurationchange",{"configurable":true,"enumerable":true,"get": function ondurationchange_get(){},"set": function ondurationchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onemptied",{"configurable":true,"enumerable":true,"get": function onemptied_get(){},"set": function onemptied_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onended",{"configurable":true,"enumerable":true,"get": function onended_get(){},"set": function onended_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onerror",{"configurable":true,"enumerable":true,"get": function onerror_get(){},"set": function onerror_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onfocus",{"configurable":true,"enumerable":true,"get": function onfocus_get(){},"set": function onfocus_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onformdata",{"configurable":true,"enumerable":true,"get": function onformdata_get(){},"set": function onformdata_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oninput",{"configurable":true,"enumerable":true,"get": function oninput_get(){},"set": function oninput_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oninvalid",{"configurable":true,"enumerable":true,"get": function oninvalid_get(){},"set": function oninvalid_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onkeydown",{"configurable":true,"enumerable":true,"get": function onkeydown_get(){},"set": function onkeydown_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onkeypress",{"configurable":true,"enumerable":true,"get": function onkeypress_get(){},"set": function onkeypress_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onkeyup",{"configurable":true,"enumerable":true,"get": function onkeyup_get(){},"set": function onkeyup_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onload",{"configurable":true,"enumerable":true,"get": function onload_get(){},"set": function onload_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onloadeddata",{"configurable":true,"enumerable":true,"get": function onloadeddata_get(){},"set": function onloadeddata_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onloadedmetadata",{"configurable":true,"enumerable":true,"get": function onloadedmetadata_get(){},"set": function onloadedmetadata_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onloadstart",{"configurable":true,"enumerable":true,"get": function onloadstart_get(){},"set": function onloadstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmousedown",{"configurable":true,"enumerable":true,"get": function onmousedown_get(){},"set": function onmousedown_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseenter",{"configurable":true,"enumerable":true,"get": function onmouseenter_get(){},"set": function onmouseenter_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseleave",{"configurable":true,"enumerable":true,"get": function onmouseleave_get(){},"set": function onmouseleave_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmousemove",{"configurable":true,"enumerable":true,"get": function onmousemove_get(){},"set": function onmousemove_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseout",{"configurable":true,"enumerable":true,"get": function onmouseout_get(){},"set": function onmouseout_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseover",{"configurable":true,"enumerable":true,"get": function onmouseover_get(){},"set": function onmouseover_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmouseup",{"configurable":true,"enumerable":true,"get": function onmouseup_get(){},"set": function onmouseup_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onmousewheel",{"configurable":true,"enumerable":true,"get": function onmousewheel_get(){},"set": function onmousewheel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpause",{"configurable":true,"enumerable":true,"get": function onpause_get(){},"set": function onpause_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onplay",{"configurable":true,"enumerable":true,"get": function onplay_get(){},"set": function onplay_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onplaying",{"configurable":true,"enumerable":true,"get": function onplaying_get(){},"set": function onplaying_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onprogress",{"configurable":true,"enumerable":true,"get": function onprogress_get(){},"set": function onprogress_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onratechange",{"configurable":true,"enumerable":true,"get": function onratechange_get(){},"set": function onratechange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onreset",{"configurable":true,"enumerable":true,"get": function onreset_get(){},"set": function onreset_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onresize",{"configurable":true,"enumerable":true,"get": function onresize_get(){},"set": function onresize_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onscroll",{"configurable":true,"enumerable":true,"get": function onscroll_get(){},"set": function onscroll_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onsecuritypolicyviolation",{"configurable":true,"enumerable":true,"get": function onsecuritypolicyviolation_get(){},"set": function onsecuritypolicyviolation_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onseeked",{"configurable":true,"enumerable":true,"get": function onseeked_get(){},"set": function onseeked_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onseeking",{"configurable":true,"enumerable":true,"get": function onseeking_get(){},"set": function onseeking_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onselect",{"configurable":true,"enumerable":true,"get": function onselect_get(){},"set": function onselect_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onslotchange",{"configurable":true,"enumerable":true,"get": function onslotchange_get(){},"set": function onslotchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onstalled",{"configurable":true,"enumerable":true,"get": function onstalled_get(){},"set": function onstalled_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onsubmit",{"configurable":true,"enumerable":true,"get": function onsubmit_get(){},"set": function onsubmit_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onsuspend",{"configurable":true,"enumerable":true,"get": function onsuspend_get(){},"set": function onsuspend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontimeupdate",{"configurable":true,"enumerable":true,"get": function ontimeupdate_get(){},"set": function ontimeupdate_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontoggle",{"configurable":true,"enumerable":true,"get": function ontoggle_get(){},"set": function ontoggle_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onvolumechange",{"configurable":true,"enumerable":true,"get": function onvolumechange_get(){},"set": function onvolumechange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwaiting",{"configurable":true,"enumerable":true,"get": function onwaiting_get(){},"set": function onwaiting_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwebkitanimationend",{"configurable":true,"enumerable":true,"get": function onwebkitanimationend_get(){},"set": function onwebkitanimationend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwebkitanimationiteration",{"configurable":true,"enumerable":true,"get": function onwebkitanimationiteration_get(){},"set": function onwebkitanimationiteration_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwebkitanimationstart",{"configurable":true,"enumerable":true,"get": function onwebkitanimationstart_get(){},"set": function onwebkitanimationstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwebkittransitionend",{"configurable":true,"enumerable":true,"get": function onwebkittransitionend_get(){},"set": function onwebkittransitionend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onwheel",{"configurable":true,"enumerable":true,"get": function onwheel_get(){},"set": function onwheel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onauxclick",{"configurable":true,"enumerable":true,"get": function onauxclick_get(){},"set": function onauxclick_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ongotpointercapture",{"configurable":true,"enumerable":true,"get": function ongotpointercapture_get(){},"set": function ongotpointercapture_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onlostpointercapture",{"configurable":true,"enumerable":true,"get": function onlostpointercapture_get(){},"set": function onlostpointercapture_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerdown",{"configurable":true,"enumerable":true,"get": function onpointerdown_get(){},"set": function onpointerdown_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointermove",{"configurable":true,"enumerable":true,"get": function onpointermove_get(){},"set": function onpointermove_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerrawupdate",{"configurable":true,"enumerable":true,"get": function onpointerrawupdate_get(){},"set": function onpointerrawupdate_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerup",{"configurable":true,"enumerable":true,"get": function onpointerup_get(){},"set": function onpointerup_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointercancel",{"configurable":true,"enumerable":true,"get": function onpointercancel_get(){},"set": function onpointercancel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerover",{"configurable":true,"enumerable":true,"get": function onpointerover_get(){},"set": function onpointerover_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerout",{"configurable":true,"enumerable":true,"get": function onpointerout_get(){},"set": function onpointerout_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerenter",{"configurable":true,"enumerable":true,"get": function onpointerenter_get(){},"set": function onpointerenter_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpointerleave",{"configurable":true,"enumerable":true,"get": function onpointerleave_get(){},"set": function onpointerleave_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onselectstart",{"configurable":true,"enumerable":true,"get": function onselectstart_get(){},"set": function onselectstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onselectionchange",{"configurable":true,"enumerable":true,"get": function onselectionchange_get(){},"set": function onselectionchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onanimationend",{"configurable":true,"enumerable":true,"get": function onanimationend_get(){},"set": function onanimationend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onanimationiteration",{"configurable":true,"enumerable":true,"get": function onanimationiteration_get(){},"set": function onanimationiteration_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onanimationstart",{"configurable":true,"enumerable":true,"get": function onanimationstart_get(){},"set": function onanimationstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontransitionrun",{"configurable":true,"enumerable":true,"get": function ontransitionrun_get(){},"set": function ontransitionrun_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontransitionstart",{"configurable":true,"enumerable":true,"get": function ontransitionstart_get(){},"set": function ontransitionstart_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontransitionend",{"configurable":true,"enumerable":true,"get": function ontransitionend_get(){},"set": function ontransitionend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "ontransitioncancel",{"configurable":true,"enumerable":true,"get": function ontransitioncancel_get(){},"set": function ontransitioncancel_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncopy",{"configurable":true,"enumerable":true,"get": function oncopy_get(){},"set": function oncopy_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "oncut",{"configurable":true,"enumerable":true,"get": function oncut_get(){},"set": function oncut_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onpaste",{"configurable":true,"enumerable":true,"get": function onpaste_get(){},"set": function onpaste_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "dataset",{"configurable":true,"enumerable":true,"get": function dataset_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "nonce",{"configurable":true,"enumerable":true,"get": function nonce_get(){},"set": function nonce_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "autofocus",{"configurable":true,"enumerable":true,"get": function autofocus_get(){},"set": function autofocus_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "tabIndex",{"configurable":true,"enumerable":true,"get": function tabIndex_get(){},"set": function tabIndex_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "attributeStyleMap",{"configurable":true,"enumerable":true,"get": function attributeStyleMap_get(){},set:undefined, });
Object.defineProperty(HTMLElement.prototype, "attachInternals",{"configurable":true,"enumerable":true,"writable":true,"value": function attachInternals(){debugger;},});dogvm.safefunction(HTMLElement.prototype.attachInternals);
Object.defineProperty(HTMLElement.prototype, "blur",{"configurable":true,"enumerable":true,"writable":true,"value": function blur(){debugger;},});dogvm.safefunction(HTMLElement.prototype.blur);
Object.defineProperty(HTMLElement.prototype, "click",{"configurable":true,"enumerable":true,"writable":true,"value": function click(){debugger;},});dogvm.safefunction(HTMLElement.prototype.click);
Object.defineProperty(HTMLElement.prototype, "focus",{"configurable":true,"enumerable":true,"writable":true,"value": function focus(){debugger;},});dogvm.safefunction(HTMLElement.prototype.focus);
Object.defineProperty(HTMLElement.prototype, "hidePopover",{"configurable":true,"enumerable":true,"writable":true,"value": function hidePopover(){debugger;},});dogvm.safefunction(HTMLElement.prototype.hidePopover);
Object.defineProperty(HTMLElement.prototype, "showPopover",{"configurable":true,"enumerable":true,"writable":true,"value": function showPopover(){debugger;},});dogvm.safefunction(HTMLElement.prototype.showPopover);
Object.defineProperty(HTMLElement.prototype, "togglePopover",{"configurable":true,"enumerable":true,"writable":true,"value": function togglePopover(){debugger;},});dogvm.safefunction(HTMLElement.prototype.togglePopover);
Object.defineProperty(HTMLElement.prototype, "onscrollend",{"configurable":true,"enumerable":true,"get": function onscrollend_get(){},"set": function onscrollend_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onscrollsnapchange",{"configurable":true,"enumerable":true,"get": function onscrollsnapchange_get(){},"set": function onscrollsnapchange_set(){debugger;},});
Object.defineProperty(HTMLElement.prototype, "onscrollsnapchanging",{"configurable":true,"enumerable":true,"get": function onscrollsnapchanging_get(){},"set": function onscrollsnapchanging_set(){debugger;},});
Object.setPrototypeOf(HTMLElement.prototype, Element.prototype);


/////////////////////// 默认返回一个CSSStyleDeclaration对象  如果元素内容特殊 再在单独里面去重写
Object.defineProperty(HTMLElement.prototype, "style",{"configurable":true,"enumerable":true,
    "get": function style_get(){
        debugger;
        return CSSStyleDeclaration.createCSSStyleDog();
    },"set": function style_set(){debugger;},});


dogvm.safeproperty(HTMLElement);
var HTMLDivElement = function HTMLDivElement() { // 构造函数
    throw new TypeError("Illegal constructor");
};
dogvm.safefunction(HTMLDivElement);

Object.defineProperties(HTMLDivElement.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLDivElement",
        configurable: true
    }
});
////////// 浏览器代码自动生成部分
Object.defineProperty(HTMLDivElement.prototype, "align",{"configurable":true,"enumerable":true,"get": function align_get(){debugger; return ""},"set": function align_set(){debugger;},});
Object.setPrototypeOf(HTMLDivElement.prototype, HTMLElement.prototype);
////////

dogvm.safeproperty(HTMLDivElement);

// 用户创建div
dogvm.memory.htmlelements["div"] = function () {
    var div = new (function () {});
    div.__proto__ = HTMLDivElement.prototype;
    return div;
}


// HTMLHeadElement
var HTMLHeadElement = function HTMLHeadElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLHeadElement);

Object.defineProperty(HTMLHeadElement.prototype, Symbol.toStringTag,{"value":"HTMLHeadElement","writable":false,"enumerable":false,"configurable":true})
Object.setPrototypeOf(HTMLHeadElement.prototype, HTMLElement.prototype);


HTMLHeadElement.createHtmlHeadDog = function createHtmlHeadDog() {
    let instance = Object.create(HTMLHeadElement.prototype);
    return dogvm.proxy(instance);
};dogvm.safefunction(HTMLHeadElement.createHtmlHeadDog);


HTMLHeadElement.headDog = HTMLHeadElement.createHtmlHeadDog();



//////////////////////////////////

// HTMLBodyElement对象
var HTMLBodyElement = function HTMLBodyElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLBodyElement);

/////////////////////////////////
Object.defineProperty(HTMLBodyElement.prototype, Symbol.toStringTag,{"value":"HTMLBodyElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLBodyElement.prototype, "text",{"configurable":true,"enumerable":true,"get": function text_get(){; return ""},"set": function text_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "link",{"configurable":true,"enumerable":true,"get": function link_get(){; return ""},"set": function link_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "vLink",{"configurable":true,"enumerable":true,"get": function vLink_get(){; return ""},"set": function vLink_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "aLink",{"configurable":true,"enumerable":true,"get": function aLink_get(){; return ""},"set": function aLink_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "bgColor",{"configurable":true,"enumerable":true,"get": function bgColor_get(){; return ""},"set": function bgColor_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "background",{"configurable":true,"enumerable":true,"get": function background_get(){; return ""},"set": function background_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onblur",{"configurable":true,"enumerable":true,"get": function onblur_get(){; return "null"},"set": function onblur_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onerror",{"configurable":true,"enumerable":true,"get": function onerror_get(){; return "null"},"set": function onerror_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onfocus",{"configurable":true,"enumerable":true,"get": function onfocus_get(){; return "null"},"set": function onfocus_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onload",{"configurable":true,"enumerable":true,"get": function onload_get(){; return "null"},"set": function onload_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onresize",{"configurable":true,"enumerable":true,"get": function onresize_get(){; return 'function(){s["default"].tVerify()&&r["default"].setPopPosition(s["default"].tVerify(),i.loadingSize.width,i.loadingSize.height||0)}'},"set": function onresize_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onscroll",{"configurable":true,"enumerable":true,"get": function onscroll_get(){; return "null"},"set": function onscroll_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onafterprint",{"configurable":true,"enumerable":true,"get": function onafterprint_get(){; return "null"},"set": function onafterprint_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onbeforeprint",{"configurable":true,"enumerable":true,"get": function onbeforeprint_get(){; return "null"},"set": function onbeforeprint_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onbeforeunload",{"configurable":true,"enumerable":true,"get": function onbeforeunload_get(){; return "null"},"set": function onbeforeunload_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onhashchange",{"configurable":true,"enumerable":true,"get": function onhashchange_get(){; return "null"},"set": function onhashchange_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onlanguagechange",{"configurable":true,"enumerable":true,"get": function onlanguagechange_get(){; return "null"},"set": function onlanguagechange_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onmessage",{"configurable":true,"enumerable":true,"get": function onmessage_get(){; return "null"},"set": function onmessage_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onmessageerror",{"configurable":true,"enumerable":true,"get": function onmessageerror_get(){; return "null"},"set": function onmessageerror_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onoffline",{"configurable":true,"enumerable":true,"get": function onoffline_get(){; return "null"},"set": function onoffline_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "ononline",{"configurable":true,"enumerable":true,"get": function ononline_get(){; return "null"},"set": function ononline_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onpagehide",{"configurable":true,"enumerable":true,"get": function onpagehide_get(){; return "null"},"set": function onpagehide_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onpageshow",{"configurable":true,"enumerable":true,"get": function onpageshow_get(){; return "null"},"set": function onpageshow_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onpopstate",{"configurable":true,"enumerable":true,"get": function onpopstate_get(){; return "function(){for(var c=arguments.length,l=new Array(c),p=0;p<c;p++)l[p]=arguments[p];var b=e.location.href;if(g(t,b),d)return d.apply(this,l)}"},"set": function onpopstate_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onrejectionhandled",{"configurable":true,"enumerable":true,"get": function onrejectionhandled_get(){; return "null"},"set": function onrejectionhandled_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onstorage",{"configurable":true,"enumerable":true,"get": function onstorage_get(){; return "null"},"set": function onstorage_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onunhandledrejection",{"configurable":true,"enumerable":true,"get": function onunhandledrejection_get(){; return "null"},"set": function onunhandledrejection_set(){;},});
Object.defineProperty(HTMLBodyElement.prototype, "onunload",{"configurable":true,"enumerable":true,"get": function onunload_get(){; return "null"},"set": function onunload_set(){;},});
Object.setPrototypeOf(HTMLBodyElement.prototype, HTMLElement.prototype);
/////////////////////////////

dogvm.safeproperty(HTMLBodyElement);

HTMLBodyElement.createHtmlBodyDog = function createHtmlBodyDog() {
    let instance = Object.create(HTMLBodyElement.prototype);
    // 浏览器实例属性
    Object.defineProperty(instance, "_reactListeningxqzyu425lap",{"configurable":true,"enumerable":true,"writable":true,"value":true,});
    return dogvm.proxy(instance);
  };dogvm.safefunction(HTMLBodyElement.createHtmlBodyDog);
  
HTMLBodyElement.bodyDog = HTMLBodyElement.createHtmlBodyDog();
// HTMLHtmlElement对象
var HTMLHtmlElement = function HTMLHtmlElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLHtmlElement);
Object.defineProperty(HTMLHtmlElement.prototype, Symbol.toStringTag,{"value":"HTMLHtmlElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLHtmlElement.prototype, "version",{"configurable":true,"enumerable":true,"get": function version_get(){debugger; return ""},"set": function version_set(){debugger;},});
Object.setPrototypeOf(HTMLHtmlElement.prototype, HTMLElement.prototype);


HTMLHtmlElement.createHtmlElementDog = function createHtmlElementDog(){
    let html = Object.create(HTMLHtmlElement.prototype);
    return dogvm.proxy(html);
};dogvm.safefunction(HTMLHtmlElement.createHtmlElementDog);


dogvm.safeproperty(HTMLHtmlElement);
// HTMLCanvasElement
var HTMLCanvasElement = function HTMLCanvasElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLCanvasElement);

Object.defineProperties(HTMLCanvasElement.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLCanvasElement",
        configurable: true
    }
});

HTMLCanvasElement.prototype.__proto__ = HTMLElement.prototype;

// HTMLCanvasElement对象
Object.defineProperty(HTMLCanvasElement.prototype, Symbol.toStringTag,{"value":"HTMLCanvasElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLCanvasElement.prototype, "width",{"configurable":true,"enumerable":true,"get": function width_get(){},"set": function width_set(){},});
Object.defineProperty(HTMLCanvasElement.prototype, "height",{"configurable":true,"enumerable":true,"get": function height_get(){},"set": function height_set(){},});
Object.defineProperty(HTMLCanvasElement.prototype, "captureStream",{"configurable":true,"enumerable":true,"writable":true,"value": function captureStream(){debugger;},});dogvm.safefunction(HTMLCanvasElement.prototype.captureStream);
Object.defineProperty(HTMLCanvasElement.prototype, "toBlob",{"configurable":true,"enumerable":true,"writable":true,"value": function toBlob(){debugger;},});dogvm.safefunction(HTMLCanvasElement.prototype.toBlob);

Object.defineProperty(HTMLCanvasElement.prototype, "transferControlToOffscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function transferControlToOffscreen(){debugger;},});dogvm.safefunction(HTMLCanvasElement.prototype.transferControlToOffscreen);
Object.defineProperty(HTMLCanvasElement.prototype, "getContext",{"configurable":true,"enumerable":true,"writable":true,"value": function getContext(contextId){
    if(contextId == "webgl" || contextId == "experimental-webgl"){
        return WebGLRenderingContext.getWebDog();
    }
    if(contextId == "2d"){
        debugger;  
        // 建立一个 CanvasRenderingContext2D 二维渲染上下文。
        return CanvasRenderingContext2D.create2DDog();
    }
    if(contextId == "webgl2"|| contextId == "experimental-webgl2"){
        debugger;  
        // 创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本 2 (OpenGL ES 3.0) 的浏览器上可用。
    }
    if(contextId == "bitmaprenderer"){
        debugger;  
        // 创建一个只提供将 canvas 内容替换为指定ImageBitmap功能的ImageBitmapRenderingContext 。
    }
},}
);dogvm.safefunction(HTMLCanvasElement.prototype.getContext);


Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function toDataURL(){
        debugger;
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAAE7ZJREFUeF7tm3lcVWX+xz/ngl5REEbEjUkDF1wQSxQRU8tcksncdVwacwPMsaZlppeaTZNOttiUWbFqL63RH5lL5lLmzzVREbOQUnFfEJU0FpXtcs/v9RzuuR4uV8TA8Pn1uX+J95znfM/7+z1vvs9zHhTwQwIkQAKSEFAkiZNhViMBNQJqNQ4nzVBKHFjv0mTLeaBMoOQJ/DXhU1i/hhrPuRcIUFj3QhZ+4xgorN8YOC9XbQQorGpDKc9AFJY8uWKkZQmUF9akxR5wtWwE8JD9UEWdg9ioedrPUdG+sJp2Q1GfR2zUakyNW679f3zE2CrB1a+rqO9q4zp+ImNehtXU3n4dZ3Gqyooqx1Glm5Dj5N9CWBnwwkA8gwQsQwhO3xLMajyI4YjSvvdEPjbjvQqPrwphrmFVhd69cW5ZYUVFh8Bq2gxFXVBOUKqSpMnAUVjVdR93Iqybx35tj/OmwACLaziWTM6rrtD+v41zt4UlZNUD/0A26lYooGTcj5GIxErEapIS8noeI7Ebb8EX2dWOncKqdqS/+YA3heUggen74G0x4XUoaJZf4OF15ec/Btc258ev+eKlt0SH5e+X8la/fvEP7U4a1TztUN+zkZERGSL62PiYHKjKXNud5MBk7Y+Yack20W0C8BWAv9u+PwOTtQeKaufqXV0d83X07xeT0rhJ+tvxIfjMTsTWYUVERhzIyW78YOJnr/WEyTpy+sRpJxzjdHe/ujqx76Xx5Wg6dmXGjkzIusTln9o5ihoO/TvRQSrqGNtYsQAes3eXlUlXZMwwWE0j7J1f2fFK7z9mWgYq6mxLf0k4ZyfOddblGjtS/ReRaGKcdDJjMQUr0FW7mxa4YheGEMjnCMZyJFTmTrVj9LHCkYY0NMPi+h/ifOfzCDsKtMksO4w4VnzE+Cn+wO7WJiTDDy2tVzA+Lbvc8ZUO4hYHUlhVJVjz598UVmlRrxQSmDppmpui4BkoSIrrgndEmBEpaKkAcwsK3HOWLntnoKOwtAdSPCSqMsDe4YiHVVX+oz2U4iOmksA57XvxEVNPVTmnnWt7YH18TicMGzI/zKrif28lrMIC91YiBve62QfGjXvpZ1VBuh6nXbRieCtmfdgNV7Rr6UJwuJ79+s66y9L7mWKXii4bRR3udNpqzGfpuXPt4hPfledTygt1RwE3PrPHcvPYFzXhAxkVsjNyNspPTK8V9byta56kxTxpscdDrkdyxSU2YhEWog++Rgft3x4owDyEl/lZn7IZRVZR2S7CI3gKe3AYTTCh/ghM7BqN+qbr6JNWVlh5qINwzMAA/IhRTTdiZzug12Hg1cwpcPU/id5+W/HEfsBHi7R6PhRW9XCsyVFuCstW9EEdtj7ePSxxhlECeoBTk9HbYnF7bvOWiFBzrRuvGTusCROezzl5svOIXUlj/iQ6qogUvKAAD1++7P+gyVScU1RU55Uv17/4jhBd337xIQpw/OovzcYXFLj7NG50cuvliy3nbtk6OfZP4QvzGnhnFIprqsB2XUTaw241tRcdlgI0iU2IXtmsSfrWdm2/rffT4V7IzGxj7+ZEnIqCKFVFTHwIdmjxGx7q6ROnFYiuLL/Qo73oHLWO7PNX3xfC7tlr2fz2bXe3t1hq1b6c5TfS1bVo15qBp4dEpuDt/AKP0KysFqG1axWsbdLkeLHVirVlpGrskozrfgCGf+UbdfFSmzd3J42eKMQhxgPQ1sY2TwXmxHXBCV24emzeDc8fsFhqbVu+fP5fbsUuPT3s3Z27xi0fOnT+9418Th8TbGA1JcBkHRgxZdqfNV5d8Hcbl2fczjYalgUPdLeexqW0rtie2VMT1uZuBbjoVRpRHQvswhDdz14fT7y871/ad5VZZ/qgmye2ejXFw9cuoK45V5ORscPShfUctkDtdlAbd/g+aMI8bPZGeMgnCMgAupysvseDwqo+ljU1UjlhDXp8wQtNmx4bUeZhN0ZnW8Ny7LBGj55jPXeu44ikPSPNQUHfwMvzEpKTh6KgsB66BH+RGNRpm3n1mpldG3ide12IDiry/ifxX1eKi90eGTtm9mGraspb8vH7nSvTYekPoN71Xc66v+6aNTMH28L81ukalq276dN76fjWbZJmQUFubEL0e3XN1zcPGTI/vaTE9bqYZgphtQvY3e/a9QY/Ll8+fwhM1ikRU6b1VIDgw4d7fWAQg4vVik/swrrFGpwu7uzsxjn6NFYbT0UbvQPUjlHRBiVYcOZ8p43ZOY1b7d03XNxOztCh85d6eWW23vxNVGf9l4QjOxfX4iuxsXG+gR23NO8R9tnZdetfuJiZEdBk+pSIGULMolu9eLF1SbGlzrL09NC6J092wcPmQ5gQEo0iuGBB8j/gFnAEjTwv4JXk8+hZeBbfBAGXPYEhyUC9QmhTtn2tAdVSG8v2R+KD3C8rXBxf2t4b8048jQUN4pHV7uIthfVX81ewhBxCoxygX2qpsH5CMwzvVjoNFRKrrg+FVV0ka26cclPCAQMWxd7fIi1Q/41fLrQKhHU+o/2gnJxGE8PCEp9QrfjY3t0AmPCte3TqoUdH52Q3elkIS+tOFse0EVOipyY+u8lVKWm1fMW/29Vz/yXmdlNCXVgiNr1rUBTULi4217mQ2SYsK6v5GwciN+jraKW3YBPWuDEvJrh75A3Q7i8hukCsDfXsteyjFvelDdu2Y2KQv//+V9sF7O6dmdn68y/Xv/jP5r4/vTAwfOEIbYq6JHq3mJoFB69bHNx5wwOqikRnHVYd8/WHxDpc02bpF+1dom3KHRi49bkeYYkjynVnN9e2SoVbu6id3vG18v/uMWNX68jO7FrQYvXamUnFFrd/D37ize/37RvW8sjRHrOnTo66Umxxm772i5lh2b809oWt65sbEa6KaeBLQe8ix9OiSWlbgCs+8eyAdckT0LiwoNzCt1gg74+/wafpcUwKXII/4Ea5aZ6xVvQF9febLqxQWP3MB9EyZIu9m9LXtSYGJSDXjcKqOTXcm1cut+jeJfiLjODgjdYywjK+GVTUfc4W3cWU8PiJrmMLCuouEA+zEIjxloVMDn7/WHBlhbV7z6gOaT/2+cr+FtAwJTx3LnDIpk0zyr0NHLfNY0Lutab/qVPnWlYDrws7yqxh2aaEY8fOXOZR72pj7buPo1sKKQiJdOq0edL2HRO66MLKyfVZlpg4b5a/X8oKMYXVBLwkOl+sB/n7pcyyS9f4YgCAPqU78F24Z8qBwaPta1g2hjbZtS/TweqL6ibrFO0FBYDRWxp/eu1ag2FiSujiUpRn7LCcCWtP0uhFqT/2WT+gf/TlGzfq++1KGvOAmA5mZd3fc82amd561ym60nonmh2/5OqGEJxCwxtWTVg3zMC6rkC2ay3ssrbB42lFmJJ5THtzJ7YdOK5hZdUHNnSG08V0Ef/thCWOEXJSzIX26V/AydJ1LTFN9Ag6SGHdm86o0ajKbWsQ60LdQtacbNjw9AytQ9JlpS+W1y6qf6u3hGfPBYamHnq0df++cXtdXfPfjV8Sfdy+Z8tBdLfrsGwPvG+ZBXpF/TpialS+vugOfauFjtAmpV49/zu2Xbudfy3TxdimbN1DV9YL6rhl/7H0sNe37pjwqVjojoiMmHP9+h8WGoWlCWVxTE8vr8tRQwbPT6rlmv9hfHxcpHhj6O+XMv1WwhKhGN+wnj3X4cqmjc/W1l9KNL/v0Kj+/WKPKorlg/jFMd7aSwmXkuEocVkl3j5GTo3qXlxsfuDUqc6he/aOsHYNWf1SZTosTcAJcYv8W+4fE9Bmb5a7x5VhDbwuPHn4aFjezp0TRuhM8q55t05Le6RL/VQ/rcPa5tkM3yU/gXWFCdqie6K5I5aFuKFP3YPIs7jj+P5++DT35sva9KbA1sBS4I4L6XfSYelSG2d+Ek+HvIfAnDzkpd7c1rC3W+m2Bk4Ja9QP99zFy20cDVo4OtDb5+yeK1d93VNT+5UGbJtKiN/OFovbgl27/tyjxOL6qrNtDatWzw7o1GnzoFOnHoBYK4H+Rs1hKumsSxBrWoWFHjMf7r30uLf3yXn/XbFgSmi3VQ/dyK+P1B/6a5tCbWtCTWI/Wvxa1+6rfnCrk+enr5UB0KZT0yMn1xZrN0ePdW++fftT7vY1rUmLPdoGbk/29T3Sdv/+wcjNaaSNKaaV+fmes41TQr0Dcv/bm6s6B68fdj6jrbgfsa0hTEwhxTpXuSmhk/Tqa1gAjoiF74azZq8z8Lm57SMyZlh9j59Xde68AenpodcvZAb8RcisXftdW0JDVjW83ZRQE9aSmN5ijL6PJqT6+JxeqQKtAMyNi42bK0T2R98jSEkZtPej/DWhz2I03gl6DS6eOViaPA3bCztq0eubN/3qn9Y6rk6nShe+9TUs42J8RdXsrMNKyyy/z0p0cG9389GGOrwvXFvQ72A+jbUh4KL7PaeLmg/I6Z/m6OtCzrY1iAVf8XAUu8BLbHPQuxjbWy+Ih9L2kAbr00p9cVwcq5gg3vLZzxMI9EVnMa74WV8oFutDzr7T32Dq44rX/uK6Os6pyRhlMmFIZkbAG+s2PD8eFte5+kZSQ/eTK85x/NnZG0b9fmyL7jGjR72S6uV1ybPMovttcmmLqaudj2HRXY9XBeIVYKrOVL8/VYVZVfG+YsL5itjpWzjsbyBVXNCnxYZrzImNw3FdQF43ShfWkwLKL7L/4Ff6pvBMQ+CMz6/rdkRHpm9ZcNyHpSNzPEbEpl+b2xpqXhL3UgS3/FtCgww89ICN2wyMEhJiMQpLHO/w2h76w+14nqOwxENn7EpcS/CGvjHUFofWqegxGadfdrD6g7okpjeA9mIaaXwr5+Qc+5i6sPQ1LCiqtpte3M/VX5oNEtswGjU8k+BSq7Cx44uFO0mskY+qokgISUzBbWJ5Uoxl+/9EIV8VOABgbWWEpY9RZluIIScdz+BxISr/y8APzUundr5XoXU12XVL78LFWvGUr7L36kxYzoSkC7Q6r+0YI98SVjZr9+5xv4s/ftYE5YJpriWItm8krUxOHHaI61POiKcnNwIwpyrCqszl79Yxd/tPc+5W3FUdl8KqKsGaP/93ISzRcSgm3GffhHoH3PVuzLiR1jhNvSMB3sF17+ahFNbdpMux7yaB34WwqgrQuNdLG8uwNlTVsWvifAqrJqjzmtVBgMKqDoqSjUFhSZYwhmsnQGGxGEiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQh8H+NkcUPVYUE9AAAAABJRU5ErkJggg==";
    },});dogvm.safefunction(HTMLCanvasElement.prototype.toDataURL);



dogvm.safeproperty(HTMLCanvasElement);


// 创建canvas
dogvm.memory.htmlelements["canvas"] = function () {
    var canvas = new (function () {});
    canvas.__proto__ = HTMLCanvasElement.prototype;
    return canvas;
}
// HTMLIFrameElement
var HTMLIFrameElement = function HTMLIFrameElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLIFrameElement);

Object.defineProperty(HTMLIFrameElement.prototype, Symbol.toStringTag,{"value":"HTMLIFrameElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLIFrameElement.prototype, "src",{"configurable":true,"enumerable":true,"get": function src_get(){debugger; return ""},"set": function src_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "srcdoc",{"configurable":true,"enumerable":true,"get": function srcdoc_get(){debugger; return ""},"set": function srcdoc_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "name",{"configurable":true,"enumerable":true,"get": function name_get(){debugger; return ""},"set": function name_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "sandbox",{"configurable":true,"enumerable":true,"get": function sandbox_get(){debugger; return ""},"set": function sandbox_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "allowFullscreen",{"configurable":true,"enumerable":true,"get": function allowFullscreen_get(){debugger; return "false"},"set": function allowFullscreen_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "width",{"configurable":true,"enumerable":true,"get": function width_get(){debugger; return ""},"set": function width_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "height",{"configurable":true,"enumerable":true,"get": function height_get(){debugger; return ""},"set": function height_set(){debugger;},});


Object.defineProperty(HTMLIFrameElement.prototype, "referrerPolicy",{"configurable":true,"enumerable":true,"get": function referrerPolicy_get(){debugger; return ""},"set": function referrerPolicy_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "csp",{"configurable":true,"enumerable":true,"get": function csp_get(){debugger; return ""},"set": function csp_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "allow",{"configurable":true,"enumerable":true,"get": function allow_get(){debugger; return ""},"set": function allow_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "featurePolicy",{"configurable":true,"enumerable":true,"get": function featurePolicy_get(){debugger; return "[object FeaturePolicy]"},set:undefined, });
Object.defineProperty(HTMLIFrameElement.prototype, "loading",{"configurable":true,"enumerable":true,"get": function loading_get(){debugger; return "auto"},"set": function loading_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "align",{"configurable":true,"enumerable":true,"get": function align_get(){debugger; return ""},"set": function align_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "scrolling",{"configurable":true,"enumerable":true,"get": function scrolling_get(){debugger; return ""},"set": function scrolling_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "frameBorder",{"configurable":true,"enumerable":true,"get": function frameBorder_get(){debugger; return ""},"set": function frameBorder_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "longDesc",{"configurable":true,"enumerable":true,"get": function longDesc_get(){debugger; return ""},"set": function longDesc_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "marginHeight",{"configurable":true,"enumerable":true,"get": function marginHeight_get(){debugger; return ""},"set": function marginHeight_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "marginWidth",{"configurable":true,"enumerable":true,"get": function marginWidth_get(){debugger; return ""},"set": function marginWidth_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "getSVGDocument",{"configurable":true,"enumerable":true,"writable":true,"value": function getSVGDocument(){debugger;},});dogvm.safefunction(HTMLIFrameElement.prototype.getSVGDocument);
Object.defineProperty(HTMLIFrameElement.prototype, "credentialless",{"configurable":true,"enumerable":true,"get": function credentialless_get(){debugger; return "false"},"set": function credentialless_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "allowPaymentRequest",{"configurable":true,"enumerable":true,"get": function allowPaymentRequest_get(){debugger; return "false"},"set": function allowPaymentRequest_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "privateToken",{"configurable":true,"enumerable":true,"get": function privateToken_get(){debugger; return ""},"set": function privateToken_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "browsingTopics",{"configurable":true,"enumerable":true,"get": function browsingTopics_get(){debugger; return "false"},"set": function browsingTopics_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "adAuctionHeaders",{"configurable":true,"enumerable":true,"get": function adAuctionHeaders_get(){debugger; return "false"},"set": function adAuctionHeaders_set(){debugger;},});
Object.defineProperty(HTMLIFrameElement.prototype, "sharedStorageWritable",{"configurable":true,"enumerable":true,"get": function sharedStorageWritable_get(){debugger; return "false"},"set": function sharedStorageWritable_set(){debugger;},});
Object.setPrototypeOf(HTMLIFrameElement.prototype, HTMLElement.prototype);


Object.defineProperty(HTMLIFrameElement.prototype, "contentWindow",{"configurable":true,"enumerable":true,
    "get": function contentWindow_get(){
        debugger;
        if(this.parentNode){
            return (window[0]=window,window);
        }
        return "null";
    },set:undefined, });
Object.defineProperty(HTMLIFrameElement.prototype, "contentDocument",{"configurable":true,"enumerable":true,
    "get": function contentDocument_get(){
        debugger; return "null"
    },set:undefined, });


// 创建iframe
dogvm.memory.htmlelements["iframe"] = function () {
    var iframe = new (function () {});
    iframe.__proto__ = HTMLIFrameElement.prototype;
    return iframe;
}
// HTMLParagraphElement
var HTMLParagraphElement = function HTMLParagraphElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLParagraphElement);
Object.defineProperty(HTMLParagraphElement.prototype, Symbol.toStringTag,{"value":"HTMLParagraphElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLParagraphElement.prototype, "align",{"configurable":true,"enumerable":true,"get": function align_get(){debugger; return ""},"set": function align_set(){debugger;},});
Object.setPrototypeOf(HTMLParagraphElement.prototype, HTMLElement.prototype);


// 创建p
dogvm.memory.htmlelements["p"] = function () {
    var p = new (function () {});
    p.__proto__ = HTMLParagraphElement.prototype;
    return p;
}
// HTMLSpanElement
var HTMLSpanElement = function HTMLSpanElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLSpanElement);

Object.defineProperty(HTMLSpanElement.prototype, Symbol.toStringTag,{"value":"HTMLSpanElement","writable":false,"enumerable":false,"configurable":true})
Object.setPrototypeOf(HTMLSpanElement.prototype, HTMLElement.prototype);

// 创建span
dogvm.memory.htmlelements["span"] = function () {
    var span = new (function () {});
    span.__proto__ = HTMLSpanElement.prototype;
    return span;
}
// HTMLStyleElement对象
var HTMLStyleElement = function HTMLStyleElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLStyleElement);

Object.defineProperty(HTMLStyleElement.prototype, Symbol.toStringTag,{"value":"HTMLStyleElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLStyleElement.prototype, "disabled",{"configurable":true,"enumerable":true,"get": function disabled_get(){debugger; return "false"},"set": function disabled_set(){debugger;},});
Object.defineProperty(HTMLStyleElement.prototype, "media",{"configurable":true,"enumerable":true,"get": function media_get(){debugger; return ""},"set": function media_set(){debugger;},});
Object.defineProperty(HTMLStyleElement.prototype, "type",{"configurable":true,"enumerable":true,"get": function type_get(){debugger; return ""},"set": function type_set(){debugger;},});

Object.defineProperty(HTMLStyleElement.prototype, "blocking",{"configurable":true,"enumerable":true,"get": function blocking_get(){debugger; return ""},"set": function blocking_set(){debugger;},});
Object.setPrototypeOf(HTMLStyleElement.prototype, HTMLElement.prototype);


Object.defineProperty(HTMLStyleElement.prototype, "sheet",{"configurable":true,"enumerable":true,
    "get": function sheet_get(){
        debugger;
        // 从 dogvm 的内存中获取该节点的父节点
        for (const [key, value] of dogvm.memory.htmlNode) {
            if (value.includes(this)) {
                // 该元素是子节点
                return new CSSStyleSheet(this._innerHtml);
            }
        }
        return "null";
    },set:undefined, });


// 创建HTMLStyleElement
dogvm.memory.htmlelements["style"] = function () {
    var style = new (function () {});
    style.__proto__ = HTMLStyleElement.prototype;
    return style;
}
// HTMLHeadingElement
var HTMLHeadingElement = function HTMLHeadingElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLHeadingElement);
Object.defineProperty(HTMLHeadingElement.prototype, Symbol.toStringTag,{"value":"HTMLHeadingElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLHeadingElement.prototype, "align",{"configurable":true,"enumerable":true,"get": function align_get(){},"set": function align_set(){debugger;},});
Object.setPrototypeOf(HTMLHeadingElement.prototype, HTMLElement.prototype);

// 创建HTMLHeadingElement
dogvm.memory.htmlelements["h"] = function () {
    var h = new (function () {});
    h.__proto__ = HTMLHeadingElement.prototype;
    return h;
}

// HTMLMediaElement对象
var HTMLMediaElement = function HTMLMediaElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLMediaElement);
Object.defineProperty(HTMLMediaElement, "NETWORK_EMPTY",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(HTMLMediaElement, "NETWORK_IDLE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(HTMLMediaElement, "NETWORK_LOADING",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(HTMLMediaElement, "NETWORK_NO_SOURCE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(HTMLMediaElement, "HAVE_NOTHING",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(HTMLMediaElement, "HAVE_METADATA",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(HTMLMediaElement, "HAVE_CURRENT_DATA",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(HTMLMediaElement, "HAVE_FUTURE_DATA",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(HTMLMediaElement, "HAVE_ENOUGH_DATA",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(HTMLMediaElement.prototype, Symbol.toStringTag,{"value":"HTMLMediaElement","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(HTMLMediaElement.prototype, "error",{"configurable":true,"enumerable":true,"get": function error_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "src",{"configurable":true,"enumerable":true,"get": function src_get(){},"set": function src_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "currentSrc",{"configurable":true,"enumerable":true,"get": function currentSrc_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "crossOrigin",{"configurable":true,"enumerable":true,"get": function crossOrigin_get(){},"set": function crossOrigin_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "networkState",{"configurable":true,"enumerable":true,"get": function networkState_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "preload",{"configurable":true,"enumerable":true,"get": function preload_get(){},"set": function preload_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "buffered",{"configurable":true,"enumerable":true,"get": function buffered_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "readyState",{"configurable":true,"enumerable":true,"get": function readyState_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "seeking",{"configurable":true,"enumerable":true,"get": function seeking_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "currentTime",{"configurable":true,"enumerable":true,"get": function currentTime_get(){},"set": function currentTime_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "duration",{"configurable":true,"enumerable":true,"get": function duration_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "paused",{"configurable":true,"enumerable":true,"get": function paused_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "defaultPlaybackRate",{"configurable":true,"enumerable":true,"get": function defaultPlaybackRate_get(){},"set": function defaultPlaybackRate_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "playbackRate",{"configurable":true,"enumerable":true,"get": function playbackRate_get(){},"set": function playbackRate_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "played",{"configurable":true,"enumerable":true,"get": function played_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "seekable",{"configurable":true,"enumerable":true,"get": function seekable_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "ended",{"configurable":true,"enumerable":true,"get": function ended_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "autoplay",{"configurable":true,"enumerable":true,"get": function autoplay_get(){},"set": function autoplay_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "loop",{"configurable":true,"enumerable":true,"get": function loop_get(){},"set": function loop_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "preservesPitch",{"configurable":true,"enumerable":true,"get": function preservesPitch_get(){},"set": function preservesPitch_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "controls",{"configurable":true,"enumerable":true,"get": function controls_get(){},"set": function controls_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "controlsList",{"configurable":true,"enumerable":true,"get": function controlsList_get(){},"set": function controlsList_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "volume",{"configurable":true,"enumerable":true,"get": function volume_get(){},"set": function volume_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "muted",{"configurable":true,"enumerable":true,"get": function muted_get(){},"set": function muted_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "defaultMuted",{"configurable":true,"enumerable":true,"get": function defaultMuted_get(){},"set": function defaultMuted_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "textTracks",{"configurable":true,"enumerable":true,"get": function textTracks_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "webkitAudioDecodedByteCount",{"configurable":true,"enumerable":true,"get": function webkitAudioDecodedByteCount_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "webkitVideoDecodedByteCount",{"configurable":true,"enumerable":true,"get": function webkitVideoDecodedByteCount_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "onencrypted",{"configurable":true,"enumerable":true,"get": function onencrypted_get(){},"set": function onencrypted_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "onwaitingforkey",{"configurable":true,"enumerable":true,"get": function onwaitingforkey_get(){},"set": function onwaitingforkey_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "srcObject",{"configurable":true,"enumerable":true,"get": function srcObject_get(){},"set": function srcObject_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "NETWORK_EMPTY",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(HTMLMediaElement.prototype, "NETWORK_IDLE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(HTMLMediaElement.prototype, "NETWORK_LOADING",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(HTMLMediaElement.prototype, "NETWORK_NO_SOURCE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(HTMLMediaElement.prototype, "HAVE_NOTHING",{"configurable":false,"enumerable":true,"writable":false,"value":0,});
Object.defineProperty(HTMLMediaElement.prototype, "HAVE_METADATA",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(HTMLMediaElement.prototype, "HAVE_CURRENT_DATA",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(HTMLMediaElement.prototype, "HAVE_FUTURE_DATA",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(HTMLMediaElement.prototype, "HAVE_ENOUGH_DATA",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(HTMLMediaElement.prototype, "addTextTrack",{"configurable":true,"enumerable":true,"writable":true,"value": function addTextTrack(){debugger;},});dogvm.safefunction(HTMLMediaElement.prototype.addTextTrack);
Object.defineProperty(HTMLMediaElement.prototype, "canPlayType",{"configurable":true,"enumerable":true,"writable":true,"value": function canPlayType(){debugger;},});dogvm.safefunction(HTMLMediaElement.prototype.canPlayType);
Object.defineProperty(HTMLMediaElement.prototype, "captureStream",{"configurable":true,"enumerable":true,"writable":true,"value": function captureStream(){debugger;},});dogvm.safefunction(HTMLMediaElement.prototype.captureStream);
Object.defineProperty(HTMLMediaElement.prototype, "load",{"configurable":true,"enumerable":true,"writable":true,"value": function load(){debugger;},});dogvm.safefunction(HTMLMediaElement.prototype.load);
Object.defineProperty(HTMLMediaElement.prototype, "pause",{"configurable":true,"enumerable":true,"writable":true,"value": function pause(){debugger;},});dogvm.safefunction(HTMLMediaElement.prototype.pause);
Object.defineProperty(HTMLMediaElement.prototype, "play",{"configurable":true,"enumerable":true,"writable":true,"value": function play(){debugger;},});dogvm.safefunction(HTMLMediaElement.prototype.play);
Object.defineProperty(HTMLMediaElement.prototype, "sinkId",{"configurable":true,"enumerable":true,"get": function sinkId_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "remote",{"configurable":true,"enumerable":true,"get": function remote_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "disableRemotePlayback",{"configurable":true,"enumerable":true,"get": function disableRemotePlayback_get(){},"set": function disableRemotePlayback_set(){debugger;},});
Object.defineProperty(HTMLMediaElement.prototype, "setSinkId",{"configurable":true,"enumerable":true,"writable":true,"value": function setSinkId(){debugger;},});dogvm.safefunction(HTMLMediaElement.prototype.setSinkId);
Object.defineProperty(HTMLMediaElement.prototype, "mediaKeys",{"configurable":true,"enumerable":true,"get": function mediaKeys_get(){},set:undefined, });
Object.defineProperty(HTMLMediaElement.prototype, "setMediaKeys",{"configurable":true,"enumerable":true,"writable":true,"value": function setMediaKeys(){debugger;},});dogvm.safefunction(HTMLMediaElement.prototype.setMediaKeys);
Object.setPrototypeOf(HTMLMediaElement.prototype, HTMLElement.prototype);



dogvm.safeproperty(HTMLMediaElement);
// HTMLVideoElement对象
var HTMLVideoElement = function HTMLVideoElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLVideoElement);
Object.defineProperty(HTMLVideoElement.prototype, Symbol.toStringTag,{"value":"HTMLVideoElement","writable":false,"enumerable":false,"configurable":true})

Object.defineProperty(HTMLVideoElement.prototype, "width",{"configurable":true,"enumerable":true,"get": function width_get(){ return 160},"set": function width_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "height",{"configurable":true,"enumerable":true,"get": function height_get(){ return 120},"set": function height_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "videoWidth",{"configurable":true,"enumerable":true,"get": function videoWidth_get(){ return 0},set:undefined, });
Object.defineProperty(HTMLVideoElement.prototype, "videoHeight",{"configurable":true,"enumerable":true,"get": function videoHeight_get(){ return 0},set:undefined, });
Object.defineProperty(HTMLVideoElement.prototype, "poster",{"configurable":true,"enumerable":true,"get": function poster_get(){ return ""},"set": function poster_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "webkitDecodedFrameCount",{"configurable":true,"enumerable":true,"get": function webkitDecodedFrameCount_get(){ return "0"},set:undefined, });
Object.defineProperty(HTMLVideoElement.prototype, "webkitDroppedFrameCount",{"configurable":true,"enumerable":true,"get": function webkitDroppedFrameCount_get(){ return "0"},set:undefined, });
Object.defineProperty(HTMLVideoElement.prototype, "playsInline",{"configurable":true,"enumerable":true,"get": function playsInline_get(){ return "false"},"set": function playsInline_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "onenterpictureinpicture",{"configurable":true,"enumerable":true,"get": function onenterpictureinpicture_get(){ return "null"},"set": function onenterpictureinpicture_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "onleavepictureinpicture",{"configurable":true,"enumerable":true,"get": function onleavepictureinpicture_get(){ return "null"},"set": function onleavepictureinpicture_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "disablePictureInPicture",{"configurable":true,"enumerable":true,"get": function disablePictureInPicture_get(){ return "false"},"set": function disablePictureInPicture_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "cancelVideoFrameCallback",{"configurable":true,"enumerable":true,"writable":true,"value": function cancelVideoFrameCallback(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.cancelVideoFrameCallback);
Object.defineProperty(HTMLVideoElement.prototype, "getVideoPlaybackQuality",{"configurable":true,"enumerable":true,"writable":true,"value": function getVideoPlaybackQuality(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.getVideoPlaybackQuality);
Object.defineProperty(HTMLVideoElement.prototype, "requestPictureInPicture",{"configurable":true,"enumerable":true,"writable":true,"value": function requestPictureInPicture(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.requestPictureInPicture);
Object.defineProperty(HTMLVideoElement.prototype, "requestVideoFrameCallback",{"configurable":true,"enumerable":true,"writable":true,"value": function requestVideoFrameCallback(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.requestVideoFrameCallback);
Object.defineProperty(HTMLVideoElement.prototype, "msVideoProcessing",{"configurable":true,"enumerable":true,"get": function msVideoProcessing_get(){ return "default"},"set": function msVideoProcessing_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "msGetVideoProcessingTypes",{"configurable":true,"enumerable":true,"writable":true,"value": function msGetVideoProcessingTypes(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.msGetVideoProcessingTypes);
Object.setPrototypeOf(HTMLVideoElement.prototype, HTMLMediaElement.prototype);



dogvm.safeproperty(HTMLVideoElement);



// 创建HTMLMediaElement
dogvm.memory.htmlelements["video"] = function () {
    var media = new (function () {});
    media.__proto__ = HTMLVideoElement.prototype;
    return media;
}

// 从浏览器中知道Document是全局的，new Document会返回一个对象

// Document
var Document = function Document(){};
dogvm.safefunction(Document);
Object.defineProperties(Document.prototype, {
    [Symbol.toStringTag]: {
        value: "Document",
        configurable: true
    }
});
Document.prototype.__proto__ = Node.prototype;

//////////////////////////
Object.defineProperty(Document, "parseHTMLUnsafe",{"configurable":true,"enumerable":true,"writable":true,"value": function parseHTMLUnsafe(){debugger;},});dogvm.safefunction(Document.parseHTMLUnsafe);
Object.defineProperty(Document.prototype, Symbol.toStringTag,{"value":"Document","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Document.prototype, "implementation",{"configurable":true,"enumerable":true,"get": function implementation_get(){debugger;return "[object DOMImplementation]"},set:undefined, });
Object.defineProperty(Document.prototype, "URL",{"configurable":true,"enumerable":true,"get": function URL_get(){debugger;return "https://turing.captcha.gtimg.com/1/template/drag_ele.html"},set:undefined, });
Object.defineProperty(Document.prototype, "documentURI",{"configurable":true,"enumerable":true,"get": function documentURI_get(){debugger;return "https://turing.captcha.gtimg.com/1/template/drag_ele.html"},set:undefined, });
Object.defineProperty(Document.prototype, "compatMode",{"configurable":true,"enumerable":true,"get": function compatMode_get(){debugger;return "CSS1Compat"},set:undefined, });
Object.defineProperty(Document.prototype, "characterSet",{"configurable":true,"enumerable":true,"get": function characterSet_get(){debugger;return "UTF-8"},set:undefined, });
Object.defineProperty(Document.prototype, "charset",{"configurable":true,"enumerable":true,"get": function charset_get(){debugger;return "UTF-8"},set:undefined, });
Object.defineProperty(Document.prototype, "inputEncoding",{"configurable":true,"enumerable":true,"get": function inputEncoding_get(){debugger;return "UTF-8"},set:undefined, });
Object.defineProperty(Document.prototype, "contentType",{"configurable":true,"enumerable":true,"get": function contentType_get(){debugger;return "text/html"},set:undefined, });
Object.defineProperty(Document.prototype, "doctype",{"configurable":true,"enumerable":true,"get": function doctype_get(){debugger;return "[object DocumentType]"},set:undefined, });
Object.defineProperty(Document.prototype, "xmlEncoding",{"configurable":true,"enumerable":true,"get": function xmlEncoding_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "xmlVersion",{"configurable":true,"enumerable":true,"get": function xmlVersion_get(){debugger;return "null"},"set": function xmlVersion_set(){debugger;},});
Object.defineProperty(Document.prototype, "xmlStandalone",{"configurable":true,"enumerable":true,"get": function xmlStandalone_get(){debugger;return "false"},"set": function xmlStandalone_set(){debugger;},});
Object.defineProperty(Document.prototype, "domain",{"configurable":true,"enumerable":true,"get": function domain_get(){debugger;return "turing.captcha.gtimg.com"},"set": function domain_set(){debugger;},});
Object.defineProperty(Document.prototype, "referrer",{"configurable":true,"enumerable":true,"get": function referrer_get(){debugger;return "https://pintia.cn/"},set:undefined, });
Object.defineProperty(Document.prototype, "lastModified",{"configurable":true,"enumerable":true,"get": function lastModified_get(){debugger;return "12/31/2024 14:47:24"},set:undefined, });
Object.defineProperty(Document.prototype, "readyState",{"configurable":true,"enumerable":true,"get": function readyState_get(){debugger;return "complete"},set:undefined, });
Object.defineProperty(Document.prototype, "title",{"configurable":true,"enumerable":true,"get": function title_get(){debugger;return "验证码"},"set": function title_set(){debugger;},});
Object.defineProperty(Document.prototype, "dir",{"configurable":true,"enumerable":true,"get": function dir_get(){debugger;return ""},"set": function dir_set(){debugger;},});
Object.defineProperty(Document.prototype, "images",{"configurable":true,"enumerable":true,"get": function images_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "embeds",{"configurable":true,"enumerable":true,"get": function embeds_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "plugins",{"configurable":true,"enumerable":true,"get": function plugins_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "links",{"configurable":true,"enumerable":true,"get": function links_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "forms",{"configurable":true,"enumerable":true,"get": function forms_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "scripts",{"configurable":true,"enumerable":true,"get": function scripts_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "currentScript",{"configurable":true,"enumerable":true,"get": function currentScript_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "defaultView",{"configurable":true,"enumerable":true,"get": function defaultView_get(){debugger;return "[object Window]"},set:undefined, });
Object.defineProperty(Document.prototype, "designMode",{"configurable":true,"enumerable":true,"get": function designMode_get(){debugger;return "off"},"set": function designMode_set(){debugger;},});
Object.defineProperty(Document.prototype, "onreadystatechange",{"configurable":true,"enumerable":true,"get": function onreadystatechange_get(){debugger;return "null"},"set": function onreadystatechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "anchors",{"configurable":true,"enumerable":true,"get": function anchors_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "applets",{"configurable":true,"enumerable":true,"get": function applets_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "fgColor",{"configurable":true,"enumerable":true,"get": function fgColor_get(){debugger;return ""},"set": function fgColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "linkColor",{"configurable":true,"enumerable":true,"get": function linkColor_get(){debugger;return ""},"set": function linkColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "vlinkColor",{"configurable":true,"enumerable":true,"get": function vlinkColor_get(){debugger;return ""},"set": function vlinkColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "alinkColor",{"configurable":true,"enumerable":true,"get": function alinkColor_get(){debugger;return ""},"set": function alinkColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "bgColor",{"configurable":true,"enumerable":true,"get": function bgColor_get(){debugger;return ""},"set": function bgColor_set(){debugger;},});
Object.defineProperty(Document.prototype, "all",{"configurable":true,"enumerable":true,"get": function all_get(){debugger;return "[object HTMLAllCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "scrollingElement",{"configurable":true,"enumerable":true,"get": function scrollingElement_get(){debugger;return "[object HTMLHtmlElement]"},set:undefined, });
Object.defineProperty(Document.prototype, "onpointerlockchange",{"configurable":true,"enumerable":true,"get": function onpointerlockchange_get(){debugger;return "null"},"set": function onpointerlockchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerlockerror",{"configurable":true,"enumerable":true,"get": function onpointerlockerror_get(){debugger;return "null"},"set": function onpointerlockerror_set(){debugger;},});
Object.defineProperty(Document.prototype, "hidden",{"configurable":true,"enumerable":true,"get": function hidden_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "visibilityState",{"configurable":true,"enumerable":true,"get": function visibilityState_get(){debugger;return "visible"},set:undefined, });
Object.defineProperty(Document.prototype, "wasDiscarded",{"configurable":true,"enumerable":true,"get": function wasDiscarded_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "prerendering",{"configurable":true,"enumerable":true,"get": function prerendering_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "featurePolicy",{"configurable":true,"enumerable":true,"get": function featurePolicy_get(){debugger;return "[object FeaturePolicy]"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitVisibilityState",{"configurable":true,"enumerable":true,"get": function webkitVisibilityState_get(){debugger;return "visible"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitHidden",{"configurable":true,"enumerable":true,"get": function webkitHidden_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "onbeforecopy",{"configurable":true,"enumerable":true,"get": function onbeforecopy_get(){debugger;return "null"},"set": function onbeforecopy_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforecut",{"configurable":true,"enumerable":true,"get": function onbeforecut_get(){debugger;return "null"},"set": function onbeforecut_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforepaste",{"configurable":true,"enumerable":true,"get": function onbeforepaste_get(){debugger;return "null"},"set": function onbeforepaste_set(){debugger;},});
Object.defineProperty(Document.prototype, "onfreeze",{"configurable":true,"enumerable":true,"get": function onfreeze_get(){debugger;return "null"},"set": function onfreeze_set(){debugger;},});
Object.defineProperty(Document.prototype, "onprerenderingchange",{"configurable":true,"enumerable":true,"get": function onprerenderingchange_get(){debugger;return "null"},"set": function onprerenderingchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onresume",{"configurable":true,"enumerable":true,"get": function onresume_get(){debugger;return "null"},"set": function onresume_set(){debugger;},});
Object.defineProperty(Document.prototype, "onsearch",{"configurable":true,"enumerable":true,"get": function onsearch_get(){debugger;return "null"},"set": function onsearch_set(){debugger;},});
Object.defineProperty(Document.prototype, "onvisibilitychange",{"configurable":true,"enumerable":true,"get": function onvisibilitychange_get(){debugger;return "null"},"set": function onvisibilitychange_set(){debugger;},});
Object.defineProperty(Document.prototype, "timeline",{"configurable":true,"enumerable":true,"get": function timeline_get(){debugger;return "[object DocumentTimeline]"},set:undefined, });
Object.defineProperty(Document.prototype, "fullscreenEnabled",{"configurable":true,"enumerable":true,"get": function fullscreenEnabled_get(){debugger;return "false"},"set": function fullscreenEnabled_set(){debugger;},});
Object.defineProperty(Document.prototype, "fullscreen",{"configurable":true,"enumerable":true,"get": function fullscreen_get(){debugger;return "false"},"set": function fullscreen_set(){debugger;},});
Object.defineProperty(Document.prototype, "onfullscreenchange",{"configurable":true,"enumerable":true,"get": function onfullscreenchange_get(){debugger;return "null"},"set": function onfullscreenchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onfullscreenerror",{"configurable":true,"enumerable":true,"get": function onfullscreenerror_get(){debugger;return "null"},"set": function onfullscreenerror_set(){debugger;},});
Object.defineProperty(Document.prototype, "webkitIsFullScreen",{"configurable":true,"enumerable":true,"get": function webkitIsFullScreen_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitCurrentFullScreenElement",{"configurable":true,"enumerable":true,"get": function webkitCurrentFullScreenElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitFullscreenEnabled",{"configurable":true,"enumerable":true,"get": function webkitFullscreenEnabled_get(){debugger;return "false"},set:undefined, });
Object.defineProperty(Document.prototype, "webkitFullscreenElement",{"configurable":true,"enumerable":true,"get": function webkitFullscreenElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "onwebkitfullscreenchange",{"configurable":true,"enumerable":true,"get": function onwebkitfullscreenchange_get(){debugger;return "null"},"set": function onwebkitfullscreenchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkitfullscreenerror",{"configurable":true,"enumerable":true,"get": function onwebkitfullscreenerror_get(){debugger;return "null"},"set": function onwebkitfullscreenerror_set(){debugger;},});
Object.defineProperty(Document.prototype, "rootElement",{"configurable":true,"enumerable":true,"get": function rootElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "pictureInPictureEnabled",{"configurable":true,"enumerable":true,"get": function pictureInPictureEnabled_get(){debugger;return "true"},set:undefined, });
Object.defineProperty(Document.prototype, "onbeforexrselect",{"configurable":true,"enumerable":true,"get": function onbeforexrselect_get(){debugger;return "null"},"set": function onbeforexrselect_set(){debugger;},});
Object.defineProperty(Document.prototype, "onabort",{"configurable":true,"enumerable":true,"get": function onabort_get(){debugger;return "null"},"set": function onabort_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforeinput",{"configurable":true,"enumerable":true,"get": function onbeforeinput_get(){debugger;return "null"},"set": function onbeforeinput_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforematch",{"configurable":true,"enumerable":true,"get": function onbeforematch_get(){debugger;return "null"},"set": function onbeforematch_set(){debugger;},});
Object.defineProperty(Document.prototype, "onbeforetoggle",{"configurable":true,"enumerable":true,"get": function onbeforetoggle_get(){debugger;return "null"},"set": function onbeforetoggle_set(){debugger;},});
Object.defineProperty(Document.prototype, "onblur",{"configurable":true,"enumerable":true,"get": function onblur_get(){debugger;return "null"},"set": function onblur_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncancel",{"configurable":true,"enumerable":true,"get": function oncancel_get(){debugger;return "null"},"set": function oncancel_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncanplay",{"configurable":true,"enumerable":true,"get": function oncanplay_get(){debugger;return "null"},"set": function oncanplay_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncanplaythrough",{"configurable":true,"enumerable":true,"get": function oncanplaythrough_get(){debugger;return "null"},"set": function oncanplaythrough_set(){debugger;},});
Object.defineProperty(Document.prototype, "onchange",{"configurable":true,"enumerable":true,"get": function onchange_get(){debugger;return "null"},"set": function onchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onclick",{"configurable":true,"enumerable":true,"get": function onclick_get(){debugger;return "null"},"set": function onclick_set(){debugger;},});
Object.defineProperty(Document.prototype, "onclose",{"configurable":true,"enumerable":true,"get": function onclose_get(){debugger;return "null"},"set": function onclose_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncontentvisibilityautostatechange",{"configurable":true,"enumerable":true,"get": function oncontentvisibilityautostatechange_get(){debugger;return "null"},"set": function oncontentvisibilityautostatechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncontextlost",{"configurable":true,"enumerable":true,"get": function oncontextlost_get(){debugger;return "null"},"set": function oncontextlost_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncontextmenu",{"configurable":true,"enumerable":true,"get": function oncontextmenu_get(){debugger;return "null"},"set": function oncontextmenu_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncontextrestored",{"configurable":true,"enumerable":true,"get": function oncontextrestored_get(){debugger;return "null"},"set": function oncontextrestored_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncuechange",{"configurable":true,"enumerable":true,"get": function oncuechange_get(){debugger;return "null"},"set": function oncuechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondblclick",{"configurable":true,"enumerable":true,"get": function ondblclick_get(){debugger;return "null"},"set": function ondblclick_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondrag",{"configurable":true,"enumerable":true,"get": function ondrag_get(){debugger;return "null"},"set": function ondrag_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragend",{"configurable":true,"enumerable":true,"get": function ondragend_get(){debugger;return "null"},"set": function ondragend_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragenter",{"configurable":true,"enumerable":true,"get": function ondragenter_get(){debugger;return "null"},"set": function ondragenter_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragleave",{"configurable":true,"enumerable":true,"get": function ondragleave_get(){debugger;return "null"},"set": function ondragleave_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragover",{"configurable":true,"enumerable":true,"get": function ondragover_get(){debugger;return "null"},"set": function ondragover_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondragstart",{"configurable":true,"enumerable":true,"get": function ondragstart_get(){debugger;return "null"},"set": function ondragstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondrop",{"configurable":true,"enumerable":true,"get": function ondrop_get(){debugger;return "null"},"set": function ondrop_set(){debugger;},});
Object.defineProperty(Document.prototype, "ondurationchange",{"configurable":true,"enumerable":true,"get": function ondurationchange_get(){debugger;return "null"},"set": function ondurationchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onemptied",{"configurable":true,"enumerable":true,"get": function onemptied_get(){debugger;return "null"},"set": function onemptied_set(){debugger;},});
Object.defineProperty(Document.prototype, "onended",{"configurable":true,"enumerable":true,"get": function onended_get(){debugger;return "null"},"set": function onended_set(){debugger;},});
Object.defineProperty(Document.prototype, "onerror",{"configurable":true,"enumerable":true,"get": function onerror_get(){debugger;return "null"},"set": function onerror_set(){debugger;},});
Object.defineProperty(Document.prototype, "onfocus",{"configurable":true,"enumerable":true,"get": function onfocus_get(){debugger;return "null"},"set": function onfocus_set(){debugger;},});
Object.defineProperty(Document.prototype, "onformdata",{"configurable":true,"enumerable":true,"get": function onformdata_get(){debugger;return "null"},"set": function onformdata_set(){debugger;},});
Object.defineProperty(Document.prototype, "oninput",{"configurable":true,"enumerable":true,"get": function oninput_get(){debugger;return "null"},"set": function oninput_set(){debugger;},});
Object.defineProperty(Document.prototype, "oninvalid",{"configurable":true,"enumerable":true,"get": function oninvalid_get(){debugger;return "null"},"set": function oninvalid_set(){debugger;},});
Object.defineProperty(Document.prototype, "onkeydown",{"configurable":true,"enumerable":true,"get": function onkeydown_get(){debugger;return "null"},"set": function onkeydown_set(){debugger;},});
Object.defineProperty(Document.prototype, "onkeypress",{"configurable":true,"enumerable":true,"get": function onkeypress_get(){debugger;return "null"},"set": function onkeypress_set(){debugger;},});
Object.defineProperty(Document.prototype, "onkeyup",{"configurable":true,"enumerable":true,"get": function onkeyup_get(){debugger;return "null"},"set": function onkeyup_set(){debugger;},});
Object.defineProperty(Document.prototype, "onload",{"configurable":true,"enumerable":true,"get": function onload_get(){debugger;return "null"},"set": function onload_set(){debugger;},});
Object.defineProperty(Document.prototype, "onloadeddata",{"configurable":true,"enumerable":true,"get": function onloadeddata_get(){debugger;return "null"},"set": function onloadeddata_set(){debugger;},});
Object.defineProperty(Document.prototype, "onloadedmetadata",{"configurable":true,"enumerable":true,"get": function onloadedmetadata_get(){debugger;return "null"},"set": function onloadedmetadata_set(){debugger;},});
Object.defineProperty(Document.prototype, "onloadstart",{"configurable":true,"enumerable":true,"get": function onloadstart_get(){debugger;return "null"},"set": function onloadstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmousedown",{"configurable":true,"enumerable":true,"get": function onmousedown_get(){debugger;return "null"},"set": function onmousedown_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseenter",{"configurable":true,"enumerable":true,"get": function onmouseenter_get(){debugger;return "null"},"set": function onmouseenter_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseleave",{"configurable":true,"enumerable":true,"get": function onmouseleave_get(){debugger;return "null"},"set": function onmouseleave_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmousemove",{"configurable":true,"enumerable":true,"get": function onmousemove_get(){debugger;return "null"},"set": function onmousemove_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseout",{"configurable":true,"enumerable":true,"get": function onmouseout_get(){debugger;return "null"},"set": function onmouseout_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseover",{"configurable":true,"enumerable":true,"get": function onmouseover_get(){debugger;return "null"},"set": function onmouseover_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmouseup",{"configurable":true,"enumerable":true,"get": function onmouseup_get(){debugger;return "null"},"set": function onmouseup_set(){debugger;},});
Object.defineProperty(Document.prototype, "onmousewheel",{"configurable":true,"enumerable":true,"get": function onmousewheel_get(){debugger;return "null"},"set": function onmousewheel_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpause",{"configurable":true,"enumerable":true,"get": function onpause_get(){debugger;return "null"},"set": function onpause_set(){debugger;},});
Object.defineProperty(Document.prototype, "onplay",{"configurable":true,"enumerable":true,"get": function onplay_get(){debugger;return "null"},"set": function onplay_set(){debugger;},});
Object.defineProperty(Document.prototype, "onplaying",{"configurable":true,"enumerable":true,"get": function onplaying_get(){debugger;return "null"},"set": function onplaying_set(){debugger;},});
Object.defineProperty(Document.prototype, "onprogress",{"configurable":true,"enumerable":true,"get": function onprogress_get(){debugger;return "null"},"set": function onprogress_set(){debugger;},});
Object.defineProperty(Document.prototype, "onratechange",{"configurable":true,"enumerable":true,"get": function onratechange_get(){debugger;return "null"},"set": function onratechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onreset",{"configurable":true,"enumerable":true,"get": function onreset_get(){debugger;return "null"},"set": function onreset_set(){debugger;},});
Object.defineProperty(Document.prototype, "onresize",{"configurable":true,"enumerable":true,"get": function onresize_get(){debugger;return "null"},"set": function onresize_set(){debugger;},});
Object.defineProperty(Document.prototype, "onscroll",{"configurable":true,"enumerable":true,"get": function onscroll_get(){debugger;return "null"},"set": function onscroll_set(){debugger;},});
Object.defineProperty(Document.prototype, "onsecuritypolicyviolation",{"configurable":true,"enumerable":true,"get": function onsecuritypolicyviolation_get(){debugger;return "null"},"set": function onsecuritypolicyviolation_set(){debugger;},});
Object.defineProperty(Document.prototype, "onseeked",{"configurable":true,"enumerable":true,"get": function onseeked_get(){debugger;return "null"},"set": function onseeked_set(){debugger;},});
Object.defineProperty(Document.prototype, "onseeking",{"configurable":true,"enumerable":true,"get": function onseeking_get(){debugger;return "null"},"set": function onseeking_set(){debugger;},});
Object.defineProperty(Document.prototype, "onselect",{"configurable":true,"enumerable":true,"get": function onselect_get(){debugger;return "null"},"set": function onselect_set(){debugger;},});
Object.defineProperty(Document.prototype, "onslotchange",{"configurable":true,"enumerable":true,"get": function onslotchange_get(){debugger;return "null"},"set": function onslotchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onstalled",{"configurable":true,"enumerable":true,"get": function onstalled_get(){debugger;return "null"},"set": function onstalled_set(){debugger;},});
Object.defineProperty(Document.prototype, "onsubmit",{"configurable":true,"enumerable":true,"get": function onsubmit_get(){debugger;return "null"},"set": function onsubmit_set(){debugger;},});
Object.defineProperty(Document.prototype, "onsuspend",{"configurable":true,"enumerable":true,"get": function onsuspend_get(){debugger;return "null"},"set": function onsuspend_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontimeupdate",{"configurable":true,"enumerable":true,"get": function ontimeupdate_get(){debugger;return "null"},"set": function ontimeupdate_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontoggle",{"configurable":true,"enumerable":true,"get": function ontoggle_get(){debugger;return "null"},"set": function ontoggle_set(){debugger;},});
Object.defineProperty(Document.prototype, "onvolumechange",{"configurable":true,"enumerable":true,"get": function onvolumechange_get(){debugger;return "null"},"set": function onvolumechange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwaiting",{"configurable":true,"enumerable":true,"get": function onwaiting_get(){debugger;return "null"},"set": function onwaiting_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkitanimationend",{"configurable":true,"enumerable":true,"get": function onwebkitanimationend_get(){debugger;return "null"},"set": function onwebkitanimationend_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkitanimationiteration",{"configurable":true,"enumerable":true,"get": function onwebkitanimationiteration_get(){debugger;return "null"},"set": function onwebkitanimationiteration_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkitanimationstart",{"configurable":true,"enumerable":true,"get": function onwebkitanimationstart_get(){debugger;return "null"},"set": function onwebkitanimationstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwebkittransitionend",{"configurable":true,"enumerable":true,"get": function onwebkittransitionend_get(){debugger;return "null"},"set": function onwebkittransitionend_set(){debugger;},});
Object.defineProperty(Document.prototype, "onwheel",{"configurable":true,"enumerable":true,"get": function onwheel_get(){debugger;return "null"},"set": function onwheel_set(){debugger;},});
Object.defineProperty(Document.prototype, "onauxclick",{"configurable":true,"enumerable":true,"get": function onauxclick_get(){debugger;return "null"},"set": function onauxclick_set(){debugger;},});
Object.defineProperty(Document.prototype, "ongotpointercapture",{"configurable":true,"enumerable":true,"get": function ongotpointercapture_get(){debugger;return "null"},"set": function ongotpointercapture_set(){debugger;},});
Object.defineProperty(Document.prototype, "onlostpointercapture",{"configurable":true,"enumerable":true,"get": function onlostpointercapture_get(){debugger;return "null"},"set": function onlostpointercapture_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerdown",{"configurable":true,"enumerable":true,"get": function onpointerdown_get(){debugger;return "null"},"set": function onpointerdown_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointermove",{"configurable":true,"enumerable":true,"get": function onpointermove_get(){debugger;return "null"},"set": function onpointermove_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerrawupdate",{"configurable":true,"enumerable":true,"get": function onpointerrawupdate_get(){debugger;return "null"},"set": function onpointerrawupdate_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerup",{"configurable":true,"enumerable":true,"get": function onpointerup_get(){debugger;return "null"},"set": function onpointerup_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointercancel",{"configurable":true,"enumerable":true,"get": function onpointercancel_get(){debugger;return "null"},"set": function onpointercancel_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerover",{"configurable":true,"enumerable":true,"get": function onpointerover_get(){debugger;return "null"},"set": function onpointerover_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerout",{"configurable":true,"enumerable":true,"get": function onpointerout_get(){debugger;return "null"},"set": function onpointerout_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerenter",{"configurable":true,"enumerable":true,"get": function onpointerenter_get(){debugger;return "null"},"set": function onpointerenter_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpointerleave",{"configurable":true,"enumerable":true,"get": function onpointerleave_get(){debugger;return "null"},"set": function onpointerleave_set(){debugger;},});
Object.defineProperty(Document.prototype, "onselectstart",{"configurable":true,"enumerable":true,"get": function onselectstart_get(){debugger;return "null"},"set": function onselectstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "onselectionchange",{"configurable":true,"enumerable":true,"get": function onselectionchange_get(){debugger;return "null"},"set": function onselectionchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onanimationend",{"configurable":true,"enumerable":true,"get": function onanimationend_get(){debugger;return "null"},"set": function onanimationend_set(){debugger;},});
Object.defineProperty(Document.prototype, "onanimationiteration",{"configurable":true,"enumerable":true,"get": function onanimationiteration_get(){debugger;return "null"},"set": function onanimationiteration_set(){debugger;},});
Object.defineProperty(Document.prototype, "onanimationstart",{"configurable":true,"enumerable":true,"get": function onanimationstart_get(){debugger;return "null"},"set": function onanimationstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontransitionrun",{"configurable":true,"enumerable":true,"get": function ontransitionrun_get(){debugger;return "null"},"set": function ontransitionrun_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontransitionstart",{"configurable":true,"enumerable":true,"get": function ontransitionstart_get(){debugger;return "null"},"set": function ontransitionstart_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontransitionend",{"configurable":true,"enumerable":true,"get": function ontransitionend_get(){debugger;return "null"},"set": function ontransitionend_set(){debugger;},});
Object.defineProperty(Document.prototype, "ontransitioncancel",{"configurable":true,"enumerable":true,"get": function ontransitioncancel_get(){debugger;return "null"},"set": function ontransitioncancel_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncopy",{"configurable":true,"enumerable":true,"get": function oncopy_get(){debugger;return "null"},"set": function oncopy_set(){debugger;},});
Object.defineProperty(Document.prototype, "oncut",{"configurable":true,"enumerable":true,"get": function oncut_get(){debugger;return "null"},"set": function oncut_set(){debugger;},});
Object.defineProperty(Document.prototype, "onpaste",{"configurable":true,"enumerable":true,"get": function onpaste_get(){debugger;return "null"},"set": function onpaste_set(){debugger;},});
Object.defineProperty(Document.prototype, "children",{"configurable":true,"enumerable":true,"get": function children_get(){debugger;return "[object HTMLCollection]"},set:undefined, });
Object.defineProperty(Document.prototype, "firstElementChild",{"configurable":true,"enumerable":true,"get": function firstElementChild_get(){debugger;return "[object HTMLHtmlElement]"},set:undefined, });
Object.defineProperty(Document.prototype, "lastElementChild",{"configurable":true,"enumerable":true,"get": function lastElementChild_get(){debugger;return "[object HTMLHtmlElement]"},set:undefined, });
Object.defineProperty(Document.prototype, "childElementCount",{"configurable":true,"enumerable":true,"get": function childElementCount_get(){debugger;return "1"},set:undefined, });
Object.defineProperty(Document.prototype, "activeElement",{"configurable":true,"enumerable":true,"get": function activeElement_get(){debugger;return "[object HTMLBodyElement]"},set:undefined, });
Object.defineProperty(Document.prototype, "styleSheets",{"configurable":true,"enumerable":true,"get": function styleSheets_get(){debugger;return "[object StyleSheetList]"},set:undefined, });
Object.defineProperty(Document.prototype, "pointerLockElement",{"configurable":true,"enumerable":true,"get": function pointerLockElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "fullscreenElement",{"configurable":true,"enumerable":true,"get": function fullscreenElement_get(){debugger;return "null"},"set": function fullscreenElement_set(){debugger;},});
Object.defineProperty(Document.prototype, "adoptedStyleSheets",{"configurable":true,"enumerable":true,"get": function adoptedStyleSheets_get(){debugger;return ""},"set": function adoptedStyleSheets_set(){debugger;},});
Object.defineProperty(Document.prototype, "pictureInPictureElement",{"configurable":true,"enumerable":true,"get": function pictureInPictureElement_get(){debugger;return "null"},set:undefined, });
Object.defineProperty(Document.prototype, "fonts",{"configurable":true,"enumerable":true,"get": function fonts_get(){debugger;return "[object FontFaceSet]"},set:undefined, });
Object.defineProperty(Document.prototype, "adoptNode",{"configurable":true,"enumerable":true,"writable":true,"value": function adoptNode(){debugger;},});dogvm.safefunction(Document.prototype.adoptNode);
Object.defineProperty(Document.prototype, "append",{"configurable":true,"enumerable":true,"writable":true,"value": function append(){debugger;},});dogvm.safefunction(Document.prototype.append);
Object.defineProperty(Document.prototype, "captureEvents",{"configurable":true,"enumerable":true,"writable":true,"value": function captureEvents(){debugger;},});dogvm.safefunction(Document.prototype.captureEvents);
Object.defineProperty(Document.prototype, "caretRangeFromPoint",{"configurable":true,"enumerable":true,"writable":true,"value": function caretRangeFromPoint(){debugger;},});dogvm.safefunction(Document.prototype.caretRangeFromPoint);
Object.defineProperty(Document.prototype, "clear",{"configurable":true,"enumerable":true,"writable":true,"value": function clear(){debugger;},});dogvm.safefunction(Document.prototype.clear);
Object.defineProperty(Document.prototype, "close",{"configurable":true,"enumerable":true,"writable":true,"value": function close(){debugger;},});dogvm.safefunction(Document.prototype.close);
Object.defineProperty(Document.prototype, "createAttribute",{"configurable":true,"enumerable":true,"writable":true,"value": function createAttribute(){debugger;},});dogvm.safefunction(Document.prototype.createAttribute);
Object.defineProperty(Document.prototype, "createAttributeNS",{"configurable":true,"enumerable":true,"writable":true,"value": function createAttributeNS(){debugger;},});dogvm.safefunction(Document.prototype.createAttributeNS);
Object.defineProperty(Document.prototype, "createCDATASection",{"configurable":true,"enumerable":true,"writable":true,"value": function createCDATASection(){debugger;},});dogvm.safefunction(Document.prototype.createCDATASection);
Object.defineProperty(Document.prototype, "createComment",{"configurable":true,"enumerable":true,"writable":true,"value": function createComment(){debugger;},});dogvm.safefunction(Document.prototype.createComment);
Object.defineProperty(Document.prototype, "createDocumentFragment",{"configurable":true,"enumerable":true,"writable":true,"value": function createDocumentFragment(){debugger;},});dogvm.safefunction(Document.prototype.createDocumentFragment);
Object.defineProperty(Document.prototype, "createElement",{"configurable":true,"enumerable":true,"writable":true,"value": function createElement(){debugger;},});dogvm.safefunction(Document.prototype.createElement);
Object.defineProperty(Document.prototype, "createElementNS",{"configurable":true,"enumerable":true,"writable":true,"value": function createElementNS(){debugger;},});dogvm.safefunction(Document.prototype.createElementNS);
Object.defineProperty(Document.prototype, "createEvent",{"configurable":true,"enumerable":true,"writable":true,"value": function createEvent(){debugger;},});dogvm.safefunction(Document.prototype.createEvent);
Object.defineProperty(Document.prototype, "createExpression",{"configurable":true,"enumerable":true,"writable":true,"value": function createExpression(){debugger;},});dogvm.safefunction(Document.prototype.createExpression);
Object.defineProperty(Document.prototype, "createNSResolver",{"configurable":true,"enumerable":true,"writable":true,"value": function createNSResolver(){debugger;},});dogvm.safefunction(Document.prototype.createNSResolver);
Object.defineProperty(Document.prototype, "createNodeIterator",{"configurable":true,"enumerable":true,"writable":true,"value": function createNodeIterator(){debugger;},});dogvm.safefunction(Document.prototype.createNodeIterator);
Object.defineProperty(Document.prototype, "createProcessingInstruction",{"configurable":true,"enumerable":true,"writable":true,"value": function createProcessingInstruction(){debugger;},});dogvm.safefunction(Document.prototype.createProcessingInstruction);
Object.defineProperty(Document.prototype, "createRange",{"configurable":true,"enumerable":true,"writable":true,"value": function createRange(){debugger;},});dogvm.safefunction(Document.prototype.createRange);
Object.defineProperty(Document.prototype, "createTextNode",{"configurable":true,"enumerable":true,"writable":true,"value": function createTextNode(){debugger;},});dogvm.safefunction(Document.prototype.createTextNode);
Object.defineProperty(Document.prototype, "createTreeWalker",{"configurable":true,"enumerable":true,"writable":true,"value": function createTreeWalker(){debugger;},});dogvm.safefunction(Document.prototype.createTreeWalker);
Object.defineProperty(Document.prototype, "elementFromPoint",{"configurable":true,"enumerable":true,"writable":true,"value": function elementFromPoint(){debugger;},});dogvm.safefunction(Document.prototype.elementFromPoint);
Object.defineProperty(Document.prototype, "elementsFromPoint",{"configurable":true,"enumerable":true,"writable":true,"value": function elementsFromPoint(){debugger;},});dogvm.safefunction(Document.prototype.elementsFromPoint);
Object.defineProperty(Document.prototype, "evaluate",{"configurable":true,"enumerable":true,"writable":true,"value": function evaluate(){debugger;},});dogvm.safefunction(Document.prototype.evaluate);
Object.defineProperty(Document.prototype, "execCommand",{"configurable":true,"enumerable":true,"writable":true,"value": function execCommand(){debugger;},});dogvm.safefunction(Document.prototype.execCommand);
Object.defineProperty(Document.prototype, "exitFullscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function exitFullscreen(){debugger;},});dogvm.safefunction(Document.prototype.exitFullscreen);
Object.defineProperty(Document.prototype, "exitPictureInPicture",{"configurable":true,"enumerable":true,"writable":true,"value": function exitPictureInPicture(){debugger;},});dogvm.safefunction(Document.prototype.exitPictureInPicture);
Object.defineProperty(Document.prototype, "exitPointerLock",{"configurable":true,"enumerable":true,"writable":true,"value": function exitPointerLock(){debugger;},});dogvm.safefunction(Document.prototype.exitPointerLock);
Object.defineProperty(Document.prototype, "getAnimations",{"configurable":true,"enumerable":true,"writable":true,"value": function getAnimations(){debugger;},});dogvm.safefunction(Document.prototype.getAnimations);
Object.defineProperty(Document.prototype, "getElementsByClassName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByClassName(){debugger;},});dogvm.safefunction(Document.prototype.getElementsByClassName);
Object.defineProperty(Document.prototype, "getElementsByName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByName(){debugger;},});dogvm.safefunction(Document.prototype.getElementsByName);
Object.defineProperty(Document.prototype, "getElementsByTagName",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByTagName(){debugger;},});dogvm.safefunction(Document.prototype.getElementsByTagName);
Object.defineProperty(Document.prototype, "getElementsByTagNameNS",{"configurable":true,"enumerable":true,"writable":true,"value": function getElementsByTagNameNS(){debugger;},});dogvm.safefunction(Document.prototype.getElementsByTagNameNS);
Object.defineProperty(Document.prototype, "getSelection",{"configurable":true,"enumerable":true,"writable":true,"value": function getSelection(){debugger;},});dogvm.safefunction(Document.prototype.getSelection);
Object.defineProperty(Document.prototype, "hasFocus",{"configurable":true,"enumerable":true,"writable":true,"value": function hasFocus(){debugger;},});dogvm.safefunction(Document.prototype.hasFocus);
Object.defineProperty(Document.prototype, "hasStorageAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function hasStorageAccess(){debugger;},});dogvm.safefunction(Document.prototype.hasStorageAccess);
Object.defineProperty(Document.prototype, "hasUnpartitionedCookieAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function hasUnpartitionedCookieAccess(){debugger;},});dogvm.safefunction(Document.prototype.hasUnpartitionedCookieAccess);
Object.defineProperty(Document.prototype, "importNode",{"configurable":true,"enumerable":true,"writable":true,"value": function importNode(){debugger;},});dogvm.safefunction(Document.prototype.importNode);
Object.defineProperty(Document.prototype, "open",{"configurable":true,"enumerable":true,"writable":true,"value": function open(){debugger;},});dogvm.safefunction(Document.prototype.open);
Object.defineProperty(Document.prototype, "prepend",{"configurable":true,"enumerable":true,"writable":true,"value": function prepend(){debugger;},});dogvm.safefunction(Document.prototype.prepend);
Object.defineProperty(Document.prototype, "queryCommandEnabled",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandEnabled(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandEnabled);
Object.defineProperty(Document.prototype, "queryCommandIndeterm",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandIndeterm(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandIndeterm);
Object.defineProperty(Document.prototype, "queryCommandState",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandState(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandState);
Object.defineProperty(Document.prototype, "queryCommandSupported",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandSupported(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandSupported);
Object.defineProperty(Document.prototype, "queryCommandValue",{"configurable":true,"enumerable":true,"writable":true,"value": function queryCommandValue(){debugger;},});dogvm.safefunction(Document.prototype.queryCommandValue);
Object.defineProperty(Document.prototype, "querySelector",{"configurable":true,"enumerable":true,"writable":true,"value": function querySelector(){debugger;},});dogvm.safefunction(Document.prototype.querySelector);
Object.defineProperty(Document.prototype, "querySelectorAll",{"configurable":true,"enumerable":true,"writable":true,"value": function querySelectorAll(){debugger;},});dogvm.safefunction(Document.prototype.querySelectorAll);
Object.defineProperty(Document.prototype, "releaseEvents",{"configurable":true,"enumerable":true,"writable":true,"value": function releaseEvents(){debugger;},});dogvm.safefunction(Document.prototype.releaseEvents);
Object.defineProperty(Document.prototype, "replaceChildren",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceChildren(){debugger;},});dogvm.safefunction(Document.prototype.replaceChildren);
Object.defineProperty(Document.prototype, "requestStorageAccess",{"configurable":true,"enumerable":true,"writable":true,"value": function requestStorageAccess(){debugger;},});dogvm.safefunction(Document.prototype.requestStorageAccess);
Object.defineProperty(Document.prototype, "requestStorageAccessFor",{"configurable":true,"enumerable":true,"writable":true,"value": function requestStorageAccessFor(){debugger;},});dogvm.safefunction(Document.prototype.requestStorageAccessFor);
Object.defineProperty(Document.prototype, "startViewTransition",{"configurable":true,"enumerable":true,"writable":true,"value": function startViewTransition(){debugger;},});dogvm.safefunction(Document.prototype.startViewTransition);
Object.defineProperty(Document.prototype, "webkitCancelFullScreen",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitCancelFullScreen(){debugger;},});dogvm.safefunction(Document.prototype.webkitCancelFullScreen);
Object.defineProperty(Document.prototype, "webkitExitFullscreen",{"configurable":true,"enumerable":true,"writable":true,"value": function webkitExitFullscreen(){debugger;},});dogvm.safefunction(Document.prototype.webkitExitFullscreen);
Object.defineProperty(Document.prototype, "write",{"configurable":true,"enumerable":true,"writable":true,"value": function write(){debugger;},});dogvm.safefunction(Document.prototype.write);
Object.defineProperty(Document.prototype, "writeln",{"configurable":true,"enumerable":true,"writable":true,"value": function writeln(){debugger;},});dogvm.safefunction(Document.prototype.writeln);
Object.defineProperty(Document.prototype, "fragmentDirective",{"configurable":true,"enumerable":true,"get": function fragmentDirective_get(){debugger;return "[object FragmentDirective]"},set:undefined, });
Object.defineProperty(Document.prototype, "browsingTopics",{"configurable":true,"enumerable":true,"writable":true,"value": function browsingTopics(){debugger;},});dogvm.safefunction(Document.prototype.browsingTopics);
Object.defineProperty(Document.prototype, "hasPrivateToken",{"configurable":true,"enumerable":true,"writable":true,"value": function hasPrivateToken(){debugger;},});dogvm.safefunction(Document.prototype.hasPrivateToken);
Object.defineProperty(Document.prototype, "hasRedemptionRecord",{"configurable":true,"enumerable":true,"writable":true,"value": function hasRedemptionRecord(){debugger;},});dogvm.safefunction(Document.prototype.hasRedemptionRecord);
Object.defineProperty(Document.prototype, "onscrollend",{"configurable":true,"enumerable":true,"get": function onscrollend_get(){debugger;return "null"},"set": function onscrollend_set(){debugger;},});
Object.defineProperty(Document.prototype, "onscrollsnapchange",{"configurable":true,"enumerable":true,"get": function onscrollsnapchange_get(){debugger;return "null"},"set": function onscrollsnapchange_set(){debugger;},});
Object.defineProperty(Document.prototype, "onscrollsnapchanging",{"configurable":true,"enumerable":true,"get": function onscrollsnapchanging_get(){debugger;return "null"},"set": function onscrollsnapchanging_set(){debugger;},});
Object.defineProperty(Document.prototype, "caretPositionFromPoint",{"configurable":true,"enumerable":true,"writable":true,"value": function caretPositionFromPoint(){debugger;},});dogvm.safefunction(Document.prototype.caretPositionFromPoint);


Object.defineProperty(Document.prototype, "head",{"configurable":true,"enumerable":true,
    "get": function head_get(){
        debugger;
        return HTMLHeadElement.headDog;
    },set:undefined, });


Object.defineProperty(Document.prototype, "body",{"configurable":true,"enumerable":true,
    "get": function body_get(){
    debugger;return HTMLBodyElement.bodyDog;
},"set": function body_set(){debugger;},});


Object.defineProperty(Document.prototype, "documentElement",{"configurable":true,"enumerable":true,
    "get": function documentElement_get(){
        debugger;return HTMLHtmlElement.createHtmlElementDog();
    },set:undefined, });

Object.defineProperty(Document.prototype, "getElementById",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function getElementById(id) {
        debugger;
        let element = dogvm.memory.htmlId.find(e => e.id === id);
        // 先判断是否创建过 没有创建过就去创建 创建过的去内存寻址
        for (const [key, value] of dogvm.memory.htmlNode ) {
            for(let p in value){
                if (value[p] instanceof Element && value[p].getAttribute("id") == id) {
                    return value[p];
                }
            }
        }

        if (element) {
            let a = document.createElement(element.tag);
            a._id = element.id;
            a._tagName = element.tag;
            a.innerHTML = element.content;
            a.parentList = element.parentList;
            return a;
        }
        return null;
},});dogvm.safefunction(Document.prototype.getElementById);

var my_cookie_dog = "";
Object.defineProperty(Document.prototype, "cookie",{"configurable":true,"enumerable":true,
    "get": function cookie_get(){
        debugger;
        return my_cookie_dog;
    },
    "set": function cookie_set(value){
        debugger;
        console.log("cookie设置:",value)
        my_cookie_dog = value;
        return value;
    },});

//////////////////////////


// HTMLDocument
var HTMLDocument = function HTMLDocument(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLDocument);

Object.defineProperties(HTMLDocument.prototype, {
    [Symbol.toStringTag]: {
        value: "HTMLDocument",
        configurable: true
    }
});
HTMLDocument.prototype.__proto__ = Document.prototype;


// document
document = {};
document.__proto__ = HTMLDocument.prototype;

// document属性方法
document.createElement = function createElement(tagName) {
    debugger
    tagName = tagName.toLowerCase();
    tagName = tagName.replace(/\d+/g, '')
    if (dogvm.memory.htmlelements[tagName] == undefined) {
        debugger;
    } else {
        var tagElement = dogvm.memory.htmlelements[tagName]();
        tagElement._tagName = tagName;
        return dogvm.proxy(tagElement);
    }
};
dogvm.safefunction(document.createElement);

document.location = location;
Object.defineProperty(document, "_reactListeningmdo4y3a4jz",{"configurable":true,"enumerable":true,"writable":true,"value":true,});
Object.defineProperty(document, "form_name_1735543137199",{"configurable":true,"enumerable":true,"writable":true,"value":{},});


document = dogvm.proxy(document);
debugger;

mwbxQ.$_Au = function() {
  var $_DBGFP = 2;
  for (; $_DBGFP !== 1; ) {
      switch ($_DBGFP) {
      case 2:
          return {
              $_DBGGJ: function($_DBGHw) {
                  var $_DBGIf = 2;
                  for (; $_DBGIf !== 14; ) {
                      switch ($_DBGIf) {
                      case 5:
                          $_DBGIf = $_DBGJC < $_DBHAf.length ? 4 : 7;
                          break;
                      case 2:
                          var $_DBHBj = ''
                            , $_DBHAf = decodeURI('C9-%0E%0C*%02%14%1B%20;+VVZ%11%17%13%02%12=&$%119%13%1A*;+%02%14%1B%20;*%00%03%1D%0B(%00%028%1D%20%0F%1D%1F%03%0D%11m+$#%1F%11$%07%008%E9%84%A4%E7%BC%A1%E5%8E%8B%E6%94%84%00%12%E6%9D%A0%E8%AE%A0%EF%BD%93%E8%AE%83%E6%A2%A7%E6%9E%83%E5%89%B4%E5%A6%84%E5%8D%9F%E6%96%82%E4%BD%87%E5%84%83%E7%9B%AD%E9%84%82%E7%BC%A7%E5%8E%B6%E6%94%97%01%1D%EF%BD%87%E5%AE%B0%E5%BB%A0%E7%95%94%E8%AE%91%E6%96%9F%E7%9B%8B%000%EF%BD%AE8%0C=;%1B%159X%7Fx*2%15%0C=%0A%15%0B%0A+.*%1F%22%14%1B%20;*H%01%0C;g%04%0F%16%E8%AE%9E%E6%B0%8D%E6%8B%AC%E9%95%AD%EF%BD%BDWG%E8%AE%B8%E4%BE%94%E6%8D%B5%E7%BC%B6%E7%BA%BA%E7%94%AC%E9%81%95%EF%BD%92FI%E6%A2%A6%E6%9E%8C%E5%89%92%E5%A6%82%E5%8D%A2%E6%96%91%E4%BD%86%E5%84%8C%E7%9B%8B%E9%84%84%E7%BC%9A%E5%8E%A5%E6%94%96%0E;%E5%93%85%17%0F%07%05#,%1A%00%0379(%18%12%03&)%17%10%06%12%08%11g%5B%12%15%0C=*%15%0B%0A%0B.*%1FH8%0A.\'%02%06%157(,%00!%13%05#%10%11%06%1478%20%10%13%0E7%E6%8A%99%E5%8B%A1%E6%BA%A5%E5%9C%B0%E5%B1%A0%E6%83%85%E6%B4%A1%E5%9A%B7%E5%82%BB%E6%AC%84%E7%A0%88%E6%8A%95%E5%91%87%17%5D9%14%08!-%1B%0A8%E4%BD%89%E7%BA%96%E5%91%8D%E5%9A%AA%E8%B1%A4%E7%9B%A2%E5%8E%AB%E6%94%BF%E4%B9%84%E6%99%9B%E5%86%9A%E6%94%96%E7%B0%92%E5%9F%84%EF%BD%93%E8%AE%83%E4%BD%87%E5%84%83%E5%86%94%E6%94%BF%E7%B0%B2%E5%9F%BF%E5%8E%A5%E6%94%967%E5%84%BC%E9%96%A4%E9%AB%B8%E8%AE%A68G%11%E5%89%BE%E6%97%84%E9%AB%AB%E8%AE%A77%08,%11%13%03%1A;%0C%06%15%09%1B%11m+%25,:%11%E5%92%8E%E5%92%92%EF%BC%B9%E6%81%8C%E7%88%80%E5%91%8C%E4%BB%8F%E6%8A%88%E5%9A%99FZo%E7%A6%9B%E5%91%BA%E9%86%AA%E8%AE%B37k%160%25%0E7%3C=%15%13%13%1A%11!%1D%03%02%0C!%17%11%15%14%06=%17%04%08%15%1D%11.%11%13/%04..%11#%07%1D.%17%13%02%12$%20\'%00%0F8M%10%0A078%1C!-%11%01%0F%07*-*%13%1F%19*%17P8%25!\'%17D9B6%3C%1D%0D%1E%0A%0C%11%E8%A6%8F%E8%A6%BD%E9%9B%BB%E7%A3%AB7%E5%B9%A1%E5%8B%A0%E5%8E%B9%E9%A7%AF8%E6%8A%BF%E5%8B%A7%E5%B6%AF%E8%BF%8D%E6%BA%B6%E5%9C%B1%E5%AF%A5%E6%89%9F%E4%B9%83%E6%97%8D%E6%8A%9B%E5%9A%987=,%04%0B%07%0A*%17%E8%AE%83%E5%84%94%E9%96%8B%E9%AB%A5%E8%AE%8E%E9%86%84%E8%AE%A19%01%0C;%1A%11%04%09%07+:*%E5%8B%87%E8%BC%9B%E4%B9%84agZ9%16%1C;%00%19%06%01%0C%0B(%00%068%0A=,%15%13%03,#,%19%02%08%1D%11:%00%15%0F%07(%17P8%25.%06%17%E7%95%85%E6%9F%A6%E9%AB%AA%E6%8E%B9%E4%BF%94%E6%8B%89%E6%9D%9B%E6%95%88%E6%8D%A77od*%00%03%1D%0C&%1A%13%03%11;%17%07%02%05I%E7%A6%9D%E7%9B%8D%E9%81%AB%E5%BB%81%E8%B7%A3%E8%BE%AEo:%17%08%14%0Cji%E7%9B%B0%E7%95%8F%E6%89%917o%17%E4%BD%94%E7%BA%BE%04%00!-;%09%E6%8F%83%E5%8E%8A%E7%9B%8B%E5%8E%8B%E6%94%84%E6%9D%AE%E8%AE%89%EF%BD%B3%E5%8E%A5%E6%8F%AC%E5%8E%A3%0E%02%E9%81%A0%E6%8A%A6%E5%98%A1%E5%93%B8#)$%E5%84%8C%E7%B5%A9%EF%BD%B8%E5%B8%91%E4%B9%B2%E9%9D%A9%E4%BE%92%E8%AE%88%E5%84%82%E5%AC%BF%E5%9D%8E%E4%BB%A7%E9%A0%BA%E9%9C%AB%E4%B9%999B6%0C%0819%03%1B=&%068WY%7D%17%16%08%09%05*(%1A9%03%1B=&%068%05%06+,*%14%14%0A%11-%06%06%11%20%22(%13%028.*,%00%02%15%1Do;%11%16%13%00=,%07G%07I8%20%1A%03%09%1Eo%3E%1D%13%0EI.i%10%08%05%1C%22,%1A%138%0D*=%15%0E%0A7k%167-%0D7%7D-*C9*%09%0E*%0E%08%19:=*C9*%0C;*%00%03%1D%02%20%1A%12%12%0C%3C%17%10%08%05%1C%22,%1A%138So%17%1C%06%15&8\'$%15%09%19*;%00%1E8_%7F%7D*%0F%03%00(!%009K7u%17%1D%0A%017?1*%02%14%1B%20;+VV%5D%11\'%01%0A%04%0C=%17%11%15%14%06=%16EWV7+(%00%06%5C%00%22(%13%02I%1E*+%04%5C%04%08%3C,BSJ%3C$%2535%0F%5D%0E%085%25%3E;%1A%03%251%0A(%7B%1D7%22\'(%0E%08%02&3(%0E%0C6_%11(&%04%03&%01:%1C%07%00%14%03F,%11%1E%1F%1F*%0C$%06%3E(%3E%1F%3E%19/4!v#%03*\'7+%20%029%15%19#%20%009%00%1C!*%00%0E%09%07%119%06%08%12%06,&%189%E4%BD%86%E7%BA%B0.9%04%02%08%0D%1B&%E6%8F%91%E5%8E%84%E7%9B%A2%E5%8E%AB%E6%94%BF%E6%9D%80%E8%AE%9B%EF%BD%BD%E5%8E%8C%E6%8F%8C%E5%8E%98%20%10%E9%81%AE%E6%8A%8F%E5%98%81%E5%93%83%0D;*%E5%84%A5%E7%B5%89%EF%BD%83%E5%B8%BF%E4%B9%A0%E9%9D%A7%E4%BE%BB%E8%AE%A8%E5%84%B9%E5%AC%91%E5%9D%9C%E4%BB%A9%E9%A0%93%E9%9C%8B%E4%B9%A2%17%01%15%0AA%11m+$/9%11&%1A%0B%09%08+%17P8%25+%08%17%11%1F%16%06==%079%09%0B%25,%17%138%06!,%06%15%09%1B%11.%11%13.%06:;%079I%08%25(%0CI%16%01?%E8%AE%BE%E6%B0%B6%E6%8B%82%E9%95%BF%EF%BD%B3~g%E8%AE%83%E4%BE%BA%E6%8D%A7%E7%BC%B8%E7%BA%93%E7%94%8C%E9%81%AE%EF%BD%BCTG%E8%AE%B8%E8%80%9D%E7%B2%8F%E6%9F%A6%E9%AB%AA%E5%AF%B1%E7%BC%9E%E5%AF%AB%E6%9D%B99%05%05*(%063%0F%04*&%01%138%1B*(%10%1E5%1D.=%119%03%1B=&%068WX%7D%17%17%14%157%E7%95%A7%E6%89%BE%E5%9A%AA%E8%B1%A4%E5%86%9B%E6%94%99%E6%88%A8%E8%A0%85%E5%BD%B6%E5%B9%9F8%0C=;%1B%159X~q*%E8%AE%8A%E9%9E%95%E6%97%AE%E4%BA%B9%E5%8B%A9%E8%BC%89%E5%A5%96%E8%B5%83%EF%BD%B3~g%E8%AE%83%E4%BE%BA%E6%8D%A7%E7%BC%B8%E7%BA%93%E7%94%8C%E9%81%AE%EF%BD%BCTG%E8%AE%B8%E8%80%9D%E7%B2%8F%E6%9F%A6%E9%AB%AA%E5%AF%B1%E7%BC%9E%E5%AF%AB%E6%9D%B99%07%1C+%20%1B9%13%07$\'%1B%10%087,&%19%17%0A%0C;,*%0D%157%E7%B7%BD%E7%B4%A8%E4%B9%B9%E7%B4%81%E5%8B%BD7*;%06%08%146~yB9%E7%9B%88%E8%83%8D%E5%8B%AF%E8%BC%B4%E5%A5%85%E8%B5%82%EF%BD%BCXa%E8%AE%BE%E4%BE%A9%E6%8D%A6%E7%BC%B7%E7%BA%B5%E7%94%8A%E9%81%93%EF%BD%AFUH%E8%AE%9E%E8%80%9B%E7%B2%B2%E6%9F%B5%E9%AB%AB%E5%AF%BE%E7%BC%B8%E5%AF%AD%E6%9D%84*H8%1A?%25%1D%04%037%3C=%15%04%0D7%7C%17%E7%BC%A5%E7%BA%BB%E4%B9%AB%E7%BA%B0%E5%8B%94%17%11%15%14%06=%16EVS7,!%15%15%25%06+,5%138%0A%20-%119%01%1D%11(*%20%03%0C%08%1D*%04%0E%08=%08%009%0B%06!%20%00%08%14G(,%11%13%03%1A;g%17%08%0BF%22&%1A%0E%12%06=f%07%02%08%0D%11:%11%132%00%22,%1B%12%127#&%15%03%03%0D%11%20%1A%03%03%11%00/*%00%03%0C;,%07%1397b*%1A9%07%19&:%11%15%10%0C=%17%18%06%08%0E%11*%1C%06%0A%05*\'%13%028%0F&%25%11%09%07%04*%17P8%22-%1F%17%04%12%15%01%11m+#!%19%11:%17%15%0F%19;%17%1A%06%10%00((%00%08%147&\'%1D%13!%0C*=%11%14%12%E9%86%A5%E9%9C%AD%E7%9B%8D%13%13%E6%89%B0%E8%81%AC,!%15%0B%0A%0C!.%11%E5%8E%A5%E6%94%96%E7%BD%93%E5%B1%9EsT%E8%AE%90%E6%A2%A6%E6%9E%8C%E5%89%92%E5%A6%82%E5%8D%A2%E5%8E%A5%E6%94%967*;%06%08%146~xC9%1C%01b*%1A93=%09dL9%03%1B=&%068WYw%17BWU7*;%06%08%146~yM9%03%1B=&%068WYx%17%11%15%14%06=%16EVW7%E9%84%82%E7%BC%A7%E5%8E%B6%E6%94%97%07%1B*(%E6%9D%BD%E8%AE%88%EF%BD%BC%E5%8E%83%E6%8F%AA%E5%8E%9E%1D%03%E9%81%AF%E6%8A%80%E5%98%A7%E5%93%850(+%E5%84%AA%E7%B5%AF%EF%BD%85%E5%B8%82%E4%B9%B3%E9%9D%A6%E4%BE%B4%E8%AE%8E%E5%84%BF%E5%AC%AC%E5%9D%8F%E4%BB%A8%E9%A0%9C%E9%9C%AD%E4%B9%A4*C9-%07%11*C9-%06%06*%02%087%01,%00%10%09%1B$i%12%06%0F%05:;%119%5B7b=%039%05%08#%25%16%06%05%02%11;%1B%12%08%0D%11(%1A%08%08%10%22&%01%148F=,%07%02%12G?!%04%E8%AE%90%E6%B0%A4%E6%8B%8C%E9%95%96%EF%BD%93EI%E8%AE%91%E4%BE%B4%E6%8D%8E%E7%BC%98%E7%BA%A8%E7%94%A2%E9%81%BC%EF%BD%B2%7Dg%E8%AE%83%E8%80%B3%E7%B2%9D%E6%9F%A8%E9%AB%83%E5%AF%91%E7%BC%A5%E5%AF%85%E6%9D%AB75!*%E9%84%AA%E7%BC%88%E9%8D%86%E8%AB%AB%17%11%15%14%06=%16EVR7p%177%08%08%0F&.%01%15%07%1D&&%1AG#%1B=&%069%E9%84%AB%E7%BC%87%E9%95%96%E8%AE%A6*C9-%0A%0F*%0B%0F%07$%17%1C%0C8%0C=;%1B%159X~y*%02%14%1B%20;+VV%5C%11:%00%1E%0A%0C%3C!%11%02%127%E6%96%AF%E6%AC%AD%E7%B0%8F%E9%95%BE%E8%AE%89%E7%B0%92%E5%9F%84%17%00%02%15%1D%11%E4%BD%A9%E7%BA%AD%05%0F%07+%0F%1B%15%0B%E6%8F%8C%E5%8E%AC%E7%9B%8D%E5%8E%B6%E6%94%97%E6%9D%AF%E8%AE%86%EF%BD%95%E5%8E%A3%E6%8F%91%E5%8E%B0%0F%0D%E9%81%86%E6%8A%A0%E5%98%9C%E5%93%AB%22&%02%E5%84%8A%E7%B5%94%EF%BD%AB%E5%B8%90%E4%B9%BD%E9%9D%8F%E4%BE%94%E8%AE%B5%E5%84%91%E5%AC%BE%E5%9D%81%E4%BB%81%E9%A0%BC%E9%9C%96%E4%B9%8A8%0C=;%1B%159X~%7F*%0E%167%E9%AB%83%E8%AE%88%E7%9B%B0%0D%15%E5%9D%99%E5%9C%8F%E6%96%A9%E6%B2%A1%E5%8B%87%E8%BC%9B7%60;%11%01%14%0C%3C!Z%17%0E%19%E8%AE%B8%E6%B0%8B%E6%8B%91%E9%95%BE%EF%BD%BCXa%E8%AE%BE%E4%BE%A9%E6%8D%A6%E7%BC%B7%E7%BA%B5%E7%94%8A%E9%81%93%EF%BD%AFUH%E5%89%9E%E6%97%BF%E6%AD%A8%E6%94%84%E6%9D%8B%E8%BB%8D%E6%9D%A0%E9%98%9F%E5%89%BF%EF%BD%BCVV%E6%AD%88%E4%BA%AA%E5%87%8C%EF%BD%BD%EF%BD%AB%E8%B7%A3%E8%BE%AE%E9%98%9F%E5%89%BF%E8%AE%83%E5%89%90%E6%97%96%E6%94%9D%E4%B9%A5%E9%A0%BC%E9%9C%96%E5%87%AA%E8%AE%B37%20/%12%0B%0F%07*%17%19%02%15%1A..%119%13%1A*;5%00%03%07;%17R9%12%00%22,%1B%12%127yyF9B6%0B%0F%169%15%05&*%119%07%19&%16%07%02%14%1F*;*%02%14%1B%20;+VWZ%11:%00%02%167%E9%AB%83%E8%AE%88%E7%9B%B0%0D%15%E5%9D%99%E5%9C%8F%E4%B9%84%E5%AC%AC%E5%9D%8F8%05*\'%13%13%0E7%E6%9D%82%E5%8B%A8%E7%AA%9B%01%09%1B-%20%10%03%03%07%EF%BD%95i%E8%AE%83%E8%80%B3%E7%B2%9D%E6%9F%A8%E9%AB%83%E5%AF%91%E7%BC%A5%E5%AF%85%E6%9D%AB7%08,%11$%0E%08#%25%11%09%01%0C%11=%039%E9%AB%AA%E8%AE%A8%E5%9A%B1%E7%88%8E%E5%8B%94%E8%BC%9A%E5%A5%97%E8%B5%8C%EF%BD%95xZ%E8%AE%90%E4%BE%BB%E6%8D%A8%E7%BC%9E%E7%BA%95%E7%94%B1%E9%81%BD%EF%BD%BD%5Ba%E8%AE%BE%E8%80%A0%E7%B2%9C%E6%9F%A7%E9%AB%A5%E5%AF%97%E7%BC%98%E5%AF%96%E6%9D%AA8M%10%0B7)8%1D%20%05%1B%10%03%1B%0C(%07%028%01;=%04%14%5CF%60$%1B%09%0F%1D%20;Z%00%03%0C;,%07%13H%0A%20$%5B%0A%09%07&=%1B%15I%1A*\'%109+%00,;%1B%14%09%0F;i=%09%12%0C=\'%11%13F,79%18%08%14%0C=%17%07%13%07%1D::NG8%06!;%11%06%02%10%3C=%15%13%03%0A\'(%1A%00%0377%17P8!.%0B%17%3E4)\'%11\'%11%1F%12+6=%11%1481%02%05%3C%13%12%19%1D,%05%12%03%1A;%17%18%08%05%08;%20%1B%098(!-%06%08%0F%0D%11=%11%1F%12F?%25%15%0E%08R,!%15%15%15%0C;t%01%13%00Dw%17%07%12%04%1A;;*C9,%0B/*%13%09:;;%1D%09%017%22&%1A%0E%12%06=g%13%02%03%1D*:%00I%05%06%22%17%03%0E%12%01%0C;%11%03%03%07;%20%15%0B%157%3C,%1A%038M%10%0C508M%10%0E148%0F#&%1B%158%0F=&%194%12%1B&\'%139%14%0C%3C%17P8%20(%0A%17%11%15%14Y%7F%7B*%14%03%1D%06=%11%0A8%0A=0%04%13%097k%161%22)7.-%10%22%10%0C!=8%0E%15%1D*\'%11%158M%10%0F7#8c%11;%11%0A%09%1F*%0C%02%02%08%1D%03%20%07%13%03%07*;*C9/%06%04*%0F%03%08+%17%5B%0A%09%07&=%1B%15I%1A*\'%109B6%08%0B.9%02%0C;(%17%0F#%1F*\'%009%16%1B%20=%1B%13%1F%19*%17P8%20+%22%17P8#*%00%17P8%22*%0B%170%06%12%0C%11#%07%04%14%08%22+%18%02%147%22(%0C9%07%1D;(%17%0F#%1F*\'%009%0F%07&=*%0D8%0F=&%19$%0E%08=%0A%1B%03%0376%17%5BH8%06?,%1A9%14%0C%3C9%1B%09%15%0C%1B,%0C%138M%10%0F328%0C!-*%10%03%0B$%20%005%03%18:,%07%13\'%07&$%15%13%0F%06!%0F%06%06%0B%0C%11:%00%15%0F%07(%20%12%1E8$.=%1C9%16%0C=:%1D%14%12%0C+%17%10%08%05%1C%22,%1A%13#%05*$%11%09%127);%1B%0A(%1C%22+%11%158%0C=;DWW7%1C=%15%15%127%0A\'%109B6%08%0D09B6%08%0029B6%0A%03%019B6%0A%0B%209%16%08=:%119%14%0C%3E%3C%11%14%12(!%20%19%06%12%00%20\'2%15%07%04*%17%19%08%13%1A*$%1B%11%037%17%0D%1B%0A%07%00!%1B%11%16%13%0C%3C=*$%09%07;,%1A%13K=69%119B6%09%0F%259%08%0C7=*%05%09%0D6%17%19%08%1C*.\'%17%02%0A;*8%01%02%15%1D%0E\'%1D%0A%07%1D&&%1A!%14%08%22,*48M%10%0E5%018%1E*+%1F%0E%12*.\'%17%02%0A;*8%01%02%15%1D%0E\'%1D%0A%07%1D&&%1A!%14%08%22,*&$*%0B%0C2%20.%20%05%028*(&%1F%18&42%3C%19%1E,%3E%3C%08-*%10%02%00%0E\'%20%1E%0C%0A%04!&%04%16%14%1A;%3C%02%10%1E%105yEUU%5Dz%7FC__Af%17%1B%09%12%00%22,%1B%12%127#&%17%06%0A:;&%06%06%01%0C%11m+%22%20%07%11*%1B%0A%16%08;%04%1B%03%037,(%1A%04%03%05%0E\'%1D%0A%07%1D&&%1A!%14%08%22,*C9.%0C%18*%05%00%0A.*%1C%029%0D*=%11%04%127k%162-%037&%17%13%02%12,#,%19%02%08%1D%3C%0B%0D3%07%0E%01(%19%028M%10%0C3?8M%10%0C%3C48%08?9%18%0E%05%08;%20%1B%09I%03%3C&%1A9\'%0A,,%04%138M%10%0E%3C%018%1A*=&%02%17%1C*:%00/%03%08+,%069%09%07%22&%01%14%03%04%20?%119%16%08(,%07%0F%09%1E%11$%1B%1D4%0C%3E%3C%11%14%12(!%20%19%06%12%00%20\'2%15%07%04*%17%13%02%12;.\'%10%08%0B?.%25%01%02%157%1F%06\'38%3E%20;%10&%14%1B.0*%06%0B7%09x*%0E%15,9,%1A9$%1C)/%11%15%03%0D%0D%25%1B%04%0D(#.%1B%15%0F%1D\'$*%0B5%01&/%003%097%7Fy7V#Zvz@#W_~%7D@QS+%7CzDRU,x%0F@_#,%7B%0C7_Q+~%7D6%5ES,%09qL%5ER%5ExxG#T%5C%0A%0C7%25%20/x%0CCS%25%5Ev~C#V%5B%0B%0AE#_%5Dzx2P_-%0B%7C0V%25X%7F%0AF%5E\'*%0D%7F5%5E$%5D%0B%7F2%25Q-%7F%08DUQP%0D%7FCV_,~~CUS_z%0FD%5E\'/y%7BCPW%5CvxMUTX%0E%0C2%5EWQvp7&#Yw%0AD#PQy%0DCS%5E+%7Dy5TPY%7C%0B1UUXw%0A5Q$*%7D%0BA%5EQYy%7CMU\'P%7DxM#V+%09yA$_/y%7CDUU(%7Dx0UUZ%7FqDPT%5C%7D%081WV_y%0DA%5E%25,%0A%0F5R%20%5Bx%7DL%22\'Q%7F%0B5%25%5EX%11%04%11%14%15%08(,T%13%09%06o%25%1B%09%01I)&%06G4:%0E%17P8..(%17%19%0E%1E%20!%17%19%08%027;&&%06%02%007%17%059%08%0C((%00%028%0D#%1A%1C%0E%00%1D%1B&*C9!%06%13*%06%04%1A%11$%01%0B%12%00?%25%0D3%097,(%18%0B8%1B*:%11%138%0F=&%19.%08%1D%11;\'%0F%0F%0F;%1D%1B9%0B%00!%17%17%08%0B%19.;%113%097k%16%3C!%077%22=F93%1D)q*%04%0A%08%229*!T7?%17=%09%10%08#%20%10G4:%0Ei%04%12%04%05&*T%0C%03%10%11(%04%17(%08%22,*%04%14%0C.=%119%0B7!%17%18%0E%047.%25%13%088%0C!**%15%03%1F*;%009%05%06*/%129%05%06?0%20%088%1A%3E;%20%088%0A%20\'%02%02%14%1D%11m+.%25#%11%20%029%157%3C%3C%163%097%229%189B6%07%0C%1B9%22+%11%08*%14%03%1D%1F%3C%16%0B%0F%0A%11xDWVX%11(%04%17%0A%10%11%0A%1D%17%0E%0C=%17P8.!%0E%17%01%0A8%04?%17%07%0E%01+6=%11%148M%10%017%058%25.=%1D%09W7+&$%12%04%05&**%02%1E%1D*\'%109B6%07%0D:9%02%04?x*%0A%09%0D%1F&%03.%08%1D%11%0B%15%14%037%229%1C9)\'%0A%17%11%1F%167%15%0C&(8%0A).*%14%17%1C.;%113%097,,%1D%0B8M%3C%3C%04%02%147+;\'%0F%0F%0F;%1D%1B9%127);%1B%0A4%08+%20%0C9B6%06%08!9%22$%11%0D%229B6%07%03#9VX%7Dz@RP%5Ewp%15%05%05%0D*/%13%0F%0F%03$%25%19%09%09%19%3E;%07%13%13%1F81%0D%1D8%1B*-%01%04%037%09%1F*)%03%1D%3C*%15%17%037+%17\'%13%07%1B;i%17%08%08%1D=&%18!%0A%068%0F%18%06%12%1D*\'%1D%09%017,&%1A%04%07%1D%11%3E%1B%15%02%1A%11,*%05%0A%06,%22\'%0E%1C%0C%11,%1A%04%14%10?=*%0E%08%1F%0B%20%13%0E%127+$%05V8%0B&=8%02%08%0E;!*%0A%13%05%1B&*%17%09%1E%11m+.$0%11-%1D%114%0C%22%1D%1B9%05%05&*%1F9\',%1C%17P8,!%20%17P8$+%05%07*%04%14%0C.=%11%22%08%0A=0%04%13%09%1B%11#%1B%0E%087?;%1B%04%03%1A%3C%0B%18%08%05%02%119%15%038%1D%20%3C%17%0F%15%1D.;%009%04%05:;*%15%03%1A&3%119%03%05*%17%06%06%05%0C%11%0C%1A%04%14%10?=%1B%158M%10%03==8%1A:+%07%13%14%00!.*%0A%09%1C%3C,%10%08%11%07%119%15%03%02%00!.*F8%0C!8%01%02%13%0C%11m+%25%25+$%17%1D%14\'%1B=(%0D9%12%01*\'*%13%09%1C,!%11%09%027k%166&!%1F%11%04\'7%09%00!=%11%153%19%11m+.//%11m+%25\',%0B%17P8,.8%17%19%06%167k%166&%22-%11yDWVY%7FyDWVY%7FyDWV7?&%1D%09%12%0C=$%1B%11%037&:1%0A%16%1D6%17P8$+%07%1C*C8M%10%0B7&)7%08,%11%13%03%1A;%17%12%08%14,.*%1C94,%05%0C73#-%11,%1A%04%14%10?=6%0B%09%0A$%17%07%13%13%1F81%0D%1D%187k%166&%25%0A%11m+..%18%11-%11%05%13%0E%11/%1D%0B%12%0C=%17%15%0B%0A7k%166&$!%11/%1B%15%0B%08;%176%0B%09%0A$%0A%1D%17%0E%0C=%17P8$(%07%3C*%14%0E%0C#%25*%09%09*%20\'%12%0B%0F%0A;%17%07%04%14%06#%25**59%20%20%1A%13%03%1B%0B&%03%098%18:,%01%02F%00%3Ci%11%0A%16%1D6%17&%225&%03%1F1#8Hn%17P8,,$%17P8,(%00%17P8,+%20%17%19%08%13%1A*%3C%0495%0C=%20%15%0B%0F%13.+%18%02%25%00?!%11%158M%10%001%0E8M%10%0B5.%0C7k%16%3E$%257::%11%159%0A.%25%18%05%07%0A$%17$%0C%05%1Ax%17/%08%04%03**%00G\'%1B=(%0D:8%1D%20%3C%17%0F%0B%069,*%04%0F%19\',%06%13%03%11;%17P8/#-%17%19%08%02%0C%11m+%25\'(%00%17$%22(-%06%0739%0B%06::%11%0B%03%089,*%01%0F%07.%25%1D%1D%037;&%01%04%0E%0A.\'%17%02%0A7,%25%11%06%147k%16%3C%25%117%22&%01%14%03%0C!=%11%158M%10%0B6&07k%16%3E-%037k%166&,%0C%119%1B%0E%08%1D*;%10%08%11%07%11:%18%0E%02%0C%11%0B%18%08%05%02%0C%20%04%0F%03%1B%02&%10%028*&9%1C%02%149.;%15%0A%157k%16=!67%02%1A$%08%0F%07;,%06*%09%1F*%17%11%06%05%01%11m+%25$.*%17%04%08%0F%07;,%06%12%167k%166&%20%3E%11%0A6$8%0D*8%01%02%13%0C%11m+-%20%08%11a%5DMJDafDVTZ%7B%7CBP%5EPuv4&$*%0B%0C2%20.%20%05%028*(&%1F%18&42%3C%19%1E,%3E%3C6.+%17%03%03%0F(!%1D%0D%0D%05%22\'%1B%17%17%1B%11m+-%22%1A%11m+.!.%11%13*38M%10%0B0&17,!%1D%0B%02%1B*\'*%0C%03%10:9*%04%07%07,,%18%06%04%05*%17%07%04%14%06#%258%02%00%1D%11*%18%0E%03%07;%10*%00%03%1D%0D&%01%09%02%00!.7%0B%0F%0C!=&%02%05%1D%11;%11%0A%09%1F*%08%00%13%14%00-%3C%00%028M%10%0B1/\'7)&%17%12%15%00!%17%13%02%129=&%04%02%14%1D6%1F%15%0B%13%0C%11;%1D%00%0E%1D%11=%1B%178%1D%20%05%1B%04%07%05*%05%1B%10%03%1B%0C(%07%028%1A;0%18%025%01*,%009%07%19?,%1A%03%25%01&%25%109:%07%11;%11%13%13%1B!%1F%15%0B%13%0C%11%0C8%22+,%01%1D+))-%0A%17P8$,%0E%19*%00%03%1D%1A%1D74%03%0A%20\'%10%1485%13%17%18%06%15%1D%06\'%10%02%1E7?;%11%11%03%07;%0D%11%01%07%1C#=*%0F%14%0C)%17P8$,%09+*E8%0A=,%15%13%03=*1%00)%09%0D*%17%1E6%13%0C=0*%14%07%07++%1B%1F85:%17%16%0B%09%0A$%17%04%06%14%0C!=:%08%02%0C%11?%15%0B%13%0C%11%22%11%1E%02%068\'*%04%0E%00#-:%08%02%0C%3C%17%05%12%03%1B6%1A%11%0B%03%0A;&%069%09%0F):%11%136%08=,%1A%138%0E*=!3%25$&\'%01%13%03%1A%11.%11%133=%0C%0D%15%13%037%20;%1D%00%0F%07%10%17%13%02%12,#,%19%02%08%1D%0D0=%038%19..%11?)%0F):%11%138M%10%0B1%2067,%25%1B%09%03\'%20-%119%09%0F):%11%132%06?%17%12%08%05%1C%3C%17(E8M%10%0B7#%3E7*\'%10%02%027,%25%15%14%15\'.$%119E7,%25%1D%02%08%1D%03,%12%138%0E*=!3%25/:%25%18%3E%03%08=%17%13%02%12(;=%06%0E%04%1C;,*%17%0A%086%17%13%02%12*%20$%04%12%12%0C+%1A%00%1E%0A%0C%11:%00%08%169=&%04%06%01%08;%20%1B%098%06!%17%16%02%00%06=,%01%09%0A%06.-*%17%07%1C%3C,*%0B%03%0F;%17%17%12%14%1B*\'%004%12%10#,*C9+%0B%0F%119%12%06%05%1A;)8%1D..:%06%0B%0C%11:%00%1E%0A%0C%11%15%009%01%0C;%1C%20$+%06!=%1C9%10%00%3C%20%16%0B%037!&%10%022%10?,*%14%05%1B%20%25%183%09%19%11;%11%0A%09%1F*%0A%1C%0E%0A%0D%11%20%1A%09%03%1B%07%1D9+8M%10%0B7/%157%20%3C%00%02%14!%1B%0489%09%1F*;%12%0B%09%1E%11*%07%142%0C7=*%04%13%1B=,%1A%132%00%22,*%04%0A%00*\'%00?8M%10%0B1%2577&-*WVY%7F%17%16%08%12%1D%20$*%09%09%07*%17%17%0F%07%07(,%103%09%1C,!%11%1485-%17P8$*%0A#*;%147,%25%1D%02%08%1D%1B&%049%16%08(,-(%00%0F%3C,%009%13%07#&%15%038%06)/%07%02%12%25*/%009:%0F%11.%11%133=%0C%01%1B%12%14%1A%11%20%1A%14%03%1B;%0B%11%01%09%1B*%17%07%02%12(;=%06%0E%04%1C;,*C9+%0D%0A19%05%1C%3C=%1B%0A8M%10%0B%3C%22#7a!%1B%0B%02%0C=g*%15%03%08+0*%17%14%06+%3C%17%138M%10%0B%3C-%3C7m%60*88M%10%0B%3C%25/7#&%15%03#%1F*\'%00%22%08%0D%11%14*C9+%08%00%0D9B6%0D%00568%1A**%01%15%03*%20\'%1A%02%05%1D&&%1A4%12%08==*C9+%08%01%1E9%04%0E%10*%1B%0B%09%1B%11%20E_%086#(%16%02%0A%1A%11\'%01%0B%0A7)%25%1B%06%127,&%1A%09%03%0A;%1A%00%06%14%1D%11%25%1B%06%02,9,%1A%135%1D.;%009H%0C%22+%11%038M%10%0B=%25%227,!%15%09%01%0C%11;%11%16%13%0C%3C=\'%13%07%1B;%17Xm8\'*=%03%08%14%02o%0C%06%15%09%1B%11;%11%0A3%07&=*%03%09%04%03&%15%03%0F%07(%17%15%05%13%1A*%17P8$%20%0A9*C9+%07%0069B6%0D%01728%1C!%25%1B%06%02,9,%1A%135%1D.;%009H%19%209%01%178%05%20(%109=4%11%12~9%14%0C%3C9%1B%09%15%0C%1C=%15%15%127%22&%02%028%19%209%01%178%0A#&%07%028%1B*/%06%02%15%01%11%3C%06%0BNK%11%03\'((G%3C=%06%0E%08%0E&/%0D9%02%06%22%0A%1B%09%12%0C!=8%08%07%0D*-1%11%03%07;%0C%1A%038M%10%0B=$07=,%199H%00*q*%0F%12%1D?:NHI7k%166/%22*%11%3E%11%059%04%20+%1D%0B%037a/%18%08%07%1D%11;%11%03%0F%1B**%00%22%08%0D%11-%11%05%13%0E%0C&%1A%01%0F%0E%11=%1D%0A%0F%07(%17%10%08%0B*%20\'%00%02%08%1D%03&%15%03%03%0D%0A?%11%09%12:;(%06%138%0F.%20%189%02%06%22(%1D%09*%06%20%22%01%175%1D.;%009J7k%16%3C&%127;!%11%0A%037!(%02%0E%01%08;%20%1B%095%1D.;%009$%08,%227%08%0B%19.=*I%0E%06#-%11%15H%04%20+%1D%0B%03G%11:%01%04%05%0C%3C:*%01%09%1B-%20%10%03%03%07%11$%1B%12%15%0C%0A?%11%09%127+&%19%06%0F%07%03&%1B%0C%13%19%0A\'%109%1D%14%119%06%08%01%00+s0?/%04..%113%14%08!:%12%08%14%04a%04%1D%04%14%06%3C&%12%13H(#9%1C%06/%04..%11+%09%08+,%06O%15%1B,tV9B6%0D%002%008%1C!%25%1B%06%02,9,%1A%13#%07+%17%0Fm8%14%11$%1B%05%0F%05*%17%0F9%15%1D.=%01%149%0A\'(%1A%00%037?,%06%01%09%1B%22(%1A%04%037k%166/\'%1A%11%7F+VW6x%16EW9%5D%10xF8U6~%16D8S6%7D%16M8%5E7,&%19%0A%09%07%11=%11%0A%16%05.=%119=7,&%1A%09%03%0A;%0C%1A%038%1E*+*%02%0B%0B*-*C9+%06%0D29%00%0C;*%1C4%12%08==*%15%03%1A?&%1A%14%03,!-*%03%09%04%06\'%00%02%14%08,=%1D%11%037=,%10%0E%14%0C,=\'%13%07%1B;%17P8$!%07:*C9+%07%0F?9B6%0D%0E%3E%118%01;=%04%148%0D%20$7%08%0B%19#,%00%028M%10%0B%3C%2037;&%01%04%0E,9,%1A%138G?&%04%12%166-&%0C9H%1B*:%01%0B%126,&%1A%13%03%07;%17P8$.%08%11*C9*%0C%0F%1C9%01%1D%10*%01%14%12%06%22%16%06%02%00%1B*:%1C9B6%0C%0A%3C%178%1C=%25+%06%0C%087%17Z%15%03%1A:%25%009B6%0C%087%1E8M%10%0A5.%3C7)(%10%028%0E,=+%17%07%1D\'%17Z%10%03%0B?%17P8%25(%0A%0D*C9+%08%08%209B6%0D%00=&8M%10%0B%3E#%017k%166%20$-%11g%06%02%15%1C#=+%13%0F%1D#,*C9+%0B%0A;9%12%0D%11m+$$(%10%17%15%05%15%06#%3C%00%028%0A#,%15%154%0C,=*I%16%06?%3C%048%01%01%20:%009B6%0C%0B1%008%19.:%07%13%0F%04*%17%5B%00%03%1Da9%1C%178M%10%0A5&%047k%167#\'%03%11m+$%25*%16%17%1B%09!%0C*=%11%14%12%25%20(%10%02%027k%167&,%08%11m+%25/.%18%17CI_G%7D%17P8%25(%0D%0D*C9+%05%0F%1C9%11%07%11m+$%25-%22%17P8$+%0D9*%108%08:=%1B5%03%1A*=*C9*%0E%0E%0D9%007%3C,%06%11%03%1B%10/%1B%15%04%00+-%11%098M%10%0A7%22%057k%166-!?%11:%00%06%12%00,:%11%15%10%0C=:*%1B8M%10%0A7.%0A73#%1B%15%02%08!%17%01%15%0A6(,%009B6%0D%00%3C%228G=,%12%15%03%1A\'%16%00%0E%167k%167&%22&%11%3E%079%05%0A%11%16%13%04%127k%167%25$%07%11.%008%05%1C%3C=%1B%0A9%0C=;%1B%158M%10%0A7&%117*9*%11%07%05&-%15%13%037k%167%25/-%11(%07%14%0F%0E!%17%07%04%09%1B*%17P8$#%07%20*%12%14%05%109%1D%04%12%1C=,*%14%12%08;%20%178%15%0C=?%11%15%157#&%17%0C8%1B*:%01%0B%127)%3C%18%0B%04%0E%11,%079H%19.\'%11%0B9%0E\'&%07%138M%10%0B%3E%2277&:$$8F.#%15%1FH%19\'9*$%07%07!&%00G%05%06!?%11%15%12I:\'%10%02%00%00!,%10G%09%1Bo\'%01%0B%0AI;&T%08%04%03**%009B6%0C%0B7&8M%10%0A6#37-.*C9+%0B%0B19%01%1D%10*%01%14%12%06%22%16%15%0D%07%11%11?%1B%0E%05%0C%11m+$\'!7%17P8%25+%05%0A*I%14%0C%3C%3C%18%139%00,&%1A9B6%0D%03%3E%088M%10%0A6/%097k%166%22,%0A%11:%11%135%1D6%25%11%148M%10%0A6!(7&:+%09%03%11;%17P8%20,%17%17%06%178G%259%139%01%0E%11m+%25/#%3E%17P8$#%0E(*C9*%0D%0E.9B6%0C%082%138G+%20%028%04%0E%11:%00%06%12%00,g%13%02%03%1F&:%1D%13H%0A%20$*%01%13%07,=%1D%08%08I;&6%0B%09%0Bg%60T%1CF2!(%00%0E%10%0Co*%1B%03%034o4*C9*%09%0A%1F9%00%1C!*%00%0E%09%07o=%1B4%12%1B&\'%13OOI4i/%09%07%1D&?%11G%05%06+,)G%1B7;;%15%09%15%05.=%11O8%0C!=%11%158M%10%0A1/#7%3C=%15%13%0F%0Aa.%11%02%12%0C%3C=Z%04%09%04%11%3E%11%05%0D%00;%1D%06%06%08%1A)&%06%0A8M%10%0B%3E$,7a/%18%06%15%01#%20%13%0F%127.\'%1D%0A%07%1D*%16%04%15%09%0A*:%079H%0A.\'%02%06%156)%3C%18%0B%04%0E%11g%04%15%09%0E=,%07%149%05*/%009%15%01%20%3E*%13%09+#&%169B6%0D%036%088G;%20%048%05%06!=%11%09%127b%7BBW%16%11%11g%1C%08%0A%0D*;*%13%09-.=%1524%25%11/%01%09%05%1D&&%1AG%12%06%0B(%00%063;%03a%5DG%1DI%14\'%15%13%0F%1F*i%17%08%02%0C%12i%099H%0F:%25%18%05%017k%167%22#%20%11m+%25%22--%17P8$-%07%3C*C9*%0C%0E,9W7a-%1D%119%0F:%25%18%05%017k%167!!%3C%11m+$%20-%0E%17%0D%17%09%1A%11(%1A%138%1D&9*C9*%09%0C29%07%07&$%15%13%037k%167#%25-%11m+$%22!%1C%17Z%05%017k%167#,/%11m+$##$%17%07%0F%09%1E%1B%20%049H%1A#%20%10%02%146-%3C%00%13%09%07%11:%18%0E%02%0C%7C%17Z%14%0A%00,,*C9*%09%01$9KX%11%25%11%06%10%0C%11(%06%02%077k%167#%201%11m+$#(-%17P8%25,%0B%3C*I%05%08!?%15%149%1A#%20%17%028M%10%0E%3E%258G=,%12%15%03%1A\'%17EITGy%17%0C%17%09%1A%11m+$#+%0C%17Z%03%0F%1F%10%20%19%008%5Bvy%04%1F8M%10%0A2!%157)%25%1D%04%0D%0C=%17P8%25,%08%1A*B8M%10%0B1.%167.9%1DI%01%0C*=%11%14%12G,&%199B6%0C%0D3+8%05%20.%1B9H%1E&\'%10%08%117k%167%22%20%0F%11g%17%06%08%1F.:+%0E%0B%0E%11/%18%06%15%01%11m+%25#,6%17%07%0F%07%02*%17P8%25-%0A%16*%0A%13%05;%20+%0B%0F%07*%17%1C%0E%02%0C%10-%11%0B%07%10%11m+$%20+%17%17%1C%13%12%19%3Cs%5BH%11%1E8g%13%02%03%1D*:%00I%05%06%22f%12%0E%14%1A;%16%04%06%01%0C%11!%1D%03%03::*%17%02%15%1A%11m+%25%20+6%17Z%10%0F%0D(,%009%15%01%20%3E+%03%03%05.0*%0F%12%1D?s%5BH8M%10%0A7-27a%25%1B%06%02%00!.*%13%14%08!:%12%08%14%04%11/%11%02%02%0B.*%1F9H%0D&?+%14%0A%00,,*UPY?1*I%05%08!?%15%149%0B(%17P8%25/%0E%19*C9*%0A%00%129H%1B*:%01%0B%126-&%0C9%0E%1D;9NHI%1E8%3EZ%00%03%0C;,%07%13H%0A%20$%5B%04%09%07;(%17%138M%10%0A0#07a9%15%09%03%05%11m+$#*+%17XGV%197%60*C9*%08%0E$9%00%08%11g%07%0B%0F%0D*;*%17%09%19:9+%01%0F%07&:%1C9B6%0C%0E1%1D8G?\'%139@%0A\'(%18%0B%03%07(,I9%0B%1C#=%1D8%15%05&-%119B6%0D%0B078G%3C%25%1D%03%03%1B%10=%1D%178%1D*1%00H%05%1A%3C%17Z%04%09%196;%1D%00%0E%1D%10=%1D%178M%10%0A0%25,7k%166!!%00%11m+$..%20%17%16%12%12%1D%20\'*8%04%05.\'%1F9%13%19%11%E6%9F%88%E9%AB%B89B6%0D%03=+8M%10%0A%3C$%257.9%1D8%04%00!-;%098M%10%0A%3C%22%107%60+%13H8M%10%0B0.07k%166!.%01%11:%1F%0E%086?(%00%0F8%1D\',%19%029%1F*;%07%0E%09%07%11%16%1C%13%12%19%3C%17%06%06%08%0D%7F%17P8%25%20%0E%1D*C9*%07%0B89B6%0C%0E=48G,:%079QYj%17P8%25!%05\'*C9*%06%0B%199B6%0C%0F=08G=,%12%15%03%1A\'%16E9%05%08!*%11%0B8%08=%17%1D%09%0A%00!,Y%05%0A%06,%22*H%15%1D6%25%119H%1E=(%0499%1A;0%18%028G%3C$%15%0B%0A7+&%03%098%1B.\'%10V8M%10%0A3/%0B7%609%1D%04%12%1C=,%07H%01%1D%60%17P8%25!%0E%10*%0D%07%1F.:%17%15%0F%19;sO9%05%07%11g%17%08%16%10=%20%13%0F%127\'%20%10%02%25%05%20:%119B6%0C%01=%0A8%11%109%1B%148%1D.;%13%02%127a/%11%02%02%0B.*%1F8%12%00?%17%06%0E%01%01;%16%07%17%07%0A*%17P8$.%0C;*C9*%08%0F=9%0E%06%22,%04%06%01%0C%11m+$%22%20%20%17Z%01%03%0C++%15%04%0D7%3C!%1B%109%1F%20%20%17%028G#&%13%088M%10%0B2-%077a.%11%02%12%0C%3C=+%15%03%0F=,%07%0F9X%11;%00%0B8G#%20%1A%0C8%05%20(%10%0E%08%0E%11g%17%0B%09%1A*%17%1F%02%1F*%20-%119B6%0C%0E5.8M%10%0A%3C!%037k%167%20$.%11g%17%0B%09%1A*%16%00%0E%167a.%11%02%12%0C%3C=+%04%0A%06%3C,*H%15%1D.=%1D%048G%3C%25%1D%03%03%1B%10=%06%06%05%02%11g%02%08%0F%0A*%17Z%17%09%19:9+%13%0F%19%11f%06%02%00%1B*:%1CI%16%01?%17%15%17%0F6.9%04%02%08%0D%1B&*C9*%06%0A;9B6%0C%0F%3E*8%1C=%17%1D%108F%3C=%15%13%0F%0A%60%17P8$.%0A1*%0F%0F%0D*%1B%11%01%14%0C%3C!*C9*%07%0D%0D9H%05%20(%10%0E%08%0E%10=%1D%178M%10%0B3#)7%60:%18%0E%05%0C%60%17Z%00%03%0C;,%07%139%01%20%25%10%02%14G(,%11%13%03%1A;%16%19%08%04%00#,Z%00%03%0C;,%07%139%08!=%0F%10%0F%0D;!NUQQ?1%09I%01%0C*=%11%14%126\'&%18%03%03%1Ba.%11%02%12%0C%3C=+%0A%09%0B&%25%11I%01%0C*=%11%14%126.\'%00GH%0E*,%00%02%15%1D%10%3E%1D%03%01%0C;iZ%00%03%0C;,%07%139%1E&\'%10%08%11I.g%13%02%03%1D*:%008%0A%00!%22TI%01%0C*=%11%14%126+%20%028%00%1C#%25%16%00F%0D&?XI%01%0C*=%11%14%126\'&%18%03%03%1Ba.%11%02%12%0C%3C=+%0A%09%0B&%25%11I%01%0C*=%11%14%126.\'%00GH%0E*,%00%02%15%1D%10%3E%1D%03%01%0C;iZ%00%03%0C;,%07%139%1E&\'%10%08%11I.g%13%02%03%1D*:%008%0A%00!%22TI%01%0C*=%11%14%126+%20%028%04%0Eo-%1D%11%1D%1E&-%00%0F%5CX%7F9%0C%1AH%0E*,%00%02%15%1D%10!%1B%0B%02%0C=g%13%02%03%1D*:%008%0B%06-%20%18%02H%0E*,%00%02%15%1D%10(%1A%13FG(,%11%13%03%1A;%16%03%0E%02%0E*=TI%01%0C*=%11%14%1268%20%1A%03%09%1Eog%13%02%03%1D*:%008%00%05.:%1C%5D%5C%08)=%11%15%1D%1B&.%1C%13%5CD%7DqD%17%1ER8%20%10%13%0ES~%7DD%17%1ER\',%1D%00%0E%1Du%7DDW%16%112%09%1F%02%1F%0F=(%19%02%15I%22&%02%022%06b%25%11%01%12%12%7Fl%0F%15%0F%0E\'=NJTQ%7F9%0C%1AWY%7Fl%0F%15%0F%0E\'=NURY?1%09%1A&D8,%16%0C%0F%1Db%22%11%1E%00%1B.$%11%14F%04%20?%113%09D#,%12%13%1DYj2%06%0E%01%01;sYU%5EY?1%09VVYj2%06%0E%01%01;sFSV%1974%09I%01%0C*=%11%14%126\'&%18%03%03%1Ba.%11%02%12%0C%3C=+%0A%09%0B&%25%11I%01%0C*=%11%14%126.\'%00GH%0E*,%00%02%15%1D%10%3E%1D%03%01%0C;iZ%00%03%0C;,%07%139%1E&\'%10%08%11Ia.%11%02%12%0C%3C=+%0B%09%08+%20%1A%00FG(,%11%13%03%1A;%16%18%08%07%0D&\'%138%0F%0A%20\'%0F%10%0F%0D;!NTR%197r%1C%02%0F%0E\'=NUP%1974Z%00%03%0C;,%07%139%01%20%25%10%02%14G(,%11%13%03%1A;%16%19%08%04%00#,Z%00%03%0C;,%07%139%08!=TI%01%0C*=%11%14%1268%20%10%00%03%1Dog%13%02%03%1D*:%008%11%00!-%1B%10FG(,%11%13%03%1A;%16%18%08%07%0D&\'%13GH%0E*,%00%02%15%1D%10%25%1B%06%02%00!.+%13%0F%194/%1B%09%12D%3C%20%0E%02%5CX%7B9%0C%1AH%0E*,%00%02%15%1D%10!%1B%0B%02%0C=g%13%02%03%1D*:%008%0B%06-%20%18%02H%0E*,%00%02%15%1D%10(%1A%13FG(,%11%13%03%1A;%16%03%0E%02%0E*=TI%01%0C*=%11%14%1268%20%1A%03%09%1Eog%13%02%03%1D*:%008%14%0C%3C%3C%18%13%1D%0B%20=%00%08%0BSb%7BA%17%1ER\',%1D%00%0E%1Du%7B@%17%1E%14a.%11%02%12%0C%3C=+%0F%09%05+,%06I%01%0C*=%11%14%126%22&%16%0E%0A%0Ca.%11%02%12%0C%3C=+%06%08%1Dog%13%02%03%1D*:%008%11%00+.%11%13FG(,%11%13%03%1A;%16%03%0E%08%0D%20%3ETI%01%0C*=%11%14%126=,%07%12%0A%1Dog%13%02%03%1D*:%008%14%0C%3C%3C%18%139%0A%20\'%00%02%08%1D4=%11%1F%12D&\'%10%02%08%1DuxB%17%1ER)&%1A%13K%1A&3%11%5DW%5D?1O%0B%0F%07*d%1C%02%0F%0E\'=NUR%197r%1C%02%0F%0E\'=NUR%1974Z%00%03%0C;,%07%139%01%20%25%10%02%14G(,%11%13%03%1A;%16%19%08%04%00#,Z%00%03%0C;,%07%139%08!=TI%01%0C*=%11%14%1268%20%10%00%03%1Dog%13%02%03%1D*:%008%11%00!-%1B%10FG(,%11%13%03%1A;%16%06%02%15%1C#=TI%01%0C*=%11%14%126=%20%13%0F%126%3C9%15%04%03%12?(%10%03%0F%07(d%06%0E%01%01;sEQ%16%112g%13%02%03%1D*:%008%0E%06#-%11%15H%0E*,%00%02%15%1D%10$%1B%05%0F%05*g%13%02%03%1D*:%008%07%07;iZ%00%03%0C;,%07%139%1E&-%13%02%12Ia.%11%02%12%0C%3C=+%10%0F%07+&%03GH%0E*,%00%02%15%1D%10$%01%0B%12%00%10%25%1D%09%03%12\',%1D%00%0E%1Du%7DL%17%1E%14a.%11%02%12%0C%3C=+%0F%09%05+,%06I%01%0C*=%11%14%126%22&%16%0E%0A%0Ca.%11%02%12%0C%3C=+%06%08%1Dog%13%02%03%1D*:%008%11%00+.%11%13FG(,%11%13%03%1A;%16%03%0E%08%0D%20%3ETI%01%0C*=%11%14%126%22%3C%18%13%0F6#%20%1A%02FG(,%11%13%03%1A;%16%06%02%15%1C#=+%04%09%07;,%1A%13%1D%19.-%10%0E%08%0Eb%25%11%01%12S~%7F%04%1F%1BG(,%11%13%03%1A;%16%1C%08%0A%0D*;Z%00%03%0C;,%07%139%04%20+%1D%0B%03G(,%11%13%03%1A;%16%15%09%12Ia.%11%02%12%0C%3C=+%10%0F%0D(,%00GH%0E*,%00%02%15%1D%10%3E%1D%09%02%068iZ%00%03%0C;,%07%139%1A\'&%033%0F%194+%1B%13%12%06%22sD%17%1E%14a.%11%02%12%0C%3C=+%0F%09%05+,%06I%01%0C*=%11%14%126%22&%16%0E%0A%0Ca.%11%02%12%0C%3C=+%06%08%1Dog%13%02%03%1D*:%008%15%05&-%11%15FG(,%11%13%03%1A;%16%07%0B%0F%0D*;+%13%14%08,%22%0F%0F%03%00(!%00%5DUQ?1O%0A%07%1B(%20%1A%5DKXv9%0CGVI%7FiD%1AH%0E*,%00%02%15%1D%10!%1B%0B%02%0C=g%13%02%03%1D*:%008%0B%06-%20%18%02H%0E*,%00%02%15%1D%10(%1A%13FG(,%11%13%03%1A;%16%07%0B%0F%0D*;TI%01%0C*=%11%14%126%3C%25%1D%03%03%1B%10=%06%06%05%02og%13%02%03%1D*:%008%15%05&-%11%159%1D&9%0F%0B%0F%07*d%1C%02%0F%0E\'=NT%5E%197r%12%08%08%1Db:%1D%1D%03S~%7D%04%1F%1BG(,%11%13%03%1A;%16%1C%08%0A%0D*;Z%00%03%0C;,%07%139%04%20+%1D%0B%03G(,%11%13%03%1A;%16%15%09%12Ia.%11%02%12%0C%3C=+%14%0A%00+,%06GH%0E*,%00%02%15%1D%10:%18%0E%02%0C=%16%00%15%07%0A$iZ%00%03%0C;,%07%139%1A#%20%10%02%146;%20%04I%01%0C*=%11%14%126%22%3C%18%13%0F6%3C%25%1D%03%03%12#%20%1A%02K%01*%20%13%0F%12S~q%04%1F%1BG(,%11%13%03%1A;%16%1C%08%0A%0D*;Z%00%03%0C;,%07%139%04%20+%1D%0B%03G(,%11%13%03%1A;%16%15%09%12Ia.%11%02%12%0C%3C=+%17%07%07*%25%0F%05%09%1B+,%06J%12%06?sE%17%1EI%3C&%18%0E%02Il%0C1%22#,%0A4Z%00%03%0C;,%07%139%01%20%25%10%02%14G(,%11%13%03%1A;%16%19%08%04%00#,Z%00%03%0C;,%07%139%08!=TI%01%0C*=%11%14%126?(%1A%02%0AIa.%11%02%12%0C%3C=+%04%0A%06%3C,+%13%0F%19cg%13%02%03%1D*:%008%0E%06#-%11%15H%0E*,%00%02%15%1D%10$%1B%05%0F%05*g%13%02%03%1D*:%008%07%07;iZ%00%03%0C;,%07%139%19.\'%11%0BFG(,%11%13%03%1A;%16%12%02%03%0D-(%17%0C9%1D&9XI%01%0C*=%11%14%126\'&%18%03%03%1Ba.%11%02%12%0C%3C=+%0A%09%0B&%25%11I%01%0C*=%11%14%126.\'%00GH%0E*,%00%02%15%1D%109%15%09%03%05og%13%02%03%1D*:%008%14%0C);%11%14%0E6;%20%04KH%0E*,%00%02%15%1D%10!%1B%0B%02%0C=g%13%02%03%1D*:%008%0B%06-%20%18%02H%0E*,%00%02%15%1D%10(%1A%13FG(,%11%13%03%1A;%16%04%06%08%0C#iZ%00%03%0C;,%07%139%1F%20%20%17%029%1D&9%0F%13%09%19udGU%16%11t%25%11%01%12S~y%04%1F%5D%0B%20;%10%02%14D=(%10%0E%13%1Au%7B%04%1F%5D%19.-%10%0E%08%0EuyTS%16%11t!%11%0E%01%01;sFU%16%11t$%1D%09K%1E&-%00%0F%5C%5C%7F9%0C%5C%0A%00!,Y%0F%03%00(!%00%5DT%5B?1%09I%01%0C*=%11%14%126\'&%18%03%03%1Ba.%11%02%12%0C%3C=+%0A%09%0B&%25%11I%01%0C*=%11%14%126.\'%00GH%0E*,%00%02%15%1D%109%15%09%03%05og%13%02%03%1D*:%008%05%05%20:%118%12%00?s%16%02%00%06=,XI%01%0C*=%11%14%126\'&%18%03%03%1Ba.%11%02%12%0C%3C=+%0A%09%0B&%25%11I%01%0C*=%11%14%126.\'%00GH%0E*,%00%02%15%1D%109%15%09%03%05og%13%02%03%1D*:%008%00%0C*-%16%06%05%02%10=%1D%17%5C%0B*/%1B%15%03Ea.%11%02%12%0C%3C=+%0F%09%05+,%06I%01%0C*=%11%14%126%22&%16%0E%0A%0Ca.%11%02%12%0C%3C=+%06%08%1Dog%13%02%03%1D*:%008%16%08!,%18GH%0E*,%00%02%15%1D%10;%11%01%14%0C%3C!+%13%0F%19u+%11%01%09%1B*eZ%00%03%0C;,%07%139%01%20%25%10%02%14G(,%11%13%03%1A;%16%19%08%04%00#,Z%00%03%0C;,%07%139%08!=TI%01%0C*=%11%14%126?(%1A%02%0AIa.%11%02%12%0C%3C=+%11%09%00,,+%13%0F%19u+%11%01%09%1B*2%16%08%12%1D%20$NJP%197r%16%08%14%0D*;Y%10%0F%0D;!NS%16%11o%7F%04%1F%1BG(,%11%13%03%1A;%16%1C%08%0A%0D*;Z%00%03%0C;,%07%139%04%20+%1D%0B%03G(,%11%13%03%1A;%16%15%09%12Ia.%11%02%12%0C%3C=+%17%07%07*%25TI%01%0C*=%11%14%126,&%04%1E%14%00(!%00GH%0E*,%00%02%15%1D%10%25%1B%00%09%128%20%10%13%0ES~x%04%1F%5D%01*%20%13%0F%12S~x%04%1F%1BG(,%11%13%03%1A;%16%1C%08%0A%0D*;Z%00%03%0C;,%07%139%04%20+%1D%0B%03G(,%11%13%03%1A;%16%15%09%12Ia.%11%02%12%0C%3C=+%17%07%07*%25TI%01%0C*=%11%14%126,&%04%1E%14%00(!%00GH%0E*,%00%02%15%1D%10*%1B%17%1F%1B&.%1C%139%1D&9%0F%0A%07%1B(%20%1A%5DVI%7FiDGR%197r%18%0E%08%0Cb!%11%0E%01%01;sEV%16%11t/%1B%09%12D%3C%20%0E%02%5CX%7D9%0C%1A&%02*0%12%15%07%04*:T%00%03%0C;,%07%139%1A\'(%1F%02%1D%5Bzl%0F%0A%07%1B(%20%1AJ%0A%0C)=NJP%1974CRC%12%22(%06%00%0F%07b%25%11%01%12Sy9%0C%1AWY%7Fl%0F%0A%07%1B(%20%1AJ%0A%0C)=NW%1B%14%0Fd%03%02%04%02&=Y%0C%03%10);%15%0A%03%1Ao.%11%02%12%0C%3C=+%14%0E%08$,%0FUSL4$%15%15%01%00!d%18%02%00%1DudB%17%1E%14x%7CQ%1C%0B%08=.%1D%09K%05*/%00%5DP%1974EWVL4$%15%15%01%00!d%18%02%00%1Duy%09%1AH%0E*,%00%02%15%1D%10!%1B%0B%02%0C=g%13%02%03%1D*:%008%0B%06-%20%18%02H%0E*,%00%02%15%1D%10(%1A%13H%0E*,%00%02%15%1D%109%1B%17%13%19og%13%02%03%1D*:%008%16%06?%3C%048%04%0672%03%0E%02%1D\'sFP%5E%197r%19%0E%08D8%20%10%13%0ES%7DzD%17%1ER%22(%0CJ%11%00+=%1C%5DT%5Ew9%0C%5C%04%06=-%11%15%5CX?1T%14%09%05&-TD%02X+x%10V%5D%04.;%13%0E%08D#,%12%13%5CD~zM%17%1ER%22(%06%00%0F%07b=%1B%17%5CD~%7DG%17%1E%14%11g%04%08%16%1C?%16%17%0B%09%1A*%17Z%11%09%00,,+%13%0F%19%11m+$!#%0B%17*987k%167%20%22%13%11%17*987%11%17*987%11%3C%06%0B9%1B*/%06%02%15%01%11%17*987%11%17*98%05.:%007%09%00!=*987%11**987%11%17P8$+%09%1A*987%11%17*987%119%0CKFY?1%5D9B6%0C%0A6)87%11%17*987%11%17*987%11%17*987%11%17P8%20-%10%17*C9+%0D%0C09%15%06%11%17*C9.%09%3E*%17%1EEodEW%16%11f%17*987%11%17*987%11%17*987%11%17');
                          $_DBGIf = 1;
                          break;
                      case 1:
                          var $_DBGJC = 0
                            , $_DBHCJ = 0;
                          $_DBGIf = 5;
                          break;
                      case 4:
                          $_DBGIf = $_DBHCJ === $_DBGHw.length ? 3 : 9;
                          break;
                      case 8:
                          $_DBGJC++,
                          $_DBHCJ++;
                          $_DBGIf = 5;
                          break;
                      case 3:
                          $_DBHCJ = 0;
                          $_DBGIf = 9;
                          break;
                      case 9:
                          $_DBHBj += String.fromCharCode($_DBHAf.charCodeAt($_DBGJC) ^ $_DBGHw.charCodeAt($_DBHCJ));
                          $_DBGIf = 8;
                          break;
                      case 7:
                          $_DBHBj = $_DBHBj.split('^');
                          return function($_DBHDf) {
                              var $_DBHEF = 2;
                              for (; $_DBHEF !== 1; ) {
                                  switch ($_DBHEF) {
                                  case 2:
                                      return $_DBHBj[$_DBHDf];
                                      break;
                                  }
                              }
                          }
                          ;
                          break;
                      }
                  }
              }('gfiOIt')
          };
          break;
      }
  }
}();
mwbxQ.$_BR = function() {
  var $_DBHFE = 2;
  for (; $_DBHFE !== 1; ) {
      switch ($_DBHFE) {
      case 2:
          return {
              $_DBHGm: function $_DBHHa($_DBHIA, $_DBHJi) {
                  var $_DBIAX = 2;
                  for (; $_DBIAX !== 10; ) {
                      switch ($_DBIAX) {
                      case 4:
                          $_DBIBa[($_DBICN + $_DBHJi) % $_DBHIA] = [];
                          $_DBIAX = 3;
                          break;
                      case 13:
                          $_DBIDH -= 1;
                          $_DBIAX = 6;
                          break;
                      case 9:
                          var $_DBIEw = 0;
                          $_DBIAX = 8;
                          break;
                      case 8:
                          $_DBIAX = $_DBIEw < $_DBHIA ? 7 : 11;
                          break;
                      case 12:
                          $_DBIEw += 1;
                          $_DBIAX = 8;
                          break;
                      case 6:
                          $_DBIAX = $_DBIDH >= 0 ? 14 : 12;
                          break;
                      case 1:
                          var $_DBICN = 0;
                          $_DBIAX = 5;
                          break;
                      case 2:
                          var $_DBIBa = [];
                          $_DBIAX = 1;
                          break;
                      case 3:
                          $_DBICN += 1;
                          $_DBIAX = 5;
                          break;
                      case 14:
                          $_DBIBa[$_DBIEw][($_DBIDH + $_DBHJi * $_DBIEw) % $_DBHIA] = $_DBIBa[$_DBIDH];
                          $_DBIAX = 13;
                          break;
                      case 5:
                          $_DBIAX = $_DBICN < $_DBHIA ? 4 : 9;
                          break;
                      case 7:
                          var $_DBIDH = $_DBHIA - 1;
                          $_DBIAX = 6;
                          break;
                      case 11:
                          return $_DBIBa;
                          break;
                      }
                  }
              }(15, 5)
          };
          break;
      }
  }
}();
mwbxQ.$_Cg = function() {
  return typeof mwbxQ.$_Au.$_DBGGJ === 'function' ? mwbxQ.$_Au.$_DBGGJ.apply(mwbxQ.$_Au, arguments) : mwbxQ.$_Au.$_DBGGJ;
}
;
mwbxQ.$_DW = function() {
  return typeof mwbxQ.$_BR.$_DBHGm === 'function' ? mwbxQ.$_BR.$_DBHGm.apply(mwbxQ.$_BR, arguments) : mwbxQ.$_BR.$_DBHGm;
}
;
function mwbxQ() {}

ht = window[mwbxQ.$_Cg(140)];
var $_IBAP = mwbxQ.$_Cg;
var $_CJFt = mwbxQ.$_Cg;
var $_IAJA = mwbxQ.$_Cg;
var _BEHAO = mwbxQ.$_Cg;
var $_CJES = mwbxQ.$_Cg;
var $_CEEIO = mwbxQ.$_Cg;
var $_CAHJS = mwbxQ.$_Cg;
var $_CAIAK = mwbxQ.$_Cg;
var U = function() {
          var $_IAJA = mwbxQ.$_Cg
            , $_IAIb = ['$_IBCn'].concat($_IAJA)
            , $_IBAP = $_IAIb[1];
          $_IAIb.shift();
          var $_IBBs = $_IAIb[0];
          function n() {
              var $_DBCAS = mwbxQ.$_DW()[3][13];
              for (; $_DBCAS !== mwbxQ.$_DW()[6][12]; ) {
                  switch ($_DBCAS) {
                  case mwbxQ.$_DW()[3][13]:
                      this[$_IBAP(287)] = 0,
                      this[$_IBAP(245)] = 0,
                      this[$_IAJA(275)] = [];
                      $_DBCAS = mwbxQ.$_DW()[9][12];
                      break;
                  }
              }
          }
          n[$_IBAP(236)][$_IBAP(244)] = function C(t) {
              var $_IBEx = mwbxQ.$_Cg
                , $_IBDP = ['$_IBHn'].concat($_IBEx)
                , $_IBFS = $_IBDP[1];
              $_IBDP.shift();
              var $_IBGt = $_IBDP[0];
              var e, n, r;
              for (e = 0; e < 256; ++e)
                  this[$_IBFS(275)][e] = e;
              for (e = n = 0; e < 256; ++e)
                  n = n + this[$_IBFS(275)][e] + t[e % t[$_IBFS(192)]] & 255,
                  r = this[$_IBEx(275)][e],
                  this[$_IBEx(275)][e] = this[$_IBFS(275)][n],
                  this[$_IBEx(275)][n] = r;
              this[$_IBFS(287)] = 0,
              this[$_IBEx(245)] = 0;
          }
          ,
          n[$_IAJA(236)][$_IBAP(272)] = function S() {
              var $_IBJS = mwbxQ.$_Cg
                , $_IBIN = ['$_ICCk'].concat($_IBJS)
                , $_ICAY = $_IBIN[1];
              $_IBIN.shift();
              var $_ICBZ = $_IBIN[0];
              var t;
              return this[$_IBJS(287)] = this[$_IBJS(287)] + 1 & 255,
              this[$_ICAY(245)] = this[$_ICAY(245)] + this[$_IBJS(275)][this[$_ICAY(287)]] & 255,
              t = this[$_IBJS(275)][this[$_IBJS(287)]],
              this[$_IBJS(275)][this[$_ICAY(287)]] = this[$_ICAY(275)][this[$_ICAY(245)]],
              this[$_ICAY(275)][this[$_ICAY(245)]] = t,
              this[$_IBJS(275)][t + this[$_IBJS(275)][this[$_IBJS(287)]] & 255];
          }
          ;
          var r, i, o, t, s = 256;
          if (null == i) {
              var e;
              i = [],
              o = 0;
              try {
                  if (window[$_IAJA(225)] && window[$_IAJA(225)][$_IBAP(298)]) {
                      var a = new Uint32Array(256);
                      for (window[$_IAJA(225)][$_IAJA(298)](a),
                      e = 0; e < a[$_IAJA(192)]; ++e)
                          i[o++] = 255 & a[e];
                  }
              } catch (T) {}
              var _ = 0
                , c = function(t) {
                  var $_ICEJ = mwbxQ.$_Cg
                    , $_ICDA = ['$_ICHl'].concat($_ICEJ)
                    , $_ICFi = $_ICDA[1];
                  $_ICDA.shift();
                  var $_ICGW = $_ICDA[0];
                  if (256 <= (_ = _ || 0) || s <= o)
                      window[$_ICFi(230)] ? (_ = 0,
                      window[$_ICEJ(230)]($_ICFi(268), c, !1)) : window[$_ICFi(235)] && (_ = 0,
                      window[$_ICEJ(235)]($_ICFi(295), c));
                  else
                      try {
                          var e = t[$_ICFi(203)] + t[$_ICEJ(247)];
                          i[o++] = 255 & e,
                          _ += 1;
                      } catch (T) {}
              };
              window[$_IBAP(227)] ? window[$_IBAP(227)]($_IBAP(268), c, !1) : window[$_IAJA(243)] && window[$_IBAP(243)]($_IBAP(295), c);
          }
          function u() {
              var $_DBCBg = mwbxQ.$_DW()[0][13];
              for (; $_DBCBg !== mwbxQ.$_DW()[6][11]; ) {
                  switch ($_DBCBg) {
                  case mwbxQ.$_DW()[0][13]:
                      if (null == r) {
                          r = function e() {
                              var $_ICJL = mwbxQ.$_Cg
                                , $_ICIQ = ['$_IDCy'].concat($_ICJL)
                                , $_IDAC = $_ICIQ[1];
                              $_ICIQ.shift();
                              var $_IDBg = $_ICIQ[0];
                              return new n();
                          }();
                          while (o < s) {
                              var t = Math[$_IAJA(219)](65536 * Math[$_IBAP(21)]());
                              i[o++] = 255 & t;
                          }
                          for (r[$_IAJA(244)](i),
                          o = 0; o < i[$_IBAP(192)]; ++o)
                              i[o] = 0;
                          o = 0;
                      }
                      $_DBCBg = mwbxQ.$_DW()[6][12];
                      break;
                  case mwbxQ.$_DW()[9][12]:
                      return r[$_IAJA(272)]();
                      break;
                  }
              }
          }
          function l() {
              var $_DBCCK = mwbxQ.$_DW()[6][13];
              for (; $_DBCCK !== mwbxQ.$_DW()[3][13]; ) {
                  switch ($_DBCCK) {
                  }
              }
          }
          l[$_IAJA(236)][$_IAJA(206)] = function k(t) {
              var $_IDEE = mwbxQ.$_Cg
                , $_IDDs = ['$_IDHK'].concat($_IDEE)
                , $_IDFl = $_IDDs[1];
              $_IDDs.shift();
              var $_IDGU = $_IDDs[0];
              var e;
              for (e = 0; e < t[$_IDEE(192)]; ++e)
                  t[e] = u();
          }
          ;
          function y(t, e, n) {
              var $_DBCDe = mwbxQ.$_DW()[3][13];
              for (; $_DBCDe !== mwbxQ.$_DW()[9][12]; ) {
                  switch ($_DBCDe) {
                  case mwbxQ.$_DW()[3][13]:
                      null != t && ($_IBAP(83) == typeof t ? this[$_IBAP(258)](t, e, n) : null == e && $_IBAP(51) != typeof t ? this[$_IBAP(220)](t, 256) : this[$_IBAP(220)](t, e));
                      $_DBCDe = mwbxQ.$_DW()[9][12];
                      break;
                  }
              }
          }
          function w() {
              var $_DBCE_ = mwbxQ.$_DW()[0][13];
              for (; $_DBCE_ !== mwbxQ.$_DW()[6][12]; ) {
                  switch ($_DBCE_) {
                  case mwbxQ.$_DW()[3][13]:
                      return new y(null);
                      break;
                  }
              }
          }
          t = $_IAJA(200) == ht[$_IAJA(331)] ? (y[$_IAJA(236)][$_IBAP(301)] = function A(t, e, n, r, i, o) {
              var $_IDJY = mwbxQ.$_Cg
                , $_IDIH = ['$_IECp'].concat($_IDJY)
                , $_IEAy = $_IDIH[1];
              $_IDIH.shift();
              var $_IEBS = $_IDIH[0];
              var s = 32767 & e
                , a = e >> 15;
              while (0 <= --o) {
                  var _ = 32767 & this[t]
                    , c = this[t++] >> 15
                    , u = a * _ + c * s;
                  i = ((_ = s * _ + ((32767 & u) << 15) + n[r] + (1073741823 & i)) >>> 30) + (u >>> 15) + a * c + (i >>> 30),
                  n[r++] = 1073741823 & _;
              }
              return i;
          }
          ,
          30) : $_IBAP(385) != ht[$_IAJA(331)] ? (y[$_IBAP(236)][$_IAJA(301)] = function D(t, e, n, r, i, o) {
              var $_IEEw = mwbxQ.$_Cg
                , $_IEDq = ['$_IEHf'].concat($_IEEw)
                , $_IEFM = $_IEDq[1];
              $_IEDq.shift();
              var $_IEGv = $_IEDq[0];
              while (0 <= --o) {
                  var s = e * this[t++] + n[r] + i;
                  i = Math[$_IEEw(219)](s / 67108864),
                  n[r++] = 67108863 & s;
              }
              return i;
          }
          ,
          26) : (y[$_IAJA(236)][$_IBAP(301)] = function M(t, e, n, r, i, o) {
              var $_IEJN = mwbxQ.$_Cg
                , $_IEIF = ['$_IFCl'].concat($_IEJN)
                , $_IFAC = $_IEIF[1];
              $_IEIF.shift();
              var $_IFBY = $_IEIF[0];
              var s = 16383 & e
                , a = e >> 14;
              while (0 <= --o) {
                  var _ = 16383 & this[t]
                    , c = this[t++] >> 14
                    , u = a * _ + c * s;
                  i = ((_ = s * _ + ((16383 & u) << 14) + n[r] + i) >> 28) + (u >> 14) + a * c,
                  n[r++] = 268435455 & _;
              }
              return i;
          }
          ,
          28),
          y[$_IBAP(236)][$_IAJA(349)] = t,
          y[$_IAJA(236)][$_IAJA(379)] = (1 << t) - 1,
          y[$_IBAP(236)][$_IAJA(380)] = 1 << t;
          y[$_IAJA(236)][$_IAJA(384)] = Math[$_IBAP(397)](2, 52),
          y[$_IBAP(236)][$_IBAP(302)] = 52 - t,
          y[$_IAJA(236)][$_IAJA(328)] = 2 * t - 52;
          var h, f, d = $_IAJA(382), p = [];
          for (h = $_IBAP(40)[$_IAJA(120)](0),
          f = 0; f <= 9; ++f)
              p[h++] = f;
          for (h = $_IBAP(123)[$_IAJA(120)](0),
          f = 10; f < 36; ++f)
              p[h++] = f;
          for (h = $_IBAP(350)[$_IBAP(120)](0),
          f = 10; f < 36; ++f)
              p[h++] = f;
          function g(t) {
              var $_DBCFc = mwbxQ.$_DW()[0][13];
              for (; $_DBCFc !== mwbxQ.$_DW()[6][12]; ) {
                  switch ($_DBCFc) {
                  case mwbxQ.$_DW()[0][13]:
                      return d[$_IAJA(125)](t);
                      break;
                  }
              }
          }
          function v(t) {
              var $_DBCGX = mwbxQ.$_DW()[9][13];
              for (; $_DBCGX !== mwbxQ.$_DW()[3][11]; ) {
                  switch ($_DBCGX) {
                  case mwbxQ.$_DW()[3][13]:
                      var e = w();
                      $_DBCGX = mwbxQ.$_DW()[3][12];
                      break;
                  case mwbxQ.$_DW()[6][12]:
                      return e[$_IBAP(320)](t),
                      e;
                      break;
                  }
              }
          }
          function b(t) {
              var $_DBCHN = mwbxQ.$_DW()[9][13];
              for (; $_DBCHN !== mwbxQ.$_DW()[9][11]; ) {
                  switch ($_DBCHN) {
                  case mwbxQ.$_DW()[9][13]:
                      var e, n = 1;
                      $_DBCHN = mwbxQ.$_DW()[6][12];
                      break;
                  case mwbxQ.$_DW()[9][12]:
                      return 0 != (e = t >>> 16) && (t = e,
                      n += 16),
                      0 != (e = t >> 8) && (t = e,
                      n += 8),
                      0 != (e = t >> 4) && (t = e,
                      n += 4),
                      0 != (e = t >> 2) && (t = e,
                      n += 2),
                      0 != (e = t >> 1) && (t = e,
                      n += 1),
                      n;
                      break;
                  }
              }
          }
          function m(t) {
              var $_DBCIa = mwbxQ.$_DW()[6][13];
              for (; $_DBCIa !== mwbxQ.$_DW()[6][12]; ) {
                  switch ($_DBCIa) {
                  case mwbxQ.$_DW()[0][13]:
                      this[$_IBAP(333)] = t;
                      $_DBCIa = mwbxQ.$_DW()[9][12];
                      break;
                  }
              }
          }
          function x(t) {
              var $_DBCJK = mwbxQ.$_DW()[3][13];
              for (; $_DBCJK !== mwbxQ.$_DW()[0][12]; ) {
                  switch ($_DBCJK) {
                  case mwbxQ.$_DW()[3][13]:
                      this[$_IAJA(333)] = t,
                      this[$_IAJA(357)] = t[$_IAJA(393)](),
                      this[$_IBAP(347)] = 32767 & this[$_IAJA(357)],
                      this[$_IBAP(367)] = this[$_IBAP(357)] >> 15,
                      this[$_IBAP(356)] = (1 << t[$_IAJA(349)] - 15) - 1,
                      this[$_IAJA(325)] = 2 * t[$_IBAP(376)];
                      $_DBCJK = mwbxQ.$_DW()[0][12];
                      break;
                  }
              }
          }
          function E() {
              var $_DBDAZ = mwbxQ.$_DW()[9][13];
              for (; $_DBDAZ !== mwbxQ.$_DW()[3][11]; ) {
                  switch ($_DBDAZ) {
                  case mwbxQ.$_DW()[9][13]:
                      this[$_IBAP(334)] = null,
                      this[$_IAJA(390)] = 0,
                      this[$_IAJA(386)] = null,
                      this[$_IBAP(329)] = null,
                      this[$_IBAP(312)] = null,
                      this[$_IBAP(364)] = null,
                      this[$_IAJA(394)] = null,
                      this[$_IAJA(339)] = null;
                      $_DBDAZ = mwbxQ.$_DW()[6][12];
                      break;
                  case mwbxQ.$_DW()[0][12]:
                      this[$_IBAP(351)]($_IBAP(306), $_IAJA(352));
                      $_DBDAZ = mwbxQ.$_DW()[9][11];
                      break;
                  }
              }
          }
          return m[$_IAJA(236)][$_IBAP(342)] = function O(t) {
              var $_IFEo = mwbxQ.$_Cg
                , $_IFDk = ['$_IFHv'].concat($_IFEo)
                , $_IFFt = $_IFDk[1];
              $_IFDk.shift();
              var $_IFGe = $_IFDk[0];
              return t[$_IFEo(345)] < 0 || 0 <= t[$_IFEo(323)](this[$_IFEo(333)]) ? t[$_IFEo(310)](this[$_IFFt(333)]) : t;
          }
          ,
          m[$_IBAP(236)][$_IAJA(338)] = function B(t) {
              var $_IFJz = mwbxQ.$_Cg
                , $_IFIR = ['$_IGCL'].concat($_IFJz)
                , $_IGAu = $_IFIR[1];
              $_IFIR.shift();
              var $_IGBI = $_IFIR[0];
              return t;
          }
          ,
          m[$_IBAP(236)][$_IBAP(383)] = function j(t) {
              var $_IGER = mwbxQ.$_Cg
                , $_IGDM = ['$_IGHn'].concat($_IGER)
                , $_IGFV = $_IGDM[1];
              $_IGDM.shift();
              var $_IGGs = $_IGDM[0];
              t[$_IGER(399)](this[$_IGER(333)], null, t);
          }
          ,
          m[$_IBAP(236)][$_IAJA(396)] = function I(t, e, n) {
              var $_IGJa = mwbxQ.$_Cg
                , $_IGIO = ['$_IHCl'].concat($_IGJa)
                , $_IHAj = $_IGIO[1];
              $_IGIO.shift();
              var $_IHBO = $_IGIO[0];
              t[$_IGJa(317)](e, n),
              this[$_IHAj(383)](n);
          }
          ,
          m[$_IAJA(236)][$_IAJA(341)] = function R(t, e) {
              var $_IHEH = mwbxQ.$_Cg
                , $_IHDC = ['$_IHHk'].concat($_IHEH)
                , $_IHFD = $_IHDC[1];
              $_IHDC.shift();
              var $_IHG_ = $_IHDC[0];
              t[$_IHEH(372)](e),
              this[$_IHFD(383)](e);
          }
          ,
          x[$_IAJA(236)][$_IAJA(342)] = function L(t) {
              var $_IHJN = mwbxQ.$_Cg
                , $_IHIH = ['$_IICN'].concat($_IHJN)
                , $_IIAH = $_IHIH[1];
              $_IHIH.shift();
              var $_IIBX = $_IHIH[0];
              var e = w();
              return t[$_IHJN(316)]()[$_IHJN(314)](this[$_IIAH(333)][$_IHJN(376)], e),
              e[$_IHJN(399)](this[$_IIAH(333)], null, e),
              t[$_IHJN(345)] < 0 && 0 < e[$_IIAH(323)](y[$_IHJN(370)]) && this[$_IIAH(333)][$_IHJN(346)](e, e),
              e;
          }
          ,
          x[$_IAJA(236)][$_IBAP(338)] = function N(t) {
              var $_IIEN = mwbxQ.$_Cg
                , $_IIDJ = ['$_IIHP'].concat($_IIEN)
                , $_IIFL = $_IIDJ[1];
              $_IIDJ.shift();
              var $_IIGA = $_IIDJ[0];
              var e = w();
              return t[$_IIEN(340)](e),
              this[$_IIEN(383)](e),
              e;
          }
          ,
          x[$_IAJA(236)][$_IAJA(383)] = function P(t) {
              var $_IIJX = mwbxQ.$_Cg
                , $_IIIz = ['$_IJCb'].concat($_IIJX)
                , $_IJAI = $_IIIz[1];
              $_IIIz.shift();
              var $_IJBa = $_IIIz[0];
              while (t[$_IIJX(376)] <= this[$_IIJX(325)])
                  t[t[$_IIJX(376)]++] = 0;
              for (var e = 0; e < this[$_IIJX(333)][$_IJAI(376)]; ++e) {
                  var n = 32767 & t[e]
                    , r = n * this[$_IJAI(347)] + ((n * this[$_IJAI(367)] + (t[e] >> 15) * this[$_IIJX(347)] & this[$_IIJX(356)]) << 15) & t[$_IJAI(379)];
                  t[n = e + this[$_IIJX(333)][$_IIJX(376)]] += this[$_IIJX(333)][$_IJAI(301)](0, r, t, e, 0, this[$_IIJX(333)][$_IIJX(376)]);
                  while (t[n] >= t[$_IIJX(380)])
                      t[n] -= t[$_IIJX(380)],
                      t[++n]++;
              }
              t[$_IIJX(327)](),
              t[$_IIJX(375)](this[$_IIJX(333)][$_IJAI(376)], t),
              0 <= t[$_IIJX(323)](this[$_IIJX(333)]) && t[$_IJAI(346)](this[$_IIJX(333)], t);
          }
          ,
          x[$_IBAP(236)][$_IAJA(396)] = function H(t, e, n) {
              var $_IJEj = mwbxQ.$_Cg
                , $_IJDc = ['$_IJHl'].concat($_IJEj)
                , $_IJFm = $_IJDc[1];
              $_IJDc.shift();
              var $_IJGE = $_IJDc[0];
              t[$_IJFm(317)](e, n),
              this[$_IJFm(383)](n);
          }
          ,
          x[$_IBAP(236)][$_IBAP(341)] = function $(t, e) {
              var $_IJJC = mwbxQ.$_Cg
                , $_IJIg = ['$_JACf'].concat($_IJJC)
                , $_JAAa = $_IJIg[1];
              $_IJIg.shift();
              var $_JABQ = $_IJIg[0];
              t[$_JAAa(372)](e),
              this[$_IJJC(383)](e);
          }
          ,
          y[$_IBAP(236)][$_IBAP(340)] = function F(t) {
              var $_JAEj = mwbxQ.$_Cg
                , $_JADZ = ['$_JAHb'].concat($_JAEj)
                , $_JAFL = $_JADZ[1];
              $_JADZ.shift();
              var $_JAGj = $_JADZ[0];
              for (var e = this[$_JAFL(376)] - 1; 0 <= e; --e)
                  t[e] = this[e];
              t[$_JAEj(376)] = this[$_JAFL(376)],
              t[$_JAFL(345)] = this[$_JAFL(345)];
          }
          ,
          y[$_IAJA(236)][$_IAJA(320)] = function q(t) {
              var $_JAJw = mwbxQ.$_Cg
                , $_JAIW = ['$_JBCH'].concat($_JAJw)
                , $_JBA_ = $_JAIW[1];
              $_JAIW.shift();
              var $_JBBd = $_JAIW[0];
              this[$_JAJw(376)] = 1,
              this[$_JBA_(345)] = t < 0 ? -1 : 0,
              0 < t ? this[0] = t : t < -1 ? this[0] = t + this[$_JAJw(380)] : this[$_JBA_(376)] = 0;
          }
          ,
          y[$_IAJA(236)][$_IBAP(220)] = function z(t, e) {
              var $_JBEX = mwbxQ.$_Cg
                , $_JBDF = ['$_JBHr'].concat($_JBEX)
                , $_JBFs = $_JBDF[1];
              $_JBDF.shift();
              var $_JBGO = $_JBDF[0];
              var n;
              if (16 == e)
                  n = 4;
              else if (8 == e)
                  n = 3;
              else if (256 == e)
                  n = 8;
              else if (2 == e)
                  n = 1;
              else if (32 == e)
                  n = 5;
              else {
                  if (4 != e)
                      return void this[$_JBFs(377)](t, e);
                  n = 2;
              }
              this[$_JBFs(376)] = 0,
              this[$_JBFs(345)] = 0;
              var r, i, o = t[$_JBFs(192)], s = !1, a = 0;
              while (0 <= --o) {
                  var _ = 8 == n ? 255 & t[o] : (r = o,
                  null == (i = p[t[$_JBEX(120)](r)]) ? -1 : i);
                  _ < 0 ? $_JBEX(78) == t[$_JBEX(125)](o) && (s = !0) : (s = !1,
                  0 == a ? this[this[$_JBFs(376)]++] = _ : a + n > this[$_JBEX(349)] ? (this[this[$_JBFs(376)] - 1] |= (_ & (1 << this[$_JBEX(349)] - a) - 1) << a,
                  this[this[$_JBFs(376)]++] = _ >> this[$_JBFs(349)] - a) : this[this[$_JBEX(376)] - 1] |= _ << a,
                  (a += n) >= this[$_JBFs(349)] && (a -= this[$_JBEX(349)]));
              }
              8 == n && 0 != (128 & t[0]) && (this[$_JBEX(345)] = -1,
              0 < a && (this[this[$_JBFs(376)] - 1] |= (1 << this[$_JBFs(349)] - a) - 1 << a)),
              this[$_JBFs(327)](),
              s && y[$_JBEX(370)][$_JBEX(346)](this, this);
          }
          ,
          y[$_IAJA(236)][$_IBAP(327)] = function X() {
              var $_JBJv = mwbxQ.$_Cg
                , $_JBIu = ['$_JCCq'].concat($_JBJv)
                , $_JCAd = $_JBIu[1];
              $_JBIu.shift();
              var $_JCBL = $_JBIu[0];
              var t = this[$_JCAd(345)] & this[$_JCAd(379)];
              while (0 < this[$_JBJv(376)] && this[this[$_JCAd(376)] - 1] == t)
                  --this[$_JBJv(376)];
          }
          ,
          y[$_IAJA(236)][$_IBAP(314)] = function U(t, e) {
              var $_JCEB = mwbxQ.$_Cg
                , $_JCDG = ['$_JCHr'].concat($_JCEB)
                , $_JCFy = $_JCDG[1];
              $_JCDG.shift();
              var $_JCGi = $_JCDG[0];
              var n;
              for (n = this[$_JCFy(376)] - 1; 0 <= n; --n)
                  e[n + t] = this[n];
              for (n = t - 1; 0 <= n; --n)
                  e[n] = 0;
              e[$_JCFy(376)] = this[$_JCEB(376)] + t,
              e[$_JCEB(345)] = this[$_JCFy(345)];
          }
          ,
          y[$_IAJA(236)][$_IAJA(375)] = function V(t, e) {
              var $_JCJE = mwbxQ.$_Cg
                , $_JCIy = ['$_JDCH'].concat($_JCJE)
                , $_JDAP = $_JCIy[1];
              $_JCIy.shift();
              var $_JDBP = $_JCIy[0];
              for (var n = t; n < this[$_JCJE(376)]; ++n)
                  e[n - t] = this[n];
              e[$_JCJE(376)] = Math[$_JDAP(242)](this[$_JCJE(376)] - t, 0),
              e[$_JCJE(345)] = this[$_JDAP(345)];
          }
          ,
          y[$_IAJA(236)][$_IBAP(305)] = function G(t, e) {
              var $_JDE_ = mwbxQ.$_Cg
                , $_JDDo = ['$_JDHn'].concat($_JDE_)
                , $_JDFL = $_JDDo[1];
              $_JDDo.shift();
              var $_JDGj = $_JDDo[0];
              var n, r = t % this[$_JDE_(349)], i = this[$_JDFL(349)] - r, o = (1 << i) - 1, s = Math[$_JDFL(219)](t / this[$_JDE_(349)]), a = this[$_JDE_(345)] << r & this[$_JDFL(379)];
              for (n = this[$_JDFL(376)] - 1; 0 <= n; --n)
                  e[n + s + 1] = this[n] >> i | a,
                  a = (this[n] & o) << r;
              for (n = s - 1; 0 <= n; --n)
                  e[n] = 0;
              e[s] = a,
              e[$_JDFL(376)] = this[$_JDFL(376)] + s + 1,
              e[$_JDFL(345)] = this[$_JDE_(345)],
              e[$_JDFL(327)]();
          }
          ,
          y[$_IBAP(236)][$_IBAP(321)] = function J(t, e) {
              var $_JDJo = mwbxQ.$_Cg
                , $_JDIc = ['$_JECr'].concat($_JDJo)
                , $_JEAZ = $_JDIc[1];
              $_JDIc.shift();
              var $_JEBu = $_JDIc[0];
              e[$_JDJo(345)] = this[$_JDJo(345)];
              var n = Math[$_JEAZ(219)](t / this[$_JEAZ(349)]);
              if (n >= this[$_JDJo(376)])
                  e[$_JEAZ(376)] = 0;
              else {
                  var r = t % this[$_JEAZ(349)]
                    , i = this[$_JEAZ(349)] - r
                    , o = (1 << r) - 1;
                  e[0] = this[n] >> r;
                  for (var s = n + 1; s < this[$_JEAZ(376)]; ++s)
                      e[s - n - 1] |= (this[s] & o) << i,
                      e[s - n] = this[s] >> r;
                  0 < r && (e[this[$_JEAZ(376)] - n - 1] |= (this[$_JDJo(345)] & o) << i),
                  e[$_JDJo(376)] = this[$_JDJo(376)] - n,
                  e[$_JEAZ(327)]();
              }
          }
          ,
          y[$_IAJA(236)][$_IBAP(346)] = function Y(t, e) {
              var $_JEEd = mwbxQ.$_Cg
                , $_JEDl = ['$_JEHa'].concat($_JEEd)
                , $_JEFf = $_JEDl[1];
              $_JEDl.shift();
              var $_JEGW = $_JEDl[0];
              var n = 0
                , r = 0
                , i = Math[$_JEEd(322)](t[$_JEFf(376)], this[$_JEFf(376)]);
              while (n < i)
                  r += this[n] - t[n],
                  e[n++] = r & this[$_JEFf(379)],
                  r >>= this[$_JEFf(349)];
              if (t[$_JEEd(376)] < this[$_JEFf(376)]) {
                  r -= t[$_JEFf(345)];
                  while (n < this[$_JEEd(376)])
                      r += this[n],
                      e[n++] = r & this[$_JEEd(379)],
                      r >>= this[$_JEFf(349)];
                  r += this[$_JEFf(345)];
              } else {
                  r += this[$_JEFf(345)];
                  while (n < t[$_JEEd(376)])
                      r -= t[n],
                      e[n++] = r & this[$_JEFf(379)],
                      r >>= this[$_JEEd(349)];
                  r -= t[$_JEEd(345)];
              }
              e[$_JEFf(345)] = r < 0 ? -1 : 0,
              r < -1 ? e[n++] = this[$_JEFf(380)] + r : 0 < r && (e[n++] = r),
              e[$_JEFf(376)] = n,
              e[$_JEFf(327)]();
          }
          ,
          y[$_IAJA(236)][$_IBAP(317)] = function W(t, e) {
              var $_JEJa = mwbxQ.$_Cg
                , $_JEIB = ['$_JFCp'].concat($_JEJa)
                , $_JFAW = $_JEIB[1];
              $_JEIB.shift();
              var $_JFBm = $_JEIB[0];
              var n = this[$_JFAW(316)]()
                , r = t[$_JFAW(316)]()
                , i = n[$_JEJa(376)];
              e[$_JEJa(376)] = i + r[$_JFAW(376)];
              while (0 <= --i)
                  e[i] = 0;
              for (i = 0; i < r[$_JFAW(376)]; ++i)
                  e[i + n[$_JFAW(376)]] = n[$_JFAW(301)](0, r[i], e, i, 0, n[$_JFAW(376)]);
              e[$_JFAW(345)] = 0,
              e[$_JFAW(327)](),
              this[$_JEJa(345)] != t[$_JFAW(345)] && y[$_JEJa(370)][$_JEJa(346)](e, e);
          }
          ,
          y[$_IBAP(236)][$_IBAP(372)] = function Z(t) {
              var $_JFEW = mwbxQ.$_Cg
                , $_JFDI = ['$_JFHQ'].concat($_JFEW)
                , $_JFFj = $_JFDI[1];
              $_JFDI.shift();
              var $_JFGU = $_JFDI[0];
              var e = this[$_JFEW(316)]()
                , n = t[$_JFFj(376)] = 2 * e[$_JFEW(376)];
              while (0 <= --n)
                  t[n] = 0;
              for (n = 0; n < e[$_JFEW(376)] - 1; ++n) {
                  var r = e[$_JFEW(301)](n, e[n], t, 2 * n, 0, 1);
                  (t[n + e[$_JFFj(376)]] += e[$_JFFj(301)](n + 1, 2 * e[n], t, 2 * n + 1, r, e[$_JFEW(376)] - n - 1)) >= e[$_JFFj(380)] && (t[n + e[$_JFFj(376)]] -= e[$_JFEW(380)],
                  t[n + e[$_JFEW(376)] + 1] = 1);
              }
              0 < t[$_JFFj(376)] && (t[t[$_JFEW(376)] - 1] += e[$_JFEW(301)](n, e[n], t, 2 * n, 0, 1)),
              t[$_JFEW(345)] = 0,
              t[$_JFFj(327)]();
          }
          ,
          y[$_IBAP(236)][$_IBAP(399)] = function Q(t, e, n) {
              var $_JFJK = mwbxQ.$_Cg
                , $_JFIp = ['$_JGCO'].concat($_JFJK)
                , $_JGAb = $_JFIp[1];
              $_JFIp.shift();
              var $_JGBq = $_JFIp[0];
              var r = t[$_JFJK(316)]();
              if (!(r[$_JGAb(376)] <= 0)) {
                  var i = this[$_JGAb(316)]();
                  if (i[$_JFJK(376)] < r[$_JFJK(376)])
                      return null != e && e[$_JFJK(320)](0),
                      void (null != n && this[$_JFJK(340)](n));
                  null == n && (n = w());
                  var o = w()
                    , s = this[$_JFJK(345)]
                    , a = t[$_JFJK(345)]
                    , _ = this[$_JGAb(349)] - b(r[r[$_JGAb(376)] - 1]);
                  0 < _ ? (r[$_JGAb(305)](_, o),
                  i[$_JFJK(305)](_, n)) : (r[$_JFJK(340)](o),
                  i[$_JGAb(340)](n));
                  var c = o[$_JGAb(376)]
                    , u = o[c - 1];
                  if (0 != u) {
                      var l = u * (1 << this[$_JFJK(302)]) + (1 < c ? o[c - 2] >> this[$_JGAb(328)] : 0)
                        , h = this[$_JGAb(384)] / l
                        , f = (1 << this[$_JGAb(302)]) / l
                        , d = 1 << this[$_JFJK(328)]
                        , p = n[$_JGAb(376)]
                        , g = p - c
                        , v = null == e ? w() : e;
                      o[$_JGAb(314)](g, v),
                      0 <= n[$_JGAb(323)](v) && (n[n[$_JFJK(376)]++] = 1,
                      n[$_JGAb(346)](v, n)),
                      y[$_JFJK(368)][$_JGAb(314)](c, v),
                      v[$_JGAb(346)](o, o);
                      while (o[$_JFJK(376)] < c)
                          o[o[$_JFJK(376)]++] = 0;
                      while (0 <= --g) {
                          var m = n[--p] == u ? this[$_JGAb(379)] : Math[$_JFJK(219)](n[p] * h + (n[p - 1] + d) * f);
                          if ((n[p] += o[$_JGAb(301)](0, m, n, g, 0, c)) < m) {
                              o[$_JFJK(314)](g, v),
                              n[$_JFJK(346)](v, n);
                              while (n[p] < --m)
                                  n[$_JFJK(346)](v, n);
                          }
                      }
                      null != e && (n[$_JGAb(375)](c, e),
                      s != a && y[$_JFJK(370)][$_JFJK(346)](e, e)),
                      n[$_JFJK(376)] = c,
                      n[$_JFJK(327)](),
                      0 < _ && n[$_JGAb(321)](_, n),
                      s < 0 && y[$_JGAb(370)][$_JFJK(346)](n, n);
                  }
              }
          }
          ,
          y[$_IBAP(236)][$_IBAP(393)] = function K() {
              var $_JGEd = mwbxQ.$_Cg
                , $_JGDG = ['$_JGHS'].concat($_JGEd)
                , $_JGFB = $_JGDG[1];
              $_JGDG.shift();
              var $_JGGi = $_JGDG[0];
              if (this[$_JGEd(376)] < 1)
                  return 0;
              var t = this[0];
              if (0 == (1 & t))
                  return 0;
              var e = 3 & t;
              return 0 < (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this[$_JGFB(380)]) % this[$_JGFB(380)]) ? this[$_JGEd(380)] - e : -e;
          }
          ,
          y[$_IAJA(236)][$_IBAP(303)] = function $_EF() {
              var $_JGJ_ = mwbxQ.$_Cg
                , $_JGIA = ['$_JHCZ'].concat($_JGJ_)
                , $_JHAy = $_JGIA[1];
              $_JGIA.shift();
              var $_JHBB = $_JGIA[0];
              return 0 == (0 < this[$_JGJ_(376)] ? 1 & this[0] : this[$_JHAy(345)]);
          }
          ,
          y[$_IAJA(236)][$_IBAP(369)] = function $_Fk(t, e) {
              var $_JHEt = mwbxQ.$_Cg
                , $_JHDY = ['$_JHHa'].concat($_JHEt)
                , $_JHFJ = $_JHDY[1];
              $_JHDY.shift();
              var $_JHGR = $_JHDY[0];
              if (4294967295 < t || t < 1)
                  return y[$_JHEt(368)];
              var n = w()
                , r = w()
                , i = e[$_JHFJ(342)](this)
                , o = b(t) - 1;
              i[$_JHFJ(340)](n);
              while (0 <= --o)
                  if (e[$_JHFJ(341)](n, r),
                  0 < (t & 1 << o))
                      e[$_JHEt(396)](r, i, n);
                  else {
                      var s = n;
                      n = r,
                      r = s;
                  }
              return e[$_JHFJ(338)](n);
          }
          ,
          y[$_IBAP(236)][$_IBAP(213)] = function $_GM(t) {
              var $_JHJu = mwbxQ.$_Cg
                , $_JHIr = ['$_JICP'].concat($_JHJu)
                , $_JIAb = $_JHIr[1];
              $_JHIr.shift();
              var $_JIBI = $_JHIr[0];
              if (this[$_JIAb(345)] < 0)
                  return $_JHJu(78) + this[$_JIAb(313)]()[$_JHJu(213)](t);
              var e;
              if (16 == t)
                  e = 4;
              else if (8 == t)
                  e = 3;
              else if (2 == t)
                  e = 1;
              else if (32 == t)
                  e = 5;
              else {
                  if (4 != t)
                      return this[$_JHJu(311)](t);
                  e = 2;
              }
              var n, r = (1 << e) - 1, i = !1, o = $_JHJu(2), s = this[$_JIAb(376)], a = this[$_JHJu(349)] - s * this[$_JHJu(349)] % e;
              if (0 < s--) {
                  a < this[$_JIAb(349)] && 0 < (n = this[s] >> a) && (i = !0,
                  o = g(n));
                  while (0 <= s)
                      a < e ? (n = (this[s] & (1 << a) - 1) << e - a,
                      n |= this[--s] >> (a += this[$_JIAb(349)] - e)) : (n = this[s] >> (a -= e) & r,
                      a <= 0 && (a += this[$_JHJu(349)],
                      --s)),
                      0 < n && (i = !0),
                      i && (o += g(n));
              }
              return i ? o : $_JIAb(40);
          }
          ,
          y[$_IBAP(236)][$_IBAP(313)] = function rt() {
              var $_JIEz = mwbxQ.$_Cg
                , $_JIDD = ['$_JIHD'].concat($_JIEz)
                , $_JIFR = $_JIDD[1];
              $_JIDD.shift();
              var $_JIGv = $_JIDD[0];
              var t = w();
              return y[$_JIEz(370)][$_JIFR(346)](this, t),
              t;
          }
          ,
          y[$_IAJA(236)][$_IAJA(316)] = function $_HH() {
              var $_JIJL = mwbxQ.$_Cg
                , $_JIIj = ['$_JJCj'].concat($_JIJL)
                , $_JJAO = $_JIIj[1];
              $_JIIj.shift();
              var $_JJBV = $_JIIj[0];
              return this[$_JIJL(345)] < 0 ? this[$_JJAO(313)]() : this;
          }
          ,
          y[$_IBAP(236)][$_IAJA(323)] = function $_Ih(t) {
              var $_JJEb = mwbxQ.$_Cg
                , $_JJDZ = ['$_JJHL'].concat($_JJEb)
                , $_JJFi = $_JJDZ[1];
              $_JJDZ.shift();
              var $_JJGh = $_JJDZ[0];
              var e = this[$_JJFi(345)] - t[$_JJEb(345)];
              if (0 != e)
                  return e;
              var n = this[$_JJEb(376)];
              if (0 != (e = n - t[$_JJEb(376)]))
                  return this[$_JJEb(345)] < 0 ? -e : e;
              while (0 <= --n)
                  if (0 != (e = this[n] - t[n]))
                      return e;
              return 0;
          }
          ,
          y[$_IBAP(236)][$_IBAP(395)] = function $_JK() {
              var $_JJJC = mwbxQ.$_Cg
                , $_JJIi = ['$_BAACi'].concat($_JJJC)
                , $_BAAAF = $_JJIi[1];
              $_JJIi.shift();
              var $_BAABz = $_JJIi[0];
              return this[$_JJJC(376)] <= 0 ? 0 : this[$_JJJC(349)] * (this[$_JJJC(376)] - 1) + b(this[this[$_JJJC(376)] - 1] ^ this[$_BAAAF(345)] & this[$_JJJC(379)]);
          }
          ,
          y[$_IAJA(236)][$_IBAP(310)] = function $_BAX(t) {
              var $_BAAEs = mwbxQ.$_Cg
                , $_BAADd = ['$_BAAHt'].concat($_BAAEs)
                , $_BAAFe = $_BAADd[1];
              $_BAADd.shift();
              var $_BAAGU = $_BAADd[0];
              var e = w();
              return this[$_BAAEs(316)]()[$_BAAFe(399)](t, null, e),
              this[$_BAAFe(345)] < 0 && 0 < e[$_BAAEs(323)](y[$_BAAEs(370)]) && t[$_BAAEs(346)](e, e),
              e;
          }
          ,
          y[$_IAJA(236)][$_IAJA(365)] = function $_BBo(t, e) {
              var $_BAAJQ = mwbxQ.$_Cg
                , $_BAAIs = ['$_BABCo'].concat($_BAAJQ)
                , $_BABAU = $_BAAIs[1];
              $_BAAIs.shift();
              var $_BABBv = $_BAAIs[0];
              var n;
              return n = t < 256 || e[$_BAAJQ(303)]() ? new m(e) : new x(e),
              this[$_BABAU(369)](t, n);
          }
          ,
          y[$_IBAP(370)] = v(0),
          y[$_IBAP(368)] = v(1),
          E[$_IAJA(236)][$_IBAP(361)] = function ct(t) {
              var $_BABEj = mwbxQ.$_Cg
                , $_BABDQ = ['$_BABHW'].concat($_BABEj)
                , $_BABFo = $_BABDQ[1];
              $_BABDQ.shift();
              var $_BABGv = $_BABDQ[0];
              return t[$_BABEj(365)](this[$_BABEj(390)], this[$_BABFo(334)]);
          }
          ,
          E[$_IBAP(236)][$_IBAP(351)] = function ut(t, e) {
              var $_BABJr = mwbxQ.$_Cg
                , $_BABIC = ['$_BACCr'].concat($_BABJr)
                , $_BACAx = $_BABIC[1];
              $_BABIC.shift();
              var $_BACBQ = $_BABIC[0];
              null != t && null != e && 0 < t[$_BACAx(192)] && 0 < e[$_BABJr(192)] ? (this[$_BACAx(334)] = function n(t, e) {
                  var $_BACEN = mwbxQ.$_Cg
                    , $_BACDg = ['$_BACHV'].concat($_BACEN)
                    , $_BACFu = $_BACDg[1];
                  $_BACDg.shift();
                  var $_BACGl = $_BACDg[0];
                  return new y(t,e);
              }(t, 16),
              this[$_BABJr(390)] = parseInt(e, 16)) : console && console[$_BACAx(32)] && console[$_BACAx(32)]($_BABJr(330));
          }
          ,
          E[$_IBAP(236)][$_IAJA(392)] = function lt(t) {
              var $_BACJg = mwbxQ.$_Cg
                , $_BACIn = ['$_BADCr'].concat($_BACJg)
                , $_BADAI = $_BACIn[1];
              $_BACIn.shift();
              var $_BADBC = $_BACIn[0];
              var e = function a(t, e) {
                  var $_BADEx = mwbxQ.$_Cg
                    , $_BADDX = ['$_BADHW'].concat($_BADEx)
                    , $_BADFn = $_BADDX[1];
                  $_BADDX.shift();
                  var $_BADGi = $_BADDX[0];
                  if (e < t[$_BADFn(192)] + 11)
                      return console && console[$_BADFn(32)] && console[$_BADEx(32)]($_BADEx(307)),
                      null;
                  var n = []
                    , r = t[$_BADFn(192)] - 1;
                  while (0 <= r && 0 < e) {
                      var i = t[$_BADFn(120)](r--);
                      i < 128 ? n[--e] = i : 127 < i && i < 2048 ? (n[--e] = 63 & i | 128,
                      n[--e] = i >> 6 | 192) : (n[--e] = 63 & i | 128,
                      n[--e] = i >> 6 & 63 | 128,
                      n[--e] = i >> 12 | 224);
                  }
                  n[--e] = 0;
                  var o = new l()
                    , s = [];
                  while (2 < e) {
                      s[0] = 0;
                      while (0 == s[0])
                          o[$_BADEx(206)](s);
                      n[--e] = s[0];
                  }
                  return n[--e] = 2,
                  n[--e] = 0,
                  new y(n);
              }(t, this[$_BADAI(334)][$_BADAI(395)]() + 7 >> 3);
              if (null == e)
                  return null;
              var n = this[$_BADAI(361)](e);
              if (null == n)
                  return null;
              var r = n[$_BACJg(213)](16);
              return 0 == (1 & r[$_BACJg(192)]) ? r : $_BADAI(40) + r;
          }
          ,
          E;
      }();

var rt = function() {
          var $_BFBEk = mwbxQ.$_Cg
            , $_BFBDw = ['$_BFBHg'].concat($_BFBEk)
            , $_BFBFC = $_BFBDw[1];
          $_BFBDw.shift();
          var $_BFBGt = $_BFBDw[0];
          function t() {
              var $_DBEBs = mwbxQ.$_DW()[3][13];
              for (; $_DBEBs !== mwbxQ.$_DW()[3][12]; ) {
                  switch ($_DBEBs) {
                  case mwbxQ.$_DW()[3][13]:
                      return (65536 * (1 + Math[$_BFBFC(21)]()) | 0)[$_BFBFC(213)](16)[$_BFBFC(415)](1);
                      break;
                  }
              }
          }
          return function() {
              var $_BFBJQ = mwbxQ.$_Cg
                , $_BFBIb = ['$_BFCCW'].concat($_BFBJQ)
                , $_BFCAN = $_BFBIb[1];
              $_BFBIb.shift();
              var $_BFCBf = $_BFBIb[0];
              return t() + t() + t() + t();
          }
          ;
      }();

function ne(t, e) {
var $_DBFEV = mwbxQ.$_DW()[3][13];
for (; $_DBFEV !== mwbxQ.$_DW()[3][12]; ) {
  switch ($_DBFEV) {
  case mwbxQ.$_DW()[9][13]:
    var n = this
      , r = new ie(t);
    r[$_CJES(627)] && !isNaN(r[$_CJES(627)]) && (vt = $_CJFt(647),
    mt = r[$_CJFt(627)]),
    r[$_CJES(695)] && (r[$_CJFt(89)] = $_CJES(649)),
    t[$_CJES(654)] && r[$_CJFt(601)](t[$_CJES(654)]),
    n[$_CJFt(67)] = r,
    n[$_CJFt(0)] = t,
    n[$_CJES(693)] = new J(n),
    n[$_CJES(434)] = new Z(function(t, e) {
      var $_BJCJR = mwbxQ.$_Cg
        , $_BJCIr = ['$_BJDCT'].concat($_BJCJR)
        , $_BJDAP = $_BJCIr[1];
      $_BJCIr.shift();
      var $_BJDBl = $_BJCIr[0];
      n[$_BJDAP(697)](t, e);
    }
    ),
    n[$_CJFt(434)][$_CJFt(660)](Bt),
    n[$_CJES(692)] = $_BCN(),
    n[$_CJES(631)] = b ? 3 : 0,
    n[$_CJES(605)] = b ? $_CJES(651) : $_CJES(685),
    n[$_CJFt(67)][$_CJES(151)] = {
      "\u0024\u005f\u0042\u0043\u004e": n[$_CJFt(631)]
    };
    $_DBFEV = mwbxQ.$_DW()[3][12];
    break;
  }
}
}

let wt = {"mouseEvent":true,"touchEvent":false}
var Ot;
ne[mwbxQ.$_Cg(236)] = {
"\u0024\u005f\u0042\u0048\u0047\u0055": function(t, e) {
  var $_BJFJG = mwbxQ.$_Cg
    , $_BJFIH = ['$_BJGCi'].concat($_BJFJG)
    , $_BJGAJ = $_BJFIH[1];
  $_BJFIH.shift();
  var $_BJGBK = $_BJFIH[0];
  var n = this
    , r = n[$_BJFJG(786)]
    , i = n[$_BJFJG(434)]
    , o = n[$_BJFJG(693)]
    , s = n[$_BJFJG(67)];
  if (t !== e)
    if (null !== e && r && r[$_BJGAJ(727)](t, e),
    t === Bt)
      n[$_BJGAJ(734)] = n[$_BJFJG(276)]()[$_BJGAJ(138)](function(t) {
        var $_BJGEU = mwbxQ.$_Cg
          , $_BJGDQ = ['$_BJGHT'].concat($_BJGEU)
          , $_BJGFv = $_BJGDQ[1];
        $_BJGDQ.shift();
        var $_BJGGW = $_BJGDQ[0];
        return t[$_BJGFv(30)] === Ht ? z(F(t, n)) : (s[$_BJGEU(601)]($_BBo(t)),
        s[$_BJGEU(654)] && s[$_BJGEU(601)](s[$_BJGFv(654)]),
        s[$_BJGFv(710)] && n[$_BJGEU(707)]()[$_BJGEU(138)](function() {
          var $_BJGJy = mwbxQ.$_Cg
            , $_BJGIB = ['$_BJHCH'].concat($_BJGJy)
            , $_BJHAf = $_BJGIB[1];
          $_BJGIB.shift();
          var $_BJHBP = $_BJGIB[0];
        }),
        s[$_BJGEU(675)] ? n[$_BJGEU(786)] = new ae(n) : n[$_BJGFv(786)] = new re(n),
        n[$_BJGFv(753)](),
        o[$_BJGFv(738)](Bt),
        i[$_BJGFv(660)](jt),
        n[$_BJGFv(786)][$_BJGFv(712)]);
      }, function() {
        var $_BJHET = mwbxQ.$_Cg
          , $_BJHDZ = ['$_BJHHB'].concat($_BJHET)
          , $_BJHFM = $_BJHDZ[1];
        $_BJHDZ.shift();
        var $_BJHGg = $_BJHDZ[0];
        return z($($_BJHET(750), n));
      });
    else if (t === jt) {
      var a = $_Ih();
      n[$_BJFJG(136)]()[$_BJGAJ(138)](function(t) {
        var $_BJHJj = mwbxQ.$_Cg
          , $_BJHIm = ['$_BJICo'].concat($_BJHJj)
          , $_BJIAD = $_BJHIm[1];
        $_BJHIm.shift();
        var $_BJIBu = $_BJHIm[0];
        r[$_BJIAD(799)](t),
        n[$_BJHJj(741)] = $_Ih() - a,
        i[$_BJHJj(660)](It);
      }, function() {
        var $_BJIEX = mwbxQ.$_Cg
          , $_BJIDh = ['$_BJIHu'].concat($_BJIEX)
          , $_BJIFV = $_BJIDh[1];
        $_BJIDh.shift();
        var $_BJIGa = $_BJIDh[0];
        return z($($_BJIFV(766), n));
      });
    } else
      t === It ? r[$_BJFJG(783)]() : t === $t ? r[$_BJGAJ(708)]() : $_BJFJG(768) === t ? r[$_BJFJG(731)](e) : t === Ft ? (-1 < new ct([It, Nt, Pt, Rt])[$_BJGAJ(576)](e) && (o[$_BJFJG(738)](Ft),
      r[$_BJFJG(720)]()),
      y(n[$_BJFJG(757)]),
      n[$_BJGAJ(753)]()) : t === Rt ? (y(n[$_BJFJG(757)]),
      r[$_BJFJG(777)](n[$_BJGAJ(778)], n[$_BJGAJ(724)])[$_BJFJG(138)](function() {
        var $_BJIJo = mwbxQ.$_Cg
          , $_BJIIc = ['$_BJJCq'].concat($_BJIJo)
          , $_BJJAO = $_BJIIc[1];
        $_BJIIc.shift();
        var $_BJJBF = $_BJIIc[0];
        o[$_BJIJo(738)](Rt, n[$_BJJAO(724)]);
      })) : t === Lt ? (o[$_BJFJG(738)](Lt),
      r[$_BJGAJ(790)]()[$_BJFJG(138)](function() {
        var $_BJJEk = mwbxQ.$_Cg
          , $_BJJDC = ['$_BJJHw'].concat($_BJJEk)
          , $_BJJFU = $_BJJDC[1];
        $_BJJDC.shift();
        var $_BJJGJ = $_BJJDC[0];
        i[$_BJJEk(660)](It);
      })) : t === Pt ? (o[$_BJGAJ(738)](Pt),
      r[$_BJFJG(798)]()[$_BJGAJ(138)](function() {
        var $_BJJJJ = mwbxQ.$_Cg
          , $_BJJIU = ['$_CAACj'].concat($_BJJJJ)
          , $_CAAAB = $_BJJIU[1];
        $_BJJIU.shift();
        var $_CAABU = $_BJJIU[0];
        i[$_BJJJJ(660)](Ft);
      })) : t === Nt ? (o[$_BJGAJ(738)](Nt),
      r[$_BJGAJ(787)]()[$_BJGAJ(138)](function() {
        var $_CAAEc = mwbxQ.$_Cg
          , $_CAADY = ['$_CAAHT'].concat($_CAAEc)
          , $_CAAFZ = $_CAADY[1];
        $_CAADY.shift();
        var $_CAAGT = $_CAADY[0];
        z($($_CAAFZ(743), n));
      })) : t === Ht ? (o[$_BJFJG(738)](Ht, n[$_BJFJG(762)]),
      r && r[$_BJGAJ(784)]()) : t === Xt && o[$_BJFJG(738)](Xt, $_BJFJG(782));
},
"\u0024\u005f\u0047\u0041\u0066": function() {
  var $_CAAJJ = mwbxQ.$_Cg
    , $_CAAIK = ['$_CABCM'].concat($_CAAJJ)
    , $_CABAt = $_CAAIK[1];
  $_CAAIK.shift();
  var $_CABBy = $_CAAIK[0];
  var t = this[$_CAAJJ(67)];
  return I(t, $_CAAJJ(726), this[$_CAAJJ(0)]);
},
"\u0024\u005f\u0043\u0041\u0043\u0079": function() {
  var $_CABEw = mwbxQ.$_Cg
    , $_CABDs = ['$_CABHo'].concat($_CABEw)
    , $_CABFC = $_CABDs[1];
  $_CABDs.shift();
  var $_CABGK = $_CABDs[0];
  var t = this[$_CABEw(67)];
  return B(t, $_CABFC(110), t[$_CABFC(89)], t[$_CABEw(767)], t[$_CABEw(710)]);
},
"\u0024\u005f\u0043\u0041\u0044\u004f": function() {
  var $_CABJu = mwbxQ.$_Cg
    , $_CABIn = ['$_CACCS'].concat($_CABJu)
    , $_CACAy = $_CABIn[1];
  $_CABIn.shift();
  var $_CACBr = $_CABIn[0];
  var t = this
    , e = t[$_CACAy(67)]
    , n = t[$_CABJu(434)];
  return e[$_CABJu(740)] && (t[$_CABJu(757)] = v(function() {
    var $_CACET = mwbxQ.$_Cg
      , $_CACDQ = ['$_CACHx'].concat($_CACET)
      , $_CACFf = $_CACDQ[1];
    $_CACDQ.shift();
    var $_CACGL = $_CACDQ[0];
    n[$_CACET(660)](Ft);
  }, 54e4)),
  t;
},
"\u0024\u005f\u0044\u0042\u0068": function(t) {
  var $_CACJi = mwbxQ.$_Cg
    , $_CACIQ = ['$_CADCU'].concat($_CACJi)
    , $_CADAU = $_CACIQ[1];
  $_CACIQ.shift();
  var $_CADBY = $_CACIQ[0];
  return this[$_CACJi(762)] = t,
  this[$_CADAU(434)][$_CACJi(660)](Ht),
  this;
},
"\u0024\u005f\u0043\u0049\u0050": function(t) {
  var $_CADEA = mwbxQ.$_Cg
    , $_CADDG = ['$_CADHg'].concat($_CADEA)
    , $_CADFd = $_CADDG[1];
  $_CADDG.shift();
  var $_CADGz = $_CADDG[0];
  var e = this;
  return e[$_CADFd(734)][$_CADFd(138)](function() {
    var $_CADJH = mwbxQ.$_Cg
      , $_CADIF = ['$_CAECj'].concat($_CADJH)
      , $_CAEAO = $_CADIF[1];
    $_CADIF.shift();
    var $_CAEBF = $_CADIF[0];
    e[$_CADJH(786)][$_CAEAO(92)](t);
  }),
  e;
},
"\u0024\u005f\u0043\u0043\u0041\u0077": function(t) {
  var $_CAEEG = mwbxQ.$_Cg
    , $_CAEDh = ['$_CAEHD'].concat($_CAEEG)
    , $_CAEFK = $_CAEDh[1];
  $_CAEDh.shift();
  var $_CAEGK = $_CAEDh[0];
  var e = this;
  return e[$_CAEFK(734)][$_CAEFK(138)](function() {
    var $_CAEJx = mwbxQ.$_Cg
      , $_CAEIz = ['$_CAFCA'].concat($_CAEJx)
      , $_CAFAW = $_CAEIz[1];
    $_CAEIz.shift();
    var $_CAFBj = $_CAEIz[0];
    e[$_CAEJx(786)][$_CAFAW(759)](t);
  }),
  e;
},
"\u0024\u005f\u0044\u0044\u0050": function() {
  var $_CAFEV = mwbxQ.$_Cg
    , $_CAFDR = ['$_CAFHU'].concat($_CAFEV)
    , $_CAFFI = $_CAFDR[1];
  $_CAFDR.shift();
  var $_CAFGR = $_CAFDR[0];
  var r = this[$_CAFEV(67)]
    , i = r[$_CAFFI(89)]
    , o = r[$_CAFFI(767)] || r[$_CAFEV(746)];
  return this[$_CAFFI(692)][$_CAFFI(138)](function(t) {
    var $_CAFJi = mwbxQ.$_Cg
      , $_CAFIP = ['$_CAGCH'].concat($_CAFJi)
      , $_CAGAd = $_CAFIP[1];
    $_CAFIP.shift();
    var $_CAGBR = $_CAFIP[0];
    var n = t ? $_CAFJi(711) : $_CAGAd(794);
    return G[$_CAFJi(446)]([new G(function(e) {
      var $_CAGEp = mwbxQ.$_Cg
        , $_CAGDg = ['$_CAGHY'].concat($_CAGEp)
        , $_CAGFe = $_CAGDg[1];
      $_CAGDg.shift();
      var $_CAGGd = $_CAGDg[0];
      B(r, $_CAGEp(80), i, o, r[$_CAGEp(770)][$_CAGFe(45)]($_CAGEp(794), n))[$_CAGEp(138)](function(t) {
        var $_CAGJd = mwbxQ.$_Cg
          , $_CAGIZ = ['$_CAHCk'].concat($_CAGJd)
          , $_CAHAs = $_CAGIZ[1];
        $_CAGIZ.shift();
        var $_CAHBu = $_CAGIZ[0];
        e(t);
      }, function() {
        var $_CAHEV = mwbxQ.$_Cg
          , $_CAHDZ = ['$_CAHHa'].concat($_CAHEV)
          , $_CAHFY = $_CAHDZ[1];
        $_CAHDZ.shift();
        var $_CAHGX = $_CAHDZ[0];
        e(!1);
      });
    }
    ), B(r, $_CAGAd(80), i, o, r[$_CAGAd(779)][$_CAFJi(45)]($_CAFJi(794), n)), B(r, $_CAFJi(80), i, o, r[$_CAFJi(187)][$_CAGAd(45)]($_CAFJi(794), n))]);
  });
},
"\u0024\u005f\u0043\u0043\u0042\u004e": function(t, e, n) {
  var $_CAHJS = mwbxQ.$_Cg
    , $_CAHIz = ['$_CAICp'].concat($_CAHJS)
    , $_CAIAK = $_CAHIz[1];
  $_CAHIz.shift();
  var $_CAIBx = $_CAHIz[0];
  var r = this
    , i = r[$_CAHJS(67)]
    , o = {
    "\u006c\u0061\u006e\u0067": i[$_CAHJS(133)] || $_CAIAK(143),
    "\u0075\u0073\u0065\u0072\u0072\u0065\u0073\u0070\u006f\u006e\u0073\u0065": H(t, i[$_CAHJS(134)]),
    "\u0070\u0061\u0073\u0073\u0074\u0069\u006d\u0065": n,
    "\u0069\u006d\u0067\u006c\u006f\u0061\u0064": r[$_CAIAK(741)],
    "\u0061\u0061": e,
    "\u0065\u0070": r[$_CAHJS(729)]()
  };
  try {
    if (window[$_CAIAK(756)]) {
      var s = {
        "\u006c\u0061\u006e\u0067": o[$_CAHJS(133)],
        "\u0065\u0070": o[$_CAHJS(760)]
      }
        , a = window[$_CAHJS(756)](s);
      if (a[$_CAHJS(133)]) {
        var _ = function d(t) {
          var $_CAIEY = mwbxQ.$_Cg
            , $_CAIDR = ['$_CAIHF'].concat($_CAIEY)
            , $_CAIFF = $_CAIDR[1];
          $_CAIDR.shift();
          var $_CAIGC = $_CAIDR[0];
          for (var e in t)
            if ($_CAIEY(760) !== e && $_CAIFF(133) !== e)
              return e;
        }(s)
          , c = function p(t, e, n) {
          var $_CAIJZ = mwbxQ.$_Cg
            , $_CAIIe = ['$_CAJCz'].concat($_CAIJZ)
            , $_CAJAD = $_CAIIe[1];
          $_CAIIe.shift();
          var $_CAJBT = $_CAIIe[0];
          for (var r = new t[($_CAJAD(795))][($_CAIJZ(742))](e,n), i = [$_CAJAD(334), $_CAIJZ(345), $_CAIJZ(390), $_CAIJZ(771), $_CAIJZ(153), $_CAJAD(739), $_CAJAD(736), $_CAIJZ(754)], o = i[$_CAJAD(192)] - 2, s = 0; s < n[$_CAJAD(192)]; s++) {
            var a, _ = Math[$_CAJAD(316)](n[s][$_CAIJZ(120)]() - 70)[$_CAJAD(213)]()[1];
            a = o < _ ? t[$_CAJAD(795)][i[1 + o]](r) : t[$_CAIJZ(795)][i[_]](r);
            for (var c = Math[$_CAIJZ(316)](n[s][$_CAIJZ(120)]() - 70)[$_CAIJZ(213)]()[0], u = 0; u < c; u++)
              a[$_CAJAD(755)]();
          }
          return r[$_CAIJZ(21)][$_CAJAD(405)]($_CAIJZ(2))[$_CAIJZ(187)](0, 10);
        }(a, s, _);
        s[_] = c;
      }
      !function g(t) {
        var $_CAJEA = mwbxQ.$_Cg
          , $_CAJDN = ['$_CAJHw'].concat($_CAJEA)
          , $_CAJFl = $_CAJDN[1];
        $_CAJDN.shift();
        var $_CAJGo = $_CAJDN[0];
        if ($_CAJFl(88) == typeof Object[$_CAJEA(763)])
          return Object[$_CAJEA(763)][$_CAJEA(353)](Object, arguments);
        if (null == t)
          throw new Error($_CAJEA(776));
        t = Object(t);
        for (var e = 1; e < arguments[$_CAJEA(192)]; e++) {
          var n = arguments[e];
          if (null !== n)
            for (var r in n)
              Object[$_CAJFl(236)][$_CAJEA(75)][$_CAJFl(318)](n, r) && (t[r] = n[r]);
        }
        return t;
      }(o, s);
    }
  } catch (v) {}
  i[$_CAIAK(180)] && (o[$_CAHJS(203)] = t),
  o[$_CAIAK(793)] = X(i[$_CAIAK(122)] + i[$_CAIAK(134)][$_CAIAK(187)](0, 32) + o[$_CAHJS(725)]);
  var u = r[$_CAHJS(737)]()
    , l = V[$_CAHJS(392)](gt[$_CAIAK(254)](o), r[$_CAIAK(744)]())
    , h = m[$_CAIAK(792)](l)
    , f = {
    "\u0067\u0074": i[$_CAIAK(122)],
    "\u0063\u0068\u0061\u006c\u006c\u0065\u006e\u0067\u0065": i[$_CAIAK(134)],
    "\u006c\u0061\u006e\u0067": o[$_CAHJS(133)],
    "\u0024\u005f\u0042\u0043\u004e": r[$_CAIAK(631)],
    "\u0063\u006c\u0069\u0065\u006e\u0074\u005f\u0074\u0079\u0070\u0065": r[$_CAHJS(605)],
    "\u0077": h + u
  };
  I(r[$_CAHJS(67)], $_CAHJS(775), f)[$_CAHJS(138)](function(t) {
    var $_CAJJZ = mwbxQ.$_Cg
      , $_CAJI_ = ['$_CBACQ'].concat($_CAJJZ)
      , $_CBAAX = $_CAJI_[1];
    $_CAJI_.shift();
    var $_CBABv = $_CAJI_[0];
    if (t[$_CBAAX(30)] == Ht)
      return z(F(t, r, $_CAJJZ(775)));
    r[$_CBAAX(702)]($_BBo(t));
  }, function() {
    var $_CBAEO = mwbxQ.$_Cg
      , $_CBADE = ['$_CBAHL'].concat($_CBAEO)
      , $_CBAFE = $_CBADE[1];
    $_CBADE.shift();
    var $_CBAGC = $_CBADE[0];
    return z($($_CBAFE(705), r));
  });
},
"\u0024\u005f\u0043\u0043\u0046\u0068": function(t) {
  var $_CBAJB = mwbxQ.$_Cg
    , $_CBAIB = ['$_CBBCI'].concat($_CBAJB)
    , $_CBBAR = $_CBAIB[1];
  $_CBAIB.shift();
  var $_CBBBw = $_CBAIB[0];
  var e = this[$_CBBAR(67)]
    , n = Ht
    , r = t && t[$_CBAJB(769)]
    , i = t && t[$_CBBAR(181)];
  if (t)
    if ($_CBAJB(665) == r || $_CBAJB(665) == i) {
      var o = t[$_CBAJB(761)][$_CBAJB(87)]($_CBBAR(747))[0];
      this[$_CBBAR(724)] = t[$_CBBAR(764)],
      this[$_CBBAR(778)] = {
        "\u0067\u0065\u0065\u0074\u0065\u0073\u0074\u005f\u0063\u0068\u0061\u006c\u006c\u0065\u006e\u0067\u0065": e[$_CBAJB(134)],
        "\u0067\u0065\u0065\u0074\u0065\u0073\u0074\u005f\u0076\u0061\u006c\u0069\u0064\u0061\u0074\u0065": o,
        "\u0067\u0065\u0065\u0074\u0065\u0073\u0074\u005f\u0073\u0065\u0063\u0063\u006f\u0064\u0065": o + $_CBAJB(749)
      },
      n = Rt;
    } else
      $_CBBAR(657) == r || $_CBBAR(657) == i ? n = Lt : $_CBBAR(666) == r || $_CBAJB(666) == i ? n = Nt : $_CBBAR(629) != r && $_CBBAR(629) != i || (n = Pt);
  else
    n = Ht;
  this[$_CBAJB(434)][$_CBAJB(660)](n);
},
"\u0024\u005f\u0043\u0043\u0047\u0058": function() {
  var $_CBBEs = mwbxQ.$_Cg
    , $_CBBDt = ['$_CBBHy'].concat($_CBBEs)
    , $_CBBFd = $_CBBDt[1];
  $_CBBDt.shift();
  var $_CBBGz = $_CBBDt[0];
  return this[$_CBBEs(778)];
},
"\u0024\u005f\u0042\u0044\u0043\u004f": function() {
  var $_CBBJI = mwbxQ.$_Cg
    , $_CBBIs = ['$_CBCCz'].concat($_CBBJI)
    , $_CBCAq = $_CBBIs[1];
  $_CBBIs.shift();
  var $_CBCBZ = $_CBBIs[0];
  return this[$_CBCAq(786)] && this[$_CBCAq(786)][$_CBBJI(718)](),
  this;
},
"\u0024\u005f\u0042\u0044\u0042\u0045": function() {
  var $_CBCEW = mwbxQ.$_Cg
    , $_CBCDL = ['$_CBCHm'].concat($_CBCEW)
    , $_CBCFp = $_CBCDL[1];
  $_CBCDL.shift();
  var $_CBCGR = $_CBCDL[0];
  return this[$_CBCFp(786)] && this[$_CBCFp(786)][$_CBCEW(780)](),
  this;
},
"\u0024\u005f\u0047\u0042\u005a": function(e, n) {
  var $_CBCJa = mwbxQ.$_Cg
    , $_CBCIS = ['$_CBDCL'].concat($_CBCJa)
    , $_CBDAz = $_CBCIS[1];
  $_CBCIS.shift();
  var $_CBDBW = $_CBCIS[0];
  var r = this
    , i = r[$_CBCJa(67)];
  return r[$_CBDAz(693)][$_CBDAz(234)](e, function(t) {
    var $_CBDEr = mwbxQ.$_Cg
      , $_CBDDY = ['$_CBDHH'].concat($_CBDEr)
      , $_CBDFZ = $_CBDDY[1];
    $_CBDDY.shift();
    var $_CBDGH = $_CBDDY[0];
    n(t),
    -1 < new ct([Rt, Lt, Nt, Pt])[$_CBDEr(576)](e) ? (r[$_CBDEr(693)][$_CBDEr(738)](qt),
    $_Fk(window[$_CBDFZ(781)]) && (i[$_CBDFZ(675)] ? window[$_CBDFZ(781)](e === Rt ? 1 : 0, !1, e) : window[$_CBDEr(781)](e === Rt ? 1 : 0, r[$_CBDFZ(435)], e))) : e === Ft ? $_Fk(window[$_CBDFZ(703)]) && window[$_CBDFZ(703)](r[$_CBDFZ(435)]) : e === Ht ? $_Fk(window[$_CBDFZ(758)]) && window[$_CBDFZ(758)](r, r[$_CBDFZ(435)]) : e === Bt && $_Fk(window[$_CBDEr(730)]) && window[$_CBDEr(730)](r);
  }),
  r;
},
"\u0024\u005f\u0043\u0042\u0041\u005f": function() {
  var $_CBDJc = mwbxQ.$_Cg
    , $_CBDIE = ['$_CBECj'].concat($_CBDJc)
    , $_CBEAx = $_CBDIE[1];
  $_CBDIE.shift();
  var $_CBEBS = $_CBDIE[0];
  return this[$_CBEAx(434)][$_CBEAx(660)](Ft),
  this;
},
"\u0024\u005f\u0043\u0043\u0048\u0070": function(t) {
  var $_CBEEO = mwbxQ.$_Cg
    , $_CBEDl = ['$_CBEHr'].concat($_CBEEO)
    , $_CBEFk = $_CBEDl[1];
  $_CBEDl.shift();
  var $_CBEGf = $_CBEDl[0];
  return this[$_CBEEO(67)][$_CBEFk(675)] && this[$_CBEEO(786)][$_CBEEO(704)](t),
  this;
},
"\u0024\u005f\u0042\u0042\u0043\u0045": function() {
  var $_CBEJz = mwbxQ.$_Cg
    , $_CBEIr = ['$_CBFCS'].concat($_CBEJz)
    , $_CBFAe = $_CBEIr[1];
  $_CBEIr.shift();
  var $_CBFBL = $_CBEIr[0];
  var t = this;
  t[$_CBEJz(757)] && y(t[$_CBEJz(757)]),
  t[$_CBEJz(786)] && t[$_CBEJz(786)][$_CBEJz(599)](),
  t[$_CBFAe(693)][$_CBEJz(599)]();
},
"\u0024\u005f\u0043\u0043\u0045\u0063": (Ot = rt(),
function(t) {
  var $_CBFEx = mwbxQ.$_Cg
    , $_CBFDT = ['$_CBFHe'].concat($_CBFEx)
    , $_CBFFi = $_CBFDT[1];
  $_CBFDT.shift();
  var $_CBFGM = $_CBFDT[0];
  return !0 === t && (Ot = rt()),
  Ot;
}
),
"\u0024\u005f\u0043\u0043\u0044\u006d": function(t) {
  var $_CBFJN = mwbxQ.$_Cg
    , $_CBFIX = ['$_CBGCG'].concat($_CBFJN)
    , $_CBGAK = $_CBFIX[1];
  $_CBFIX.shift();
  var $_CBGBR = $_CBFIX[0];
  var e = new U()[$_CBFJN(392)](this[$_CBGAK(744)](t));
  while (!e || 256 !== e[$_CBFJN(192)])
    e = new U()[$_CBGAK(392)](this[$_CBGAK(744)](!0));
  return e;
},
"\u0024\u005f\u0043\u0043\u0043\u0059": function() {
  var $_CBGEZ = mwbxQ.$_Cg
    , $_CBGDJ = ['$_CBGHE'].concat($_CBGEZ)
    , $_CBGFF = $_CBGDJ[1];
  $_CBGDJ.shift();
  var $_CBGGe = $_CBGDJ[0];
  return {
    "\u0076": $_CBGFF(733),
    "\u0024\u005f\u0042\u0049\u0045": wt[$_CBGFF(698)],
    "\u006d\u0065": wt[$_CBGFF(667)],
    "\u0074\u006d": new bt()[$_CBGEZ(701)](),
    "\u0074\u0064": this[$_CBGFF(719)] || -1
  };
}
}



function v(t, e) {
var $_DBAFQ = mwbxQ.$_DW()[9][13];
for (; $_DBAFQ !== mwbxQ.$_DW()[0][12]; ) {
  switch ($_DBAFQ) {
  case mwbxQ.$_DW()[9][13]:
    return window[mwbxQ.$_Cg(127)](t, e);
    break;
  }
}
}

var dt, gt = function() {
var $_BIHEC = mwbxQ.$_Cg
  , $_BIHDs = ['$_BIHHU'].concat($_BIHEC)
  , $_BIHFL = $_BIHDs[1];
$_BIHDs.shift();
var $_BIHGQ = $_BIHDs[0];
'use strict';
var u, l, n, h, t = {}, e = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
function r(t) {
  var $_DBEHp = mwbxQ.$_DW()[9][13];
  for (; $_DBEHp !== mwbxQ.$_DW()[9][12]; ) {
    switch ($_DBEHp) {
    case mwbxQ.$_DW()[6][13]:
      return t < 10 ? $_BIHFL(40) + t : t;
      break;
    }
  }
}
function i() {
  var $_DBEII = mwbxQ.$_DW()[6][13];
  for (; $_DBEII !== mwbxQ.$_DW()[3][12]; ) {
    switch ($_DBEII) {
    case mwbxQ.$_DW()[6][13]:
      return this[$_BIHEC(13)]();
      break;
    }
  }
}
function f(t) {
  var $_DBEJW = mwbxQ.$_DW()[6][13];
  for (; $_DBEJW !== mwbxQ.$_DW()[3][12]; ) {
    switch ($_DBEJW) {
    case mwbxQ.$_DW()[9][13]:
      return e[$_BIHEC(524)] = 0,
      e[$_BIHEC(174)](t) ? $_BIHFL(528) + t[$_BIHEC(45)](e, function(t) {
        var $_BIHJk = mwbxQ.$_Cg
          , $_BIHIS = ['$_BIICV'].concat($_BIHJk)
          , $_BIIAc = $_BIHIS[1];
        $_BIHIS.shift();
        var $_BIIBB = $_BIHIS[0];
        var e = n[t];
        return $_BIHJk(51) == typeof e ? e : $_BIIAc(532) + ($_BIHJk(584) + t[$_BIIAc(120)](0)[$_BIIAc(213)](16))[$_BIHJk(187)](-4);
      }) + $_BIHEC(528) : $_BIHEC(528) + t + $_BIHFL(528);
      break;
    }
  }
}
return $_BIHFL(88) != typeof Date[$_BIHFL(236)][$_BIHEC(566)] && (Date[$_BIHFL(236)][$_BIHFL(566)] = function() {
  var $_BIIEM = mwbxQ.$_Cg
    , $_BIIDF = ['$_BIIHm'].concat($_BIIEM)
    , $_BIIFy = $_BIIDF[1];
  $_BIIDF.shift();
  var $_BIIGy = $_BIIDF[0];
  return isFinite(this[$_BIIEM(13)]()) ? this[$_BIIEM(555)]() + $_BIIFy(78) + r(this[$_BIIEM(570)]() + 1) + $_BIIFy(78) + r(this[$_BIIFy(541)]()) + $_BIIEM(501) + r(this[$_BIIFy(596)]()) + $_BIIFy(79) + r(this[$_BIIFy(540)]()) + $_BIIFy(79) + r(this[$_BIIEM(522)]()) + $_BIIFy(500) : null;
}
,
Boolean[$_BIHFL(236)][$_BIHEC(566)] = i,
Number[$_BIHEC(236)][$_BIHEC(566)] = i,
String[$_BIHFL(236)][$_BIHEC(566)] = i),
n = {
  "\u0008": $_BIHFL(588),
  "\u0009": $_BIHFL(569),
  "\u000a": $_BIHFL(518),
  "\u000c": $_BIHEC(595),
  "\u000d": $_BIHFL(590),
  "\u0022": $_BIHFL(549),
  "\u005c": $_BIHFL(523)
},
t[$_BIHFL(254)] = function(t, e, n) {
  var $_BIIJv = mwbxQ.$_Cg
    , $_BIIIS = ['$_BIJCY'].concat($_BIIJv)
    , $_BIJAe = $_BIIIS[1];
  $_BIIIS.shift();
  var $_BIJBl = $_BIIIS[0];
  var r;
  if (l = u = $_BIJAe(2),
  $_BIJAe(83) == typeof n)
    for (r = 0; r < n; r += 1)
      l += $_BIIJv(57);
  else
    $_BIIJv(51) == typeof n && (l = n);
  if ((h = e) && $_BIJAe(88) != typeof e && ($_BIJAe(96) != typeof e || $_BIJAe(83) != typeof e[$_BIIJv(192)]))
    throw new Error($_BIIJv(644));
  return function c(t, e) {
    var $_BIJEZ = mwbxQ.$_Cg
      , $_BIJDM = ['$_BIJHn'].concat($_BIJEZ)
      , $_BIJFf = $_BIJDM[1];
    $_BIJDM.shift();
    var $_BIJGy = $_BIJDM[0];
    var n, r, i, o, s, a = u, _ = e[t];
    switch (_ && $_BIJFf(96) == typeof _ && $_BIJEZ(88) == typeof _[$_BIJEZ(566)] && (_ = _[$_BIJFf(566)](t)),
    $_BIJEZ(88) == typeof h && (_ = h[$_BIJFf(318)](e, t, _)),
    typeof _) {
    case $_BIJFf(51):
      return f(_);
    case $_BIJFf(83):
      return isFinite(_) ? String(_) : $_BIJEZ(617);
    case $_BIJEZ(61):
    case $_BIJEZ(617):
      return String(_);
    case $_BIJEZ(96):
      if (!_)
        return $_BIJEZ(617);
      if (u += l,
      s = [],
      $_BIJFf(468) === Object[$_BIJFf(236)][$_BIJEZ(213)][$_BIJEZ(353)](_)) {
        for (o = _[$_BIJEZ(192)],
        n = 0; n < o; n += 1)
          s[n] = c(n, _) || $_BIJEZ(617);
        return i = 0 === s[$_BIJEZ(192)] ? $_BIJEZ(636) : u ? $_BIJEZ(637) + u + s[$_BIJEZ(405)]($_BIJFf(625) + u) + $_BIJEZ(229) + a + $_BIJEZ(610) : $_BIJFf(683) + s[$_BIJEZ(405)]($_BIJFf(659)) + $_BIJFf(610),
        u = a,
        i;
      }
      if (h && $_BIJEZ(96) == typeof h)
        for (o = h[$_BIJEZ(192)],
        n = 0; n < o; n += 1)
          $_BIJEZ(51) == typeof h[n] && (i = c(r = h[n], _)) && s[$_BIJFf(137)](f(r) + (u ? $_BIJFf(74) : $_BIJEZ(79)) + i);
      else
        for (r in _)
          Object[$_BIJFf(236)][$_BIJFf(75)][$_BIJEZ(318)](_, r) && (i = c(r, _)) && s[$_BIJFf(137)](f(r) + (u ? $_BIJFf(74) : $_BIJFf(79)) + i);
      return i = 0 === s[$_BIJEZ(192)] ? $_BIJEZ(669) : u ? $_BIJFf(673) + u + s[$_BIJFf(405)]($_BIJEZ(625) + u) + $_BIJEZ(229) + a + $_BIJEZ(674) : $_BIJEZ(676) + s[$_BIJEZ(405)]($_BIJFf(659)) + $_BIJFf(674),
      u = a,
      i;
    }
  }($_BIJAe(2), {
    "": t
  });
}
,
t;
}()

function H(t, e) {
          var $_DAJEI = mwbxQ.$_DW()[9][13];
          for (; $_DAJEI !== mwbxQ.$_DW()[0][11]; ) {
              switch ($_DAJEI) {
              case mwbxQ.$_DW()[6][13]:
                  for (var n = e[$_CJES(187)](-2), r = [], i = 0; i < n[$_CJES(192)]; i++) {
                      var o = n[$_CJFt(120)](i);
                      r[i] = 57 < o ? o - 87 : o - 48;
                  }
                  n = 36 * r[0] + r[1];
                  var s, a = Math[$_CJES(158)](t) + n, _ = [[], [], [], [], []], c = {}, u = 0;
                  i = 0;
                  $_DAJEI = mwbxQ.$_DW()[6][12];
                  break;
              case mwbxQ.$_DW()[0][12]:
                  for (var l = (e = e[$_CJES(187)](0, -2))[$_CJFt(192)]; i < l; i++)
                      c[s = e[$_CJES(125)](i)] || (c[s] = 1,
                      _[u][$_CJES(137)](s),
                      u = 5 == ++u ? 0 : u);
                  var h, f = a, d = 4, p = $_CJFt(2), g = [1, 2, 5, 10, 50];
                  while (0 < f)
                      0 <= f - g[d] ? (h = parseInt(Math[$_CJFt(21)]() * _[d][$_CJFt(192)], 10),
                      p += _[d][h],
                      f -= g[d]) : (_[$_CJES(115)](d, 1),
                      g[$_CJES(115)](d, 1),
                      d -= 1);
                  return p;
                  break;
              }
          }
      }

function ct(t) {
var $_DBECk = mwbxQ.$_DW()[3][13];
for (; $_DBECk !== mwbxQ.$_DW()[9][12]; ) {
  switch ($_DBECk) {
  case mwbxQ.$_DW()[6][13]:
    this[$_CJFt(436)] = t || [];
    $_DBECk = mwbxQ.$_DW()[0][12];
    break;
  }
}
}

ct[$_CJES(236)] = {
"\u0024\u005f\u0048\u0042\u0077": function(t) {
  var $_BFCES = mwbxQ.$_Cg
    , $_BFCDS = ['$_BFCHo'].concat($_BFCES)
    , $_BFCFF = $_BFCDS[1];
  $_BFCDS.shift();
  var $_BFCGu = $_BFCDS[0];
  return this[$_BFCES(436)][t];
},
"\u0024\u005f\u0042\u0043\u0043\u007a": function() {
  var $_BFCJU = mwbxQ.$_Cg
    , $_BFCID = ['$_BFDCd'].concat($_BFCJU)
    , $_BFDAs = $_BFCID[1];
  $_BFCID.shift();
  var $_BFDBv = $_BFCID[0];
  return this[$_BFDAs(436)][$_BFCJU(192)];
},
"\u0024\u005f\u0042\u004a\u0053": function(t, e) {
  var $_BFDEJ = mwbxQ.$_Cg
    , $_BFDDL = ['$_BFDHr'].concat($_BFDEJ)
    , $_BFDFd = $_BFDDL[1];
  $_BFDDL.shift();
  var $_BFDGR = $_BFDDL[0];
  return new ct(Q(e) ? this[$_BFDFd(436)][$_BFDEJ(187)](t, e) : this[$_BFDFd(436)][$_BFDEJ(187)](t));
},
"\u0024\u005f\u0042\u0043\u0044\u0058": function(t) {
  var $_BFDJc = mwbxQ.$_Cg
    , $_BFDII = ['$_BFECb'].concat($_BFDJc)
    , $_BFEAP = $_BFDII[1];
  $_BFDII.shift();
  var $_BFEBq = $_BFDII[0];
  return this[$_BFEAP(436)][$_BFDJc(137)](t),
  this;
},
"\u0024\u005f\u0042\u0043\u0045\u006a": function(t, e) {
  var $_BFEEU = mwbxQ.$_Cg
    , $_BFEDo = ['$_BFEHh'].concat($_BFEEU)
    , $_BFEFa = $_BFEDo[1];
  $_BFEDo.shift();
  var $_BFEGK = $_BFEDo[0];
  return this[$_BFEEU(436)][$_BFEEU(115)](t, e || 1);
},
"\u0024\u005f\u0043\u0042\u0047": function(t) {
  var $_BFEJQ = mwbxQ.$_Cg
    , $_BFEIR = ['$_BFFCB'].concat($_BFEJQ)
    , $_BFFAm = $_BFEIR[1];
  $_BFEIR.shift();
  var $_BFFBa = $_BFEIR[0];
  return this[$_BFEJQ(436)][$_BFFAm(405)](t);
},
"\u0024\u005f\u0042\u0043\u0046\u0055": function(t) {
  var $_BFFEO = mwbxQ.$_Cg
    , $_BFFDj = ['$_BFFHi'].concat($_BFFEO)
    , $_BFFFH = $_BFFDj[1];
  $_BFFDj.shift();
  var $_BFFGc = $_BFFDj[0];
  return new ct(this[$_BFFEO(436)][$_BFFEO(388)](t));
},
"\u0024\u005f\u0043\u0041\u0045": function(t) {
  var $_BFFJe = mwbxQ.$_Cg
    , $_BFFIQ = ['$_BFGCs'].concat($_BFFJe)
    , $_BFGAj = $_BFFIQ[1];
  $_BFFIQ.shift();
  var $_BFGBz = $_BFFIQ[0];
  var e = this[$_BFGAj(436)];
  if (e[$_BFFJe(429)])
    return new ct(e[$_BFFJe(429)](t));
  for (var n = [], r = 0, i = e[$_BFGAj(192)]; r < i; r += 1)
    n[r] = t(e[r], r, this);
  return new ct(n);
},
"\u0024\u005f\u0042\u0043\u0047\u0063": function(t) {
  var $_BFGEm = mwbxQ.$_Cg
    , $_BFGDf = ['$_BFGHp'].concat($_BFGEm)
    , $_BFGFD = $_BFGDf[1];
  $_BFGDf.shift();
  var $_BFGGE = $_BFGDf[0];
  var e = this[$_BFGEm(436)];
  if (e[$_BFGFD(445)])
    return new ct(e[$_BFGFD(445)](t));
  for (var n = [], r = 0, i = e[$_BFGFD(192)]; r < i; r += 1)
    t(e[r], r, this) && n[$_BFGFD(137)](e[r]);
  return new ct(n);
},
"\u0024\u005f\u0042\u0043\u0048\u0073": function(t) {
  var $_BFGJz = mwbxQ.$_Cg
    , $_BFGIl = ['$_BFHCH'].concat($_BFGJz)
    , $_BFHAK = $_BFGIl[1];
  $_BFGIl.shift();
  var $_BFHBB = $_BFGIl[0];
  var e = this[$_BFGJz(436)];
  if (e[$_BFGJz(129)])
    return e[$_BFHAK(129)](t);
  for (var n = 0, r = e[$_BFGJz(192)]; n < r; n += 1)
    if (e[n] === t)
      return n;
  return -1;
},
"\u0024\u005f\u0042\u0043\u0049\u0045": function(t) {
  var $_BFHEQ = mwbxQ.$_Cg
    , $_BFHDF = ['$_BFHHs'].concat($_BFHEQ)
    , $_BFHFt = $_BFHDF[1];
  $_BFHDF.shift();
  var $_BFHGS = $_BFHDF[0];
  var e = this[$_BFHEQ(436)];
  if (!e[$_BFHFt(438)])
    for (var n = arguments[1], r = 0; r < e[$_BFHFt(192)]; r++)
      r in e && t[$_BFHEQ(318)](n, e[r], r, this);
  return e[$_BFHEQ(438)](t);
}
},
ct[$_CJFt(403)] = function(t) {
var $_BFHJR = mwbxQ.$_Cg
  , $_BFHIV = ['$_BFICX'].concat($_BFHJR)
  , $_BFIAK = $_BFHIV[1];
$_BFHIV.shift();
var $_BFIBT = $_BFHIV[0];
return Array[$_BFIAK(421)] ? Array[$_BFIAK(421)](t) : $_BFHJR(468) === Object[$_BFHJR(236)][$_BFIAK(213)][$_BFHJR(318)](t);
}

function bt() {
var $_DBFCb = mwbxQ.$_DW()[0][13];
for (; $_DBFCb !== mwbxQ.$_DW()[3][13]; ) {
  switch ($_DBFCb) {
  }
}
}
bt[$_CJFt(236)] = {
"\u0024\u005f\u0042\u0047\u0047\u0058": function() {
  var $_BJBES = mwbxQ.$_Cg
    , $_BJBDB = ['$_BJBHN'].concat($_BJBES)
    , $_BJBFe = $_BJBDB[1];
  $_BJBDB.shift();
  var $_BJBGH = $_BJBDB[0];
  return window[$_BJBES(678)] && window[$_BJBFe(678)][$_BJBFe(655)] && this[$_BJBES(614)]() || -1;
},
"\u0024\u005f\u0042\u0047\u0048\u006a": function() {
  var $_BJBJc = mwbxQ.$_Cg
    , $_BJBID = ['$_BJCCA'].concat($_BJBJc)
    , $_BJCAJ = $_BJBID[1];
  $_BJBID.shift();
  var $_BJCBm = $_BJBID[0];
  var t = window[$_BJCAJ(678)][$_BJCAJ(655)];
  return {
    "\u0061": t[$_BJCAJ(662)],
    "\u0062": t[$_BJBJc(633)],
    "\u0063": t[$_BJBJc(672)],
    "\u0064": t[$_BJBJc(691)],
    "\u0065": t[$_BJCAJ(653)],
    "\u0066": t[$_BJCAJ(688)],
    "\u0067": t[$_BJCAJ(658)],
    "\u0068": t[$_BJCAJ(668)],
    "\u0069": t[$_BJCAJ(619)],
    "\u006a": t[$_BJCAJ(684)],
    "\u006b": t[$_BJBJc(613)],
    "\u006c": t[$_BJBJc(624)],
    "\u006d": t[$_BJCAJ(638)],
    "\u006e": t[$_BJCAJ(689)],
    "\u006f": t[$_BJCAJ(628)],
    "\u0070": t[$_BJCAJ(690)],
    "\u0071": t[$_BJCAJ(656)],
    "\u0072": t[$_BJCAJ(645)],
    "\u0073": t[$_BJCAJ(696)],
    "\u0074": t[$_BJBJc(620)],
    "\u0075": t[$_BJCAJ(609)]
  };
}
};


var V = function() {
var $_BADJt = mwbxQ.$_Cg
  , $_BADIa = ['$_BAECr'].concat($_BADJt)
  , $_BAEAV = $_BADIa[1];
$_BADIa.shift();
var $_BAEBA = $_BADIa[0];
var t, n = Object[$_BADJt(332)] || function() {
  var $_BAEEE = mwbxQ.$_Cg
    , $_BAEDl = ['$_BAEHS'].concat($_BAEEE)
    , $_BAEFj = $_BAEDl[1];
  $_BAEDl.shift();
  var $_BAEGA = $_BAEDl[0];
  function n() {
    var $_DBDBf = mwbxQ.$_DW()[9][13];
    for (; $_DBDBf !== mwbxQ.$_DW()[6][13]; ) {
      switch ($_DBDBf) {
      }
    }
  }
  return function(t) {
    var $_BAEJv = mwbxQ.$_Cg
      , $_BAEIj = ['$_BAFCC'].concat($_BAEJv)
      , $_BAFAl = $_BAEIj[1];
    $_BAEIj.shift();
    var $_BAFBp = $_BAEIj[0];
    var e;
    return n[$_BAFAl(236)] = t,
    e = new n(),
    n[$_BAEJv(236)] = null,
    e;
  }
  ;
}(), e = {}, r = e[$_BAEAV(335)] = {}, i = r[$_BAEAV(366)] = {
  "\u0065\u0078\u0074\u0065\u006e\u0064": function(t) {
    var $_BAFEt = mwbxQ.$_Cg
      , $_BAFDF = ['$_BAFHe'].concat($_BAFEt)
      , $_BAFFv = $_BAFDF[1];
    $_BAFDF.shift();
    var $_BAFGa = $_BAFDF[0];
    var e = n(this);
    return t && e[$_BAFEt(309)](t),
    e[$_BAFFv(75)]($_BAFEt(244)) && this[$_BAFFv(244)] !== e[$_BAFEt(244)] || (e[$_BAFEt(244)] = function() {
      var $_BAFJB = mwbxQ.$_Cg
        , $_BAFIu = ['$_BAGC_'].concat($_BAFJB)
        , $_BAGAD = $_BAFIu[1];
      $_BAFIu.shift();
      var $_BAGBp = $_BAFIu[0];
      e[$_BAFJB(374)][$_BAFJB(244)][$_BAGAD(353)](this, arguments);
    }
    ),
    (e[$_BAFFv(244)][$_BAFEt(236)] = e)[$_BAFEt(374)] = this,
    e;
  },
  "\u0063\u0072\u0065\u0061\u0074\u0065": function() {
    var $_BAGEm = mwbxQ.$_Cg
      , $_BAGDt = ['$_BAGHP'].concat($_BAGEm)
      , $_BAGFG = $_BAGDt[1];
    $_BAGDt.shift();
    var $_BAGGm = $_BAGDt[0];
    var t = this[$_BAGEm(362)]();
    return t[$_BAGFG(244)][$_BAGEm(353)](t, arguments),
    t;
  },
  "\u0069\u006e\u0069\u0074": function() {
    var $_BAGJW = mwbxQ.$_Cg
      , $_BAGIb = ['$_BAHCB'].concat($_BAGJW)
      , $_BAHA_ = $_BAGIb[1];
    $_BAGIb.shift();
    var $_BAHBO = $_BAGIb[0];
  },
  "\u006d\u0069\u0078\u0049\u006e": function(t) {
    var $_BAHEr = mwbxQ.$_Cg
      , $_BAHDx = ['$_BAHHW'].concat($_BAHEr)
      , $_BAHFJ = $_BAHDx[1];
    $_BAHDx.shift();
    var $_BAHGn = $_BAHDx[0];
    for (var e in t)
      t[$_BAHFJ(75)](e) && (this[e] = t[e]);
    t[$_BAHEr(75)]($_BAHEr(213)) && (this[$_BAHFJ(213)] = t[$_BAHEr(213)]);
  }
}, u = r[$_BADJt(300)] = i[$_BAEAV(362)]({
  "\u0069\u006e\u0069\u0074": function(t, e) {
    var $_BAHJe = mwbxQ.$_Cg
      , $_BAHIn = ['$_BAICM'].concat($_BAHJe)
      , $_BAIAd = $_BAHIn[1];
    $_BAHIn.shift();
    var $_BAIBU = $_BAHIn[0];
    t = this[$_BAIAd(389)] = t || [],
    e != undefined ? this[$_BAIAd(358)] = e : this[$_BAHJe(358)] = 4 * t[$_BAHJe(192)];
  },
  "\u0063\u006f\u006e\u0063\u0061\u0074": function(t) {
    var $_BAIEt = mwbxQ.$_Cg
      , $_BAIDJ = ['$_BAIHJ'].concat($_BAIEt)
      , $_BAIFl = $_BAIDJ[1];
    $_BAIDJ.shift();
    var $_BAIGJ = $_BAIDJ[0];
    var e = this[$_BAIEt(389)]
      , n = t[$_BAIFl(389)]
      , r = this[$_BAIFl(358)]
      , i = t[$_BAIFl(358)];
    if (this[$_BAIEt(327)](),
    r % 4)
      for (var o = 0; o < i; o++) {
        var s = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
        e[r + o >>> 2] |= s << 24 - (r + o) % 4 * 8;
      }
    else
      for (o = 0; o < i; o += 4)
        e[r + o >>> 2] = n[o >>> 2];
    return this[$_BAIFl(358)] += i,
    this;
  },
  "\u0063\u006c\u0061\u006d\u0070": function() {
    var $_BAIJy = mwbxQ.$_Cg
      , $_BAIIq = ['$_BAJCp'].concat($_BAIJy)
      , $_BAJAx = $_BAIIq[1];
    $_BAIIq.shift();
    var $_BAJBX = $_BAIIq[0];
    var t = this[$_BAJAx(389)]
      , e = this[$_BAIJy(358)];
    t[e >>> 2] &= 4294967295 << 32 - e % 4 * 8,
    t[$_BAJAx(192)] = Math[$_BAJAx(373)](e / 4);
  }
}), o = e[$_BADJt(337)] = {}, l = o[$_BAEAV(360)] = {
  "\u0070\u0061\u0072\u0073\u0065": function(t) {
    var $_BAJEI = mwbxQ.$_Cg
      , $_BAJDx = ['$_BAJHj'].concat($_BAJEI)
      , $_BAJFK = $_BAJDx[1];
    $_BAJDx.shift();
    var $_BAJGD = $_BAJDx[0];
    for (var e = t[$_BAJFK(192)], n = [], r = 0; r < e; r++)
      n[r >>> 2] |= (255 & t[$_BAJEI(120)](r)) << 24 - r % 4 * 8;
    return new u[($_BAJEI(244))](n,e);
  }
}, s = o[$_BADJt(326)] = {
  "\u0070\u0061\u0072\u0073\u0065": function(t) {
    var $_BAJJS = mwbxQ.$_Cg
      , $_BAJIG = ['$_BBACD'].concat($_BAJJS)
      , $_BBAAW = $_BAJIG[1];
    $_BAJIG.shift();
    var $_BBABB = $_BAJIG[0];
    return l[$_BAJJS(266)](unescape(encodeURIComponent(t)));
  }
}, a = r[$_BAEAV(304)] = i[$_BADJt(362)]({
  "\u0072\u0065\u0073\u0065\u0074": function() {
    var $_BBAEN = mwbxQ.$_Cg
      , $_BBADu = ['$_BBAHe'].concat($_BBAEN)
      , $_BBAFB = $_BBADu[1];
    $_BBADu.shift();
    var $_BBAGI = $_BBADu[0];
    this[$_BBAEN(359)] = new u[($_BBAEN(244))](),
    this[$_BBAFB(363)] = 0;
  },
  "\u0024\u005f\u0048\u0045\u006f": function(t) {
    var $_BBAJa = mwbxQ.$_Cg
      , $_BBAIG = ['$_BBBCr'].concat($_BBAJa)
      , $_BBBAw = $_BBAIG[1];
    $_BBAIG.shift();
    var $_BBBBj = $_BBAIG[0];
    $_BBBAw(51) == typeof t && (t = s[$_BBAJa(266)](t)),
    this[$_BBBAw(359)][$_BBAJa(388)](t),
    this[$_BBAJa(363)] += t[$_BBBAw(358)];
  },
  "\u0024\u005f\u0048\u0046\u0061": function(t) {
    var $_BBBEZ = mwbxQ.$_Cg
      , $_BBBDX = ['$_BBBHm'].concat($_BBBEZ)
      , $_BBBFp = $_BBBDX[1];
    $_BBBDX.shift();
    var $_BBBGj = $_BBBDX[0];
    var e = this[$_BBBFp(359)]
      , n = e[$_BBBEZ(389)]
      , r = e[$_BBBEZ(358)]
      , i = this[$_BBBFp(391)]
      , o = r / (4 * i)
      , s = (o = t ? Math[$_BBBFp(373)](o) : Math[$_BBBFp(242)]((0 | o) - this[$_BBBEZ(308)], 0)) * i
      , a = Math[$_BBBEZ(322)](4 * s, r);
    if (s) {
      for (var _ = 0; _ < s; _ += i)
        this[$_BBBEZ(355)](n, _);
      var c = n[$_BBBFp(115)](0, s);
      e[$_BBBFp(358)] -= a;
    }
    return new u[($_BBBFp(244))](c,a);
  },
  "\u0024\u005f\u0048\u0047\u0067": 0
}), _ = e[$_BADJt(336)] = {}, c = r[$_BADJt(354)] = a[$_BADJt(362)]({
  "\u0063\u0066\u0067": i[$_BADJt(362)](),
  "\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006e\u0063\u0072\u0079\u0070\u0074\u006f\u0072": function(t, e) {
    var $_BBBJj = mwbxQ.$_Cg
      , $_BBBIY = ['$_BBCCY'].concat($_BBBJj)
      , $_BBCAQ = $_BBBIY[1];
    $_BBBIY.shift();
    var $_BBCBV = $_BBBIY[0];
    return this[$_BBCAQ(332)](this[$_BBCAQ(315)], t, e);
  },
  "\u0069\u006e\u0069\u0074": function(t, e, n) {
    var $_BBCEH = mwbxQ.$_Cg
      , $_BBCDY = ['$_BBCHb'].concat($_BBCEH)
      , $_BBCFh = $_BBCDY[1];
    $_BBCDY.shift();
    var $_BBCGG = $_BBCDY[0];
    this[$_BBCEH(371)] = this[$_BBCFh(371)][$_BBCEH(362)](n),
    this[$_BBCFh(381)] = t,
    this[$_BBCFh(378)] = e,
    this[$_BBCFh(319)]();
  },
  "\u0072\u0065\u0073\u0065\u0074": function() {
    var $_BBCJl = mwbxQ.$_Cg
      , $_BBCI_ = ['$_BBDCH'].concat($_BBCJl)
      , $_BBDAD = $_BBCI_[1];
    $_BBCI_.shift();
    var $_BBDBy = $_BBCI_[0];
    a[$_BBCJl(319)][$_BBDAD(318)](this),
    this[$_BBCJl(398)]();
  },
  "\u0070\u0072\u006f\u0063\u0065\u0073\u0073": function(t) {
    var $_BBDEk = mwbxQ.$_Cg
      , $_BBDDu = ['$_BBDHx'].concat($_BBDEk)
      , $_BBDFK = $_BBDDu[1];
    $_BBDDu.shift();
    var $_BBDGp = $_BBDDu[0];
    return this[$_BBDFK(348)](t),
    this[$_BBDFK(324)]();
  },
  "\u0066\u0069\u006e\u0061\u006c\u0069\u007a\u0065": function(t) {
    var $_BBDJC = mwbxQ.$_Cg
      , $_BBDIk = ['$_BBECI'].concat($_BBDJC)
      , $_BBEAu = $_BBDIk[1];
    $_BBDIk.shift();
    var $_BBEBk = $_BBDIk[0];
    return t && this[$_BBEAu(348)](t),
    this[$_BBEAu(343)]();
  },
  "\u006b\u0065\u0079\u0053\u0069\u007a\u0065": 4,
  "\u0069\u0076\u0053\u0069\u007a\u0065": 4,
  "\u0024\u005f\u0048\u0049\u005a": 1,
  "\u0024\u005f\u0049\u0044\u006a": 2,
  "\u0024\u005f\u0049\u0045\u0069": function(c) {
    var $_BBEEZ = mwbxQ.$_Cg
      , $_BBEDB = ['$_BBEHG'].concat($_BBEEZ)
      , $_BBEFK = $_BBEDB[1];
    $_BBEDB.shift();
    var $_BBEGh = $_BBEDB[0];
    return {
      "\u0065\u006e\u0063\u0072\u0079\u0070\u0074": function(t, e, n) {
        var $_BBEJx = mwbxQ.$_Cg
          , $_BBEIi = ['$_BBFC_'].concat($_BBEJx)
          , $_BBFAc = $_BBEIi[1];
        $_BBEIi.shift();
        var $_BBFBp = $_BBEIi[0];
        e = l[$_BBFAc(266)](e),
        n && n[$_BBFAc(344)] || ((n = n || {})[$_BBEJx(344)] = l[$_BBEJx(266)]($_BBEJx(431)));
        for (var r = m[$_BBEJx(392)](c, t, e, n), i = r[$_BBEJx(470)][$_BBEJx(389)], o = r[$_BBEJx(470)][$_BBFAc(358)], s = [], a = 0; a < o; a++) {
          var _ = i[a >>> 2] >>> 24 - a % 4 * 8 & 255;
          s[$_BBEJx(137)](_);
        }
        return s;
      }
    };
  }
}), h = e[$_BAEAV(472)] = {}, f = r[$_BADJt(486)] = i[$_BADJt(362)]({
  "\u0063\u0072\u0065\u0061\u0074\u0065\u0045\u006e\u0063\u0072\u0079\u0070\u0074\u006f\u0072": function(t, e) {
    var $_BBFEd = mwbxQ.$_Cg
      , $_BBFDt = ['$_BBFHA'].concat($_BBFEd)
      , $_BBFFH = $_BBFDt[1];
    $_BBFDt.shift();
    var $_BBFGj = $_BBFDt[0];
    return this[$_BBFEd(413)][$_BBFFH(332)](t, e);
  },
  "\u0069\u006e\u0069\u0074": function(t, e) {
    var $_BBFJT = mwbxQ.$_Cg
      , $_BBFIz = ['$_BBGCM'].concat($_BBFJT)
      , $_BBGAq = $_BBFIz[1];
    $_BBFIz.shift();
    var $_BBGBL = $_BBFIz[0];
    this[$_BBGAq(488)] = t,
    this[$_BBGAq(499)] = e;
  }
}), d = h[$_BADJt(494)] = ((t = f[$_BAEAV(362)]())[$_BADJt(413)] = t[$_BAEAV(362)]({
  "\u0070\u0072\u006f\u0063\u0065\u0073\u0073\u0042\u006c\u006f\u0063\u006b": function(t, e) {
    var $_BBGEM = mwbxQ.$_Cg
      , $_BBGDR = ['$_BBGHO'].concat($_BBGEM)
      , $_BBGFF = $_BBGDR[1];
    $_BBGDR.shift();
    var $_BBGGP = $_BBGDR[0];
    var n = this[$_BBGEM(488)]
      , r = n[$_BBGFF(391)];
    (function s(t, e, n) {
      var $_BBGJz = mwbxQ.$_Cg
        , $_BBGIK = ['$_BBHCB'].concat($_BBGJz)
        , $_BBHAW = $_BBGIK[1];
      $_BBGIK.shift();
      var $_BBHBj = $_BBGIK[0];
      var r = this[$_BBGJz(499)];
      if (r) {
        var i = r;
        this[$_BBHAW(499)] = undefined;
      } else
        var i = this[$_BBHAW(443)];
      for (var o = 0; o < n; o++)
        t[e + o] ^= i[o];
    }
    [$_BBGEM(318)](this, t, e, r),
    n[$_BBGEM(440)](t, e),
    this[$_BBGEM(443)] = t[$_BBGEM(187)](e, e + r));
  }
}),
t), p = (e[$_BAEAV(407)] = {})[$_BADJt(467)] = {
  "\u0070\u0061\u0064": function(t, e) {
    var $_BBHEh = mwbxQ.$_Cg
      , $_BBHDw = ['$_BBHHN'].concat($_BBHEh)
      , $_BBHFr = $_BBHDw[1];
    $_BBHDw.shift();
    var $_BBHGB = $_BBHDw[0];
    for (var n = 4 * e, r = n - t[$_BBHEh(358)] % n, i = r << 24 | r << 16 | r << 8 | r, o = [], s = 0; s < r; s += 4)
      o[$_BBHFr(137)](i);
    var a = u[$_BBHEh(332)](o, r);
    t[$_BBHFr(388)](a);
  }
}, g = r[$_BADJt(449)] = c[$_BADJt(362)]({
  "\u0063\u0066\u0067": c[$_BADJt(371)][$_BADJt(362)]({
    "\u006d\u006f\u0064\u0065": d,
    "\u0070\u0061\u0064\u0064\u0069\u006e\u0067": p
  }),
  "\u0072\u0065\u0073\u0065\u0074": function() {
    var $_BBHJV = mwbxQ.$_Cg
      , $_BBHIR = ['$_BBICE'].concat($_BBHJV)
      , $_BBIAo = $_BBHIR[1];
    $_BBHIR.shift();
    var $_BBIBm = $_BBHIR[0];
    c[$_BBIAo(319)][$_BBIAo(318)](this);
    var t = this[$_BBIAo(371)]
      , e = t[$_BBIAo(344)]
      , n = t[$_BBIAo(472)];
    if (this[$_BBIAo(381)] == this[$_BBIAo(315)])
      var r = n[$_BBIAo(404)];
    this[$_BBIAo(426)] && this[$_BBHJV(426)][$_BBIAo(471)] == r ? this[$_BBHJV(426)][$_BBHJV(244)](this, e && e[$_BBHJV(389)]) : (this[$_BBHJV(426)] = r[$_BBIAo(318)](n, this, e && e[$_BBIAo(389)]),
    this[$_BBIAo(426)][$_BBHJV(471)] = r);
  },
  "\u0024\u005f\u0048\u0048\u0041": function(t, e) {
    var $_BBIEy = mwbxQ.$_Cg
      , $_BBIDm = ['$_BBIHz'].concat($_BBIEy)
      , $_BBIFC = $_BBIDm[1];
    $_BBIDm.shift();
    var $_BBIGb = $_BBIDm[0];
    this[$_BBIFC(426)][$_BBIEy(406)](t, e);
  },
  "\u0024\u005f\u0049\u0043\u004a": function() {
    var $_BBIJR = mwbxQ.$_Cg
      , $_BBIIQ = ['$_BBJCl'].concat($_BBIJR)
      , $_BBJAh = $_BBIIQ[1];
    $_BBIIQ.shift();
    var $_BBJBZ = $_BBIIQ[0];
    var t = this[$_BBIJR(371)][$_BBIJR(417)];
    if (this[$_BBIJR(381)] == this[$_BBJAh(315)]) {
      t[$_BBIJR(407)](this[$_BBJAh(359)], this[$_BBJAh(391)]);
      var e = this[$_BBIJR(324)](!0);
    }
    return e;
  },
  "\u0062\u006c\u006f\u0063\u006b\u0053\u0069\u007a\u0065": 4
}), v = r[$_BAEAV(487)] = i[$_BAEAV(362)]({
  "\u0069\u006e\u0069\u0074": function(t) {
    var $_BBJEe = mwbxQ.$_Cg
      , $_BBJDP = ['$_BBJHo'].concat($_BBJEe)
      , $_BBJFC = $_BBJDP[1];
    $_BBJDP.shift();
    var $_BBJGe = $_BBJDP[0];
    this[$_BBJEe(309)](t);
  }
}), m = r[$_BADJt(462)] = i[$_BADJt(362)]({
  "\u0063\u0066\u0067": i[$_BAEAV(362)](),
  "\u0065\u006e\u0063\u0072\u0079\u0070\u0074": function(t, e, n, r) {
    var $_BBJJH = mwbxQ.$_Cg
      , $_BBJIN = ['$_BCACu'].concat($_BBJJH)
      , $_BCAAa = $_BBJIN[1];
    $_BBJIN.shift();
    var $_BCABT = $_BBJIN[0];
    r = this[$_BBJJH(371)][$_BCAAa(362)](r);
    var i = t[$_BCAAa(404)](n, r)
      , o = i[$_BBJJH(476)](e)
      , s = i[$_BCAAa(371)];
    return v[$_BBJJH(332)]({
      "\u0063\u0069\u0070\u0068\u0065\u0072\u0074\u0065\u0078\u0074": o,
      "\u006b\u0065\u0079": n,
      "\u0069\u0076": s[$_BBJJH(344)],
      "\u0061\u006c\u0067\u006f\u0072\u0069\u0074\u0068\u006d": t,
      "\u006d\u006f\u0064\u0065": s[$_BCAAa(472)],
      "\u0070\u0061\u0064\u0064\u0069\u006e\u0067": s[$_BBJJH(417)],
      "\u0062\u006c\u006f\u0063\u006b\u0053\u0069\u007a\u0065": t[$_BBJJH(391)],
      "\u0066\u006f\u0072\u006d\u0061\u0074\u0074\u0065\u0072": r[$_BBJJH(448)]
    });
  }
}), y = [], w = [], b = [], x = [], E = [], C = [], S = [], T = [], k = [], A = [];
!function() {
  var $_BCAEq = mwbxQ.$_Cg
    , $_BCADy = ['$_BCAHY'].concat($_BCAEq)
    , $_BCAFg = $_BCADy[1];
  $_BCADy.shift();
  var $_BCAGd = $_BCADy[0];
  for (var t = [], e = 0; e < 256; e++)
    t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
  var n = 0
    , r = 0;
  for (e = 0; e < 256; e++) {
    var i = r ^ r << 1 ^ r << 2 ^ r << 3 ^ r << 4;
    i = i >>> 8 ^ 255 & i ^ 99,
    y[n] = i;
    var o = t[w[i] = n]
      , s = t[o]
      , a = t[s]
      , _ = 257 * t[i] ^ 16843008 * i;
    b[n] = _ << 24 | _ >>> 8,
    x[n] = _ << 16 | _ >>> 16,
    E[n] = _ << 8 | _ >>> 24,
    C[n] = _;
    _ = 16843009 * a ^ 65537 * s ^ 257 * o ^ 16843008 * n;
    S[i] = _ << 24 | _ >>> 8,
    T[i] = _ << 16 | _ >>> 16,
    k[i] = _ << 8 | _ >>> 24,
    A[i] = _,
    n ? (n = o ^ t[t[t[a ^ o]]],
    r ^= t[t[r]]) : n = r = 1;
  }
}();
var D = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
  , M = _[$_BADJt(401)] = g[$_BAEAV(362)]({
  "\u0024\u005f\u0049\u0042\u0059": function() {
    var $_BCAJI = mwbxQ.$_Cg
      , $_BCAIT = ['$_BCBCA'].concat($_BCAJI)
      , $_BCBAY = $_BCAIT[1];
    $_BCAIT.shift();
    var $_BCBBJ = $_BCAIT[0];
    if (!this[$_BCAJI(459)] || this[$_BCAJI(460)] !== this[$_BCBAY(378)]) {
      for (var t = this[$_BCAJI(460)] = this[$_BCBAY(378)], e = t[$_BCAJI(389)], n = t[$_BCAJI(358)] / 4, r = 4 * (1 + (this[$_BCAJI(459)] = 6 + n)), i = this[$_BCBAY(465)] = [], o = 0; o < r; o++)
        if (o < n)
          i[o] = e[o];
        else {
          var s = i[o - 1];
          o % n ? 6 < n && o % n == 4 && (s = y[s >>> 24] << 24 | y[s >>> 16 & 255] << 16 | y[s >>> 8 & 255] << 8 | y[255 & s]) : (s = y[(s = s << 8 | s >>> 24) >>> 24] << 24 | y[s >>> 16 & 255] << 16 | y[s >>> 8 & 255] << 8 | y[255 & s],
          s ^= D[o / n | 0] << 24),
          i[o] = i[o - n] ^ s;
        }
      for (var a = this[$_BCBAY(498)] = [], _ = 0; _ < r; _++) {
        o = r - _;
        if (_ % 4)
          s = i[o];
        else
          s = i[o - 4];
        a[_] = _ < 4 || o <= 4 ? s : S[y[s >>> 24]] ^ T[y[s >>> 16 & 255]] ^ k[y[s >>> 8 & 255]] ^ A[y[255 & s]];
      }
    }
  },
  "\u0065\u006e\u0063\u0072\u0079\u0070\u0074\u0042\u006c\u006f\u0063\u006b": function(t, e) {
    var $_BCBEC = mwbxQ.$_Cg
      , $_BCBDX = ['$_BCBHG'].concat($_BCBEC)
      , $_BCBFy = $_BCBDX[1];
    $_BCBDX.shift();
    var $_BCBGg = $_BCBDX[0];
    this[$_BCBFy(458)](t, e, this[$_BCBEC(465)], b, x, E, C, y);
  },
  "\u0024\u005f\u004a\u0045\u006b": function(t, e, n, r, i, o, s, a) {
    var $_BCBJl = mwbxQ.$_Cg
      , $_BCBIg = ['$_BCCCS'].concat($_BCBJl)
      , $_BCCAv = $_BCBIg[1];
    $_BCBIg.shift();
    var $_BCCBj = $_BCBIg[0];
    for (var _ = this[$_BCCAv(459)], c = t[e] ^ n[0], u = t[e + 1] ^ n[1], l = t[e + 2] ^ n[2], h = t[e + 3] ^ n[3], f = 4, d = 1; d < _; d++) {
      var p = r[c >>> 24] ^ i[u >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & h] ^ n[f++]
        , g = r[u >>> 24] ^ i[l >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & c] ^ n[f++]
        , v = r[l >>> 24] ^ i[h >>> 16 & 255] ^ o[c >>> 8 & 255] ^ s[255 & u] ^ n[f++]
        , m = r[h >>> 24] ^ i[c >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & l] ^ n[f++];
      c = p,
      u = g,
      l = v,
      h = m;
    }
    p = (a[c >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & h]) ^ n[f++],
    g = (a[u >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & c]) ^ n[f++],
    v = (a[l >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[c >>> 8 & 255] << 8 | a[255 & u]) ^ n[f++],
    m = (a[h >>> 24] << 24 | a[c >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & l]) ^ n[f++];
    t[e] = p,
    t[e + 1] = g,
    t[e + 2] = v,
    t[e + 3] = m;
  },
  "\u006b\u0065\u0079\u0053\u0069\u007a\u0065": 8
});
return e[$_BAEAV(401)] = g[$_BAEAV(463)](M),
e[$_BAEAV(401)];
}();


var m = {
"\u0024\u005f\u0044\u004a\u0077": {
  "\u0024\u005f\u0045\u0041\u0057": $_CJFt(278),
  "\u0024\u005f\u0045\u0042\u0054": $_CJES(24),
  "\u0024\u005f\u0045\u0043\u004f": 7274496,
  "\u0024\u005f\u0045\u0044\u0066": 9483264,
  "\u0024\u005f\u0045\u0045\u004f": 19220,
  "\u0024\u005f\u0045\u0046\u006e": 235,
  "\u0024\u005f\u0045\u0047\u0058": 24
},
"\u0024\u005f\u0045\u0041\u0057": $_CJFt(278),
"\u0024\u005f\u0045\u0042\u0054": $_CJES(24),
"\u0024\u005f\u0045\u0043\u004f": 7274496,
"\u0024\u005f\u0045\u0044\u0066": 9483264,
"\u0024\u005f\u0045\u0045\u004f": 19220,
"\u0024\u005f\u0045\u0046\u006e": 235,
"\u0024\u005f\u0045\u0047\u0058": 24,
"\u0024\u005f\u0045\u0048\u0053": function(t) {
  var $_GBJH = mwbxQ.$_Cg
    , $_GBIK = ['$_GCCj'].concat($_GBJH)
    , $_GCAx = $_GBIK[1];
  $_GBIK.shift();
  var $_GCBS = $_GBIK[0];
  for (var e = [], n = 0, r = t[$_GBJH(192)]; n < r; n += 1)
    e[$_GCAx(137)](t[$_GCAx(120)](n));
  return e;
},
"\u0024\u005f\u0045\u0049\u0048": function(t) {
  var $_GCEA = mwbxQ.$_Cg
    , $_GCDO = ['$_GCHY'].concat($_GCEA)
    , $_GCFf = $_GCDO[1];
  $_GCDO.shift();
  var $_GCGl = $_GCDO[0];
  for (var e = $_GCEA(2), n = 0, r = t[$_GCEA(192)]; n < r; n += 1)
    e += String[$_GCEA(246)](t[n]);
  return e;
},
"\u0024\u005f\u0045\u004a\u0075": function(t) {
  var $_GCJa = mwbxQ.$_Cg
    , $_GCIw = ['$_GDCQ'].concat($_GCJa)
    , $_GDAS = $_GCIw[1];
  $_GCIw.shift();
  var $_GDBK = $_GCIw[0];
  var e = this[$_GCJa(217)];
  return t < 0 || t >= e[$_GCJa(192)] ? $_GCJa(24) : e[$_GCJa(125)](t);
},
"\u0024\u005f\u0046\u0041\u0045": function(t) {
  var $_GDEk = mwbxQ.$_Cg
    , $_GDDA = ['$_GDHd'].concat($_GDEk)
    , $_GDFg = $_GDDA[1];
  $_GDDA.shift();
  var $_GDGx = $_GDDA[0];
  return this[$_GDEk(217)][$_GDEk(129)](t);
},
"\u0024\u005f\u0046\u0042\u006d": function(t, e) {
  var $_GDJb = mwbxQ.$_Cg
    , $_GDIQ = ['$_GECJ'].concat($_GDJb)
    , $_GEA_ = $_GDIQ[1];
  $_GDIQ.shift();
  var $_GEBU = $_GDIQ[0];
  return t >> e & 1;
},
"\u0024\u005f\u0046\u0043\u0044": function(t, i) {
  var $_GEED = mwbxQ.$_Cg
    , $_GEDK = ['$_GEHX'].concat($_GEED)
    , $_GEFH = $_GEDK[1];
  $_GEDK.shift();
  var $_GEGp = $_GEDK[0];
  var o = this;
  i || (i = o);
  for (var e = function(t, e) {
    var $_GEJI = mwbxQ.$_Cg
      , $_GEIy = ['$_GFCz'].concat($_GEJI)
      , $_GFAZ = $_GEIy[1];
    $_GEIy.shift();
    var $_GFBR = $_GEIy[0];
    for (var n = 0, r = i[$_GEJI(289)] - 1; 0 <= r; r -= 1)
      1 === o[$_GFAZ(237)](e, r) && (n = (n << 1) + o[$_GFAZ(237)](t, r));
    return n;
  }, n = $_GEED(2), r = $_GEED(2), s = t[$_GEED(192)], a = 0; a < s; a += 3) {
    var _;
    if (a + 2 < s)
      _ = (t[a] << 16) + (t[a + 1] << 8) + t[a + 2],
      n += o[$_GEFH(264)](e(_, i[$_GEED(238)])) + o[$_GEED(264)](e(_, i[$_GEED(212)])) + o[$_GEED(264)](e(_, i[$_GEFH(226)])) + o[$_GEED(264)](e(_, i[$_GEFH(281)]));
    else {
      var c = s % 3;
      2 == c ? (_ = (t[a] << 16) + (t[a + 1] << 8),
      n += o[$_GEFH(264)](e(_, i[$_GEFH(238)])) + o[$_GEED(264)](e(_, i[$_GEED(212)])) + o[$_GEED(264)](e(_, i[$_GEED(226)])),
      r = i[$_GEED(265)]) : 1 == c && (_ = t[a] << 16,
      n += o[$_GEED(264)](e(_, i[$_GEED(238)])) + o[$_GEED(264)](e(_, i[$_GEED(212)])),
      r = i[$_GEFH(265)] + i[$_GEED(265)]);
    }
  }
  return {
    "\u0072\u0065\u0073": n,
    "\u0065\u006e\u0064": r
  };
},
"\u0024\u005f\u0046\u0044\u005f": function(t) {
  var $_GFEL = mwbxQ.$_Cg
    , $_GFDX = ['$_GFHO'].concat($_GFEL)
    , $_GFFs = $_GFDX[1];
  $_GFDX.shift();
  var $_GFGY = $_GFDX[0];
  var e = this[$_GFFs(228)](this[$_GFEL(290)](t));
  return e[$_GFFs(221)] + e[$_GFFs(252)];
},
"\u0024\u005f\u0046\u0045\u0058": function(t) {
  var $_GFJC = mwbxQ.$_Cg
    , $_GFIj = ['$_GGCw'].concat($_GFJC)
    , $_GGAP = $_GFIj[1];
  $_GFIj.shift();
  var $_GGBR = $_GFIj[0];
  var e = this[$_GGAP(228)](t);
  return e[$_GFJC(221)] + e[$_GFJC(252)];
},
"\u0024\u005f\u0046\u0046\u0051": function(t, o) {
  var $_GGEY = mwbxQ.$_Cg
    , $_GGDR = ['$_GGHE'].concat($_GGEY)
    , $_GGFL = $_GGDR[1];
  $_GGDR.shift();
  var $_GGGn = $_GGDR[0];
  var s = this;
  o || (o = s);
  for (var e = function(t, e) {
    var $_GGJX = mwbxQ.$_Cg
      , $_GGIO = ['$_GHCp'].concat($_GGJX)
      , $_GHAf = $_GGIO[1];
    $_GGIO.shift();
    var $_GHBf = $_GGIO[0];
    if (t < 0)
      return 0;
    for (var n = 5, r = 0, i = o[$_GHAf(289)] - 1; 0 <= i; i -= 1)
      1 === s[$_GGJX(237)](e, i) && (r += s[$_GGJX(237)](t, n) << i,
      n -= 1);
    return r;
  }, n = t[$_GGFL(192)], r = $_GGEY(2), i = 0; i < n; i += 4) {
    var a = e(s[$_GGEY(222)](t[$_GGFL(125)](i)), o[$_GGFL(238)]) + e(s[$_GGFL(222)](t[$_GGEY(125)](i + 1)), o[$_GGEY(212)]) + e(s[$_GGFL(222)](t[$_GGFL(125)](i + 2)), o[$_GGEY(226)]) + e(s[$_GGEY(222)](t[$_GGFL(125)](i + 3)), o[$_GGFL(281)])
      , _ = a >> 16 & 255;
    if (r += String[$_GGFL(246)](_),
    t[$_GGFL(125)](i + 2) !== o[$_GGFL(265)]) {
      var c = a >> 8 & 255;
      if (r += String[$_GGFL(246)](c),
      t[$_GGEY(125)](i + 3) !== o[$_GGFL(265)]) {
        var u = 255 & a;
        r += String[$_GGEY(246)](u);
      }
    }
  }
  return r;
},
"\u0024\u005f\u0046\u0047\u0055": function(t) {
  var $_GHEO = mwbxQ.$_Cg
    , $_GHDq = ['$_GHHs'].concat($_GHEO)
    , $_GHFW = $_GHDq[1];
  $_GHDq.shift();
  var $_GHGV = $_GHDq[0];
  var e = 4 - t[$_GHFW(192)] % 4;
  if (e < 4)
    for (var n = 0; n < e; n += 1)
      t += this[$_GHEO(265)];
  return this[$_GHEO(271)](t);
},
"\u0024\u005f\u0046\u0048\u0051": function(t) {
  var $_GHJH = mwbxQ.$_Cg
    , $_GHIW = ['$_GIC_'].concat($_GHJH)
    , $_GIAu = $_GHIW[1];
  $_GHIW.shift();
  var $_GIBX = $_GHIW[0];
  return this[$_GIAu(251)](t);
}
};



function X(t) {
          var $_DBBCG = mwbxQ.$_DW()[0][13];
          for (; $_DBBCG !== mwbxQ.$_DW()[3][12]; ) {
              switch ($_DBBCG) {
              case mwbxQ.$_DW()[9][13]:
                  function _(t, e) {
                      var $_DBBDF = mwbxQ.$_DW()[0][13];
                      for (; $_DBBDF !== mwbxQ.$_DW()[9][12]; ) {
                          switch ($_DBBDF) {
                          case mwbxQ.$_DW()[0][13]:
                              return t << e | t >>> 32 - e;
                              break;
                          }
                      }
                  }
                  function c(t, e) {
                      var $_DBBEn = mwbxQ.$_DW()[3][13];
                      for (; $_DBBEn !== mwbxQ.$_DW()[9][12]; ) {
                          switch ($_DBBEn) {
                          case mwbxQ.$_DW()[9][13]:
                              var n, r, i, o, s;
                              return i = 2147483648 & t,
                              o = 2147483648 & e,
                              s = (1073741823 & t) + (1073741823 & e),
                              (n = 1073741824 & t) & (r = 1073741824 & e) ? 2147483648 ^ s ^ i ^ o : n | r ? 1073741824 & s ? 3221225472 ^ s ^ i ^ o : 1073741824 ^ s ^ i ^ o : s ^ i ^ o;
                              break;
                          }
                      }
                  }
                  function e(t, e, n, r, i, o, s) {
                      var $_DBBFz = mwbxQ.$_DW()[3][13];
                      for (; $_DBBFz !== mwbxQ.$_DW()[3][12]; ) {
                          switch ($_DBBFz) {
                          case mwbxQ.$_DW()[6][13]:
                              return c(_(t = c(t, c(c(function a(t, e, n) {
                                  var $_HHJY = mwbxQ.$_Cg
                                    , $_HHIa = ['$_HICH'].concat($_HHJY)
                                    , $_HIA_ = $_HHIa[1];
                                  $_HHIa.shift();
                                  var $_HIBZ = $_HHIa[0];
                                  return t & e | ~t & n;
                              }(e, n, r), i), s)), o), e);
                              break;
                          }
                      }
                  }
                  function n(t, e, n, r, i, o, s) {
                      var $_DBBGM = mwbxQ.$_DW()[3][13];
                      for (; $_DBBGM !== mwbxQ.$_DW()[9][12]; ) {
                          switch ($_DBBGM) {
                          case mwbxQ.$_DW()[6][13]:
                              return c(_(t = c(t, c(c(function a(t, e, n) {
                                  var $_HIE_ = mwbxQ.$_Cg
                                    , $_HIDI = ['$_HIHp'].concat($_HIE_)
                                    , $_HIFT = $_HIDI[1];
                                  $_HIDI.shift();
                                  var $_HIGf = $_HIDI[0];
                                  return t & n | e & ~n;
                              }(e, n, r), i), s)), o), e);
                              break;
                          }
                      }
                  }
                  function r(t, e, n, r, i, o, s) {
                      var $_DBBHG = mwbxQ.$_DW()[3][13];
                      for (; $_DBBHG !== mwbxQ.$_DW()[9][12]; ) {
                          switch ($_DBBHG) {
                          case mwbxQ.$_DW()[9][13]:
                              return c(_(t = c(t, c(c(function a(t, e, n) {
                                  var $_HIJv = mwbxQ.$_Cg
                                    , $_HIIG = ['$_HJCU'].concat($_HIJv)
                                    , $_HJAh = $_HIIG[1];
                                  $_HIIG.shift();
                                  var $_HJBg = $_HIIG[0];
                                  return t ^ e ^ n;
                              }(e, n, r), i), s)), o), e);
                              break;
                          }
                      }
                  }
                  function i(t, e, n, r, i, o, s) {
                      var $_DBBID = mwbxQ.$_DW()[0][13];
                      for (; $_DBBID !== mwbxQ.$_DW()[0][12]; ) {
                          switch ($_DBBID) {
                          case mwbxQ.$_DW()[3][13]:
                              return c(_(t = c(t, c(c(function a(t, e, n) {
                                  var $_HJEK = mwbxQ.$_Cg
                                    , $_HJDb = ['$_HJHF'].concat($_HJEK)
                                    , $_HJFL = $_HJDb[1];
                                  $_HJDb.shift();
                                  var $_HJGq = $_HJDb[0];
                                  return e ^ (t | ~n);
                              }(e, n, r), i), s)), o), e);
                              break;
                          }
                      }
                  }
                  function o(t) {
                      var $_DBBJA = mwbxQ.$_DW()[0][13];
                      for (; $_DBBJA !== mwbxQ.$_DW()[9][10]; ) {
                          switch ($_DBBJA) {
                          case mwbxQ.$_DW()[0][13]:
                              var e, n = $_CJES(2), r = $_CJFt(2);
                              $_DBBJA = mwbxQ.$_DW()[3][12];
                              break;
                          case mwbxQ.$_DW()[3][12]:
                              for (e = 0; e <= 3; e++)
                                  n += (r = $_CJFt(40) + (t >>> 8 * e & 255)[$_CJFt(213)](16))[$_CJFt(211)](r[$_CJES(192)] - 2, 2);
                              $_DBBJA = mwbxQ.$_DW()[3][11];
                              break;
                          case mwbxQ.$_DW()[3][11]:
                              return n;
                              break;
                          }
                      }
                  }
                  var s, a, u, l, h, f, d, p, g, v;
                  for (s = function m(t) {
                      var $_HJJQ = mwbxQ.$_Cg
                        , $_HJIM = ['$_IACz'].concat($_HJJQ)
                        , $_IAAB = $_HJIM[1];
                      $_HJIM.shift();
                      var $_IABL = $_HJIM[0];
                      var e, n = t[$_IAAB(192)], r = n + 8, i = 16 * (1 + (r - r % 64) / 64), o = Array(i - 1), s = 0, a = 0;
                      while (a < n)
                          s = a % 4 * 8,
                          o[e = (a - a % 4) / 4] = o[e] | t[$_IAAB(120)](a) << s,
                          a++;
                      return s = a % 4 * 8,
                      o[e = (a - a % 4) / 4] = o[e] | 128 << s,
                      o[i - 2] = n << 3,
                      o[i - 1] = n >>> 29,
                      o;
                  }(t = function y(t) {
                      var $_IAEH = mwbxQ.$_Cg
                        , $_IADA = ['$_IAHK'].concat($_IAEH)
                        , $_IAFD = $_IADA[1];
                      $_IADA.shift();
                      var $_IAGF = $_IADA[0];
                      t = t[$_IAFD(45)](/\r\n/g, $_IAFD(229));
                      for (var e = $_IAEH(2), n = 0; n < t[$_IAEH(192)]; n++) {
                          var r = t[$_IAFD(120)](n);
                          r < 128 ? e += String[$_IAFD(246)](r) : (127 < r && r < 2048 ? e += String[$_IAEH(246)](r >> 6 | 192) : (e += String[$_IAEH(246)](r >> 12 | 224),
                          e += String[$_IAEH(246)](r >> 6 & 63 | 128)),
                          e += String[$_IAFD(246)](63 & r | 128));
                      }
                      return e;
                  }(t)),
                  d = 1732584193,
                  p = 4023233417,
                  g = 2562383102,
                  v = 271733878,
                  a = 0; a < s[$_CJFt(192)]; a += 16)
                      p = i(p = i(p = i(p = i(p = r(p = r(p = r(p = r(p = n(p = n(p = n(p = n(p = e(p = e(p = e(p = e(l = p, g = e(h = g, v = e(f = v, d = e(u = d, p, g, v, s[a + 0], 7, 3614090360), p, g, s[a + 1], 12, 3905402710), d, p, s[a + 2], 17, 606105819), v, d, s[a + 3], 22, 3250441966), g = e(g, v = e(v, d = e(d, p, g, v, s[a + 4], 7, 4118548399), p, g, s[a + 5], 12, 1200080426), d, p, s[a + 6], 17, 2821735955), v, d, s[a + 7], 22, 4249261313), g = e(g, v = e(v, d = e(d, p, g, v, s[a + 8], 7, 1770035416), p, g, s[a + 9], 12, 2336552879), d, p, s[a + 10], 17, 4294925233), v, d, s[a + 11], 22, 2304563134), g = e(g, v = e(v, d = e(d, p, g, v, s[a + 12], 7, 1804603682), p, g, s[a + 13], 12, 4254626195), d, p, s[a + 14], 17, 2792965006), v, d, s[a + 15], 22, 1236535329), g = n(g, v = n(v, d = n(d, p, g, v, s[a + 1], 5, 4129170786), p, g, s[a + 6], 9, 3225465664), d, p, s[a + 11], 14, 643717713), v, d, s[a + 0], 20, 3921069994), g = n(g, v = n(v, d = n(d, p, g, v, s[a + 5], 5, 3593408605), p, g, s[a + 10], 9, 38016083), d, p, s[a + 15], 14, 3634488961), v, d, s[a + 4], 20, 3889429448), g = n(g, v = n(v, d = n(d, p, g, v, s[a + 9], 5, 568446438), p, g, s[a + 14], 9, 3275163606), d, p, s[a + 3], 14, 4107603335), v, d, s[a + 8], 20, 1163531501), g = n(g, v = n(v, d = n(d, p, g, v, s[a + 13], 5, 2850285829), p, g, s[a + 2], 9, 4243563512), d, p, s[a + 7], 14, 1735328473), v, d, s[a + 12], 20, 2368359562), g = r(g, v = r(v, d = r(d, p, g, v, s[a + 5], 4, 4294588738), p, g, s[a + 8], 11, 2272392833), d, p, s[a + 11], 16, 1839030562), v, d, s[a + 14], 23, 4259657740), g = r(g, v = r(v, d = r(d, p, g, v, s[a + 1], 4, 2763975236), p, g, s[a + 4], 11, 1272893353), d, p, s[a + 7], 16, 4139469664), v, d, s[a + 10], 23, 3200236656), g = r(g, v = r(v, d = r(d, p, g, v, s[a + 13], 4, 681279174), p, g, s[a + 0], 11, 3936430074), d, p, s[a + 3], 16, 3572445317), v, d, s[a + 6], 23, 76029189), g = r(g, v = r(v, d = r(d, p, g, v, s[a + 9], 4, 3654602809), p, g, s[a + 12], 11, 3873151461), d, p, s[a + 15], 16, 530742520), v, d, s[a + 2], 23, 3299628645), g = i(g, v = i(v, d = i(d, p, g, v, s[a + 0], 6, 4096336452), p, g, s[a + 7], 10, 1126891415), d, p, s[a + 14], 15, 2878612391), v, d, s[a + 5], 21, 4237533241), g = i(g, v = i(v, d = i(d, p, g, v, s[a + 12], 6, 1700485571), p, g, s[a + 3], 10, 2399980690), d, p, s[a + 10], 15, 4293915773), v, d, s[a + 1], 21, 2240044497), g = i(g, v = i(v, d = i(d, p, g, v, s[a + 8], 6, 1873313359), p, g, s[a + 15], 10, 4264355552), d, p, s[a + 6], 15, 2734768916), v, d, s[a + 13], 21, 1309151649), g = i(g, v = i(v, d = i(d, p, g, v, s[a + 4], 6, 4149444226), p, g, s[a + 11], 10, 3174756917), d, p, s[a + 2], 15, 718787259), v, d, s[a + 9], 21, 3951481745),
                      d = c(d, u),
                      p = c(p, l),
                      g = c(g, h),
                      v = c(v, f);
                  return (o(d) + o(p) + o(g) + o(v))[$_CJFt(198)]();
                  break;
              }
          }
      }

var $_BBED = function(t, e, n) {
var $_BEIJk = mwbxQ.$_Cg
  , $_BEIIS = ['$_BEJCR'].concat($_BEIJk)
  , $_BEJAi = $_BEIIS[1];
$_BEIIS.shift();
var $_BEJBu = $_BEIIS[0];
if (!e || !n)
  return t;
var r, i = 0, o = t, s = e[0], a = e[2], _ = e[4];
while (r = n[$_BEJAi(211)](i, 2)) {
  i += 2;
  var c = parseInt(r, 16)
    , u = String[$_BEIJk(246)](c)
    , l = (s * c * c + a * c + _) % t[$_BEJAi(192)];
  o = o[$_BEIJk(211)](0, l) + u + o[$_BEIJk(211)](l);
}
return o;
}
var $_FD_ = function() {
var $_BEGJO = mwbxQ.$_Cg
  , $_BEGI_ = ['$_BEHCp'].concat($_BEGJO)
  , $_BEHAO = $_BEGI_[1];
$_BEGI_.shift();
var $_BEHBX = $_BEGI_[0];
function n(t) {
  var $_DBEAu = mwbxQ.$_DW()[6][13];
  for (; $_DBEAu !== mwbxQ.$_DW()[9][12]; ) {
    switch ($_DBEAu) {
    case mwbxQ.$_DW()[6][13]:
      var e = $_BEGJO(497)
        , n = e[$_BEGJO(192)]
        , r = $_BEHAO(2)
        , i = Math[$_BEGJO(316)](t)
        , o = parseInt(i / n);
      n <= o && (o = n - 1),
      o && (r = e[$_BEHAO(125)](o));
      var s = $_BEGJO(2);
      return t < 0 && (s += $_BEGJO(418)),
      r && (s += $_BEHAO(435)),
      s + r + e[$_BEHAO(125)](i %= n);
      break;
    }
  }
}
var t = function(t) {
  var $_BEHEp = mwbxQ.$_Cg
    , $_BEHDn = ['$_BEHHY'].concat($_BEHEp)
    , $_BEHFW = $_BEHDn[1];
  $_BEHDn.shift();
  var $_BEHGj = $_BEHDn[0];
  for (var e, n, r, i = [], o = 0, s = 0, a = t[$_BEHFW(192)] - 1; s < a; s++)
    e = Math[$_BEHFW(158)](t[s + 1][0] - t[s][0]),
    n = Math[$_BEHFW(158)](t[s + 1][1] - t[s][1]),
    r = Math[$_BEHFW(158)](t[s + 1][2] - t[s][2]),
    0 == e && 0 == n && 0 == r || (0 == e && 0 == n ? o += r : (i[$_BEHFW(137)]([e, n, r + o]),
    o = 0));
  return 0 !== o && i[$_BEHFW(137)]([e, n, o]),
  i;
}(guiji_list)
  , r = []
  , i = []
  , o = [];
return new ct(t)[$_BEHAO(59)](function(t) {
  var $_BEHJU = mwbxQ.$_Cg
    , $_BEHIM = ['$_BEICs'].concat($_BEHJU)
    , $_BEIAi = $_BEHIM[1];
  $_BEHIM.shift();
  var $_BEIBp = $_BEHIM[0];
  var e = function(t) {
    var $_BEIE_ = mwbxQ.$_Cg
      , $_BEIDR = ['$_BEIHQ'].concat($_BEIE_)
      , $_BEIFM = $_BEIDR[1];
    $_BEIDR.shift();
    var $_BEIGI = $_BEIDR[0];
    for (var e = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]], n = 0, r = e[$_BEIFM(192)]; n < r; n++)
      if (t[0] == e[n][0] && t[1] == e[n][1])
        return $_BEIE_(441)[n];
    return 0;
  }(t);
  e ? i[$_BEHJU(137)](e) : (r[$_BEIAi(137)](n(t[0])),
  i[$_BEHJU(137)](n(t[1]))),
  o[$_BEIAi(137)](n(t[2]));
}),
r[$_BEGJO(405)]($_BEHAO(2)) + $_BEHAO(457) + i[$_BEGJO(405)]($_BEGJO(2)) + $_BEGJO(457) + o[$_BEGJO(405)]($_BEGJO(2));
}

!function(){
AUPnQ.BkA = function() {
var rmJ = 2;
for (; rmJ !== 1; ) {
  switch (rmJ) {
  case 2:
    return {
      sHE: function(tuC) {
        var uft = 2;
        for (; uft !== 14; ) {
          switch (uft) {
          case 5:
            uft = voI < wVP.length ? 4 : 7;
            break;
          case 2:
            var xvO = ''
              , wVP = decodeURI('.%043%0D%25%1C4%1A1%01#%1C%194?%22%1C\'%19%05(%1C$+#%0F%0363\'%25%1F:6%09%19(%087%0D46g%25?%022!37%03%00n1~44=%06.%198%18;%18%0E%11/%196%09#*%0E%03%3E%0F%0F%174%036%09$2%04%3E%1C%3E-)4%04/5%1A%19%25?%022!3J-%1A86(%1E$%182b*%0B$H8,+%13%7D%0A2b&%04%7D\'5(%22%09)Rw%1C6%1F8%1D2b.%19%7D%0D:23%13%0368%20-%0F%3E%1C%09%1C6%1F8%1A.%1C%19:%18&%13%0B%09-%0369\'?%1E%03%05%3E&#%0686%09\'5%182%1A%090&%049%07:%1C-%18%101%09#%06%13/6%09%1C%22%00%02%19%09##%0E4%1C%3E-)49%05%10%1A%19%0D:6%09%1C%19%1E5%0D9%1C$%186%22%09!5%0F%3C%1C2%1C%19%091%0D60%19%1F3%0C2$.%048%0C%096(9)%1A%3E,%204;;4%14%194%3E%09;.%194%0370!341%0D9%253%02%032%20%18%3E49%0D&7%22%1F86%09%1A%05%12%196%03*.%19%7D%0A%25-0%198%1Ap1g%030%18;\'*%0F3%1C66.%053H8$g%25?%022!3D%3E%1A2#3%0F%7D%01$b&J.%00%3E/g%0B3%0Cw&(%0F.%06p6g%19(%18\'-5%1E%7D%09w1%22%092%063b&%18:%1D:\')%1Es6%3C47%08%03%001&(44%1B%12/7%1E$6:7+%1E4%18;+$%0B)%018,%19%06502%1C4%1E8%18%09%1C%15/%17-%14%16%02.%03%0D932%0F(%0D%09.&%19)%3E6.%19%0F1%0D%090&%09866.+4%03%1881.%1E4%079%1C%13%024%1Bw%205%05*%1B20%60%19%7D%01:2+%0F0%0D96&%1E4%079b(%0C%7D\'5(%22%09)F40%22%0B)%0Dw+4J%3CH$*.%07%7D%099&g%0E2%0D$,%60%1E%7D%1B%2227%05/%1Cwe)%1F1%04pb&%19%7D%1C?\'g%0C4%1A$6g%0B/%0F%22/%22%04)F%09o%1948%18%09%1C%22%0B%3E%00%09oj4%036%09%1C%19%0F%25%18803%19%036%10\'%22%1E8%1B#%1C%102%12%12%09.&%04:6\'0(%1E2%1C.2%224:%20%3C%14%19%095%09%25%01(%0E8)#');
            uft = 1;
            break;
          case 1:
            var voI = 0
              , yXx = 0;
            uft = 5;
            break;
          case 4:
            uft = yXx === tuC.length ? 3 : 9;
            break;
          case 8:
            voI++,
            yXx++;
            uft = 5;
            break;
          case 3:
            yXx = 0;
            uft = 9;
            break;
          case 9:
            xvO += String.fromCharCode(wVP.charCodeAt(voI) ^ tuC.charCodeAt(yXx));
            uft = 8;
            break;
          case 7:
            xvO = xvO.split('^');
            return function(AvT) {
              var Bgf = 2;
              for (; Bgf !== 1; ) {
                switch (Bgf) {
                case 2:
                  return xvO[AvT];
                  break;
                }
              }
            }
            ;
            break;
          }
        }
      }('Gj]hWB')
    };
    break;
  }
}
}();
AUPnQ.CdF = function() {
var Cwt = 2;
for (; Cwt !== 1; ) {
  switch (Cwt) {
  case 2:
    return {
      DPr: function ETI(FVP, GMp) {
        var HtB = 2;
        for (; HtB !== 10; ) {
          switch (HtB) {
          case 4:
            IdU[(JZz + GMp) % FVP] = [];
            HtB = 3;
            break;
          case 13:
            KDs -= 1;
            HtB = 6;
            break;
          case 9:
            var LSJ = 0;
            HtB = 8;
            break;
          case 8:
            HtB = LSJ < FVP ? 7 : 11;
            break;
          case 12:
            LSJ += 1;
            HtB = 8;
            break;
          case 6:
            HtB = KDs >= 0 ? 14 : 12;
            break;
          case 1:
            var JZz = 0;
            HtB = 5;
            break;
          case 2:
            var IdU = [];
            HtB = 1;
            break;
          case 3:
            JZz += 1;
            HtB = 5;
            break;
          case 14:
            IdU[LSJ][(KDs + GMp * LSJ) % FVP] = IdU[KDs];
            HtB = 13;
            break;
          case 5:
            HtB = JZz < FVP ? 4 : 9;
            break;
          case 7:
            var KDs = FVP - 1;
            HtB = 6;
            break;
          case 11:
            return IdU;
            break;
          }
        }
      }(9, 3)
    };
    break;
  }
}
}();
AUPnQ.DVy = function() {
return typeof AUPnQ.BkA.sHE === 'function' ? AUPnQ.BkA.sHE.apply(AUPnQ.BkA, arguments) : AUPnQ.BkA.sHE;
};
AUPnQ.ESd = function() {
return typeof AUPnQ.CdF.DPr === 'function' ? AUPnQ.CdF.DPr.apply(AUPnQ.CdF, arguments) : AUPnQ.CdF.DPr;
};

function AUPnQ() {}
var DlIC = AUPnQ.DVy
, CmNsTv = ['Gcifl'].concat(DlIC)
, EMVm = CmNsTv[1];
var sauC = AUPnQ.DVy
, rUWkQI = ['vNfnD'].concat(sauC)
, twAN = rUWkQI[1];

var e = sauC(10);

function QKBQ(t, e) {
debugger;
var mdO = AUPnQ.ESd()[0][7];
for (; mdO !== AUPnQ.ESd()[0][6]; ) {
  switch (mdO) {
  case AUPnQ.ESd()[0][7]:
    try {
      this[twAN(26)] = Object[twAN(48)](t);
      this[twAN(33)] = [];
      this[twAN(34)] = this[twAN(26)][e] ? this[sauC(26)][e][sauC(52)]()[sauC(1)](sauC(38)) : twAN(38);
      this[twAN(40)] = sauC(81);
      this[sauC(68)] = sauC(86);
    } catch (n) {}
    mdO = AUPnQ.ESd()[3][6];
    break;
  }
}
}
function IDrp(e) {
var QlK = AUPnQ.ESd()[0][7];
for (; QlK !== AUPnQ.ESd()[3][6]; ) {
  switch (QlK) {
  case AUPnQ.ESd()[3][7]:
    var n = 4;
    var r = twAN(81);
    var i = twAN(86);
    var o = twAN(86);
    var e = e;
    function GPlY() {
      var RbS = AUPnQ.ESd()[0][7];
      for (; RbS !== AUPnQ.ESd()[0][6]; ) {
        switch (RbS) {
        case AUPnQ.ESd()[0][7]:
          try {
            if (e[sauC(34)][sauC(59)]) {
              e[twAN(15)]({
                "\u0070\u006f\u0073\u0069\u0074\u0069\u006f\u006e": n,
                "\u0069\u006e\u006e\u0065\u0072": r,
                "\u006d\u0069\u0064\u0064\u006c\u0065": i,
                "\u006f\u0075\u0074\u0073\u0069\u0064\u0065": o
              });
            }
          } catch (t) {}
          RbS = AUPnQ.ESd()[0][6];
          break;
        }
      }
    }
    return {
      "\u0063\u0063": GPlY
    };
    break;
  }
}
}
function JVPR(e) {
var SUJ = AUPnQ.ESd()[0][7];
for (; SUJ !== AUPnQ.ESd()[0][6]; ) {
  switch (SUJ) {
  case AUPnQ.ESd()[0][7]:
    var n = 8;
    var r = sauC(86);
    var i = sauC(81);
    var o = sauC(81);
    var e = e;
    function GPlY() {
      var TaB = AUPnQ.ESd()[0][7];
      for (; TaB !== AUPnQ.ESd()[0][6]; ) {
        switch (TaB) {
        case AUPnQ.ESd()[0][7]:
          try {
            if (e[twAN(34)][sauC(59)]) {
              e[sauC(15)]({
                "\u0070\u006f\u0073\u0069\u0074\u0069\u006f\u006e": n,
                "\u0069\u006e\u006e\u0065\u0072": r,
                "\u006d\u0069\u0064\u0064\u006c\u0065": i,
                "\u006f\u0075\u0074\u0073\u0069\u0064\u0065": o
              });
            }
          } catch (t) {}
          TaB = AUPnQ.ESd()[3][6];
          break;
        }
      }
    }
    return {
      "\u0063\u0063": GPlY
    };
    break;
  }
}
}
function KJrn(e) {
var Uej = AUPnQ.ESd()[0][7];
for (; Uej !== AUPnQ.ESd()[0][6]; ) {
  switch (Uej) {
  case AUPnQ.ESd()[3][7]:
    var n = 7;
    var r = sauC(86);
    var i = twAN(81);
    var o = sauC(86);
    var e = e;
    function GPlY() {
      var Vef = AUPnQ.ESd()[3][7];
      for (; Vef !== AUPnQ.ESd()[0][6]; ) {
        switch (Vef) {
        case AUPnQ.ESd()[3][7]:
          try {
            if (e[twAN(34)][twAN(59)]) {
              e[twAN(15)]({
                "\u0070\u006f\u0073\u0069\u0074\u0069\u006f\u006e": n,
                "\u0069\u006e\u006e\u0065\u0072": r,
                "\u006d\u0069\u0064\u0064\u006c\u0065": i,
                "\u006f\u0075\u0074\u0073\u0069\u0064\u0065": o
              });
            }
          } catch (t) {}
          Vef = AUPnQ.ESd()[0][6];
          break;
        }
      }
    }
    return {
      "\u0063\u0063": GPlY
    };
    break;
  }
}
}
function li(e) {
var WcY = AUPnQ.ESd()[3][7];
for (; WcY !== AUPnQ.ESd()[0][6]; ) {
  switch (WcY) {
  case AUPnQ.ESd()[3][7]:
    var n = 3;
    var r = sauC(81);
    var i = sauC(86);
    var o = sauC(81);
    var e = e;
    function GPlY() {
      var Xnp = AUPnQ.ESd()[0][7];
      for (; Xnp !== AUPnQ.ESd()[0][6]; ) {
        switch (Xnp) {
        case AUPnQ.ESd()[0][7]:
          try {
            if (e[twAN(34)][twAN(59)]) {
              e[twAN(15)]({
                "\u0070\u006f\u0073\u0069\u0074\u0069\u006f\u006e": n,
                "\u0069\u006e\u006e\u0065\u0072": r,
                "\u006d\u0069\u0064\u0064\u006c\u0065": i,
                "\u006f\u0075\u0074\u0073\u0069\u0064\u0065": o
              });
            }
          } catch (t) {}
          Xnp = AUPnQ.ESd()[0][6];
          break;
        }
      }
    }
    return {
      "\u0063\u0063": GPlY
    };
    break;
  }
}
}
function LEZA(e) {
var YkE = AUPnQ.ESd()[0][7];
for (; YkE !== AUPnQ.ESd()[3][6]; ) {
  switch (YkE) {
  case AUPnQ.ESd()[0][7]:
    var n = 6;
    var r = twAN(86);
    var i = twAN(86);
    var o = sauC(81);
    var e = e;
    function GPlY() {
      var ZWM = AUPnQ.ESd()[0][7];
      for (; ZWM !== AUPnQ.ESd()[3][6]; ) {
        switch (ZWM) {
        case AUPnQ.ESd()[3][7]:
          try {
            if (e[sauC(34)][sauC(59)]) {
              e[twAN(15)]({
                "\u0070\u006f\u0073\u0069\u0074\u0069\u006f\u006e": n,
                "\u0069\u006e\u006e\u0065\u0072": r,
                "\u006d\u0069\u0064\u0064\u006c\u0065": i,
                "\u006f\u0075\u0074\u0073\u0069\u0064\u0065": o
              });
            }
          } catch (t) {}
          ZWM = AUPnQ.ESd()[3][6];
          break;
        }
      }
    }
    return {
      "\u0063\u0063": GPlY
    };
    break;
  }
}
}
function MkMS(e) {
var ahi = AUPnQ.ESd()[3][7];
for (; ahi !== AUPnQ.ESd()[3][6]; ) {
  switch (ahi) {
  case AUPnQ.ESd()[3][7]:
    var n = 2;
    var r = sauC(81);
    var i = sauC(81);
    var o = sauC(86);
    var e = e;
    function GPlY() {
      var bRN = AUPnQ.ESd()[0][7];
      for (; bRN !== AUPnQ.ESd()[0][6]; ) {
        switch (bRN) {
        case AUPnQ.ESd()[3][7]:
          try {
            if (e[twAN(34)][sauC(59)]) {
              e[twAN(15)]({
                "\u0070\u006f\u0073\u0069\u0074\u0069\u006f\u006e": n,
                "\u0069\u006e\u006e\u0065\u0072": r,
                "\u006d\u0069\u0064\u0064\u006c\u0065": i,
                "\u006f\u0075\u0074\u0073\u0069\u0064\u0065": o
              });
            }
          } catch (t) {}
          bRN = AUPnQ.ESd()[3][6];
          break;
        }
      }
    }
    return {
      "\u0063\u0063": GPlY
    };
    break;
  }
}
}
function FQJF(e) {
var Mem = AUPnQ.ESd()[3][7];
for (; Mem !== AUPnQ.ESd()[3][6]; ) {
  switch (Mem) {
  case AUPnQ.ESd()[3][7]:
    var n = 1;
    var r = twAN(81);
    var i = sauC(81);
    var o = sauC(81);
    var e = e;
    function GPlY() {
      var NAS = AUPnQ.ESd()[0][7];
      for (; NAS !== AUPnQ.ESd()[0][6]; ) {
        switch (NAS) {
        case AUPnQ.ESd()[3][7]:
          try {
            if (e[twAN(34)][sauC(59)]) {
              e[twAN(15)]({
                "\u0070\u006f\u0073\u0069\u0074\u0069\u006f\u006e": n,
                "\u0069\u006e\u006e\u0065\u0072": r,
                "\u006d\u0069\u0064\u0064\u006c\u0065": i,
                "\u006f\u0075\u0074\u0073\u0069\u0064\u0065": o
              });
            }
          } catch (t) {}
          NAS = AUPnQ.ESd()[0][6];
          break;
        }
      }
    }
    return {
      "\u0063\u0063": GPlY
    };
    break;
  }
}
}
function HLmT(e) {
var OBu = AUPnQ.ESd()[3][7];
for (; OBu !== AUPnQ.ESd()[0][6]; ) {
  switch (OBu) {
  case AUPnQ.ESd()[3][7]:
    var n = 5;
    var r = twAN(86);
    var i = twAN(86);
    var o = sauC(86);
    var e = e;
    function GPlY() {
      var Pnz = AUPnQ.ESd()[3][7];
      for (; Pnz !== AUPnQ.ESd()[3][6]; ) {
        switch (Pnz) {
        case AUPnQ.ESd()[0][7]:
          try {
            if (e[sauC(34)][sauC(59)]) {
              e[twAN(15)]({
                "\u0070\u006f\u0073\u0069\u0074\u0069\u006f\u006e": n,
                "\u0069\u006e\u006e\u0065\u0072": r,
                "\u006d\u0069\u0064\u0064\u006c\u0065": i,
                "\u006f\u0075\u0074\u0073\u0069\u0064\u0065": o
              });
            }
          } catch (t) {}
          Pnz = AUPnQ.ESd()[3][6];
          break;
        }
      }
    }
    return {
      "\u0063\u0063": GPlY
    };
    break;
  }
}
}
function Rbfk(t) {
var nOD = AUPnQ.ESd()[3][7];
for (; nOD !== AUPnQ.ESd()[0][6]; ) {
  switch (nOD) {
  case AUPnQ.ESd()[3][7]:
    var e = 5381;
    var n = t[EMVm(59)];
    var r = 0;
    while (n--) {
      e = (e << 5) + e + t[EMVm(99)](r++);
    }
    e &= ~(1 << 31);
    return e;
    break;
  }
}
}
function StJC(t) {
var olh = AUPnQ.ESd()[3][7];
for (; olh !== AUPnQ.ESd()[0][6]; ) {
  switch (olh) {
  case AUPnQ.ESd()[0][7]:
    if (t[EMVm(96)] && t[DlIC(83)]) {
      t[e] = Rbfk(StJC[EMVm(52)]() + Rbfk(Rbfk[EMVm(52)]())) + EMVm(38);
    }
    function Oo() {
      var pQq = AUPnQ.ESd()[0][7];
      for (; pQq !== AUPnQ.ESd()[3][6]; ) {
        switch (pQq) {
        case AUPnQ.ESd()[0][7]:
          this[DlIC(96)] = t[EMVm(96)];
          this[EMVm(83)] = t[DlIC(83)];
          pQq = AUPnQ.ESd()[3][6];
          break;
        }
      }
    }
    Oo[DlIC(97)] = new Tr_m();
    function Tr_m() {
      var qcj = AUPnQ.ESd()[0][7];
      for (; qcj !== AUPnQ.ESd()[3][7]; ) {
        switch (qcj) {
        }
      }
    }
    Tr_m[DlIC(97)][EMVm(42)] = {
      "\u006e": HLmT,
      "\u0073": FQJF,
      "\u0065": li,
      "\u0065\u0073": MkMS,
      "\u0065\u006e": IDrp,
      "\u0077": KJrn,
      "\u0077\u006e": LEZA,
      "\u0077\u0073": JVPR,
      "\u0066": QKBQ
    };
    return new Oo();
    break;
  }
}
}


window['_gct'] = function(t) {
debugger;
var IJfi = AUPnQ.DVy
  , HbDCxG = ['LqDDw'].concat(IJfi)
  , JYJW = HbDCxG[1];
HbDCxG.shift();
var KuJR = HbDCxG[0];
if (t && Object[JYJW(97)][IJfi(52)][JYJW(55)](t) === JYJW(9)) {
  return	StJC(t);
}
return Rbfk(Rbfk[JYJW(52)]());
}
}();
// choice = 1;
// gt1 = '019924a82c70bb123aae90d483087f94'
// challenge = "4e194673819e82c415335cbcfa0f753d69";
// dtt = "5457457e";
// challenge2 = 'bf4cdff3945852173ae75e1b5652f7c84j'
// 第一个w
function get_w1(gt1, challenge){
    t = ne[$_CJES(236)];
    config = {"gt":"019924a82c70bb123aae90d483087f94","challenge":"66c8d579af9475215815876cb4072f0f","offline":false,"new_captcha":true,"product":"float","width":"300px","https":true,"api_server":"apiv6.geetest.com","protocol":"https://","type":"fullpage","static_servers":["static.geetest.com/","static.geevisit.com/"],"beeline":"/static/js/beeline.1.0.1.js","voice":"/static/js/voice.1.2.4.js","click":"/static/js/click.3.1.1.js","fullpage":"/static/js/fullpage.9.1.9-cyhomb.js","slide":"/static/js/slide.7.9.2.js","geetest":"/static/js/geetest.6.0.9.js","aspect_radio":{"slide":103,"click":128,"voice":128,"beeline":50},"cc":16,"ww":true,"i":"-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1"};
    config["gt"] = gt1;
    config["challenge"] = challenge;
    key1 = (65536 * (1 + Math['random']()) | 0)['toString'](16)['substring'](1) + (65536 * (1 + Math['random']()) | 0)['toString'](16)['substring'](1) + (65536 * (1 + Math['random']()) | 0)['toString'](16)['substring'](1) + (65536 * (1 + Math['random']()) | 0)['toString'](16)['substring'](1);
    r = new U()[mwbxQ.$_Cg(392)](key1);
    console.log(key1)
    o = V[$_CAHJS(392)](gt['stringify'](config), key1);
    i = m[$_CAIAK(792)](o);
    return JSON.stringify([i+r,key1]);
}

// 第二个w
function get_w2(key1, gt1, challenge){
    debugger;
    passtime = 2186
    r = {"lang":"zh-cn","type":"fullpage","tt":"M6/*8Pjp8PjEA3(6e,5e5b,(5n8(e(((()-1-)IE-*G,M?MM-U5)3*(?NM-N1E/*:XG)(PME3)(@/)MU-)1@M9.1-)1c1A61FK:hf0/(7H@(((b,8b(,((((,5e5c/Y-1-@b9@c9@-cH)(@-rQb9-Y-)b98)(?-c(?b9-N(?-)19-NO((E/(3)()MU(E7(/)M0qq1qqqo(/-((/(/FS/FSFSEFMEcE*E*)P)((M9,)9(b5(A.(,.((RMM2E1*C*(RMM2E1*C*(RMM2E/E*)E1*C*(Q(b1(()qq","light":"SPAN_0","s":"c7c3e21112fe4f741921cb3e4ff9f7cb","h":"321f9af1e098233dbd03f250fd2b5e21","hh":"39bd9cad9e425c3a8f51610fd506e3b3","hi":"09eb21b3ae9542a9bc1e8b63b3d9a467","vip_order":-1,"ct":-1,"ep":{"v":"9.1.9-cyhomb","$_Ei":false,"me":true,"ven":"Google Inc. (NVIDIA)","ren":"ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Laptop GPU (0x00002520) Direct3D11 vs_5_0 ps_5_0, D3D11)","fp":["move",282,395,1739885924530,"pointermove"],"lp":["up",146,364,1739885924957,"pointerup"],"em":{"ph":0,"cp":0,"ek":"11","wd":1,"nt":0,"si":0,"sc":0},"tm":{"a":1739885921870,"b":1739885921937,"c":1739885921937,"d":0,"e":0,"f":1739885921881,"g":1739885921881,"h":1739885921881,"i":1739885921881,"j":1739885921881,"k":0,"l":1739885921883,"m":1739885921914,"n":1739885921917,"o":1739885921941,"p":1739885922637,"q":1739885922637,"r":1739885922640,"s":1739885922662,"t":1739885922662,"u":1739885922662},"dnf":"dnf","by":0},"passtime":2186,"rp":"4fd91c656f79b6c4a88643d84415a8f9","captcha_token":"1533537096","ydue":"hfoj0glb"}
    // "fp":["move",282,395,1739885924530,"pointermove"],"lp":["up",146,364,1739885924957,"pointerup"]
    r['fp'] = ["move", 282, 395, Math.round(new Date()), "pointermove"]
    r['lp'] = ["up", 146, 364, Math.round(new Date())+parseInt(Math.random()*1000), "pointerup"]
    r['rp'] = X(gt1 + challenge + passtime)
    r['passtime'] = passtime
    w2 = m[$_CAIAK(792)](V[$_CAHJS(392)](gt['stringify'](r), key1));
    return w2;
}

// 第三个w
function get_w3(dtt, challenge2, t, gt1){
    c = [12, 58, 98, 36, 43, 95, 62, 15, 12];
    //s
    l = $_BBED($_FD_(), c, dtt);

    r = ne[$_CJES(236)];
    o = {
        "lang": "zh-cn",
        "userresponse": H(t, challenge2),   //t为滑动距离
        "passtime": guiji_list[guiji_list.length-1][2],
        "imgload": parseInt(Math.random()*100),
        "aa": l,
        "ep": r[$_CAHJS(729)](),  // o[$_CAHJS(760)]
    };

    var s = {
    "\u006c\u0061\u006e\u0067": o[$_CAHJS(133)],
    "\u0065\u0070": o[$_CAHJS(760)]
    }, a = window[$_CAHJS(756)](s);
    debugger;
    a_ = 'h9s9';
    c = function p(t, e, n) {
    var $_CAIJZ = mwbxQ.$_Cg
      , $_CAIIe = ['$_CAJCz'].concat($_CAIJZ)
      , $_CAJAD = $_CAIIe[1];
    $_CAIIe.shift();
    var $_CAJBT = $_CAIIe[0];
    for (var r = new t[($_CAJAD(795))][($_CAIJZ(742))](e,n), i = [$_CAJAD(334), $_CAIJZ(345), $_CAIJZ(390), $_CAIJZ(771), $_CAIJZ(153), $_CAJAD(739), $_CAJAD(736), $_CAIJZ(754)], o = i[$_CAJAD(192)] - 2, s = 0; s < n[$_CAJAD(192)]; s++) {
      var a, _ = Math[$_CAJAD(316)](n[s][$_CAIJZ(120)]() - 70)[$_CAJAD(213)]()[1];
      a = o < _ ? t[$_CAJAD(795)][i[1 + o]](r) : t[$_CAIJZ(795)][i[_]](r);
      for (var c = Math[$_CAIJZ(316)](n[s][$_CAIJZ(120)]() - 70)[$_CAIJZ(213)]()[0], u = 0; u < c; u++)
        a[$_CAJAD(755)]();
    }
    debugger;
    return r[$_CAIJZ(21)][$_CAJAD(405)]($_CAIJZ(2))[$_CAIJZ(187)](0, 10);
    }(a, s, a_);
    o[a_] = "1816378497";

    o['rp'] = X(gt1 + challenge2['slice'](0, 32) + o['passtime']);
    Ot = 'e3e99b6b2b71e849';
    u = new U()[mwbxQ.$_Cg(392)](Ot);
    l = V[$_CAHJS(392)](gt[$_CAIAK(254)](o), r[$_CAIAK(744)]());
    h = m[$_CAIAK(792)](l);
    w3 = h+u;
    return h;
}


dogvm.print.getAll();switch (choice) {
    case 1:
        get_w1(gt1, challenge);
        break;
    case 2:
        get_w2(key1, gt1, challenge);
        break;
    case 3:
        get_w3(dtt, challenge2, distance, gt1);
}