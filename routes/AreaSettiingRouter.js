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
    var countryCount = 0;
    RequestApi.Request(baseURL + '/rsapp/city' + "?" + data, 'GET', "", req, resp, function (city) {
        if (city.status) {
            if (city.data.length > 0) {
                var count = 0;
                city.data.forEach(function (c, k) {
                    c["country"] = [];
                    c["countryIndex"] = 0;
                })
                city.data.forEach(function (c, k) {
                    (function (c) {
                        RequestApi.Request(baseURL + '/rsapp/county' + "?cityid=" + c.id, 'GET', "", req, resp, function (country) {
                            c.country = country.data;
                            if (country.data) {
                                countryCount += country.data.length
                            }

                            count++;
                            if (count == city.data.length) {
                                count = 0;
                                city.data.forEach(function (ci, cityKey) {
                                    if (ci.country) {
                                        ci.country.forEach(function (country, countryKey) {
                                            (function (ct) {
                                                RequestApi.Request(baseURL + '/rsapp/organization' + "?cityid=" + ci.id + "&countyid=" + country.id, 'GET', "", req, resp, function (organization) {
                                                    ct["organization"] = organization.data;
                                                    count++;
                                                    if (count == countryCount) {
                                                        resp.send(city);
                                                    }
                                                })
                                            })(country)
                                        })
                                    }
                                })

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