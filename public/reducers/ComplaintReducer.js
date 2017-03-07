/**
 * Created by Captain on 2017/3/6.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    COMPLAINT_LIST_START, COMPLAINT_LIST_END
} from '../constants/index'

export function getComplaintList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case COMPLAINT_LIST_START:
            state = {...state, fetching: true};
            return state;
        case COMPLAINT_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}