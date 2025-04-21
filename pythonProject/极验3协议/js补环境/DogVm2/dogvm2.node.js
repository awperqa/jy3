var fs = require('fs');
// 框架工具模块
var vmtools = require('./tools/tools.node.js');
var vmhtml = require('./browser/HTMLElements/htmlelement.node.js');
var vmevent = require('./browser/Event/event.node.js');
var vmobject = require('./browser/Object/object.node.js');
var vmwebgl = require('./browser/WebGL/webgl.node.js');
function GetCode() {
    // 引入框架工具代码
    var code = "";
    code += vmtools.GetCode() + '\r\n';
    code += vmevent.GetCode() + '\r\n';
    code += vmobject.GetCode() + '\r\n';
    code += vmwebgl.GetCode() + '\r\n';
    code += fs.readFileSync(`${__dirname}/browser/Error.js`) + '\r\n';
    // 引入用户框架配置 // 暂时这么写
//    // code += "catvm.memory.config.proxy = true;\r\n"
    // 引入浏览器相关代码
    code += fs.readFileSync(`${__dirname}/browser/EventTarget.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/browser/Node.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/browser/WindowProperties.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/browser/Performance.js`) + '\r\n';
    // 加载BOM环境（优于DOM加载）
    code += fs.readFileSync(`${__dirname}/browser/Window.js`) + '\r\n';
//    code += fs.readFileSync(`${__dirname}/browser/Location.js`) + '\r\n';
//    code += fs.readFileSync(`${__dirname}/browser/Navigator.js`) + '\r\n';
    // code += fs.readFileSync(`${__dirname}/browser/History.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/browser/Screen.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/browser/CharacterData.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/browser/Text.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/browser/MediaQueryList.js`) + '\r\n';
//    code += fs.readFileSync(`${__dirname}/browser/Storage.js`) + '\r\n';
    // code += fs.readFileSync(`${__dirname}/browser/MimeType.js`) + '\r\n';
    // code += fs.readFileSync(`${__dirname}/browser/Plugin.js`) + '\r\n';
    // code += fs.readFileSync(`${__dirname}/browser/PluginArray.js`) + '\r\n';
    // code += fs.readFileSync(`${__dirname}/browser/MimeTypeArray.js`) + '\r\n';

    // 加载HTML节点
    code += vmhtml.GetCode() + '\r\n';
    // 加载DOM环境
    code += fs.readFileSync(`${__dirname}/browser/Document.js`) + '\r\n';
    // 引入用户自定义环境
    code += "debugger;\r\n";
    return code;
}

module.exports = {
    GetCode
}