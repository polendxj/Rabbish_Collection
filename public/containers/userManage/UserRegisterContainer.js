/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {array2Json} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {ORGANIZATION_LIST_START, ORGANIZATION_LIST_END} from '../../constants/index.js';
import {getListByMutilpCondition, saveObject,getAuthcode} from '../../actions/CommonActions';
var sha1 = require('js-sha1');

export default class UserRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "用户管理", link: ''},
            {text: "用户注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text: "返回用户列表", action: "/CustomerService/UserManage"}
        ];
        this._save = this._save.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
    }

    componentDidMount() {
        var params = {page: 0, size: 10000};
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
    }

    _save(params) {
        this.props.dispatch(saveObject(params, "", "", generalUser_register, "/CustomerService/UserManage"));
    }

    _sendMessage(phone) {
        var params = {
            phone: phone
        };
        this.props.dispatch(getAuthcode(params, "", "", get_authcode));
    }

    render() {
        const {data}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <RegisterUserComponent data={data}
                                           _save={this._save}
                                           _sendMessage={this._sendMessage}/>

                </div>
            </div>
        )
    }
}

class RegisterUserComponent extends Component {
    constructor(props) {
        super(props);
        this.interValObj = "";
        this._save = this._save.bind(this);
        this._uploadImg = this._uploadImg.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
    }

    _uploadImg() {
        $('#file-input').fileinput('upload');
    }

    _save(imgUrl) {
        console.log("imgUrl", imgUrl);
        var formFields = $("#generalUserForm").serializeArray();
        var params = array2Json(formFields);
        var password = sha1.hex(params.password);
        params.password = password;
        params.headimg = imgUrl;
        this.props._save(params);
    }

    _sendMessage() {
        var phone = sessionStorage['phone'];
        var count = 30;
        sessionStorage['count'] = count;
        sessionStorage['messageTime'] = new Date().getTime();
        console.log("phone", phone);
        $("#btnSendCode").attr("disabled", "true");
        $("#btnSendCode").text(sessionStorage['count'] + "秒后重新发送");
        this.interValObj = setInterval(this.setRemainTime, 1000);
        this.props._sendMessage(phone);
    }
    setRemainTime() {
        var curCount = sessionStorage['count'];
        if (curCount == 0) {
            clearInterval(this.interValObj);//停止计时器
            $("#btnSendCode").removeAttr("disabled");//启用按钮
            $("#btnSendCode").text("重新发送验证码");
        }
        else {
            curCount--;
            sessionStorage['count'] = curCount;
            console.log(sessionStorage['count']);
            $("#btnSendCode").text(curCount + "秒后重新发送");
        }
    }

    componentDidMount() {
        var self = this;
        $('#file-input').fileinput({
            uploadUrl: 'http://dev.xysy.tech/rsapp/file/headimg',
            language: 'zh',
            showUpload: false,
            showPreview: false,
            browseIcon: '<i class="icon-folder-open"></i>&nbsp;',
            removeIcon: '<i class="icon-trash"></i>',
            enctype: 'multipart/form-data',
            allowedFileExtensions: ['jpg', 'png', 'gif']
        });
        $('#file-input').on("fileuploaded", function (event, data) {
            console.log("img", data);
            if (data.response && data.response.status) {
                self._save(data.response.data);
            }
        });
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
    }

    render() {
        const {data}=this.props;
        console.log("orgina", data);
        const options = [];
        if (data) {
            if (data.status) {
                data.data.content.forEach(function (val, key) {
                    options.push(
                        <option key={"option" + key} value={val.id}>{val.name}</option>
                    )
                })
            }
        }
        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form id="generalUserForm" className="form-horizontal" encType="multipart/form-data">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"用户基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"用户类型"}</label>
                                    <div className="col-lg-6">
                                        <select className="form-control" name="type" defaultValue={3}>
                                            <option value={3}>{"商户用户"}</option>
                                            <option value={4}>{"住宅用户"}</option>
                                            <option value={5}>{"机关单位、学校"}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"单位、小区"}</label>
                                    <div className="col-lg-6">
                                        <select className="form-control" name="organizationid">
                                            {options}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                               marginTop: '8px'
                                           }}>{"真实姓名"}</label>
                                    <div className="col-lg-6">
                                        <input name="realName" type="text" className="form-control"
                                               placeholder={"真实姓名"}
                                               autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                               marginTop: '8px'
                                           }}>{"身份证号码"}</label>
                                    <div className="col-lg-6">
                                        <input name="idno" type="text" className="form-control"
                                               placeholder={"身份证号码"}
                                               autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                               marginTop: '8px'
                                           }}>{"头像URL"}</label>
                                    <div className="col-lg-6">
                                        <input type="file" name="file" id="file-input"
                                               multiple data-min-file-count="1"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"密码"}</label>
                                    <div className="col-lg-6">
                                        <input name="password" type="password" className="form-control"
                                               placeholder={"密码"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"确认密码"}</label>
                                    <div className="col-lg-6">
                                        <input id="confirmPassword" type="password" className="form-control"
                                               placeholder={"确认密码"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"手机号"}</label>
                                    <div className="col-lg-6">
                                        <input name="phone" type="text" className="form-control"
                                               placeholder={"手机号"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"地址"}</label>
                                    <div className="col-lg-6">
                                        <input name="address" type="text" className="form-control"
                                               placeholder={"地址"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"获取验证码"}</label>
                                    <div className="col-lg-6">
                                        <div className="input-group">
                                            <input type="text" name="authcode" className="form-control"
                                                   placeholder="输入验证码"/>
                                            <span className="input-group-btn">
                                                <button id="btnSendCode" className="btn bg-primary" type="button" onClick={this._sendMessage}>
                                                    获取验证码
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>

                            <div className="form-group">
                                <div className="col-lg-11 text-right" style={{marginTop: "50px"}}>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this._uploadImg.bind(this)}>{"保存"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const {getOrganizationList}=state;
    return {
        data: getOrganizationList.data
    }
}

export default connect(mapStateToProps)(UserRegisterContainer)