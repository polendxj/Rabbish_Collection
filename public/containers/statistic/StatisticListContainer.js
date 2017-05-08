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
    timeStamp2Time2Second,
    filterCityById,
    getInitialCityIdx,
    mergeClassify,
    moneyFormat,
    mergeOrgTotal
} from '../../components/Tool/Tool';
import {
    STATISTICBYCLASSIFY_LIST_START,
    STATISTICBYDETAIL_LIST_START,
    STATISTICBYDETAIL_LIST_END,
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
        this.searchOfOrganizationid = "";
        this.currentClassifyOrganizationid = "";
        this.organizationList = "";
        this.cityEveryData = "";
        this.orgaEveryAndTotalData = "";
        this.searchColumn = "CITY";
        this.currentCityId = 1;
        this.detailOfcurrentCityId = 1;
        this.detailOfOrgaId = 1;
        this.cityOfcurrentCityId = 1;
        this.organizationOfcurrentCityId = 1;
        this.daterangeOfcurrentCityId = 1;
        this.settlementOfcurrentCityId = 1;
        this.totalCurrentCityId = 1;
        this.currentCity = "";
        this.currentCityOfCounty = "";
        this.currentOrgaCity = "崇州";
        this.currentOrgaOrganization = "";
        this.cityOfDateSort = false;
        this.cityOfWeightSort = true;
        this.cityOfCountSort = true;
        this.orgaOfOrgaSort = false;
        this.orgaOfDateSort = true;
        this.orgaOfWeightSort = true;
        this.orgaOfCountSort = true;
        this._search = this._search.bind(this);
        this._changeCityOfDetail = this._changeCityOfDetail.bind(this);
        this._changeOrgaOfDetail = this._changeOrgaOfDetail.bind(this);
        this._changeCity = this._changeCity.bind(this);
        this._changeCityOfCity = this._changeCityOfCity.bind(this);
        this._changeCityOfOrganization = this._changeCityOfOrganization.bind(this);
        this._changeCityOfDaterange = this._changeCityOfDaterange.bind(this);
        this._changeCityOfSettlement = this._changeCityOfSettlement.bind(this);
        this._changeCityOfTotal = this._changeCityOfTotal.bind(this);
        this._startRefresh = this._startRefresh.bind(this);

        this.classifyPage = 0;
        this.orgPage = 0;
        this.cityPage = 0;
        this.detailPage = 0;
    }

    componentDidMount() {
        var self = this;
        var params = {
            cityid: self.currentCityId,
            page: 0,
            size: page_size,
            cityName: "崇州",
            organizationName: "",
            startday: "2016-01-01",
            endday: timeStamp2Time(new Date().getTime())
        };
        var detailParams = {page: 0, size: page_size, organizationid: 1, startTime: new Date("2016-01-01").getTime(), endTime: new Date().getTime()};
        var defaultParams = {page: 0, size: 10000};
        var cityParams = {page: 0, size: 100};
        var monitorParams = {origin: 1};
        this.props.dispatch(getListByMutilpCondition(params, STATISTICBYCLASSIFY_LIST_START, STATISTICBYCLASSIFY_LIST_END, statisticByClassify_list));
        this.props.dispatch(getListByMutilpCondition(detailParams, STATISTICBYDETAIL_LIST_START, STATISTICBYDETAIL_LIST_END, statisticByDetail_list));
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
            format: "yyyy-mm-dd",
            locale: dateLocale
        });
        $('.daterange-two').daterangepicker({
            maxDate: moment(), //最大时间
            format: "YYYY-MM-DD",
            opens: "left",
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            ranges: rangesLocale,
            startDate: '2016/01/01',
            endDate: moment(),
            locale: dateLocale
        });
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _search(type) {
        if (type == "CITY") {
            var rangeTime = $("#daterange-two-2").val();
            var cityParams = {
                page: 0,
                size: page_size,
                cityid: $("#cityOfCitySelect").val(),
                startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
                endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
            };
            this.props.dispatch(getListByMutilpCondition(cityParams, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));
        } else if (type == "DETAIL") {
            var rangeTime = $("#daterange-two-1").val();
            var detailParams = {
                page: 0,
                size: page_size,
                organizationid: $("#ofDetailSelect").val(),
                startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
                endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
            };
            this.props.dispatch(getListByMutilpCondition(detailParams, STATISTICBYDETAIL_LIST_START, STATISTICBYDETAIL_LIST_END, statisticByDetail_list));
        } else if (type == "ORGANIZATION") {
            this.searchOfOrganizationid = $("#ofOrganizationSelect").val();
            this.currentOrgaCity = $("#cityOfOrganizationSelect").find("option:selected").text();
            this.currentOrgaOrganization = $("#ofOrganizationSelect").find("option:selected").text();
            this.OrgaRangeDate = $("#daterange-two-3").val();
            var rangeTime = $("#daterange-two-3").val();
            var organizationParams = {
                page: 0,
                size: page_size,
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
                size: page_size,
                cityid: $("#cityOfDateRangeSelect").val(),
                organizationid: $("#ofDaterangeSelect").val(),
                startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
                endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
            };
            this.props.dispatch(getListByMutilpCondition(rangeDateParams, STATISTICBYRANGEDATE_LIST_START, STATISTICBYRANGEDATE_LIST_END, statisticByRangeDate_list));
        }
    }
    _changeCityOfDetail() {
        var citieid = $("#cityOfDetailSelect").val();
        this.currentCity = filterCityById(this.props.cityList.data, citieid);
        this.detailOfcurrentCityId = citieid;
        this._startRefresh();
    }
    _changeOrgaOfDetail(){
        var orgaId = $("#ofDetailSelect").val();
        this.detailOfOrgaId = orgaId;
        this._startRefresh();
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
        this.settlementOfcurrentCityId = citieid;
        this._startRefresh();
    }

    _cityDetail(val) {
        var params = {
            cityid: val.cityid,
            monthday: timeStamp2Time(val.monthday)
        };
        this.props.dispatch(getListByMutilpCondition(params, STATISTICBYCLASSIFY_LIST_START, STATISTICBYCLASSIFY_LIST_END, statisticByClassify_list));
    }

    _orgaTotalDetail(organizationData) {
        if (!this.searchOfOrganizationid) {
            if (organizationData.status && organizationData.data && organizationData.data.content.length > 0) {
                this.orgaEveryAndTotalData = organizationData.data.content[0];
            }
            this._startRefresh();
        }
    }

    _orgaEveryDetail(orgaData) {
        this.orgaEveryAndTotalData = orgaData;
        this._startRefresh();
    }

    _detailChangePage(page) {
        this.detailPage=page;
        var rangeTime = $("#daterange-two-1").val();
        var detailParams = {
            page: this.detailPage,
            size: page_size,
            organizationid: $("#ofDetailSelect").val(),
            startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
            endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
        };
        this.props.dispatch(getListByMutilpCondition(detailParams, STATISTICBYDETAIL_LIST_START, STATISTICBYDETAIL_LIST_END, statisticByDetail_list));
    }

    _detailPrePage(page) {
        this.detailPage=this.detailPage-1;
        var rangeTime = $("#daterange-two-1").val();
        var detailParams = {
            page: this.detailPage,
            size: page_size,
            organizationid: $("#ofDetailSelect").val(),
            startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
            endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
        };
        this.props.dispatch(getListByMutilpCondition(detailParams, STATISTICBYDETAIL_LIST_START, STATISTICBYDETAIL_LIST_END, statisticByDetail_list));

    }

    _detailNextPage(page) {
        this.detailPage=this.detailPage+1;
        var rangeTime = $("#daterange-two-1").val();
        var detailParams = {
            page: this.detailPage,
            size: page_size,
            organizationid: $("#ofDetailSelect").val(),
            startTime: new Date(rangeTime.split("-")[0].trim()).getTime(),
            endTime: new Date(rangeTime.split("-")[1].trim()).getTime()
        };
        this.props.dispatch(getListByMutilpCondition(detailParams, STATISTICBYDETAIL_LIST_START, STATISTICBYDETAIL_LIST_END, statisticByDetail_list));

    }

    _cityChangePage(page) {
        this.cityPage=page;
        var rangeTime = $("#daterange-two-2").val();
        var cityParams = {
            page: this.cityPage,
            size: page_size,
            cityid: $("#cityOfCitySelect").val(),
            startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
            endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
        };
        this.props.dispatch(getListByMutilpCondition(cityParams, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));
    }

    _cityPrePage(page) {
        this.cityPage=this.cityPage-1;
        var rangeTime = $("#daterange-two-2").val();
        var cityParams = {
            page: this.cityPage,
            size: page_size,
            cityid: $("#cityOfCitySelect").val(),
            startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
            endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
        };
        this.props.dispatch(getListByMutilpCondition(cityParams, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));

    }

    _cityNextPage(page) {
        this.cityPage=this.cityPage+1;
        var rangeTime = $("#daterange-two-2").val();
        var cityParams = {
            page: this.cityPage,
            size: page_size,
            cityid: $("#cityOfCitySelect").val(),
            startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
            endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
        };
        this.props.dispatch(getListByMutilpCondition(cityParams, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));

    }

    _organizationChangePage(page) {
        this.orgPage = page;
        this.searchOfOrganizationid = $("#ofOrganizationSelect").val();
        this.currentOrgaCity = $("#cityOfOrganizationSelect").find("option:selected").text();
        this.currentOrgaOrganization = $("#ofOrganizationSelect").find("option:selected").text();
        this.OrgaRangeDate = $("#daterange-two-3").val();
        var rangeTime = $("#daterange-two-3").val();
        var organizationParams = {
            page: this.orgPage,
            size: page_size,
            cityid: $("#cityOfOrganizationSelect").val(),
            organizationid: $("#ofOrganizationSelect").val(),
            startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
            endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
        };
        this.props.dispatch(getListByMutilpCondition(organizationParams, STATISTICBYORGANIZATION_LIST_START, STATISTICBYORGANIZATION_LIST_END, statisticByOrganization_list));
    }

    _organizationPrePage(page) {
        this.orgPage = this.orgPage-1;
        this.searchOfOrganizationid = $("#ofOrganizationSelect").val();
        this.currentOrgaCity = $("#cityOfOrganizationSelect").find("option:selected").text();
        this.currentOrgaOrganization = $("#ofOrganizationSelect").find("option:selected").text();
        this.OrgaRangeDate = $("#daterange-two-3").val();
        var rangeTime = $("#daterange-two-3").val();
        var organizationParams = {
            page: this.orgPage,
            size: page_size,
            cityid: $("#cityOfOrganizationSelect").val(),
            organizationid: $("#ofOrganizationSelect").val(),
            startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
            endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
        };
        this.props.dispatch(getListByMutilpCondition(organizationParams, STATISTICBYORGANIZATION_LIST_START, STATISTICBYORGANIZATION_LIST_END, statisticByOrganization_list));
    }

    _organizationNextPage(page) {
        this.orgPage = this.orgPage+1;
        this.searchOfOrganizationid = $("#ofOrganizationSelect").val();
        this.currentOrgaCity = $("#cityOfOrganizationSelect").find("option:selected").text();
        this.currentOrgaOrganization = $("#ofOrganizationSelect").find("option:selected").text();
        this.OrgaRangeDate = $("#daterange-two-3").val();
        var rangeTime = $("#daterange-two-3").val();
        var organizationParams = {
            page: this.orgPage,
            size: page_size,
            cityid: $("#cityOfOrganizationSelect").val(),
            organizationid: $("#ofOrganizationSelect").val(),
            startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
            endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
        };
        this.props.dispatch(getListByMutilpCondition(organizationParams, STATISTICBYORGANIZATION_LIST_START, STATISTICBYORGANIZATION_LIST_END, statisticByOrganization_list));
    }

    _settlementChangePage(page) {
        this.page = page;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _settlementPrePage(page) {
        this.page = this.page - 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _settlementNextPage(page) {
        this.page = this.page + 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _totalChangePage(page) {
        this.page = page;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _totalPrePage(page) {
        this.page = this.page - 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }

    _totalNextPage(page) {
        this.page = this.page + 1;
        this.props.dispatch(getAdminList(this.page, this.searchColumn, $("#search_value").val()));
    }
    _changeCitySort(type,e){
        var rangeTime = $("#daterange-two-2").val();
        var cityParams = {
            page: 0,
            size: page_size,
            cityid: $("#cityOfCitySelect").val(),
            startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
            endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
        };
        if(type=="date"){
            this.cityOfDateSort = !this.cityOfDateSort;
            this.cityOfWeightSort = true;
            this.cityOfCountSort = true;
            cityParams.sort = this.cityOfDateSort?"monthday,desc":"monthday,asc";
        }else if(type=="weight"){
            this.cityOfWeightSort = !this.cityOfWeightSort;
            this.cityOfDateSort = true;
            this.cityOfCountSort = true;
            cityParams.sort = this.cityOfWeightSort?"weight,desc":"weight,asc";
        }else{
            this.cityOfCountSort = !this.cityOfCountSort;
            this.cityOfDateSort = true;
            this.cityOfWeightSort = true;
            cityParams.sort = this.cityOfCountSort?"count,desc":"count,asc";
        }
        $(e.target).css("color","red");
        $(".citySort").not(e.target).css("color","black");
        this.props.dispatch(getListByMutilpCondition(cityParams, STATISTICBYCITY_LIST_START, STATISTICBYCITY_LIST_END, statisticByCity_list));
    }
    _changeOrganizationSort(type,e){
        var rangeTime = $("#daterange-two-3").val();
        var orgaParams = {
            page: this.orgPage,
            size: page_size,
            cityid: $("#cityOfOrganizationSelect").val(),
            organizationid: $("#ofOrganizationSelect").val(),
            startday: timeStamp2Time(new Date(rangeTime.split("-")[0].trim()).getTime()),
            endday: timeStamp2Time(new Date(rangeTime.split("-")[1].trim()).getTime())
        };
        if(type=="organization"){
            this.orgaOfOrgaSort = !this.orgaOfOrgaSort;
            this.orgaOfDateSort = true;
            this.orgaOfWeightSort = true;
            this.orgaOfCountSort = true;
            orgaParams.sort = this.orgaOfOrgaSort?"organizationid,desc":"organizationid,asc";
        }else if(type=="date"){
            this.orgaOfDateSort = !this.orgaOfDateSort;
            this.orgaOfOrgaSort = true;
            this.orgaOfWeightSort = true;
            this.orgaOfCountSort = true;
            orgaParams.sort = this.orgaOfDateSort?"monthday,desc":"monthday,asc";
        }else if(type=="weight"){
            this.orgaOfWeightSort = !this.orgaOfWeightSort;
            this.orgaOfOrgaSort = true;
            this.orgaOfDateSort = true;
            this.orgaOfCountSort = true;
            orgaParams.sort = this.orgaOfWeightSort?"weight,desc":"weight,asc";
        }else{
            this.orgaOfCountSort = !this.orgaOfCountSort;
            this.orgaOfOrgaSort = true;
            this.orgaOfDateSort = true;
            this.orgaOfWeightSort = true;
            orgaParams.sort = this.orgaOfCountSort?"count,desc":"count,asc";
        }
        $(e.target).css("color","red");
        $(".orgaSort").not(e.target).css("color","black");
        this.props.dispatch(getListByMutilpCondition(orgaParams, STATISTICBYORGANIZATION_LIST_START, STATISTICBYORGANIZATION_LIST_END, statisticByOrganization_list));
    }
    render() {
        const {fetching, classifyData, detailData, cityData, organizationData, rangeDateData, settlementData, operationData, cityList, cityOfCountyList, totalData, classifyList} =this.props;
        console.log("detailData",detailData);
        var data = "";
        var showCity = "city";
        let cityTb = [];
        let organizationTb = [];
        let daterangeTb = [];
        let settlementTb = [];
        var totalOrga = mergeOrgTotal(organizationData);
        if (cityData.cityData) {
            if (cityData.cityData.content.length > 0) {
                cityData.cityData.content.forEach(function (val, key) {
                    cityTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">{timeStamp2Time(val.monthday)}</td>
                        <td className="text-center">{val.weight?val.weight.toFixed(3):0}</td>
                        <td className="text-center">{moneyFormat(val.count)}</td>
                        <td className="text-center">
                            {<ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle"
                                       data-toggle="dropdown" aria-expanded="false"><i
                                        className="icon-menu7"></i></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <a href="javascript:void(0)" data-toggle="modal"
                                               data-target="#cityDataDetailModal"
                                               onClick={this._cityDetail.bind(this, val)}><i
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
                            <td className="text-center">{timeStamp2Time(val.monthday)}</td>
                            <td className="text-center">{val.weight?val.weight.toFixed(3):0}</td>
                            <td className="text-center">{moneyFormat(val.count)}</td>
                            <td className="text-center">
                                {<ul className="icons-list">
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle"
                                           data-toggle="dropdown" aria-expanded="false"><i
                                            className="icon-menu7"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="javascript:void(0)" data-toggle="modal"
                                                   data-target="#orgaEveryDetailModal"
                                                   onClick={this._orgaEveryDetail.bind(this, val)}><i
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
        var cityOftotalFlag = true;
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
                    cityOftotalFlag = typeof rangeDateDataList.organizationName =="undefined";
                    daterangeTb.push(<tr key={"rangeDate"}>
                        <td className="text-center">{1}</td>
                        <td className="text-center">
                            {rangeDateDataList.organizationName?rangeDateDataList.organizationName:rangeDateDataList.cityName}
                        </td>
                        <td className="text-center">{rangeDateDataList.weight?rangeDateDataList.weight.toFixed(2):0}</td>
                        <td className="text-center">{rangeDateDataList.count}</td>
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
        var detailTb = [];
        if (detailData) {
            if (detailData.status) {
                var detailDataList = null;
                if (detailData.data) {
                    if (typeof detailData.data.content == "undefined") {
                        detailDataList = detailData.data;
                    } else {
                        detailDataList = detailData.data.content;
                    }
                }
                if (detailDataList) {
                    detailDataList.forEach(function (val, key) {
                        detailTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.name}</td>
                            <td className="text-center">{val.className}</td>
                            <td className="text-center">{val.weight?val.weight.toFixed(2):0}</td>
                            <td className="text-center">{moneyFormat(val.points)}</td>
                            <td className="text-center">{timeStamp2Time2Second(val.createTime)}</td>
                        </tr>)
                    }.bind(this));
                } else {
                    detailTb.push(<tr key={'noData'}>
                        <td colSpan="100" style={{textAlign: 'center'}}>
                            <NoData />
                        </td>
                    </tr>)
                }
            } else {
                detailTb.push(ErrorModal(Current_Lang.status.minor, "获取数据错误"));
            }
        } else {
            detailTb.push(<tr key={'loading'}>
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
        var organizationOfDetailOptions = [];
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
                    var idx = getInitialCityIdx(this.settlementOfcurrentCityId, cityOfCountyList.data);
                    if(idx){

                    }else{
                        idx = 0;
                    }
                    if (cityOfCountyList.data[idx] && cityOfCountyList.data[idx].country) {
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
                    if(idx){

                    }else{
                        idx = 0;
                    }
                    if (cityList.data[idx] && cityList.data[idx].organization.content.length > 0) {
                        cityList.data[idx].organization.content.forEach(function (val, index) {
                            organizationOptions.push(
                                <option key={"organization-" + index} value={val.id}>{val.name}</option>
                            );
                            organizationOfDetailOptions.push(
                                <option key={"organization-" + index} value={val.id}>{val.name}</option>
                            );
                        });
                    }
                } else {
                    if (this.currentCity.organization.content.length > 0) {
                        this.currentCity.organization.content.forEach(function (val, index) {
                            organizationOptions.push(
                                <option key={"organization-" + index} value={val.id}>{val.name}</option>
                            );
                            organizationOfDetailOptions.push(
                                <option key={"organization-" + index} value={val.id}>{val.name}</option>
                            );
                        })
                    }

                }
            }
        }
        var showOperation = "获取中...";
        var showTotal = "获取中...";
        var showTotalOfCity = "获取中...";
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
        var showOrgaEvery = "获取中...";

        var detailCityEveryTb = [];
        if(classifyData.status){
            if (classifyData.data.length > 0) {
                classifyData.data.forEach(function (val, key) {
                    detailCityEveryTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                        <td className="text-center">{key + 1}</td>
                        <td className="text-center">{val.className}</td>
                        <td className="text-center">{val.weight?val.weight.toFixed(2):0}</td>
                        <td className="text-center">{moneyFormat(val.count)}</td>
                    </tr>)
                }.bind(this));
            } else {
                detailCityEveryTb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>
                </tr>)
            }
        }else{
            detailCityEveryTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        }
        var detailCityEveryInfo = <div>
            <table className="table table-bordered table-striped text-center">
                <thead>
                <tr style={{fontWeight: 'bold'}}>
                    <th className="text-center" style={{width: "20px"}}></th>
                    <th className="col-md-4 text-center text-bold">{"垃圾分类"}</th>
                    <th className="col-md-4 text-center text-bold">{"重量（千克）"}</th>
                    <th className="col-md-4 text-center text-bold">{"次数"}</th>
                </tr>
                </thead>
                <tbody>
                {detailCityEveryTb}
                </tbody>
            </table>
        </div>;
        var detailorgaEveryTb = [];
        if (this.orgaEveryAndTotalData == "") {
            detailorgaEveryTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else {
            this.orgaEveryAndTotalData.classifyData = mergeClassify(classifyList.data, this.orgaEveryAndTotalData.classifyData);
            if (this.orgaEveryAndTotalData.classifyData.length > 0) {
                this.orgaEveryAndTotalData.classifyData.forEach(function (val, key) {
                    if(val.count>0 || val.weight>0){
                        detailorgaEveryTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.className}</td>
                            <td className="text-center">{val.weight?val.weight.toFixed(2):0}</td>
                            <td className="text-center">{moneyFormat(val.count)}</td>
                        </tr>)
                    }
                }.bind(this));
            } else {
                detailorgaEveryTb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>
                </tr>)
            }
        }
        var detailorgaEveryInfo = <div>
            <table className="table table-bordered table-striped text-center">
                <thead>
                <tr style={{fontWeight: 'bold'}}>
                    <th className="text-center" style={{width: "20px"}}></th>
                    <th className="col-md-4 text-center text-bold">{"分类名称"}</th>
                    <th className="col-md-4 text-center text-bold">{"重量（千克）"}</th>
                    <th className="col-md-4 text-center text-bold">{"次数"}</th>
                </tr>
                </thead>
                <tbody>
                {detailorgaEveryTb}
                </tbody>
            </table>
        </div>;
        var detailorgaTotalTb = [];
        if (this.orgaEveryAndTotalData == "") {
            detailorgaTotalTb.push(<tr key={'loading'}>
                <td colSpan="100" style={{textAlign: 'center'}}>
                    <Loading />
                </td>
            </tr>)
        } else {
            this.orgaEveryAndTotalData.classifyData = mergeClassify(classifyList.data, this.orgaEveryAndTotalData.classifyData);
            if (this.orgaEveryAndTotalData.classifyData.length > 0) {
                this.orgaEveryAndTotalData.classifyData.forEach(function (val, key) {
                    if(val.count>0 || val.weight>0){
                        detailorgaTotalTb.push(<tr key={key} style={{backgroundColor: key % 2 == 0 ? "#F8F8F8" : ""}}>
                            <td className="text-center">{key + 1}</td>
                            <td className="text-center">{val.className}</td>
                            <td className="text-center">{val.weight?val.weight.toFixed(2):0}</td>
                            <td className="text-center">{moneyFormat(val.count)}</td>
                        </tr>)
                    }
                }.bind(this));
            } else {
                detailorgaTotalTb.push(<tr key={'noData'}>
                    <td colSpan="100" style={{textAlign: 'center'}}>
                        <NoData />
                    </td>
                </tr>)
            }
        }
        var detailorgaTotalInfo = <div>
            <table className="table table-bordered table-striped text-center">
                <thead>
                <tr style={{fontWeight: 'bold'}}>
                    <th className="text-center" style={{width: "20px"}}></th>
                    <th className="col-md-4 text-center text-bold">{"分类名称"}</th>
                    <th className="col-md-4 text-center text-bold">{"重量（千克）"}</th>
                    <th className="col-md-4 text-center text-bold">{"次数"}</th>
                </tr>
                </thead>
                <tbody>
                {detailorgaTotalTb}
                </tbody>
            </table>
        </div>;

        var tableHeight = ($(window).height() - 410);
        var contentHeight = $(window).height();
        var style = {width:"175px"};
        return (
            <div>
                <div className="content" style={{marginTop: '5px',height:contentHeight+"px",overflowY:"auto"}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="panel bg-teal-400">
                                    <div className="panel-body">
                                        <h3 className="no-margin">{showTotal == "ok" ? (totalData.data.weight?moneyFormat(totalData.data.weight.toFixed(0)):0) : showTotal}
                                            &nbsp;
                                            / {showTotal == "ok" ? moneyFormat(totalData.data.count) : showTotal}</h3>
                                        <select id="cityOfTotalSelect" className="form-control pull-right input-xs"
                                                style={{position: "absolute", width: "100px", right: "5px", top: "5px"}}
                                                value={this.totalCurrentCityId} onChange={this._changeCityOfTotal}>
                                            {cityOptions}
                                        </select>
                                        垃圾投放总量（吨） &nbsp;/ 垃圾投放次数（次）
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

                                        <h3 className="no-margin">{showOperation == "ok" ? (operationData.data.totalXAmount?moneyFormat(operationData.data.totalXAmount.toFixed(0)):0) : showOperation}</h3>
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
                                        <div className="text-muted text-size-small">单位：次</div>
                                        <a className="heading-elements-toggle"><i className="icon-menu"></i></a></div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{padding: "20px"}}>
                        <div className="tabbable">
                            <ul className="nav nav-tabs nav-justified nav-tabs-highlight">
                                <li className="active"><a href="#basic-justified-tab2" data-toggle="tab"
                                                          aria-expanded="false">城市垃圾统计</a></li>
                                <li className=""><a href="#basic-justified-tab3" data-toggle="tab"
                                                    aria-expanded="false">小区/单位垃圾统计</a></li>
                                <li className=""><a href="#basic-justified-tab1" data-toggle="tab"
                                                    aria-expanded="false">垃圾回收详情</a></li>
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
                                                <select id="cityOfDetailSelect" className="form-control"
                                                        value={this.detailOfcurrentCityId}
                                                        onChange={this._changeCityOfDetail}>
                                                    {cityOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <select id="ofDetailSelect" className="form-control" value={this.detailOfOrgaId} onChange={this._changeOrgaOfDetail}>
                                                    {organizationOfDetailOptions}
                                                </select>
                                            </li>
                                            <li >
                                                <input id="daterange-two-1" type="text"
                                                       className="form-control daterange-two"
                                                       placeholder="选择日期" style={style}/>
                                            </li>
                                            <li>
                                                <button onClick={this._search.bind(this, "DETAIL")} type="button"
                                                        className="btn btn-primary btn-icon"><i
                                                    className="icon-search4"></i></button>
                                            </li>

                                        </ul>
                                    </fieldset>
                                    <fieldset className="content-group">
                                        <div style={{marginTop: '-20px'}}>
                                            <Pagenation counts={detailData.status&&detailData.data ? detailData.data.totalElements : 0} page={this.detailPage}
                                                        _changePage={this._detailChangePage.bind(this)}
                                                        _prePage={this._detailPrePage.bind(this)}
                                                        _nextPage={this._detailNextPage.bind(this)}
                                                        inputNumberID="inputNumber1"
                                                        perPageID="perPageID1"
                                            />
                                        </div>
                                        <div className="table-responsive"
                                             >
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-2 text-bold text-center">{"姓名"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"分类名称"}</th>
                                                    <th className="col-md-2 text-bold text-center">{"重量（千克）"}</th>
                                                    <th className="col-md-2 text-bold text-center">{"回馈积分"}</th>
                                                    <th className="col-md-3 text-bold text-center">{"回收时间"}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {detailTb}
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
                                                       placeholder="选择日期" style={style}/>
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
                                            <div className="table-responsive"
                                                 style={{width: "600px", position: "relative",float:"left"}}>
                                                <table className="table table-xlg text-nowrap">
                                                    <tbody>
                                                    <tr>
                                                        <td className="col-md-12" style={{borderTop: "0"}}>
                                                            <div className="media-left media-middle">
                                                                <a
                                                                   className="btn border-purple-800 text-purple-800 btn-flat btn-rounded btn-xs btn-icon">
                                                                    <i className=" icon-city"></i>
                                                                </a>
                                                            </div>

                                                            <div className="media-left">
                                                                <h5 className="text-semibold no-margin">
                                                                    {showTotalOfCity == "ok" ? cityData.totalCityData.cityName : showTotalOfCity}
                                                                    - 投放次数
                                                                    ：{showTotalOfCity == "ok" ? moneyFormat(cityData.totalCityData.count) : showTotalOfCity}
                                                                    次 /
                                                                    投放重量：{showTotalOfCity == "ok" ? (cityData.totalCityData.weight?moneyFormat(cityData.totalCityData.weight.toFixed(0)):0) : showTotalOfCity}
                                                                    吨
                                                                    <small
                                                                        className="display-block no-margin">{showTotalOfCity == "ok" ? cityData.totalCityData.rangeDate : showTotalOfCity}</small>
                                                                </h5>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Pagenation counts={cityData.cityData ? cityData.cityData.totalElements : 0} page={this.cityPage}
                                                        _changePage={this._cityChangePage.bind(this)}
                                                        _prePage={this._cityPrePage.bind(this)}
                                                        _nextPage={this._cityNextPage.bind(this)}
                                                        inputNumberID="inputNumber2"
                                                        perPageID="perPageID2"
                                            />
                                        </div>
                                        <div className="table-responsive"
                                             >
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-4 text-bold text-center">{"日期"}
                                                        <i className={this.cityOfDateSort?"icon icon-arrow-down5 citySort":"icon icon-arrow-up5 citySort"} style={{color:"red"}} onClick={this._changeCitySort.bind(this,"date")} />
                                                    </th>
                                                    <th className="col-md-4 text-bold text-center">{"重量（吨）"}
                                                        <i className={this.cityOfWeightSort?"icon icon-arrow-down5 citySort":"icon icon-arrow-up5 citySort"} style={{color:"black"}} onClick={this._changeCitySort.bind(this,"weight")} />
                                                    </th>
                                                    <th className="col-md-4 text-bold text-center">{"次数"}
                                                        <i className={this.cityOfCountSort?"icon icon-arrow-down5 citySort":"icon icon-arrow-up5 citySort"} style={{color:"black"}} onClick={this._changeCitySort.bind(this,"count")} />
                                                    </th>
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
                                                       placeholder="选择日期" style={style}/>
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
                                            <div className="table-responsive"
                                                 style={{width: "600px", position: "relative",float:"left"}}>
                                                <table className="table table-xlg text-nowrap">
                                                    <tbody>
                                                    <tr>
                                                        <td className="col-md-12" style={{borderTop: "0"}}>
                                                            <div className="media-left media-middle">
                                                                <a href="javascript:void(0)" data-toggle="modal"
                                                                   data-target={this.searchOfOrganizationid ? "" : "#orgaTotalDetailModal"}
                                                                   className="btn border-purple-800 text-purple-800 btn-flat btn-rounded btn-xs btn-icon"
                                                                   onClick={this._orgaTotalDetail.bind(this, organizationData)}>
                                                                    <i className=" icon-city"></i>
                                                                </a>
                                                            </div>

                                                            <div className="media-left">
                                                                <h5 className="text-semibold no-margin">
                                                                    {totalOrga.cityName ? totalOrga.cityName : "获取中..."}
                                                                    - 投放次数 ：{moneyFormat(totalOrga.count)}
                                                                    次 / 投放重量：{totalOrga.weight?moneyFormat(totalOrga.weight.toFixed(0)):0}
                                                                    吨
                                                                    <small
                                                                        className="display-block no-margin">{totalOrga.rangeDate ? totalOrga.rangeDate : "获取中..."}</small>
                                                                </h5>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Pagenation counts={organizationData?organizationData.data.totalElements : 0} page={this.orgPage}
                                                        _changePage={this._organizationChangePage.bind(this)}
                                                        _prePage={this._organizationPrePage.bind(this)}
                                                        _nextPage={this._organizationNextPage.bind(this)}
                                                        inputNumberID="inputNumber3"
                                                        perPageID="perPageID3"
                                            />
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-3 text-bold text-center">{"小区/单位名称"}
                                                        <i className={this.orgaOfOrgaSort?"icon icon-arrow-down5 orgaSort":"icon icon-arrow-up5 orgaSort"} style={{color:"red"}} onClick={this._changeOrganizationSort.bind(this,"organization")} />
                                                    </th>
                                                    <th className="col-md-3 text-bold text-center">{"日期"}
                                                        <i className={this.orgaOfDateSort?"icon icon-arrow-down5 orgaSort":"icon icon-arrow-up5 orgaSort"} style={{color:"black"}} onClick={this._changeOrganizationSort.bind(this,"date")} />
                                                    </th>
                                                    <th className="col-md-3 text-bold text-center">{"重量（吨）"}
                                                        <i className={this.orgaOfWeightSort?"icon icon-arrow-down5 orgaSort":"icon icon-arrow-up5 orgaSort"} style={{color:"black"}} onClick={this._changeOrganizationSort.bind(this,"weight")} />
                                                    </th>
                                                    <th className="col-md-3 text-bold text-center">{"次数"}
                                                        <i className={this.orgaOfCountSort?"icon icon-arrow-down5 orgaSort":"icon icon-arrow-up5 orgaSort"} style={{color:"black"}} onClick={this._changeOrganizationSort.bind(this,"count")} />
                                                    </th>
                                                    <th className="text-center" style={{width: "20px"}}><i
                                                        className="icon-arrow-down12"></i></th>
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
                                                       placeholder="选择日期" style={style}/>
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
                                            <Pagenation counts={1} page={this.page}
                                                        _changePage={this._settlementChangePage.bind(this)}
                                                        _prePage={this._settlementPrePage.bind(this)}
                                                        _nextPage={this._settlementNextPage.bind(this)}
                                                        inputNumberID="inputNumber4"
                                                        perPageID="perPageID4"
                                            />
                                        </div>
                                        <div className="table-responsive">
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
                                                       placeholder="选择日期" style={style}/>
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
                                            <Pagenation counts={1} page={this.page}
                                                        _changePage={this._totalChangePage.bind(this)}
                                                        _prePage={this._totalPrePage.bind(this)}
                                                        _nextPage={this._totalNextPage.bind(this)}
                                                        inputNumberID="inputNumber5"
                                                        perPageID="perPageID5"
                                            />
                                        </div>
                                        <div className="table-responsive"
                                             >
                                            <table className="table table-bordered table-hover"
                                                   style={{marginBottom: '85px'}}>
                                                <thead>
                                                <tr style={{fontWeight: 'bold'}}>
                                                    <th className="text-center" style={{width: "20px"}}></th>
                                                    <th className="col-md-4 text-bold text-center">{cityOftotalFlag ? "单位/小区" : "城市"}</th>
                                                    <th className="col-md-4 text-bold text-center">{"重量（千克）"}</th>
                                                    <th className="col-md-4 text-bold text-center">{"次数"}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {daterangeTb}
                                                </tbody>
                                            </table>
                                        </div>

                                    </fieldset>
                                </div>
                                <ListMiddleModal id="cityDataDetailModal" content={detailCityEveryInfo}
                                                 doAction={""}
                                                 tip={"详情 (" + (showTotalOfCity == "ok" ? cityData.totalCityData.cityName : "获取中...") + ")"}
                                                 actionText="统计详情" hide="true" hideCancel="true"/>
                                <ListMiddleModal id="orgaEveryDetailModal" content={detailorgaEveryInfo}
                                                 doAction={""}
                                                 tip={"详情 (" + (this.currentOrgaCity ? this.currentOrgaCity : "获取中...") + (this.currentOrgaOrganization ? "-" + this.currentOrgaOrganization : "") + ")"}
                                                 actionText="统计详情" hide="true" hideCancel="true"/>
                                <ListMiddleModal id="orgaTotalDetailModal" content={detailorgaTotalInfo}
                                                 doAction={""}
                                                 tip={"详情 (" + (this.currentOrgaCity ? this.currentOrgaCity : "获取中...") + ")"}
                                                 actionText="统计详情" hide="true" hideCancel="true"/>
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
        getStatisticByDetailList,getCityOfOrganizationList, getStatisticByClassifyList, getStatisticByCityList,
        getStatisticByOrganizationList, getStatisticByRangeDateList, getStatisticSettlementDate,
        getClassConfList, getCityList, getOperationMonitor, getStatisticByTotalList, commonReducer
    }=state;
    return {
        fetching: getStatisticByClassifyList.fetching,
        classifyData: getStatisticByClassifyList.data,
        detailData: getStatisticByDetailList.data,
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