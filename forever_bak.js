var forever = require('forever-monitor');
var process = require('process')

var child = new (forever.Monitor)('app.js', {
    max: 3,
    silent: true,
    args: [],
    minUptime: 10000,
    spinSleepTime: 8000
});

child.on('exit', function () {
    console.log('app.js has exited after 3 restarts');
});

process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});
process.on('exit', function () {
    console.log('please dont die...')
});

child.start();
