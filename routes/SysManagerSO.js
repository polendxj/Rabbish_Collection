/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express()
router.post('/area/list', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/area/list.do',
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
            resp.send(json)
        });
});

router.post('/area/save', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/area/save.do',
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
            resp.send(json)
        });
});

router.post('/area/areaIdCheck', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/area/areaIdCheck.do',
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
            resp.send(json)
        });
});

router.post('/area/detail', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/area/detail.do',
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

router.post('/area/delete', function (req, resp) {
    var data=querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL+'/area/delete.do',
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