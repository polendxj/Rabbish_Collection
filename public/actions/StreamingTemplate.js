/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_ADMIN_LIST,
    END_ADMIN_LIST,
    START_ADMIN_SAVE,
    END_ADMIN_SAVE,
    START_ADMIN_DETAIL,
    END_ADMIN_DETAIL
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getAdminList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_ADMIN_LIST))
        fetch(admin_list,
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
                    sortColumn: 'ADMIN_ID',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_ADMIN_LIST, json)))
    }
}

export function saveAdmin(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_ADMIN_SAVE))
        console.log(data)
        fetch(admin_save,
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
                    dispatch(endFetch(END_ADMIN_SAVE, json))
                    browserHistory.push('/UserManager/Admin')
                    if (!flag) {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.registerSuccess)
                    } else {
                        SuccessModal(Current_Lang.alertTip.tip,Current_Lang.alertTip.updateSuccess)
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })

    }
}
export function deleteAdmin(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(admin_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({adminId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_ADMIN_LIST))
                    fetch(admin_list,
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
                                sortColumn: 'ADMIN_ID',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_ADMIN_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure+ json.message)
                }
            })
    }
}

export function detailAdmin(id) {
    return dispatch=> {
        dispatch(startFetch(START_ADMIN_DETAIL))
        fetch(admin_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({adminId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_ADMIN_DETAIL, json))
                } else {
                    ErrorModal(Current_Lang.status.minor,Current_Lang.status.someError + json.message)
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
