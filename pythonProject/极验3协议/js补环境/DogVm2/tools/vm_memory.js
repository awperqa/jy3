// 框架内存管理，用于解决变量名重复问题
// 调试日志 window.catvm 把框架功能集中管理，

var dogvm = {};
// 框架运行内存
dogvm.memory = {
    config: {print: true, proxy: true}, // 框架配置：是否打印，是否使用proxy
    htmlelements:{}, // 所有的html节点元素存放位置
    htmlNode: new Map(), //html节点关系
    htmlId: [], //html元素id
    media: {}, //媒体
    cssChose: [], //css选择器
    listeners:{}, // 所有事件存放位置
    log:[], // 环境调用日志统一存放点
    storage:{}, // localStorage 全局存放点
    webgl:{}
}; // 默认关闭打印


