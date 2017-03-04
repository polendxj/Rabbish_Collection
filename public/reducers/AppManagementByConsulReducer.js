/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    START_APP_BY_CONSUL_LIST,
    END_APP_BY_CONSUL_LIST,
    START_APP_BY_CONSUL_DETAIL,
    END_APP_BY_CONSUL_DETAIL
} from '../constants/index'

export function getAppByConsulList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case START_APP_BY_CONSUL_LIST:
            state = {fetching: true};
            return state;
        case END_APP_BY_CONSUL_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function getAppByConsulDetail(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case START_APP_BY_CONSUL_DETAIL:
            state = {fetching: true};
            return state;
        case END_APP_BY_CONSUL_DETAIL:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
