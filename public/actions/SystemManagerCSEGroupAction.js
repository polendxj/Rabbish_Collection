/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_CSE_GROUP_LIST,
    END_CSE_GROUP_LIST,
    START_CSE_GROUP_SAVE,
    END_CSE_GROUP_SAVE,
    START_CSE_GROUP_DETAIL,
    END_CSE_GROUP_DETAIL,
    START_CSE_LIST,
    END_CSE_LIST
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getCSEGroupList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_GROUP_LIST))
        fetch(cse_group_list,
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
                    sortColumn: 'GROUP_ID',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_CSE_GROUP_LIST, json)))
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
                    sortColumn: 'HOST_NAME',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_CSE_LIST, json)))
    }
}

export function saveCSEGroup(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_GROUP_SAVE))
        fetch(cse_group_save,
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
                    dispatch(endFetch(END_CSE_GROUP_SAVE, json))
                    browserHistory.push('/SystemManager/ClusterSetting/CSEGroup')
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
export function deleteCSEGroup(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(cse_group_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({groupIds: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_CSE_GROUP_LIST))
                    fetch(cse_group_list,
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
                                sortColumn: 'GROUP_ID',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_CSE_GROUP_LIST, json)))
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.deleteFailure + json.message)
                }
            })
    }
}

export function detailCSEGroup(id) {
    return dispatch=> {
        dispatch(startFetch(START_CSE_GROUP_DETAIL))
        fetch(cse_group_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({groupId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                console.log(json)
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_CSE_GROUP_DETAIL, json))
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
