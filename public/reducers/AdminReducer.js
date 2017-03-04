/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes,videoCodes,DecodeBase64} from '../components/Tool/Tool'
import {
    START_ADMIN_LIST,
    END_ADMIN_LIST,
    START_ADMIN_SAVE,
    END_ADMIN_SAVE,
    START_ADMIN_DETAIL,
    END_ADMIN_DETAIL
} from '../constants/index'

export function getAdminList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_ADMIN_LIST:
            state = {...state, fetching: true};
            return state;
        case END_ADMIN_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function adminSave(state = {data: {}, fetching: false,areaList:[]}, action) {
    switch (action.type) {
        case START_ADMIN_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_ADMIN_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function adminDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_ADMIN_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_ADMIN_DETAIL:
            var result=$.extend(true,{},action.json);
            result.adminVo.adminPwd=DecodeBase64(result.adminVo.adminPwd);
            result.adminVo["adminPwd2"]=result.adminVo.adminPwd;
            state = {fetching: false, data:result};
            return state;
        default:
            return state;
    }
}
