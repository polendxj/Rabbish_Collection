/**
 * Created by Administrator on 2016/9/22.
 */
import React, {Component, PropTypes} from 'react';
import {Loading} from '../../../components/Tool/Tool'

export default class UpdateDedicatedComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        var content = ""
        if (this.props.areaSubInfo && this.props.areaSubInfo.area && this.props.areaSubInfo.area.result == 'SUCCESS'
            && this.props.serviceGroupList && this.props.serviceGroupList.result == 'SUCCESS'
            && this.props.cseGroupList && this.props.cseGroupList.result=='SUCCESS'
            && this.props.appList && this.props.appList.result=='SUCCESS'
            && this.props.detailDedicated && this.props.detailDedicated.result=='SUCCESS'
        )
        {
            content = <UpdateDedicatedFormComponent _save={this.props._save} areaSubInfo={this.props.areaSubInfo}
                                                    serviceGroupList={this.props.serviceGroupList}
                                                    cseGroupList={this.props.cseGroupList}
                                                    appList={this.props.appList}
                                                    detail={this.props.detailDedicated}
                                                    _startRefresh={this.props._startRefresh}

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

class UpdateDedicatedFormComponent extends Component {
    _appOnChange() {
        this.props._startRefresh()
    }
    componentDidMount(){
        this.props._startRefresh()
    }
    render() {
        var self=this
        var sourceArea = [<option key={'sourceArea' + (-1)} value={'NONE'}>{'不使用'}</option>]
        var targetArea = [<option key={'targetArea' + (-1)} value={'NONE'}>{'不使用'}</option>]
        var cseOptions = [<option key={'css' + (-1)} value={'NONE'}>{'不使用'}</option>]
        var groupOption = [<option key={'group' + (-1)} value={'NONE'}>{'不使用'}</option>]
        var appList=[]
        var cseGroupList=[]
        var serviceGroupList=[]
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
            appList.push(<option key={'app' + key} value={val} >{val}</option>)
        })
        this.props.cseGroupList.groupList.forEach(function (val, key) {
            if ($("#common_app option:selected").val() == val.appId) {
                cseGroupList.push(<option key={'cseGroup' + key} value={val.groupId}>{val.groupId}</option>)
            }
        })
        this.props.serviceGroupList.areaList.forEach(function (val, key) {
            serviceGroupList.push(<option key={'serviceGroup' + key} value={val.seq}>{val.areaName}</option>)
        })
        var tableHeight = ($(window).height()-130);
        return (
            <form className="form-horizontal" action="#">
                <div className="row" style={{height:tableHeight+"px",overflowY:"scroll"}}>
                    <div className="col-md-8 col-md-offset-2">
                        <fieldset className="content-group">
                            <legend className="text-bold">{Current_Lang.tableTitle.routingRuleType}</legend>
                            <div className="form-group">
                                <label className="control-label col-lg-2">{Current_Lang.tableTitle.type}</label>
                                <div className="col-lg-10" id="routerType">
                                    <label className="radio-inline">
                                        <input disabled="true" id="commonRouter" className="radio-test" type="radio"
                                               name="radio-unstyled-inline-left" value={0} defaultChecked={this.props.detail.routingRuleVo.routingType==1}/>
                                        {Current_Lang.tableTitle.genericRouting}
                                    </label>

                                    <label className="radio-inline">
                                        <input disabled="true"  readOnly="readOnly" id="dedicateRouter" className="radio-test" type="radio" value={1} defaultChecked={this.props.detail.routingRuleVo.routingType==2}
                                               name="radio-unstyled-inline-left"/>
                                        {Current_Lang.tableTitle.dedicateRouting}
                                    </label>

                                    <label className="radio-inline">
                                        <input disabled="true"  readOnly="readOnly" id="visitControlRouter" className="radio-test" type="radio" value={2} defaultChecked={this.props.detail.routingRuleVo.routingType==3}
                                               name="radio-unstyled-inline-left"/>
                                        {Current_Lang.tableTitle.accessControl}
                                    </label>
                                </div>

                            </div>

                        </fieldset>
                        <div id="commonDIV">
                            <fieldset className="content-group">
                                <legend className="text-bold">{Current_Lang.tableTitle.genericRoutingRuleConfiguration}
                                </legend>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-framed">
                                        <thead>
                                        <tr>
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
                                                <select className="form-control" name="sourceAreaId1" id="common_area" defaultValue={this.props.detail.routingRuleVo.serviceAreaId}>
                                                    {serviceGroupList}
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-control" name="sourceAreaId2" id="common_app"  onChange={this._appOnChange.bind(this)} defaultValue={this.props.detail.routingRuleVo.appId}>
                                                    {appList}
                                                </select>
                                            </td>
                                            <td>
                                                <i className="icon-arrow-right16"></i>
                                            </td>
                                            <td>
                                                <select className="form-control" name="sourceAreaId3"
                                                        id="common_cse_group" defaultValue={this.props.detail.routingRuleVo.groupId}>
                                                    {cseGroupList}
                                                </select>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </fieldset>


                            <div className="text-right">
                                <button type="button" className="btn btn-primary" onClick={this.props._save.bind(this,0)}>{Current_Lang.label.save}
                                </button>
                            </div>
                        </div>
                        <div id="dedicatedDIV" style={{display: 'none'}}>
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
                                <button type="button" className="btn btn-primary" onClick={this.props._save}>保 存
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


            </form>
        )
    }
}