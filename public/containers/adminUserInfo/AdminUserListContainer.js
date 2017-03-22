/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {
    Loading,
    NoData,
    ConfirmModal,
    ErrorModal,
    roleApplicationUse,
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
            {text: "扫码员列表", link: ''}
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
        this._resetPassword = this._resetPassword.bind(this);
    }

    componentDidMount() {
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, ADMINUSER_LIST_START, ADMINUSER_LIST_END, adminUser_list));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按姓名搜索") {
                self.searchColumn = "DRIVER";
            } else {
                self.searchColumn = "LINE";
            }
        })
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
            size: 20,
            type: parseInt($("#typeSelect").val())
        };
        this.props.dispatch(getListByMutilpCondition(params, ADMINUSER_LIST_START, ADMINUSER_LIST_END, adminUser_list));
    }
    _resetPassword(params){
        this.props.dispatch(saveObject(params, "", "", reset_password, "/CustomerService/AdminUserManage", "update"));
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
                            <li className="dropdown"
                                style={{borderBottom: '0 lightgray solid'}}>
                                <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                                   data-toggle="dropdown" aria-expanded="false" style={{
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    fontWeight: 'bold',
                                    color: '#193153'
                                }}><span
                                    style={{color: '#193153'}} id="search_way">{"按类型搜索"}</span> <span
                                    className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">{"按类型搜索"}</a></li>
                                </ul>
                            </li>
                            <li>
                                <select id="typeSelect" className="form-control" style={{width: "150px"}}>
                                    <option value={""}>所有</option>
                                    <option value={1}>管理员</option>
                                    <option value={2}>回收员</option>
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
                        <legend className="text-bold">{"扫码员列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.status ? data.data.content.length : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <AdminUserListComponent data={data} fetching={fetching}
                                                _delete={this._delete}
                                                _resetPassword={this._resetPassword}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class AdminUserListComponent extends Component {
    constructor(props) {
        super(props)
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
        var loginUserType = sessionStorage['type'];
        let tb = [];
        if (data) {
            if (data.status) {
                if (data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
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
                                            <li style={{display:loginUserType==10? 'block':'none'}}
                                                onClick={this._detail.bind(this, '/CustomerService/AdminUserManage/Update/:' + val.userid)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    {"修改"}</a></li>
                                            <li style={{display:loginUserType==10? 'block':'none'}}
                                                onClick={this._delete.bind(this, val.id, val.name)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                {"删除"}</a></li>
                                            <li style={{display:loginUserType==10? 'block':'none'}}
                                                onClick={this._resetPassword.bind(this, val)}><a
                                                href="javascript:void(0)"><i className="icon-reset"></i>
                                                {"重置密码"}</a></li>
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
    const {getAdminUserList}=state;
    return {
        fetching: getAdminUserList.fetching,
        data: getAdminUserList.data
    }
}


export default connect(mapStateToProps)(AdminUserListContainer)