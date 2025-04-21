WebGLDebugRendererInfo = {};
WebGLDebugRendererInfo.prototype = {};

Object.defineProperties(WebGLDebugRendererInfo.prototype, {
    [Symbol.toStringTag]: {
        value: "WebGLDebugRendererInfo",
        configurable: true
    }
});
Object.defineProperty(WebGLDebugRendererInfo.prototype, "UNMASKED_RENDERER_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37446,});
Object.defineProperty(WebGLDebugRendererInfo.prototype, "UNMASKED_VENDOR_WEBGL",{"configurable":false,"enumerable":true,"writable":false,"value":37445,});

WebGLDebugRendererInfo = dogvm.proxy(WebGLDebugRendererInfo);

webGLDebugRendererInfo = {};
webGLDebugRendererInfo.__proto__ = WebGLDebugRendererInfo.prototype;

dogvm.memory.webgl["WEBGL_debug_renderer_info"] = webGLDebugRendererInfo;