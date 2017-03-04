var express = require('express');
var path = require('path');
var ejs = require('ejs');
var http = require('http');
var serveStatic = require('serve-static')
var cluster = require('cluster')
var numCPUs = require('os').cpus().length;
var favicon = require('serve-favicon')
var cookieSession = require('cookie-session')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var urllib = require('url');
var process = require('process')
var ExceptionUtils = require('./utils/ExceptionUtils')
var RequestApi = require('./utils/RequestApi')
var exec = require('child_process').exec
var querystring = require('querystring')

var log4js = require('log4js');
log4js.configure({
    appenders: [
        {type: 'console'}, //控制台输出
        {
            type: 'file', //文件输出
            filename: '/var/log/CSCenterNode.log',
            maxLogSize: 1024 * 1024,
            backups: 3,
            category: 'main'
        }
    ]
});
logger = log4js.getLogger('main');
logger.setLevel('INFO');
baseURL = require('./config/config').production_csm_url
consulURL = require('./config/config').consul_url
allApp = []

var SysManagerCSR = require('./routes/SysManagerCSR')
var SysManagerSO = require('./routes/SysManagerSO')
var SysManagerLogin = require('./routes/SysManagerLogin')
var SysManagerSGroup = require('./routes/SysManagerGroup')
var SysManagerSubApp = require('./routes/SysManagerSubApp')
var SysManagerCSE = require('./routes/SysManagerCSE')
var SysManagerGW = require('./routes/SysManagerGW')
var SysManagerMonitor = require('./routes/SysManagerMonitor')
var SysManagerDedicated = require('./routes/SysManagerDedicated')
var SysManagerPermission = require('./routes/SysManagerPermission')
var Admin = require('./routes/Admin')
var AlarmHistory = require('./routes/AlarmHistory')
var SysManagerSED = require('./routes/SysManagerSED')
var SysManagerThreshold = require('./routes/SysManagerThreshold')
var JobHistory = require('./routes/JobHistory')
var ServiceModel = require('./routes/ServiceModel')
var SysManagerCSEGroup = require('./routes/SysManagerCSEGroup')
var SysManagerServiceGroup = require('./routes/SysManagerServiceGroup')
var RealtimeSessions = require('./routes/RealtimeSessions')
var TerminalPosition = require('./routes/TerminalPosition')
var StreamingTemplate = require('./routes/StreamingTemplate')
var AppMenagementByConsul = require('./routes/AppMenagementByConsul')

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(SysManagerCSR)
app.use(SysManagerSO)
app.use(SysManagerLogin)
app.use(SysManagerSGroup)
app.use(SysManagerSubApp)
app.use(SysManagerCSE)
app.use(SysManagerGW)
app.use(SysManagerMonitor)
app.use(SysManagerDedicated)
app.use(SysManagerPermission)
app.use(Admin)
app.use(AlarmHistory)
app.use(SysManagerSED)
app.use(SysManagerThreshold)
app.use(JobHistory)
app.use(ServiceModel)
app.use(SysManagerCSEGroup)
app.use(SysManagerServiceGroup)
app.use(RealtimeSessions)
app.use(TerminalPosition)
app.use(StreamingTemplate)
app.use(AppMenagementByConsul)
app.use(express.static(path.join(__dirname, 'build')));
app.set('port', require('./config/config').node_port);
app.get('*', function (request, response, next) {
    response.sendFile(__dirname + '/build/index.html');
});

app.post('/jabriel/appList', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    RequestApi.Request(baseURL + '/subApp/list.do', 'POST', '', req, resp, function (json) {
        resp.send('OK')
        allApp = json;
        json.subAppList.forEach(function (val) {
            exec("./phantomjs snapshot.js " + val.webUrl + " " + val.appId);
        })
    })
});

app.post('/jabriel/makeAppSnapshot', function (req, resp) {
    var data = JSON.parse(req.body.data);
    console.log(data.webURL);
    console.log(data.appId);
    exec("./phantomjs snapshot.js " + data.webURL + " " + data.appId);
    setTimeout(function () {
        resp.send({result:"ok"});
    }, 1000)
});
var server = app.listen(app.get('port'), function (req, res) {
    console.log('服务器启动了...');
});
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
});
process.on('exit', function () {
    console.log('Bye.');
});


module.exports = app;
