/**
 * Created by Captain on 2017/3/6.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    CLASSCONF_LIST_START, CLASSCONF_LIST_END,CLASSCONF_UPDATE_START,CLASSCONF_UPDATE_END
} from '../constants/index'

export function getClassConfList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case CLASSCONF_LIST_START:
            state = {...state, fetching: true};
            return state;
        case CLASSCONF_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function getClassConfDetail(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case CLASSCONF_UPDATE_START:
            state = {fetching: true};
            return state;
        case CLASSCONF_UPDATE_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}