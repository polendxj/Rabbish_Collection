/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes,videoCodes} from '../components/Tool/Tool'
import {
    END_JOB_HISTORY_LIST,
    START_JOB_HISTORY_LIST
} from '../constants/index'

export function getJobHistoryList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_JOB_HISTORY_LIST:
            state = {...state, fetching: true};
            return state;
        case END_JOB_HISTORY_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}