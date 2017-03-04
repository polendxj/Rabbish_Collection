/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_DEVICE_TYPE_LIST,
    END_DEVICE_TYPE_LIST,
    END_DEVICE_TYPE_DETAIL,
    START_DEVICE_TYPE_DETAIL
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getDeviceTypeList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_DEVICE_TYPE_LIST))
        fetch(device_type_list,
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
                    sortColumn: 'DEVICE_NAME',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_DEVICE_TYPE_LIST, json)))
    }
}

export function saveDeviceType(data, flag,oldObj) {
    return dispatch=> {
        deviceNameCheck(data.deviceName, function () {
            deviceTypeCheck(data.deviceType, function () {
                fetch(device_type_save,
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
                            browserHistory.push('/SystemManager/Platform/DeviceType')
                            if (!data.seq) {
                                SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.registerSuccess)
                            } else {
                                SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                            }
                        } else {
                            ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                        }
                    })
            }, flag,oldObj)
        }, flag,oldObj)


    }
}

function deviceNameCheck(id, callback, flag,oldObj) {
    if (!flag) {
        if(oldObj && oldObj.deviceName==id){
            callback()
        }else{
            fetch(device_type_name_check,
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "data=" + JSON.stringify({deviceName: id})
                })
                .then(response=>response.json())
                .then(function (json) {
                    if (json.result == 'SUCCESS') {
                        if (json.count > 0) {
                            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deviceTypeNameExist)
                        } else {
                            callback()
                        }
                    } else {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                    }
                })
        }

    } else {
        callback()
    }
}

function deviceTypeCheck(id, callback, flag,oldObj) {
    if (!flag) {
        if(oldObj && oldObj.deviceType==id){
            callback()
        }else{
            fetch(device_type_type_check,
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "data=" + JSON.stringify({deviceType: id})
                })
                .then(response=>response.json())
                .then(function (json) {
                    if (json.result == 'SUCCESS') {
                        if (json.count > 0) {
                            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deviceTypeInfoExist)
                        } else {
                            callback()
                        }
                    } else {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                    }
                })
        }

    } else {
        callback()
    }
}

export function detailDeviceType(id) {
    return dispatch=> {
        dispatch(startFetch(START_DEVICE_TYPE_DETAIL))
        fetch(device_type_detail,
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
                    dispatch(endFetch(END_DEVICE_TYPE_DETAIL, json))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError+ json.message)
                }
            })

    }
}

export function deleteDeviceType(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(device_type_delete,
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
                    dispatch(startFetch(START_DEVICE_TYPE_LIST))
                    fetch(device_type_list,
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
                                sortColumn: 'DEVICE_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_DEVICE_TYPE_LIST, json)))
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
