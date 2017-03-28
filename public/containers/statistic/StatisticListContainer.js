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
    ListMiddleModal,
    timeStamp2Time,
    filterCityById,
    getInitialCityIdx,
    mergeClassify,
    moneyFormat
} from '../../components/Tool/Tool';
import {
    STATISTICBYCLASSIFY_LIST_START,
    STATISTICBYCLASSIFY_LIST_END,
    STATISTICBYCITY_LIST_START,
    STATISTICBYCITY_LIST_END,
    STATISTICBYORGANIZATION_LIST_START,
    STATISTICBYORGANIZATION_LIST_END,
    STATISTICBYRANGEDATE_LIST_START,
    STATISTICBYRANGEDATE_LIST_END,
    STATISTIC_SETTLEMENT_START,
    STATISTIC_SETTLEMENT_END,
    STATISTIC_TOTAL_START,
    STATISTIC_TOTAL_END,
    OPERATION_MONITOR_START,
    OPERATION_MONITOR_END,
    CITY_ORGANIZATION_LIST_START,
    CITY_ORGANIZATION_LIST_END,
    CLASSCONF_LIST_START,
    CLASSCONF_LIST_END,
    CITY_LIST_START,
    CITY_LIST_END
} from '../../constants/index.js'
import {getListByMutilpCondition} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class StatisticListContainer extends Component {
    constructor(props) {
        super(props);
        this.page = 0;
        this.breadCrumbs = [];
        this.operation = [
            {icon: "", text: "", action: ""}
        ];
        this.organizationList = "";
        this.cityEveryData = "";
        this.searchColumn = "CLASSIFY";
        this.currentCityId = 1;
        this.cityOfcurrentCityId = 1;
        this.organizationOfcurrentCityId = 1;
        this.daterangeOfcurrentCityId = 1;
        this.settlementOfcurrentCityId = 1;
        this.totalCurrentCityId = 1;
        this.currentCity = "";
        this.currentCityOfCounty = "";
        this._search = this._search.bind(this);
        this._changeCity = this._changeCity.bind(this);
        this._changeCityOfCity = this._changeCityOfCity.bind(this);
        this._changeCityOfOrganization = this._changeCityOfOrganization.bind(this);
        this._changeCityOfDaterange = this._changeCityOfDaterange.bind(this);
        this._changeCityOfSettlement = this._changeCityOfSettlement.bind(this);
        this._changeCityOfTotal = this._changeCityOfTotal.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
    }

    componentDidMount() {
        var self = this;
        var params = {
            cityid: self.currentCityId,
            page: 0,
            size: 20,
            startday: "2016-01-01",
            endday: timeStamp2Time(new Date().getTime())
        };
        var defaultParams = {page: 0, size: 10000};
        var cityParams = {page: 0, size: 100};
        var monitorParams = {origin: 1};
        this.props.dispatch(getListByMutilpCondition(params, STATISTICBYCLASSIFY_LIST_START, STATISTICBYCLASSIFY_LIST_END, statisticByClassify_list));
        this.props.dispatch(getListByMutilpCondition(params, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));
        this.props.dispatch(getListByMutilpCondition(params, STATISTICBYORGANIZATION_LIST_START, STATISTICBYORGANIZATION_LIST_END, statisticByOrganization_list));
        this.props.dispatch(getListByMutilpCondition({cityid: self.currentCityId}, STATISTICBYRANGEDATE_LIST_START, STATISTICBYRANGEDATE_LIST_END, statisticByRangeDate_list));
        this.props.dispatch(getListByMutilpCondition({cityid: self.currentCityId}, STATISTIC_TOTAL_START, STATISTIC_TOTAL_END, statisticByRangeDate_list));
        this.props.dispatch(getListByMutilpCondition({cityid: self.currentCityId}, STATISTIC_SETTLEMENT_START, STATISTIC_SETTLEMENT_END, statistic_settlement));
        this.props.dispatch(getListByMutilpCondition(monitorParams, OPERATION_MONITOR_START, OPERATION_MONITOR_END, operation_monitor));
        this.props.dispatch(getListByMutilpCondition(defaultParams, CITY_ORGANIZATION_LIST_START, CITY_ORGANIZATION_LIST_END, cityOfOrganization_list));
        this.props.dispatch(getListByMutilpCondition(defaultParams, CLASSCONF_LIST_START, CLASSCONF_LIST_END, classConf_list));
        this.props.dispatch(getListByMutilpCondition(cityParams, CITY_LIST_START, CITY_LIST_END, city_list));
        //this.props.dispatch(getAdminList(0, 'ALL', ''));
        $('.daterange-single').daterangepicker({
            singleDatePicker: true,
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            autoUpdateInput: false,
            locale: dateLocale
        });
        $('.daterange-two').daterangepicker({
            maxDate: moment(), //最大时间
            opens: "left",
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            ranges: rangesLocale,
            startDate: '01/01/2016',
            endDate: moment(),
            locale: dateLocale
        });
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _search(type) {
        if (type == "CLASSIFY") {
            var classifyParams = {
                page: 0,
                size: 20,
                cityid: $("#citySelect").val(),
                organizationid: $("#ofClassifySelect").val(),
                monthday: timeStamp2Time(new Date($('.daterange-single').val()))
            };
            this.props.dispatch(getListByMutilpCondition(classifyParams, STATISTICBYCLASSIFY_LIST_START, STATISTICBYCLASSIFY_LIST_END, statisticByClassify_list));
        } else if (type == "CITY") {
            var rangeTime = $("#daterange-two-2").val();
            var cityParams = {
                page: 0,
                size: 20,
                cityid: $("#cityOfCitySelect").val(),
                startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
                endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
            };
            this.props.dispatch(getListByMutilpCondition(cityParams, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));
        } else if (type == "ORGANIZATION") {
            var rangeTime = $("#daterange-two-3").val();
            var organizationParams = {
                page: 0,
                size: 20,
                cityid: $("#cityOfOrganizationSelect").val(),
                organizationid: $("#ofOrganizationSelect").val(),
                startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
                endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
            };
            this.props.dispatch(getListByMutilpCondition(organizationParams, STATISTICBYORGANIZATION_LIST_START, STATISTICBYORGANIZATION_LIST_END, statisticByOrganization_list));
        } else if (type == "SETTLEMENT") {
            var rangeTime = $("#daterange-two-4").val();
            var settlementParams = {
                cityid: $("#cityOfSettlementSelect").val(),
                countyid: $("#ofSettlementSelect").val(),
                userid: $("#userid").val(),
                startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
                endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
            };
            this.props.dispatch(getListByMutilpCondition(settlementParams, STATISTIC_SETTLEMENT_START, STATISTIC_SETTLEMENT_END, statistic_settlement));
        } else {
            var rangeTime = $("#daterange-two-5").val();
            var rangeDateParams = {
                page: 0,
                size: 20,
                cityid: $("#cityOfDateRangeSelect").val(),
                organizationid: $("#ofDaterangeSelect").val(),
                startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
                endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
            };
            this.props.dispatch(getListByMutilpCondition(rangeDateParams, STATISTICBYRANGEDATE_LIST_START, STATISTICBYRANGEDATE_LIST_END, statisticByRangeDate_list));
        }
    }

    _changeCity() {
        var citieid = $("#citySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.currentCityId = citieid;
        this._startRefresh();
    }

    _changeCityOfTotal() {
        var citieid = $("#cityOfTotalSelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.totalCurrentCityId = citieid;
        this.props.dispatch(getListByMutilpCondition({cityid: citieid}, STATISTIC_TOTAL_START, STATISTIC_TOTAL_END, statisticByRangeDate_list));
    }

    _changeCityOfCity() {
        var citieid = $("#cityOfCitySelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.cityOfcurrentCityId = citieid;
        this._startRefresh();
    }

    _changeCityOfOrganization() {
        var citieid = $("#cityOfOrganizationSelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.organizationOfcurrentCityId = citieid;
        this._startRefresh();
    }

    _changeCityOfDaterange() {
        var citieid = $("#cityOfDateRangeSelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.daterangeOfcurrentCityId = citieid;
        this._startRefresh();
    }

    _changeCityOfSettlement() {
        var citieid = $("#cityOfSettlementSelect").val();
        this.currentCityOfCounty = filterCityById(this.props.cityOfCountyList.data, citieid);
        console.log("this.currentCityOfCounty", this.currentCityOfCounty);
        this.settlementOfcurrentCityId = citieid;
        this._startRefresh();
    }
    _detail(list){
        console.log("list",list);
        this.organizationList = list;
        this._startRefresh();
    }
    _cityDetail(cityData){
        this.cityEveryData = cityData;
        console.log("cityEveryData",this.cityEveryData);
        this._startRefresh();
    }
    _changePage(page) {
        this.page = page;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _prePage(page) {
        this.page = this.page - 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _nextPage(page) {
        this.page = this.page + 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    render() {
        const {fetching, classifyData, cityData, organizationData, rangeDateData, settlementData, operationData, cityList, cityOfCountyList, totalData, classifyList} =this.props;
        console.log("organizationData", organizationData);
        console.log("cityData", cityData);
        var data = "";
        var showCity = "city";
        var classifyDataMerge = [];
        let classifyTb = [];
        let cityTb = [];
        let organizationTb = [];
        let daterangeTb = [];
        let settlementTb = [];
        if (classifyData && classifyList) {
            if (classifyData.status && classifyList.status) {
                classifyDataMerge = mergeClassify(classifyList.data, classifyData.data);
                if (classifyDataMerge.length > 0) {
                    classifyDataMerge.forEach(function (val, key) {
                        classifyTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.className}</td>
                            <td className="text-center">
                                {$("#ofClassifySelect").val() ? $("#ofClassifySelect").find("option:selected").text() : $("#citySelect").find("option:selected").text()}
                            </td>
                            <td className="text-center">{val.count}</td>
                            <td className="text-center">{val.weight.toFixed(0)}</td>
                        </tr>)
                    }.bind(this));
                } else {
                    classifyTb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>)
                }
            } else {
                classifyTb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"));
            }
        } else {
            classifyTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        if (cityData) {
            if (cityData.organizationData && cityData.organizationData.length > 0) {
                cityData.organizationData.forEach(function (val, key) {
                    cityTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">{val.organizationTotal.organizationName}</td>
                        <td className="text-center">{val.organizationTotal.count}</td>
                        <td className="text-center">{val.organizationTotal.weight.toFixed(0)}</td>
                        <td className="text-center">{val.organizationTotal.rangeDate}</td>
                        <td className="text-center">
                            {<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <a href="javascript:void(0)" data-toggle="modal"
                                               data-target="#organizationDetailModal" onClick={this._detail.bind(this, val.organizationEveryData)}><i
                                                className=" icon-office"></i>
                                                {"详情"}</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>}

                        </td>
                    </tr>)
                }.bind(this));
            } else {
                cityTb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>
                </tr>)
            }
        } else {
            cityTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        if (organizationData) {
            if (organizationData.status) {
                var organizationDataList = null;
                if (organizationData.data) {
                    if (typeof organizationData.data.content == "undefined") {
                        organizationDataList = organizationData.data;
                    } else {
                        organizationDataList = organizationData.data.content;
                    }
                }
                if (organizationDataList && organizationDataList.length > 0) {
                    organizationDataList.forEach(function (val, key) {
                        organizationTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.organizationName}</td>
                            <td className="text-center">{val.count}</td>
                            <td className="text-center">{val.weight.toFixed(0)}</td>
                            <td className="text-center">{timeStamp2Time(val.monthday)}</td>
                        </tr>)
                    }.bind(this));
                } else {
                    organizationTb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>)
                }
            } else {
                organizationTb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"));
            }
        } else {
            organizationTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        if (rangeDateData) {
            if (rangeDateData.status) {
                var rangeDateDataList = null;
                if (rangeDateData.data) {
                    if (typeof rangeDateData.data.content == "undefined") {
                        rangeDateDataList = rangeDateData.data;
                    } else {
                        rangeDateDataList = rangeDateData.data.content;
                    }
                }
                if (rangeDateDataList) {
                    daterangeTb.push(<tr key={"rangeDate"}>
                        <td className="text-center">{1}</td>
                        <td className="text-center">
                            {$("#ofDaterangeSelect").val() ? $("#ofDaterangeSelect").find("option:selected").text() : $("#cityOfDateRangeSelect").find("option:selected").text()}
                        </td>
                        <td className="text-center">{rangeDateDataList.count}</td>
                        <td className="text-center">{rangeDateDataList.weight}</td>
                    </tr>)
                } else {
                    daterangeTb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>)
                }
            } else {
                daterangeTb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"));
            }
        } else {
            daterangeTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        if (settlementData) {
            if (settlementData.status) {
                var settlementDataList = null;
                if (settlementData.data) {
                    if (typeof settlementData.data.content == "undefined") {
                        settlementDataList = settlementData.data;
                    } else {
                        settlementDataList = settlementData.data.content;
                    }
                }
                if (settlementDataList) {
                    if (settlementDataList.cityName) {
                        showCity = "city";
                    } else if (settlementDataList.countyName) {
                        showCity = "county";
                    }
                    settlementTb.push(<tr key={"rangeDate"}>
                        <td className="text-center">{1}</td>
                        <td className="text-center">{showCity == "city" ? settlementDataList.cityName : settlementDataList.countyName}</td>
                        <td className="text-center">{settlementDataList.totalAmount}</td>
                        <td className="text-center">{settlementDataList.totalPoints}</td>
                    </tr>)
                } else {
                    settlementTb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>)
                }
            } else {
                settlementTb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"));
            }
        } else {
            settlementTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        var cityOptions = [];
        var organizationOptions = [];
        var cityOfCountyOptions = [];
        var countyOptions = [];
        if (cityOfCountyList) {
            countyOptions.push(
                <option key={"country--1"} value={""}>{"所有区县"}</option>
            );
            if (cityOfCountyList.status) {
                cityOfCountyList.data.forEach(function (city, idx) {
                    cityOfCountyOptions.push(
                        <option key={"city-" + idx} value={city.id}>{city.name}</option>
                    )
                });
                if (this.currentCityOfCounty == "") {
                    var idx = getInitialCityIdx(this.settlementOfcurrentCityId, cityList.data);
                    if (cityOfCountyList.data[idx].country) {
                        cityOfCountyList.data[idx].country.forEach(function (val, index) {
                            countyOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }
                } else {
                    if (this.currentCityOfCounty.country) {
                        this.currentCityOfCounty.country.forEach(function (val, index) {
                            countyOptions.push(
                                <option key={"country-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }

                }
            }
        }
        if (cityList) {
            organizationOptions.push(
                <option key={"organization--1"} value={""}>{"所有小区"}</option>
            );
            if (cityList.status) {
                cityList.data.forEach(function (city, idx) {
                    cityOptions.push(
                        <option key={"city-" + idx} value={city.id}>{city.name}</option>
                    )
                });
                if (this.currentCity == "") {
                    var idx = getInitialCityIdx(this.currentCityId, cityList.data);
                    if (cityList.data[idx].organization.content.length > 0) {
                        cityList.data[idx].organization.content.forEach(function (val, index) {
                            organizationOptions.push(
                                <option key={"organization-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }
                } else {
                    if (this.currentCity.organization.content.length > 0) {
                        this.currentCity.organization.content.forEach(function (val, index) {
                            organizationOptions.push(
                                <option key={"organization-" + index} value={val.id}>{val.name}</option>
                            )
                        })
                    }

                }
            }
        }
        var showOperation = "正在计算中...";
        var showTotal = "正在计算中...";
        var showTotalOfCity = "正在计算中...";
        console.log("totalData", totalData);
        if (cityData) {
            if (cityData.totalCityData) {
                showTotalOfCity = "ok";
            } else {
                showTotalOfCity = "无数据";
            }
        }
        if (totalData) {
            if (totalData.status) {
                if (totalData.data) {
                    showTotal = "ok";
                } else {
                    showTotal = "无数据";
                }
            } else {
                showTotal = "获取数据失败";
            }
        }
        if (operationData) {
            if (operationData.status) {
                if (operationData.data) {
                    showOperation = "ok";
                } else {
                    showOperation = "无数据";
                }
            } else {
                showOperation = "获取数据失败";
            }
        }
        var detailOrganizationTb = [];
        if(this.organizationList==""){
            detailOrganizationTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }else{
            this.organizationList.forEach(function (val, key) {
                detailOrganizationTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                    <td className="text-center">{key + 1}</td>
                    <td className="text-center">{val.organizationName}</td>
                    <td className="text-center">{val.count}</td>
                    <td className="text-center">{val.weight.toFixed(0)}</td>
                    <td className="text-center">{timeStamp2Time(val.monthday)}</td>
                </tr>)
            }.bind(this));
        }
        var detailOrganizationInfo = <div>
            <table className="table table-bordered table-striped text-center">
                <thead>
                <tr style={{fontWeight: 'bold'}}>
                    <th className="text-center" style={{width: "20px"}}></th>
                    <th className="col-md-3 text-center text-bold">{"单位/小区"}</th>
                    <th className="col-md-3 text-center text-bold">{"投放次数"}</th>
                    <th className="col-md-3 text-center text-bold">{"投放重量"}</th>
                    <th className="col-md-3 text-center text-bold">{"日期"}</th>
                </tr>
                </thead>
                <tbody>
                {detailOrganizationTb}
                </tbody>
            </table>
        </div>

        var detailCityEveryTb = [];
        if(this.cityEveryData==""||typeof this.cityEveryData=="undefined"){
            detailCityEveryTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }else{
            if(this.cityEveryData.content.length>0){
                this.cityEveryData.content.forEach(function (val, key) {
                    detailCityEveryTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">{val.cityName}</td>
                        <td className="text-center">{val.count}</td>
                        <td className="text-center">{val.weight.toFixed(2)}</td>
                        <td className="text-center">{timeStamp2Time(val.monthday)}</td>
                    </tr>)
                }.bind(this));
            }else{
                detailCityEveryTb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>
                </tr>)
            }
        }
        var detailCityEveryInfo = <div>
            <table className="table table-bordered table-striped text-center">
                <thead>
                <tr style={{fontWeight: 'bold'}}>
                    <th className="text-center" style={{width: "20px"}}></th>
                    <th className="col-md-3 text-center text-bold">{"城市"}</th>
                    <th className="col-md-3 text-center text-bold">{"投放次数"}</th>
                    <th className="col-md-3 text-center text-bold">{"投放重量"}</th>
                    <th className="col-md-3 text-center text-bold">{"日期"}</th>
                </tr>
                </thead>
                <tbody>
                {detailCityEveryTb}
                </tbody>
            </table>
        </div>

        var tableHeight = ($(window).height() - 410);
        return (
            <div>
                <div className="content" style={{marginTop: '5px'}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="panel bg-teal-400">
                                    <div className="panel-body">
                                        <h3 className="no-margin">{showTotal == "ok" ? moneyFormat(totalData.data.weight) : showTotal}
                                            &nbsp;/ {showTotal == "ok" ? moneyFormat(totalData.data.count) : showTotal}</h3>
                                        <select id="cityOfTotalSelect" className="form-control pull-right input-xs"
                                                style={{position: "absolute", width: "100px", right: "5px", top: "5px"}}
                                                value={this.totalCurrentCityId} onChange={this._changeCityOfTotal}>
                                            {cityOptions}
                                        </select>
                                        垃圾投放总量 &nbsp;/ 垃圾投放次数
                                        <div className="text-muted text-size-small">单位：吨</div>
                                        <a className="heading-elements-toggle"><i className="icon-menu"></i></a></div>

                                </div>
                            </div>

                            <div className="col-lg-3  col-md-6">
                                <div className="panel bg-blue-400" style={{position: "static", zoom: "1"}}>
                                    <div className="panel-body">
                                        <h3 className="no-margin">{showOperation == "ok" ? moneyFormat(operationData.data.totalUser) : showOperation}</h3>
                                        激活用户总数
                                        <div className="text-muted text-size-small">单位：个</div>
                                        <a className="heading-elements-toggle"><i className="icon-menu"></i></a></div>

                                </div>
                            </div>

                            <div className="col-lg-3  col-md-6">
                                <div className="panel bg-pink-400">
                                    <div className="panel-body">

                                        <h3 className="no-margin">{showOperation == "ok" ? moneyFormat(operationData.data.totalXAmount) : showOperation}</h3>
                                        兑换总金额
                                        <div className="text-muted text-size-small">单位：元</div>
                                        <a className="heading-elements-toggle"><i className="icon-menu"></i></a></div>

                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="panel bg-grey-400">
                                    <div className="panel-body">

                                        <h3 className="no-margin">{showOperation == "ok" ? moneyFormat(operationData.data.requestPerDay) : showOperation}</h3>
                                        每日请求数
                                        <div className="text-muted text-size-small">单位：次/平均</div>
                                        <a className="heading-elements-toggle"><i className="icon-menu"></i></a></div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{padding: "20px"}}>
                        <div className="tabbable">
                            <ul className="nav nav-tabs nav-justified nav-tabs-highlight">
                                <li className=""><a href="#basic-justified-tab1" data-toggle="tab"
                                                          aria-expanded="true">垃圾分类统计</a></li>
                                <li className="active"><a href="#basic-justified-tab2" data-toggle="tab"
                                                    aria-expanded="false">城市垃圾统计</a></li>
                                <li className=""><a href="#basic-justified-tab3" data-toggle="tab"
                                                    aria-expanded="false">小区/单位垃圾统计</a></li>
                                <li className=""><a href="#basic-justified-tab4" data-toggle="tab"
                                                    aria-expanded="false">结算记录统计</a></li>
                                <li className=""><a href="#basic-justified-tab5" data-toggle="tab"
                                                    aria-expanded="false">总量数据统计</a></li>
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane" id="basic-justified-tab1">
                                    <fieldset className="content-group">
                                        <legend className="text-bold">搜索区</legend>
                                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                                            style={{textAlign: 'right', marginTop: '-59px'}}>
                                            <li >
                                                <select id="citySelect" className="form-control"
                                                        value={this.currentCityId} onChange={this._changeCity}>
                                                    {cityOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <select id="ofClassifySelect" className="form-control">
                                                    {organizationOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <input type="text" className="form-control daterange-single"
                                                       placeholder="选择日期"/>
                                            </li>
                                            <li>
                                                <button onClick={this._search.bind(this, "CLASSIFY")} type="button"
                                                        className="btn btn-primary btn-icon"><i
                                                    className="icon-search4"></i></button>
                                            </li>

                                        </ul>
                                    </fieldset>
                                    <fieldset className="content-group">
                                        <div style={{marginTop: '-20px'}}>
                                            <Pagenation counts={data.nTotCnt ? data.nTotCnt : 6} page={this.page}
                                                        _changePage={this._changePage} _prePage={this._prePage}
                                                        _nextPage={this._nextPage}/>
                                        </div>
                                        <div className="table-responsive"
                                             style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-3 text-bold text-center">{"垃圾分类名称"}</th>
                                                    <th className="col-md-3 text-bold text-center">{$("#ofClassifySelect").val() ? "单位/小区" : "城市"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"投放次数"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"投放重量"}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {classifyTb}
                                                </tbody>
                                            </table>
                                        </div>

                                    </fieldset>
                                </div>

                                <div className="tab-pane active" id="basic-justified-tab2">
                                    <fieldset className="content-group">
                                        <legend className="text-bold">搜索区</legend>
                                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                                            style={{textAlign: 'right', marginTop: '-59px'}}>
                                            <li >
                                                <select id="cityOfCitySelect" className="form-control"
                                                        value={this.cityOfcurrentCityId}
                                                        onChange={this._changeCityOfCity}>
                                                    {cityOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <input id="daterange-two-2" type="text"
                                                       className="form-control daterange-two"
                                                       placeholder="选择日期"/>
                                            </li>
                                            <li>
                                                <button onClick={this._search.bind(this, "CITY")} type="button"
                                                        className="btn btn-primary btn-icon"><i
                                                    className="icon-search4"></i></button>
                                            </li>

                                        </ul>
                                    </fieldset>
                                    <fieldset className="content-group">
                                        <div style={{marginTop: '-20px'}}>
                                            <div className="table-responsive" style={{width:"600px",position:"absolute"}}>
                                                <table className="table table-xlg text-nowrap">
                                                    <tbody>
                                                    <tr>
                                                        <td className="col-md-12" style={{borderTop:"0"}}>
                                                            <div className="media-left media-middle">
                                                                <a href="javascript:void(0)" data-toggle="modal" data-target="#cityDataDetailModal"
                                                                   className="btn border-purple-800 text-purple-800 btn-flat btn-rounded btn-xs btn-icon"
                                                                   onClick={this._cityDetail.bind(this, cityData.cityData)}>
                                                                    <i className=" icon-city"></i>
                                                                </a>
                                                            </div>

                                                            <div className="media-left">
                                                                <h5 className="text-semibold no-margin">
                                                                    {showTotalOfCity=="ok"?cityData.totalCityData.cityName:showTotalOfCity}
                                                                     - 投放次数 ：{showTotalOfCity=="ok"?cityData.totalCityData.count:showTotalOfCity}
                                                                    次 / 投放重量：{showTotalOfCity=="ok"?cityData.totalCityData.weight.toFixed(0):showTotalOfCity} 吨
                                                                    <small className="display-block no-margin">{showTotalOfCity=="ok"?cityData.totalCityData.rangeDate:showTotalOfCity}</small>
                                                                </h5>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Pagenation counts={data.nTotCnt ? data.nTotCnt : 6} page={this.page}
                                                        _changePage={this._changePage} _prePage={this._prePage}
                                                        _nextPage={this._nextPage}/>
                                        </div>
                                        <div className="table-responsive"
                                             style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-3 text-bold text-center">{"单位/小区"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"投放次数"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"投放重量"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"时间段"}</th>
                                                    <th className="text-center" style={{width: "20px"}}><i
                                                        className="icon-arrow-down12"></i></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {cityTb}
                                                </tbody>
                                            </table>
                                        </div>

                                    </fieldset>
                                </div>
                                <div className="tab-pane" id="basic-justified-tab3">
                                    <fieldset className="content-group">
                                        <legend className="text-bold">搜索区</legend>
                                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                                            style={{textAlign: 'right', marginTop: '-59px'}}>
                                            <li >
                                                <select id="cityOfOrganizationSelect" className="form-control"
                                                        value={this.organizationOfcurrentCityId}
                                                        onChange={this._changeCityOfOrganization}>
                                                    {cityOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <select id="ofOrganizationSelect" className="form-control">
                                                    {organizationOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <input id="daterange-two-3" type="text"
                                                       className="form-control daterange-two"
                                                       placeholder="选择日期"/>
                                            </li>
                                            <li>
                                                <button onClick={this._search.bind(this, "ORGANIZATION")} type="button"
                                                        className="btn btn-primary btn-icon"><i
                                                    className="icon-search4"></i></button>
                                            </li>

                                        </ul>
                                    </fieldset>
                                    <fieldset className="content-group">
                                        <div style={{marginTop: '-20px'}}>
                                            <Pagenation counts={data.nTotCnt ? data.nTotCnt : 6} page={this.page}
                                                        _changePage={this._changePage} _prePage={this._prePage}
                                                        _nextPage={this._nextPage}/>
                                        </div>
                                        <div className="table-responsive"
                                             style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-3 text-bold text-center">{"小区/单位名称"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"投放次数"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"投放重量"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"日期"}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {organizationTb}
                                                </tbody>
                                            </table>
                                        </div>

                                    </fieldset>
                                </div>
                                <div className="tab-pane" id="basic-justified-tab4">
                                    <fieldset className="content-group">
                                        <legend className="text-bold">搜索区</legend>
                                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                                            style={{textAlign: 'right', marginTop: '-59px'}}>
                                            <li >
                                                <select id="cityOfSettlementSelect" className="form-control"
                                                        value={this.settlementOfcurrentCityId}
                                                        onChange={this._changeCityOfSettlement}>
                                                    {cityOfCountyOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <select id="ofSettlementSelect" className="form-control">
                                                    {countyOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <input id="daterange-two-4" type="text"
                                                       className="form-control daterange-two"
                                                       placeholder="选择日期"/>
                                            </li>
                                            <li >
                                                <input id="userid" type="text" className="form-control"
                                                       placeholder="请输入用户id"/>
                                            </li>
                                            <li>
                                                <button onClick={this._search.bind(this, "SETTLEMENT")} type="button"
                                                        className="btn btn-primary btn-icon"><i
                                                    className="icon-search4"></i></button>
                                            </li>

                                        </ul>
                                    </fieldset>
                                    <fieldset className="content-group">
                                        <div style={{marginTop: '-20px'}}>
                                            <Pagenation counts={data.nTotCnt ? data.nTotCnt : 6} page={this.page}
                                                        _changePage={this._changePage} _prePage={this._prePage}
                                                        _nextPage={this._nextPage}/>
                                        </div>
                                        <div className="table-responsive"
                                             style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-4 text-bold text-center">{showCity == "city" ? "城市名称" : "区县名称"}</th>
                                                    <th className="col-md-4 text-bold text-center">{"兑换总金额"}</th>
                                                    <th className="col-md-4 text-bold text-center">{"兑换总积分数"}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {settlementTb}
                                                </tbody>
                                            </table>
                                        </div>

                                    </fieldset>
                                </div>
                                <div className="tab-pane" id="basic-justified-tab5">
                                    <fieldset className="content-group">
                                        <legend className="text-bold">搜索区</legend>
                                        <ul className="list-inline list-inline-condensed no-margin-bottom"
                                            style={{textAlign: 'right', marginTop: '-59px'}}>
                                            <li >
                                                <select id="cityOfDateRangeSelect" className="form-control"
                                                        value={this.daterangeOfcurrentCityId}
                                                        onChange={this._changeCityOfDaterange}>
                                                    {cityOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <select id="ofDaterangeSelect" className="form-control">
                                                    {organizationOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <input id="daterange-two-5" type="text"
                                                       className="form-control daterange-two"
                                                       placeholder="选择日期"/>
                                            </li>
                                            <li>
                                                <button onClick={this._search.bind(this, "DATERANGE")} type="button"
                                                        className="btn btn-primary btn-icon"><i
                                                    className="icon-search4"></i></button>
                                            </li>

                                        </ul>
                                    </fieldset>
                                    <fieldset className="content-group">
                                        <div style={{marginTop: '-20px'}}>
                                            <Pagenation counts={data.nTotCnt ? data.nTotCnt : 6} page={this.page}
                                                        _changePage={this._changePage} _prePage={this._prePage}
                                                        _nextPage={this._nextPage}/>
                                        </div>
                                        <div className="table-responsive"
                                             style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-4 text-bold text-center">{$("#ofDaterangeSelect").val() ? "单位/小区" : "城市"}</th>
                                                    <th className="col-md-4 text-bold text-center">{"投放次数"}</th>
                                                    <th className="col-md-4 text-bold text-center">{"投放重量"}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {daterangeTb}
                                                </tbody>
                                            </table>
                                        </div>

                                    </fieldset>
                                </div>
                                <ListMiddleModal id="organizationDetailModal" content={detailOrganizationInfo}
                                                 doAction={""}
                                                 tip={"详情 ("+(showTotalOfCity=="ok"?cityData.totalCityData.cityName:showTotalOfCity)+(this.organizationList && this.organizationList.length>0?"-"+this.organizationList[0].organizationName:"") +")"} actionText="单位/小区统计详情" hide="true" hideCancel="true"/>
                                <ListMiddleModal id="cityDataDetailModal" content={detailCityEveryInfo}
                                                 doAction={""}
                                                 tip={"城市统计详情展示"} actionText="城市统计详情" hide="true" hideCancel="true"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        getCityOfOrganizationList, getStatisticByClassifyList, getStatisticByCityList,
        getStatisticByOrganizationList, getStatisticByRangeDateList, getStatisticSettlementDate,
        getClassConfList, getCityList, getOperationMonitor, getStatisticByTotalList, commonReducer
    }=state;
    return {
        fetching: getStatisticByClassifyList.fetching,
        classifyData: getStatisticByClassifyList.data,
        cityData: getStatisticByCityList.data,
        organizationData: getStatisticByOrganizationList.data,
        rangeDateData: getStatisticByRangeDateList.data,
        totalData: getStatisticByTotalList.data,
        settlementData: getStatisticSettlementDate.data,
        operationData: getOperationMonitor.data,
        cityList: getCityOfOrganizationList.data,
        cityOfCountyList: getCityList.data,
        classifyList: getClassConfList.data,
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(StatisticListContainer)