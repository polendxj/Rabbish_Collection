/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/organization', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/organization' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/organization/register', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/organization', 'POST',data, req, resp);
});
router.post('/rsapp/organization/detail', function (req, resp) {
    var data = req.body.data;
    RequestApi.Request(baseURL + '/rsapp/organization/'+data, 'GET',data, req, resp);
});
router.post('/rsapp/organization/update', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    var id = req.query.id;
    RequestApi.Request(baseURL + '/rsapp/organization/'+id, 'PUT',data, req, resp);
});

module.exports = router;