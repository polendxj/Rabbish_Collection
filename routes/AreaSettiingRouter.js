/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/city', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    RequestApi.Request(baseURL + '/rsapp/city' + "?" + data, 'GET', "", req, resp, function (city) {
        if (city.status) {
            if (city.data.length > 0) {
                var count = 0;
                city.data.forEach(function (c, k) {
                    c["country"] = []
                })
                city.data.forEach(function (c, k) {
                    (function (c) {
                        RequestApi.Request(baseURL + '/rsapp/county' + "?cityid=" + c.id, 'GET', "", req, resp, function (country) {
                            c.country=country.data;
                            count++;
                            if (count == city.data.length) {
                                resp.send(city);
                            }
                        })
                    })(c)
                })
            } else {
                resp.send(city);
            }
        } else {
            resp.send(city)
        }
    })
});

module.exports = router