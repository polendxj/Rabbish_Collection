/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/generalUser', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/generalUser' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/generalUser/register', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/user', 'POST',data, req, resp);
});
router.post('/rsapp/generalUser/delete', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    console.log("general",data);
    RequestApi.Request(baseURL + '/rsapp/user/'+data, 'DELETE',"", req, resp);
});
router.post('/rsapp/user/lock', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    console.log("lockData",data);
    RequestApi.Request(baseURL + '/rsapp/user/lock', 'PUT',data, req, resp);
});
router.post('/rsapp/user/qrcode', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/user/qrcode', 'POST',data, req, resp);
});

module.exports = router;