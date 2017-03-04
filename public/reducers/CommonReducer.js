/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    END_REFRESH,
    END_REALTIME_SESSIONS,
    START_REALTIME_SESSIONS_DETAIL,
    END_REALTIME_SESSIONS_DETAIL,
} from '../constants/index'

export function commonReducer(state = {refresh: false}, action) {
    switch (action.type) {
        case END_REFRESH:
            state = {refresh: !state.refresh};
            return state;
        default:
            return state;
    }
}

export function getMutipleConditoinList(state = {data: {}, fetching: false},action){
    switch (action.type){
        case END_REALTIME_SESSIONS:
            state = {fetching: false,data:action.json};
            return state;
        default:
            return state;
    }
}

export function getDetailSession(state = {data: {}, fetching: false},action){
    switch (action.type){
        case START_REALTIME_SESSIONS_DETAIL:
            state = {fetching: true};
            return state;
        case END_REALTIME_SESSIONS_DETAIL:
            state = {fetching: false,data:action.json};
            return state;
        default:
            return state;
    }
}
