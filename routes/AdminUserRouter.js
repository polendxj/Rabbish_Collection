/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/user/login', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/user/login', 'POST',data, req, resp);
});
router.post('/rsapp/adminUser', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/adminUser' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/adminUser/register', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/adminUser', 'POST',data, req, resp);
});
router.post('/rsapp/adminUser/detail', function (req, resp) {
    var data = req.body.data;
    RequestApi.Request(baseURL + '/rsapp/adminUser/'+data, 'GET',data, req, resp);
});
router.post('/rsapp/adminUser/update', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    // var id = req.query.id;
    RequestApi.Request(baseURL + '/rsapp/adminUser', 'PUT',data, req, resp);
});
router.post('/rsapp/adminUser/delete', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    console.log("adminId",data);
    RequestApi.Request(baseURL + '/rsapp/user/'+data, 'DELETE',"", req, resp);
});
router.post('/rsapp/password/reset', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/password/reset', 'PUT',data, req, resp);
});

module.exports = router;