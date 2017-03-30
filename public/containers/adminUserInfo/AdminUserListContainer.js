/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {commonRefresh} from '../../actions/Common';
import {
    Loading,
    NoData,
    ConfirmModal,
    ErrorModal,
    ListMiddleModal,
    timeStamp2Time,
    userType
} from '../../components/Tool/Tool';
import {ADMINUSER_LIST_START, ADMINUSER_LIST_END} from '../../constants/index.js';
import {getListByMutilpCondition,deleteObject,saveObject} from '../../actions/CommonActions';
var sha1 = require('js-sha1');

export default class AdminUserListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "扫码员管理", link: ''},
            {text: "管理员列表", link: ''}
        ];
        this.operation = sessionStorage['type']==10?
            [{
                icon: "icon-add-to-list",
                text: Current_Lang.others.add,
                action: "/CustomerService/AdminUserManage/Register"
            }]:
            [{icon: "", text: "", action: ""}];
        this.searchColumn = "DRIVER";
        this._delete = this._delete.bind(this);
        this._showGetAuthcode = this._showGetAuthcode.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
        this._resetPassword = this._resetPassword.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
        this._changePage=this._changePage.bind(this);
        this._prePage=this._prePage.bind(this);
        this._nextPage=this._nextPage.bind(this);
    }

    componentDidMount() {
        var params = {page: 0, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, ADMINUSER_LIST_START, ADMINUSER_LIST_END, adminUser_list));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按姓名搜索") {
                self.searchColumn = "DRIVER";
            } else {
                self.searchColumn = "LINE";
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
        sessionStorage['messageTime'] = "";
        $("#btnSendCode").removeAttr("disabled");//启用按钮
    }
    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }
    _delete(userid, name) {
        var that = this;
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + name + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteObject(userid, "", "", "", "", "", ADMINUSER_LIST_START, ADMINUSER_LIST_END, adminUser_delete, adminUser_list))
        })

    }

    _search() {
        var params={
            page: 0,
            size: page_size,
            type: parseInt($("#typeSelect").val())
        };
        this.props.dispatch(getListByMutilpCondition(params, ADMINUSER_LIST_START, ADMINUSER_LIST_END, adminUser_list));
    }
    _showGetAuthcode(val){
        this.detailData = val;
        if(sessionStorage['messageTime']!=""){
            var duringTime = new Date().getTime()-sessionStorage['messageTime'];
            if(duringTime < 30*1000){
                sessionStorage['count'] = Math.round((30*1000 - duringTime)/1000);
            }
        }
        this._startRefresh();
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
        var params = {
            phone: phone
        };
        // this.props.dispatch(getAuthcode(params, "", "", get_authcode));
    }
    setRemainTime() {
        var curCount = sessionStorage['count'];
        if(!$("#getAuthcodeModal").hasClass("in")){
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
                console.log(sessionStorage['count']);
                $("#btnSendCode").text(curCount + "秒后重新发送");
            }
        }
    }
    _resetPassword() {
        var params = {
            password: sha1.hex("88888888"),
            type: this.detailData.type,
            phone: this.detailData.phone,
            authcode: $("#authcode").val()
        };
        this.props.dispatch(saveObject(params, "", "", reset_password, "/CustomerService/AdminUserManage", "update"));
    }

    _changePage(page) {
        this.page = page;
        var params={
            page: this.page,
            size: page_size,
            type: parseInt($("#typeSelect").val())
        };
        this.props.dispatch(getListByMutilpCondition(params, ADMINUSER_LIST_START, ADMINUSER_LIST_END, adminUser_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params={
            page: this.page,
            size: page_size,
            type: parseInt($("#typeSelect").val())
        };
        this.props.dispatch(getListByMutilpCondition(params, ADMINUSER_LIST_START, ADMINUSER_LIST_END, adminUser_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params={
            page: this.page,
            size: page_size,
            type: parseInt($("#typeSelect").val())
        };
        this.props.dispatch(getListByMutilpCondition(params, ADMINUSER_LIST_START, ADMINUSER_LIST_END, adminUser_list));
    }

    render() {
        const {fetching, data} =this.props;
        var getAuthcodeInfo = "";
        getAuthcodeInfo =
            <div>
                <div className="form-horizontal">
                    <fieldset className="content-group">
                        <legend className="text-bold">
                            {"获取验证码"}
                        </legend>
                        <div className="form-group">
                            <label className="col-lg-2 control-label"
                                   style={{
                                       textAlign: 'center'
                                   }}>{"获取验证码"}</label>
                            <div className="col-lg-10">
                                <div className="input-group">
                                    <input type="text" id="authcode" name="authcode" className="form-control"
                                           placeholder="输入验证码"/>
                                    <span className="input-group-btn">
                                                <button id="btnSendCode" className="btn bg-primary" type="button" onClick={this._sendMessage}>
                                                    获取验证码
                                                </button>
                                            </span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-2 control-label"
                                   style={{textAlign: 'center'}}></label>
                            <div className="col-lg-10">
                                <div className="text-right">
                                    <button type="button" className="btn btn-primary"
                                            onClick={this._resetPassword}>
                                        {"确定"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

            </div>;
        console.log("adminuser", data);
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-user'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right', marginTop: '-59px'}}>
                            <li>
                                <select id="typeSelect" className="form-control">
                                    <option value={""}>所有管理员</option>
                                    <option value={1}>管理员</option>
                                    <option value={2}>回收员</option>
                                </select>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>
                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"扫码员列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.status ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <AdminUserListComponent data={data} fetching={fetching}
                                                _delete={this._delete}
                                                _showGetAuthcode={this._showGetAuthcode}/>

                    </fieldset>
                    <ListMiddleModal id="getAuthcodeModal" content={getAuthcodeInfo} doAction={""}
                                     tip={"获取验证码"} actionText="获取验证码" hide="true" hideCancel="true"/>
                </div>
            </div>
        )
    }
}

class AdminUserListComponent extends Component {
    constructor(props) {
        super(props)
    }
    _showGetAuthcode(val){
        this.props._showGetAuthcode(val);
    }
    _resetPassword(val) {
        var params = {
            password: sha1.hex("88888888"),
            type: val.type,
            phone: val.phone,
            authcode: ""
        };
        this.props._resetPassword(params);
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(userid, name) {
        this.props._delete(userid, name)
    }

    render() {
        const {data, fetching}=this.props;
        var loginUserid = sessionStorage['userid'];
        var loginUserType = sessionStorage['type'];
        console.log("loginUserid",loginUserid);
        let tb = [];
        if (data) {
            if (data.status) {
                if (data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        tb.push(<tr key={key} style={{backgroundColor: loginUserid == val.userid ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.name}</td>
                            <td className="text-center">{userType(val.type)}</td>
                            <td className="text-center">{val.phone}</td>
                            <td className="text-center">{timeStamp2Time(val.createTime)}</td>
                            <td className="text-center">{timeStamp2Time(val.updateTime)}</td>
                            <td className="text-center">
                                {<ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li style={{display:val.type!=10&&(loginUserid==val.userid||loginUserType==10)? 'block':'none'}}
                                                onClick={this._detail.bind(this, '/CustomerService/AdminUserManage/Update/:' + val.userid)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    {"编辑"}</a></li>
                                            <li style={{display:val.type!=10&&(loginUserid==val.userid||loginUserType==10)? 'block':'none'}}
                                                onClick={this._delete.bind(this, val.userid, val.name)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                {"删除"}</a></li>
                                            <li style={{display:val.type!=10&&(loginUserid==val.userid||loginUserType==10)? 'block':'none'}}>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#getAuthcodeModal"
                                                   onClick={this._showGetAuthcode.bind(this,val)}><i
                                                    className=" icon-office"></i>
                                                    {"重置密码"}</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>}

                            </td>
                        </tr>)
                    }.bind(this));
                } else {
                    tb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>

                    </tr>)
                }
            } else {
                tb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"))
            }
        } else {
            tb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        var tableHeight = ($(window).height() - 240);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom: '85px'}}>
                    <thead>
                    <tr style={{fontWeight: 'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-bold text-center">{"姓名"}</th>
                        <th className="col-md-2 text-bold text-center">{"类型"}</th>
                        <th className="col-md-2 text-bold text-center">{"手机号"}</th>
                        <th className="col-md-3 text-bold text-center">{"创建时间"}</th>
                        <th className="col-md-3 text-bold text-center">{"更新时间"}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tb}
                    </tbody>
                </table>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {getAdminUserList,commonReducer}=state;
    return {
        fetching: getAdminUserList.fetching,
        data: getAdminUserList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(AdminUserListContainer)