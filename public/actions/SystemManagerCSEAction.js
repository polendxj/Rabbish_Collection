/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_CSE_LIST,
    END_CSE_LIST,
    START_CSE_SAVE,
    END_CSE_SAVE,
    START_CSE_DETAIL,
    END_CSE_DETAIL,
    END_AREA_LIST,
    END_CSE_STATUS_UPDATE,
    START_GROUP_CSE_LIST,
    END_GROUP_CSE_LIST
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getCSEList(startRow, searchColumn, searchValue,sortColumn,sortType) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_LIST))
        fetch(cse_list,
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
                    sortColumn: sortColumn,
                    orderType: sortType
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_CSE_LIST, json)))
    }
}

export function getGroupCSEList(startRow, searchColumn, searchValue, groupIdCon) {
    return dispatch=> {
        dispatch(startFetch(START_GROUP_CSE_LIST))
        fetch(cse_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({
                    startRow: startRow * page_size,
                    endRow: groupIdCon ? '10000' : page_size,
                    page: '',
                    searchColumn: searchColumn,
                    searchValue: searchValue,
                    sortColumn: 'HOST_NAME',
                    groupIdCon: groupIdCon ? groupIdCon : '',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_GROUP_CSE_LIST, json)))
    }
}

export function getAllCSEList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_LIST))
        fetch(cse_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({
                    startRow: startRow * page_size,
                    endRow: 10000,
                    page: '',
                    searchColumn: searchColumn,
                    searchValue: searchValue,
                    sortColumn: 'USE_YN',
                    orderType: 'DESC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_CSE_LIST, json)))
    }
}

export function getAreaList() {
    console.log(document.cookie)
    return dispatch=> {
        fetch(area_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_AREA_LIST, json)))
    }
}

export function saveCSE(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_SAVE))
        fetch(cse_save,
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
                    if (!flag) {
                        SuccessModal(Current_Lang.alertTip.tip,Current_Lang.alertTip.registerSuccess)
                    } else {
                        SuccessModal(Current_Lang.alertTip.tip,Current_Lang.alertTip.updateSuccess)
                    }
                    $("#modal_keyboard").modal("hide");

                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError+ json.message)
                }
            })

    }
}
export function deleteCSE(id, startRow, searchColumn, searchValue,sortColumn,sortType) {
    return dispatch=> {
        fetch(cse_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({cssId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_CSE_LIST))
                    fetch(cse_list,
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
                                sortColumn: sortColumn,
                                orderType: sortType
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_CSE_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure + json.message)
                }
            })
    }
}

export function detailCSE(id) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_DETAIL))
        fetch(cse_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({cssId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_CSE_DETAIL, json))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })

    }
}

export function updateCSEStatus(id, status, startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_DETAIL))
        fetch(cse_status_update,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({cssId: id, useYN: status})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_CSE_LIST))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })

    }
}


function cseIdCheck(id, callback, flag) {
    if (!flag) {
        fetch(cse_cseIdCheck,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({areaId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError+Current_Lang.alertTip.cseIDExist)
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
