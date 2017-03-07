/**
 * Created by Captain on 2017/3/7.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    MANUALRECORD_LIST_START, MANUALRECORD_LIST_END
} from '../constants/index'

export function getManualRecordList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case MANUALRECORD_LIST_START:
            state = {...state, fetching: true};
            return state;
        case MANUALRECORD_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}