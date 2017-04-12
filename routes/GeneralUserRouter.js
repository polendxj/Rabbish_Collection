/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/authcode/admin', function (req, resp) {
    var data = JSON.parse(req.body.data).phone;
    RequestApi.Request(baseURL + '/rsapp/authcode/admin/' + data, 'GET', "", req, resp);
});
router.post('/rsapp/generalUser', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/generalUser' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/generalUser/register', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/generalUser', 'POST',data, req, resp);
});
router.post('/rsapp/generalUser/detail', function (req, resp) {
    var data = req.body.data;
    RequestApi.Request(baseURL + '/rsapp/generalUserInfo/'+data, 'GET',data, req, resp,function (userDetail) {
        if (userDetail.status) {
            if(userDetail.data&&userDetail.data!=null){
                RequestApi.Request(baseURL + '/rsapp/organization/'+userDetail.data.organizationid, 'GET',data, req, resp,function (organization) {
                    userDetail['data']['organizationName'] = organization.data.name;
                    resp.send(userDetail);
                });
            }else{
                resp.send(userDetail);
            }
        }else{
            resp.send(userDetail);
        }
    });
});
router.post('/rsapp/generalUser/delete', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/user/'+data, 'DELETE',"", req, resp);
});
router.post('/rsapp/user/lock', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/user/lock', 'PUT',data, req, resp);
});
router.post('/rsapp/user/qrcode', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/user/qrcode'+"?"+data, 'POST',"", req, resp);
});

module.exports = router;