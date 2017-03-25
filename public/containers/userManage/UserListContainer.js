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
    userType,
    ListMiddleModal,
    timeStamp2Time,
    filterCityById,
    filterCountryById
} from '../../components/Tool/Tool';
import {GENERALUSER_LIST_START, GENERALUSER_LIST_END, CITY_LIST_START, CITY_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition, deleteObject, saveObject,getAuthcode} from '../../actions/CommonActions';
var sha1 = require('js-sha1');

export default class UserListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "用户管理", link: ''},
            {text: "用户列表", link: ''}
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: Current_Lang.others.add, action: "/CustomerService/UserManage/Register"}
        ];
        this.searchColumn = "DRIVER";
        this.detailData = "";
        this.currentCity = "";
        this.currentCountry = "";
        this.currentCityId = 3;
        this.interValObj = "";
        this._delete = this._delete.bind(this);
        this._detail = this._detail.bind(this);
        this._showGetAuthcode = this._showGetAuthcode.bind(this);
        this._resetPassword = this._resetPassword.bind(this);
        this._changeCity = this._changeCity.bind(this);
        this._changeCountry = this._changeCountry.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
        this._lockOrUnlockUser = this._lockOrUnlockUser.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
    }

    componentDidMount() {
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, GENERALUSER_LIST_START, GENERALUSER_LIST_END, generalUser_list));
        this.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
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

    _changeCity() {
        var cityid = $("#citySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, cityid);
        if (this.currentCity.country) {
            this.currentCountry = this.currentCity.country[0];
            console.log("this.currentCountry", this.currentCountry);
        }
        this.currentCityId = cityid;
        this._startRefresh();
    }

    _changeCountry() {
        var countyid = $("#countrySelect").val();
        this.currentCountry = filterCountryById(this.currentCity, countyid);
        this._startRefresh();
    }

    _detail(val) {
        this.detailData = val;
        this._startRefresh();
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

    _resetPassword() {
        var params = {
            password: sha1.hex("88888888"),
            type: this.detailData.type,
            phone: this.detailData.phone,
            authcode: $("#authcode").val()
        };
        this.props.dispatch(saveObject(params, "", "", reset_password, "/CustomerService/UserManage", "update"));
    }

    _delete(userid, realName) {
        var that = this;
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + realName + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteObject(userid, "", "", "", "", "", GENERALUSER_LIST_START, GENERALUSER_LIST_END, generalUser_delete, generalUser_list))
        })

    }

    _lockOrUnlockUser(params) {
        var that = this;
        var listParams = {page: 0, size: 20};
        this.props.dispatch(saveObject(params, "", "", generalUser_userStatus, "/CustomerService/UserManage", "update", function () {
            that.props.dispatch(getListByMutilpCondition(listParams, GENERALUSER_LIST_START, GENERALUSER_LIST_END, generalUser_list));
        }));
    }

    _bindQrcode(userid) {
        var params = {
            userid: userid,
            number: $("#qrcid").val()
        };
        this.props.dispatch(saveObject(params, "", "", bind_qrcode, "/CustomerService/UserManage", "bindQrcode"));
    }

    _search() {
        var params = {
            page: 0,
            size: 20,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val(),
            organizationid: $("#organizationSelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, GENERALUSER_LIST_START, GENERALUSER_LIST_END, generalUser_list));
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

    _changePage(page) {
        this.page = page;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _prePage(page) {
        this.page = this.page - 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    render() {
        const {fetching, data, cityList} =this.props;
        console.log("userdata", data.data);
        var cityOptions = [];
        var countryOptions = [];
        var organizationOptions = [];
        if (cityList) {
            if (cityList.status) {
                cityList.data.forEach(function (city, idx) {
                    cityOptions.push(
                        <option key={"city-" + idx} value={city.id}>{city.name}</option>
                    )
                });
                if (this.currentCity == "") {
                    if (cityList.data[0].country) {
                        cityList.data[0].country.forEach(function (val, index) {
                            countryOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        });
                        if (this.currentCountry == "") {
                            if (cityList.data[0].country.organization && cityList.data[0].country.organization.content.length > 0) {
                                cityList.data[0].country.organization.content.forEach(function (organization, i) {
                                    organizationOptions.push(
                                        <option key={"organization-" + i}
                                                value={organization.id}>{organization.name}</option>
                                    )
                                })
                            }
                        } else {
                            if (this.currentCountry.organization && this.currentCountry.organization.content.length > 0) {
                                this.currentCountry.organization.content.forEach(function (organization, i) {
                                    organizationOptions.push(
                                        <option key={"organization-" + i}
                                                value={organization.id}>{organization.name}</option>
                                    )
                                })
                            }
                        }
                    }
                } else {
                    if (this.currentCity.country) {
                        this.currentCity.country.forEach(function (val, index) {
                            countryOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        });
                        if (this.currentCountry == "") {
                            if (this.currentCity.country.organization && this.currentCity.country.organization.content.length > 0) {
                                this.currentCity.country.organization.content.forEach(function (organization, i) {
                                    organizationOptions.push(
                                        <option key={"organization-" + i}
                                                value={organization.id}>{organization.name}</option>
                                    )
                                })
                            }
                        } else {
                            if (this.currentCountry.organization && this.currentCountry.organization.content.length > 0) {
                                this.currentCountry.organization.content.forEach(function (organization, i) {
                                    organizationOptions.push(
                                        <option key={"organization-" + i}
                                                value={organization.id}>{organization.name}</option>
                                    )
                                })
                            }
                        }
                    }

                }
            }
        }
        var detailUserInfo = "";
        var bindQrcodeInfo = "";
        var getAuthcodeInfo = "";
        if (this.detailData == "") {
            detailUserInfo = <Loading />;
            bindQrcodeInfo = <Loading />;
        } else {
            detailUserInfo =
                <div>
                    <div className="form-horizontal">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"详细信息"}
                            </legend>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"头像"}</label>
                                    <div className="col-lg-8">
                                        <div className="thumbnail"
                                             style={{marginBottom: 0, width: "165px", padding: 0, border: 0}}>
                                            <div className="thumb">
                                                <img src={this.detailData.headimg} alt=""
                                                     style={{height: "160px", width: "160px"}}/>
                                                <div className="caption-overflow" style={{width: "auto"}}>
                                                    <span style={{top: 0, marginTop: 0}}>
                                                        <a href={this.detailData.headimg} data-popup="lightbox"
                                                           className="btn"
                                                           style={{height: "160px", width: "160px"}}></a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"证件正面照"}</label>
                                    <div className="col-lg-8">
                                        <div className="thumbnail"
                                             style={{marginBottom: 0, width: "165px", padding: 0, border: 0}}>
                                            <div className="thumb">
                                                <img src={this.detailData.idcardimg} alt=""
                                                     style={{height: "160px", width: "160px"}}/>
                                                <div className="caption-overflow" style={{width: "auto"}}>
                                                    <span style={{top: 0, marginTop: 0}}>
                                                        <a href={this.detailData.idcardimg} data-popup="lightbox"
                                                           className="btn"
                                                           style={{height: "160px", width: "160px"}}></a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"真实姓名"}</label>
                                    <div className="col-lg-8">
                                        <input type="text" value={this.detailData.realName} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"证件号码"}</label>
                                    <div className="col-lg-8">
                                        <input type="text" value={userType(this.detailData.idno)}
                                               className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"别名"}</label>
                                    <div className="col-lg-8">
                                        <input type="text" value={this.detailData.name} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"用户类型"}</label>
                                    <div className="col-lg-8">
                                        <input type="text" value={userType(this.detailData.type)}
                                               className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"地址"}</label>
                                    <div className="col-lg-8">
                                        <input type="text" value={this.detailData.address} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"小区"}</label>
                                    <div className="col-lg-8">
                                        <input id="name" type="text" value={this.detailData.organizationName}
                                               className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"是否实名认证"}</label>
                                    <div className="col-lg-8">
                                        <div className="text-muted text-size-small">
                                            {this.detailData.certificated == 1 ?
                                                <span className="label bg-success"
                                                      style={{marginTop: "6px"}}>{"已认证"}</span> :
                                                <span className="label bg-danger"
                                                      style={{marginTop: "6px"}}>{"未认证"}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"用户状态"}</label>
                                    <div className="col-lg-8">
                                        <div className="text-muted text-size-small">
                                            {this.detailData.status == 1 ?
                                                <span className="label bg-success"
                                                      style={{marginTop: "6px"}}>{"有效"}</span> :
                                                <span className="label bg-danger"
                                                      style={{marginTop: "6px"}}>{"冻结"}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"创建时间"}</label>
                                    <div className="col-lg-8">
                                        <input type="text" value={timeStamp2Time(this.detailData.create_time)}
                                               className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"更新时间"}</label>
                                    <div className="col-lg-8">
                                        <input type="text" value={timeStamp2Time(this.detailData.update_time)}
                                               className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                </div>;
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
            bindQrcodeInfo =
                <div>
                    <div className="form-horizontal">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"绑定二维码"}
                            </legend>
                            <div className="form-group">
                                <div className="col-lg-12">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"真实姓名"}</label>
                                    <div className="col-lg-4">
                                        <input type="text" value={this.detailData.realName} className="form-control"
                                               autoComplete="off" disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-12">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"输入二维码"}</label>
                                    <div className="col-lg-4">
                                        <input id="qrcid" type="text" className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}></label>
                                <div className="col-lg-10">
                                    <div className="text-right">
                                        <button type="button" className="btn btn-primary"
                                                onClick={this._bindQrcode.bind(this, this.detailData.userid)}>
                                            {"确定"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                </div>;
        }
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
                            <li className="dropdown"
                                style={{borderBottom: '0 lightgray solid'}}>
                                <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                                   data-toggle="dropdown" aria-expanded="false" style={{
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    fontWeight: 'bold',
                                    color: '#193153'
                                }}><span
                                    style={{color: '#193153'}} id="search_way">{"按城市搜索"}</span> <span
                                    className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">{"按城市搜索"}</a></li>
                                </ul>
                            </li>
                            <li style={{display: "inline-block"}}>
                                <select id="citySelect" className="form-control" style={{width: "150px"}}
                                        value={this.currentCityId} onChange={this._changeCity}>
                                    {cityOptions}
                                </select>
                            </li>
                            <li style={{display: "inline-block"}}>
                                <select id="countrySelect" className="form-control" style={{width: "150px"}}
                                        onChange={this._changeCountry}>
                                    {countryOptions}
                                </select>
                            </li>
                            <li style={{display: "inline-block"}}>
                                <select id="organizationSelect" className="form-control" style={{width: "150px"}}>
                                    {organizationOptions}
                                </select>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)}
                                        style={{marginLeft: '30px'}} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>

                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"用户列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.status ? data.data.content.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <UserListComponent data={data} fetching={fetching}
                                           _delete={this._delete}
                                           _detail={this._detail}
                                           _showGetAuthcode={this._showGetAuthcode}
                                           _lockOrUnlockUser={this._lockOrUnlockUser}/>
                    </fieldset>
                    <ListMiddleModal id="userDetailModal" content={detailUserInfo} doAction={""}
                                     tip={"用户信息"} actionText="用户详情" hide="true" hideCancel="true"/>
                    <ListMiddleModal id="bindQrcodeModal" content={bindQrcodeInfo} doAction={""}
                                     tip={"绑定二维码"} actionText="绑定二维码" hide="true" hideCancel="true"/>
                    <ListMiddleModal id="getAuthcodeModal" content={getAuthcodeInfo} doAction={""}
                                     tip={"获取验证码"} actionText="获取验证码" hide="true" hideCancel="true"/>
                </div>
            </div>
        )
    }
}

class UserListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _lockOrUnlockUser(userid, status) {
        var params = {
            userid: userid,
            status: 1 - status
        };
        this.props._lockOrUnlockUser(params);
    }

    _showGetAuthcode(val){
        this.props._showGetAuthcode(val);
    }

    _resetPassword(val) {

    }

    _exportRqcode() {

    }

    _detail(val) {
        this.props._detail(val);
    }

    _delete(userid, realName) {
        this.props._delete(userid, realName)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.status) {
                if (data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.realName}</td>
                            <td className="text-center">{userType(val.type)}</td>
                            <td className="text-center">{val.phone}</td>
                            <td className="text-center">{val.address}</td>
                            <td className="text-center">{val.rqcode}</td>
                            <td className="text-center">
                                <div className="text-muted text-size-small">
                                    {val.status == 1 ? <span className="label bg-success">{"有效"}</span> :
                                        <span className="label bg-danger">{"冻结"}</span>}
                                </div>
                            </td>
                            <td className="text-center">{val.createTime}</td>
                            <td className="text-center">{val.updateTime}</td>
                            <td className="text-center">
                                {<ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#userDetailModal"
                                                   onClick={this._detail.bind(this, val)}><i
                                                    className=" icon-office"></i>
                                                    {"详情"}</a>
                                            </li>
                                            <li style={{display: 'block'}}
                                                onClick={this._delete.bind(this, val.userid, val.realName)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                {"删除"}</a></li>
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#getAuthcodeModal"
                                                   onClick={this._showGetAuthcode.bind(this,val)}><i
                                                    className=" icon-office"></i>
                                                    {"重置密码"}</a>
                                            </li>
                                            {val.status == 1 ?
                                                <li onClick={this._lockOrUnlockUser.bind(this, val.userid, val.status)}>
                                                    <a
                                                        href="javascript:void(0)"><i className="icon-lock"></i>锁住账户</a>
                                                </li> :
                                                <li onClick={this._lockOrUnlockUser.bind(this, val.userid, val.status)}>
                                                    <a
                                                        href="javascript:void(0)"><i
                                                        className="icon-unlock"></i>解锁账户</a></li>}
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#bindQrcodeModal"
                                                   onClick={this._detail.bind(this, val)}><i
                                                    className=" icon-office"></i>
                                                    {"绑定二维码"}</a>
                                            </li>
                                            <li style={{display: 'block'}} onClick={this._exportRqcode.bind(this)}><a
                                                href="javascript:void(0)"><i className="icon-redo2"></i>
                                                {"导出二维码"}</a></li>
                                        </ul>
                                    </li>
                                </ul>}

                            </td>
                        </tr>)
                    }.bind(this))
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
                        <th className="col-md-1 text-bold text-center">{"姓名"}</th>
                        <th className="col-md-1 text-bold text-center">{"用户类型"}</th>
                        <th className="col-md-1 text-bold text-center">{"手机号"}</th>
                        <th className="col-md-2 text-bold text-center">{"地址"}</th>
                        <th className="col-md-2 text-bold text-center">{"二维码编号"}</th>
                        <th className="col-md-1 text-bold text-center">{"用户状态"}</th>
                        <th className="col-md-2 text-bold text-center">{"创建时间"}</th>
                        <th className="col-md-2 text-bold text-center">{"更新时间"}</th>
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
    const {getGeneralUserList, getCityList, commonReducer}=state;
    return {
        fetching: getGeneralUserList.fetching,
        data: getGeneralUserList.data,
        cityList: getCityList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(UserListContainer)