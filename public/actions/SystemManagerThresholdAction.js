/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_THRESHOLD_LIST,
    END_THRESHOLD_LIST,
    START_THRESHOLD_SAVE,
    END_THRESHOLD_SAVE,
    START_THRESHOLD_DETAIL,
    END_THRESHOLD_DETAIL,
    END_THRESHOLD_STATUS_UPDATE
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getThresholdList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_THRESHOLD_LIST))
        fetch(threshold_list,
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
                    sortColumn: 'THRESHOLD_NAME',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_THRESHOLD_LIST, json)))
    }
}

export function saveThreshold(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_THRESHOLD_SAVE))
        fetch(threshold_save,
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
                    dispatch(endFetch(END_THRESHOLD_SAVE, json))
                    browserHistory.push('/Monitor/Alarm/Threshold')
                    if (!flag) {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.registerSuccess)
                    } else {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.someError + json.message)
                }
            })

    }
}
export function deleteThreshold(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(threshold_delete,
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
                    dispatch(startFetch(START_THRESHOLD_LIST))
                    fetch(threshold_list,
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
                                sortColumn: 'THRESHOLD_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_THRESHOLD_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.deleteFailure + json.message)
                }
            })
    }
}

export function detailThreshold(id) {
    return dispatch=> {
        dispatch(startFetch(START_THRESHOLD_DETAIL))
        fetch(threshold_detail,
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
                    dispatch(endFetch(END_THRESHOLD_DETAIL, json))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.someError + json.message)
                }
            })

    }
}

export function updateThresholdStatus(data, status, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(threshold_save,
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
                    dispatch(startFetch(START_THRESHOLD_LIST))
                    fetch(threshold_list,
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
                                sortColumn: 'THRESHOLD_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_THRESHOLD_LIST, json)))
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
