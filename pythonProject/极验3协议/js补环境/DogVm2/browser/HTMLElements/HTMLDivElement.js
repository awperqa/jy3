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

