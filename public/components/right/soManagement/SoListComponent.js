/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, roleApplicationUse} from '../../Tool/Tool'

export default class SoListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detailLink(path) {
        browserHistory.push(path)
    }

    _delete(soId) {
        this.props._delete(soId)
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
            if (data && data.length > 0) {
                content = []
                data.forEach(function (val, key) {
                    content.push(
                        <tr key={key}>
                            <td>
                                <div className="media-left media-middle">
                                    <i className="icon-location4 position-left"
                                       style={{fontSize: "24px"}}></i>
                                </div>
                                <div className="media-left">
                                    <div style={{fontSize: "16px"}}>
                                        <a href="#" className="text-default text-semibold">{val.areaId}</a>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <h6 className="text-semibold">{val.areaName}</h6>
                            </td>
                            <td className="text-center">
                                <span className="text-muted">{val.soKeyword}</span>
                            </td>
                            <td className="text-center">{val.regDate}</td>
                            <td className="text-center">
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li style={{display: roleApplicationUse('areaWrite') ? 'block' : 'none'}}
                                                onClick={this._detailLink.bind(this, '/SysManager/Service/SO/Detail/:' + val.areaId)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    编辑区域</a></li>
                                            <li style={{display: roleApplicationUse('areaWrite') ? 'block' : 'none'}}
                                                onClick={this._delete.bind(this, val.areaId)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                删除区域</a></li>
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
                    <th className="col-md-3"># <span style={{marginLeft: '37px'}}>区域ID</span></th>
                    <th className="col-md-3 text-center">区域名称</th>
                    <th className="col-md-3 text-center">关键字</th>
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