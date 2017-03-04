/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_DEDICATED_LIST,
    END_DEDICATED_LIST,
    START_DEDICATED_SAVE,
    END_DEDICATED_SAVE,
    START_DEDICATED_DETAIL,
    END_DEDICATED_DETAIL,
    END_DEDICATED_AREA_SUBINFO,
    START_COMMON_ROUTER_LIST,
    END_COMMON_ROUTER_LIST,
    END_SAVE_COMMON_ROUTER,
    START_COMMON_ROUTER_DETAIL,
    END_COMMON_ROUTER_DETAIL,
    END_VISIT_CONTROL_LIST,
    END_VISIT_CONTROL_ROUTER,
    START_VISIT_CONTROL_DETAIL,
    END_VISIT_CONTROL_DETAIL,
    END_VISIT_CONTROL_SAVE
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal, ConfirmModalSuccess} from '../components/Tool/Tool'


export function getDedicatedList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_DEDICATED_LIST))
        fetch(dedicated_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({
                    startRow: startRow * page_size,
                    endRow: page_size,
                    page: '',
                    searchColumn: searchValue?searchColumn:'ALL',
                    searchValue: searchValue,
                    sortColumn: 'STB_ID',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_DEDICATED_LIST, json)))
    }
}

export function saveDedicated(data, flag) {
    return dispatch=> {
        console.log(data)
        dispatch(startFetch(START_DEDICATED_SAVE))
        fetch(dedicated_save,
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
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_DEDICATED_SAVE, json))
                    browserHistory.push('/SysManager/Service/Dedicated/:d')
                    if (!flag) {
                        SuccessModal(Current_Lang.alertTip.tip,Current_Lang.alertTip.registerSuccess)
                    } else {
                        SuccessModal(Current_Lang.alertTip.tip,Current_Lang.alertTip.updateSuccess)
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError+ json.message)
                }
            })

    }
}
export function deleteDedicated(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(dedicated_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({seq: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_DEDICATED_LIST))
                    fetch(dedicated_list,
                        {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "data=" + JSON.stringify({
                                startRow: startRow * page_size,
                                endRow: page_size,
                                page: '',
                                searchColumn: searchValue?searchColumn:'ALL',
                                searchValue: searchValue,
                                sortColumn: 'STB_ID',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_DEDICATED_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure + json.message)
                }
            })
    }
}

export function detailDedicated(dedicatedId, flag) {
    return dispatch=> {
        dispatch(startFetch(START_DEDICATED_DETAIL))
        var uri = ""
        if (flag == 'c') {
            uri = common_router_detail
        } else if (flag == 'd') {
            uri = dedicated_detail
        }
        fetch(uri,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({seq: dedicatedId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_DEDICATED_DETAIL, json))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError+ json.message)
                }
            })

    }
}

export function detailCommonRouter(dedicatedId) {
    return dispatch=> {
        dispatch(startFetch(START_COMMON_ROUTER_DETAIL))
        fetch(dedicated_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({seq: dedicatedId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_COMMON_ROUTER_DETAIL, json))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })

    }
}

export function areaSubInfoDedicated() {
    return dispatch=> {
        fetch(dedicated_area_subinfo,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.area.result == 'SUCCESS') {
                    dispatch(endFetch(END_DEDICATED_AREA_SUBINFO, json))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })

    }
}

export function getCommonRouterList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_COMMON_ROUTER_LIST))
        fetch(routing_rule_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({
                    startRow: startRow * page_size,
                    endRow: page_size,
                    page: '',
                    searchColumn: searchValue?searchColumn:'ALL',
                    searchValue: searchValue,
                    sortColumn: 'AREA_NAME',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_COMMON_ROUTER_LIST, json)))
    }
}

export function saveCommonRouter(data, flag) {
    return dispatch=> {
        fetch(common_router_save,
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
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_SAVE_COMMON_ROUTER, json))
                    if (!flag) {
                        ConfirmModalSuccess(Current_Lang.alertTip.registerSuccess, Current_Lang.alertTip.needContinueAdd, function () {
                            browserHistory.push('/SysManager/Service/Dedicated/:c')
                        })
                        // SuccessModal(Current_Lang.alertTip.tip, '注册专用通道成功')
                    } else {
                        SuccessModal(Current_Lang.alertTip.tip,Current_Lang.alertTip.updateSuccess)
                        browserHistory.push('/SysManager/Service/Dedicated/:c')
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })

    }
}

export function deleteCommonRouter(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(common_router_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({seqs: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_COMMON_ROUTER_LIST))
                    fetch(routing_rule_list,
                        {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "data=" + JSON.stringify({
                                startRow: startRow * page_size,
                                endRow: page_size,
                                page: '',
                                searchColumn: searchValue?searchColumn:'ALL',
                                searchValue: searchValue,
                                sortColumn: 'AREA_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_COMMON_ROUTER_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure + json.message)
                }
            })
    }
}


function dedicatedIdCheck(dedicatedId, callback, flag) {
    if (!flag) {
        fetch(dedicated_dedicatedIdCheck,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({dedicatedId: dedicatedId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.sgidExist)
                    } else {
                        callback()
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })
    } else {
        callback()
    }

}

/*visitControl*/
export function getVisitControlList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        alert(0)
        dispatch(startFetch(START_COMMON_ROUTER_LIST))
        fetch(routing_rule_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({
                    startRow: startRow * page_size,
                    endRow: page_size,
                    page: '',
                    searchColumn: searchValue?searchColumn:'ALL',
                    searchValue: searchValue,
                    sortColumn: 'AREA_NAME',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_COMMON_ROUTER_LIST, json)))
    }
}

export function saveVisitControl(data, flag) {
    return dispatch=> {
        visitControlIdCheck(data.serviceModelSeq,function () {
            fetch(visit_control_save,
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
                    if (json.result == 'SUCCESS') {
                        dispatch(endFetch(END_VISIT_CONTROL_SAVE, json))
                        if (!flag) {
                            ConfirmModalSuccess(Current_Lang.alertTip.registerSuccess, Current_Lang.alertTip.needContinueAdd, function () {
                                browserHistory.push('/SysManager/Service/Dedicated/:a')
                            })
                            // SuccessModal(Current_Lang.alertTip.tip, '注册专用通道成功')
                        } else {
                            SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                            browserHistory.push('/SysManager/Service/Dedicated/:a')
                        }
                    } else {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                    }
                })
        })


    }
}

function visitControlIdCheck(deviceTypeID, callback, flag) {
    if (!flag) {
        fetch(visit_control_check,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({serviceModelSeq: deviceTypeID})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.accessControlInfoExist)
                    } else {
                        callback()
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor,Current_Lang.status.someError+ json.message)
                }
            })
    } else {
        callback()
    }

}

export function deleteVisitControl(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(visit_control_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({seqs: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    fetch(visit_control_list,
                        {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "data=" + JSON.stringify({
                                startRow: startRow * page_size,
                                endRow: page_size,
                                page: '',
                                searchColumn: searchValue?searchColumn:'ALL',
                                searchValue: searchValue,
                                sortColumn: 'DEVICE_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_VISIT_CONTROL_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure + json.message)
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
