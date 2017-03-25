/**
 * Created by Captain on 2017/3/6.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    OPERATION_MONITOR_START, OPERATION_MONITOR_END,OPERATION_ORGANIZATION_START,OPERATION_ORGANIZATION_END
} from '../constants/index'

export function getOperationMonitor(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case OPERATION_MONITOR_START:
            state = {...state, fetching: true};
            return state;
        case OPERATION_MONITOR_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getOrganizationMonitor(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case OPERATION_ORGANIZATION_START:
            state = {...state, fetching: true};
            return state;
        case OPERATION_ORGANIZATION_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}