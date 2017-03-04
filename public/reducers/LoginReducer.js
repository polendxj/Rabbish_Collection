/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {START_LOGIN, END_LOGIN} from '../constants/index'

export function login(state = {fetching: false, data: {}}, action) {
    switch (action.type) {
        case START_LOGIN:
            state = {...state, fetching: true};
            return state;
            break;
        case END_LOGIN:
            state = {fetching: false, data: action.data};
            return state;
            break;
        default:
            return state;
    }
}

// export {changeTopMenu}