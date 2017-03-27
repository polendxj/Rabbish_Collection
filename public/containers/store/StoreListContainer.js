/**
 * Created by Captain on 2017/3/4.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BreadCrumbs from '../../components/right/breadCrumbs';
import Pagenation from '../../components/right/Pagenation';
import {
    Loading,
    NoData,
    ConfirmModal,
    ErrorModal,
    timeStamp2Time,
    ListMiddleModal,
    filterByApprove,
    VerifyModal,
    filterCityById,
    getInitialCityIdx
} from '../../components/Tool/Tool';
import {STORE_LIST_START, STORE_LIST_END,CITY_LIST_START,CITY_LIST_END} from '../../constants/index.js'
import VerifiedStore from './VerifiedStore';
import UnauthorizedStore from './UnauthorizedStore';
import UnVerifiedStore from './UnVerifiedStore';
import {commonRefresh} from '../../actions/Common';
import {getListByMutilpCondition,saveObject} from '../../actions/CommonActions';

export default class StoreListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [
            {text: "客户服务", link: ''},
            {text: "加盟商管理", link: ''},
            {text: "加盟商列表", link: ''}
        ];
        this.detailData = "";
        this.verifyFlag = false;
        this.currentCity = "";
        this.currentCityId = 1;
        this.operation = [];
        this.searchColumn = "DRIVER";
        this._detail = this._detail.bind(this);
        this._showVerify = this._showVerify.bind(this);
        this._changeCity = this._changeCity.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
        this._changePage=this._changePage.bind(this);
        this._prePage=this._prePage.bind(this);
        this._nextPage=this._nextPage.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {page: 0, size: 20};
        this.props.dispatch(getListByMutilpCondition(params, STORE_LIST_START, STORE_LIST_END, store_list));
        this.props.dispatch(getListByMutilpCondition(params, CITY_LIST_START, CITY_LIST_END, city_list));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $("#search_way").parent().parent().on('click', 'li', function () {
            $("#search_way").text($(this).find('a').text());
            if ($(this).find('a').text().trim() == "按姓名搜索") {
                self.searchColumn = "DRIVER";
            } else {
                self.searchColumn = "LINE";
            }
        })
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }
    _changeCity() {
        var cityid = $("#citySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, cityid);
        this.currentCityId = cityid;
        this._startRefresh();
    }
    _detail(val) {
        this.detailData = val;
        this._startRefresh();
    }
    _showVerify(val){
        this.verifyFlag = true;
        this.detailData = val;
        this._startRefresh();
    }
    _verifyBtn(userid){
        var that = this;
        var params={
            approved: 2,
            storeid: userid
        };
        var listParams = {page: 0, size: page_size};
        this.props.dispatch(saveObject(params,"","",store_approve,"/CustomerService/StoreManage","noAlert",function () {
            that.props.dispatch(getListByMutilpCondition(listParams, STORE_LIST_START, STORE_LIST_END, store_list));
        }));
        $("#verifyModal").modal("hide");
    }
    _unverifyBtn(userid){
        var that = this;
        var params={
            approved: 1,
            storeid: userid
        };
        var listParams = {page: 0, size: page_size};
        this.props.dispatch(saveObject(params,"","",store_approve,"/CustomerService/StoreManage","noAlert",function () {
            that.props.dispatch(getListByMutilpCondition(listParams, STORE_LIST_START, STORE_LIST_END, store_list));
        }));
        $("#verifyModal").modal("hide");
    }

    _delete(id, classConfName, weight) {
        var that = this;
        if (sessionStorage['adminId'] == id) {
            ErrorModal(Current_Lang.status.minor, Current_Lang.alertTip.accountOperating);
            return
        }
        ConfirmModal(Current_Lang.status.minor, Current_Lang.alertTip.confirmDelete + classConfName + "（" + weight + "）" + Current_Lang.alertTip.confirmMa, function () {
            that.props.dispatch(deleteAdmin(id, 0, that.searchColumn, $("#search_value").val()))
        })

    }

    _saveStoreSettlement(id){
        var that = this;
        var params = {};
        params['userid'] = id;
        params['points'] = parseInt($("#settlementAmount").val());
        params['amount'] = parseInt($("#settlementPoints").val());
        $("#storeSettlementModal").modal("hide");
        this.props.dispatch(saveObject(params,"","",storeSettlement_register,"","x",function(){
            var param = {page: 0, size: page_size};
            that.props.dispatch(getListByMutilpCondition(param, STORE_LIST_START, STORE_LIST_END, store_list));
        }));
    }

    _search() {
        var params = {
            page: 0,
            size: page_size,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, STORE_LIST_START, STORE_LIST_END, store_list));
    }

    _changePage(page) {
        this.page = page;
        var params = {
            page: this.page,
            size: page_size,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, STORE_LIST_START, STORE_LIST_END, store_list));
    }

    _prePage(page) {
        this.page = this.page - 1;
        var params = {
            page: this.page,
            size: page_size,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, STORE_LIST_START, STORE_LIST_END, store_list));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        var params = {
            page: this.page,
            size: page_size,
            cityid: $("#citySelect").val(),
            countyid: $("#countrySelect").val()
        };
        this.props.dispatch(getListByMutilpCondition(params, STORE_LIST_START, STORE_LIST_END, store_list));
    }

    render() {
        const {fetching, data,cityList} =this.props;
        console.log("data",data);
        var verifiedData = "";
        var unauthorizedData = "";
        var unverifiedData = "";
        if (data.data) {
            verifiedData = filterByApprove(data.data.content, 2);
            unauthorizedData = filterByApprove(data.data.content, 0);
            unverifiedData = filterByApprove(data.data.content, 1);
        }
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
        var detailStoreInfo = "";
        if(this.detailData==""){
            detailStoreInfo = <Loading />;
        }else{
            detailStoreInfo =
                <div>
                    <div className="form-horizontal">
                        <fieldset className="content-group">
                            <legend className="text-bold">
                                {"详细信息"}
                            </legend>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"店铺图标"}</label>
                                    <div className="col-lg-8">
                                        <div className="thumbnail"
                                             style={{marginBottom: 0, width: "165px", padding: 0, border: 0}}>
                                            <div className="thumb">
                                                <img src={imgBaseUrl+this.detailData.logo} alt=""
                                                     style={{height: "160px", width: "160px"}}/>
                                                <div className="caption-overflow" style={{width: "auto"}}>
                                        <span style={{top: 0, marginTop: 0}}>
                                            <a href={imgBaseUrl+this.detailData.logo} data-popup="lightbox"
                                               className="btn" style={{height: "160px", width: "160px"}}></a>
                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"营业执照"}</label>
                                    <div className="col-lg-8">
                                        <div className="thumbnail"
                                             style={{marginBottom: 0, width: "165px", padding: 0, border: 0}}>
                                            <div className="thumb">
                                                <img src={imgBaseUrl+this.detailData.license} alt=""
                                                     style={{height: "160px", width: "160px"}}/>
                                                <div className="caption-overflow" style={{width: "auto"}}>
                                        <span style={{top: 0, marginTop: 0}}>
                                            <a href={imgBaseUrl+this.detailData.license} data-popup="lightbox"
                                               className="btn" style={{height: "160px", width: "160px"}}></a>
                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"店铺名称"}</label>
                                    <div className="col-lg-8">
                                        <input disabled id="name" type="text" value={this.detailData.name} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"负责人"}</label>
                                    <div className="col-lg-8">
                                        <input disabled id="name" type="text" value={this.detailData.manager} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"城市"}</label>
                                    <div className="col-lg-8">
                                        <input disabled id="name" type="text" value={this.detailData.city} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"区县"}</label>
                                    <div className="col-lg-8">
                                        <input disabled id="name" type="text" value={this.detailData.county} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"地址"}</label>
                                    <div className="col-lg-8">
                                        <input disabled id="name" type="text" value={this.detailData.address} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"联系方式"}</label>
                                    <div className="col-lg-8">
                                        <input disabled id="name" type="text" value={this.detailData.contact} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"经度"}</label>
                                    <div className="col-lg-8">
                                        <input disabled id="name" type="text" value={this.detailData.longitude} className="form-control"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="col-lg-4 control-label"
                                           style={{textAlign: 'center'}}>{"纬度"}</label>
                                    <div className="col-lg-8">
                                        <input disabled id="name" type="text" value={this.detailData.latitude} className="form-control"
                                               placeholder="行政区名称"
                                               autoComplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-lg-12">
                                    <label className="col-lg-2 control-label"
                                           style={{textAlign: 'center'}}>{"描 述"}</label>
                                    <div className="col-lg-10">
                                    <textarea disabled id="name" type="text" value={this.detailData.description} className="form-control"
                                              autoComplete="off"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-2 control-label"
                                       style={{textAlign: 'center'}}></label>
                                <div className="col-lg-10">
                                    <div className="text-right">
                                        <button type="button" className="btn btn-primary"
                                                style={{display:this.verifyFlag?"inline-block":"none"}}
                                                onClick={this._unverifyBtn.bind(this,this.detailData.userid)}>
                                            {"不通过"}
                                        </button>
                                        <button type="button" className="btn btn-primary"
                                                style={{margin:"0 10px",display:this.verifyFlag?"inline-block":"none"}}
                                                onClick={this._verifyBtn.bind(this,this.detailData.userid)}>{"通过"}
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </fieldset>
                    </div>

                </div>;
        }
        var storeSettlementInfo = <div>
            <div className="form-horizontal">
                <fieldset className="content-group">
                    <legend className="text-bold">
                        {"兑账信息"}
                    </legend>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"商户名称"}</label>
                        <div className="col-lg-9">
                            <input disabled id="storeName" type="text" value={this.detailData.name} className="form-control"
                                   autoComplete="off" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"结算金额"}</label>
                        <div className="col-lg-9">
                            <input id="settlementAmount" type="text" className="form-control" placeholder="输入结算金额"
                                   autoComplete="off"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}>{"结算积分"}</label>
                        <div className="col-lg-9">
                            <input id="settlementPoints" type="text" className="form-control" placeholder="输入结算积分"
                                   autoComplete="off"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-lg-2 control-label"
                               style={{textAlign: 'center'}}></label>
                        <div className="col-lg-9">
                            <div className="text-right">
                                <button type="button" className="btn btn-primary" onClick={this._saveStoreSettlement.bind(this,this.detailData.userid)}>{Current_Lang.label.save}
                                </button>
                            </div>
                        </div>
                    </div>


                </fieldset>
            </div>

        </div>;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={' icon-home9'}
                    operation={this.operation}
                />
                <ul className="nav nav-tabs">
                    <li
                        className="active"
                        style={{fontWeight: 'bold'}}><a
                        href="#verifiedStore" data-toggle="tab">{"通过审核"}</a>
                    </li>
                    <li
                        style={{fontWeight: 'bold'}}><a
                        href="#unauthorizedStore"
                        data-toggle="tab">{"审核中"}</a>
                    </li>
                    <li
                        style={{fontWeight: 'bold'}}><a
                        href="#unverifiedStore"
                        data-toggle="tab">{"未通过审核"}</a>
                    </li>
                </ul>
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
                                <button onClick={this._search.bind(this)}type="button"
                                        className="btn btn-primary btn-icon"><i
                                    className="icon-search4"></i></button>
                            </li>

                        </ul>
                    </fieldset>
                    <fieldset className="content-group">
                        <legend className="text-bold">{"加盟商列表"}</legend>
                        <div style={{marginTop: '-80px'}}>
                            <Pagenation counts={data ? data.data.totalElements : 0} page={this.page}
                                        _changePage={this._changePage} _prePage={this._prePage}
                                        _nextPage={this._nextPage}/>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane active"
                                 id="verifiedStore">
                                <VerifiedStore data={verifiedData} fetching={fetching}
                                               _delete={this._delete}
                                               _detail={this._detail}
                                               _saveStoreSettlement = {this._saveStoreSettlement}
                                               _updateStatus={this._updateStatus}/>
                            </div>
                            <div className="tab-pane"
                                 id="unauthorizedStore">
                                <UnauthorizedStore data={unauthorizedData} fetching={fetching}
                                                   _detail={this._detail}
                                                   _showVerify={this._showVerify}
                                                   _delete={this._delete}
                                                   _updateStatus={this._updateStatus}/>
                            </div>
                            <div className="tab-pane"
                                 id="unverifiedStore">
                                <UnVerifiedStore data={unverifiedData} fetching={fetching}
                                                 _detail={this._detail}
                                                 _delete={this._delete}
                                                 _updateStatus={this._updateStatus}/>
                            </div>
                        </div>

                    </fieldset>
                    <ListMiddleModal id="detailModal" content={detailStoreInfo}
                                     doAction={""}
                                     tip={"加盟商信息"} actionText="加盟商详情" hide="true" hideCancel="true"/>
                    <VerifyModal id="verifyModal" content={detailStoreInfo}
                                     tip={"未认证商户信息"}/>
                    <ListMiddleModal id="storeSettlementModal" content={storeSettlementInfo}
                                     doAction={""}
                                     tip={"兑账信息"} actionText="兑账信息" hide="true" hideCancel="true"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {getStoreList,getCityList, commonReducer}=state;
    return {
        fetching: getStoreList.fetching,
        data: getStoreList.data,
        cityList: getCityList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(StoreListContainer)