/**
 * Created by Administrator on 2016/12/9.
 */
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal, ConfirmModalSuccess} from '../components/Tool/Tool'

/*
 * Function  This function can use multiple condition to search list
 * Params    startRow:search page start index    searchColumns:by what columns to search(is a array)    searchValues:by what values to search(is a array)    sortColumn:sort by what column    orderType:asc or desc
 *           startDispatch:if need start loading    endDispatch:finish loading and loaded   interfaceURL:loading URL
 * */
export function getListByMutilpCondition(params, startDispatch, endDispatch, interfaceURL) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(params)
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(endDispatch, json)))
    }
}

export function deleteObject(obj, startRow, searchColumns, searchValues, sortColumn, orderType, startDispatch, endDispatch, deleteInterface, listInterface, customerColumn, customerValue) {
    return dispatch=> {

        fetch(deleteInterface,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify(obj)
            })
            .then(response=>response.json())
            .then(function (json) {
                console.log("delete",json);
                if (json.status) {
                    if (startDispatch) {
                        dispatch(startFetch(startDispatch))
                    }
                    var params = {
                        startRow: startRow * page_size,
                        endRow: page_size,
                        page: '',
                        searchColumn: searchColumns,
                        searchValue: searchValues,
                        sortColumn: sortColumn,
                        orderType: orderType
                    }
                    if (customerColumn && customerColumn.length > 0) {
                        customerColumn.forEach(function (val, key) {
                            params[val] = customerValue[key];
                        })
                    }
                    fetch(listInterface,
                        {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "data=" + JSON.stringify(params)
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(endDispatch, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })
    }
}

export function getDetail(jsonObj, startDispatch, endDispatch, interfaceURL) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(jsonObj)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.status) {
                    dispatch(endFetch(endDispatch, json))
                } else {
                    // dispatch(endDeleteCsr(json))
                    // ErrorModal('警告!', '详情获取失败:' + json.message)
                    dispatch(endFetch(endDispatch, json))
                }
            })
    }
}
export function generateQrcode(data,startDispatch, endDispatch, interfaceURL,callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(data)
            })
            .then(function(response){
                return response.json();
            })
            .then(function (json) {
                console.log("generate",json);
                if (json.status) {
                    dispatch(endFetch(endDispatch, json))
                    if (callback) {
                        callback();
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.error.message)
                }
            })

    }
}
export function exportQrcode(startDispatch, endDispatch, interfaceURL,callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(function(response){
                return response.json();
            })
            .then(function (json) {
                if (json.status) {
                    console.log("export1",json);
                    dispatch(endFetch(endDispatch, json))
                    if (callback) {
                        callback();
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.error.message)
                }
            })

    }
}

export function getAuthcode(data, startDispatch, endDispatch, interfaceURL, callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.status) {
                    dispatch(endFetch(endDispatch, json))
                    if (callback) {
                        callback();
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.error.message)
                }
            })

    }
}

export function saveObject(data, startDispatch, endDispatch, interfaceURL, listRouter, flag, callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.status) {
                    dispatch(endFetch(endDispatch, json))
                    if (!flag) {
                        ConfirmModalSuccess(Current_Lang.alertTip.registerSuccess, Current_Lang.alertTip.needContinueAdd, function () {
                            browserHistory.push(listRouter)
                        })
                    } else if (flag == "update") {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess);
                        browserHistory.push(listRouter)
                    } else if (flag == "bindQrcode") {
                        SuccessModal(Current_Lang.alertTip.tip, "绑定二维码成功");
                        browserHistory.push(listRouter)
                    } else if (flag == "noAlert") {
                        browserHistory.push(listRouter)
                    } else {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                    }
                    if (callback) {
                        callback();
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.error.message)
                }
            })

    }
}

export function login(data, startDispatch, endDispatch, interfaceURL, listRouter, callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                console.log("json", json);
                if (json.status) {
                    dispatch(endFetch(endDispatch, json));
                    sessionStorage['check'] = true;
                    sessionStorage['token'] = json.data.token;
                    sessionStorage['type'] = json.data.type;
                    sessionStorage['phone'] = json.data.phone;
                    sessionStorage['userid'] = json.data.id;
                    sessionStorage['user'] = json.data.user ? json.data.user : "";
                    sessionStorage['count'] = -1;
                    sessionStorage['messageTime'] = "";
                    sessionStorage['userMessageTime'] = "";
                    browserHistory.push(listRouter);
                    if (callback) {
                        callback();
                    }
                } else {
                    ErrorModal("错误", "用户名或者密码不正确");
                    sessionStorage['token'] = ''
                }
            })

    }
}

export function saveObjectByPut(data, startDispatch, endDispatch, interfaceURL, listRouter, flag) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(endDispatch, json))
                    if (!flag) {
                        ConfirmModalSuccess(Current_Lang.alertTip.registerSuccess, Current_Lang.alertTip.needContinueAdd, function () {
                            browserHistory.push(listRouter)
                        })
                    } else if (flag == "update") {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                        browserHistory.push(listRouter)
                    } else {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })

    }
}

function startFetch(type) {
    return {
        type: type
    }
}

function endFetch(type, json) {
    return {
        type: type,
        json
    }
}