/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/notice', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/notice' + "?" + data, 'GET', "", req, resp, function (notices) {
        if (notices.status) {
            if (notices.data.content.length > 0) {
                var count = 0;
                notices.data.content.forEach(function (m, k) {
                    (function (m) {
                        RequestApi.Request(baseURL + '/rsapp/adminUser/'+ m.userid, 'GET', "", req, resp, function (user) {
                            if (user.data) {
                                m["userName"] = user.data.name;
                            } else {
                                m["userName"] = "";
                            }
                            count++;
                            if (count == notices.data.content.length) {
                                resp.send(notices);
                            }
                        })
                    })(m)
                })
            } else {
                resp.send(notices);
            }
        } else {
            resp.send(notices)
        }
    });
    router.post('/rsapp/notice/register', function (req, resp) {
        var data = JSON.stringify(JSON.parse(req.body.data));
        RequestApi.Request(baseURL + '/rsapp/notice', 'POST',data, req, resp);
    });
    router.post('/rsapp/notice/delete', function (req, resp) {
        var data = JSON.stringify(JSON.parse(req.body.data));
        RequestApi.Request(baseURL + '/rsapp/notice/'+data, 'DELETE',"", req, resp);
    });
});

module.exports = router;