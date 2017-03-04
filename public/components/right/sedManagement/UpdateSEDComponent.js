/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames'
import {browserHistory} from 'react-router'
import {Loading, audioCodes, videoCodes} from '../../Tool/Tool'

export default class UpdateSEDComponent extends Component {
    constructor(props) {
        super(props)
    }
    _detail(path) {
        browserHistory.push(path)
    }

    render() {
        var content = ""
        if (this.props.data && this.props.data.sedVo) {
            console.log(this.props.data.subAppVo)
            var tb=[]
            this.props.data.sedCssList.forEach(function (val, key) {
                tb.push(<tr key={key}>
                    <td>
                        <div className="media-left media-middle">
                            <i className="icon-drive position-left"
                               style={{fontSize: "24px"}}></i>
                        </div>
                        <div className="media-left">
                            <div style={{fontSize: "16px"}}>
                                <a href="#"
                                   className="text-default text-semibold">{val.cssIp }</a>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">{val.hostName}</td>
                    <td className="text-center">{val.appId}</td>
                    <td className="text-center">
                        <div className="progress content-group-sm" style={{marginTop: '15px'}}>
                            <div className={classnames({
                                'progress-bar': true,
                                'progress-bar-striped': val.result==1,
                                'active': true,
                                'progress-bar-warning': val.result==0
                            })} style={{
                                width: '100%'
                            }}>
                                {val.result==1?'使用中':'异 常'}
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle"
                                   data-toggle="dropdown" aria-expanded="false"><i
                                    className="icon-menu7"></i></a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li onClick={this._detail.bind(this, '/SysManager/Service/CSE/Detail/:' + val.cssId)}>
                                        <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                            CSE详情</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#"><i className="icon-stats-bars2"></i>
                                        监控信息</a></li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>)
            }.bind(this))
            content =
                <div>
                    <blockquote className="no-margin">
                        <ul className="list-inline no-margin-bottom">
                            <li>SED IP&PORT: {this.props.data.sedVo.agentIp}:{this.props.data.sedVo.agentPort}</li>
                            <li>区域名称 : {this.props.data.sedVo.areaName}</li>
                            <li></li>
                        </ul>
                        <footer>描述  <cite title="Source Title">{this.props.data.sedVo.agentComment?this.props.data.sedVo.agentComment:'无'}</cite></footer>
                    </blockquote>
                    <hr />
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h5 className="panel-title">相关CSE详情</h5>
                        </div>
                        <table className="table text-nowrap">
                            <thead>
                            <tr style={{color: "#2196F3"}}>
                                <th className="col-md-1">IP</th>
                                <th className="col-md-1 text-center">主机名</th>
                                <th className="col-md-2 text-center">AppID</th>
                                <th className="col-md-1 text-center">检测状态</th>
                                <th className="text-center" style={{width: "20px"}}><i
                                    className="icon-arrow-down12"></i></th>
                            </tr>
                            </thead>
                            <tbody>
                            {tb}
                            </tbody>
                        </table>
                    </div>
                </div>
        } else {
            content = <Loading/>
        }
        return (
            <div>
                {content}
            </div>
        )

    }
}