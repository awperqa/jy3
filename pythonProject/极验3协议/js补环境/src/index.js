const {VM} = require('vm2');
var fs = require('fs');
const vm = new VM();

var code = "";
code += fs.readFileSync(`${__dirname}/vm2_proxy.js`) + '\r\n';
code += fs.readFileSync('./src/code.js','utf8') + '\r\n';
debugger
vm.run(code);
debugger


