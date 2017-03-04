/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData} from '../../Tool/Tool'

export default class GroupListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detailLink(path) {
        browserHistory.push(path)
    }

    _delete(id) {
        this.props._delete(id)
    }

    render() {
        const {data, fetching}=this.props
        let content = ""
        if (fetching) {
            content =
                <tr key={'loading'}>
                    <td colSpan="5" style={{textAlign: 'center'}}>
                        <Loading />
                    </td>
                </tr>
        } else {
            console.log(data)
            if (data && data.length > 0) {
                content = []
                data.forEach(function (val, key) {
                    var soApps = []
                    val.detail.groupInfo.groupAppList.forEach(function (item, key) {
                        soApps.push(
                            <li key={'app'+key}>
                                <a href="#">
                                    <div className="media-body">
                                        <div className="media-heading">
                                            <a href="javascript:void(0)" className="letter-icon-title"><i className="icon-location4 text-size-mini position-left"></i>{item.areaName}</a>
                                        </div>

                                        <div className="text-muted text-size-small"> 区域ID : {item.areaId} / App ID : {item.appId}</div>
                                    </div>
                                </a>
                            </li>
                        )
                    })
                    content.push(
                        <tr key={key}>
                            <td>
                                <div className="media-left media-middle">
                                    <i className="icon-make-group position-left"
                                       style={{fontSize: "24px"}}></i>
                                </div>
                                <div className="media-left">
                                    <div style={{fontSize: "16px"}}>
                                        <a href="#" className="text-default text-semibold">{val.group.groupId}</a>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <div className="btn-group">
                                    <a href="#" className="badge badge-primary dropdown-toggle" data-toggle="dropdown"
                                       aria-expanded="false">{val.group.soAppCount} <span className="caret"></span></a>

                                    <ul className="dropdown-menu dropdown-menu-right">
                                        {soApps}
                                    </ul>
                                </div>
                            </td>
                            <td className="text-center">
                                <span className="text-muted">{val.group.description}</span>
                            </td>
                            <td className="text-center">{val.group.regDate}</td>
                            <td className="text-center">
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li onClick={this._detailLink.bind(this, '/SysManager/Service/Group/Detail/:' + val.group.groupId)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    编辑分组</a></li>
                                            <li onClick={this._delete.bind(this, val.group.groupId)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                删除分组</a></li>
                                            <li className="divider"></li>
                                            <li><a href="#"><i className="icon-stats-bars2"></i>
                                                监控信息</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    )
                }.bind(this))
            } else {
                content =
                    <tr key={'noData'}>
                        <td colSpan="5" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>
            }
        }
        return (
            <table className="table text-nowrap">
                <thead>
                <tr>
                    <th className="col-md-3"># <span style={{marginLeft: '37px'}}>分组ID</span></th>
                    <th className="col-md-2 text-center">区域App数量</th>
                    <th className="col-md-4 text-center">描述</th>
                    <th className="col-md-2 text-center">注册时间</th>
                    <th className="text-center" style={{width: "20px"}}><i
                        className="icon-arrow-down12"></i></th>
                </tr>
                </thead>
                <tbody>
                {content}
                </tbody>
            </table>
        )
    }
}