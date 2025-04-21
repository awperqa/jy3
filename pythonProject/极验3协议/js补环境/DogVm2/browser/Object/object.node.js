// .node.js文件的用途就是拼接多个文件的js代码
var fs = require('fs');

function GetCode() {
    var code = ""
    code += fs.readFileSync(`${__dirname}/CSS.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/CSSStyleDeclaration.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/Location.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/Navigator.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/Storage.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/WebGLRenderingContext.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/CanvasRenderingContext2D.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/CustomElementRegistry.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/CSSRule.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/CSSRuleList.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/CSSStyleRule.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/StyleSheet.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/CSSStyleSheet.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/Crypto.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/performanceTiming.js`) + '\r\n';
    return code;

}
module.exports = {
    GetCode
}