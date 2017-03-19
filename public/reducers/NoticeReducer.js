/**
 * Created by Captain on 2017/3/6.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    NOTICE_LIST_START, NOTICE_LIST_END
} from '../constants/index'

export function getNoticeList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case NOTICE_LIST_START:
            state = {...state, fetching: true};
            return state;
        case NOTICE_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}