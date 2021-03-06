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

var CitySettingRouter = require('./routes/AreaSettiingRouter');
var ClassConfRouter = require('./routes/ClassConfRouter');
var ManualRecordRouter = require('./routes/ManualRecordRouter');
var TransitLineRouter = require('./routes/TransitLineRouter');
var CorrectionRouter = require('./routes/CorrectionRouter');
var ComplaintRouter = require('./routes/ComplaintRouter');
var StoreSettlementRouter = require('./routes/StoreSettlementRouter');
var StoreRouter = require('./routes/StoreRouter');
var ReviewRouter = require('./routes/ReviewRouter');
var GeneralUserRouter = require('./routes/GeneralUserRouter');
var AdminUserRouter = require('./routes/AdminUserRouter');
var OrganizationRouter = require('./routes/OrganizationRouter');
var ReplyRouter = require('./routes/ReplyRouter');
var NoticeRouter = require('./routes/NoticeRouter');
var StatisticRouter = require('./routes/StatisticRouter');
var SystemMonitorRouter = require('./routes/SystemMonitorRouter');
var VersionControlRouter = require('./routes/VersionControlRouter');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(CitySettingRouter)
app.use(ClassConfRouter)
app.use(ManualRecordRouter)
app.use(TransitLineRouter)
app.use(CorrectionRouter)
app.use(ComplaintRouter)
app.use(StoreSettlementRouter)
app.use(StoreRouter)
app.use(ReviewRouter)
app.use(GeneralUserRouter)
app.use(AdminUserRouter)
app.use(OrganizationRouter)
app.use(ReplyRouter)
app.use(NoticeRouter)
app.use(StatisticRouter)
app.use(SystemMonitorRouter)
app.use(VersionControlRouter)

app.use(express.static(path.join(__dirname, 'build')));
//app.use(express.static('resues-sorting-home-file'));
app.set('port', require('./config/config').node_port);
app.get('*', function (request, response, next) {
    response.sendFile(__dirname + '/build/index.html');
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
