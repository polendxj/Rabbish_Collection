/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_GET_SYS_MANAGER_SO_LIST,
    END_GET_SYS_MANAGER_SO_LIST,
    START_SAVE_SO,
    END_SAVE_SO,
    START_DETAIL_SO,
    END_DETAIL_SO
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getSOList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_GET_SYS_MANAGER_SO_LIST))
        fetch(so_list,
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
                    sortColumn: 'AREA_ID',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_GET_SYS_MANAGER_SO_LIST, json)))
    }
}

export function saveSo(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_SAVE_SO))
        soIdCheck(data.areaId, function () {
            fetch(so_save,
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
                        dispatch(endFetch(END_SAVE_SO, json))
                        browserHistory.push('/SysManager/Service/SO')
                        if(!flag){
                            SuccessModal('提示!', '注册新区域成功')
                        }else{
                            SuccessModal('提示!', '修改区域成功')
                        }
                    } else {
                        ErrorModal('警告!', '发生错误:' + json.message)
                    }
                })
        }, flag)

    }
}
export function deleteSO(soId, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(so_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({areaId: soId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_GET_SYS_MANAGER_SO_LIST))
                    fetch(so_list,
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
                                sortColumn: 'AREA_ID',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_GET_SYS_MANAGER_SO_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

export function detailSo(soId) {
    return dispatch=> {
        dispatch(startFetch(START_DETAIL_SO))
        fetch(so_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({areaId:soId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_DETAIL_SO, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}


function soIdCheck(soId, callback, flag) {
    if (!flag) {
        fetch(so_id_check,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({areaId: soId})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (json.count > 0) {
                        ErrorModal('警告!', '发生错误:区域ID已经存在')
                    } else {
                        callback()
                    }
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })
    }else{
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
