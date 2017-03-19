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
import {getListByMutilpCondition,saveObject} from '../../actions/CommonActions';
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
            {icon: "icon-undo2", text:"返回用户列表", action: "/CustomerService/UserManage"}
        ];
        this._save = this._save.bind(this);
    }
    componentDidMount() {
        var params = {page: 0, size: 10000};
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
    }
    _save(params) {
        this.props.dispatch(saveObject(params,"","",generalUser_register,"/CustomerService/UserManage"));
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
                    <RegisterUserComponent data={data} _save={this._save}/>

                </div>
            </div>
        )
    }
}

class RegisterUserComponent extends Component{
    constructor(props) {
        super(props);
        this._save = this._save.bind(this);
    }
    _save() {
        var formFields = $("#generalUserForm").serializeArray();
        var params = array2Json(formFields);
        var password = sha1.hex(params.password);
        params.password = password;
        params.authcode = "";
        console.log("aa1",params);
        console.log("aa1",password);
        this.props._save(params);
    }
    componentDidMount() {

    }

    render() {
        const {data}=this.props;
        console.log("orgina",data);
        const options = [];
        if (data) {
            if(data.status){
                data.data.content.forEach(function (val, key) {
                    options.push(
                        <option key={"option"+key} value={val.id}>{val.name}</option>
                    )
                })
            }
        }
        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form id="generalUserForm" className="form-horizontal" action="#">
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
                                    <div className="col-lg-9">
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
                                    <div className="col-lg-9">
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
                                    <div className="col-lg-9">
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
                                    <div className="col-lg-9">
                                        <input name="headimg" type="text" className="form-control"
                                               placeholder={"头像URL"}
                                               autoComplete="off"/>
                                    </div>
                                </div>

                                <div className="form-group" >
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center',
                                           }}>{"密码"}</label>
                                    <div className="col-lg-9">
                                        <input name="password" type="text" className="form-control"
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
                                        <input name="phone" type="text" className="form-control"
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
                                        <input name="address" type="text" className="form-control"
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
                                        <input name="rqcode" type="text" className="form-control"
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
    const {getOrganizationList}=state;
    return {
        data: getOrganizationList.data
    }
}

export default connect(mapStateToProps)(UserRegisterContainer)