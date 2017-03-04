/**
 * Created by Administrator on 2016/8/19.
 */
import {
    START_JOB_HISTORY_LIST,
    END_JOB_HISTORY_LIST
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {ErrorModal, SuccessModal} from '../components/Tool/Tool'


export function getJobHistoryList(startRow, searchColumn, searchValue) {
    return dispatch=> {
        dispatch(startFetch(START_JOB_HISTORY_LIST))
        fetch(job_history_list,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify({
                    startRow: startRow * page_size,
                    endRow: page_size,
                    page: '',
                    searchColumn: searchColumn,
                    searchValue: searchValue,
                    sortColumn: 'JOB_DATE',
                    orderType: 'ASC'
                })
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(END_JOB_HISTORY_LIST, json)))
    }
}

function startFetch(type) {
    return {
        type: type
    }
}

function endFetch(type, json) {
    return {
        type: type,
        json
    }
}
