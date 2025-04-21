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