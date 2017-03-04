/**
 * Created by Administrator on 2016/8/19.
 */
import {CHANGE_SEARCH1_TYPE} from '../constants/index'

export function changeSearch1Type(item) {
    return {
        type: CHANGE_SEARCH1_TYPE,
        item
    }
}

