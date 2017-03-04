/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express()

router.post('/auth/login', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data))
    fetch(baseURL + '/auth/login.do',
        {
            method: req.method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data,
            timeout: 5000
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            resp.send(json)
        }).catch(function (ex) {
        resp.sendStatus(500)
    });
});

module.exports = router