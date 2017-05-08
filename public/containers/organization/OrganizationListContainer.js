/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {commonRefresh} from '../../actions/Common';
import {
    Loading,
    NoData,
    ConfirmModal,
    ListMiddleModal,
    ErrorModal,
    filterCityById,
    timeStamp2Time,
    organizationType,
    getInitialCityIdx
} from '../../components/Tool/Tool';
import {ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, CITY_LIST_START, CITY_LIST_END,PROGRESS_START,PROGRESS_END,QRCODE_COUNT_START,QRCODE_COUNT_END} from '../../constants/index.js'
import {getListByMutilpCondition, saveObject,exportQrcode,generateQrcode} from '../../actions/CommonActions';
var querystring = require('querystring');

export default class OrganizationListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "小区、单位", link: ''},
            {text: "小区、单位列表", link: ''}
        ];
        this.operation = [
            {
                icon: "icon-add-to-list",
                text: Current_Lang.others.add,
                action: "/CustomerService/OrganizationManage/Register"
            }
        ];
        this.currentCity = "";
        this.currentCityId = 1;
        this.searchColumn = "TYPE";
        this.currentOrganization = "";
        this.progressInterval = "";
        this._generate = this._generate.bind(this);
        this._export = this._export.bind(this);
        this._showGenerateModal = this._showGenerateModal.bind(this);
        this._showExportModal = this._showExportModal.bind(this);
        this._changeCity = this._changeCity.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
        this._changePage=this._changePage.bind(this);
        this._prePage=this._prePage.bind(this);
        this._nextPage=this._nextPage.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: page_size};
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
        this.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
    }
    componentWillUnmount(){
        clearInterval(this.progressInterval);//停止计时器
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _changeCity() {
        var citieid = $("#citySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.currentCityId = citieid;
        this._startRefresh();
    }

    _search() {
        var params = {
            page: 0,
            size: page_size,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
    }
    _showGenerateModal(val){
        this.currentOrganization = val;
        var params={organizationid : val.id};
        this.props.dispatch(getListByMutilpCondition(params, QRCODE_COUNT_START, QRCODE_COUNT_END, qrcode_count));
    }
    _generate(id){
        $(".saveGroup").hide();
        $(".progressGrouop").fadeIn();
        $(".qrcodeLoadingText").text("二维码文件准备中，请勿关闭窗口...");
        var that = this;
        var params={
            generateNum:parseInt($("#personAmount").val()),
            organizationid: id,
            pressOrgName: parseInt($("#generatePressOrgName").val())
        };
        this.progressInterval = setInterval(function () {
            that.props.dispatch(generateQrcode(params,PROGRESS_START,PROGRESS_END,qrcode_generate,function (json) {
                if(json){
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.error.message)
                    clearInterval(that.progressInterval);
                    $(".progressGrouop").hide();
                    $(".qrcodeLoadingText").text("开始下载二维码文件...");
                    $(".saveGroup").show();
                    $("#generateModal").modal("hide");
                }else{
                    console.log("json",json);
                    if(that.props.progressData.data==100){
                        clearInterval(that.progressInterval);
                        setTimeout(function () {
                            $(".progressGrouop").hide();
                            $(".qrcodeLoadingText").text("开始下载二维码文件...");
                            $(".saveGroup").show();
                            $("#generateModal").modal("hide");
                        },2000);
                        window.location.href = qrcode_generate_download+"?"+querystring.stringify(params);
                    }
                }
            }));
        }, 3000);
    }
    _showExportModal(val){
        this.currentOrganization = val;
        var params={organizationid : val.id};
        this.props.dispatch(getListByMutilpCondition(params, QRCODE_COUNT_START, QRCODE_COUNT_END, qrcode_count));
    }
    _export(id){
        $(".saveGroup").hide();
        $(".progressGrouop").fadeIn();
        $(".qrcodeLoadingText").text("二维码文件准备中，请勿关闭窗口...");
        var that = this;
        var params={
            organizationid: id,
            bindUser: parseInt($("#bindUser").val()),
            pressOrgName: parseInt($("#exportPressOrgName").val())
        };
        this.progressInterval = setInterval(function () {
            that.props.dispatch(exportQrcode(PROGRESS_START,PROGRESS_END,qrcode_export+"?"+querystring.stringify(params),function (json) {
                if(json){
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.error.message)
                    clearInterval(that.progressInterval);
                    $(".progressGrouop").hide();
                    $(".qrcodeLoadingText").text("开始下载二维码文件...");
                    $(".saveGroup").show();
                    $("#exportModal").modal("hide");
                }else{
                    if(that.props.progressData.data==100){
                        clearInterval(that.progressInterval);
                        setTimeout(function () {
                            $(".progressGrouop").hide();
                            $(".qrcodeLoadingText").text("开始下载二维码文件...");
                            $(".saveGroup").show();
                            $("#exportModal").modal("hide");
                        },2000);
                        window.location.href = qrcode_export_download+"?"+querystring.stringify(params);
                    }
                }
            }));
        }, 3000);
    }
    _changePage(page) {
        this.page = page;
        var params = {
            page: this.page,
            size: page_size,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = {
            page: this.page,
            size: page_size,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = {
            page: this.page,
            size: page_size,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, ORGANIZATION_LIST_START, ORGANIZATION_LIST_END, organization_list));
    }

    render() {
        const {fetching, data, cityList,progressData,qrcodeCount} =this.props;
        console.log("qrcodeCount",qrcodeCount);
        var cityOptions = [];
        var countryOptions = [];
        if (cityList) {
            countryOptions.push(
                <option key={"country--1"} value={""}>{"所有区县"}</option>
            );
            if (cityList.status) {
                cityList.data.forEach(function (city, idx) {
                    cityOptions.push(
                        <option key={"city-" + idx} value={city.id}>{city.name}</option>
                    )
                });
                if (this.currentCity == "") {
                    var idx = getInitialCityIdx(this.currentCityId, cityList.data);
                    if (cityList.data[idx].country) {
                        cityList.data[idx].country.forEach(function (val, index) {
                            countryOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }
                } else {
                    if (this.currentCity.country) {
                        this.currentCity.country.forEach(function (val, index) {
                            countryOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }

                }
            }
        }
        var generateInfo = "";
        if(qrcodeCount){
            if(qrcodeCount.status){
                generateInfo = <div>
                    <div className="form-horizontal">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"批量生成二维码"}
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"小区名称"}</label>
                                <div className="col-lg-9">
                                    <input id="organizationName" type="text" value={this.currentOrganization.name} className="form-control"
                                           autoComplete="off" disabled/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"已绑定二维码数目"}</label>
                                <div className="col-lg-9">
                                    <input id="bindCount" type="text" className="form-control"
                                           autoComplete="off" value={qrcodeCount.data.bindCount} disabled/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"空白二维码数目"}</label>
                                <div className="col-lg-9">
                                    <input id="blankCount" type="text" className="form-control"
                                           autoComplete="off" value={qrcodeCount.data.blankCount} disabled/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"预估人数"}</label>
                                <div className="col-lg-9">
                                    <input id="personAmount" type="text" className="form-control" placeholder="输入预估人数"
                                           autoComplete="off"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"是否添加小区名字"}</label>
                                <div className="col-lg-9">
                                    <select id="generatePressOrgName" className="form-control">
                                        <option value={0}>不添加</option>
                                        <option value={1}>添加</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group saveGroup">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}></label>
                                <div className="col-lg-9">
                                    <div className="text-right">
                                        <button type="button" className="btn btn-primary" onClick={this._generate.bind(this,this.currentOrganization.id)}>{Current_Lang.label.save}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group progressGrouop" style={{textAlign:"center",display:"none"}}>
                                <div className="pace-demo" style={{paddingBottom: "30px"}}>
                                    <div className="theme_bar_xs"><div className="pace_progress" data-progress-text={(progressData && progressData.data?progressData.data:"1")+"%"} data-progress={progressData && progressData.data?progressData.data:"1"} style={{width: (progressData && progressData.data?progressData.data:"1")+"%"}}>{(progressData && progressData.data?progressData.data:"1")+"%"}</div></div>
                                </div>
                            </div>
                            <div className="form-group progressGrouop" style={{textAlign:"center",display:"none"}}>
                                <span className="qrcodeLoadingText">二维码文件准备中，请勿关闭窗口...</span>
                            </div>

                        </fieldset>
                    </div>
                </div>;
            }else{
                generateInfo = ErrorModal(Current_Lang.status.minor, "获取数据错误");
            }
        }else{
            generateInfo = <Loading />;
        }
        var exportInfo ="";
        if(qrcodeCount){
            if(qrcodeCount.status){
                exportInfo = <div>
                    <div className="form-horizontal">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"批量导出二维码"}
                            </legend>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"是否绑定用户"}</label>
                                <div className="col-lg-9">
                                    <select id="bindUser" className="form-control">
                                        <option value={1}>是</option>
                                        <option value={0}>否</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"小区名称"}</label>
                                <div className="col-lg-9">
                                    <input id="organizationName" type="text" value={this.currentOrganization.name} className="form-control"
                                           autoComplete="off" disabled/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"已绑定二维码数目"}</label>
                                <div className="col-lg-9">
                                    <input id="bindCount" type="text" className="form-control"
                                           autoComplete="off" value={qrcodeCount.data.bindCount} disabled/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"空白二维码数目"}</label>
                                <div className="col-lg-9">
                                    <input id="blankCount" type="text" className="form-control"
                                           autoComplete="off" value={qrcodeCount.data.blankCount} disabled/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}>{"是否添加小区名字"}</label>
                                <div className="col-lg-9">
                                    <select id="exportPressOrgName" className="form-control">
                                        <option value={0}>不添加</option>
                                        <option value={1}>添加</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group saveGroup">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}></label>
                                <div className="col-lg-9">
                                    <div className="text-right">
                                        <button type="button" className="btn btn-primary" onClick={this._export.bind(this,this.currentOrganization.id)}>{Current_Lang.label.save}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group progressGrouop" style={{textAlign:"center",display:"none"}}>
                                <div className="pace-demo" style={{paddingBottom: "30px"}}>
                                    <div className="theme_bar_xs"><div className="pace_progress" data-progress-text={(progressData && progressData.data?progressData.data:"1")+"%"} data-progress={progressData && progressData.data?progressData.data:"1"} style={{width: (progressData && progressData.data?progressData.data:"1")+"%"}}>{(progressData && progressData.data?progressData.data:"1")+"%"}</div></div>
                                </div>
                            </div>
                            <div className="form-group progressGrouop" style={{textAlign:"center",display:"none"}}>
                                <span className="qrcodeLoadingText">二维码文件准备中，请勿关闭窗口...</span>
                            </div>


                        </fieldset>
                    </div>

                </div>;
            }else{
                exportInfo = ErrorModal(Current_Lang.status.minor, "获取数据错误");
            }
        }else{
            exportInfo = <Loading />;
        }
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-office'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <fieldset className="content-group">
                        <legend className="text-bold">{Current_Lang.label.searching}</legend>
                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                            style={{textAlign: 'right', marginTop: '-59px'}}>
                            <li style={{display: "inline-block"}}>
                                <select id="citySelect" className="form-control"
                                        value={this.currentCityId} onChange={this._changeCity}>
                                    {cityOptions}
                                </select>
                            </li>
                            <li style={{display: "inline-block"}}>
                                <select id="countrySelect" className="form-control">
                                    {countryOptions}
                                </select>
                            </li>
                            <li>
                                <button onClick={this._search.bind(this)} type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>

                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"小区、单位列表区"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data && data.data ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <OrganizationListComponent data={data} fetching={fetching}
                                                   _showGenerateModal={this._showGenerateModal}
                                                   _showExportModal={this._showExportModal}/>

                    </fieldset>
                    <ListMiddleModal id="generateModal" content={generateInfo}
                                     doAction={""}
                                     tip={"批量生成二维码"} actionText="批量生成二维码" hide="true" hideCancel="true"/>
                    <ListMiddleModal id="exportModal" content={exportInfo}
                                     doAction={""}
                                     tip={"批量导出二维码"} actionText="批量导出二维码" hide="true" hideCancel="true"/>
                </div>
            </div>
        )
    }
}

class OrganizationListComponent extends Component {
    constructor(props) {
        super(props)
    }
    _detail(path) {
        browserHistory.push(path)
    }
    _showGenerateModal(val) {
        this.props._showGenerateModal(val);
    }
    _showExportModal(val){
        this.props._showExportModal(val);
    }

    render() {
        const {data, fetching}=this.props;
        let tb = [];
        if (data) {
            if (data.status) {
                if (data.data && data.data.content.length > 0) {
                    data.data.content.forEach(function (val, key) {
                        tb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.name}</td>
                            <td className="text-center">{organizationType(val.type)}</td>
                            <td className="text-center">{val.city}</td>
                            <td className="text-center">{val.county}</td>
                            <td className="text-center">{val.address}</td>
                            <td className="text-center">{timeStamp2Time(val.createTime)}</td>
                            <td className="text-center">{timeStamp2Time(val.updateTime)}</td>
                            <td className="text-center">
                                {<ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li style={{display: 'block'}}
                                                onClick={this._detail.bind(this, '/CustomerService/OrganizationManage/Update/:' + val.id)}>
                                                <a href="javascript:void(0)"><i className="icon-pencil5"></i>
                                                    {"修改"}</a></li>
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#generateModal" onClick={this._showGenerateModal.bind(this,val)}><i
                                                    className=" icon-office"></i>
                                                    {"批量生成二维码"}</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#exportModal" onClick={this._showExportModal.bind(this,val)}><i
                                                    className=" icon-office"></i>
                                                    {"批量导出二维码"}</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>}

                            </td>
                        </tr>)
                    }.bind(this));
                } else {
                    tb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>

                    </tr>)
                }
            } else {
                tb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"));
            }
        } else {
            tb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }

        var tableHeight = ($(window).height() - 240);
        return (
            <div className="table-responsive" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                <table className="table table-bordered table-hover" style={{marginBottom: '85px'}}>
                    <thead>
                    <tr style={{fontWeight: 'bold'}}>
                        <th className="text-center" style={{width: "20px"}}></th>
                        <th className="col-md-2 text-bold text-center">{"名称"}</th>
                        <th className="col-md-1 text-bold text-center">{"组织类型"}</th>
                        <th className="col-md-1 text-bold text-center">{"所在城市"}</th>
                        <th className="col-md-1 text-bold text-center">{"所在区县"}</th>
                        <th className="col-md-3 text-bold text-center">{"地址"}</th>
                        <th className="col-md-2 text-bold text-center">{"创建时间"}</th>
                        <th className="col-md-2 text-bold text-center">{"修改时间"}</th>
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

function mapStateToProps(state) {
    const {getOrganizationList, getCityList, getProgressData,getQrcodeCount, commonReducer}=state;
    return {
        fetching: getOrganizationList.fetching,
        data: getOrganizationList.data,
        progressData: getProgressData.data,
        qrcodeCount: getQrcodeCount.data,
        cityList: getCityList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(OrganizationListContainer)