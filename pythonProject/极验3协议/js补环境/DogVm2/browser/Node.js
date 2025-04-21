
var Node = function Node(){
    throw new TypeError("Illegal constructor");
};
dogvm.safefunction(Node);

Node.prototype.__proto__ = EventTarget.prototype;

///////////////////////////////////////
Object.defineProperty(Node, "ELEMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Node, "ATTRIBUTE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Node, "TEXT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(Node, "CDATA_SECTION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(Node, "ENTITY_REFERENCE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(Node, "ENTITY_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(Node, "PROCESSING_INSTRUCTION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":7,});
Object.defineProperty(Node, "COMMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(Node, "DOCUMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":9,});
Object.defineProperty(Node, "DOCUMENT_TYPE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":10,});
Object.defineProperty(Node, "DOCUMENT_FRAGMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":11,});
Object.defineProperty(Node, "NOTATION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":12,});
Object.defineProperty(Node, "DOCUMENT_POSITION_DISCONNECTED",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Node, "DOCUMENT_POSITION_PRECEDING",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Node, "DOCUMENT_POSITION_FOLLOWING",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(Node, "DOCUMENT_POSITION_CONTAINS",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(Node, "DOCUMENT_POSITION_CONTAINED_BY",{"configurable":false,"enumerable":true,"writable":false,"value":16,});
Object.defineProperty(Node, "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC",{"configurable":false,"enumerable":true,"writable":false,"value":32,});
Object.defineProperty(Node.prototype, Symbol.toStringTag,{"value":"Node","writable":false,"enumerable":false,"configurable":true})
Object.defineProperty(Node.prototype, "baseURI",{"configurable":true,"enumerable":true,"get": function baseURI_get(){},set:Node, });
Object.defineProperty(Node.prototype, "isConnected",{"configurable":true,"enumerable":true,"get": function isConnected_get(){},set:Node, });
Object.defineProperty(Node.prototype, "ownerDocument",{"configurable":true,"enumerable":true,"get": function ownerDocument_get(){},set:Node, });
Object.defineProperty(Node.prototype, "parentElement",{"configurable":true,"enumerable":true,"get": function parentElement_get(){},set:Node, });
Object.defineProperty(Node.prototype, "childNodes",{"configurable":true,"enumerable":true,"get": function childNodes_get(){},set:Node, });
Object.defineProperty(Node.prototype, "firstChild",{"configurable":true,"enumerable":true,"get": function firstChild_get(){},set:Node, });
Object.defineProperty(Node.prototype, "lastChild",{"configurable":true,"enumerable":true,"get": function lastChild_get(){},set:Node, });
Object.defineProperty(Node.prototype, "previousSibling",{"configurable":true,"enumerable":true,"get": function previousSibling_get(){},set:Node, });
Object.defineProperty(Node.prototype, "nextSibling",{"configurable":true,"enumerable":true,"get": function nextSibling_get(){},set:Node, });
Object.defineProperty(Node.prototype, "nodeValue",{"configurable":true,"enumerable":true,"get": function nodeValue_get(){},"set": function nodeValue_set(){debugger;},});
Object.defineProperty(Node.prototype, "textContent",{"configurable":true,"enumerable":true,"get": function textContent_get(){},"set": function textContent_set(){debugger;},});
Object.defineProperty(Node.prototype, "ELEMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Node.prototype, "ATTRIBUTE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Node.prototype, "TEXT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":3,});
Object.defineProperty(Node.prototype, "CDATA_SECTION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(Node.prototype, "ENTITY_REFERENCE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":5,});
Object.defineProperty(Node.prototype, "ENTITY_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":6,});
Object.defineProperty(Node.prototype, "PROCESSING_INSTRUCTION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":7,});
Object.defineProperty(Node.prototype, "COMMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(Node.prototype, "DOCUMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":9,});
Object.defineProperty(Node.prototype, "DOCUMENT_TYPE_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":10,});
Object.defineProperty(Node.prototype, "DOCUMENT_FRAGMENT_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":11,});
Object.defineProperty(Node.prototype, "NOTATION_NODE",{"configurable":false,"enumerable":true,"writable":false,"value":12,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_DISCONNECTED",{"configurable":false,"enumerable":true,"writable":false,"value":1,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_PRECEDING",{"configurable":false,"enumerable":true,"writable":false,"value":2,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_FOLLOWING",{"configurable":false,"enumerable":true,"writable":false,"value":4,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_CONTAINS",{"configurable":false,"enumerable":true,"writable":false,"value":8,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_CONTAINED_BY",{"configurable":false,"enumerable":true,"writable":false,"value":16,});
Object.defineProperty(Node.prototype, "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC",{"configurable":false,"enumerable":true,"writable":false,"value":32,});
Object.defineProperty(Node.prototype, "compareDocumentPosition",{"configurable":true,"enumerable":true,"writable":true,"value": function compareDocumentPosition(){debugger;},});dogvm.safefunction(Node.prototype.compareDocumentPosition);
Object.defineProperty(Node.prototype, "contains",{"configurable":true,"enumerable":true,"writable":true,"value": function contains(){debugger;},});dogvm.safefunction(Node.prototype.contains);
Object.defineProperty(Node.prototype, "getRootNode",{"configurable":true,"enumerable":true,"writable":true,"value": function getRootNode(){debugger;},});dogvm.safefunction(Node.prototype.getRootNode);
Object.defineProperty(Node.prototype, "hasChildNodes",{"configurable":true,"enumerable":true,"writable":true,"value": function hasChildNodes(){debugger;},});dogvm.safefunction(Node.prototype.hasChildNodes);
Object.defineProperty(Node.prototype, "isDefaultNamespace",{"configurable":true,"enumerable":true,"writable":true,"value": function isDefaultNamespace(){debugger;},});dogvm.safefunction(Node.prototype.isDefaultNamespace);
Object.defineProperty(Node.prototype, "isEqualNode",{"configurable":true,"enumerable":true,"writable":true,"value": function isEqualNode(){debugger;},});dogvm.safefunction(Node.prototype.isEqualNode);
Object.defineProperty(Node.prototype, "isSameNode",{"configurable":true,"enumerable":true,"writable":true,"value": function isSameNode(){debugger;},});dogvm.safefunction(Node.prototype.isSameNode);
Object.defineProperty(Node.prototype, "lookupNamespaceURI",{"configurable":true,"enumerable":true,"writable":true,"value": function lookupNamespaceURI(){debugger;},});dogvm.safefunction(Node.prototype.lookupNamespaceURI);
Object.defineProperty(Node.prototype, "lookupPrefix",{"configurable":true,"enumerable":true,"writable":true,"value": function lookupPrefix(){debugger;},});dogvm.safefunction(Node.prototype.lookupPrefix);
Object.defineProperty(Node.prototype, "normalize",{"configurable":true,"enumerable":true,"writable":true,"value": function normalize(){debugger;},});dogvm.safefunction(Node.prototype.normalize);
Object.defineProperty(Node.prototype, "replaceChild",{"configurable":true,"enumerable":true,"writable":true,"value": function replaceChild(){debugger;},});dogvm.safefunction(Node.prototype.replaceChild);
Object.setPrototypeOf(Node.prototype, EventTarget.prototype);


Object.defineProperty(Node.prototype, "appendChild",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function appendChild(aChild){
        debugger;

        if (aChild.parentNode) {
            aChild.parentNode.removeChild(aChild);
        }

        // dogvm.memory.htmlelements[this].push(aChild);

        aChild.parentNode = this;

        return aChild;
    },});dogvm.safefunction(Node.prototype.appendChild);


Object.defineProperty(Node.prototype, "removeChild",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function removeChild(child){
        debugger;
        if(!child instanceof Node){
            throw new Error("parameter 1 is not of type 'Node'");
        }
        let list = dogvm.memory.htmlNode.get(this);
        let childIndex = list.findIndex(element => element === child);

        if (childIndex !== -1) {
            // 从父节点的子节点列表中移除
            dogvm.memory.htmlNode.get(this).splice(childIndex, 1);
            for (let i = dogvm.memory.htmlId.length - 1; i >= 0; i--) {
                if (child.innerHTML.includes(dogvm.memory.htmlId[i].id)) { 
                    dogvm.memory.htmlId.splice(i, 1); 
                }
            }
            return child; // 返回被移除的节点
        } else {
            throw new NotFoundError("The node to be removed is not a child of this node");
        }

    },});dogvm.safefunction(Node.prototype.removeChild);


Object.defineProperty(Node.prototype, "parentNode", {
    "configurable": true,
    "enumerable": true,
    "get": function parentNode_get() {
        debugger;
        // 从 dogvm 的内存中获取该节点的父节点
        for (const [key, value] of dogvm.memory.htmlNode ) {
            if (value.includes(this)) {
                return key;
            }
        }
        return null;
    },
    "set": function parentNode_set(newParent) {
        debugger;

        // 确保新父节点的子节点列表存在
        if (!dogvm.memory.htmlNode.get(newParent)) {
            dogvm.memory.htmlNode.set(newParent, [])
        }
        // 添加到新父节点的子节点列表
        if (!dogvm.memory.htmlNode.get(newParent).includes(this)) {
            dogvm.memory.htmlNode.get(newParent).push(this);
        }
    }
    
});

Object.defineProperty(Node.prototype, "cloneNode",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function cloneNode(deep = false){
        debugger;
        // 克隆当前节点
        const clonedNode = document.createElement(this._tagName);
        // 如果需要深度克隆，克隆子节点
        if (deep) {
            debugger
            // clonedNode.children = this.children.map(child => child.cloneNode(true));
        }
        return dogvm.proxy(clonedNode);    
    },});dogvm.safefunction(Node.prototype.cloneNode);

Object.defineProperty(Node.prototype, "nodeType",{"configurable":true,"enumerable":true,"get": function nodeType_get(){},set:Node, });
Object.defineProperty(Node.prototype, "nodeName",{"configurable":true,"enumerable":true,"get": function nodeName_get(){},set:Node, });


Object.defineProperty(Node.prototype, "insertBefore",{"configurable":true,"enumerable":true,"writable":true,"value": 
    function insertBefore(newNode, referenceNode){
        debugger;
        if (newNode.parentNode) {
            newNode.parentNode.removeChild(newNode);
        }
        newNode.parentNode = this;
        if(referenceNode != undefined){
            //将一个节点插入到指定父节点的子节点中，并位于参考节点之前
            let list = dogvm.memory.htmlNode.get(this);
           let childIndex = list.findIndex(e=>e===referenceNode);
           if(childIndex!==-1){
                const lastElement = list[list.length - 1];
                dogvm.memory.htmlNode.get(this).pop();
                dogvm.memory.htmlNode.get(this).splice(childIndex, 0, lastElement);
           }else{
                debugger;
                // 参考节点不是子节点 考虑报错
           }
        }
        return newNode;
    },});dogvm.safefunction(Node.prototype.insertBefore);



dogvm.safeproperty(Node);
