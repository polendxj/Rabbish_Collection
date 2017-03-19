/**
 * Created by Captain on 2017/3/6.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    ADMINUSER_LIST_START, ADMINUSER_LIST_END,ADMINUSER_UPDATE_START,ADMINUSER_UPDATE_END
} from '../constants/index'

export function getAdminUserList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case ADMINUSER_LIST_START:
            state = {...state, fetching: true};
            return state;
        case ADMINUSER_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getAdminUserDetail(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case ADMINUSER_UPDATE_START:
            state = {fetching: true};
            return state;
        case ADMINUSER_UPDATE_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}