/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {
    START_PERMISSION_LIST,
    END_PERMISSION_LIST,
    START_PERMISSION_SAVE,
    END_PERMISSION_SAVE
} from '../constants/index'

export function getSysManagerPermissionList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_PERMISSION_LIST:
            state = {...state, fetching: true};
            return state;
        case END_PERMISSION_LIST:
            for (var item in action.json.permissionInfo) {
                if (action.json.permissionInfo[item] == "true") {
                    action.json.permissionInfo[item] = true
                } else if (action.json.permissionInfo[item] == "false") {
                    action.json.permissionInfo[item] = false
                }
            }
            console.log(action.json)
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function permissionSave(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_PERMISSION_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_PERMISSION_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
