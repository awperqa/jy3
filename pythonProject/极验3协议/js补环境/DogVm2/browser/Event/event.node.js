// .node.js文件的用途就是拼接多个文件的js代码
var fs = require('fs');

function GetCode() {
    var code = ""
    code += fs.readFileSync(`${__dirname}/Event.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/UIEvent.js`) + '\r\n';
    code += fs.readFileSync(`${__dirname}/MouseEvent.js`) + '\r\n';
    return code;

}
module.exports = {
    GetCode
}