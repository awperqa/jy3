// 日志调试功能
dogvm.print = {};
dogvm.memory.print = []; // 缓存
dogvm.print.log = function () {
    if (dogvm.memory.config.print) {
        console.table(dogvm.memory.log);
    }
};

dogvm.print.getAll = function () { // 列出所有日志
    if (dogvm.memory.config.print) {
        console.table(dogvm.memory.log);
        console.log(dogvm.memory.print);
    }
};