/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {Loading, NoData, ConfirmModal,ErrorModal,roleApplicationUse} from '../../components/Tool/Tool'

export default class UserListContainer extends Component {
    constructor(props) {
        super(props);
        this.page=0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "用户管理", link: ''},
            {text: "用户列表", link: ''}
        ];
        this.operation = [
            {icon: "icon-add-to-list", text: Current_Lang.others.add, action: "/CustomerService/UserManage/Register"}
        ];
        this.searchColumn="DRIVER";
        this.dataList = [
            {
                id: "1",
                name: "付大海",
                phone:"15112023452",
                address:"内江",
                rqcode:"5346364564564345",
                status:2,
                createTime:"2017-01-08 12:32:33",
                updateTime:"2017-02-08 15:41:01"
            },
            {
                id: "2",
                name: "寇建波",
                phone:"15112023452",
                address:"成都",
                rqcode:"5346364564564345",
                status:1,
                createTime:"2017-01-06 11:22:33",
                updateTime:"2017-02-08 15:41:01"
            },
            {
                id: "3",
                name: "熊荣东",
                phone:"15112023452",
                address:"德阳",
                rqcode:"5346364564564345",
                status:1,
                createTime:"2017-02-02 13:11:23",
                updateTime:"2017-02-08 15:41:01"
            }
        ];
    }

    componentDidMount() {
        var self=this;
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if($(this).find('a').text().trim()=="按姓名搜索"){
                self.searchColumn="DRIVER";
            }else{
                self.searchColumn="LINE";
            }
        })
    }

    _delete(id,classConfName,weight) {
        var that = this;
        if(sessionStorage['adminId']==id){
            ErrorModal(Current_Lang.status.minor,Current_Lang.alertTip.accountOperating)
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + classConfName + "（"+weight+"）" + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0,that.searchColumn, $("#search_value").val()))
        })

    }

    _search(){

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
        const {selected, form, fetching, data} =this.props;
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
                            style={{textAlign: 'right',marginTop:'-59px'}}>
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
                        <div style={{marginTop:'-80px'}}>
                            <Pagenation counts={3} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <UserListComponent data={this.dataList} fetching={false}
                                            _delete={this._delete}
                                            _updateStatus={this._updateStatus}/>

                    </fieldset>
                </div>
            </div>
        )
    }
}

class UserListComponent extends Component{
    constructor(props) {
        super(props)
    }

    _lockUser(){

    }

    _unlockUser(){

    }

    _resetPassword(){

    }
    _exportRqcode(){

    }


    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id,classConfName,weight) {
        this.props._delete(id,classConfName,weight)
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="8" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="8" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key} style={{backgroundColor:key%2==0?"#F8F8F8":""}}>
                        <td className="text-center">{key+1}</td>
                        <td className="text-center">{val.name}</td>
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
                                        <li style={{display:'block'}} onClick={this._detail.bind(this, '/CustomerService/SweepCodeUserManage/ModifySweepCodeUser/:' + val.id)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {"修改"}</a></li>
                                        <li style={{display:'block'}} onClick={this._delete.bind(this, val.id,val.classConfName,val.weight)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {"删除"}</a></li>
                                        <li style={{display:'block'}} onClick={this._resetPassword.bind(this)}><a
                                            href="javascript:void(0)"><i className="icon-reset"></i>
                                            {"重置密码"}</a></li>
                                        {val.status == 1 ?
                                            <li onClick={this._lockUser.bind(this)}><a
                                                href="javascript:void(0)"><i className="icon-lock"></i>锁住账户</a></li> :
                                            <li  onClick={this._unlockUser.bind(this)}><a
                                                href="javascript:void(0)"><i className="icon-unlock"></i>解锁账户</a></li>}
                                        <li style={{display:'block'}} onClick={this._exportRqcode.bind(this)}><a
                                            href="javascript:void(0)"><i className="icon-redo2"></i>
                                            {"导出二维码"}</a></li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
                    </tr>)
                }.bind(this))
            }
        }
        var tableHeight = ($(window).height()-240);
        return (
            <div className="table-responsive" style={{height:tableHeight+'px',overflowY:'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom:'85px'}}>
                    <thead>
                    <tr style={{fontWeight:'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-1 text-bold text-center">{"姓名"}</th>
                        <th className="col-md-1 text-bold text-center">{"手机号"}</th>
                        <th className="col-md-2 text-bold text-center">{"地址"}</th>
                        <th className="col-md-2 text-bold text-center">{"二维码编号"}</th>
                        <th className="col-md-2 text-bold text-center">{"用户状态"}</th>
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
    const {changeSearch1Type, form, getAdminList}=state;
    return {
        selected: changeSearch1Type.selected,
        form: form,
        fetching: getAdminList.fetching,
        data: getAdminList.data
    }
}


export default connect(mapStateToProps)(UserListContainer)