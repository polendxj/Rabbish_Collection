/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils=require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()
router.post('/stbSgid/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/stbSgid/list.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res,data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json,resp)
            });
    },resp)

});

router.post('/stbSgid/save', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/stbSgid/save.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

router.post('/stbSgid/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/stbSgid/delete.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res,data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json,resp)
            });
    })

});

router.post('/stbSgid/detail', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    RequestApi.Request(baseURL + '/stbSgid/detail.do', 'POST', data, req, resp);

});

module.exports = router