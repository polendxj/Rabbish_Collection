/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()
router.post('/cse/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data=JSON.parse(req.body.data);
        var result=querystring.stringify(JSON.parse(req.body.data))+'&';
        if(data.searchColumn.length>0){
            data.searchColumn.forEach(function (val, key) {
                result = result + 'searchColumn=' + val + '&'
            })
            data.searchValue.forEach(function (val, key) {
                result = result + 'searchValue=' + val + '&'
            })
        }else{
            result = result + 'searchColumn=ALL&searchValue='
        }

        fetch(baseURL+'/css/list.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: result,
                timeout:5000
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            }).catch(function (ex) {
            resp.sendStatus(500)
        });
    }, resp)

});

router.post('/cse/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data=JSON.parse(req.body.data)
        RequestApi.Request("http://" +JSON.parse(req.body.data).serverIp+ ':8500/v1/agent/self', 'GET', '', req, resp, function (json) {
            data.location=json.Config.Datacenter

            fetch(baseURL+'/css/save.do',
                {
                    method: req.method,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                    },
                    body: querystring.stringify(data)
                })
                .then(function (res) {
                    return ExceptionUtils.not200Exception(res, data)
                })
                .then(function (json) {
                    ExceptionUtils.notFalseException(json, resp)
                });
        })

    }, resp)

});

router.post('/cse/cseIdCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data=querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL+'/css/cssIdCheck.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/cse/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data=querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL+'/css/detail.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/cse/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data=querystring.stringify(JSON.parse(req.body.data))
        console.log(data)
        fetch(baseURL+'/css/delete.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/admin/areaList', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        fetch(baseURL+'/admin/areaList.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                }
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, '')
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/css/updateCssStatus', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data=querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL+'/css/updateCssStatus.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body:data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

module.exports = router