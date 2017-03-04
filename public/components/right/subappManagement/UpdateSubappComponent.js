/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames'
import {browserHistory} from 'react-router'
import {Loading, audioCodes, videoCodes} from '../../Tool/Tool'

export default class UpdateSubappComponent extends Component {
    constructor(props) {
        super(props)
    }
    _detail(path) {
        browserHistory.push(path)
    }

    render() {
        var content = ""
        if (this.props.data && this.props.data.subAppVo) {
            console.log(this.props.data.subAppVo)
            var tb=[]
            this.props.data.csServerList.forEach(function (val, key) {
                tb.push(<tr key={key}>
                    <td>
                        <div className="media-left media-middle">
                            <i className="icon-drive position-left"
                               style={{fontSize: "24px"}}></i>
                        </div>
                        <div className="media-left">
                            <div style={{fontSize: "16px"}}>
                                <a href="#"
                                   className="text-default text-semibold">{val.serverIp + ':' + val.serverPort}</a>
                            </div>
                            <div className="text-muted text-size-small">
                                {val.useYN == 'Y' ? <span className="label bg-success">使用中</span> :
                                    <span className="label bg-danger">已关闭</span>}
                            </div>
                        </div>
                    </td>
                    <td className="text-center">{val.location}</td>
                    <td className="text-center">
                        {val.areaName}
                    </td>
                    <td className="text-center">{val.hostName}</td>
                    <td className="text-center">{val.serviceType}</td>
                    <td className="text-center">{val.appName}</td>
                    <td className="text-center">{val.groupId}</td>
                    <td className="text-center">
                        <div className="progress content-group-sm" style={{marginTop: '15px'}}>
                            <div className={classnames({
                                'progress-bar': true,
                                'progress-bar-striped': val.status.toLowerCase()=='active',
                                'active': true,
                                'progress-bar-warning': val.status.toLowerCase()!='active'
                            })} style={{
                                width: '100%'
                            }}>
                                {val.status}
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="progress content-group-sm" style={{marginTop: '15px'}}>
                            <div className={classnames({
                                'progress-bar': true,
                                'progress-bar-striped': true,
                                'active': true,
                                'progress-bar-warning': (parseFloat(val.currentConnect) / parseFloat(val.maxConnect)).toFixed(2) > 0.7
                            })} style={{
                                width: (parseFloat(val.currentConnect) / parseFloat(val.maxConnect)).toFixed(2) * 100 + '%'
                            }}>
                                {(parseFloat(val.currentConnect) / parseFloat(val.maxConnect)).toFixed(2) * 100 + '%'}
                            </div>
                        </div>
                    </td>
                    <td className="text-center">{val.regDate}</td>
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
                            <li>子级AppId : {this.props.data.subAppVo.subAppId}</li>
                            <li>子级App名称 : {this.props.data.subAppVo.appName}</li>
                            <li>视频（宽*高）: {this.props.data.subAppVo.videoWidth}*{this.props.data.subAppVo.videoHeight}</li>
                            <li>音频启用 :
                                <span className="text-semibold" style={{marginRight: '10px'}}>
                                <span className={classnames({
                                    'label': true,
                                    'label-success': this.props.data.subAppVo.audio == 1,
                                    'label-default': this.props.data.subAppVo.audio != 1
                                })}>{this.props.data.subAppVo.audio == 1 ? '启用' : '未启用'}</span>
                            </span></li>
                            <li>启动地址 : {this.props.data.subAppVo.webUrl}</li>
                        </ul>
                        <footer>所属父级App <cite title="Source Title">{this.props.data.subAppVo.appId}</cite></footer>
                    </blockquote>
                    <hr />
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h5 className="panel-title">相关CSE详情</h5>
                        </div>
                        <table className="table text-nowrap">
                            <thead>
                            <tr style={{color: "#2196F3"}}>
                                <th className="col-md-1">IP:Port</th>
                                <th className="col-md-1 text-center">位置</th>
                                <th className="col-md-1 text-center">区域</th>
                                <th className="col-md-1 text-center">主机名</th>
                                <th className="col-md-1 text-center">服务类型</th>
                                <th className="col-md-2 text-center">App名称</th>
                                <th className="col-md-1 text-center">分组</th>
                                <th className="col-md-1 text-center">设备状态</th>
                                <th className="col-md-1 text-center">用户负载</th>
                                <th className="col-md-2 text-center">注册时间</th>
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