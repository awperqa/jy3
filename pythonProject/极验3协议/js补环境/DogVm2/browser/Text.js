// Text
var Text = function Text(){};
Object.defineProperty(Text.prototype, Symbol.toStringTag,{"value":"Text","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Text.prototype, "wholeText",{"configurable":true,"enumerable":true,"get": function wholeText_get(){},set:undefined, });
Object.defineProperty(Text.prototype, "assignedSlot",{"configurable":true,"enumerable":true,"get": function assignedSlot_get(){},set:undefined, });
Object.defineProperty(Text.prototype, "splitText",{"configurable":true,"enumerable":true,"writable":true,"value": function splitText(){debugger;},});dogvm.safefunction(Text.prototype.splitText);
Object.setPrototypeOf(Text.prototype, CharacterData.prototype);


Text.createTextDog = function createTextDog(text){
    let my_text = Object.create(Text.prototype);
    my_text.wholeText = text;
    my_text.nodeType = 3;  // TEXT_NODE
    my_text.nodeName = "#text";
};dogvm.safefunction(Text.createTextDog);

dogvm.safeproperty(Text);