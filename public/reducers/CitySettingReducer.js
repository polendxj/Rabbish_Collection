/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes, DecodeBase64} from '../components/Tool/Tool'
import {
    CITY_LIST_START, CITY_LIST_END, CITY_ORGANIZATION_LIST_START,CITY_ORGANIZATION_LIST_END
} from '../constants/index'

export function getCityList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case CITY_LIST_START:
            state = {...state, fetching: true};
            return state;
        case CITY_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}
export function getCityOfOrganizationList(state = {data: "", fetching: false}, action) {
    switch (action.type) {
        case CITY_ORGANIZATION_LIST_START:
            state = {...state, fetching: true};
            return state;
        case CITY_ORGANIZATION_LIST_END:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}


