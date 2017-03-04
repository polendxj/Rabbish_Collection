/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_SUBAPP_LIST,
    END_SUBAPP_LIST,
    START_SUBAPP_SAVE,
    END_SUBAPP_SAVE,
    START_SUBAPP_DETAIL,
    END_SUBAPP_DETAIL,
    END_APP_LIST
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getSubAppList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_SUBAPP_LIST))
        fetch(subapp_list,
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
                    sortColumn: 'APP_ID',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_SUBAPP_LIST, json)))
    }
}

export function saveSubapp(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_SUBAPP_SAVE))
        subappIdCheck(data.subAppId, function () {
            fetch(subapp_save,
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
                        dispatch(endFetch(END_SUBAPP_SAVE, json))
                        browserHistory.push('/SysManager/Service/Subapp')
                        if (!flag) {
                            SuccessModal('提示!', '注册子级成功')
                        } else {
                            SuccessModal('提示!', '修改子级成功')
                        }
                    } else {
                        ErrorModal('警告!', '发生错误:' + json.message)
                    }
                })
        }, flag)

    }
}
export function deleteSubapp(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(subapp_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({subAppId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_SUBAPP_LIST))
                    fetch(subapp_list,
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
                                sortColumn: 'APP_ID',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_SUBAPP_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

export function detailSubapp(id, appId) {
    return dispatch=> {
        dispatch(startFetch(START_SUBAPP_DETAIL))
        fetch(subapp_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({subAppId: id, appId: appId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_SUBAPP_DETAIL, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}

export function getAppList() {
    return dispatch=> {
        fetch(app_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_APP_LIST, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}

function subappIdCheck(id, callback, flag) {
    if (!flag) {
        fetch(subapp_subappIdCheck,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({subAppId: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal('警告!', '发生错误:子级App ID已经存在')
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

