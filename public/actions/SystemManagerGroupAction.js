/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_GROUP_LIST,
    END_GROUP_LIST,
    START_GROUP_DETAIL,
    START_GROUP_SAVE,
    END_GROUP_DETAIL,
    END_GROUP_SAVE,
    START_AREA_APP_LIST,
    END_AREA_APP_LIST,
    END_ADD_AREA_APP_ITEM
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getGroupList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_GROUP_LIST))
        fetch(group_list,
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
            .then(json=>dispatch(endFetch(END_GROUP_LIST, json)))
    }
}

export function saveGroup(groupId,data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_GROUP_SAVE))
        console.log(data)
        fetch(group_save,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_GROUP_SAVE, json))
                    browserHistory.push('/SysManager/Service/Group')
                    if (!flag) {
                        SuccessModal('提示!', '注册新分组成功')
                    } else {
                        SuccessModal('提示!', '修改分组成功')
                    }
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })
    }
}

function checkGroupId(groupId, callback, flag) {
    if (!flag) {
        fetch(group_groupIdCheck,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({groupId:groupId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal('警告!', '发生错误:组 ID已经存在')
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

export function deleteGroup(groupId, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(group_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({groupId: groupId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_GROUP_LIST))
                    fetch(group_list,
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
                        .then(json=>dispatch(endFetch(END_GROUP_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

export function getAreaApp() {
    return dispatch=> {
        fetch(group_area_app,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response=>response.json())
            .then(function (json) {
                dispatch(endFetch(END_AREA_APP_LIST, json))
            })
    }
}

export function detailGroup(groupId) {
    return dispatch=> {
        dispatch(startFetch(START_GROUP_DETAIL))
        fetch(group_area_app,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response=>response.json())
            .then(function (areaAndApp) {
                // dispatch(endFetch(END_AREA_APP_LIST, json))
                var result={}
                result['areaAndApp']=areaAndApp
                fetch(group_detail,
                    {
                        credentials: 'include',
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "data=" + JSON.stringify({groupId:groupId})
                    })
                    .then(response=>response.json())
                    .then(function (json) {
                        if (json.result == 'SUCCESS') {
                            result['detail']=json
                            dispatch(endFetch(END_GROUP_DETAIL, result))
                        } else {
                            ErrorModal('警告!', '发生错误:' + json.message)
                        }
                    })
            })


    }
}

export function addAreaAppItem() {
    return dispatch=> {
        dispatch(endFetch(END_ADD_AREA_APP_ITEM))
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
