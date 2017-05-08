/**
 * Created by Captain on 2017/3/6.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/rsapp/store', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/store/account' + "?" + data, 'GET', "", req, resp, function (stores) {
        if (stores.status) {
            if (stores.data.content.length > 0) {
                var count = 0;
                stores.data.content.forEach(function (m, k) {
                    (function (m) {
                        if(m.cityid&&m.countyid){
                            RequestApi.Request(baseURL + '/rsapp/city/' + m.cityid, 'GET', "", req, resp, function (city) {
                                m["city"]=city.data.name;
                                RequestApi.Request(baseURL + '/rsapp/county/' + m.countyid, 'GET', "", req, resp, function (county) {
                                    m["county"]=county.data.name;
                                    count++;
                                    if (count == stores.data.content.length) {
                                        resp.send(stores);
                                    }
                                });
                            })
                        }else{
                            count++;
                            if (count == stores.data.content.length) {
                                resp.send(stores);
                            }
                        }
                    })(m)
                })
            } else {
                resp.send(stores);
            }
        } else {
            resp.send(stores)
        }
    });
});
router.post('/rsapp/store/approved', function (req, resp) {
    var data = JSON.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/rsapp/store/approved', 'PUT',data, req, resp);
});
router.post('/rsapp/storeSettlement/rate', function (req, resp) {
    RequestApi.Request(baseURL + '/rsapp/storeSettlement/rate', 'GET', "", req, resp);
});

module.exports = router;