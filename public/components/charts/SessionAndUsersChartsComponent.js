/**
 * Created by Administrator on 2016/10/11.
 */
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {browserHistory} from 'react-router'

export default class SessionAndUsersChartsComponent extends Component {
    componentDidMount(){
        setTimeout(function () {
            $('[data-popup="popover"]').popover();
            $('[data-popup="tooltip"]').tooltip();
        },1000)

    }
    render() {
        var tableHeight = ($(window).height()-100);
        const {cseStatusInfo,csrStatusInfo,csmStatusInfo}=this.props;
        return (
            <div className="row" style={{height:tableHeight+"px",overflowY:'scroll'}}>
                <div className="col-lg-12">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title" style={{fontWeight:"bold"}}>{Current_Lang.label.currentTrendOfActiveUsers}</h6>
                        </div>

                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-md-6">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-comment-discussion position-left text-slate"></i><span id="SessionAndUsersMaxUser">- -</span></h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.maxSessionNumber}</span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-users4 position-left text-slate"></i> <span id="SessionAndUsersActiveUser">- -</span></h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.activeSessionNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="position-relative" id="SessionAndUsersContainer"
                             style={{width: "100%", height: '200px'}}></div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="panel panel-flat" style={{position:"relative",height:"320px"}}>
                        <div className="panel-heading">
                            <h6 className="panel-title" style={{fontWeight:"bold"}}>{Current_Lang.label.CSECluster}</h6>
                        </div>
                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin" >

                                            {cseStatusInfo.hadrwareTotalStatus?(cseStatusInfo.hadrwareTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(cseStatusInfo.hadrwareTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}
                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.hardwareStatus}</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin" >
                                            {cseStatusInfo.logicTotalStatus?(cseStatusInfo.logicTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(cseStatusInfo.logicTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}
                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.sessionStatus}</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="content-group">

                                        <h5 className="text-semibold no-margin" style={{position:'relative'}}>
                                            {cseStatusInfo.performanceTotalStatus?(cseStatusInfo.performanceTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(cseStatusInfo.performanceTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}
                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.capabilityStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="ServerUseStatusContainer" style={{position:"relative",float:"left",width: '100%', height: '180px'}}></div>

                        {/*<div id="ServerUseStatusStaticsContainer" style={{position:"relative",float:"right",right:"10px",width: '25%', height: '200px',border:"1px red solid"}}></div>*/}
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="panel panel-flat" style={{position:"relative",height:"320px"}}>
                        <div className="panel-heading">
                            <h6 className="panel-title" style={{fontWeight:"bold"}}>{Current_Lang.label.CSRCluster}</h6>
                        </div>

                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin" >

                                            {csrStatusInfo.hadrwareTotalStatus?(csrStatusInfo.hadrwareTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(csrStatusInfo.hadrwareTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}
                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.hardwareStatus}</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin" >
                                            {csrStatusInfo.logicTotalStatus?(csrStatusInfo.logicTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(csrStatusInfo.logicTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}
                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.sessionStatus}</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="content-group">

                                        <h5 className="text-semibold no-margin" style={{position:'relative'}}>
                                            {csrStatusInfo.serviceTotalStatus?(csrStatusInfo.serviceTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(csrStatusInfo.serviceTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}

                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.serviceStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="csrChartsContainer" style={{position:"relative",float:"left",width: '99%', height: '180px'}}></div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="panel panel-flat" style={{position:"relative",height:"320px"}}>
                        <div className="panel-heading">
                            <h6 className="panel-title" style={{fontWeight:"bold"}}>{Current_Lang.label.CSMCluster}</h6>
                        </div>

                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin" >

                                            {csmStatusInfo.hadrwareTotalStatus?(csmStatusInfo.hadrwareTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(csmStatusInfo.hadrwareTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px",backgroundColor:'#FFD299',borderColor:"#FFD299"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}
                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.hardwareStatus}</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin" >
                                            {csmStatusInfo.logicTotalStatus?(csmStatusInfo.logicTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(csmStatusInfo.logicTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}
                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.sessionStatus}</span>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="content-group">

                                        <h5 className="text-semibold no-margin" style={{position:'relative'}}>
                                            {csmStatusInfo.serviceTotalStatus?(csmStatusInfo.serviceTotalStatus.level=="normal"?<span style={{fontSize:"16px"}} className="label label-success">{Current_Lang.status.normal}</span>:(csmStatusInfo.serviceTotalStatus.level=="danger"?<span style={{fontSize:"16px"}} className="label label-danger">{Current_Lang.status.fatal}</span>:<span style={{fontSize:"16px"}} className="label label-warning">{Current_Lang.status.minor}</span>)):<span style={{fontSize:"16px"}} className="label label-default">{Current_Lang.label.loading}</span>}

                                        </h5>
                                        <span className="text-muted text-size-small">{Current_Lang.label.serviceStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="csmChartsContainer" style={{position:"relative",float:"left",width: '100%', height: '180px'}}></div>
                    </div>
                </div>
                {/*<div className="col-lg-12">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title" style={{fontWeight:"bold"}}>{Current_Lang.label.alarmInfo}</h6>
                        </div>

                        <div style={{width: '100%', height: '265px'}}>
                            <div className="table-responsive">
                                <table className="table text-nowrap">
                                    <tbody id="dashboardAlarm">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>*/}

                {/*<div className="col-lg-7">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title">区域活跃用户分布</h6>
                        </div>

                        <div className="container-fluid">
                            <div className="row text-center">
                                <div className="col-md-12">
                                    <div className="content-group">
                                        <h5 className="text-semibold no-margin"><i className="icon-users4 position-left text-slate"></i><span id="totalActiveUser">- -</span></h5>
                                        <span className="text-muted text-size-small">活跃用户总数</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="SoUserContainer" style={{width: '98%', height: '200px'}}></div>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="panel panel-flat">
                        <div className="panel-heading">
                            <h6 className="panel-title">App服务器使用情况</h6>
                        </div>

                        <div id="AppUseServerContainer" style={{width: "95%",height:'200px'}}></div>
                    </div>
                </div>*/}

            </div>
        )
    }
}