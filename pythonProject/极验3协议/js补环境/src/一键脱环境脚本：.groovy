一键脱环境脚本：

第4节中获取属性描述符这部分可以解耦，因此这部分分离出来单独形成一个函数。

// 获取原型函数环境代码
let getProtoFuncEnvCode = function getProtoFuncEnvCode(ProtoFunc, instanceObj) {
    // ProtoFunc: 原型函数
    // instanceObj: 实例对象,可选
    let code = "";
    let protoName = ProtoFunc.name;
    // 添加注释
    code += `// ${protoName}对象\r\n`;
    // 1.定义原型函数
    code += `let ${protoName} = function ${protoName}(){}\r\n`;
    // 2.设置原型函数属性
    for (const key in Object.getOwnPropertyDescriptors(ProtoFunc)) {
        if (key === "arguments" || key === "caller" || key === "length" || key === "name" || key === "prototype") {
            continue;
        }
        let definePropertyDescriptor = getDescriptor(ProtoFunc, key, instanceObj);
        code += definePropertyDescriptor
    }
    // 3.设置原型对象的属性
    code += `Object.defineProperty(${protoName}.prototype, Symbol.toStringTag,{"value":"${protoName}","writable":false,"enumerable":false,"configurable":true})\r\n`;
    for (const key in Object.getOwnPropertyDescriptors(ProtoFunc.prototype)) {
        if (key === "constructor") {
            continue;
        }
        let definePropertyDescriptor = getDescriptor(ProtoFunc.prototype, key,`${protoName}.prototype`, instanceObj);
        code += definePropertyDescriptor
    }
    // 4.设置原型对象的原型属性
    let protoProtoName = Object.getPrototypeOf(ProtoFunc.prototype)[Symbol.toStringTag];
    if (protoProtoName !== undefined) { //undefined说明直接是继承于object
        code += `Object.setPrototypeOf(${protoName}.prototype, ${protoProtoName}.prototype);\r\n`;
    }

    console.log(code);
    copy(code);
}

//获取实例对象环境
let getObjEnvCode = function getObjEnvCode(obj, objName) {
    let code = "";
    // 添加注释
    code += `// ${objName}对象\r\n`;
    // 1. 定义对象
    code += `let ${objName} = {}\r\n`;
    // 2. 定义对象属性
    for (const key in Object.getOwnPropertyDescriptors(obj)) {
        let definePropertyDescriptor = getDescriptor(obj, key,objName, obj);
        code += definePropertyDescriptor
    }
    // 3. 设置原型
    let protoName = Object.getPrototypeOf(obj)[Symbol.toStringTag];
    if (protoName !== undefined) { //undefined说明直接是继承于object
        code += `Object.setPrototypeOf(${objName}, ${protoName}.prototype);\r\n`;
    }

    console.log(code);
    copy(code);
}

//获取属性描述符
let getDescriptor = function getDescriptor(obj, prop,objName, instanceObj) {
    let code = ''
    let propertyDescriptor = Object.getOwnPropertyDescriptor(obj, prop);
    code += `Object.defineProperty(${objName}, "${prop}",{"configurable":${propertyDescriptor.configurable},"enumerable":${propertyDescriptor.enumerable},`;
    if (propertyDescriptor.hasOwnProperty('writable')) {
        code += `"writable":${propertyDescriptor.writable},`
    }

    if (propertyDescriptor.hasOwnProperty('value')) {
        if (propertyDescriptor.value instanceof Object) {
            if (typeof propertyDescriptor.value === 'function') {
                code += `"value": function ${prop}(){},`
            } else {
                code += `"value":{},` //需要额外实现实例对象的补充，可手动可自动
            }
        } else if (typeof propertyDescriptor.value === 'symbol') {
            code += `"value":${propertyDescriptor.value.toString()},`;
        } else if (typeof propertyDescriptor.value === "string") {
            code += `"value":"${propertyDescriptor.value}",`;
        } else {
            code += `"value":${propertyDescriptor.value},`;
        }
    }
    if (propertyDescriptor.hasOwnProperty('get')) {
        if (typeof propertyDescriptor.get === 'function') {
            if (instanceObj) {
                let get_result = propertyDescriptor.get.call(instanceObj)
                code += `"get": function ${prop}_get(){return "${get_result}"},`
            }else {
                code += `"get": function ${prop}_get(){},`
            }
        } else {
            code += `get:undefined, `
        }
    }
    if (propertyDescriptor.hasOwnProperty('set')) {
        if (typeof propertyDescriptor.set === 'function') {
            code += `"set": function ${prop}_set(){},`
        } else {
            code += `set:undefined, `
        }
    }
    code += '});\r\n'
    return code
}