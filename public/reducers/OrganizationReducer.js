/**
 * Created by Captain on 2017/3/12.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    ORGANIZATION_LIST_START, ORGANIZATION_LIST_END,ORGANIZATION_UPDATE_START,ORGANIZATION_UPDATE_END
} from '../constants/index'

export function getOrganizationList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case ORGANIZATION_LIST_START:
            state = {...state, fetching: true};
            return state;
        case ORGANIZATION_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getOrganizationDetail(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case ORGANIZATION_UPDATE_START:
            state = {fetching: true};
            return state;
        case ORGANIZATION_UPDATE_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}