/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, audioCodes, roleApplicationUse, DecodeBase64, streamingTemplateFilter} from '../../Tool/Tool'

export default class StreamingTemplateListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id, name) {
        this.props._delete(id, name)
    }

    render() {
        const {data, fetching}=this.props
        let tb = []
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="10" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="10" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    var obj = JSON.parse(val.Value ? DecodeBase64(val.Value) : "");
                    tb.push(<tr key={key}>
                        <td >{obj.name}</td>
                        <td className="text-center text-bold">{streamingTemplateFilter(0, obj.streamingType)}</td>
                        <td className="text-center">{streamingTemplateFilter(1, obj.environment)}</td>
                        <td className="text-center">{streamingTemplateFilter(2, obj.format)}</td>
                        <td className="text-center">{streamingTemplateFilter(3, obj.resolution)}</td>
                        <td className="text-center">{obj.streamingType == 1 ? streamingTemplateFilter(4, obj.encoding) : streamingTemplateFilter(2, obj.format)}</td>
                        <td className="text-center">{obj.streamingType == 1 ? obj.videoBandWidth : "- -"}</td>
                        <td className="text-center">{obj.streamingType == 1 ? obj.totalBandWidth : "- -"}</td>
                        <td className="text-center">
                            {roleApplicationUse() || sessionStorage['adminId'] == val.adminId ?
                                <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            {/*<li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}}  onClick={this._detail.bind(this, '/UserManager/Admin/Detail/:' + val.adminId)}>
                                             <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                             账户详情</a></li>*/}
                                            <li style={{display: roleApplicationUse() || sessionStorage['adminId'] == val.adminId ? 'block' : 'none'}}
                                                onClick={this._detail.bind(this, '/SysManager/Platform/StreamingTemplate/Detail/:' + obj.id)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    {Current_Lang.others.editStreamProfile}</a></li>
                                            <li style={{display: roleApplicationUse() ? 'block' : 'none'}}
                                                onClick={this._delete.bind(this, obj.id, obj.name)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                {Current_Lang.others.deleteStreamProfile}</a></li>
                                            {/* {val.useYN == 'Y' ?
                                             <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}} onClick={this._stopCSE.bind(this, val.cssId, 'N', key)}><a
                                             href="javascript:void(0)"><i className="icon-stop"></i>禁用账户</a></li> :
                                             <li style={{display: roleApplicationUse('adminDetail') ? 'block' : 'none'}} onClick={this._startCSE.bind(this, val.cssId, 'Y', key)}><a
                                             href="javascript:void(0)"><i className="icon-play3"></i>启用账户</a></li>}*/}
                                        </ul>
                                    </li>
                                </ul> : "- -"}
                        </td>
                    </tr>)
                }.bind(this))
            }
        }
        var tableHeight = ($(window).height() - 240);

        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr style={{color: "black"}}>
                        <th className="col-md-2 text-bold">{Current_Lang.others.streamingProfile}</th>
                        <th className="col-md-1 text-center text-bold">{Current_Lang.others.type}</th>
                        <th className="col-md-1 text-bold text-center">{Current_Lang.others.environment}</th>
                        <th className="col-md-1 text-bold text-center">{Current_Lang.others.format}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.others.resolution}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.others.encoding}</th>
                        <th className="col-md-2 text-bold text-center">{Current_Lang.others.videoBandWidth}</th>
                        <th className="col-md-1 text-bold text-center">{Current_Lang.others.totalBandWidth}</th>
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