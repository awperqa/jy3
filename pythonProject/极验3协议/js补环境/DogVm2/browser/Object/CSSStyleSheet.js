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