/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData,roleApplicationUse} from '../../Tool/Tool'

export default class SEDListComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true
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

    _restart(id) {

    }


    render() {
        const {data, fetching}=this.props
        let tb = []
        if (this.firstLoad) {
            this.firstLoad = false
            tb.push(<tr key={'loading'}>
                <td colSpan="10" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if(data.sed){
                if (data.sed.sedList.length == 0) {
                    tb.push(<tr key={'noData'}>
                        <td colSpan="10" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>

                    </tr>)
                } else {
                    data.sed.sedList.forEach(function (val, key) {
                        tb.push(<tr key={key}>
                            <td>
                                <div className="media-left media-middle">
                                    <i className="icon-typewriter position-left"
                                       style={{fontSize: "24px"}}></i>
                                </div>
                                <div className="media-left">
                                    <div style={{fontSize: "16px"}}>
                                        <a href="#"
                                           className="text-default text-semibold">{val.agentIp + ':' + val.agentPort}</a>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                {val.areaName}
                            </td>
                            <td className="text-center">{val.agentComment}</td>
                            <td className="text-center">
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li style={{display: roleApplicationUse('sedServerWrite') ? 'block' : 'none'}} onClick={this._detail.bind(this, '/SysManager/Service/SED/Detail/:' + val.agentIp)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    SED详情</a></li>
                                            <li style={{display: roleApplicationUse('sedServerWrite') ? 'block' : 'none'}} onClick={this._delete.bind(this, val.agentIp)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                删除SED</a></li>
                                            <li className="divider"></li>
                                            <li><a href="#"><i className="icon-stats-bars2"></i>
                                                监控信息</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </td>
                        </tr>)
                    }.bind(this))
                }
            }

        }
        return (
            <table className="table text-nowrap">
                <thead>
                <tr style={{color: "#2196F3"}}>
                    <th className="col-md-3">SED Agent IP:PORT</th>
                    <th className="col-md-2 text-center">区域</th>
                    <th className="col-md-3 text-center">描述</th>
                    <th className="text-center" style={{width: "20px"}}><i
                        className="icon-arrow-down12"></i></th>
                </tr>
                </thead>
                <tbody>
                {tb}
                </tbody>
            </table>


        )
    }
}