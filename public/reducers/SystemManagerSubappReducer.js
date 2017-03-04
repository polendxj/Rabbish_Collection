/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes,videoCodes} from '../components/Tool/Tool'
import {
    START_SUBAPP_LIST,
    END_SUBAPP_LIST,
    START_SUBAPP_SAVE,
    END_SUBAPP_SAVE,
    START_SUBAPP_DETAIL,
    END_SUBAPP_DETAIL,
    END_APP_LIST
} from '../constants/index'

export function getSysManagerSubappList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_SUBAPP_LIST:
            state = {...state, fetching: true};
            return state;
        case END_SUBAPP_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function subappSave(state = {data: {}, fetching: false,appList:[]}, action) {
    switch (action.type) {
        case START_SUBAPP_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_SUBAPP_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        case END_APP_LIST:
            state = {appList: action.json};
            return state;
        default:
            return state;
    }
}


export function subappDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_SUBAPP_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_SUBAPP_DETAIL:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}
