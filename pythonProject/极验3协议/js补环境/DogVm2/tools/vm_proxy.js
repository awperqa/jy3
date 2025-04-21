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