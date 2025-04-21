// StyleSheet对象
var StyleSheet = function StyleSheet(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(StyleSheet);
Object.defineProperty(StyleSheet.prototype, Symbol.toStringTag,{"value":"StyleSheet","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(StyleSheet.prototype, "type",{"configurable":true,"enumerable":true,"get": function type_get(){return this._type;},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "href",{"configurable":true,"enumerable":true,"get": function href_get(){},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "ownerNode",{"configurable":true,"enumerable":true,"get": function ownerNode_get(){},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "parentStyleSheet",{"configurable":true,"enumerable":true,"get": function parentStyleSheet_get(){},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "title",{"configurable":true,"enumerable":true,"get": function title_get(){},set:undefined, });
Object.defineProperty(StyleSheet.prototype, "media",{"configurable":true,"enumerable":true,"get": function media_get(){},"set": function media_set(){debugger;},});
Object.defineProperty(StyleSheet.prototype, "disabled",{"configurable":true,"enumerable":true,"get": function disabled_get(){},"set": function disabled_set(){debugger;},});


dogvm.safeproperty(StyleSheet);
