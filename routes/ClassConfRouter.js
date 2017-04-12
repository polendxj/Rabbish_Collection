/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/classConf', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/classConf' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/classConf/register', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/classConf', 'POST',data, req, resp);
});
router.post('/rsapp/classConf/detail', function (req, resp) {
    var data = req.body.data;
    RequestApi.Request(baseURL + '/rsapp/classConf/'+data, 'GET',data, req, resp);
});
router.post('/rsapp/classConf/update', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    var id = req.query.id;
    RequestApi.Request(baseURL + '/rsapp/classConf/'+id, 'PUT',data, req, resp);
});
router.post('/rsapp/classConf/delete', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/classConf/'+data, 'DELETE',"", req, resp);
});

module.exports = router;