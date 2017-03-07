/**
 * Created by Captain on 2017/3/6.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    CORRECTION_LIST_START, CORRECTION_LIST_END
} from '../constants/index'

export function getCorrectionList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case CORRECTION_LIST_START:
            state = {...state, fetching: true};
            return state;
        case CORRECTION_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}