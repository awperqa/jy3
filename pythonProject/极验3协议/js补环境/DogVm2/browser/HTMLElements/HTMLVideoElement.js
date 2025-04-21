// HTMLVideoElement对象
var HTMLVideoElement = function HTMLVideoElement(){
    throw new TypeError("Illegal constructor");
};dogvm.safefunction(HTMLVideoElement);
Object.defineProperty(HTMLVideoElement.prototype, Symbol.toStringTag,{"value":"HTMLVideoElement","writable":false,"enumerable":false,"configurable":true})

Object.defineProperty(HTMLVideoElement.prototype, "width",{"configurable":true,"enumerable":true,"get": function width_get(){ return 160},"set": function width_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "height",{"configurable":true,"enumerable":true,"get": function height_get(){ return 120},"set": function height_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "videoWidth",{"configurable":true,"enumerable":true,"get": function videoWidth_get(){ return 0},set:undefined, });
Object.defineProperty(HTMLVideoElement.prototype, "videoHeight",{"configurable":true,"enumerable":true,"get": function videoHeight_get(){ return 0},set:undefined, });
Object.defineProperty(HTMLVideoElement.prototype, "poster",{"configurable":true,"enumerable":true,"get": function poster_get(){ return ""},"set": function poster_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "webkitDecodedFrameCount",{"configurable":true,"enumerable":true,"get": function webkitDecodedFrameCount_get(){ return "0"},set:undefined, });
Object.defineProperty(HTMLVideoElement.prototype, "webkitDroppedFrameCount",{"configurable":true,"enumerable":true,"get": function webkitDroppedFrameCount_get(){ return "0"},set:undefined, });
Object.defineProperty(HTMLVideoElement.prototype, "playsInline",{"configurable":true,"enumerable":true,"get": function playsInline_get(){ return "false"},"set": function playsInline_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "onenterpictureinpicture",{"configurable":true,"enumerable":true,"get": function onenterpictureinpicture_get(){ return "null"},"set": function onenterpictureinpicture_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "onleavepictureinpicture",{"configurable":true,"enumerable":true,"get": function onleavepictureinpicture_get(){ return "null"},"set": function onleavepictureinpicture_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "disablePictureInPicture",{"configurable":true,"enumerable":true,"get": function disablePictureInPicture_get(){ return "false"},"set": function disablePictureInPicture_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "cancelVideoFrameCallback",{"configurable":true,"enumerable":true,"writable":true,"value": function cancelVideoFrameCallback(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.cancelVideoFrameCallback);
Object.defineProperty(HTMLVideoElement.prototype, "getVideoPlaybackQuality",{"configurable":true,"enumerable":true,"writable":true,"value": function getVideoPlaybackQuality(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.getVideoPlaybackQuality);
Object.defineProperty(HTMLVideoElement.prototype, "requestPictureInPicture",{"configurable":true,"enumerable":true,"writable":true,"value": function requestPictureInPicture(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.requestPictureInPicture);
Object.defineProperty(HTMLVideoElement.prototype, "requestVideoFrameCallback",{"configurable":true,"enumerable":true,"writable":true,"value": function requestVideoFrameCallback(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.requestVideoFrameCallback);
Object.defineProperty(HTMLVideoElement.prototype, "msVideoProcessing",{"configurable":true,"enumerable":true,"get": function msVideoProcessing_get(){ return "default"},"set": function msVideoProcessing_set(){debugger;},});
Object.defineProperty(HTMLVideoElement.prototype, "msGetVideoProcessingTypes",{"configurable":true,"enumerable":true,"writable":true,"value": function msGetVideoProcessingTypes(){debugger;},});dogvm.safefunction(HTMLVideoElement.prototype.msGetVideoProcessingTypes);
Object.setPrototypeOf(HTMLVideoElement.prototype, HTMLMediaElement.prototype);



dogvm.safeproperty(HTMLVideoElement);



// 创建HTMLMediaElement
dogvm.memory.htmlelements["video"] = function () {
    var media = new (function () {});
    media.__proto__ = HTMLVideoElement.prototype;
    return media;
}