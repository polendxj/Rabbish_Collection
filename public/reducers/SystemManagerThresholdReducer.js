/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {audioCodes, videoCodes} from '../components/Tool/Tool'
import {
    START_THRESHOLD_LIST,
    END_THRESHOLD_LIST,
    START_THRESHOLD_SAVE,
    END_THRESHOLD_SAVE,
    START_THRESHOLD_DETAIL,
    END_THRESHOLD_DETAIL,
    END_THRESHOLD_STATUS_UPDATE
} from '../constants/index'

export function getSysManagerThresholdList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_THRESHOLD_LIST:
            state = {...state, fetching: true};
            return state;
        case END_THRESHOLD_LIST:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function thresholdSave(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_THRESHOLD_SAVE:
            state = {...state, fetching: true};
            return state;
        case END_THRESHOLD_SAVE:
            state = {data: action.json, fetching: false};
            return state;
        default:
            return state;
    }
}

export function thresholdDetail(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_THRESHOLD_DETAIL:
            state = {data: {}, fetching: true};
            return state;
        case END_THRESHOLD_DETAIL:
            var params = $.extend({}, action.json)
            if (params.thresholdVo.minorNotiYn == 'Y') {
                params.thresholdVo['minorNotiYn'] = true
            } else {
                params.thresholdVo['minorNotiYn'] = false
            }
            if (params.thresholdVo.majorNotiYn == 'Y') {
                params.thresholdVo['majorNotiYn'] = true
            } else {
                params.thresholdVo['majorNotiYn'] = false
            }
            if (params.thresholdVo.criticalNotiYn == 'Y') {
                params.thresholdVo['criticalNotiYn'] = true
            } else {
                params.thresholdVo['criticalNotiYn'] = false
            }
            if (params.thresholdVo.fatalNotiYn=='Y') {
                params.thresholdVo['fatalNotiYn'] = true
            }else{
                params.thresholdVo['fatalNotiYn'] = false
            }
            state = {
                fetching: false,
                data: params
            };
            return state;
        default:
            return state;
    }
}
