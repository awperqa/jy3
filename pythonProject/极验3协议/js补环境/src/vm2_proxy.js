let proxy = function(obj, objname) {
    let handle = {
        get: function(target, prop, receiver) {
            let result;
            try {
                result = Reflect.get(target, prop, receiver);
                let type = Object.prototype.toString.call(result)
                if (result instanceof Object) {
                    console.log(`{get|obj:[${objname}] -> prop:[${prop.toString()}],type:[${type}]}`);
                    //递归代理
                    // result = proxy(result, `${objname}.${prop.toString()}`);
                } else if (typeof result === 'symbol') {
                    console.log(`{get|obj:[${objname}] -> prop:[${prop.toString()}],ret:[${result.toString()}]}`);
                } else {
                    console.log(`{get|obj:[${objname}] -> prop:[${prop.toString()}],ret:[${result}]}`);
                }
            } catch (e) {
                console.log(`{get|obj:[${objname}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result
        },
        set: function(tarset, prop, receiver) {
            let result;
            try {
                result = Reflect.set(tarset, prop, receiver);
                let type = Object.prototype.toString.call(result)
                if (result instanceof Object) {
                    console.log(`{set|obj:[${objname}] -> prop:[${prop.toString()}],type:[${type}]}`);
                } else if (typeof result === 'symbol') {
                    console.log(`{set|obj:[${objname}] -> prop:[${prop.toString()}],ret:[${result.toString()}]}`);
                } else {
                    console.log(`{set|obj:[${objname}] -> prop:[${prop.toString()}],ret:[${result}]}`);
                }
            } catch (e) {
                console.log(`{set|obj:[${objname}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result
        },
        getOwnPropertyDescriptor: function(target, prop) {
            let result;
            try {
                result = Reflect.getOwnPropertyDescriptor(target, prop);
                let type = Object.prototype.toString.call(result)
                console.log(`{getOwnPropertyDescriptor|obj:[${objname}] -> prop:[${prop.toString()}],type:[${type}]}`);
            } catch (e) {
                console.log(`{getOwnPropertyDescriptor|obj:[${objname}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result;
        },
        defineProperty: function(target, prop, descriptor) {
            let result;
            try {
                result = Reflect.defineProperty(target, prop, descriptor);
                console.log(`{defineProperty|obj:[${objname}] -> prop:[${prop.toString()}]}`);
            } catch (e) {
                console.log(`{defineProperty|obj:[${objname}] -> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result;
        },
        apply: function(target, thisArg, argumentsList) {
            let result;
            try {
                result = Reflect.apply(target, thisArg, argumentsList)
                let type = Object.prototype.toString.call(result)
                if (result instanceof Object) {
                    console.log(`{apply|function:[${objname}],type:[${type}]}`);
                } else if (typeof result === "symbol") {
                    console.log(`{apply|function:[${objname}] -> result:[${result.toString()}]}`);
                } else {
                    console.log(`{apply|function:[${objname}] -> result:[${result}]}`);
                }
            } catch (e) {
                console.log(`{apply|function:[${objname}] ,error:[${e.message}]}`);
            }
            return result;
        },
        construct: function(target, argArray, newTarget) {
            let result;
            try {
                result = Reflect.construct(target, argArray, newTarget);
                let type = Object.prototype.toString.call(result)
                console.log(`{construct|function:[${objname}], type:[${type}]}`);
            } catch (e) {
                console.log(`{construct|function:[${objname}],error:[${e.message}]}`);
            }
            return result;

        },
        deleteProperty: function(target, propKey) {
            let result = Reflect.deleteProperty(target, propKey);
            console.log(`{deleteProperty|obj:[${objname}] -> prop:[${propKey.toString()}], result:[${result}]}`);
            return result;
        },
        has: function(target, propKey) {
            // in 操作符
            let result = Reflect.has(target, propKey);
            console.log(`{has|obj:[${objname}] -> prop:[${propKey.toString()}], result:[${result}]}`);
            return result;
        },
        ownKeys: function(target) {
            let result = Reflect.ownKeys(target);
            console.log(`{ownKeys|obj:[${objname}]}`);
            return result
        },
        getPrototypeOf: function(target) {
            let result = Reflect.getPrototypeOf(target);
            console.log(`{getPrototypeOf|obj:[${objname}]}`);
            return result;
        },
        setPrototypeOf: function(target, proto) {
            let result = Reflect.setPrototypeOf(target, proto);
            console.log(`{setPrototypeOf|obj:[${objname}]}`);
            return result;
        },

    }
    return new Proxy(obj,handle)
}