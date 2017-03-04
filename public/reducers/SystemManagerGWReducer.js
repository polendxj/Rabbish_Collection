/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    START_GW_LIST,
    END_GW_LIST,
    START_GW_SAVE,
    END_GW_SAVE,
    START_GW_DETAIL,
    END_GW_DETAIL,
    END_GW_STATUS_UPDATE
} from '../constants/index'

export function getSysManagerGWList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_GW_LIST:
            state = {fetching: true};
            return state;
        case END_GW_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function gwSave(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_GW_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_GW_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function gwDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_GW_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_GW_DETAIL:
            var params = $.extend({}, action.json.detail.gatewayVo)
            params['config']=action.json.config.config
            params['stat']=action.json.stat
            state = {fetching: false, data: params};
            return state;
        default:
            return state;
    }
}
