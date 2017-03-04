/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_GW_LIST,
    END_GW_LIST,
    START_GW_SAVE,
    END_GW_SAVE,
    START_GW_DETAIL,
    END_GW_DETAIL,
    END_GW_STATUS_UPDATE
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getGWList(startRow, searchColumn, searchValue,type) {
    return dispatch=> {
        dispatch(startFetch(START_GW_LIST));
        if(type=="csm"){
            fetch(csm_monitor_list,
                {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                .then(response=>response.json())
                .then(json=>dispatch(endFetch(END_GW_LIST, json)))
        }else{
            fetch(gw_list,
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
                        searchColumn: searchColumn,
                        searchValue: searchValue,
                        sortColumn: 'RSS_ID',
                        orderType: 'ASC'
                    })
                })
                .then(response=>response.json())
                .then(json=>dispatch(endFetch(END_GW_LIST, json)))
        }

    }
}

export function saveGW(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_GW_SAVE))
        gwIdCheck(data.gwId, function () {
            fetch(gw_save,
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
                        dispatch(endFetch(END_GW_SAVE, json))
                        browserHistory.push('/SysManager/Service/CSR/:g')
                        if (!flag) {
                            SuccessModal('提示!', '注册GateWay成功')
                        } else {
                            SuccessModal('提示!', '修改GateWay成功')
                        }
                    } else {
                        ErrorModal('警告!', '发生错误:' + json.message)
                    }
                })
        }, flag)


    }
}
export function deleteGW(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(gw_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({gwId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_GW_LIST))
                    fetch(gw_list,
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
                                searchColumn: searchColumn,
                                searchValue: searchValue,
                                sortColumn: 'GW_ID',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_GW_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

export function detailGW(id) {
    return dispatch=> {
        dispatch(startFetch(START_GW_DETAIL))
        fetch(gw_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({gwId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.detail.result == 'SUCCESS') {
                    dispatch(endFetch(END_GW_DETAIL, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}

export function updateGWStatus(id, status, startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_GW_DETAIL))
        fetch(gw_status_update,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({gwId: id, useYN: status})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_GW_LIST))
                    fetch(gw_list,
                        {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "data=" + JSON.stringify({
                                startRow: startRow * page_size,
                                endRow: page_size,
                                page: '',
                                searchColumn: searchColumn,
                                searchValue: searchValue,
                                sortColumn: 'HOST_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_GW_LIST, json)))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}


function gwIdCheck(id, callback, flag) {
    if (!flag) {
        fetch(gw_gwIdCheck,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({gwId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal('警告!', '发生错误:GateWay ID已经存在')
                    } else {
                        callback()
                    }
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })
    } else {
        callback()
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

