/**
 * Created by Administrator on 2016/8/19.
 */
import {START_LOGIN, END_LOGIN} from '../constants/index'
import {browserHistory} from 'react-router'
import fetch from 'isomorphic-fetch'
import {ErrorModal, deleteCookie} from '../components/Tool/Tool'


export function login(data) {
    return dispatch=> {
        deleteCookie("JSESSIONID");
        dispatch(startLogin())
        sessionStorage['check'] = true;
        sessionStorage['auth'] = "Jabriel";
        sessionStorage['rules'] = "Admin";
        sessionStorage['adminId'] = "Jabriel";


        browserHistory.push('/dashboard')
        dispatch(endLogin(json))
        // fetch(cs_login,
        //     {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded"
        //         },
        //         body: 'data=' + JSON.stringify(data)
        //     })
        //     .then(response=>response.json())
        //     .then(function (json) {
        //         if (json.result == 'SUCCESS') {
        //             sessionStorage['check'] = true;
        //             sessionStorage['auth'] = json.admin.adminId;
        //             sessionStorage['rules'] = JSON.stringify(json.permission);
        //             sessionStorage['adminId'] = json.admin.adminId;
        //
        //             var date = new Date();
        //             date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
        //             var dateString = date.toUTCString();
        //             var cookieString = "JSESSIONID=" + json.sessionId + "; expires=" + dateString + "; path=/;";
        //             document.cookie = cookieString;
        //             console.log(document.cookie)
        //             browserHistory.push('/dashboard')
        //             dispatch(endLogin(json))
        //         } else {
        //             ErrorModal("错误","用户名或者密码不正确");
        //             sessionStorage['auth'] = ''
        //         }
        //     }).catch(function (ex) {
        // });
        dispatch(endLogin())
    }
}

function startLogin(menu) {
    return {
        type: START_LOGIN,
        menu
    }
}

function endLogin(data) {
    return {
        type: END_LOGIN,
        data
    }
}