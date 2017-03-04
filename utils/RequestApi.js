/**
 * Created by Administrator on 2016/11/2.
 */
var fetch = require('node-fetch');
var querystring = require('querystring');
var ExceptionUtils = require('../utils/ExceptionUtils');

var Request = function (url, method, data, req,resp,callback) {
    ExceptionUtils.uncaughtException(function () {
        fetch(url,
            {
                method: method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data,
                timeout: 5000
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp,callback)
            })
            .catch(function (ex) {
                resp.sendStatus(500)
            });
    }, resp)
};


module.exports.Request = Request