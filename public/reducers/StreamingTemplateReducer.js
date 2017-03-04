/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    START_STREAMING_TEMPLATE_DETAIL,
    END_STREAMING_TEMPLATE_DETAIL,
    START_STREAMING_TEMPLATE_LIST,
    END_STREAMING_TEMPLATE_LIST
} from '../constants/index'

export function getStreamingTemplateList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case START_STREAMING_TEMPLATE_LIST:
            state = {fetching: true};
            return state;
        case END_STREAMING_TEMPLATE_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function getStreamingTemplateDetail(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case START_STREAMING_TEMPLATE_DETAIL:
            state = {fetching: true};
            return state;
        case END_STREAMING_TEMPLATE_DETAIL:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
