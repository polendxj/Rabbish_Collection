/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/statistic/classifying/class', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/classifying/class' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/statistic/classifying/city', function (req, resp) {
    var jsonData = JSON.parse(req.body.data);
    console.log("jsonData",jsonData);
    var data = querystring.stringify(jsonData);
    var response = {};
    RequestApi.Request(baseURL + '/rsapp/statistic/classifying/city' + "?" + data, 'GET', "", req, resp, function (cityData) {
        if (cityData.status) {
            var totalCityData = {
                cityid: jsonData.cityid, count: 0, weight: 0, rangeDate: jsonData.startday.replace(/-/g, ".") + " - " + jsonData.endday.replace(/-/g, ".")
            };
            RequestApi.Request(baseURL + '/rsapp/city/'+jsonData.cityid, 'GET', "", req, resp, function (city) {
                totalCityData.cityName = city.data.name;
                cityData.data.content.forEach(function (val) {
                    totalCityData.count = totalCityData.count + val.count;
                    totalCityData.weight = totalCityData.weight + val.weight;
                    val.cityName = city.data.name;
                });
            });
            response['totalCityData'] = totalCityData;
            response['cityData'] = cityData.data;
            response.organizationData =[];
            var organizationAllData = {
                organizationTotal:{},
                organizationEveryData:[]
            };
            RequestApi.Request(baseURL + '/rsapp/organization' + "?cityid=" + jsonData.cityid, 'GET', "", req, resp, function (organizations) {
                if(organizations.status){
                    if (organizations.data.content.length > 0) {
                        var count = 0;
                        var organizationName = "";
                        organizations.data.content.forEach(function (mk, k) {
                            (function (m,kIndex) {
                                var organizationTotalData = {organizationName:m.name,count:0,weight:0};
                                jsonData.organizationid = m.id;
                                console.log("jsonData",jsonData);
                                RequestApi.Request(baseURL + '/rsapp/statistic/classifying/organization' + "?" + querystring.stringify(jsonData), 'GET', "", req, resp, function (organizationData) {
                                    if(organizationData.status){
                                        if(organizationData.data.content.length>0){
                                            organizationData.data.content.forEach(function (val,idx) {
                                                organizationData.data.content[idx].organizationName = m.name;
                                                organizationTotalData.count = organizationTotalData.count+val.count;
                                                organizationTotalData.weight = organizationTotalData.weight+val.weight;
                                            });
                                            organizationTotalData.rangeDate = jsonData.startday.replace(/-/g, ".") + " - " + jsonData.endday.replace(/-/g, ".");
                                            organizationAllData.organizationTotal = organizationTotalData;
                                            organizationAllData.organizationEveryData = organizationData.data.content;
                                            response.organizationData[kIndex] = organizationAllData;
                                            console.log("response",response);
                                        }
                                    }
                                    count++;
                                    if (count == organizations.data.content.length) {
                                        resp.send(response);
                                    }
                                })
                            })(mk,k)
                        })
                    } else {
                        resp.send(response);
                    }
                } else {
                    resp.send(response)
                }
            })
        }
    });
});
router.post('/rsapp/statistic/classifying/organization', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/classifying/organization' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/statistic/total', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/total' + "?" + data, 'GET', "", req, resp);
});
router.post('/rsapp/statistic/settlement', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/settlement' + "?" + data, 'GET', "", req, resp);
});

module.exports = router;