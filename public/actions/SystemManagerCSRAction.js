/**
 * Created by Administrator on 2016/8/19.
 */
import {
    CHANGE_SEARCH1_TYPE,
    GET_SYS_MANAGER_CSR_LIST,
    START_FETCH,
    END_FETCH,
    START_CSR,
    CLOSE_CSR,
    END_FETCH_STATUS,
    START_SAVE_CSR,
    END_SAVE_CSR,
    END_DETAIL_CSR,
    START_DETAIL_CSR,
    START_GW_LIST,
    END_GW_LIST
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getCSRList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch())
        fetch(csr_list,
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
            .then(json=>dispatch(endFetch(json)))
    }
}

export function updateCSR(csrId, status, index) {
    return dispatch=> {
        fetch(csr_status_update,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({rssId: csrId, useYN: status})
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetchCSRStatus(json, index)))
    }

}


export function startFetchCSRStatus(index) {
    return {
        type: START_CSR,
        index: index
    }
}

export function endFetchCSRStatus(json, index) {
    return {
        type: END_FETCH_STATUS,
        json: json,
        index: index
    }
}
/*创建CSR*/
function startCreateCSR() {
    return {
        type: START_SAVE_CSR
    }
}
function endCreateCSR(data) {
    return {
        type: END_SAVE_CSR,
        data: data
    }
}
export function saveNewCSR(data,flag) {
    return dispatch=> {
        if(flag){
            fetch(csr_save,
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'data=' + JSON.stringify(data)
                })
                .then(response=>response.json())
                .then(function (json) {
                    if (json.result == 'SUCCESS') {
                        dispatch(endCreateCSR(json))
                        SuccessModal(Current_Lang.alertTip.tip, 'SR 修改成功')
                        browserHistory.push('/SysManager/Service/CSR/:c')
                    } else {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                    }
                })
        }else{
            fetch(csr_id_check,
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'data=' + JSON.stringify({rssId: data.rssId})
                })
                .then(response=>response.json())
                .then(function (json) {
                    if (json.result == 'SUCCESS' && json.count == 0) {
                        fetch(csr_save,
                            {
                                credentials: 'include',
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: 'data=' + JSON.stringify(data)
                            })
                            .then(response=>response.json())
                            .then(function (json) {
                                if (json.result == 'SUCCESS') {
                                    dispatch(endCreateCSR(json))
                                    SuccessModal(Current_Lang.alertTip.tip, 'SR 注册成功')
                                    browserHistory.push('/SysManager/Service/CSR/:c')
                                } else {
                                    ErrorModal(Current_Lang.status.minor, '发生错误:' + json.message)
                                }
                            })
                    } else {
                        dispatch(endCreateCSR(json))
                        ErrorModal(Current_Lang.status.minor, 'SR 名称已存在')
                    }
                })
        }


    }
}
/*END 创建CSR*/

export function saveNewCSRByConsul(params,startRow, searchColumn, searchValue){
    return dispatch=>{
        fetch(csr_id_check,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({rssId: params.name})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS' && json.count == 0) {
                    fetch(csr_save_byConsul,
                        {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: 'data=' + JSON.stringify(params)
                        })
                        .then(response=>response.json())
                        .then(function (json) {
                            if (json.srStatus&&json.gwStatus) {
                                SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.registerSuccess)
                                $("#csrName").val("");
                                $("#modal_keyboard").modal("hide");
                            } else {
                                // dispatch(endDeleteCsr(json))
                                ErrorModal(Current_Lang.status.minor, '路由服务注册:' + (json.srStatus?" 成功":" 失败")+',网关服务注册:'+(json.gwStatus?" 成功":" 失败"))
                            }
                            dispatch(startFetch1(START_GW_LIST))
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
                                .then(function (json) {
                                    if(json.unRegistered.length==0){
                                        $("#sedLi").addClass("active");
                                        $("#statusLi").removeClass("active");
                                        $("#justified-right-icon-tab1").addClass("active");
                                        $("#justified-right-icon-tab2").removeClass("active");
                                    }else{}
                                    dispatch(endFetch1(END_GW_LIST, json))
                                })
                        })
                } else {
                    dispatch(endCreateCSR(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.csrHostNameExist)
                }
            })

    }
}

/*删除CSR*/
export function deleteCSR(rssId, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(csr_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({rssId: rssId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch1(START_GW_LIST))
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
                        .then(json=>dispatch(endFetch1(END_GW_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure + json.message)
                }
            })

        /*删除SR的时候同时删除gateway*/
        fetch(gw_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({gwId: rssId+"_GW"})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {

                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure + json.message)
                }
            })
    }
}
function endDeleteCsr(data) {
    return {
        type: START_FETCH,
        data
    }
}
/*END 删除CSR*/

/*获取某个CSR详情*/
export function csrDetail(rssId) {
    return dispatch=> {
        dispatch(startDetailCsr())
        fetch(csr_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({rssId: rssId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endDetailCsr(json))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.detailGetFailure + json.message)
                }
            })
    }
}

function startDetailCsr() {
    return {
        type: START_DETAIL_CSR
    }
}

function endDetailCsr(data) {
    return {
        type: END_DETAIL_CSR,
        data
    }
}
/*END 获取某个CSR详情*/
function startFetch() {
    return {
        type: START_FETCH
    }
}
function endFetch(json) {
    return {
        type: END_FETCH,
        json
    }
}
function startFetch1(type) {
    return {
        type: type
    }
}

function endFetch1(type, json) {
    return {
        type: type,
        json
    }
}

