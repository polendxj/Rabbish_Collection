/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var router = express()
router.post('/cseSession/list', function (req, resp) {
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
        fetch(baseURL+'/cseSession/list.do',
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

router.post('/cseSession/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/cseSession/detail.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data,
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

router.post('/cseSession/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/css/sessionKill.do',
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
module.exports = router