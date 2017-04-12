/**
 * Created by Captain on 2017/3/6.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    STATISTICBYCLASSIFY_LIST_START, STATISTICBYCLASSIFY_LIST_END,
    STATISTICBYDETAIL_LIST_START, STATISTICBYDETAIL_LIST_END,
    STATISTICBYCITY_LIST_START,STATISTICBYCITY_LIST_END,
    STATISTICBYORGANIZATION_LIST_START,STATISTICBYORGANIZATION_LIST_END,
    STATISTICBYRANGEDATE_LIST_START,STATISTICBYRANGEDATE_LIST_END,
    STATISTIC_SETTLEMENT_START,STATISTIC_SETTLEMENT_END,
    STATISTIC_TOTAL_START,STATISTIC_TOTAL_END
} from '../constants/index'

export function getStatisticByClassifyList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case STATISTICBYCLASSIFY_LIST_START:
            state = {...state, fetching: true};
            return state;
        case STATISTICBYCLASSIFY_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getStatisticByDetailList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case STATISTICBYDETAIL_LIST_START:
            state = {...state, fetching: true};
            return state;
        case STATISTICBYDETAIL_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getStatisticByCityList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case STATISTICBYCITY_LIST_START:
            state = {...state, fetching: true};
            return state;
        case STATISTICBYCITY_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getStatisticByOrganizationList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case STATISTICBYORGANIZATION_LIST_START:
            state = {...state, fetching: true};
            return state;
        case STATISTICBYORGANIZATION_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getStatisticByRangeDateList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case STATISTICBYRANGEDATE_LIST_START:
            state = {...state, fetching: true};
            return state;
        case STATISTICBYRANGEDATE_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getStatisticSettlementDate(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case STATISTIC_SETTLEMENT_START:
            state = {...state, fetching: true};
            return state;
        case STATISTIC_SETTLEMENT_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getStatisticByTotalList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case STATISTIC_TOTAL_START:
            state = {...state, fetching: true};
            return state;
        case STATISTIC_TOTAL_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}