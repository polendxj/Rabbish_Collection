/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_PERMISSION_LIST,
    END_PERMISSION_LIST,
    START_PERMISSION_SAVE,
    END_PERMISSION_SAVE
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getPermissionList(permissionId) {
    return dispatch=> {
        dispatch(startFetch(START_PERMISSION_LIST))
        fetch(permission_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({permissionId: permissionId})
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_PERMISSION_LIST, json)))
    }
}

export function savePermission(data, flag) {
    return dispatch=> {
        dispatch(startFetch(START_PERMISSION_SAVE))
        fetch(permission_save,
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
                    dispatch(endFetch(END_PERMISSION_SAVE, json))
                    SuccessModal('提示!', '权限配置保存成功')
                } else {
                    ErrorModal('警告!', '发生错误:' + json.message)
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
