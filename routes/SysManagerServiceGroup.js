/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var router = express()
router.post('/serviceGroup/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/serviceArea/list.do',
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

router.post('/serviceGroup/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/serviceArea/save.do',
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
    },resp)

});

router.post('/serviceGroup/serviceGroupIdCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/serviceArea/areaNameCheck.do',
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
    },resp)

});

router.post('/serviceGroup/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/serviceArea/detail.do',
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

router.post('/serviceGroup/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        console.log(data)
        fetch(baseURL + '/serviceArea/delete.do',
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