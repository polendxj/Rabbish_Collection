/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {CHANGE_SEARCH1_TYPE} from '../constants/index'

export function changeSearch1Type(state = {selected: {key:'ALL',value:'查看全部'}}, action) {
    switch (action.type) {
        case CHANGE_SEARCH1_TYPE:
            state = {selected: action.item};
            return state;
        default:
            return state;
    }
}
// export {changeTopMenu}
