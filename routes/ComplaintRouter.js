/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/complaint', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/complaint' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/complaint/update', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    var id = req.query.id;
    RequestApi.Request(baseURL + '/rsapp/complaint/'+id, 'PUT',data, req, resp);
});

module.exports = router;