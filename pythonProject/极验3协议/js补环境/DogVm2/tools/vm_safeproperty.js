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

