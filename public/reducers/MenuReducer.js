/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {CHANGE_TOP_MENU, CHANGE_LEFT_MENU} from '../constants/index'

export function changeTopMenu(state = {topSelected: 0}, action) {
    switch (action.type) {
        case CHANGE_TOP_MENU:
            state = {topSelected: action.menu};
            return state;
            break;
        default:
            return state;
    }
}

export function changeLeftMenu(state = {breadCrumbs: []}, action) {
    switch (action.type) {
        case CHANGE_LEFT_MENU:
            state = {breadCrumbs: action.menuArr};
            return state;
            break;
        default:
            return state;
    }
}

// export {changeTopMenu}