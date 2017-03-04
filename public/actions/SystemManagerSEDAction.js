/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_SED_LIST,
    END_SED_LIST,
    START_SED_SAVE,
    END_SED_SAVE,
    START_SED_DETAIL,
    END_SED_DETAIL
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getSEDList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_SED_LIST))
        fetch(sed_list,
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
                    sortColumn: 'AGENT_IP',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_SED_LIST, json)))
    }
}

export function saveSED(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_SED_SAVE))
        sedIdCheck(data.agentIp,function () {
            fetch(sed_save,
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
                        dispatch(endFetch(END_SED_SAVE, json))
                        browserHistory.push('/SysManager/Service/CSE')
                        if (!flag) {
                            SuccessModal('提示!', '注册CSE成功')
                        } else {
                            SuccessModal('提示!', '更新SED成功')
                        }
                    } else {
                        ErrorModal('警告!', '发生错误:' + json.message)
                    }
                })
        })


    }
}
export function deleteSED(id, startRow, searchColumn, searchValue) {
    return dispatch=> {
        fetch(sed_delete,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify({agentIp: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(startFetch(START_SED_LIST))
                    fetch(sed_list,
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
                                sortColumn: 'AREA_NAME',
                                orderType: 'ASC'
                            })
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(END_SED_LIST, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal('警告!', '删除失败:' + json.message)
                }
            })
    }
}

export function detailSED(id) {
    return dispatch=> {
        dispatch(startFetch(START_SED_DETAIL))
        fetch(sed_detail,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({agentIp: id})
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(END_SED_DETAIL, json))
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
                }
            })

    }
}


function sedIdCheck(id, callback, flag) {
    if (!flag) {
        fetch(sed_sedIdCheck,
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
                        ErrorModal('警告!', '发生错误:CSE ID已经存在')
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
