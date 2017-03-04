/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    START_CSE_GROUP_LIST,
    END_CSE_GROUP_LIST,
    START_CSE_GROUP_SAVE,
    END_CSE_GROUP_SAVE,
    START_CSE_GROUP_DETAIL,
    END_CSE_GROUP_DETAIL,
    START_GROUP_CSE_LIST,
    END_GROUP_CSE_LIST
} from '../constants/index'

export function getSysManagerCSEGroupList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_CSE_GROUP_LIST:
            state = {fetching: true};
            return state;
        case END_CSE_GROUP_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function getCSEOfGroupList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_GROUP_CSE_LIST:
            state = {fetching: true};
            return state;
        case END_GROUP_CSE_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function cseGroupSave(state = {data: {}, fetching: false, areaList: []}, action) {
    switch (action.type) {
        case START_CSE_GROUP_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_CSE_GROUP_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function cseGroupDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_CSE_GROUP_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_CSE_GROUP_DETAIL:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}
