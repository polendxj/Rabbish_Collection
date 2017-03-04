/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData, roleApplicationUse, ListMiddleModal} from '../../Tool/Tool'

export default class CseGroupListComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _confirmSelected() {

    }

    render() {
        const {data, fetching}=this.props
        var result = ""
        if (fetching) {
            result = <tr>
                <td colSpan="7"><Loading/></td>
            </tr>

        } else {
            if (data.groupList && data.groupList.length > 0) {
                result = []
                data.groupList.forEach(function (val, key) {
                    result.push(
                        <tr key={key}>
                            <td className="text-center">{key + 1}</td>
                            <td>
                                <div className="media-left">
                                    <div style={{fontSize: "14px"}}>
                                        <a onClick={this.props._detail.bind(this, val.groupId,val.appId)}
                                           href="javascript:void(0)" data-toggle="modal"
                                           data-target="#ListModal">{val.groupId}</a>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">{val.cseCount}</td>
                            <td className="text-center">{val.appId ? val.appId : '--'}</td>
                            <td className="text-center">{val.description ? val.description : '--'}</td>
                            <td className="text-center">{val.regDate}</td>
                            <td className="text-center">
                                {roleApplicationUse() ? <ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li onClick={this._detail.bind(this, '/SysManager/ClusterSetting/CSEGroup/Detail/:' + val.groupId + ',' + val.appId)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    {Current_Lang.label.detail}</a></li>
                                            <li onClick={this.props._delete.bind(this, val.groupId)}><a
                                                href="javascript:void(0)"><i className="icon-trash"></i>
                                                {Current_Lang.label.delete}</a></li>
                                        </ul>
                                    </li>
                                </ul> : "- -"}

                            </td>
                        </tr>
                    )
                }.bind(this))
            } else {
                result = <tr>
                    <td colSpan="7"><NoData/></td>
                </tr>
            }
        }
        /*detail group info*/
        var detailInfo = ""
        if (this.props.groupCSE && this.props.groupCSE.registered && this.props.groupCSE.registered.length > 0 && this.props.detail.groupInfo) {
            var selectedTRS = []
            this.props.groupCSE.registered.forEach(function (val, key) {
                selectedTRS.push(
                    <tr key={'selectedTR' + key} style={{textAlign: 'center'}}>
                        <td>
                            <div className="media-left">
                                <div className="text-left"><a href="#"
                                                              className="text-default text-semibold">{val.node.hostName.toUpperCase()}</a>
                                </div>
                            </div>
                        </td>
                        <td>{val.node.serverIp + ':' + val.node.serverPort}</td>
                        <td>{val.node.appId + ' (' + val.node.appName + ')'}</td>
                        <td>
                            {val.node.useYN == 'Y' ? <span className="label bg-success" style={{
                                paddingLeft: "10px",
                                paddingRight: "10px"
                            }}>{Current_Lang.status.online}</span> :
                                val.node.useYN == 'S' ? <span className="label bg-danger" style={{
                                    paddingLeft: "10px",
                                    paddingRight: "10px"
                                }}>{Current_Lang.status.stopped}</span> : <span className="label label-default" style={{
                                    paddingLeft: "10px",
                                    paddingRight: "10px"
                                }}>{Current_Lang.status.offline}</span>}

                        </td>
                    </tr>
                )
            })

            detailInfo = <div className="col-md-12">
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.tableTitle.CSEBasicInfo}
                    </legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center', marginTop: '8px'}}>{Current_Lang.tableTitle.name}</label>
                        <div className="col-lg-9">
                            <input disabled="disabled" id="name" type="text" className="form-control"
                                   placeholder={Current_Lang.tableTitle.CSEGroupName}
                                   defaultValue={this.props.detail.groupInfo ? this.props.detail.groupInfo.groupId : ''}
                                   autoComplete="off"/>
                        </div>
                    </div>

                    <div className="form-group" style={{marginTop: '50px'}}>
                        <label className="col-lg-2 control-label"
                               style={{
                                   textAlign: 'center',
                                   marginTop: '8px'
                               }}>{Current_Lang.tableTitle.description}</label>
                        <div className="col-lg-9">
                                    <textarea disabled="disabled" id="description" rows="5" cols="5"
                                              className="form-control"
                                              placeholder={Current_Lang.tableTitle.describeDescription}
                                              defaultValue={this.props.detail.groupInfo ? this.props.detail.groupInfo.description : ''}>

                                    </textarea>
                        </div>
                    </div>

                </fieldset>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.tableTitle.CSEServers}
                    </legend>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th><a href="javascript:void(0)">{Current_Lang.tableTitle.CSEName}</a></th>
                                <th style={{textAlign: 'center'}}><a
                                    href="javascript:void(0)">{Current_Lang.tableTitle.IPPort}</a></th>
                                <th style={{textAlign: 'center'}}><a
                                    href="javascript:void(0)">{Current_Lang.tableTitle.APPID}</a></th>
                                <th style={{textAlign: 'center'}}><a
                                    href="javascript:void(0)">{Current_Lang.tableTitle.status}</a></th>
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
        var tableHeight = ($(window).height() - 240);
        return (

            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table id="dataTable" className="table table-bordered" style={{marginBottom: '80px'}}>
                    <thead>
                    <tr>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-3"><span
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.CSEGroupName}</span></th>
                        <th className="col-md-1 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.CSENumber}</th>
                        <th className="col-md-1 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.APPID}</th>
                        <th className="col-md-3 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.description}</th>
                        <th className="col-md-3 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.registeredDate}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {result}
                    </tbody>
                </table>
                <ListMiddleModal content={detailInfo}
                                 doAction={this._detail.bind(this, '/SysManager/ClusterSetting/CSEGroup/Detail/:' + (this.props.detail.groupInfo ? this.props.detail.groupInfo.groupId+","+sessionStorage["appId"] : ''))}
                                 tip={""}/>

            </div>

        )
    }
}