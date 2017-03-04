/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes,videoCodes} from '../components/Tool/Tool'
import {
    START_SED_LIST,
    END_SED_LIST,
    START_SED_SAVE,
    END_SED_SAVE,
    START_SED_DETAIL,
    END_SED_DETAIL,
    END_AREA_LIST
} from '../constants/index'

export function getSysManagerSEDList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_SED_LIST:
            state = {...state, fetching: true};
            return state;
        case END_SED_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function sedSave(state = {data: {}, fetching: false,areaList:[]}, action) {
    switch (action.type) {
        case START_SED_LIST:
            state = {...state, fetching: true};
            return state;
        case END_SED_LIST:
            state = {data: action.json, fetching: false};
            return state;
        case END_AREA_LIST:
            state = {areaList:action.json};
            return state;
        default:
            return state;
    }
}

export function sedDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_SED_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_SED_DETAIL:

            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}
