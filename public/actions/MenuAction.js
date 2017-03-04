/**
 * Created by Administrator on 2016/8/19.
 */
import {CHANGE_TOP_MENU,CHANGE_LEFT_MENU} from '../constants/index'

export function changeTopMenu(menu) {
    return {
        type: CHANGE_TOP_MENU,
        menu
    }
}

export function changeLeftMenu(menuArr) {
    return {
        type:CHANGE_LEFT_MENU,
        menuArr
    }
}