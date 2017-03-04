/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {
    START_FETCH,
    END_FETCH,
    START_CSR,
    CLOSE_CSR,
    END_FETCH_STATUS,
    START_SAVE_CSR,
    END_SAVE_CSR,
    START_DELETE_CSR,
    END_DELETE_CSR,
    END_DETAIL_CSR,
    START_DETAIL_CSR
} from '../constants/index'

export function getSysManagerCSRList(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_FETCH:
            state = {...state, fetching: true};
            return state;
        case END_FETCH:
            state = {data: action.json, fetching: false};
            return state;
        case START_CSR:
            state = {...state, fetching: true, index: action.index};
            return state;
        case END_FETCH_STATUS:
            if (action.json.result == 'SUCCESS') {
                console.log(state.data)
                // state.data.csrList[action.index].useYN = action.json.useYN
                var result = $.extend({}, state.data)
                result.csrList[action.index].useYN = action.json.useYN
                state = {data: result, fetching: false};
            } else {
                state = {...state, fetching: false};
            }
            return state;
        case END_DELETE_CSR:
            state = {...state, data: action.data};
            return state
        default:
            return state;
    }
}

export function createSysManagerCSR(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_SAVE_CSR:
            state = {...state, fetching: true};
            return state;
        case END_SAVE_CSR:
            state = {...state, fetching: true, data: action.data};
            return state;
        default:
            return state;
    }
}

export function detailSysManagerCSR(state = {data: {}, fetching: false}, action) {
    switch (action.type) {
        case START_DETAIL_CSR:
            state = {fetching:true, data: {}};
            return state;
        case END_DETAIL_CSR:
            var temp = {}
            temp['csr_name'] = action.data.csrVo.rssId
            temp['csr_ip'] = action.data.csrVo.serverIp
            temp['csr_port'] = action.data.csrVo.serverPort
            temp['csr_status'] = action.data.csrVo.useYN
            state = {...state, data: temp};
            return state;
        default:
            return state;
    }
}

// export {changeTopMenu}
