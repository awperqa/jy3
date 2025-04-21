// CSSRule
var CSSRule = function CSSRule(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(CSSRule);
Object.defineProperty(CSSRule, "STYLE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(CSSRule, "CHARSET_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(CSSRule, "IMPORT_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(CSSRule, "MEDIA_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(CSSRule, "FONT_FACE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(CSSRule, "PAGE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(CSSRule, "NAMESPACE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":10,});
Object.defineProperty(CSSRule, "KEYFRAMES_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":7,});
Object.defineProperty(CSSRule, "KEYFRAME_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(CSSRule, "COUNTER_STYLE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":11,});
Object.defineProperty(CSSRule, "FONT_FEATURE_VALUES_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":14,});
Object.defineProperty(CSSRule, "SUPPORTS_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":12,});
Object.defineProperty(CSSRule, "MARGIN_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":9,});
Object.defineProperty(CSSRule.prototype, Symbol.toStringTag,{"value":"CSSRule","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(CSSRule.prototype, "parentRule",{"configurable":true,"enumerable":true,"get": function parentRule_get(){},set:undefined, });
Object.defineProperty(CSSRule.prototype, "parentStyleSheet",{"configurable":true,"enumerable":true,"get": function parentStyleSheet_get(){},set:undefined, });
Object.defineProperty(CSSRule.prototype, "STYLE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(CSSRule.prototype, "CHARSET_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(CSSRule.prototype, "IMPORT_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(CSSRule.prototype, "MEDIA_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(CSSRule.prototype, "FONT_FACE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(CSSRule.prototype, "PAGE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(CSSRule.prototype, "NAMESPACE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":10,});
Object.defineProperty(CSSRule.prototype, "KEYFRAMES_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":7,});
Object.defineProperty(CSSRule.prototype, "KEYFRAME_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(CSSRule.prototype, "COUNTER_STYLE_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":11,});
Object.defineProperty(CSSRule.prototype, "FONT_FEATURE_VALUES_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":14,});
Object.defineProperty(CSSRule.prototype, "SUPPORTS_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":12,});
Object.defineProperty(CSSRule.prototype, "MARGIN_RULE",{"configurable":false,"enumerable":true,"writable":false,"value":9,});

Object.defineProperty(CSSRule.prototype, "type",{"configurable":true,"enumerable":true,"get": function type_get(){return this._type;},set:undefined, });
Object.defineProperty(CSSRule.prototype, "cssText",{"configurable":true,"enumerable":true,"get": function cssText_get(){return this._cssText},"set": function cssText_set(value){debugger;this._cssText=value;},});