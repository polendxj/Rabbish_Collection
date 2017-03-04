/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_Service_GROUP_LIST,
    END_Service_GROUP_LIST,
    START_Service_GROUP_SAVE,
    END_Service_GROUP_SAVE,
    START_Service_GROUP_DETAIL,
    END_Service_GROUP_DETAIL
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getServiceGroupList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_Service_GROUP_LIST))
        fetch(service_group_list,
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
                    searchColumn: searchValue?searchColumn:"ALL",
                    searchValue: searchValue,
                    sortColumn: 'AREA_NAME',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_Service_GROUP_LIST, json)))
    }
}

export function saveServiceGroup(data, flag) {
    return dispatch=> {
        serviceGroupIdCheck(data.areaName,function () {
            dispatch(startFetch(START_Service_GROUP_SAVE))
            fetch(service_group_save,
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
                        dispatch(endFetch(END_Service_GROUP_SAVE, json))
                        browserHistory.push('/SysManager/Platform/ServiceGroup')
                        if (!flag) {
                            SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.registerSuccess)
                        } else {
                            SuccessModal(Current_Lang.alertTip.tip,Current_Lang.alertTip.updateSuccess)
                        }
                    } else {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                    }
                })
        },flag)



    }
}
export function deleteServiceGroup(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(service_group_delete,
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
                    dispatch(startFetch(START_Service_GROUP_LIST))
                    fetch(service_group_list,
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
                                searchColumn: searchValue?searchColumn:"ALL",
                                searchValue: searchValue,
                                sortColumn: 'AREA_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_Service_GROUP_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure + json.message)
                }
            })
    }
}

export function detailServiceGroup(id) {
    return dispatch=> {
        dispatch(startFetch(START_Service_GROUP_DETAIL))
        fetch(service_group_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({seq: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_Service_GROUP_DETAIL, json))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })

    }
}

function serviceGroupIdCheck(id, callback, flag) {
    if (!flag) {
        fetch(service_groupIdCheck,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({areaName: id})
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
