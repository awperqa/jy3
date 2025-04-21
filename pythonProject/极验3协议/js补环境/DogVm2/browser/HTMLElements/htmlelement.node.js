// .node.js文件的用途就是拼接多个文件的js代码
var fs = require('fs');

function GetCode() {
    var code = ""
    code += fs.readFileSync(`${__dirname}/Element.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLDivElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLHeadElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLBodyElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLHtmlElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLCanvasElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLIFrameElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLParagraphElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLSpanElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLStyleElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLHeadingElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLMediaElement.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/HTMLVideoElement.js`) + '\r\n';
    return code;

}
module.exports = {
    GetCode
}