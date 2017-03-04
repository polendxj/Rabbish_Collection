/**
 * Created by Administrator on 2016/9/22.
 */
/**
 * Created by Administrator on 2016/9/21.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'

export default class UpdateBlacklistComponent extends Component {
    constructor(props) {
        super(props)
        this.accessControlType=2;
    }

    componentDidUpdate() {
        var self=this;
        $(".radio-test").change(function () {
            if ($("input[name='radio-unstyled-inline-left']:checked").val() == 0) {
                $("#commonDIV").show()
                $("#visitControlDIV").hide()
            } else if ($("input[name='radio-unstyled-inline-left']:checked").val() == 1) {

            } else if ($("input[name='radio-unstyled-inline-left']:checked").val() == 2) {
                $("#commonDIV").hide()
                $("#visitControlDIV").show()
            }
        });
        $(".radio-access").change(function () {
            if ($("input[name='accesscontrol']:checked").val() == 1) {
                $("#whitelistRadio").show()
                $("#blacklistRadio").hide()
                self.accessControlType=2;
            } else if ($("input[name='accesscontrol']:checked").val() == 2) {
                $("#whitelistRadio").hide()
                $("#blacklistRadio").show()
                self.accessControlType=3;
            }
            self.props._startRefresh();
        });
    }

    componentDidMount() {

    }

    render() {
        var content = ""
        if (this.props.areaSubInfo && this.props.areaSubInfo.area && this.props.areaSubInfo.area.result == 'SUCCESS'
            && this.props.serviceGroupList && this.props.serviceGroupList.result == 'SUCCESS'
            && this.props.cseGroupList && this.props.cseGroupList.result == 'SUCCESS'
            && this.props.appList && this.props.appList.result == 'SUCCESS') {
            content = <CreateDedicatedFormComponent _save={this.props._save}
                                                    areaSubInfo={this.props.areaSubInfo}
                                                    serviceGroupList={this.props.serviceGroupList}
                                                    cseGroupList={this.props.cseGroupList}
                                                    appList={this.props.appList}
                                                    _startRefresh={this.props._startRefresh}
                                                    deviceTypeList={this.props.deviceTypeList}
                                                    accessControlType={this.accessControlType}
                                                    blacklistDetail={this.props.blacklistDetail}

            />
        } else {
            content = <Loading />
        }
        return (
            <div>
                {content}
            </div>
        )

    }
}

class CreateDedicatedFormComponent extends Component {
    _appOnChange() {
        this.props._startRefresh()
    }

    componentDidMount() {
        var getFirstAppID = setInterval(function () {
            if ($("#common_app option:selected").val()) {
                clearInterval(getFirstAppID)
                this.props._startRefresh()
            }
        }.bind(this), 500)
    }

    render() {
        var sourceArea = [<option key={'sourceArea' + (-1)} value={'NONE'}>{'不使用'}</option>]
        var targetArea = [<option key={'targetArea' + (-1)} value={'NONE'}>{'不使用'}</option>]
        var cseOptions = [<option key={'css' + (-1)} value={'NONE'}>{'不使用'}</option>]
        var groupOption = [<option key={'group' + (-1)} value={'NONE'}>{'不使用'}</option>]
        var appList = []
        var cseGroupList = []
        var serviceGroupList = []
        var deviceTypeList = []
        this.props.areaSubInfo.area.areaList.forEach(function (area, key) {
            sourceArea.push(<option key={'sourceArea' + key} value={area.areaId}>{area.areaName}</option>)
            targetArea.push(<option key={'targetArea' + key} value={area.areaId}>{area.areaName}</option>)
        })
        this.props.areaSubInfo.subinfo.groupList.forEach(function (group, key) {
            groupOption.push(<option key={'group' + key} value={group}>{group}</option>)
        })
        this.props.areaSubInfo.subinfo.cssList.forEach(function (css, key) {
            cseOptions.push(<option key={'css' + key} value={css.serverIp}>{css.hostName} ({css.serverIp})</option>)
        })
        this.props.appList.appIdList.forEach(function (val, key) {
            appList.push(<option key={'app' + key} value={val}>{val}</option>)
        })
        this.props.cseGroupList.groupList.forEach(function (val, key) {
            if ($("#common_app option:selected").val() == val.appId) {
                cseGroupList.push(<option key={'cseGroup' + key} value={val.groupId}>{val.groupId}</option>)
            }
        })
        this.props.serviceGroupList.areaList.forEach(function (val, key) {
            serviceGroupList.push(<option key={'serviceGroup' + key} value={val.seq}>{val.areaName}</option>)
        })
        if (this.props.deviceTypeList && this.props.deviceTypeList.serviceModelList && this.props.deviceTypeList.serviceModelList.length > 0) {
            this.props.deviceTypeList.serviceModelList.forEach(function (val, key) {
                deviceTypeList.push(<option key={'deviceType' + key}
                                            value={val.seq}>{val.deviceName + '  [' + val.deviceType + ']'}</option>)
            })
        }
        var tableHeight = ($(window).height() - 130);
        console.log(this.props.blacklistDetail)
        var blacklistDetailResult="";
        if(this.props.blacklistDetail && this.props.blacklistDetail.blackListVo){
            blacklistDetailResult=<input id="blacklistSTBID" type="text" className="form-control" defaultValue={this.props.blacklistDetail && this.props.blacklistDetail.blackListVo?this.props.blacklistDetail.blackListVo.deviceId:""}
                   placeholder={Current_Lang.tableTitle.STBID}
                   autoComplete="off"/>
        }
        return (
            <form className="form-horizontal" action="#">
                <div className="row" style={{height: tableHeight + "px", overflowY: "scroll"}}>
                    <div className="col-md-8 col-md-offset-2">
                        <fieldset className="content-group">
                            <legend className="text-bold">{Current_Lang.tableTitle.routingRuleType}</legend>
                            <div className="form-group">
                                <label className="control-label col-lg-2">{Current_Lang.tableTitle.type}</label>
                                <div className="col-lg-10" id="routerType">
                                    <label  className="radio-inline">
                                        <input disabled="disabled" id="commonRouter" className="radio-test" type="radio"
                                               name="radio-unstyled-inline-left" value={0} />
                                        {Current_Lang.tableTitle.genericRouting}
                                    </label>

                                    <label className="radio-inline">
                                        <input disabled="disabled" id="dedicateRouter" className="radio-test"
                                               type="radio" value={1}
                                               name="radio-unstyled-inline-left"/>
                                        {Current_Lang.tableTitle.dedicateRouting}
                                    </label>

                                    <label className="radio-inline">
                                        <input  id="visitControlRouter" className="radio-test" type="radio" value={2} defaultChecked="true"
                                               name="radio-unstyled-inline-left"/>
                                        {Current_Lang.tableTitle.accessControl}
                                    </label>
                                </div>

                            </div>

                        </fieldset>
                        <div id="commonDIV" style={{display:"none"}}>
                            <fieldset className="content-group">
                                <legend className="text-bold">{Current_Lang.tableTitle.genericRoutingRuleConfiguration}
                                </legend>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-framed">
                                        <thead>
                                        <tr >
                                            <th style={{textAlign: 'center', fontWeight: 'bold'}}>
                                                {Current_Lang.tableTitle.ServiceGroup}
                                            </th>
                                            <th className="text-center" style={{fontWeight: 'bold'}}>
                                                {Current_Lang.label.APPID}
                                            </th>
                                            <th className="text-center" style={{width: '30px', fontWeight: 'bold'}}>

                                            </th>
                                            <th className="text-center" style={{fontWeight: 'bold'}}>
                                                {Current_Lang.label.CSEGroup}
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <select className="form-control" name="sourceAreaId1" id="common_area">
                                                    {serviceGroupList}
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control" name="sourceAreaId2" id="common_app"
                                                        onChange={this._appOnChange.bind(this)}>
                                                    {appList}
                                                </select>
                                            </td>
                                            <td>
                                                <i className="icon-arrow-right16"></i>
                                            </td>
                                            <td>
                                                <select className="form-control" name="sourceAreaId3"
                                                        id="common_cse_group">
                                                    {cseGroupList}
                                                </select>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </fieldset>


                            <div className="text-right">
                                <button type="button" className="btn btn-primary"
                                        onClick={this.props._save.bind(this, 0)}>{Current_Lang.label.save}
                                </button>
                            </div>
                        </div>
                        <div id="visitControlDIV">
                            <fieldset className="content-group">
                                <legend className="text-bold">{Current_Lang.tableTitle.permissionConfiguraton}</legend>

                                <div className="form-group">
                                    <label
                                        className="control-label col-lg-2">{Current_Lang.label.accessType}</label>
                                    <div className="col-lg-10">
                                        <label className="radio-inline">
                                            <input id="whitelistBtn" className="radio-access"
                                                   type="radio" value={1}
                                                   name="accesscontrol" disabled="disabled"/>
                                            {Current_Lang.label.whitelist}
                                        </label>

                                        <label className="radio-inline">
                                            <input defaultChecked="true" id="blacklistBtn" className="radio-access" type="radio" value={2}
                                                   name="accesscontrol"/>
                                            {Current_Lang.label.blacklist}
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group" id="whitelistRadio" style={{display:"none"}}>
                                    <label
                                        className="control-label col-lg-2">{Current_Lang.tableTitle.deviceTypeName}</label>
                                    <div className="col-lg-10">
                                        <select className="form-control" name="deviceTypeSelect"
                                                id="visitControlSelect">
                                            {deviceTypeList}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group" id="blacklistRadio" >
                                    <label
                                        className="control-label col-lg-2">{Current_Lang.tableTitle.STBID}</label>
                                    <div className="col-lg-10">
                                        {blacklistDetailResult}
                                    </div>
                                </div>

                                <div className="form-group" style={{display: 'none'}}>
                                    <label
                                        className="control-label col-lg-2">{Current_Lang.tableTitle.accessControlType}</label>
                                    <div className="col-lg-10">
                                        <label className="radio-inline">
                                            <span><input name="visitcontrol_allow" type="radio" value={'Y'}
                                                         defaultChecked="true"/></span>
                                            {Current_Lang.tableTitle.allow}
                                        </label>

                                        <label className="radio-inline">
                                            <span><input disabled="disabled" name="visitcontrol_allow" type="radio"
                                                         value={'N'}/></span>
                                            {Current_Lang.tableTitle.forbid}
                                        </label>
                                    </div>
                                </div>

                            </fieldset>

                            <div className="text-right">
                                <button type="button" className="btn btn-primary"
                                        onClick={this.props._save.bind(this, 3)}
                                >{Current_Lang.label.save}
                                </button>
                            </div>
                        </div>

                        {/*<div id="speciRouter" style={{display: 'none'}}>
                         <fieldset className="content-group">
                         <legend className="text-bold">专访机顶盒设置</legend>

                         <div className="form-group">
                         <label className="control-label col-lg-2">机顶盒ID</label>
                         <div className="col-lg-10">
                         <input className="form-control" name="stbId" type="text"
                         placeholder={'ID'}/>
                         </div>
                         </div>

                         <div className="form-group">
                         <label className="control-label col-lg-2">机顶盒IP</label>
                         <div className="col-lg-10">
                         <input className="form-control" name="stbIp" type="text"
                         placeholder={'IP'}/>
                         </div>
                         </div>

                         <div className="form-group">
                         <label className="control-label col-lg-2">区域设置</label>
                         <div className="col-lg-10">
                         <select className="form-control" name="sourceAreaId">
                         {sourceArea}
                         </select>
                         </div>
                         </div>

                         <div className="form-group">
                         <label className="control-label col-lg-2">机顶盒ID匹配方式</label>
                         <div className="col-lg-10">
                         <label className="radio-inline">
                         <span><input name="sourceType" type="radio" value={1}
                         defaultChecked="true"/></span>
                         精确匹配
                         </label>

                         <label className="radio-inline">
                         <span><input name="sourceType" type="radio" value={2}/></span>
                         通配符匹配<span style={{color: 'red'}}>（注意：机顶盒ID的模糊设置部分用 * 代替）</span>
                         </label>
                         </div>
                         </div>

                         </fieldset>

                         <fieldset className="content-group">
                         <legend className="text-bold">访问策略设置</legend>

                         <div className="form-group">
                         <label className="control-label col-lg-2">专访限制</label>
                         <div className="col-lg-10">
                         <div className="input-group">
                         <label className="radio-inline">
                         <span><input name="dedicatedType" type="radio"
                         value="1" defaultChecked="true"/></span>
                         允许访问
                         </label>

                         <label className="radio-inline">
                         <span><input name="dedicatedType" type="radio"
                         value="2"/></span>
                         禁止访问
                         </label>
                         </div>
                         </div>
                         </div>

                         </fieldset>

                         <fieldset className="content-group">
                         <legend className="text-bold">访问目标设置</legend>

                         <div className="form-group">
                         <label className="control-label col-lg-2">CSS服务器</label>
                         <div className="col-lg-10">
                         <select className="form-control" name="cssIp">
                         {cseOptions}
                         </select>
                         </div>
                         </div>

                         <div className="form-group">
                         <label className="control-label col-lg-2">组设置</label>
                         <div className="col-lg-10">
                         <select className="form-control" name="groupId">
                         {groupOption}
                         </select>
                         </div>
                         </div>

                         <div className="form-group">
                         <label className="control-label col-lg-2">区域设置</label>
                         <div className="col-lg-10">
                         <select className="form-control" name="targetAreaId">
                         {targetArea}
                         </select>
                         </div>
                         </div>

                         </fieldset>

                         <div className="text-right">
                         <button type="button" className="btn btn-primary" onClick={this.props._save} disabled="disabled">保 存
                         </button>
                         </div>
                         </div>*/}
                    </div>
                </div>


            </form>
        )
    }
}