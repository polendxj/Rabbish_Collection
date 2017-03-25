/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, ListModal, serverStatus, ErrorModal, DecodeBase64, streamingTemplateFilter} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {saveServiceGroup} from '../../actions/SystemManagerServiceGroupAction';
import {saveObject} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';
var sha1 = require('js-sha1');

export default class AdminUserRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "管理员管理", link: ''},
            {text: "管理员注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回管理员列表", action: "/CustomerService/AdminUserManage"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh=this._startRefresh.bind(this)
    }

    _startRefresh(){
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        this.props.dispatch(saveObject(params,"","",adminUser_register,"/CustomerService/AdminUserManage"));
    }

    render() {
        const {data, form,refresh}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <RegisterAdminUserComponent _save={this._save} _startRefresh={this._startRefresh}/>
                </div>
            </div>
        )
    }
}

class RegisterAdminUserComponent extends Component{
    constructor(props) {
        super(props);
        this._syncData = this._syncData.bind(this);
        this._save = this._save.bind(this);
        this._search = this._search.bind(this);
        this.initApp = [];
        this.selectedApp = "";
    }

    _search() {
        this.props._startRefresh();
    }

    _syncData() {
        this.selectedCSE = $.extend([], this.confirmSelected);

        this.props._startRefresh()
    }

    _save() {
        var params = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            password: sha1.hex($("#password").val()),
            type: $("#type").val(),
            authcode:""
        };
        this.props._save(params);
    }

    _appOnChange() {
        this.props._startRefresh();
    }

    componentDidMount() {
        $(".form-validate-jquery").validate({
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
                password: {
                    minlength: 5
                },
                repeat_password: {
                    equalTo: "#password"
                }
            }
        });
    }

    render() {
        const {allCSE, cseGroup, appList, streamingTemplate}=this.props;
        var self = this;

        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form className="form-horizontal form-validate-jquery" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"管理员基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"用户类型"}</label>
                                    <div className="col-lg-9">
                                        <select className="form-control" name="userType" id="type">
                                            <option value={1}>{"管理员"}</option>
                                            <option value={2}>{"扫码员"}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"昵称"}
                                    </label>
                                    <div className="col-lg-9">
                                        <input id="name" type="text" className="form-control"
                                               placeholder={"昵称"} required="required" autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"密码"}
                                    </label>
                                    <div className="col-lg-9">
                                        <input id="password" type="password" name="password" className="form-control"
                                               placeholder={"密码"} required="required" autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"确认密码"}
                                    </label>
                                    <div className="col-lg-9">
                                        <input id="confirmPassword" name="repeat_password" type="password" className="form-control"
                                               placeholder={"确认密码"} required="required" autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"手机号码"}</label>
                                    <div className="col-lg-9">
                                        <input id="phone" type="text" className="form-control"
                                               placeholder={"手机号码"} required="required" autoComplete="off"/>
                                    </div>
                                </div>
                            </fieldset>

                            <div className="form-group" >
                                <div className="col-lg-11 text-right" style={{marginTop: "50px"}}>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this._save.bind(this)}>{"保存"}
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
    const {changeSearch1Type, form, adminSave,commonReducer}=state
    return {
        form: form,
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(AdminUserRegisterContainer)