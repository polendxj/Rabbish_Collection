/**
 * Created by Captain on 2017/3/6.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    GENERALUSER_LIST_START, GENERALUSER_LIST_END,GENNERALUSER_DETAIL_START,GENNERALUSER_DETAIL_END
} from '../constants/index'

export function getGeneralUserList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case GENERALUSER_LIST_START:
            state = {...state, fetching: true};
            return state;
        case GENERALUSER_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getGeneralUserDetail(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case GENNERALUSER_DETAIL_START:
            state = {...state, fetching: true};
            return state;
        case GENNERALUSER_DETAIL_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}