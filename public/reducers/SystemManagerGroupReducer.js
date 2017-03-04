/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {
    START_GROUP_LIST,
    END_GROUP_LIST,
    START_GROUP_DETAIL,
    START_GROUP_SAVE,
    END_GROUP_DETAIL,
    END_GROUP_SAVE,
    END_AREA_APP_LIST,
    END_ADD_AREA_APP_ITEM
} from '../constants/index'

export function groupList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_GROUP_LIST:
            state = {...state, fetching: true};
            return state;
        case END_GROUP_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function groupSave(state = {data: {}, fetching: false, items: 1}, action) {
    switch (action.type) {
        case START_GROUP_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_GROUP_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        case END_AREA_APP_LIST:
            state = {data: action.json, fetching: false};
            return state;
        case END_ADD_AREA_APP_ITEM:
            state = {...state, items: action.count};
            return state;
        default:
            return state;
    }
}

export function groupDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_GROUP_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_GROUP_DETAIL:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}
