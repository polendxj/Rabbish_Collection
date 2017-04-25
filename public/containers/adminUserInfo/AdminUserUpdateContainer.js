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
import {saveObject,getDetail} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';
import {ADMINUSER_UPDATE_START, ADMINUSER_UPDATE_END} from '../../constants/index.js';
export default class AdminUserRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "管理员管理", link: ''},
            {text: "管理员修改", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回管理员列表", action: "/CustomerService/AdminUserManage"}
        ];
        this._save = this._save.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getDetail(parseInt(this.props.params.id.substring(1)),ADMINUSER_UPDATE_START, ADMINUSER_UPDATE_END,adminUser_detail));
    }

    _save(params) {
        this.props.dispatch(saveObject(params,"","",adminUser_update,"/CustomerService/AdminUserManage","update"));
    }

    render() {
        const {fetching, data}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <UpdateAdminUserComponent data={data} fetching={fetching} _save={this._save}/>
                </div>
            </div>
        )
    }
}

class UpdateAdminUserComponent extends Component{
    constructor(props) {
        super(props);
        this._save = this._save.bind(this);
    }

    _save(id,userid) {
        var params = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            type: parseInt($("#type").val()),
            id:userid
        };
        if($("#updateAdminUserForm").validate().form()){
            this.props._save(params);
        }
    }
    componentDidMount() {
        $("#updateAdminUserForm").validate({
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
            errorPlacement: function(error, element) {
                error.appendTo(element.parent().parent().find(".errorShow"));
            },
            rules: {
                phone : {
                    required : true,
                    isMobile : true
                }
            },
            messages : {
                phone : {
                    isMobile : "请正确填写手机号码"
                }
            }
        });
    }

    render() {
        const {fetching, data}=this.props;
        var tableHeight = ($(window).height() - 130);
        var detail="";
        if(data){
            detail=
                <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                    <div className="col-sm-8 col-sm-offset-2">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"管理员基础信息"}
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"用户类型"}</label>
                                <div className="col-lg-6">
                                    <select className="form-control" name="userType" id="type" defaultValue={data.data.type} disabled>
                                        <option value={1}>{"管理员"}</option>
                                        <option value={2}>{"扫码员"}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"昵称"}
                                </label>
                                <div className="col-lg-6">
                                    <input id="name" type="text" className="form-control"
                                           defaultValue={data.data.name} required="required" autoComplete="off"/>
                                </div>
                                <div className="col-lg-3 errorShow"></div>
                            </div>

                            <div className="form-group" >
                                <label className="col-lg-2 control-label"
                                       style={{
                                           textAlign: 'center',
                                       }}>{"手机号码"}</label>
                                <div className="col-lg-6">
                                    <input id="phone" name="phone" type="text" className="form-control"
                                           defaultValue={data.data.phone} required="required" autoComplete="off"/>
                                </div>
                                <div className="col-lg-3 errorShow"></div>
                            </div>
                        </fieldset>

                        <div className="form-group" >
                            <div className="col-lg-8 text-right" style={{marginTop: "50px"}}>
                                <button type="button" className="btn btn-primary"
                                        onClick={this._save.bind(this,data.data.id,data.data.userid)}>{"保存"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
        }else {
            detail = <Loading/>
        }
        return (
            <form id="updateAdminUserForm" className="form-horizontal" action="#">
                {detail}
            </form>
        )

    }
}

function mapStateToProps(state) {
    const {getAdminUserDetail}=state;
    return {
        data: getAdminUserDetail.data,
        fetching:getAdminUserDetail.fetching
    }
}

export default connect(mapStateToProps)(AdminUserRegisterContainer)