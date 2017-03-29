/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {deleteCookie,array2Json} from '../components/Tool/Tool'
var sha1 = require('js-sha1');

export default class LoginContainer extends Component {
    _checkAuth() {
        var formFields = $("#loginForm").serializeArray();
        var params = array2Json(formFields);
        console.log(params);
        var password = sha1.hex(params.password.toString());
        console.log(password);
        params.password = password;
        this.props._checkAuth(params)
    }

    componentDidMount() {
        deleteCookie("JSESSIONID");
    }

    render() {
        return (
            <div className="page-container login-container" style={{minHeight: '533px'}}>

                <div className="page-content">

                    <div className="content-wrapper">

                        <div className="content">

                            <form id="loginForm" action="index.html">
                                <div className="panel panel-body login-form">
                                    <div className="text-center">
                                        <img src="../assets/images/logo_login.png"/>
                                        <h5 className="content-group">
                                            流化平台管理系统
                                        </h5>
                                    </div>

                                    <div className="form-group has-feedback has-feedback-left">
                                        <input id="phone" name="phone" type="text" className="form-control"
                                               placeholder="输入手机号"/>
                                        <div className="form-control-feedback">
                                            <i className="icon-user text-muted"></i>
                                        </div>
                                    </div>

                                    <div className="form-group has-feedback has-feedback-left">
                                        <input id="userPassword" name="password" type="password"
                                               className="form-control" placeholder="输入密码"/>
                                        <div className="form-control-feedback">
                                            <i className="icon-lock2 text-muted"></i>
                                        </div>
                                    </div>
                                    <div className="form-group has-feedback has-feedback-left">
                                        <select className="form-control" name="type">
                                            <option value={1}>{"管理员"}</option>
                                            <option value={10}>{"超级管理员"}</option>
                                        </select>
                                        <div className="form-control-feedback">
                                            <i className="icon-vcard text-muted"></i>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button type="button" disabled={this.props.fetching}
                                                className="btn btn-primary btn-block"
                                                onClick={this._checkAuth.bind(this)}>登 录 <i
                                            className="icon-circle-right2 position-right"></i></button>
                                    </div>

                                    <div className="text-center">
                                        <a href="login_password_recover.html">忘记密码?</a>
                                    </div>
                                </div>
                            </form>


                            <div className="footer text-muted">
                                © 2015. <a href="#">CS Management</a> by <a
                                href="http://themeforest.net/user/Kopyov" target="_blank">Entrix, V_0.8.3.1.20</a>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    // const {changeSearch1Type, form, getSysManagerSOList}=state
    return {
        // selected: changeSearch1Type.selected,
        // form: form,
        // fetching: getSysManagerSOList.fetching,
        // data: getSysManagerSOList.data
    }
}


export default connect(mapStateToProps)(LoginContainer)