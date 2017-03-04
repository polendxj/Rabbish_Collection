/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData,roleApplicationUse} from '../../Tool/Tool'

export default class AdminListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id) {
        this.props._delete(id)
    }

    _startCSE(id) {
        this.props._updateStatus(id, 'Y')
    }

    _stopCSE(id) {
        this.props._updateStatus(id, 'N')
    }


    render() {
        const {data, fetching}=this.props
        let tb = []
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

                    var accountStatusIcon = classnames({
                        'icon-user-check': val.useYN == 'Y',
                        'icon-user-block': val.useYN != 'Y',
                        'position-left': true
                    })
                    tb.push(<tr key={key} style={{backgroundColor:sessionStorage['adminId']==val.adminId?"#F8F8F8":""}}>
                        <td className="text-center">{key+1}</td>
                        <td>
                            <div className="media-left">
                                <div style={{fontSize: "14px"}}>
                                    <a href="#"
                                       className="text-default text-semibold">{val.adminName}</a>
                                </div>
                            </div>
                        </td>
                        <td className="text-center">{val.adminId}</td>
                        <td className="text-center">{val.permissionId}</td>
                        <td className="text-center">{val.phoneNumber}</td>
                        <td className="text-center">
                            <div className="text-muted text-size-small">
                                {val.useYN == 'Y' ? <span className="label bg-success">{Current_Lang.tableTitle.enable}</span> :
                                    <span className="label bg-danger">{Current_Lang.tableTitle.disabled}</span>}
                            </div>
                        </td>
                        <td className="text-center">{val.regDate}</td>
                        <td className="text-center">
                            {roleApplicationUse() || sessionStorage['adminId']==val.adminId?<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        {/*<li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}  onClick={this._detail.bind(this, '/UserManager/Admin/Detail/:' + val.adminId)}>
                                         <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                         账户详情</a></li>*/}
                                        <li style={{display:roleApplicationUse() || sessionStorage['adminId']==val.adminId?'block':'none'}} onClick={this._detail.bind(this, '/UserManager/Admin/ModifyPassword/:' + val.adminId)}>
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {Current_Lang.tableTitle.changePassword}</a></li>
                                        <li style={{display:roleApplicationUse()?'block':'none'}} onClick={this._delete.bind(this, val.adminId)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {Current_Lang.tableTitle.deleteAccount}</a></li>
                                        {/* {val.useYN == 'Y' ?
                                         <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}} onClick={this._stopCSE.bind(this, val.cssId, 'N', key)}><a
                                         href="javascript:void(0)"><i className="icon-stop"></i>禁用账户</a></li> :
                                         <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}} onClick={this._startCSE.bind(this, val.cssId, 'Y', key)}><a
                                         href="javascript:void(0)"><i className="icon-play3"></i>启用账户</a></li>}*/}
                                    </ul>
                                </li>
                            </ul>:"- -"}

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
                        <th className="col-md-2 text-bold">{Current_Lang.tableTitle.adminName}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.userAccount}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.Permission}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.contactInfo}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.status}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.tableTitle.registeredDate}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
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