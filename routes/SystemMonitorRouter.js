/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/operationData', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/operationData'+"?"+data, 'GET', "", req, resp);
});
router.post('/rsapp/organization/total', function (req, resp) {
    RequestApi.Request(baseURL + '/rsapp/organization/total', 'GET', "", req, resp);
});

module.exports = router;