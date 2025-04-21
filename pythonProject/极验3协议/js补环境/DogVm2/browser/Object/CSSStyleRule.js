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