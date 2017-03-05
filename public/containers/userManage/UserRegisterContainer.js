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
import {commonRefresh} from '../../actions/Common';

export default class UserRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "用户管理", link: ''},
            {text: "用户注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回用户列表", action: "/CustomerService/UserManage"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh=this._startRefresh.bind(this)
    }

    _startRefresh(){
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        this.props.dispatch(saveServiceGroup(params))

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
                    <RegisterUserComponent _save={this._save} _startRefresh={this._startRefresh}/>

                </div>
            </div>
        )
    }
}

class RegisterUserComponent extends Component{
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
        var cseListIDS = [];
        var singleAppID = true;
        var army = this.selectedCSE[0];
        this.selectedCSE.forEach(function (val, key) {
            if (val.node.appId != army.node.appId) {
                singleAppID = false
            }
        })
        if (singleAppID) {
            this.selectedCSE.forEach(function (val, key) {
                cseListIDS.push(val.node.cssId)
            })
            var params = {
                groupId: $("#name").val(),
                description: $("#description").val(),
                cseList: cseListIDS,
                mode: 'new'
            }
            this.props._save(params)
        } else {
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.cseGroupHaveDiffCSE);
        }

    }

    _appOnChange() {
        this.props._startRefresh();
    }

    componentDidMount() {
        var self = this;
        $("#cse_group_text").parent().parent().on('click', 'li', function () {
            $("#cse_group_text").text($(this).find('a').text())
        })
        $("#app_id_text").parent().parent().on('click', 'li', function () {
            $("#app_id_text").text($(this).find('a').text())
        })
        $("#cse_status_text").parent().parent().on('click', 'li', function () {
            $("#cse_status_text").text($(this).find('a').text())
        })
        $('[data-popup="tooltip"]').tooltip();

        var getFirstAppID = setInterval(function () {
            if ($("#common_app option:selected").val()) {
                clearInterval(getFirstAppID);
                self.selectedApp = self.initApp[$("#common_app option:selected").index()];
                this.props._startRefresh()
            }
        }.bind(this), 500);


        $("#common_app").on("change", function () {
            self.selectedApp = self.initApp[$("#common_app option:selected").index()];
            self.props._startRefresh()
        })
        $("#streamingProfile").on("change", function () {
            if ($("#streamingProfile option:selected").text().indexOf("QAM") >= 0) {
                $(".erm").show();
            } else {
                $(".erm").hide();
            }

            self.props._startRefresh()
        })

    }

    render() {
        const {allCSE, cseGroup, appList, streamingTemplate}=this.props;
        if ($("#streamingProfile option:selected").text().indexOf("QAM") >= 0) {
            $(".erm").show();
        } else {
            $(".erm").hide();
        }
        var self = this;

        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"用户基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"用户类型"}</label>
                                    <div className="col-lg-9">
                                        <select disabled className="form-control" name="userType" id="type" value={3}>
                                            <option value={1}>{"管理员"}</option>
                                            <option value={2}>{"扫码员"}</option>
                                            <option value={3}>{"商户用户"}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                               marginTop: '8px'
                                           }}>{"姓名"}</label>
                                    <div className="col-lg-9">
                                        <input id="name" type="text" className="form-control"
                                               placeholder={"姓名"}
                                               autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"密码"}</label>
                                    <div className="col-lg-9">
                                        <input id="password" type="text" className="form-control"
                                               placeholder={"密码"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"确认密码"}</label>
                                    <div className="col-lg-9">
                                        <input id="confirmPassword" type="text" className="form-control"
                                               placeholder={"确认密码"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"手机号"}</label>
                                    <div className="col-lg-9">
                                        <input id="phone" type="text" className="form-control"
                                               placeholder={"手机号"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"地址"}</label>
                                    <div className="col-lg-9">
                                        <input id="address" type="text" className="form-control"
                                               placeholder={"地址"}
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"二维码编号"}</label>
                                    <div className="col-lg-9">
                                        <input id="rqcode" type="text" className="form-control"
                                               placeholder={"二维码编号"}
                                               autoComplete="off"/>
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

export default connect(mapStateToProps)(UserRegisterContainer)