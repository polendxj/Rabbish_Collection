/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData} from '../../Tool/Tool'

export default class SEDStatusComponent extends Component {
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
            if(data.detection){
                if (data.detection.sedStatusList.length == 0) {
                    tb.push(<tr key={'noData'}>
                        <td colSpan="10" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>

                    </tr>)
                } else {
                    data.detection.sedStatusList.forEach(function (val, key) {
                        tb.push(<tr key={key}>
                            <td>
                                <div className="media-left media-middle">
                                    <i className="icon-drive position-left"
                                       style={{fontSize: "24px"}}></i>
                                </div>
                                <div className="media-left">
                                    <div style={{fontSize: "16px"}}>
                                        <a href="#"
                                           className="text-default text-semibold">{val.agentIp + ':' + val.agentPort}</a>
                                    </div>
                                    <div className="text-muted text-size-small">
                                        {val.useYN == 'Y' ? <span className="label bg-success">使用中</span> :
                                            <span className="label bg-danger">已关闭</span>}
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                {val.appName+'('+ val.appId +')'}
                            </td>
                            <td className="text-center">{val.cycle}</td>
                            <td className="text-center">{val.serverCnt}</td>
                            <td className="text-center">{val.failCnt}</td>
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
                    <th className="col-md-2 text-center">应用名称</th>
                    <th className="col-md-2 text-center">探测周期</th>
                    <th className="col-md-1 text-center">服务器数量</th>
                    <th className="col-md-1 text-center">失败数量</th>
                </tr>
                </thead>
                <tbody>
                {tb}
                </tbody>
            </table>


        )
    }
}