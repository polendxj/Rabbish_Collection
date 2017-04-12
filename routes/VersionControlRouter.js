/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/latestVersion', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(baseURL + '/rsapp/latestVersion/' + data.appType, 'GET', "", req, resp);
});

module.exports = router;