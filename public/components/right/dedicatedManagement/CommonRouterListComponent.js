/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, ListMiddleModal, CustomeListMiddleModal,roleApplicationUse} from '../../Tool/Tool'

export default class CommonRouterListComponent extends Component {
    constructor(props) {
        super(props)
    }

    _detailLink(path) {
        browserHistory.push(path)
    }

    _delete(soId, flag, name) {
        this.props._delete(soId, flag, name)
    }

    render() {
        const {data, fetching, commonRouterList}=this.props
        let content = ""
        if (commonRouterList && commonRouterList.result) {
            if (commonRouterList.routingRuleList.length > 0) {
                content = []
                commonRouterList.routingRuleList.forEach(function (val, key) {
                    content.push(
                        <tr key={key} style={{textAlign: 'center'}}>
                            <td className="text-center">
                                {key + 1}
                            </td>
                            <td className="text-center">
                                {val.areaName}
                            </td>
                            <td className="text-center">
                                <i className="icon-attachment2"></i>
                            </td>
                            <td style={{textAlign: 'left'}}>
                                <a href="#">{val.appId}</a>{' (' + val.appName + ')'}
                            </td>
                            <td>
                                <i className="icon-arrow-right16"></i>
                            </td>
                            <td>
                                <a onClick={this.props._detail.bind(this, val.groupId)} href="javascript:void(0)"
                                   data-toggle="modal"
                                   data-target="#ListModal">
                                    {val.groupId}
                                </a>
                            </td>
                            <td className="text-center">
                                {roleApplicationUse()?<ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li onClick={this._detailLink.bind(this, '/SysManager/Service/Dedicated/Detail/:' + val.seq + ',c')}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    {Current_Lang.tableTitle.editGenericRoutingRule}</a></li>
                                            <li onClick={this._delete.bind(this, val.seq, 0, val.areaName + Current_Lang.alertTip.serviceAreaRouteTo + val.groupId + Current_Lang.alertTip.engineGroup)}>
                                                <a
                                                    href="javascript:void(0)"><i className="icon-trash"></i>
                                                    {Current_Lang.tableTitle.deleteGenericRoutingRule}</a></li>
                                        </ul>
                                    </li>
                                </ul>:"- -"}

                            </td>
                        </tr>
                    )
                }.bind(this))
            } else {
                content = <tr>
                    <td colSpan="7"><NoData/></td>
                </tr>
            }
        } else {
            content = <tr>
                <td colSpan="7"><Loading/></td>
            </tr>

        }

        var detailInfo = ""
        if (this.props.groupCSE && this.props.groupCSE.registered && this.props.groupCSE.registered.length > 0 && this.props.detail.groupInfo) {
            var selectedTRS = []
            this.props.groupCSE.registered.forEach(function (val, key) {
                selectedTRS.push(
                    <tr key={'selectedTR' + key} style={{textAlign: 'center'}}>
                        <td>
                            <div className="media-left">
                                <div className="text-left"><a href="#"
                                                              className="text-default text-semibold">{val.hostName.toUpperCase()}</a>
                                </div>
                            </div>
                        </td>
                        <td>{val.serverIp + ':' + val.serverPort}</td>
                        <td>{val.appName + ' (' + val.appId + ')'}</td>
                        <td>
                            {val.useYN == 'Y' ?
                                <span className="label bg-success" style={{paddingLeft: "10px", paddingRight: "10px"}}>在线</span> :
                                val.useYN == 'S' ? <span className="label bg-danger"
                                                         style={{paddingLeft: "10px", paddingRight: "10px"}}>停止</span> :
                                    <span className="label label-default"
                                          style={{paddingLeft: "10px", paddingRight: "10px"}}>离线</span>}

                        </td>
                    </tr>
                )
            })

            detailInfo = <div className="col-md-12">
                <fieldset className="content-group">
                    <legend className="text-bold">
                        CSE服务器
                    </legend>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th><a href="javascript:void(0)">CSE 名称</a></th>
                                <th style={{textAlign: 'center'}}><a href="javascript:void(0)">{Current_Lang.tableTitle.IPPort}</a></th>
                                <th style={{textAlign: 'center'}}><a href="javascript:void(0)">{Current_Lang.label.APPID}</a></th>
                                <th style={{textAlign: 'center'}}><a href="javascript:void(0)">{Current_Lang.tableTitle.status}</a></th>
                            </tr>
                            </thead>
                            <tbody >
                            {selectedTRS}
                            </tbody>
                        </table>
                    </div>

                </fieldset>

            </div>
        } else {
            detailInfo = <Loading />
        }
        var tableHeight = ($(window).height()-300);
        return (

            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-center" style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.serviceAreaSGIDRange}</th>
                        <th className="col-md-1 text-center" style={{fontWeight: 'bold'}}></th>
                        <th className="col-md-2" style={{fontWeight: 'bold'}}>{Current_Lang.label.APPID}</th>
                        <th className="col-md-3 text-center" style={{fontWeight: 'bold'}}></th>
                        <th className="col-md-4 text-center" style={{fontWeight: 'bold'}}> {Current_Lang.label.CSEGroup}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {content}
                    </tbody>
                </table>
                <ListMiddleModal hide={"true"} content={detailInfo} doAction={""} tip={""}/>
            </div>



        )
    }
}