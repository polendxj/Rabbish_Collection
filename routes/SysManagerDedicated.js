/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var router = express()
var RequestApi = require('../utils/RequestApi')
router.post('/dedicated/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/list.do',
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

router.post('/routingRule/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/routingRule/list.do',
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

router.post('/routingRule/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/routingRule/save.do',
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

router.post('/dedicated/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/save.do',
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

router.post('/dedicated/dedicatedIdCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/dedicatedIdCheck.do',
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

router.post('/dedicated/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/detail.do',
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

router.post('/dedicated/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/delete.do',
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

router.post('/routingRule/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/routingRule/delete.do',
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

router.post('/routingRule/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/routingRule/detail.do',
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

router.post('/dedicated/subinfo', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var result = {}
        var count = 0
        fetch(baseURL + '/admin/areaList.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                }
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, '')
            })
            .then(function (json) {
                result['area'] = json
                count++
                if (count == 2) {
                    resp.send(result)
                }
            });

        fetch(baseURL + '/dedicated/subInfo.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                }
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, '')
            })
            .then(function (json) {
                result['subinfo'] = json
                count++
                if (count == 2) {
                    resp.send(result)
                }
            });
    }, resp)

});

/*white list*/
router.post('/whiteList/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = JSON.parse(req.body.data);
        var result = querystring.stringify(JSON.parse(req.body.data)) + '&';
        // if(data.searchColumn.length>0){
        //     data.searchColumn.forEach(function (val, key) {
        //         result = result + 'searchColumn=' + val + '&'
        //     })
        //     data.searchValue.forEach(function (val, key) {
        //         result = result + 'searchValue=' + val + '&'
        //     })
        // }else{
        //     result = result + 'searchColumn=ALL&searchValue='
        // }
        fetch(baseURL + '/whiteList/list.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: result
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, result)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.post('/whiteList/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/whiteList/save.do',
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

router.post('/whiteList/whiteListDupCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/whiteList/whiteListDupCheck.do',
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

router.post('/whiteList/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/whiteList/delete.do',
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

router.post('/routingBlock/list', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/routingBlock/list.do', 'POST', data, req, resp)
});

router.post('/routingBlock/delete', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/routingBlock/delete.do', 'POST', data, req, resp)
});

router.post('/routingBlock/save', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/routingBlock/save.do', 'POST', data, req, resp)
});

router.post('/routingBlock/detail', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/routingBlock/detail.do', 'POST', data, req, resp)
});


module.exports = router