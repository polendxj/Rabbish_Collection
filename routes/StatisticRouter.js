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
    delete jsonData.cityName;
    delete jsonData.organizationName;
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
            response['organizationData'] =[];
            RequestApi.Request(baseURL + '/rsapp/organization' + "?cityid=" + jsonData.cityid, 'GET', "", req, resp, function (organizations) {
                console.log("organizations",organizations);
                if(organizations.status){
                    if (organizations.data&&organizations.data.totalElements) {
                        response['totalElements'] = organizations.data.totalElements;
                    }else{
                        response['totalElements'] = 0;
                    }
                    if (organizations.data&&organizations.data.content.length > 0) {
                        var count = 0;
                        organizations.data.content.forEach(function (mk, k) {
                            (function (m,kIndex) {
                                var organizationTotalData = {organizationName:m.name,count:0,weight:0};
                                jsonData.organizationid = m.id;
                                RequestApi.Request(baseURL + '/rsapp/statistic/classifying/organization' + "?" + querystring.stringify(jsonData), 'GET', "", req, resp, function (organizationData) {
                                    console.log(organizationData);
                                    var organizationAllData = {
                                        organizationTotal:{},
                                        organizationEveryData:[]
                                    };
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
                                        }else{
                                            organizationAllData.organizationTotal = organizationTotalData;
                                            organizationAllData.organizationEveryData = organizationData.data.content;
                                            response.organizationData[kIndex] = organizationAllData;
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
        }else{
            resp.send(response)
        }
    });
});
router.post('/rsapp/statistic/classifying/organization', function (req, resp) {
    var jsonData = JSON.parse(req.body.data);
    delete jsonData.cityName
    delete jsonData.organizationName
    var data = querystring.stringify(jsonData);
    RequestApi.Request(baseURL + '/rsapp/statistic/classifying/organization' + "?" + data, 'GET', "", req, resp,function (orgaDataList) {
        if(orgaDataList.status){
            RequestApi.Request(baseURL + '/rsapp/city/'+jsonData.cityid, 'GET', "", req, resp, function (city) {
                if(city.status){
                    orgaDataList.data.cityName = city.data.name;
                    orgaDataList.data.rangeDate = jsonData.startday.replace(/-/g, ".") + " - " + jsonData.endday.replace(/-/g, ".");
                    if (orgaDataList.data&&orgaDataList.data.content.length > 0) {
                        var count = 0;
                        orgaDataList.data.content.forEach(function (m, k) {
                            (function (m) {
                                var params={page:jsonData.page,size:jsonData.size,cityid:jsonData.cityid,organizationid:jsonData.organizationid};
                                if(jsonData.organizationid){
                                    params.monthday = ExceptionUtils.timeStamp2Time(m.monthday);
                                }else{
                                    params.startday = jsonData.startday;
                                    params.endday = jsonData.endday;
                                }

                                RequestApi.Request(baseURL + '/rsapp/statistic/classifying/class'+ "?"  + querystring.stringify(params), 'GET', "", req, resp, function (classifyData) {
                                    if(classifyData.status&&classifyData.data){
                                        m["classifyData"]=classifyData.data;
                                    }
                                    count++;
                                    if (count == orgaDataList.data.content.length) {
                                        resp.send(orgaDataList);
                                    }
                                })
                            })(m)
                        })
                    } else {
                        resp.send(orgaDataList);
                    }
                }else{
                    resp.send(orgaDataList);
                }
            });
        } else {
            resp.send(orgaDataList)
        }
    });
});
router.post('/rsapp/statistic/total', function (req, resp) {
    var jsonData = JSON.parse(req.body.data);
    var data = querystring.stringify(jsonData);
    RequestApi.Request(baseURL + '/rsapp/statistic/total' + "?" + data, 'GET', "", req, resp,function (totalData) {
        if(totalData.status){
            RequestApi.Request(baseURL + '/rsapp/city/'+jsonData.cityid, 'GET', "", req, resp, function (city) {
                if(city.status){
                    totalData.data.cityName = city.data.name;
                    resp.send(totalData);
                }else{
                    resp.send(totalData);
                }
            });
        }else {
            resp.send(totalData);
        }
    });
});
router.post('/rsapp/statistic/settlement', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/statistic/settlement' + "?" + data, 'GET', "", req, resp);
});

module.exports = router;