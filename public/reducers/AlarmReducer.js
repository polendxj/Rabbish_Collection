/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes,videoCodes} from '../components/Tool/Tool'
import {
    END_ALARM_HISTORY_LIST
} from '../constants/index'

export function getAlarmHistoryList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case END_ALARM_HISTORY_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

