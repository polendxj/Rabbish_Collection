/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/storeSettlement', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    console.log(data);
    RequestApi.Request(baseURL + '/rsapp/storeSettlement' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/storeSettlement/register', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/storeSettlement', 'POST', data, req, resp);
});

module.exports = router;