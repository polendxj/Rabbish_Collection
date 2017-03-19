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
import {Loading, NoData, ConfirmModal, ErrorModal, userType,ListMiddleModal,timeStamp2Time} from '../../components/Tool/Tool';
import {GENERALUSER_LIST_START, GENERALUSER_LIST_END} from '../../constants/index.js'
import {getListByMutilpCondition, deleteObject, saveObject} from '../../actions/CommonActions';

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
        this._delete = this._delete.bind(this);
        this._detail = this._detail.bind(this);
        this._resetPassword = this._resetPassword.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
        this._lockOrUnlockUser = this._lockOrUnlockUser.bind(this);
    }

    componentDidMount() {
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, GENERALUSER_LIST_START, GENERALUSER_LIST_END, generalUser_list));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按姓名搜索") {
                self.searchColumn = "DRIVER";
            } else {
                self.searchColumn = "LINE";
            }
        })
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _detail(val) {
        this.detailData = val;
        this._startRefresh();
    }
    _resetPassword(params){
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

    _search() {

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
        const {fetching, data} =this.props;
        console.log("userdata", data.data);
        var detailUserInfo = "";
        if (this.detailData == "") {
            detailUserInfo = <Loading />;
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
                                                           className="btn" style={{height: "160px", width: "160px"}}></a>
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
                                                           className="btn" style={{height: "160px", width: "160px"}}></a>
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
                                                <span className="label bg-success" style={{marginTop:"6px"}}>{"已认证"}</span> :
                                                <span className="label bg-danger" style={{marginTop:"6px"}}>{"未认证"}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"用户状态"}</label>
                                    <div className="col-lg-8">
                                        <div className="text-muted text-size-small">
                                            {this.detailData.status == 1 ?
                                                <span className="label bg-success" style={{marginTop:"6px"}}>{"有效"}</span> :
                                                <span className="label bg-danger" style={{marginTop:"6px"}}>{"冻结"}</span>}
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
                        <div className="list-inline list-inline-condensed no-margin-bottom"
                             style={{textAlign: 'right', marginTop: '-59px'}}>
                            <li className="dropdown"
                                style={{borderBottom: '0 lightgray solid'}}>
                                <select className="form-control">
                                    <option value="AK">成都</option>
                                </select>
                            </li>
                            <li>
                                <select className="form-control">
                                    <option value="AK">花样年美岸小区</option>
                                </select>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)}
                                        style={{marginLeft: '30px'}} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>
                        </div>
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
                                           _resetPassword={this._resetPassword}
                                           _lockOrUnlockUser={this._lockOrUnlockUser}/>
                    </fieldset>
                    <ListMiddleModal id="userDetailModal" content={detailUserInfo}
                                     doAction={""}
                                     tip={"用户信息"} actionText="用户详情" hide="true" hideCancel="true"/>
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

    _resetPassword(val) {
        var params = {
            password:"88888888",
            type:val.type,
            phone: val.phone,
            authcode: ""
        };
        this.props._resetPassword(params);
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
                                            <li style={{display: 'block'}} onClick={this._resetPassword.bind(this,val)}><a
                                                href="javascript:void(0)"><i className="icon-reset"></i>
                                                {"重置密码"}</a></li>
                                            {val.status == 1 ?
                                                <li onClick={this._lockOrUnlockUser.bind(this, val.userid, val.status)}>
                                                    <a
                                                        href="javascript:void(0)"><i className="icon-lock"></i>锁住账户</a>
                                                </li> :
                                                <li onClick={this._lockOrUnlockUser.bind(this, val.userid, val.status)}>
                                                    <a
                                                        href="javascript:void(0)"><i
                                                        className="icon-unlock"></i>解锁账户</a></li>}
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
    const {getGeneralUserList,commonReducer}=state;
    return {
        fetching: getGeneralUserList.fetching,
        data: getGeneralUserList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(UserListContainer)