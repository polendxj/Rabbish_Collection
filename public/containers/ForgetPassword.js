/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {commonRefresh} from '../actions/Common';
import {saveObject,getAuthcode} from '../actions/CommonActions';
import {ErrorModal,array2Json} from '../components/Tool/Tool'
var sha1 = require('js-sha1');

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.interValObj = "";
        this._sendMessage = this._sendMessage.bind(this);
        this._resetPassword = this._resetPassword.bind(this);
    }
    componentDidMount() {
        if(sessionStorage['messageTime']!=""){
            var duringTime = new Date().getTime()-sessionStorage['messageTime'];
            if(duringTime < 30*1000){
                sessionStorage['count'] = Math.round((30*1000 - duringTime)/1000);
                $("#btnSendCode").attr("disabled", "true");
                $("#btnSendCode").text(sessionStorage['count'] + "秒后重新发送");
                this.interValObj = setInterval(this.setRemainTime, 1000);
            }
        }
    }
    componentWillUnmount(){
        clearInterval(this.interValObj);//停止计时器
        sessionStorage['messageTime'] = "";
        $("#btnSendCode").removeAttr("disabled");//启用按钮
    }
    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }
    _redirect(){
        browserHistory.push("/login");
    }
    _resetPassword() {
        var formFields = $("#forgetPasswordForm").serializeArray();
        var params = array2Json(formFields);
        params.password = sha1.hex("123456");
        console.log(params);
        this.props.dispatch(saveObject(params, "", "", reset_password, "/login", "update"));
    }
    _sendMessage() {
        var phone = $("#phone").val();
        if(phone){
            if(/^1[34578]\d{9}$/.test(phone)){
                var count = 30;
                sessionStorage['count'] = count;
                sessionStorage['messageTime'] = new Date().getTime();
                $("#btnSendCode").attr("disabled", "true");
                $("#btnSendCode").text(sessionStorage['count'] + "秒后重新发送");
                this.interValObj = setInterval(this.setRemainTime, 1000);
                var params = {
                    phone: phone
                };
                this.props.dispatch(getAuthcode(params, "", "", get_authcode));
            }else{
                ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + "手机号码格式不对！");
            }
        }else{
            ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + "手机号码不能为空！");
        }
    }
    setRemainTime() {
        var curCount = sessionStorage['count'];
        if(document.location.pathname!="/forgetPassword"){
            clearInterval(this.interValObj);//停止计时器
            $("#btnSendCode").text("获取验证码");
        }else{
            if (curCount == 0) {
                clearInterval(this.interValObj);//停止计时器
                $("#btnSendCode").removeAttr("disabled");//启用按钮
                $("#btnSendCode").text("重新发送验证码");
            }
            else {
                curCount--;
                sessionStorage['count'] = curCount;
                $("#btnSendCode").text(curCount + "秒后重新发送");
            }
        }
    }
    render() {
        return (
            <div className="page-container login-container" style={{minHeight: '533px'}}>

                <div className="page-content">

                    <div className="content-wrapper">

                        <div className="content">

                            <form id="forgetPasswordForm" action="index.html">
                                <div className="panel panel-body login-form">
                                    <div className="text-center">
                                        <div className="icon-object border-warning text-warning"><i className="icon-spinner11"></i></div>
                                        <h5 className="content-group">密码重置</h5>
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
                                    <input type="text" id="phone" name="phone" className="form-control"
                                           placeholder="输入手机号" />
                                    <div className="input-group" style={{marginTop:"10px",marginBottom:"10px"}}>
                                        <input type="text" id="authcode" name="authcode" className="form-control"
                                               placeholder="输入验证码"/>
                                            <span className="input-group-btn">
                                                <button id="btnSendCode" className="btn bg-primary" type="button" onClick={this._sendMessage}>
                                                    获取验证码
                                                </button>
                                            </span>
                                    </div>
                                    <button style={{width:"45%",float:"left"}} type="button" id="btnSendCode" onClick={this._resetPassword} className="btn bg-blue">重置密码 <i className="icon-arrow-right14 position-left"></i></button>
                                    <button style={{width:"45%",float:"right"}} type="button" onClick={this._redirect} className="btn bg-blue">返回 <i className="icon-undo2 position-right"></i></button>
                                </div>
                            </form>

                            <div className="footer text-muted">
                                © 2015. <a href="#">CS Management</a> by <a
                                href="http://themeforest.net/user/Kopyov" target="_blank">ReuseSorting, V_0.8.3.1.20</a>
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


export default connect(mapStateToProps)(ForgetPassword)