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
