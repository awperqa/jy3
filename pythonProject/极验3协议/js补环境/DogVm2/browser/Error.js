// // Error对象
// // 重写 Error 构造函数
// debugger;
// var originalError = Error;
// var Error = function (message) {
//     debugger;
//     const error = new originalError(message);
//     // 获取堆栈信息
//     let stack = error.stack;
//     // 格式化堆栈信息
//     function replaceStackTrace(str, targetPath, endPath) {

//     }

//     const targetPath = "tdc.js?app_data=7283145436216164352&t=573262812";
//     const str = 'Error: errr\n    at eval (eval-ee8821db.repl:1:1)\n    at D:\\code\\逆向\\js补环境/debugger.js:3126:17\n    at B (D:\\code\\逆向\\js补环境/debugger.js:3128:14)\n    at Array.R (D:\\code\\逆向\\js补环境/debugger.js:3241:20)\n    at __TENCENT_CHAOS_VM (D:\\code\\逆向\\js补环境/debugger.js:3380:34)\n    at Proxy.Q (D:\\code\\逆向\\js补环境/debugger.js:3221:24)\n    at Array.R (D:\\code\\逆向\\js补环境/debugger.js:3155:29)\n    at __TENCENT_CHAOS_VM (D:\\code\\逆向\\js补环境/debugger.js:3380:34)\n    at Object.Q [as getData] (D:\\code\\逆向\\js补环境/debugger.js:3221:24)\n    at D:\\code\\逆向\\js补环境/debugger.js:3533:12';
//     stack = replaceStackTrace(stack, targetPath, 'at e.getTdcData (dy-ele.5be1e8be.js:1:99567)');

//     // 修改堆栈
//     error.stack = stack;

//     return error;
// };
// dogvm.safefunction(Error);


// Error = dogvm.proxy(Error);

debugger

Error.prepareStackTrace = (err, structuredStackTrace) => {
    debugger;
    // 获取错误信息并作为第一行
    const errorMessage = `${err.name}: ${err.message}`;
    // const stackLines = structuredStackTrace.map((callSite, index) => {

    //     const functionName = callSite.getFunctionName() ;
    //     const fileName = callSite.getFileName() || '';
    //     const lineNumber = callSite.getLineNumber();
    //     const columnNumber = callSite.getColumnNumber();
    //     const replaceUrl = 'https://turing.captcha.qcloud.com/tdc.js?app_data=7283483814907846656&t=1344382419';
    //     const newFileName = fileName.split('debugger.js')[0].replace(/.*/, replaceUrl);
    //     if (index === 0 && callSite.isEval()) {
    //         return `    at eval (eval at <anonymous> (${newFileName}:${1}:${1}), <anonymous>:1:12)`;
    //     }

    //     if (index !== 0 && callSite.getFunctionName() == null){
    //         return `    at e.getTdcData (https://turing.captcha.gtimg.com/1/dy-ele.5be1e8be.js:1:99985)`;
    //     }

    //     if (index === structuredStackTrace.length - 1) {
    //         return `    at t.verify (https://turing.captcha.gtimg.com/1/dy-ele.5be1e8be.js:1:126659)`;
    //     }

    //     return functionName == null 
    //         ?`    at ${newFileName}:${lineNumber}:${columnNumber}`
    //         :`    at ${functionName} (${newFileName}:${lineNumber}:${columnNumber})`;
    // }).join('\n');

    // 将错误信息和堆栈信息组合
    stackLines = '    at https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:19:24\n    at B (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:21:14)\n    at Array.R (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:130:20)\n    at __TENCENT_CHAOS_VM (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:266:34)\n    at Q (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:110:24)\n    at Array.R (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:48:29)\n    at __TENCENT_CHAOS_VM (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:266:34)\n    at Object.Q [as getData] (https://turing.captcha.qcloud.com/tdc.js?app_data=7288551096081035264&t=640801614:110:24)\n    at e.getTdcData (https://turing.captcha.gtimg.com/1/dy-ele.5be1e8be.js:1:99985)\n    at t.verify (https://turing.captcha.gtimg.com/1/dy-ele.5be1e8be.js:1:126659)';
    return `${errorMessage}\n${stackLines}`;
};

