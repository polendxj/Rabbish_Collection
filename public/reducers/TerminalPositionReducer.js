/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    START_TERMINAL_LIST,
    END_TERMINAL_LIST,
    START_TERMINAL_SAVE,
    END_TERMINAL_SAVE,
    START_TERMINAL_DETAIL,
    END_TERMINAL_DETAIL
} from '../constants/index'

export function getTerminalPositionList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_TERMINAL_LIST:
            state = {fetching: true};
            return state;
        case END_TERMINAL_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function terminalPositionSave(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_TERMINAL_SAVE:
            state = {fetching: true};
            return state;
        case END_TERMINAL_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function terminalPositionDetail(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case START_TERMINAL_DETAIL:
            state = {fetching: true};
            return state;
        case END_TERMINAL_DETAIL:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}