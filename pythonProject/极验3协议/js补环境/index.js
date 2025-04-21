var  fs = require('fs');
var dogvm2 = require('./DogVm2/dogvm2.node.js');
const {VM,VMScript} = require('vm2');
var dogvm2_code = dogvm2.GetCode();  // 框架代码
// debugger;
var web_js_code = fs.readFileSync(`${__dirname}/rs.js`) ; // 网站js代码
var log_code = "\r\ndogvm.print.getAll();\r\r";
var my_code = fs.readFileSync(`${__dirname}/myCode.js`) ; // 自定义js代码
web_js_code = web_js_code+log_code+my_code;
var all_code = dogvm2_code+web_js_code;
fs.writeFileSync(`${__dirname}/debugger_bak.js`,all_code);
const script = new VMScript(all_code,`${__dirname}/debugger.js`); //真实路径，浏览器打开的就是该缓存文件
const vm = new VM(); // new 一个纯净v8环境

const args = process.argv.slice(2);
json_a = JSON.parse(args[0]);
for(key in json_a){
    vm.setGlobal(key,json_a[key]);
}

debugger
let a = vm.run(script);
console.log(a);
debugger
