/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var router = express()
router.post('/cseGroup/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/cseGroup/list.do',
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

router.post('/cseGroup/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = JSON.parse(req.body.data)
        var result = 'groupId=' + data.groupId + '&'
        data.cseList.forEach(function (val, key) {
            result = result + 'groupedCseList[]=' + val + '&'
        })
        result = result + 'description=' + data.description + '&mode=' + data.mode
        if (data.mode == 'modify') {
            result = result + '&oldGroupId=' + data.oldGroupId
        }
        fetch(baseURL + '/cseGroup/save.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: result
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, result)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/cseGroup/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        console.log(data)
        fetch(baseURL + '/cseGroup/detail.do',
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

router.post('/cseGroup/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        console.log(data)
        fetch(baseURL + '/cseGroup/delete.do',
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