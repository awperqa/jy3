// CSSRuleList
var CSSRuleList = function CSSRuleList(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CSSRuleList);

Object.defineProperty(CSSRuleList.prototype, Symbol.toStringTag,{"value":"CSSRuleList","writable":false,"enumerable":false,"configurable":true})

Object.defineProperty(CSSRuleList.prototype, "item",{"configurable":true,"enumerable":true,"writable":true,"value": function item(){debugger;},});dogvm.safefunction(CSSRuleList.prototype.item);

Object.defineProperty(CSSRuleList.prototype, "length",{"configurable":true,"enumerable":true,
    "get": function length_get(){
        return this._rule.length;
    },set:undefined, });

CSSRuleList.createDog = function createDog(_innerHtml){
    let obj = Object.create(CSSRuleList.prototype);
    obj[0] = CSSStyleRule.createDog(_innerHtml);
    obj._rule = [obj[0]];
    return obj;
};dogvm.safefunction(CSSRuleList.createDog);