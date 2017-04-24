import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import Header from '../components/header/header'
import {changeTopMenu, changeLeftMenu} from '../actions/MenuAction'
import MainMenu from '../components/left/menu'
import Login from './Login'
import ForgetPassword from './ForgetPassword'
import {commonRefresh} from '../actions/Common'
import {login,saveObject} from '../actions/CommonActions';
import Home from '../containers/Home';

import {EncodeBase64, ErrorModal, deleteCookie, Loading,ListMiddleModal} from '../components/Tool/Tool'
var sha1 = require('js-sha1');

class App extends Component {
    constructor(props) {
        super(props);
        this._changeTopMenu = this._changeTopMenu.bind(this);
        this._checkAuth = this._checkAuth.bind(this);
        this._logOut = this._logOut.bind(this);
        this._modifyPwd = this._modifyPwd.bind(this);
        this._showModal = this._showModal.bind(this);
        this._changeLang = this._changeLang.bind(this);
        this.loadingLang = 2;
        // Current_Lang = window.navigator.language.indexOf("CN") >= 0 ? CN_Lang : EN_Lang;
        Current_Lang = CN_Lang;
    }

    _changeTopMenu(menu) {
        sessionStorage["currentMenu"] = menu;
        this.props.dispatch(changeTopMenu(menu))
    }

    _changeLang(type) {
        this.loadingLang = 1;
        switch (type) {
            case "CN":
                Current_Lang = CN_Lang;
                break;
            case "EN":
                Current_Lang = EN_Lang;
                break;
            case "KO":
                Current_Lang = KO_Lang;
                break;
        }
        this.props.dispatch(commonRefresh());

        setTimeout(function () {
            this.loadingLang = 0;
            this.props.dispatch(commonRefresh());
        }.bind(this), 1000)
    }

    _checkAuth(params) {
        this.props.dispatch(login(params, "", "", user_login, "/dashboard"));
    }

    _logOut() {
        sessionStorage['token'] = "";
        sessionStorage['check'] = false;
        deleteCookie("JSESSIONID");

        browserHistory.push('/login')
    }
    _showModal(){
        this.props.dispatch(commonRefresh());
    }
    _modifyPwd(){
        var params = {
            phone: sessionStorage['phone'],
            type: parseInt(sessionStorage['type']),
            password: sha1.hex($("#password").val()),
        };
        if($("#modifyPwdForm").validate().form()){
            this.props.dispatch(saveObject(params,"","",modify_password,"/login","update"));
        }
    }
    componentDidUpdate() {

    }

    componentDidMount() {
        this.props.dispatch(changeTopMenu(sessionStorage["currentMenu"] ? parseInt(sessionStorage["currentMenu"]) : 0))
        node_service = document.location.origin;
        // sessionStorage['check'] = "";
        sessionStorage['timeout_time'] = 0;
        $("#modifyPwdForm").validate({
            ignore: 'input[type=hidden], .select2-input', // ignore hidden fields
            errorClass: 'validation-error-label',
            successClass: 'validation-valid-label',
            highlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },

            validClass: "validation-valid-label",
            success: function(label) {
                label.addClass("validation-valid-label").text("Success.")
            },
            rules: {
                oldPassword: {
                    remote: {
                        url: "http://dev.xysy.tech:80/rsapp/user/login",
                        type: "post",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: JSON.stringify({
                            password: sha1.hex($("#oldPassword").val()),
                            phone: sessionStorage['phone'],
                            type: parseInt(sessionStorage['type'])
                        }),
                        dataFilter: function (data) {　　　　//判断控制器返回的内容
                            console.log("oldPwd",data);
                            if (data.status) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        }
                    }
                },
                password: {
                    minlength: 6
                },
                repeat_password: {
                    equalTo: "#password"
                }
            },
            messages: {
                oldPassword: {
                    required: "请填写原始密码！",
                    remote: "原始密码不正确,请重新填写！"　　　　//这个地方如果不写的话，是自带的提示内容，加上就是这个内容。
                },
                password: {
                    required: "请填写新密码",
                    minlength: "密码至少六位"
                },
                confirm_password: {
                    required: "请填写确认密码！",
                    equalTo: "两次输入密码不一致！"
                }
            },
        });

    }


    render() {
        // sessionStorage['auth']=""

        const {fetching}=this.props;
        var token = sessionStorage['token'];

        var result = "";
        var modifyPwdInfo =
            <form id="modifyPwdForm" className="form-horizontal">
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {"修改密码"}
                    </legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"输入原密码"}</label>
                        <div className="col-lg-9">
                            <input id="oldPassword" name="oldPassword" type="text" className="form-control" placeholder="输入原密码"
                                   autoComplete="off" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"输入新密码"}</label>
                        <div className="col-lg-9">
                            <input id="password" name="password" type="text" className="form-control" placeholder="输入新密码"
                                   autoComplete="off" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"确认密码"}</label>
                        <div className="col-lg-9">
                            <input id="confirmPassword" name="confirmPassword" type="text" className="form-control" placeholder="确认密码"
                                   autoComplete="off" required="required"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}></label>
                        <div className="col-lg-9">
                            <div className="text-right">
                                <button type="button" className="btn btn-primary" onClick={this._modifyPwd}>{Current_Lang.label.save}
                                </button>
                            </div>
                        </div>
                    </div>


                </fieldset>
            </form>;
        if (token) {
            if (this.loadingLang == 2 || this.loadingLang == 0) {
                result =
                    <div>
                        <Header _changeLang={this._changeLang} changeTopMenu={this._changeTopMenu}
                                _logOut={this._logOut} _showModal={this._showModal}/>
                        <ContentPanel selected={this.props.selected} dispatch={this.props.dispatch}
                                      breadCrumbs={this.props.breadCrumbs} children={this.props.children}/>
                    </div>
            } else {
                result =
                    <div>
                        <Header _changeLang={this._changeLang} changeTopMenu={this._changeTopMenu}
                                _logOut={this._logOut} _showModal={this._showModal}/>
                    </div>
            }

        } else {
            // if(document.location.pathname!="/"){
            if(document.location.pathname=="/forgetPassword"){
                result = <ForgetPassword />
            }else{
                result = <Login _checkAuth={this._checkAuth} fetching={fetching}/>
            }
            // }
            // else{
            //     result = <Home />
            // }
        }
        return (
            <div>
                {result}
                <ListMiddleModal id="modifyPwdModal" content={modifyPwdInfo}
                                 doAction={""}
                                 tip={"修改密码"} actionText="修改密码" hide="true" hideCancel="true"/>
            </div>
        )
    }
}

class ContentPanel extends Component {
    constructor(props) {
        super(props)
        this._changeLeftMenu = this._changeLeftMenu.bind(this);
    }

    _changeLeftMenu(menuArr) {
        this.props.dispatch(changeLeftMenu(menuArr))
    }

    render() {
        const {fetching, data}=this.props;
        var auth = sessionStorage['auth'];
        return (
            <div className="page-container" style={{height: "2000px"}}>
                <div className="page-content" style={{backgroundColor: "white"}}>
                    <div className="sidebar sidebar-main"
                         style={{borderRight: 'thin #F5F5F5 solid', width: this.props.selected != "" ? "200px" : 0}}>
                        <MainMenu selected={this.props.selected} _changeLeftMenu={this._changeLeftMenu}/>
                    </div>
                    <div className="content-wrapper">
                        {this.props.children}
                        <div className="footer text-muted" style={{
                            position: 'fixed',
                            bottom: '0',
                            backgroundColor: '#FCFCFC',
                            padding: '5px',
                            width: '100%'
                        }}>
                            <div style={{float: 'left', marginLeft: '14px'}}>
                                ⓒ 2017. <span style={{color: '#193153'}}>Copyright Powered</span> by <span
                                style={{color: '#193153'}}>ReuseSorting Co., Ltd. All Rights Reserved.</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {changeTopMenu, changeLeftMenu, login, commonReducer}=state
    return {
        selected: changeTopMenu.topSelected,
        breadCrumbs: changeLeftMenu.breadCrumbs,
        login: login.fetching,
        data: login.data,
        refresh: commonReducer.refresh,
    }
}

export default connect(mapStateToProps)(App)