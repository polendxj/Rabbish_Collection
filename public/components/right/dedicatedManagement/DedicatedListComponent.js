/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData} from '../../Tool/Tool'

export default class DedicatedListComponent extends Component {
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
                    <td colSpan="9" style={{textAlign: 'center'}}>
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
                                        <a href="#" className="text-default text-semibold">{val.stbId}</a>
                                    </div>
                                    <div className="text-muted text-size-small">
                                        {val.stbIp ? val.stbIp : '- -'}
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">
                                <h6 className="text-semibold">{val.sourceAreaName ? val.sourceAreaName : '- -'}</h6>
                            </td>
                            <td className="text-center">
                                <span className="text-muted">{val.sourceType ? (val.sourceType==1?'精确匹配':'通配符匹配（*）') : '- -'}</span>
                            </td>
                            <td className="text-center">
                                {val.dedicatedType==1?<span className="label label-primary">允许访问 <i className="icon-arrow-right8"></i></span>:<span className="label label-danger">禁止访问 <i className="icon-arrow-right8"></i></span>}
                            </td>
                            <td className="text-center">
                                {val.cssIp ? val.cssIp : '- -'}
                            </td>
                            <td className="text-center">
                                <span className="text-muted">{val.targetAreaName ? val.targetAreaName : '- -'}</span>
                            </td>
                            <td className="text-center">
                                <span className="text-muted">{val.groupId ? val.groupId : '- -'}</span>
                            </td>
                            <td className="text-center">{val.regDate}</td>
                            <td className="text-center">
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li onClick={this._detailLink.bind(this, '/SysManager/Service/Dedicated/Detail/:' + val.seq+',d')}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    编辑专用策略</a></li>
                                            <li onClick={this._delete.bind(this, val.seq)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                删除专用策略</a></li>
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
                        <td colSpan="9" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>
            }
        }
        return (
            <table className="table text-nowrap">
                <thead>
                <tr style={{color: 'rgb(33, 150, 243)'}}>
                    <th className="col-md-2"># <span style={{marginLeft: '37px'}}>机顶盒</span></th>
                    <th className="col-md-1 text-center">机顶盒区域信息</th>
                    <th className="col-md-1 text-center">机顶盒配置策略</th>
                    <th className="col-md-1 text-center"></th>
                    <th className="col-md-2 text-center">CSE IP</th>
                    <th className="col-md-1 text-center">CSE区域信息</th>
                    <th className="col-md-1 text-center">组</th>
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