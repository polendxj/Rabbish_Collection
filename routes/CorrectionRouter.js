/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/correction', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/correction' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/configureItem/correctionItems', function (req, resp) {
    RequestApi.Request(baseURL + '/rsapp/configureItem/correctionItems', 'GET', "", req, resp);
});

module.exports = router;