/**
 * Created by Administrator on 2016/8/22.
 */
import React, {Component, PropTypes} from 'react';
import BreadCrumbs from './breadCrumbs'
import Search1 from './Search1'
import Pagenation from './Pagenation'
export default class DataCenterList extends Component {
    render() {
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={[{text: '系统管理', link: ''}, {text: '服务', link: ''}, {text: 'CSR 路由', link: ''}]}
                    icon={'icon-cog6'}
                    operation={[{icon: "icon-git-merge", text: "注册CSR服务", action: ""}, {icon: "icon-spinner9", text: "刷新", action: ""}]}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            <Search1 items={[{key:"1",value:"1"},{key:"2",value:"2"}]} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            <table className="table text-nowrap">
                                                <thead>
                                                <tr>
                                                    <th className="col-md-3">#</th>
                                                    <th className="col-md-2 text-center">CSR IP/PORT</th>
                                                    <th className="col-md-2 text-center">管理页URL</th>
                                                    <th className="col-md-2 text-center">注册时间</th>
                                                    <th className="text-center" style={{width: "20px"}}><i className="icon-arrow-down12"></i></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="media-left media-middle">
                                                            <i className="icon-git-merge position-left" style={{fontSize:"24px"}}></i>
                                                        </div>
                                                        <div className="media-left">
                                                            <div style={{fontSize:"16px"}}>
                                                                <a href="#" className="text-default text-semibold">Test CSR</a>
                                                            </div>
                                                            <div className="text-muted text-size-small">
                                                                <span className="label bg-danger">已关闭</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center"><h6 className="text-semibold">192.168.1.1:8080</h6></td>
                                                    <td className="text-center"><span className="text-muted">http://10.10.10.10:8081/CSRS</span></td>
                                                    <td className="text-center">2016-08-26 16:33:51.0</td>
                                                    <td className="text-center">
                                                        <ul className="icons-list">
                                                            <li className="dropdown">
                                                                <a href="#" className="dropdown-toggle"
                                                                   data-toggle="dropdown" aria-expanded="false"><i
                                                                    className="icon-menu7"></i></a>
                                                                <ul className="dropdown-menu dropdown-menu-right">
                                                                    <li><a href="#"><i className="icon-pencil5"></i>
                                                                        编辑CSR</a></li>
                                                                    <li><a href="#"><i className="icon-trash"></i>
                                                                        删除CSR</a></li>
                                                                    <li><a href="#"><i className="icon-play3"></i>
                                                                        开启CSR</a></li>
                                                                    <li className="divider"></li>
                                                                    <li><a href="#"><i className="icon-stats-bars2"></i>
                                                                        监控信息</a></li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="media-left media-middle">
                                                            <i className="icon-git-merge position-left" style={{fontSize:"24px"}}></i>
                                                        </div>
                                                        <div className="media-left">
                                                            <div style={{fontSize:"16px"}}>
                                                                <a href="#" className="text-default text-semibold">Test CSR</a>
                                                            </div>
                                                            <div className="text-muted text-size-small">
                                                                <span className="label bg-success">运行中</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center"><h6 className="text-semibold">192.168.1.1:8080</h6></td>
                                                    <td className="text-center"><span className="text-muted">http://10.10.10.10:8081/CSRS</span></td>
                                                    <td className="text-center">2016-08-26 16:33:51.0</td>
                                                    <td className="text-center">
                                                        <ul className="icons-list">
                                                            <li className="dropdown">
                                                                <a href="#" className="dropdown-toggle"
                                                                   data-toggle="dropdown" aria-expanded="false"><i
                                                                    className="icon-menu7"></i></a>
                                                                <ul className="dropdown-menu dropdown-menu-right">
                                                                    <li><a href="#"><i className="icon-pencil5"></i>
                                                                        编辑CSR</a></li>
                                                                    <li><a href="#"><i className="icon-trash"></i>
                                                                        删除CSR</a></li>
                                                                    <li><a href="#"><i className="icon-stop"></i>
                                                                        停止CSR</a></li>
                                                                    <li className="divider"></li>
                                                                    <li><a href="#"><i className="icon-stats-bars2"></i>
                                                                        监控信息</a></li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <Pagenation />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}