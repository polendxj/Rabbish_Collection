/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/csr/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/list.do',
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

router.post('/csr/updateCsrStatus', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/updateCsrStatus.do',
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

router.post('/csr/csrIdCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/csrIdCheck.do',
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

router.post('/csr/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/save.do',
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

router.post('/csr/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/delete.do',
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

router.post('/csr/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/detail.do',
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

router.post('/csr/discoveryCSR', function (req, resp) {
    RequestApi.Request(consulURL + '/v1/catalog/nodes', 'GET', '', req, resp, function (json) {
        var nodeInfo = {registered: [], unRegistered: [], nTotCnt: 0};
        var allNodesInfo = [];
        var count = 0;
        json.forEach(function (node, key) {
            (function (n) {
                var obj = {node: n, checks: [], services: []};
                var flag = 0;
                if (n.Node.toLowerCase().indexOf('csr') >= 0) {
                    RequestApi.Request(consulURL + '/v1/health/node/' + n.Node, 'GET', '', req, resp, function (nodeService) {
                        obj.checks = nodeService;
                        flag++;
                        if (flag == 2) {
                            var data = "startRow=0&endRow=100000&searchColumn=&searchValue=&sortColumn=RSS_ID&orderType=ASC&searchColumn=SERVER_IP&searchColumn=SELECT&searchValue=" + obj.node.Address + "&searchValue=&searchValue="
                            RequestApi.Request(baseURL + '/csr/list.do', 'POST', data, req, resp, function (socCSR) {
                                if (socCSR.nTotCnt == 0) {
                                    nodeInfo.unRegistered.push(obj);
                                }
                                allNodesInfo.push(obj)
                                count++;
                                if (json.length == count) {
                                    RequestApi.Request(baseURL + '/csr/list.do', 'POST', querystring.stringify(JSON.parse(req.body.data)), req, resp, function (socNode) {
                                        nodeInfo["nTotCnt"] = socNode.nTotCnt
                                        socNode.csrList.forEach(function (csr, csrKey) {
                                            var findFlag = false;
                                            allNodesInfo.forEach(function (nOfAll, nKey) {
                                                if (csr.serverIp == nOfAll.node.Address) {
                                                    findFlag = true;
                                                    nOfAll.node["registeredName"] = csr.rssId;
                                                    nodeInfo.registered.push(nOfAll);
                                                }
                                            })
                                            if (!findFlag) {
                                                nodeInfo.registered.push({
                                                    "node": {
                                                        "Node": "csr_" + csr.serverIp,
                                                        "Address": csr.serverIp,
                                                        "TaggedAddresses": {
                                                            "lan": csr.serverIp,
                                                            "wan": csr.serverIp
                                                        },
                                                        "CreateIndex": 138590,
                                                        "ModifyIndex": 139809,
                                                        "resigteredName": csr.rssId
                                                    },
                                                    "checks": [
                                                        {
                                                            "Node": "csr_" + csr.serverIp,
                                                            "CheckID": "serfHealth",
                                                            "Name": "Serf Health Status",
                                                            "Status": "unknown",
                                                            "Notes": "",
                                                            "Output": "Agent alive and reachable",
                                                            "ServiceID": "",
                                                            "ServiceName": "",
                                                            "CreateIndex": 138590,
                                                            "ModifyIndex": 138825
                                                        },
                                                        {
                                                            "Node": "csr_172.20.225.206",
                                                            "CheckID": "service:service_accessweb_172.20.225.206",
                                                            "Name": "Service 'accessweb' check",
                                                            "Status": "unknown",
                                                            "Notes": "",
                                                            "Output": "PORT 80 OK: localhost/80 is responding",
                                                            "ServiceID": "service_accessweb_" + csr.serverIp,
                                                            "ServiceName": "accessweb",
                                                            "CreateIndex": 138593,
                                                            "ModifyIndex": 138856
                                                        },
                                                        {
                                                            "Node": "csr_172.20.225.206",
                                                            "CheckID": "service:service_gateway_172.20.225.206",
                                                            "Name": "Service 'gateway' check",
                                                            "Status": "unknown",
                                                            "Notes": "",
                                                            "Output": "PORT 8080 OK: localhost/8080 is responding",
                                                            "ServiceID": "service_gateway_" + csr.serverIp,
                                                            "ServiceName": "gateway",
                                                            "CreateIndex": 138594,
                                                            "ModifyIndex": 138857
                                                        },
                                                        {
                                                            "Node": "csr_" + csr.serverIp,
                                                            "CheckID": "service:service_sr_172.20.225.206",
                                                            "Name": "Service 'sr' check",
                                                            "Status": "unknown",
                                                            "Notes": "",
                                                            "Output": "PORT 8180 OK: localhost/8180 is responding",
                                                            "ServiceID": "service_sr_" + csr.serverIp,
                                                            "ServiceName": "sr",
                                                            "CreateIndex": 138591,
                                                            "ModifyIndex": 138858
                                                        }
                                                    ],
                                                    "services": {
                                                        "Node": {
                                                            "Node": "csr_172.20.225.206",
                                                            "Address": "172.20.225.206",
                                                            "TaggedAddresses": {
                                                                "lan": "172.20.225.206",
                                                                "wan": "172.20.225.206"
                                                            },
                                                            "CreateIndex": 138590,
                                                            "ModifyIndex": 139809
                                                        },
                                                        "Services": {
                                                            "consul": {
                                                                "ID": "consul",
                                                                "Service": "consul",
                                                                "Tags": [],
                                                                "Address": "",
                                                                "Port": "- -",
                                                                "EnableTagOverride": false,
                                                                "CreateIndex": 138590,
                                                                "ModifyIndex": 138827
                                                            },
                                                            "service_accessweb_172.20.225.206": {
                                                                "ID": "service_accessweb_172.20.225.206",
                                                                "Service": "accessweb",
                                                                "Tags": [
                                                                    "172.20.225.206"
                                                                ],
                                                                "Address": "",
                                                                "Port": "- -",
                                                                "EnableTagOverride": false,
                                                                "CreateIndex": 138593,
                                                                "ModifyIndex": 138856
                                                            },
                                                            "service_gateway_172.20.225.206": {
                                                                "ID": "service_gateway_172.20.225.206",
                                                                "Service": "gateway",
                                                                "Tags": [
                                                                    "172.20.225.206"
                                                                ],
                                                                "Address": "",
                                                                "Port": "- - ",
                                                                "EnableTagOverride": false,
                                                                "CreateIndex": 138594,
                                                                "ModifyIndex": 138857
                                                            },
                                                            "service_sr_172.20.225.206": {
                                                                "ID": "service_sr_172.20.225.206",
                                                                "Service": "sr",
                                                                "Tags": [
                                                                    "172.20.225.206"
                                                                ],
                                                                "Address": "",
                                                                "Port": "- -",
                                                                "EnableTagOverride": false,
                                                                "CreateIndex": 138591,
                                                                "ModifyIndex": 138858
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                        resp.send(nodeInfo)
                                    });
                                }
                            })
                        }

                    })
                    RequestApi.Request(consulURL + '/v1/catalog/node/' + n.Node, 'GET', '', req, resp, function (services) {
                        obj.services = services;
                        flag++;
                        if (flag == 2) {
                            var data = "startRow=0&endRow=100000&searchColumn=&searchValue=&sortColumn=RSS_ID&orderType=ASC&searchColumn=SERVER_IP&searchColumn=SELECT&searchValue=" + obj.node.Address + "&searchValue=&searchValue="
                            RequestApi.Request(baseURL + '/csr/list.do', 'POST', data, req, resp, function (socCSR) {
                                if (socCSR.nTotCnt == 0) {
                                    nodeInfo.unRegistered.push(obj);
                                }
                                allNodesInfo.push(obj)
                                count++;
                                if (json.length == count) {
                                    RequestApi.Request(baseURL + '/csr/list.do', 'POST', querystring.stringify(JSON.parse(req.body.data)), req, resp, function (socNode) {
                                        nodeInfo["nTotCnt"] = socNode.nTotCnt
                                        socNode.csrList.forEach(function (csr, csrKey) {
                                            var findFlag = false;
                                            allNodesInfo.forEach(function (nOfAll, nKey) {
                                                if (csr.serverIp == nOfAll.node.Address) {
                                                    findFlag = true;
                                                    nOfAll.node["registeredName"] = csr.rssId;
                                                    nodeInfo.registered.push(nOfAll);
                                                }
                                            })
                                            if (!findFlag) {
                                                nodeInfo.registered.push({
                                                    "node": {
                                                        "Node": "csr_" + csr.serverIp,
                                                        "Address": csr.serverIp,
                                                        "TaggedAddresses": {
                                                            "lan": csr.serverIp,
                                                            "wan": csr.serverIp
                                                        },
                                                        "CreateIndex": 138590,
                                                        "ModifyIndex": 139809,
                                                        "resigteredName": csr.rssId
                                                    },
                                                    "checks": [
                                                        {
                                                            "Node": "csr_" + csr.serverIp,
                                                            "CheckID": "serfHealth",
                                                            "Name": "Serf Health Status",
                                                            "Status": "unknown",
                                                            "Notes": "",
                                                            "Output": "Agent alive and reachable",
                                                            "ServiceID": "",
                                                            "ServiceName": "",
                                                            "CreateIndex": 138590,
                                                            "ModifyIndex": 138825
                                                        },
                                                        {
                                                            "Node": "csr_172.20.225.206",
                                                            "CheckID": "service:service_accessweb_172.20.225.206",
                                                            "Name": "Service 'accessweb' check",
                                                            "Status": "unknown",
                                                            "Notes": "",
                                                            "Output": "PORT 80 OK: localhost/80 is responding",
                                                            "ServiceID": "service_accessweb_" + csr.serverIp,
                                                            "ServiceName": "accessweb",
                                                            "CreateIndex": 138593,
                                                            "ModifyIndex": 138856
                                                        },
                                                        {
                                                            "Node": "csr_172.20.225.206",
                                                            "CheckID": "service:service_gateway_172.20.225.206",
                                                            "Name": "Service 'gateway' check",
                                                            "Status": "unknown",
                                                            "Notes": "",
                                                            "Output": "PORT 8080 OK: localhost/8080 is responding",
                                                            "ServiceID": "service_gateway_" + csr.serverIp,
                                                            "ServiceName": "gateway",
                                                            "CreateIndex": 138594,
                                                            "ModifyIndex": 138857
                                                        },
                                                        {
                                                            "Node": "csr_" + csr.serverIp,
                                                            "CheckID": "service:service_sr_172.20.225.206",
                                                            "Name": "Service 'sr' check",
                                                            "Status": "unknown",
                                                            "Notes": "",
                                                            "Output": "PORT 8180 OK: localhost/8180 is responding",
                                                            "ServiceID": "service_sr_" + csr.serverIp,
                                                            "ServiceName": "sr",
                                                            "CreateIndex": 138591,
                                                            "ModifyIndex": 138858
                                                        }
                                                    ],
                                                    "services": {
                                                        "Node": {
                                                            "Node": "csr_172.20.225.206",
                                                            "Address": "172.20.225.206",
                                                            "TaggedAddresses": {
                                                                "lan": "172.20.225.206",
                                                                "wan": "172.20.225.206"
                                                            },
                                                            "CreateIndex": 138590,
                                                            "ModifyIndex": 139809
                                                        },
                                                        "Services": {
                                                            "consul": {
                                                                "ID": "consul",
                                                                "Service": "consul",
                                                                "Tags": [],
                                                                "Address": "",
                                                                "Port": "- -",
                                                                "EnableTagOverride": false,
                                                                "CreateIndex": 138590,
                                                                "ModifyIndex": 138827
                                                            },
                                                            "service_accessweb_172.20.225.206": {
                                                                "ID": "service_accessweb_172.20.225.206",
                                                                "Service": "accessweb",
                                                                "Tags": [
                                                                    "172.20.225.206"
                                                                ],
                                                                "Address": "",
                                                                "Port": "- -",
                                                                "EnableTagOverride": false,
                                                                "CreateIndex": 138593,
                                                                "ModifyIndex": 138856
                                                            },
                                                            "service_gateway_172.20.225.206": {
                                                                "ID": "service_gateway_172.20.225.206",
                                                                "Service": "gateway",
                                                                "Tags": [
                                                                    "172.20.225.206"
                                                                ],
                                                                "Address": "",
                                                                "Port": "- - ",
                                                                "EnableTagOverride": false,
                                                                "CreateIndex": 138594,
                                                                "ModifyIndex": 138857
                                                            },
                                                            "service_sr_172.20.225.206": {
                                                                "ID": "service_sr_172.20.225.206",
                                                                "Service": "sr",
                                                                "Tags": [
                                                                    "172.20.225.206"
                                                                ],
                                                                "Address": "",
                                                                "Port": "- -",
                                                                "EnableTagOverride": false,
                                                                "CreateIndex": 138591,
                                                                "ModifyIndex": 138858
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                        resp.send(nodeInfo)
                                    });

                                }
                            })
                        }

                    })
                } else {
                    count++;
                    if (json.length == count) {
                        resp.send(nodeInfo)
                    }
                }

            })(node)
        });
    })
});

router.post('/csr/saveByConsul', function (req, resp) {
    var data = JSON.parse(req.body.data);
    var gwInfo = "areaId=0&useYN=Y&gwId=" + data.name + "_GW&serverIp=" + data.ip + "&serverPort=" + data.gwPort + "&config=&mode=new";
    var srInfo = "areaId=0&rssId=" + data.name + "&serverIp=" + data.ip + "&serverPort=" + data.srPort + "&useYN=Y&mode=new";
    var result = {srStatus: false, gwStatus: false, socSRStatus: "", socGWStatus: ""};
    RequestApi.Request(baseURL + '/csr/save.do', 'POST', srInfo, req, resp, function (jsonSR) {
        if (jsonSR.result == "SUCCESS") {
            result.srStatus = true;
            RequestApi.Request(baseURL + '/gateway/save.do', 'POST', gwInfo, req, resp, function (jsonGW) {
                if (jsonGW.result == "SUCCESS") {
                    result.gwStatus = true;
                } else {
                    result.socGWStatus = jsonGW;
                }
                resp.send(result);
            })
        } else {
            result.socSRStatus = jsonSR;
            resp.send(result)
        }
    })
});

/*csm manager*/
router.get('/csm/discoveryCSM', function (req, resp) {
    RequestApi.Request(consulURL + '/v1/catalog/nodes', 'GET', '', req, resp, function (json) {
        var nodeInfo = {registered: [], unRegistered: [], nTotCnt: 0};
        var allNodesInfo = [];
        var count = 0;
        json.forEach(function (node, key) {
            (function (n) {
                var obj = {node: n, checks: [], services: []};
                var flag = 0;
                if (n.Node.toLowerCase().indexOf('csm') >= 0) {
                    RequestApi.Request(consulURL + '/v1/health/node/' + n.Node, 'GET', '', req, resp, function (nodeService) {
                        obj.checks = nodeService;
                        flag++;
                        if (flag == 2) {
                            count++;
                            nodeInfo.registered.push(obj)
                            if (json.length == count) {
                                resp.send(nodeInfo)
                            }
                        }

                    });
                    RequestApi.Request(consulURL + '/v1/catalog/node/' + n.Node, 'GET', '', req, resp, function (services) {
                        obj.services = services;
                        flag++;
                        if (flag == 2) {
                            count++;
                            nodeInfo.registered.push(obj)
                            if (json.length == count) {
                                resp.send(nodeInfo)
                            }
                        }

                    })
                } else {
                    count++;
                    if (json.length == count) {
                        resp.send(nodeInfo)
                    }
                }

            })(node)
        });
    })
});

router.post('/cse/discoveryCSE', function (req, resp) {
    var data = "startRow=0&endRow=100000&searchColumn=&searchValue=&sortColumn=CSS_ID&orderType=ASC&searchColumn=SERVER_IP&searchColumn=SELECT&searchValue=&searchValue=&searchValue="
    RequestApi.Request(baseURL + '/css/list.do', 'POST', data, req, resp, function (socCSR) {
        RequestApi.Request(consulURL + '/v1/catalog/nodes', 'GET', '', req, resp, function (json) {
            var nodeInfo = {registered: [], unRegistered: [], nTotCnt: 0};
            var allNodesInfo = [];  //所有CSE的consul节点
            var tempSOCNode = [];     //从CSE的consul节点中获取已注册的
            var tempConsulNode = [];
            json.forEach(function (n, key) {
                if (n.Node.toLowerCase().indexOf('cse') >= 0) {
                    allNodesInfo.push(n)
                }
            })

            allNodesInfo.forEach(function (consulNode) {
                var registeredNode = false
                socCSR.cssList.forEach(function (css) {
                    if (css.serverIp == consulNode.Address && !registeredNode) {
                        registeredNode = true
                        css["hostName"] = consulNode.Node
                        tempSOCNode.push(css)
                    }
                })
                if (!registeredNode) {
                    tempConsulNode.push(consulNode)
                }
            })
            RequestApi.Request(baseURL + '/css/list.do', 'POST', querystring.stringify(JSON.parse(req.body.data)), req, resp, function (socNode) {
                var realCount = socNode.cssList.length
                socNode.cssList.forEach(function (val) {
                    var flag = false
                    tempSOCNode.forEach(function (tSOC) {
                        if (tSOC.serverIp == val.serverIp) {
                            flag = true
                        }
                    })
                    if (!flag) {
                        realCount--
                    }
                })
                nodeInfo.nTotCnt=realCount
                tempConsulNode.forEach(function (temp, key) {
                    (function (t) {
                        var flag = 0;
                        var obj = {node: t, checks: [], services: [], index: key};
                        RequestApi.Request(consulURL + '/v1/health/node/' + t.Node, 'GET', '', req, resp, function (nodeService) {
                            obj.checks = nodeService
                            flag++
                            if (flag == 2) {
                                nodeInfo.unRegistered.push(obj)
                                if (realCount == nodeInfo.registered.length && nodeInfo.unRegistered.length == tempConsulNode.length) {
                                    nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
                                    nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
                                    resp.send(nodeInfo)
                                }
                            }
                        })
                        RequestApi.Request(consulURL + '/v1/catalog/node/' + t.Node, 'GET', '', req, resp, function (services) {
                            obj.services = services
                            flag++
                            if (flag == 2) {
                                nodeInfo.unRegistered.push(obj)
                                if (realCount == nodeInfo.registered.length && nodeInfo.unRegistered.length == tempConsulNode.length) {
                                    nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
                                    nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
                                    resp.send(nodeInfo)
                                }
                            }
                        })
                    })(temp)
                })

                socNode.cssList.forEach(function (temp, key) {
                    tempSOCNode.forEach(function (tSOC) {
                        if (tSOC.serverIp == temp.serverIp) {
                            (function (t) {
                                var flag = 0;
                                var obj = {node: t, checks: [], services: [], index: key};
                                RequestApi.Request(consulURL + '/v1/health/node/' + t.hostName, 'GET', '', req, resp, function (nodeService) {
                                    obj.checks = nodeService
                                    flag++
                                    if (flag == 2) {
                                        nodeInfo.registered.push(obj)
                                        if (realCount == nodeInfo.registered.length && nodeInfo.unRegistered.length == tempConsulNode.length) {
                                            nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
                                            nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
                                            resp.send(nodeInfo)
                                        }
                                    }
                                })
                                RequestApi.Request(consulURL + '/v1/catalog/node/' + t.hostName, 'GET', '', req, resp, function (services) {
                                    obj.services = services
                                    flag++
                                    if (flag == 2) {
                                        nodeInfo.registered.push(obj)
                                        if (realCount == nodeInfo.registered.length && nodeInfo.unRegistered.length == tempConsulNode.length) {
                                            nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
                                            nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
                                            resp.send(nodeInfo)
                                        }
                                    }
                                })
                            })(tSOC)
                        } else {

                        }
                    })

                })

            })


        })
    })
});

module.exports = router

// RequestApi.Request(consulURL + '/v1/health/node/' + n.Node, 'GET', '', req, resp, function (nodeService) {
//     obj.checks = nodeService;
//     flag++;
//     if (flag == 2) {
//         var data = "startRow=0&endRow=100000&searchColumn=&searchValue=&sortColumn=CSS_ID&orderType=ASC&searchColumn=SERVER_IP&searchColumn=SELECT&searchValue=&searchValue=&searchValue="
//         RequestApi.Request(baseURL + '/css/list.do', 'POST', data, req, resp, function (socCSR) {
//             if (socCSR.nTotCnt == 0) {
//                 nodeInfo.unRegistered.push(obj);
//             }
//             allNodesInfo.push(obj)
//             count++;
//             if (json.length == count) {
//                 RequestApi.Request(baseURL + '/css/list.do', 'POST', querystring.stringify(JSON.parse(req.body.data)), req, resp, function (socNode) {
//                     nodeInfo["nTotCnt"] = socNode.nTotCnt
//                     allNodesInfo.forEach(function (nOfAll, nKey) {
//                         var findFlag = false;
//                         socNode.cssList.forEach(function (csr, csrKey) {
//                             if (csr.serverIp == nOfAll.node.Address) {
//                                 findFlag = true;
//                                 nOfAll.node["registeredName"] = csr.cssId;
//                                 csr.consul = nOfAll;
//                                 nodeInfo.registered.push(csr);
//                             }
//                         })
//                         if (!findFlag) {
//                             nodeInfo.unRegistered.push(nOfAll)
//                         }
//
//                     })
//
//                     resp.send(nodeInfo)
//                 });
//             }
//         })
//     }
//
// })
// RequestApi.Request(consulURL + '/v1/catalog/node/' + n.Node, 'GET', '', req, resp, function (services) {
//     obj.services = services;
//     flag++;
//     if (flag == 2) {
//         var data = "startRow=0&endRow=100000&searchColumn=&searchValue=&sortColumn=CSS_ID&orderType=ASC&searchColumn=SERVER_IP&searchColumn=SELECT&searchValue=" + obj.node.Address + "&searchValue=&searchValue="
//         RequestApi.Request(baseURL + '/css/list.do', 'POST', data, req, resp, function (socCSR) {
//             if (socCSR.nTotCnt == 0) {
//                 nodeInfo.unRegistered.push(obj);
//             }
//             allNodesInfo.push(obj)
//             count++;
//             if (json.length == count) {
//                 RequestApi.Request(baseURL + '/css/list.do', 'POST', querystring.stringify(JSON.parse(req.body.data)), req, resp, function (socNode) {
//                     nodeInfo["nTotCnt"] = socNode.nTotCnt
//                     allNodesInfo.forEach(function (nOfAll, nKey) {
//                         var findFlag = false;
//                         socNode.cssList.forEach(function (csr, csrKey) {
//                             if (csr.serverIp == nOfAll.node.Address) {
//                                 findFlag = true;
//                                 nOfAll.node["registeredName"] = csr.cssId;
//                                 csr.consul = nOfAll;
//                                 nodeInfo.registered.push(csr);
//                             }
//                         })
//                         if (!findFlag) {
//                             nodeInfo.unRegistered.push(nOfAll)
//                         }
//
//                     })
//
//
//                     resp.send(nodeInfo)
//                 });
//
//             }
//         })
//     }
//
// })