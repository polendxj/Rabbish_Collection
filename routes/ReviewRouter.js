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
    RequestApi.Request(baseURL + '/rsapp/review' + "?" + data, 'GET', "", req, resp, function (reviews) {
        if (reviews.status) {
            if (reviews.data.content.length > 0) {
                var count = 0;
                reviews.data.content.forEach(function (m, k) {
                    (function (m) {
                        console.log("m", m.id);
                        RequestApi.Request(baseURL + '/rsapp/review/'+ m.id, 'GET', "", req, resp, function (reply) {
                            if (reply.data) {
                                m["reply"] = reply.data;
                            } else {
                                m["reply"] = "";
                            }
                            count++;
                            if (count == reviews.data.content.length) {
                                resp.send(reviews);
                            }
                        })
                    })(m)
                })
            } else {
                resp.send(reviews);
            }
        } else {
            resp.send(reviews)
        }
    });
    router.post('/rsapp/review/delete', function (req, resp) {
        var data = JSON.stringify(JSON.parse(req.body.data));
        RequestApi.Request(baseURL + '/rsapp/review/'+data, 'DELETE',"", req, resp);
    });
});

module.exports = router;