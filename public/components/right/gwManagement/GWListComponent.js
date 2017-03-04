/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {Loading, NoData} from '../../Tool/Tool'

export default class GWListComponent extends Component {
    constructor(props) {
        super(props)
        this.currentUnregisteredCSRObj = "";
        this._currentUnregisteredCSR = this._currentUnregisteredCSR.bind(this)
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id) {
        this.props._delete(id)
    }

    _startGW(id) {
        this.props._updateStatus(id, 'Y')
    }

    _stopGW(id) {
        this.props._updateStatus(id, 'N')
    }

    _currentUnregisteredCSR(ip, srInfo, gwInfo, awInfo,node) {
        this.currentUnregisteredCSRObj = {ip: ip, srInfo: srInfo, gwInfo: gwInfo, awInfo: awInfo,node:node};
        this.props._startRefresh();
    }

    render() {
        const {data, fetching}=this.props
        let tb = []
        if (fetching) {
            tb.push(<tr key={'loading'}>
                <td colSpan="7" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="7" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else if (data.length > 0) {
                data.forEach(function (val, key) {
                    var srInfo = "";
                    var gwInfo = "";
                    var awInfo = "";
                    var consulInfo = "";
                    var srPort = "";
                    var gwPort = "";
                    var awPort = "";
                    val.checks.forEach(function (check, ckKey) {
                        if (check.Name == "Service 'sr' check") {
                            srInfo = check
                        } else if (check.Name == "Service 'gateway' check") {
                            gwInfo = check;
                        } else if (check.Name == "Service 'accessweb' check") {
                            awInfo = check;
                        } else if (check.Name == "Serf Health Status") {
                            consulInfo = check;
                        }
                    });
                    for (var svc in val.services.Services) {
                        if (svc.indexOf("service_accessweb") >= 0) {
                            awPort = val.services.Services[svc].Port
                        } else if (svc.indexOf("service_gateway") >= 0) {
                            gwPort = val.services.Services[svc].Port
                        } else if (svc.indexOf("service_sr") >= 0) {
                            srPort = val.services.Services[svc].Port
                        }
                    }
                    tb.push(<tr key={key}>
                        <td className="text-center">
                            {key + 1}
                        </td>
                        <td className="text-center">
                            <a href="#" className="text-default text-semibold">{val.node.Address}</a>
                        </td>
                        <td className="text-center">
                            {srInfo.Status == 'passing' ?
                                <span style={{color: '#7EB6EC', fontWeight: 'bold',fontSize:"12px"}}>{Current_Lang.status.started}
                                    ({srPort})</span> :
                                <span style={{color: '#E31836', fontWeight: 'bold',fontSize:"12px"}}>{Current_Lang.status.stopped}
                                    ({srPort})</span>}
                        </td>
                        <td className="text-center">
                            {gwInfo.Status == 'passing' ?
                                <span style={{color: '#7EB6EC', fontWeight: 'bold',fontSize:"12px"}}>{Current_Lang.status.started}
                                    ({gwPort})</span> :
                                <span style={{color: '#E31836', fontWeight: 'bold',fontSize:"12px"}}>{Current_Lang.status.stopped}
                                    ({gwPort})</span>}
                        </td>
                        <td className="text-center">
                            {awInfo.Status == 'passing' ?
                                <span style={{color: '#7EB6EC', fontWeight: 'bold',fontSize:"12px"}}>{Current_Lang.status.started}
                                    ({awPort})</span> :
                                <span style={{color: '#E31836', fontWeight: 'bold',fontSize:"12px"}}>{Current_Lang.status.stopped}
                                    ({awPort})</span>}
                        </td>
                        <td className="text-center">
                            {consulInfo.Status == "passing" ? <span className="label bg-success"
                                                                    style={{
                                                                        paddingLeft: "10px",
                                                                        paddingRight: "10px"
                                                                    }}>{Current_Lang.status.monitoring}</span> :
                                <span className="label bg-danger"
                                      style={{
                                          paddingLeft: "10px",
                                          paddingRight: "10px"
                                      }}>{Current_Lang.status.disconnect}</span>}

                        </td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li onClick={this._currentUnregisteredCSR.bind(this, val.node.Address, srInfo.Status + "_" + srPort, gwInfo.Status + "_" + gwPort, awInfo.Status + "_" + awPort,val.node.Node)}
                                            data-toggle="modal" data-target="#modal_keyboard">
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {Current_Lang.label.register}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>)
                }.bind(this))
            }
        }
        var tableHeight = ($(window).height() - 240);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered" style={{marginBottom: '110px'}}>
                    <thead>
                    <tr >
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.label.serverIP}</th>
                        <th className="col-md-3 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.routingService}</th>
                        <th className="col-md-2 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.gatewayService}</th>
                        <th className="col-md-3 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.accessWebApp}</th>
                        <th className="col-md-2 text-center"
                            style={{fontWeight: 'bold'}}>{Current_Lang.tableTitle.listenerStatus}</th>
                        <th className="text-center" style={{width: "20px"}}><i
                            className="icon-arrow-down12"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tb}
                    </tbody>
                </table>
                <RegisterCSRForm currentUnregisteredCSRObj={this.currentUnregisteredCSRObj}
                                 _saveCSR={this.props._saveCSR}/>
            </div>

        )
    }
}
class RegisterCSRForm extends Component {
    constructor(props) {
        super(props);
    }

    _saveCSR() {
        this.props._saveCSR($("#csrName").val(), this.props.currentUnregisteredCSRObj);
    }

    render() {
        const {currentUnregisteredCSRObj}=this.props
        console.log(this.props.currentUnregisteredCSRObj)
        return (
            <div id="modal_keyboard" className="modal fade" data-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title">{Current_Lang.tableTitle.registeredCSRRouter}</h5>
                        </div>

                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-lg-2"
                                           style={{textAlign: 'center'}}>{Current_Lang.tableTitle.CSRHostname} <span
                                        style={{color: 'red'}}>*</span></label>
                                    <div className="col-lg-8">
                                        <input id="csrName" readOnly="readOnly" type="text" className="form-control" value={this.props.currentUnregisteredCSRObj && this.props.currentUnregisteredCSRObj.node ? this.props.currentUnregisteredCSRObj.node : ""}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2"
                                           style={{textAlign: 'center'}}>{Current_Lang.tableTitle.serverIP}</label>
                                    <div className="col-lg-8">
                                        <input type="text" readOnly="readOnly" className="form-control"
                                               value={this.props.currentUnregisteredCSRObj && this.props.currentUnregisteredCSRObj.ip ? this.props.currentUnregisteredCSRObj.ip : ""}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2"
                                           style={{textAlign: 'center'}}>{Current_Lang.tableTitle.services}</label>
                                    <div className="col-lg-8" style={{marginTop: "8px"}}>
                                        <a style={{
                                            color: 'black',
                                            fontSize: 'bold'
                                        }}>{currentUnregisteredCSRObj.srInfo && currentUnregisteredCSRObj.srInfo.split("_")[0] == "passing" ?
                                            <span
                                                className="label label-success pull-right">{Current_Lang.status.started}</span> :
                                            <span
                                                className="label label-danger pull-right">{Current_Lang.status.stopped}</span>} {Current_Lang.tableTitle.routingService}
                                            ({currentUnregisteredCSRObj.srInfo ? currentUnregisteredCSRObj.srInfo.split("_")[1] : ""})</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2" style={{textAlign: 'center'}}></label>
                                    <div className="col-lg-8" style={{marginTop: "8px"}}>
                                        <a style={{
                                            color: 'black',
                                            fontSize: 'bold'
                                        }}> {currentUnregisteredCSRObj.gwInfo && currentUnregisteredCSRObj.gwInfo.split("_")[0] == "passing" ?
                                            <span
                                                className="label label-success pull-right">{Current_Lang.status.started}</span> :
                                            <span
                                                className="label label-danger pull-right">{Current_Lang.status.stopped}</span>} {Current_Lang.tableTitle.gatewayService}
                                            ({currentUnregisteredCSRObj.gwInfo ? currentUnregisteredCSRObj.gwInfo.split("_")[1] : ""})</a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-lg-2" style={{textAlign: 'center'}}></label>
                                    <div className="col-lg-8" style={{marginTop: "8px"}}>
                                        <a style={{
                                            color: 'black',
                                            fontSize: 'bold'
                                        }}>{currentUnregisteredCSRObj.awInfo && currentUnregisteredCSRObj.awInfo.split("_")[0] == "passing" ?
                                            <span
                                                className="label label-success pull-right">{Current_Lang.status.started}</span> :
                                            <span
                                                className="label label-danger pull-right">{Current_Lang.status.stopped}</span>} {Current_Lang.tableTitle.accessWebApp}
                                            ({currentUnregisteredCSRObj.awInfo ? currentUnregisteredCSRObj.awInfo.split("_")[1] : ""})</a>
                                    </div>
                                </div>
                            </form>
                            <hr />
                            <span style={{
                                color: "red",
                                display: (currentUnregisteredCSRObj.srInfo && currentUnregisteredCSRObj.srInfo.split("_")[0] != "passing") || (currentUnregisteredCSRObj.gwInfo && currentUnregisteredCSRObj.gwInfo.split("_")[0] != "passing") || (currentUnregisteredCSRObj.awInfo && currentUnregisteredCSRObj.awInfo.split("_")[0] != "passing") ? "block" : "none"
                            }}>{Current_Lang.alertTip.existStatus} <span
                                className="label label-danger">{Current_Lang.status.stopped}</span> {Current_Lang.alertTip.statusNotAllow}</span>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link"
                                    data-dismiss="modal">{Current_Lang.label.cancel}</button>
                            <button
                                style={{display:(currentUnregisteredCSRObj.srInfo && currentUnregisteredCSRObj.srInfo.split("_")[0] != "passing") || (currentUnregisteredCSRObj.gwInfo && currentUnregisteredCSRObj.gwInfo.split("_")[0] != "passing") || (currentUnregisteredCSRObj.awInfo && currentUnregisteredCSRObj.awInfo.split("_")[0] != "passing") ? "none" : "inline-block"}}
                                type="button" className="btn btn-primary"
                                onClick={this._saveCSR.bind(this)}>{Current_Lang.label.register}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}