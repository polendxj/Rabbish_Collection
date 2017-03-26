/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/statistic/classifying/class', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/classifying/class' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/statistic/classifying/city', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/classifying/city' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/statistic/classifying/organization', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/classifying/organization' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/statistic/total', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/total' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/statistic/settlement', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/settlement' + "?" + data, 'GET', "", req, resp);
});

module.exports = router;