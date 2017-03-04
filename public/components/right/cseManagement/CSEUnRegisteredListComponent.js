/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from '../breadCrumbs'
import {
    Loading,
    NoData,
    roleApplicationUse,
    ListMiddleModal,
    audioCodes,
    videoCodes,
    findSortInfo,
    buildSort
} from '../../Tool/Tool'

export default class CSEListComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true;
        this.sortColumn = "REG_DATE";
        this.sortType = "DESC";
        this.currentUnregisteredCSRObj = "";
    }

    componentDidMount() {
        // buildSort("cseListTable")
    }

    _detail(path) {
        browserHistory.push(path)
    }

    _delete(id, name) {
        this.props._delete(id, name)
    }

    _startCSE(id) {
        this.props._updateStatus(id, 'Y')
    }

    _stopCSE(id) {
        this.props._updateStatus(id, 'N')
    }

    _restart(id) {

    }


    _currentUnregisteredCSR(ip, srInfo,node) {
        this.currentUnregisteredCSRObj = {ip: ip, pandoraInfo: srInfo,node:node};
        this.props._startRefresh();
    }

    render() {
        const {data, fetching, cseDetail}=this.props
        let tb = []
        if (this.firstLoad) {
            this.firstLoad = false
            tb.push(<tr key={'loading'}>
                <td colSpan="12" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else if (data) {
            if (data.unRegistered && data.unRegistered.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="12" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else if(data.unRegistered) {
                data.unRegistered.forEach(function (val, key) {
                    var pandoraInfo = "";
                    var consulInfo = "";
                    var pandoraPort = "";
                    val.checks.forEach(function (check, ckKey) {
                        if (check.Name == "Service 'pandora' check") {
                            pandoraInfo = check
                        } else if (check.Name == "Serf Health Status") {
                            consulInfo = check;
                        }
                    });
                    for (var svc in val.services.Services) {
                        if (svc.indexOf("service_pandora") >= 0) {
                            pandoraPort = val.services.Services[svc].Port
                        }
                    }
                    tb.push(<tr key={key}>
                        <td className="text-center">
                            {key + 1}
                        </td>
                        <td>
                            <a href="#" className="text-default text-semibold">{val.node.Node}</a>
                        </td>
                        <td className="text-center">
                            <a href="#" className="text-default text-semibold">{val.node.Address}</a>
                        </td>
                        <td className="text-center">
                            {pandoraInfo.Status == 'passing' ?
                                <span style={{color: '#7EB6EC', fontWeight: 'bold',fontSize:"12px"}}>{Current_Lang.status.started}
                                    ({pandoraPort})</span> :
                                <span style={{color: '#E31836', fontWeight: 'bold',fontSize:"12px"}}>{Current_Lang.status.stopped}
                                    ({pandoraPort})</span>}
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
                                        <li onClick={this._currentUnregisteredCSR.bind(this, val.node.Address, pandoraInfo.Status + "_" + pandoraPort,val.node.Node)}
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

        var tableHeight = ($(window).height()-280);
        return (
            <div>
                <div className="table-responsive" style={{maxHeight: "26px", overflowY: 'scroll'}}>
                    <table className="table table-bordered table-hover"
                           style={{marginBottom: '110px'}}>
                        <thead >
                        <tr style={{color: "black"}}>
                            <th className="text-center" style={{width: "20px"}}></th>
                            <th className="col-md-4" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                >{Current_Lang.tableTitle.CSEName}<i></i></th>
                            <th className="col-md-4 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                >{Current_Lang.tableTitle.ipAddr}<i></i></th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                >{"流化服务"}<i></i></th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                >{"监控状态"}<i></i></th>
                            <th className="text-center" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody style={{fontSize: '10px',opacity:'0'}}>
                        {tb}
                        </tbody>

                    </table>

                </div>
                <div className="table-responsive" style={{height: tableHeight+'px', overflowY: 'scroll'}}>
                    <table  className="table table-bordered table-hover"
                           style={{marginBottom: '110px',marginTop:'-21px'}}>
                        <thead style={{opacity:'0'}}>
                        <tr style={{color: "black"}}>
                            <th className="text-center" style={{width: "20px"}}></th>
                            <th className="col-md-4" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="col-md-4 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="text-center" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody style={{fontSize: '10px'}}>
                        {tb}
                        </tbody>

                    </table>
                    <RegisterCSRForm currentUnregisteredCSRObj={this.currentUnregisteredCSRObj}
                                     _saveCSR={this.props._saveCSR}/>

                </div>
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
        return (
            <div id="modal_keyboard" className="modal fade" data-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title">{Current_Lang.tableTitle.registerCSE}</h5>
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
                                    <label className="control-label col-lg-2" style={{textAlign: 'center'}}></label>
                                    <div className="col-lg-8" style={{marginTop: "8px"}}>
                                        <a style={{
                                            color: 'black',
                                            fontSize: 'bold'
                                        }}>{currentUnregisteredCSRObj.pandoraInfo && currentUnregisteredCSRObj.pandoraInfo.split("_")[0] == "passing" ?
                                            <span
                                                className="label label-success pull-right">{Current_Lang.status.started}</span> :
                                            <span
                                                className="label label-danger pull-right">{Current_Lang.status.stopped}</span>} {"流化应用"}
                                            ({currentUnregisteredCSRObj.pandoraInfo ? currentUnregisteredCSRObj.pandoraInfo.split("_")[1] : ""})</a>
                                    </div>
                                </div>
                            </form>
                            <hr />
                            <span style={{
                                color: "red",
                                display: (currentUnregisteredCSRObj.pandoraInfo && currentUnregisteredCSRObj.pandoraInfo.split("_")[0] != "passing") ? "block" : "none"
                            }}>{Current_Lang.alertTip.existStatus} <span
                                className="label label-danger">{Current_Lang.status.stopped}</span> {Current_Lang.alertTip.statusNotAllow}</span>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link"
                                    data-dismiss="modal">{Current_Lang.label.cancel}</button>
                            <button
                                style={{display:(currentUnregisteredCSRObj.pandoraInfo && currentUnregisteredCSRObj.pandoraInfo.split("_")[0] != "passing") ? "none" : "inline-block"}}
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