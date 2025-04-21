const fileName = 'D:\\code\\逆向\\js补环境/debugger.js';

// 方法1：使用字符串方法
const result1 = fileName.split('debugger.js')[0].replace(/.*/, 'tdc.js?app_data=7283145436216164352&t=573262812');
console.log(result1);
// 方法2：使用正则表达式的精确匹配
const result2 = fileName.replace(/^D:\\\\code\\\\逆向\\\\js补环境\//, 'tdc.js?app_data=7283145436216164352&t=573262812');
console.log(result2);
// 方法3：先替换所有反斜杠为正斜杠，再进行替换
const result3 = fileName.replace(/\\/g, '/').replace(/D:\/code\/逆向\/js补环境\//, 'tdc.js?app_data=7283145436216164352&t=573262812');
console.log(result3);
