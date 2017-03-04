/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var router = express()
router.post('/alarmHistory/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data=querystring.stringify(JSON.parse(req.body.data))

        fetch(baseURL+'/alarmHistory/list.do',
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
        })
    }, resp)

});
module.exports = router