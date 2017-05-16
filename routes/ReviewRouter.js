/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/review', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/review' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/review/overall', function (req, resp) {
    RequestApi.Request(baseURL + '/rsapp/review/overall', 'GET', "", req, resp);
});
router.post('/rsapp/review/delete', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/review/'+data, 'DELETE',"", req, resp);
});
module.exports = router;