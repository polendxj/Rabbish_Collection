/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {
    START_GET_SYS_MANAGER_SO_LIST,
    END_GET_SYS_MANAGER_SO_LIST,
    START_SAVE_SO,
    END_SAVE_SO,
    START_DETAIL_SO,
    END_DETAIL_SO
} from '../constants/index'

export function getSysManagerSOList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_GET_SYS_MANAGER_SO_LIST:
            state = {...state, fetching: true};
            return state;
        case END_GET_SYS_MANAGER_SO_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function soSave(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_SAVE_SO:
            state = {...state, fetching: true};
            return state;
        case END_SAVE_SO:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function soDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_DETAIL_SO:
            state = {data: {}, fetching: true};
            return state;
        case END_DETAIL_SO:
            var temp = {}
            console.log(action.json)
            temp['so_id'] = action.json.areaVo.areaId
            temp['so_name'] = action.json.areaVo.areaName
            temp['so_keyword'] = action.json.areaVo.soKeyword
            state = {fetching: false, data: temp};
            return state;
        default:
            return state;
    }
}
