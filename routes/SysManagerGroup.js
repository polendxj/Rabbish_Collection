/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var router = express()
router.post('/group/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/group/list.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                // resp.send(json)
                var result = {}
                result['data'] = []
                result['other'] = json
                if (json.groupList && json.groupList.length > 0) {
                    json.groupList.forEach(function (group, key) {
                        (function (item) {
                            fetch(baseURL + '/group/detail.do',
                                {
                                    method: req.method,
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded",
                                        'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                                    },
                                    body: 'groupId=' + item.groupId
                                })
                                .then(function (res) {
                                    return res.json();
                                })
                                .then(function (detail) {
                                    var obj = {group: item, detail: detail}
                                    result.data.push(obj)
                                    if (result.data.length == json.groupList.length) {
                                        resp.send(result)
                                    }

                                });
                        })(group)
                    })
                } else {
                    resp.send(json)
                }


            });
    }, resp)

});

router.post('/group/save', function (req, resp) {
    // var data=querystring.stringify(JSON.parse(req.body))
    ExceptionUtils.uncaughtException(function () {
        var data = JSON.parse(JSON.stringify(req.body))
        var result = 'groupId=' + data.groupId + '&'
        data.areaIds.forEach(function (area, key) {
            result = result + 'areaIds[]=' + area + '&appIds[]=' + data.appIds[key] + '&'
        })
        result = result + 'description=' + data.description + '&mode=' + data.mode
        fetch(baseURL + '/group/save.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: result
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/group/groupIdCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/group/areaIdCheck.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/group/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/group/detail.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/group/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/group/delete.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/group/areaAndApp', function (req, resp) {
    var result = {}
    fetch(baseURL + '/admin/areaList.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            }
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            result['area'] = json
            if (result.area && result.app) {
                resp.send(result)
            }
        });

    fetch(baseURL + '/subApp/appIdList.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            }
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            result['app'] = json
            if (result.area && result.app) {
                resp.send(result)
            }
        });
});

module.exports = router