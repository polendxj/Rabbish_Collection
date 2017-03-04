/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express()
router.post('/sed/list', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    var count = 0
    var result = {sed: {}, detection: {}}
    fetch(baseURL + '/sed/list.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            console.log(res)
            return res.json();
        })
        .then(function (json) {
            // resp.send(json)
            result.sed = json
            count++
            if (count == 2) {
                resp.send(result)
            }
        });
    fetch(baseURL + '/detection/list.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            // resp.send(json)
            result.detection = json
            count++
            if (count == 2) {
                resp.send(result)
            }
        });
});

router.post('/sed/save', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/sed/save.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

router.post('/sed/sedIdCheck', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/sed/sedIdCheck.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

router.post('/sed/detail', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/sed/detail.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

router.post('/sed/delete', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/sed/delete.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
            },
            body: data
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        });
});

module.exports = router