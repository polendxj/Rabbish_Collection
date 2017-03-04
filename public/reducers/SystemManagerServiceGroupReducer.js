/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    START_Service_GROUP_LIST,
    END_Service_GROUP_LIST,
    START_Service_GROUP_SAVE,
    END_Service_GROUP_SAVE,
    START_Service_GROUP_DETAIL,
    END_Service_GROUP_DETAIL
} from '../constants/index'

export function getSysManagerServiceGroupList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_Service_GROUP_LIST:
            state = {fetching: true};
            return state;
        case END_Service_GROUP_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function serviceGroupSave(state = {data: {}, fetching: false, areaList: []}, action) {
    switch (action.type) {
        case START_Service_GROUP_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_Service_GROUP_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function serviceGroupDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_Service_GROUP_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_Service_GROUP_DETAIL:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}
