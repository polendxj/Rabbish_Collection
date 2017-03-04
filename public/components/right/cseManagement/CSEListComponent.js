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
    }

    componentDidMount() {
        buildSort("cseListTable")
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

    _sort(type) {
        var sortInfo = findSortInfo("cseListTable");
        this.sortColumn = type;
        this.sortType = sortInfo;
        this.props._sort(this.sortColumn, this.sortType);
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
            if (data.length == 0) {
                tb.push(<tr key={'noData'}>
                    <td colSpan="12" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>

                </tr>)
            } else {
                data.forEach(function (val, key) {
                    tb.push(<tr key={key}>
                        <td className="text-center">
                            {key+1}
                        </td>
                        <td>
                            <a onClick={this.props._detailCSE.bind(this, val.node.cssId)} href="javascript:void(0)"
                               data-toggle="modal"
                               data-target="#ListModal"
                            >{val.node.hostName ? val.node.hostName : '--'}</a>
                        </td>
                        <td className="text-center">
                            {val.node.serverIp}
                        </td>
                        <td className="text-center">{val.node.hostName && val.node.hostName.split("-").length>=3 ? val.node.hostName.split("-")[1] : val.node.location}</td>
                        <td className="text-center">{val.node.appId + ' (' + val.node.appName + ')'}</td>
                        <td className="text-center">{val.node.groupId}</td>
                        <td className="text-center" style={{position: 'relative'}}>
                            {val.node.maxConnect}
                        </td>
                        <td className="text-center">
                            {val.node.useYN == 'Y' ?
                                <span className="label bg-success" style={{paddingLeft: "10px", paddingRight: "10px"}}>{Current_Lang.status.online}</span> :
                                val.node.useYN == 'S' ? <span className="label label-default"
                                                         style={{paddingLeft: "10px", paddingRight: "10px"}}>{Current_Lang.status.offline}</span> :
                                    <span className="label label-default"
                                          style={{paddingLeft: "10px", paddingRight: "10px"}}>{Current_Lang.status.offline}</span>}
                        </td>
                        <td className="text-center">
                            {roleApplicationUse()?<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        {/*<li style={{display: roleApplicationUse('cssDetail') ? 'block' : 'none'}}
                                         onClick={this._detail.bind(this, '/SysManager/Service/CSE/Detail/:' + val.cssId)}>
                                         <a href="javascript:void(0)" ><i className="icon-pencil5"></i>
                                         CSE详情</a></li>*/}
                                        <li
                                            onClick={this.props._detailCSE.bind(this, val.node.cssId)}
                                            href="javascript:void(0)"
                                            data-toggle="modal"
                                            data-target="#ListModal">
                                            <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                {Current_Lang.tableTitle.CSEDetail}</a></li>
                                        {val.node.useYN == 'Y' ?
                                            <li
                                                onClick={this._stopCSE.bind(this, val.node.cssId, 'N', key)}><a
                                                href="javascript:void(0)"><i className="icon-stop"></i>{Current_Lang.status.offline}</a></li> :
                                            <li
                                                onClick={this._startCSE.bind(this, val.node.cssId, 'Y', key)}><a
                                                href="javascript:void(0)"><i className="icon-play3"></i>{Current_Lang.tableTitle.online}</a></li>}
                                        <li
                                            onClick={this._delete.bind(this, val.node.cssId, val.node.hostName)}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {Current_Lang.tableTitle.deleteCSE}</a></li>

                                        {/*{val.node.useYN == 'Y' ? (
                                         <li style={{display: roleApplicationUse('cssWrite') ? 'block' : 'none'}}
                                         onClick={this._restart.bind(this, val.node.cssId)}><a
                                         href="javascript:void(0)"><i className="icon-spinner9"></i>
                                         重启CSE</a></li>) : ""}
                                         <li className="divider"></li>
                                         <li><a href="#"><i className="icon-stats-bars2"></i>
                                         监控信息</a></li>*/}
                                    </ul>
                                </li>
                            </ul>:"- -"}

                        </td>
                    </tr>)
                }.bind(this))
            }
        }

        /*cse detail*/
        var detail = ""
        if (cseDetail && cseDetail.cssVo) {
            detail = <div className="col-md-12">
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.label.ServerInfo}
                    </legend>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.tableTitle.CSEName}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.hostName}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.tableTitle.ipAddr}</td>
                                <td style={{width: '30%'}}><kbd>{cseDetail.cssVo.serverIp}</kbd></td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.operationSystem}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.osType}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.memorySize}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.memory} M</td>

                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.GPUModel}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.gpuInfo}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.CPUModel}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.cpuInfo}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </fieldset>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.label.engineInfo}
                    </legend>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.CSEVersion}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.cssVersion}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.serviceType}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.serviceType}</td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.tableTitle.port}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.serverPort}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.ERMIPAndPort}</td>
                                <td style={{width: '30%'}}>
                                    <kbd>{cseDetail.cssVo.ermIp + ':' + cseDetail.cssVo.ermPort}</kbd></td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.activeSessionNumber}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.currentConnect}个</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.maxSessionNumber}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.maxConnect}个</td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.targetBitrate}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.targetBitrate}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.VideoBitrate}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.videoBitrate}</td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.frameRate}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.frameRate}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.GOPSize}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.gopSize}</td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.audioEncode}</td>
                                <td style={{width: '30%'}}>{audioCodes(cseDetail.cssVo.audioCodec)}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.videoEncode}</td>
                                <td style={{width: '30%'}}>{videoCodes(cseDetail.cssVo.videoCodec)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </fieldset>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.label.statusInfo}
                    </legend>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.location}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.hostName && cseDetail.cssVo.hostName.split("-").length>=3 ? cseDetail.cssVo.hostName.split("-")[1] : cseDetail.cssVo.location}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.CSEGroup}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.groupId}</td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.registeredDate}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.regDate}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.deviceStatus}</td>
                                <td style={{width: '30%'}}>
                                    {cseDetail.cssVo.useYN == 'Y' ? <span className="label bg-success" style={{
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
                                    }}>{Current_Lang.status.online}</span> :
                                        cseDetail.cssVo.useYN == 'S' ? <span className="label label-default" style={{
                                            paddingLeft: "10px",
                                            paddingRight: "10px"
                                        }}>{Current_Lang.status.offline}</span> : <span className="label label-default" style={{
                                            paddingLeft: "10px",
                                            paddingRight: "10px"
                                        }}>{Current_Lang.status.offline}</span>}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </fieldset>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.label.AppInfo}
                    </legend>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <tbody>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.tableTitle.APPID}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.appId}</td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.tableTitle.APPName}</td>
                                <td style={{width: '30%'}}>{cseDetail.cssVo.appName}</td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.serviceUrl}</td>
                                <td style={{width: '30%'}}><kbd>{cseDetail.cssVo.webUrl}</kbd></td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.resolution}</td>
                                <td style={{width: '30%'}}>
                                    <span className="text-semibold"
                                          style={{marginRight: '10px'}}>{cseDetail.cssVo.videoWidth + '*' + cseDetail.cssVo.videoHeight}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}>{Current_Lang.label.enableAudio}</td>
                                <td style={{width: '30%'}}>
                                    <span className="text-semibold"
                                          style={{marginRight: '10px'}}>

                                                                <span className={classnames({
                                                                    'label': true,
                                                                    'label-success': cseDetail.cssVo.audio == 1,
                                                                    'label-default': cseDetail.cssVo.audio != 1
                                                                })}>{cseDetail.cssVo.audio == 1 ? Current_Lang.tableTitle.enable : Current_Lang.tableTitle.disabled}</span>
                                                            </span>
                                </td>
                                <td style={{width: '20%', textAlign: 'center', color: 'gray'}}></td>
                                <td style={{width: '30%'}}></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </fieldset>
            </div>
        }
        var tableHeight = ($(window).height()-280);
        return (
            <div>
                <div className="table-responsive" style={{maxHeight: "26px", overflowY: 'scroll'}}>
                    <table id="cseListTable" className="table table-bordered table-hover"
                           style={{marginBottom: '110px'}}>
                        <thead >
                        <tr style={{color: "black"}}>
                            <th className="text-center" style={{width: "20px"}}></th>
                            <th className="col-md-2" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                onClick={this._sort.bind(this, "HOST_NAME")}>{Current_Lang.tableTitle.CSEName}<i></i></th>
                            <th className="col-md-1 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                onClick={this._sort.bind(this, "SERVER_IP")}>{Current_Lang.tableTitle.ipAddr}<i></i></th>
                            <th className="col-md-1 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                onClick={this._sort.bind(this, "LOCATION")}>{Current_Lang.label.location}<i></i></th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                onClick={this._sort.bind(this, "APP_ID")}>{Current_Lang.tableTitle.application}<i></i></th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                onClick={this._sort.bind(this, "GROUP_ID")}>{Current_Lang.tableTitle.group}<i></i></th>
                            {/*<th className="col-md-1 text-center" style={{fontWeight: 'bold'}}>设备状态</th>*/}
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                onClick={this._sort.bind(this, "CURRENT_CONNECT")}>{Current_Lang.tableTitle.supportSession}<i></i></th>
                            {/*<th className="col-md-1 text-center" style={{fontWeight: 'bold'}}>负载</th>*/}
                            <th className="col-md-1 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                onClick={this._sort.bind(this, "USE_YN")}>{Current_Lang.tableTitle.status}<i></i></th>
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
                            <th className="col-md-2" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="col-md-1 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="col-md-1 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            {/*<th className="col-md-1 text-center" style={{fontWeight: 'bold'}}>设备状态</th>*/}
                            <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            {/*<th className="col-md-1 text-center" style={{fontWeight: 'bold'}}>负载</th>*/}
                            <th className="col-md-1 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}></th>
                            <th className="text-center" style={{width: "20px"}}><i
                                className="icon-arrow-down12"></i></th>
                        </tr>
                        </thead>
                        <tbody style={{fontSize: '10px'}}>
                        {tb}
                        </tbody>

                    </table>
                    <ListMiddleModal hide="true" content={detail}
                                     doAction={this._detail.bind(this, '/SysManager/Service/CSE/Detail/:' + (cseDetail.cssVo ? cseDetail.cssVo.cssId : ''))}
                                     tip={""}/>

                </div>
            </div>

        )
    }
}