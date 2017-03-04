/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from './breadCrumbs'
import {Loading, NoData} from '../Tool/Tool'

export default class CSSServerMonitor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data, fetching}=this.props
        var content=""
        console.log(data)
        if (data && data.serverList && data.serverList.length > 0) {
            content=[]
            data.serverList.forEach(function (val, key) {
                content.push(
                    <div className="col-lg-4" key={key}>
                        <div className="panel panel-white">

                            <div className="panel-body">
                                <ul className="media-list content-group">
                                    <li className="media stack-media-on-mobile">
                                        <div className="media-left">
                                            <div className="thumb">
                                                <i className="icon-server" style={{fontSize: "100px"}}></i>
                                            </div>
                                        </div>

                                        <div className="media-body">
                                            <h4 className="media-heading"><a href="javascript:void(0)">{val.serverIp}</a>
                                            </h4>
                                            <ul className="list-inline list-inline-separate text-muted mb-5">
                                                <li><i className="icon-drive position-left"></i> 主机名</li>
                                                <li>{val.hostName}</li>
                                            </ul>
                                            <ul className="progress-list">
                                                <li>
                                                    <label>访问量: {val.currentConnect} / {val.maxConnect} <span>{(parseFloat(val.currentConnect) / parseFloat(val.maxConnect)).toFixed(2) * 100 + '%'}</span></label>
                                                    <div className="progress progress-xxs">
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
                                                </li>
                                                <li>
                                                    <label>CPU使用率 <span>{val.cpuRate}%</span></label>
                                                    <div className="progress progress-xxs">
                                                        <div className={classnames({
                                                            'progress-bar': true,
                                                            'progress-bar-striped': true,
                                                            'active': true,
                                                            'progress-bar-warning': (val.cpuRate) > 70
                                                        })} style={{
                                                            width: val.cpuRate + '%'
                                                        }}>
                                                            {val.cpuRate + '%'}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <label>内存使用率 <span>{val.memRate}%</span></label>
                                                    <div className="progress progress-xxs">
                                                        <div className={classnames({
                                                            'progress-bar': true,
                                                            'progress-bar-striped': true,
                                                            'active': true,
                                                            'progress-bar-warning': (val.memRate) > 70
                                                        })} style={{
                                                            width: val.memRate + '%'
                                                        }}>
                                                            {val.memRate + '%'}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <label>网络资源占有率 <span>{val.netRate}%</span></label>
                                                    <div className="progress progress-xxs">
                                                        <div className={classnames({
                                                            'progress-bar': true,
                                                            'progress-bar-striped': true,
                                                            'active': true,
                                                            'progress-bar-warning': (val.netRate) > 70
                                                        })} style={{
                                                            width: val.netRate + '%'
                                                        }}>
                                                            {val.netRate + '%'}
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <label>磁盘使用率 <span>{val.diskRate}%</span></label>
                                                    <div className="progress progress-xxs">
                                                        <div className={classnames({
                                                            'progress-bar': true,
                                                            'progress-bar-striped': true,
                                                            'active': true,
                                                            'progress-bar-warning': (val.diskRate) > 70
                                                        })} style={{
                                                            width: val.diskRate + '%'
                                                        }}>
                                                            {val.diskRate + '%'}
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                )
            })
        } else {
            content=<NoData/>
        }

        return (
            <div>
                <div className="content" style={{marginTop: '20px'}}>

                    {content}

                </div>
            </div>

        )
    }
}