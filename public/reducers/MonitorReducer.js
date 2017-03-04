/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {START_SERVER_RESOURCE_LIST,END_SERVER_RESOURCE_LIST} from '../constants/index'

export function serverResourceList(state = {fetching: false, data: {}}, action) {
    switch (action.type) {
        case START_SERVER_RESOURCE_LIST:
            state = {...state, fetching: true};
            return state;
            break;
        case END_SERVER_RESOURCE_LIST:
            state = {fetching: false, data: action.json};
            return state;
            break;
        default:
            return state;
    }
}

// export {changeTopMenu}