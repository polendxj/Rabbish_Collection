/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import classnames from 'classnames'
import BreadCrumbs from './breadCrumbs'
import {Loading, NoData, roleApplicationUse, buildSort, findSortInfo, ListMiddleModal} from '../Tool/Tool'
import Pagenation from '../../components/right/Pagenation'


export default class RealTimeSessionsComponent extends Component {
    constructor(props) {
        super(props)
        this.firstLoad = true
        this._search = this._search.bind(this)
        this.sortColumn = "START_TIME"
        this.sortType = "DESC"
        this.oldDetail = "";
    }

    componentDidUpdate() {
        $('[data-popup="tooltip"]').tooltip();
    }

    componentDidMount() {
        $("#cse_group_text").parent().parent().on('click', 'li', function () {
            $("#cse_group_text").text($(this).find('a').text())
        })
        $("#app_id_text").parent().parent().on('click', 'li', function () {
            $("#app_id_text").text($(this).find('a').text())
        })
        $("#service_group_text").parent().parent().on('click', 'li', function () {
            $("#service_group_text").text($(this).find('a').text())
        })
        buildSort("sessionListTable")

    }

    _search() {
        var searchColumn = []
        var searchValue = []
        if ($("#cse_group_text").text() && $("#cse_group_text").text().trim() != Current_Lang.label.all) {
            searchColumn.push('GROUP_ID');
            searchValue.push($("#cse_group_text").text().trim());
        }
        if ($("#sessionid").val()) {
            searchColumn.push('SESSION_ID');
            searchValue.push($("#sessionid").val().trim());
        }
        if ($("#stbid").val()) {
            searchColumn.push('STB_ID');
            searchValue.push($("#stbid").val().trim());
        }
        if ($("#app_id_text").text() && $("#app_id_text").text().trim() != Current_Lang.label.all.trim()) {
            searchColumn.push('APP_ID');
            searchValue.push($("#app_id_text").text().trim());
        }
        if ($("#service_group_text").text() && $("#service_group_text").text().trim() != Current_Lang.label.all.trim()) {
            searchColumn.push('SERVICE_AREA');
            searchValue.push($("#service_group_text").text().trim());
        }

        this.props._search(searchColumn, searchValue, this.sortColumn, this.sortType);
    }

    _detail() {

    }

    _delete() {

    }

    _sort(type) {
        var sortInfo = findSortInfo("sessionListTable");
        this.sortColumn = type;
        this.sortType = sortInfo;
        this.props._sort(this.sortColumn, this.sortType);
    }

    _destorySession(){
        this.props._deleteSession2();
    }

    render() {
        const {data, fetching, appList, cseGroupList, serviceGroupList, detail}=this.props
        var cseGroupLI = [<li key='cse_group_-1'><a href="#"> {Current_Lang.label.all}</a></li>]
        var appListLI = [<li key='ap_id_-1'><a href="#"> {Current_Lang.label.all}</a></li>]
        var serviceGroupListLI = [<li key='asg_id_-1'><a href="#"> {Current_Lang.label.all}</a></li>]
        /*bind appidList to select of search*/
        if (appList && appList.appIdList && appList.appIdList.length > 0) {
            appList.appIdList.forEach(function (val, key) {
                appListLI.push(
                    <li key={'app_list' + key}><a href="#"> {val}</a></li>
                )

            })
        }
        /*bind cseGroupList to select of search*/
        if (cseGroupList && cseGroupList.groupList && cseGroupList.groupList.length > 0) {
            cseGroupList.groupList.forEach(function (val, key) {
                cseGroupLI.push(
                    <li key={'cse_group' + key}><a href="#"> {val.groupId}</a></li>
                )

            })
        }
        /*binf serviceGroupList to select of search*/
        if (serviceGroupList && serviceGroupList.areaList && serviceGroupList.areaList.length > 0) {
            serviceGroupList.areaList.forEach(function (val, key) {
                serviceGroupListLI.push(
                    <li key={'asg_id_' + key}><a href="#"> {val.areaName}</a></li>
                )

            })
        }
        /*render sessoins data*/
        var content = "";
        if (data && data.sessionList && data.sessionList.length > 0) {
            content = [];
            data.sessionList.forEach(function (val, key) {
                var serviceArea = [];
                if(val.serviceArea){
                    serviceArea.push(
                        <a  key={val.sessionId + val.serviceArea.sgids} href="javascript:void(0)" data-popup="tooltip"
                            title={val.serviceArea.sgids}>{val.serviceArea.areaName}</a>
                    )
                }

                content.push(
                    <tr key={key}>
                        <td className="text-center">{key+1}</td>
                        <td className="text-center">{val.sessionId}</td>
                        <td className="text-center">{val.stbId}</td>
                        <td className="text-center">{val.appId}</td>
                        <td className="text-center"><a href="javascript:void(0)" data-popup="tooltip"
                                                       title={val.hostName + '<br/>' + val.cssIp}
                                                       data-html="true">{val.groupId}</a></td>
                        <td className="text-center">{serviceArea}</td>
                        <td className="text-center">{val.startTime}</td>
                        <td className="text-center">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li onClick={this.props._detail.bind(this, val.cssId + '_' + val.sessionId)}>
                                            <a href="javascript:void(0)" data-toggle="modal"
                                               data-target="#ListModal"><i className="icon-pencil5"></i>
                                                {Current_Lang.label.detail}</a></li>
                                        <li onClick={this.props._deleteSession.bind(this, {
                                            cssId: val.cssId,
                                            sessionId: val.sessionId
                                        })}><a
                                            href="javascript:void(0)"><i className="icon-trash"></i>
                                            {Current_Lang.label.delete}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>
                );
            }.bind(this));

        } else {
            content = <tr>
                <td colSpan="8"><NoData text={Current_Lang.label.noActiveSession}/></td>
            </tr>
        }
        /*session detail*/
        var detailContent = "";
        if (detail) {
            if (detail.result == 'SUCCESS') {
                detailContent = <div id="detailPanel" className="row">
                    <div className="col-lg-12 col-md-12">
                        <fieldset className="content-group">
                            <legend className="text-bold">{Current_Lang.label.basicInfo}</legend>
                            <div className="row">
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.tableTitle.STBID}: </span>
                                </div>
                                <div className="col-md-3">
                                    {detail.stbSession.stbId ? detail.stbSession.stbId : '--'}
                                </div>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.tableTitle.STBIP}: </span>
                                </div>
                                <div className="col-md-4">
                                    {detail.stbSession.stbIp ? detail.stbSession.stbIp : '--'}
                                </div>

                            </div>
                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.label.CSEIP}: </span>
                                </div>
                                <div className="col-md-3">
                                    {detail.stbSession.cssIp ? detail.stbSession.cssIp : '--'}
                                </div>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.tableTitle.APPID}: </span>
                                </div>
                                <div className="col-md-4">
                                    {detail.stbSession.appId ? detail.stbSession.appId : '--'}
                                </div>
                            </div>
                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.tableTitle.location}: </span>
                                </div>
                                <div className="col-md-3">
                                    {detail.stbSession.soCode ? detail.stbSession.soCode : '--'}
                                </div>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.tableTitle.startTime}: </span>
                                </div>
                                <div className="col-md-4">
                                    {detail.stbSession.startTime ? detail.stbSession.startTime : '--'}
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="content-group">
                            <legend className="text-bold">{Current_Lang.label.qamInfo}</legend>
                            <div className="row">
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.label.QAMIP}: </span>
                                </div>
                                <div className="col-md-3">
                                    {detail.stbSession.qamIp ? detail.stbSession.qamIp : '--'}
                                </div>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.label.QAMPort}: </span>
                                </div>
                                <div className="col-md-4">
                                    {detail.stbSession.qamPort ? detail.stbSession.qamPort : '--'}
                                </div>

                            </div>
                        </fieldset>
                        <fieldset className="content-group">
                            <legend className="text-bold">{Current_Lang.label.ermInfo}</legend>
                            <div className="row">
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.label.ProgramNo}: </span>
                                </div>
                                <div className="col-md-3">
                                    {detail.stbSession.programNumber ? detail.stbSession.programNumber : '--'}
                                </div>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.label.frequency}: </span>
                                </div>
                                <div className="col-md-4">
                                    {detail.stbSession.frequency ? detail.stbSession.frequency : '--'}
                                </div>

                            </div>
                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.label.videoPID}: </span>
                                </div>
                                <div className="col-md-3">
                                    {detail.stbSession.videoPid ? detail.stbSession.videoPid : '--'}
                                </div>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.label.audioPID}: </span>
                                </div>
                                <div className="col-md-4">
                                    {detail.stbSession.audioPid ? detail.stbSession.audioPid : '--'}
                                </div>
                            </div>
                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-md-2">
                                    <span className="text-muted">{Current_Lang.label.operatorRate}: </span>
                                </div>
                                <div className="col-md-3">
                                    {detail.stbSession.symbolRates ? detail.stbSession.symbolRates : '--'}
                                </div>
                            </div>

                        </fieldset>
                    </div>
                </div>;
                this.oldDetail = detailContent;
            } else {
                detailContent = <NoData text={Current_Lang.tableTitle.sessionExpire}/>
                this.oldDetail = detailContent;
            }
        } else {
            detailContent = this.oldDetail
        }
        var tableHeight = ($(window).height()-280);
        return (
            <div>
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.label.searching}
                    </legend>
                    <ul className="list-inline list-inline-condensed no-margin-bottom"
                        style={{textAlign: 'right',marginTop:'-59px'}}>
                        <li className="dropdown"
                            style={{borderBottom: '0 lightgray solid', marginRight: '10px'}}>
                            <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                               data-toggle="dropdown" aria-expanded="false"
                               style={{paddingLeft: '0', paddingRight: '0', fontWeight: 'bold', color: '#193153'}}>{Current_Lang.tableTitle.CSEGroup}：<span
                                style={{color: '#193153'}} id="cse_group_text">{Current_Lang.label.all}</span> <span
                                className="caret"></span>
                            </a>
                            <ul className="dropdown-menu" style={{maxHeight: '500px', overflowY: 'scroll'}}>
                                {cseGroupLI}
                            </ul>
                        </li>
                        <li className="dropdown"
                            style={{borderBottom: '0 lightgray solid', marginRight: '10px'}}>
                            <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                               data-toggle="dropdown" aria-expanded="false"
                               style={{paddingLeft: '0', paddingRight: '0', fontWeight: 'bold', color: '#193153'}}>{Current_Lang.tableTitle.serviceAreaName}：<span
                                style={{color: '#193153'}} id="service_group_text">{Current_Lang.label.all}</span> <span
                                className="caret"></span>
                            </a>
                            <ul className="dropdown-menu" style={{maxHeight: '500px', overflowY: 'scroll'}}>
                                {serviceGroupListLI}
                            </ul>
                        </li>
                        <li className="dropdown"
                            style={{borderBottom: '0 lightgray solid', marginRight: '10px'}}>
                            <a href="#" className="btn btn-link btn-sm dropdown-toggle"
                               data-toggle="dropdown" aria-expanded="false"
                               style={{paddingLeft: '0', paddingRight: '0', fontWeight: 'bold', color: '#193153'}}>{Current_Lang.tableTitle.APPID}：<span
                                style={{color: '#193153'}} id="app_id_text">{Current_Lang.label.all}</span> <span
                                className="caret"></span>
                            </a>
                            <ul className="dropdown-menu" style={{maxHeight: '500px', overflowY: 'scroll'}}>
                                {appListLI}
                            </ul>
                        </li>
                        <li>
                            <input id="sessionid" style={{
                                border: '0 red solid',
                                borderRadius: '0'
                            }} type="text" className="form-control" placeholder={Current_Lang.tableTitle.sessionID} data-popup="tooltip"
                                   title={Current_Lang.tableTitle.sessionID}
                                   data-html="true"/>
                        </li>
                        <li>
                            <input id="stbid" style={{
                                border: '0 red solid',
                                borderRadius: '0'
                            }} type="text" className="form-control" placeholder={Current_Lang.tableTitle.STBID} data-popup="tooltip"
                                   title={Current_Lang.tableTitle.STBID}
                                   data-html="true"/>
                        </li>


                        <li>
                            <button onClick={this._search.bind(this)}
                                    style={{marginLeft: '30px'}} type="button"
                                    className="btn btn-primary btn-icon"><i
                                className="icon-search4"></i></button>
                        </li>

                    </ul>
                </fieldset>

                <fieldset className="content-group">
                    <legend className="text-bold">
                        {Current_Lang.tableTitle.sessionList}
                    </legend>
                    <div style={{marginTop:'-80px'}}>
                        <Pagenation counts={this.props.data && this.props.data.nTotCnt ? this.props.data.nTotCnt : 0}
                                    page={this.props.page}
                                    _changePage={this.props._changePage} _prePage={this.props._prePage}
                                    _nextPage={this.props._nextPage}/>
                    </div>
                    <div className="table-responsive" style={{maxHeight: "26px", overflowY: 'scroll'}}>
                        <table id="sessionListTable" className="table table-bordered" >
                            <thead>
                            <tr style={{color: "black"}}>
                                <th className="text-center" style={{width: "20px", cursor: 'pointer'}}></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "SESSION_ID")}>
                                    {Current_Lang.tableTitle.sessionID}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "STB_ID")}>
                                    {Current_Lang.tableTitle.STBID}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "APP_ID")}>
                                    {Current_Lang.tableTitle.APPID}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "GROUP_ID")}>
                                    {Current_Lang.tableTitle.group}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "SERVICE_AREA")}>
                                    {Current_Lang.tableTitle.serviceAreaName}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "START_TIME")}>
                                    {Current_Lang.tableTitle.startTime}<i className="icon-arrow-down5"></i></th>
                                <th className="text-center" style={{width: "20px", cursor: 'pointer'}}><i
                                    className="icon-arrow-down12"></i></th>
                            </tr>
                            </thead>
                            <tbody style={{fontSize: '10px',opacity:'0'}}>
                            {content}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-responsive" style={{height: tableHeight+"px", overflowY: 'scroll'}}>
                        <table id="sessionListTable" className="table table-bordered" style={{marginBottom: '75px',marginTop:'-21px'}}>
                            <thead style={{opacity:'0'}}>
                            <tr style={{color: "black"}}>
                                <th className="text-center" style={{width: "20px", cursor: 'pointer'}}></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "SESSION_ID")}>
                                    {Current_Lang.tableTitle.sessionID}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "STB_ID")}>
                                    {Current_Lang.tableTitle.STBID}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "APP_ID")}>
                                    {Current_Lang.tableTitle.APPID}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "GROUP_ID")}>
                                    {Current_Lang.tableTitle.group}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "SERVICE_AREA")}>
                                    {Current_Lang.tableTitle.serviceAreaName}<i></i></th>
                                <th className="col-md-2 text-center" style={{fontWeight: 'bold', cursor: 'pointer'}}
                                    onClick={this._sort.bind(this, "START_TIME")}>
                                    {Current_Lang.tableTitle.startTime}<i className="icon-arrow-down5"></i></th>
                                <th className="text-center" style={{width: "20px", cursor: 'pointer'}}><i
                                    className="icon-arrow-down12"></i></th>
                            </tr>
                            </thead>
                            <tbody style={{fontSize: '10px'}}>
                            {content}
                            </tbody>
                        </table>
                    </div>
                    <ListMiddleModal content={detailContent}
                                     doAction={this._destorySession.bind(this)}
                                     tip={Current_Lang.label.detail}
                                     actionText={Current_Lang.label.delete}
                    />
                </fieldset>
            </div>
        )
    }
}