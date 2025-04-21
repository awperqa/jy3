// CSSStyleDeclaration对象
var CSSStyleDeclaration = function CSSStyleDeclaration(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CSSStyleDeclaration);

Object.defineProperty(CSSStyleDeclaration.prototype, Symbol.toStringTag,{"value":"CSSStyleDeclaration","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CSSStyleDeclaration.prototype, "cssText",{"configurable":true,"enumerable":true,"get": function cssText_get(){debugger; return ""},"set": function cssText_set(){debugger;},});
Object.defineProperty(CSSStyleDeclaration.prototype, "length",{"configurable":true,"enumerable":true,"get": function length_get(){debugger; return "0"},set:undefined, });
Object.defineProperty(CSSStyleDeclaration.prototype, "parentRule",{"configurable":true,"enumerable":true,"get": function parentRule_get(){debugger; return "null"},set:undefined, });
Object.defineProperty(CSSStyleDeclaration.prototype, "cssFloat",{"configurable":true,"enumerable":true,"get": function cssFloat_get(){debugger; return ""},"set": function cssFloat_set(){debugger;},});
Object.defineProperty(CSSStyleDeclaration.prototype, "getPropertyPriority",{"configurable":true,"enumerable":true,"writable":true,"value": function getPropertyPriority(){debugger;},});dogvm.safefunction(CSSStyleDeclaration.prototype.getPropertyPriority);

Object.defineProperty(CSSStyleDeclaration.prototype, "item",{"configurable":true,"enumerable":true,"writable":true,"value": function item(){debugger;},});dogvm.safefunction(CSSStyleDeclaration.prototype.item);
Object.defineProperty(CSSStyleDeclaration.prototype, "removeProperty",{"configurable":true,"enumerable":true,"writable":true,"value": function removeProperty(){debugger;},});dogvm.safefunction(CSSStyleDeclaration.prototype.removeProperty);
Object.defineProperty(CSSStyleDeclaration.prototype, "setProperty",{"configurable":true,"enumerable":true,"writable":true,"value": function setProperty(){debugger;},});dogvm.safefunction(CSSStyleDeclaration.prototype.setProperty);

Object.defineProperty(CSSStyleDeclaration.prototype, "getPropertyValue",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function getPropertyValue(property){
        debugger;
        if (property == 'color'){
            return this.color;
        }
    },});dogvm.safefunction(CSSStyleDeclaration.prototype.getPropertyValue);



dogvm.safeproperty(CSSStyleDeclaration);


////////////////////////////////////// 实列
CSSStyleDeclaration.createCSSStyleDog = function createCSSStyleDog(element){
    // a对象
    debugger;
    let a = Object.create(CSSStyleDeclaration.prototype);
    Object.defineProperty(a,"display",{"configurable":true,"enumerable":true,"get": function display_get(){debugger; return this._display || ""},"set": function display_set(value){debugger;this._display = value;},})
    if(element == undefined){
        return dogvm.proxy(a);
    }
    function setColor(p){
        return p =='green' ? 'rgb(0, 128, 0)' : p=='red' ? 'rgb(255, 0, 0)' : p=='blue' ? 'rgb(0, 0, 255)'  : 'rgb(0, 0, 0)';
    }
    a.color = setColor(element.innerHTML);
    // 获取元素的最开始父节点
    let parentNode = {};
    for (const [key, value] of dogvm.memory.htmlNode ) {
        value.forEach(e => {
            e.innerHTML.includes(element.innerHTML) ? parentNode = key : null;
        });
    }

    for(const css of dogvm.memory.cssChose){
        let dealObj = css.selector.split(':')[0].trim();
        // body相关
        if(parentNode.constructor.name.includes('Body') && dealObj.includes("body")){
            // 有not
            if(css.selector.includes("not")){
                if(css.selector.includes(element.id)){
                    a.color = setColor(element.innerHTML);
                }else   a.color = setColor(css.color);
            }else{
                if(css.selector.includes(element.id)){
                    a.color = setColor(css.color);
                }else   a.color = setColor(element.innerHTML);
            }
        }
        // 不是body  判断是否含义目标
        contains = element.parentList.some(item => dealObj.includes(item));
        if(contains){
            if(css.selector.includes("not")){
                if(css.selector.includes(element.id)){
                    a.color = setColor(element.innerHTML);
                }else   a.color = setColor(css.color);
            }else{
                if(css.selector.includes(element.id)){
                    a.color = setColor(css.color);
                }else   a.color = setColor(element.innerHTML);
            }
        }
    }
    return dogvm.proxy(a);
};dogvm.safefunction(CSSStyleDeclaration.createCSSStyleDog);



