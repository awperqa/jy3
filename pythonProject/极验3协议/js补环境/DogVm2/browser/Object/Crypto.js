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