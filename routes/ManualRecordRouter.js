/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/manualRecord', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/manualRecord' + "?" + data, 'GET', "", req, resp, function (manualRecord) {
        if (manualRecord.status) {
            if (manualRecord.data.content.length > 0) {
                var count = 0;
                manualRecord.data.content.forEach(function (m, k) {
                    (function (m) {
                        console.log("m",m.classid);
                        RequestApi.Request(baseURL + '/rsapp/classConf/' + m.classid, 'GET', "", req, resp, function (classConf) {
                            m["classConf"]=classConf.data;
                            count++;
                            if (count == manualRecord.data.content.length) {
                                console.log("mm",count == manualRecord.data.content.length);
                                resp.send(manualRecord);
                            }
                        })
                    })(m)
                })
            } else {
                resp.send(manualRecord);
            }
        } else {
            resp.send(manualRecord)
        }
    })
});

module.exports = router;