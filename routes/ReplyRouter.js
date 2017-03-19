/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/reply/register', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/reply', 'POST',data, req, resp);
});
router.post('/rsapp/reply/delete', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/reply/'+data, 'DELETE',"", req, resp);
});

module.exports = router;