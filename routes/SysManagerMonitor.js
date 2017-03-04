/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var router = express()
var RequestApi = require('../utils/RequestApi')
router.get('/monitoring/serverStatus', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        fetch(baseURL + '/monitoring/serverStatus.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                timeout:5000
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, '')
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            }).catch(function (ex) {
            resp.sendStatus(500)
        });
    }, resp)

});

router.get('/monitoring/ccuStatus', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        fetch(baseURL + '/monitoring/ccuStatus.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                timeout:5000
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, '')
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            }).catch(function (ex) {
            resp.sendStatus(500)
        });
    }, resp)

});

router.get('/monitoring/activeUserOfSo', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        fetch(baseURL + '/monitoring/activeUserOfSo.do',
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
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

router.get('/monitoring/serverUseOfApp', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        fetch(baseURL + '/monitoring/serverUseOfApp.do',
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
                ExceptionUtils.notFalseException(json, resp)
            });
    }, resp)

});

// router.post('/monitoringResource/list', function (req, resp) {
//     ExceptionUtils.uncaughtException(function () {
//         var data = querystring.stringify(JSON.parse(req.body.data))
//         fetch(baseURL + '/monitoringResource/list.do',
//             {
//                 method: req.method,
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                     'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
//                 },
//                 body: data,
//                 timeout:5000
//             })
//             .then(function (res) {
//                 return ExceptionUtils.not200Exception(res, data)
//             })
//             .then(function (json) {
//                 ExceptionUtils.notFalseException(json, resp)
//             }).catch(function (ex) {
//             resp.sendStatus(500)
//         });
//     }, resp)
//
// });

router.post('/monitoringResource/list', function (req, resp) {
    // RequestApi.Request(consulURL + '/v1/catalog/nodes', 'GET', '', req, resp, function (json) {
    //     var nodeInfo = {registered: [], unRegistered: [], nTotCnt: 0};
    //     var allNodesInfo = [];
    //     var count = 0;
    //     json.forEach(function (node, key) {
    //         (function (n) {
    //             var obj = {node: n, checks: [], services: [],index:""};
    //             var flag = 0;
    //             if (n.Node.toLowerCase().indexOf('cse') >= 0) {
    //                 RequestApi.Request(consulURL + '/v1/health/node/' + n.Node, 'GET', '', req, resp, function (nodeService) {
    //                     obj.checks = nodeService;
    //                     flag++;
    //                     if (flag == 2) {
    //                         var data = "startRow=0&endRow=100000&searchColumn=&searchValue=&sortColumn=CSS_ID&orderType=ASC&searchColumn=SERVER_IP&searchColumn=SELECT&searchValue=" + obj.node.Address + "&searchValue=&searchValue="
    //                         RequestApi.Request(baseURL + '/css/list.do', 'POST', data, req, resp, function (socCSR) {
    //                             if (socCSR.nTotCnt == 0) {
    //                                 nodeInfo.unRegistered.push(obj);
    //                             }
    //                             allNodesInfo.push(obj)
    //                             count++;
    //                             if (json.length == count) {
    //                                 RequestApi.Request(baseURL + '/monitoringResource/list.do', 'POST', querystring.stringify(JSON.parse(req.body.data)), req, resp, function (socNode) {
    //                                     nodeInfo["nTotCnt"] = socNode.nTotCnt
    //                                     allNodesInfo.forEach(function (nOfAll, nKey) {
    //                                         var findFlag = false;
    //                                         socNode.serverList.forEach(function (csr, csrKey) {
    //                                             if (csr.serverIp == nOfAll.node.Address) {
    //                                                 findFlag = true;
    //                                                 nOfAll.node["registeredName"] = csr.cssId;
    //                                                 csr.consul = nOfAll;
    //                                                 var pandoraInfo=""
    //                                                 var consulInfo=""
    //                                                 var cpuRate=""
    //                                                 var memRate=""
    //                                                 var diskRate=""
    //                                                 var netRate=""
    //                                                 nOfAll.checks.forEach(function (check, ckKey) {
    //                                                     if (check.Name == "Service 'pandora' check") {
    //                                                         pandoraInfo = check
    //                                                     } else if (check.Name == "Serf Health Status") {
    //                                                         consulInfo = check;
    //                                                     } else if (check.Name == "cpu") {
    //                                                         cpuRate = check;
    //                                                     } else if (check.Name == "mem") {
    //                                                         memRate = check;
    //                                                     } else if (check.Name == "disk") {
    //                                                         diskRate = check;
    //                                                     } else if (check.Name == "network") {
    //                                                         netRate = check;
    //                                                     }
    //                                                 });
    //                                                 var cpuNum = JSON.parse(JSON.stringify(cpuRate.Output));
    //                                                 var memNum = JSON.parse(JSON.stringify(memRate.Output));
    //                                                 var memResult = ((parseFloat((JSON.parse(memNum).used + "").indexOf(".") == 0 ? JSON.parse(memNum).used : ("0" + JSON.parse(memNum).used)) / parseFloat(JSON.parse(memNum).total)).toFixed(2)) * 100;
    //
    //                                                 var diskNum = JSON.parse(JSON.stringify(diskRate.Output));
    //                                                 // var networkNum = JSON.parse(JSON.stringify(diskRate.Output));
    //                                                 var diskStatus = ((parseFloat((JSON.parse(diskNum).used + "").indexOf(".") == 0 ? JSON.parse(diskNum).used : ("0" + JSON.parse(diskNum).used)) / parseFloat(JSON.parse(diskNum).total)).toFixed(2)) * 100;
    //                                                 var netStatus = 0
    //
    //                                                 csr.cpuRate=(JSON.parse(cpuNum).used + "").indexOf(".") == 0 ? parseFloat("0" + JSON.parse(cpuNum).used).toFixed(2) : JSON.parse(cpuNum).used;
    //                                                 csr.memRate=memResult;
    //                                                 csr.diskRate=diskStatus;
    //                                                 csr.netRate=netStatus;
    //                                                 nodeInfo.registered.push(csr);
    //                                             }
    //                                         })
    //                                         if (!findFlag) {
    //                                             nodeInfo.unRegistered.push(nOfAll)
    //                                         }
    //
    //                                     })
    //                                     nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
    //                                     nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
    //                                     resp.send(nodeInfo)
    //                                 });
    //                             }
    //                         })
    //                     }
    //
    //                 })
    //                 RequestApi.Request(consulURL + '/v1/catalog/node/' + n.Node, 'GET', '', req, resp, function (services) {
    //                     obj.services = services;
    //                     flag++;
    //                     if (flag == 2) {
    //                         var data = "startRow=0&endRow=100000&searchColumn=&searchValue=&sortColumn=CSS_ID&orderType=ASC&searchColumn=SERVER_IP&searchColumn=SELECT&searchValue=" + obj.node.Address + "&searchValue=&searchValue="
    //                         RequestApi.Request(baseURL + '/css/list.do', 'POST', data, req, resp, function (socCSR) {
    //                             if (socCSR.nTotCnt == 0) {
    //                                 nodeInfo.unRegistered.push(obj);
    //                             }
    //                             allNodesInfo.push(obj)
    //                             count++;
    //                             if (json.length == count) {
    //                                 RequestApi.Request(baseURL + '/monitoringResource/list.do', 'POST', querystring.stringify(JSON.parse(req.body.data)), req, resp, function (socNode) {
    //                                     nodeInfo["nTotCnt"] = socNode.nTotCnt
    //                                     allNodesInfo.forEach(function (nOfAll, nKey) {
    //                                         var findFlag = false;
    //                                         socNode.serverList.forEach(function (csr, csrKey) {
    //                                             if (csr.serverIp == nOfAll.node.Address) {
    //                                                 findFlag = true;
    //                                                 nOfAll.node["registeredName"] = csr.cssId;
    //                                                 csr.consul = nOfAll;
    //                                                 var pandoraInfo=""
    //                                                 var consulInfo=""
    //                                                 var cpuRate=""
    //                                                 var memRate=""
    //                                                 var diskRate=""
    //                                                 var netRate=""
    //                                                 nOfAll.checks.forEach(function (check, ckKey) {
    //                                                     if (check.Name == "Service 'pandora' check") {
    //                                                         pandoraInfo = check
    //                                                     } else if (check.Name == "Serf Health Status") {
    //                                                         consulInfo = check;
    //                                                     } else if (check.Name == "cpu") {
    //                                                         cpuRate = check;
    //                                                     } else if (check.Name == "mem") {
    //                                                         memRate = check;
    //                                                     } else if (check.Name == "disk") {
    //                                                         diskRate = check;
    //                                                     } else if (check.Name == "network") {
    //                                                         netRate = check;
    //                                                     }
    //                                                 });
    //                                                 var cpuNum = JSON.parse(JSON.stringify(cpuRate.Output));
    //                                                 var memNum = JSON.parse(JSON.stringify(memRate.Output));
    //                                                 var memResult = ((parseFloat((JSON.parse(memNum).used + "").indexOf(".") == 0 ? JSON.parse(memNum).used : ("0" + JSON.parse(memNum).used)) / parseFloat(JSON.parse(memNum).total)).toFixed(2)) * 100;
    //
    //                                                 var diskNum = JSON.parse(JSON.stringify(diskRate.Output));
    //                                                 // var networkNum = JSON.parse(JSON.stringify(diskRate.Output));
    //                                                 var diskStatus = ((parseFloat((JSON.parse(diskNum).used + "").indexOf(".") == 0 ? JSON.parse(diskNum).used : ("0" + JSON.parse(diskNum).used)) / parseFloat(JSON.parse(diskNum).total)).toFixed(2)) * 100;
    //                                                 var netStatus = 0
    //
    //                                                 csr.cpuRate=(JSON.parse(cpuNum).used + "").indexOf(".") == 0 ? parseFloat("0" + JSON.parse(cpuNum).used).toFixed(2) : JSON.parse(cpuNum).used;
    //                                                 csr.memRate=memResult;
    //                                                 csr.diskRate=diskStatus;
    //                                                 csr.netRate=netStatus;
    //                                                 nodeInfo.registered.push(csr);
    //                                             }
    //                                         })
    //                                         if (!findFlag) {
    //                                             nodeInfo.unRegistered.push(nOfAll)
    //                                         }
    //
    //                                     })
    //                                     nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
    //                                     nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
    //                                     resp.send(nodeInfo)
    //                                 });
    //
    //                             }
    //                         })
    //                     }
    //
    //                 })
    //             } else {
    //                 count++;
    //                 if (json.length == count) {
    //                     resp.send(nodeInfo)
    //                 }
    //             }
    //
    //         })(node)
    //     });
    // })
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
                        css["consul"] = consulNode
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
                                    obj.node["registeredName"] = t.cssId;
                                    // obj["consul"] = t;
                                    var pandoraInfo=""
                                    var consulInfo = ""
                                    var cpuRate = ""
                                    var memRate = ""
                                    var diskRate = ""
                                    var netRate = ""
                                    obj.checks.forEach(function (check, ckKey) {
                                        if (check.Name == "Service 'pandora' check") {
                                            pandoraInfo = check
                                        } else if (check.Name == "Serf Health Status") {
                                            consulInfo = check;
                                        } else if (check.Name == "cpu") {
                                            cpuRate = check;
                                        } else if (check.Name == "mem") {
                                            memRate = check;
                                        } else if (check.Name == "disk") {
                                            diskRate = check;
                                        } else if (check.Name == "network") {
                                            netRate = check;
                                        }
                                    });
                                    var cpuNum = JSON.parse(JSON.stringify(cpuRate.Output));
                                    var memNum = JSON.parse(JSON.stringify(memRate.Output));
                                    var memResult = ((parseFloat((JSON.parse(memNum).used + "").indexOf(".") == 0 ? JSON.parse(memNum).used : ("0" + JSON.parse(memNum).used)) / parseFloat(JSON.parse(memNum).total)).toFixed(2)) * 100;

                                    var diskNum = JSON.parse(JSON.stringify(diskRate.Output));
                                    var networkNum = JSON.parse(JSON.stringify(netRate.Output));
                                    var diskStatus = ((parseFloat((JSON.parse(diskNum).used + "").indexOf(".") == 0 ? JSON.parse(diskNum).used : ("0" + JSON.parse(diskNum).used)) / parseFloat(JSON.parse(diskNum).total)).toFixed(2)) * 100;
                                    var netStatus = ((parseFloat((JSON.parse(networkNum).used + "").indexOf(".") == 0 ? JSON.parse(networkNum).used : ("0" + JSON.parse(networkNum).used))).toFixed(2));


                                    obj.node.cpuRate = (JSON.parse(cpuNum).used + "").indexOf(".") == 0 ? parseFloat("0" + JSON.parse(cpuNum).used).toFixed(2) : JSON.parse(cpuNum).used;
                                    obj.node.memRate = memResult;
                                    obj.node.diskRate = diskStatus;
                                    obj.node.netRate = netStatus;
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